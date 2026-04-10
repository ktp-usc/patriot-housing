import { NextRequest, NextResponse } from "next/server";
import { sessionStore, imageStore } from "@/lib/admin-store";
import { ensureProcessEnvFromDotEnv, getServerEnv } from "@/lib/env";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const DEFAULT_SENDER_NAME = "Patriot Housing Project";
// Delay between individual sends to stay under Brevo rate limits
const INTER_SEND_DELAY_MS = 250;

function textToHtml(text: string): string {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/\n/g, "<br />");
}

function hasRichContent(html: string): boolean {
	const hasImage = /<img\b/i.test(html);
	const text = html
		.replace(/<[^>]+>/g, "")
		.replace(/&nbsp;/g, "")
		.trim();
	return hasImage || text.length > 0;
}

function isPostgresUrl(value: string | undefined): boolean {
	if (!value) {
		return false;
	}
	return /^postgres(ql)?:\/\//i.test(value);
}

type InlineAttachment = {
	content: string; // base64
	name: string;
};

/**
 * Extract images from HTML and convert them to inline CID attachments.
 *
 * Finds <img> tags whose src points to our /api/admin/upload-image/ endpoint,
 * looks up the raw image data from the shared imageStore, and replaces the
 * src with a cid: reference. Returns the modified HTML and an array of
 * Brevo-compatible attachment objects.
 *
 * This is necessary because:
 * 1. localhost URLs are unreachable from email clients
 * 2. Even Vercel URLs would break when the serverless function's memory is recycled
 * 3. Inline CID attachments are the standard, reliable way to embed images in email
 */
function extractInlineImages(html: string): {
	html: string;
	attachments: InlineAttachment[];
} {
	const attachments: InlineAttachment[] = [];
	let counter = 0;

	// Match <img> tags with src pointing to our upload-image endpoint
	const processed = html.replace(
		/<img\b([^>]*)\bsrc=["']([^"']*\/api\/admin\/upload-image\/([a-f0-9-]+))["']([^>]*)>/gi,
		(_match, before, _fullUrl, imageId, after) => {
			const storedImage = imageStore.get(imageId);
			if (!storedImage) {
				// Image not found in store — leave the tag as-is
				return _match;
			}

			counter += 1;
			const extension = storedImage.contentType.split("/")[1] || "png";
			const cidName = `inline-image-${counter}.${extension}`;

			attachments.push({
				content: storedImage.data.toString("base64"),
				name: cidName,
			});

			return `<img${before} src="cid:${cidName}"${after}>`;
		},
	);

	return { html: processed, attachments };
}

/**
 * Send a single transactional email to one recipient via Brevo.
 *
 * We intentionally send one email per subscriber rather than batching
 * with BCC. Brevo's free tier does not reliably deliver to BCC recipients
 * — only the primary `to` address receives the email. Sending individually
 * ensures every subscriber actually receives the newsletter and gives
 * accurate per-address tracking in the Brevo dashboard.
 */
async function sendBrevoEmail(input: {
	apiKey: string;
	senderEmail: string;
	senderName: string;
	recipientEmail: string;
	subject: string;
	content: string;
	htmlContent: string;
	attachments: InlineAttachment[];
}): Promise<{ ok: boolean; messageId?: string; error?: string }> {
	const payload: Record<string, unknown> = {
		sender: {
			email: input.senderEmail,
			name: input.senderName,
		},
		to: [{ email: input.recipientEmail }],
		subject: input.subject,
		textContent: input.content,
		htmlContent: input.htmlContent,
		replyTo: {
			email: input.senderEmail,
			name: input.senderName,
		},
		headers: {
			"List-Unsubscribe": `<mailto:${input.senderEmail}?subject=unsubscribe>`,
		},
	};

	// Include inline image attachments if present
	if (input.attachments.length > 0) {
		payload.attachment = input.attachments;
	}

	const response = await fetch(BREVO_API_URL, {
		method: "POST",
		headers: {
			accept: "application/json",
			"api-key": input.apiKey,
			"content-type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		const errorText = await response.text();
		console.error(
			`[send-newsletter] Brevo API error for ${input.recipientEmail}: ${response.status} ${errorText}`,
		);
		return { ok: false, error: `${response.status}: ${errorText}` };
	}

	const result = await response.json();
	console.log(
		`[send-newsletter] Sent to ${input.recipientEmail}: messageId=${result.messageId}`,
	);
	return { ok: true, messageId: result.messageId };
}

export async function POST(request: NextRequest) {
	let body: {
		token?: string;
		subject?: string;
		content?: string;
		htmlContent?: string;
	};

	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
	}

	// Verify session
	const token = typeof body.token === "string" ? body.token.trim() : "";
	if (!token || !sessionStore.has(token)) {
		return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
	}

	const subject = typeof body.subject === "string" ? body.subject.trim() : "";
	const content = typeof body.content === "string" ? body.content.trim() : "";
	const htmlContentRaw = typeof body.htmlContent === "string" ? body.htmlContent.trim() : "";

	const htmlHasContent = hasRichContent(htmlContentRaw);
	const rawHtmlContent = htmlHasContent ? htmlContentRaw : textToHtml(content);
	const finalTextContent = content || "Newsletter update with image content.";

	if (!subject || (!content && !htmlHasContent)) {
		return NextResponse.json(
			{ error: "Subject and content are required." },
			{ status: 400 },
		);
	}

	// Extract inline images from HTML and replace URLs with cid: references
	const { html: finalHtmlContent, attachments } = extractInlineImages(rawHtmlContent);

	console.log(
		`[send-newsletter] Prepared email: subject="${subject}", ${attachments.length} inline image(s)`,
	);

	const apiKey = getServerEnv("BREVO_API_KEY");
	const senderEmail = getServerEnv("BREVO_SENDER_EMAIL");
	const senderName = getServerEnv("BREVO_SENDER_NAME") ?? DEFAULT_SENDER_NAME;

	if (!apiKey) {
		return NextResponse.json(
			{ error: "BREVO_API_KEY is not configured." },
			{ status: 503 },
		);
	}

	if (!senderEmail) {
		return NextResponse.json(
			{ error: "BREVO_SENDER_EMAIL is not configured." },
			{ status: 503 },
		);
	}

	const databaseUrl = getServerEnv("DATABASE_URL");
	if (!isPostgresUrl(databaseUrl)) {
		return NextResponse.json(
			{ error: "DATABASE_URL must use postgres:// or postgresql://." },
			{ status: 503 },
		);
	}

	ensureProcessEnvFromDotEnv(["DATABASE_URL"]);
	const { prisma } = await import("@/lib/prisma");
	const subscribers = await prisma.newsletterSubscriber.findMany({
		select: { email: true },
		orderBy: { createdAt: "asc" },
	});

	if (subscribers.length === 0) {
		return NextResponse.json(
			{ error: "No newsletter subscribers found." },
			{ status: 404 },
		);
	}

	console.log(
		`[send-newsletter] Sending to ${subscribers.length} subscriber(s): ${subscribers.map((s: { email: string }) => s.email).join(", ")}`,
	);

	let sentRecipients = 0;
	let failedRecipients = 0;
	const errors: string[] = [];

	for (let index = 0; index < subscribers.length; index += 1) {
		const subscriber = subscribers[index];

		try {
			const result = await sendBrevoEmail({
				apiKey,
				senderEmail,
				senderName,
				recipientEmail: subscriber.email,
				subject,
				content: finalTextContent,
				htmlContent: finalHtmlContent,
				attachments,
			});

			if (result.ok) {
				sentRecipients += 1;
			} else {
				failedRecipients += 1;
				errors.push(`${subscriber.email}: ${result.error}`);
			}
		} catch (err) {
			failedRecipients += 1;
			const message = err instanceof Error ? err.message : "Unknown error";
			errors.push(`${subscriber.email}: ${message}`);
			console.error(`[send-newsletter] Exception for ${subscriber.email}: ${message}`);
		}

		// Delay between sends to respect Brevo rate limits
		if (index < subscribers.length - 1) {
			await new Promise((resolve) => setTimeout(resolve, INTER_SEND_DELAY_MS));
		}
	}

	console.log(
		`[send-newsletter] Complete: ${sentRecipients} sent, ${failedRecipients} failed out of ${subscribers.length}`,
	);

	return NextResponse.json({
		status: sentRecipients > 0 ? "success" : "error",
		total: subscribers.length,
		sent: sentRecipients,
		failed: failedRecipients,
		errors: errors.length > 0 ? errors : undefined,
		message: sentRecipients > 0 ? "Send complete." : "Unable to send newsletter email.",
	});
}
