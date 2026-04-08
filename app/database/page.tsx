import Header from "@/components/header";
import Footer from "@/components/footer";
import { redirect } from "next/navigation";
import { ensureProcessEnvFromDotEnv, getServerEnv } from "@/lib/env";
import DatabaseEmailComposer from "@/components/database-email-composer";

type BrevoRecipient = {
	email: string;
};

type SubscriberRow = {
	firstName: string;
	lastName: string;
	email: string;
	createdAt: Date;
};

type SearchParams = {
	access?: string | string[];
	status?: string | string[];
	total?: string | string[];
	sent?: string | string[];
	failed?: string | string[];
	message?: string | string[];
};

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const DEFAULT_SENDER_NAME = "Patriot Housing Project";
const DEFAULT_BATCH_SIZE = 100;

function chunk<T>(items: T[], size: number): T[][] {
	const chunks: T[][] = [];

	for (let index = 0; index < items.length; index += size) {
		chunks.push(items.slice(index, index + size));
	}

	return chunks;
}

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

function getSingleParam(value: string | string[] | undefined): string {
	if (Array.isArray(value)) {
		return value[0] ?? "";
	}

	return value ?? "";
}

function normalizeAccess(value: string): string {
	try {
		return decodeURIComponent(value).trim();
	} catch {
		return value.trim();
	}
}

function isPostgresUrl(value: string | undefined): boolean {
	if (!value) {
		return false;
	}

	return /^postgres(ql)?:\/\//i.test(value);
}

function escapeCsvCell(value: string): string {
	const escaped = value.replaceAll('"', '""');
	return `"${escaped}"`;
}

function createCsvDataUri(rows: SubscriberRow[]): string {
	const header = ["firstName", "lastName", "email", "createdAt"];
	const csvRows = rows.map((row) => [
		escapeCsvCell(row.firstName),
		escapeCsvCell(row.lastName),
		escapeCsvCell(row.email),
		escapeCsvCell(row.createdAt.toISOString()),
	]);
	const csv = [header.join(","), ...csvRows.map((row) => row.join(","))].join("\n");
	const withBom = `\uFEFF${csv}`;
	return `data:text/csv;charset=utf-8,${encodeURIComponent(withBom)}`;
}

async function sendBrevoBatch(input: {
	apiKey: string;
	senderEmail: string;
	senderName: string;
	recipients: BrevoRecipient[];
	subject: string;
	content: string;
	htmlContent: string;
}) {
	const response = await fetch(BREVO_API_URL, {
		method: "POST",
		headers: {
			accept: "application/json",
			"api-key": input.apiKey,
			"content-type": "application/json",
		},
		body: JSON.stringify({
			sender: {
				email: input.senderEmail,
				name: input.senderName,
			},
			to: [
				{
					email: input.senderEmail,
					name: input.senderName,
				},
			],
			bcc: input.recipients,
			subject: input.subject,
			textContent: input.content,
			htmlContent: input.htmlContent,
		}),
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(errorText || "brevo_send_failed");
	}
}

async function sendNewsletterAction(formData: FormData) {
	"use server";

	const accessValue = formData.get("access");
	const access = normalizeAccess(typeof accessValue === "string" ? accessValue : "");
	const subjectValue = formData.get("subject");
	const contentValue = formData.get("content");
	const htmlContentValue = formData.get("htmlContent");

	const subject = typeof subjectValue === "string" ? subjectValue.trim() : "";
	const content = typeof contentValue === "string" ? contentValue.trim() : "";
	const htmlContentRaw = typeof htmlContentValue === "string" ? htmlContentValue.trim() : "";
	const htmlHasContent = hasRichContent(htmlContentRaw);
	const finalHtmlContent = htmlHasContent ? htmlContentRaw : textToHtml(content);
	const finalTextContent = content || "Newsletter update with image content.";

	const databasePassword = getServerEnv("DATABASE_PAGE_PASSWORD");

	if (!databasePassword) {
		redirect("/database?status=error&message=DATABASE_PAGE_PASSWORD is not configured in .env.");
	}

	if (access !== databasePassword) {
		redirect("/database?status=error&message=Access denied. Provide a valid password.");
	}

	if (!subject || (!content && !htmlHasContent)) {
		redirect(`/database?access=${encodeURIComponent(access)}&status=error&message=Subject and content are required.`);
	}

	const apiKey = getServerEnv("BREVO_API_KEY");
	const senderEmail = getServerEnv("BREVO_SENDER_EMAIL");
	const senderName = getServerEnv("BREVO_SENDER_NAME") ?? DEFAULT_SENDER_NAME;

	if (!apiKey) {
		redirect(`/database?access=${encodeURIComponent(access)}&status=error&message=BREVO_API_KEY is not configured.`);
	}

	if (!senderEmail) {
		redirect(`/database?access=${encodeURIComponent(access)}&status=error&message=BREVO_SENDER_EMAIL is not configured.`);
	}

	const databaseUrl = getServerEnv("DATABASE_URL");
	if (!isPostgresUrl(databaseUrl)) {
		redirect(
			`/database?access=${encodeURIComponent(access)}&status=error&message=DATABASE_URL must use postgres:// or postgresql://.`,
		);
	}

	ensureProcessEnvFromDotEnv(["DATABASE_URL"]);
	const { prisma } = await import("@/lib/prisma");
	const subscribers = await prisma.newsletterSubscriber.findMany({
		select: { email: true },
		orderBy: { createdAt: "asc" },
	});

	if (subscribers.length === 0) {
		redirect(`/database?access=${encodeURIComponent(access)}&status=error&message=No newsletter subscribers found.`);
	}

	const batchSize = Math.max(
		1,
		Number.parseInt(getServerEnv("BREVO_BATCH_SIZE") ?? `${DEFAULT_BATCH_SIZE}`, 10),
	);

	const recipientBatches = chunk<BrevoRecipient>(
		subscribers.map((subscriber: { email: string }) => ({ email: subscriber.email })),
		batchSize,
	);

	let sentRecipients = 0;
	let failedRecipients = 0;

	for (let index = 0; index < recipientBatches.length; index += 1) {
		const recipients = recipientBatches[index];

		try {
			await sendBrevoBatch({
				apiKey,
				senderEmail,
				senderName,
				recipients,
				subject,
				content: finalTextContent,
				htmlContent: finalHtmlContent,
			});
			sentRecipients += recipients.length;
		} catch {
			failedRecipients += recipients.length;
		}

		if (index < recipientBatches.length - 1) {
			await new Promise((resolve) => setTimeout(resolve, 350));
		}
	}

	const resultParams = new URLSearchParams({
		status: sentRecipients > 0 ? "success" : "error",
		total: `${subscribers.length}`,
		sent: `${sentRecipients}`,
		failed: `${failedRecipients}`,
		message:
			sentRecipients > 0
				? "Send complete."
				: "Unable to send newsletter email.",
	});

	resultParams.set("access", access);
	redirect(`/database?${resultParams.toString()}`);
}

export default async function DatabasePage({
	searchParams,
}: {
	searchParams?: Promise<SearchParams>;
}) {
	const resolvedSearchParams = searchParams ? await searchParams : undefined;
	const access = normalizeAccess(getSingleParam(resolvedSearchParams?.access));
	const status = getSingleParam(resolvedSearchParams?.status);
	const total = getSingleParam(resolvedSearchParams?.total);
	const sent = getSingleParam(resolvedSearchParams?.sent);
	const failed = getSingleParam(resolvedSearchParams?.failed);
	const message = getSingleParam(resolvedSearchParams?.message);

	const databasePassword = getServerEnv("DATABASE_PAGE_PASSWORD");
	const hasPasswordConfigured = typeof databasePassword === "string" && databasePassword.length > 0;
	const hasAccess = hasPasswordConfigured && normalizeAccess(access) === normalizeAccess(databasePassword);

	let subscribers: SubscriberRow[] = [];
	let tableError = "";

	if (hasAccess) {
		const databaseUrl = getServerEnv("DATABASE_URL");
		if (!isPostgresUrl(databaseUrl)) {
			tableError = "DATABASE_URL must use postgres:// or postgresql:// in .env.";
		} else {
			try {
				ensureProcessEnvFromDotEnv(["DATABASE_URL"]);
				const { prisma } = await import("@/lib/prisma");
				subscribers = await prisma.newsletterSubscriber.findMany({
					select: {
						firstName: true,
						lastName: true,
						email: true,
						createdAt: true,
					},
					orderBy: { createdAt: "desc" },
				});
			} catch {
				tableError = "Unable to load subscribers. Verify .env database settings.";
			}
		}
	}

	const csvDataUri = subscribers.length > 0 ? createCsvDataUri(subscribers) : "";

	return (
		<div className="min-h-screen bg-white text-slate-900">
			<Header />

			<main className="mx-auto w-full max-w-7xl px-6 py-10 md:px-10 md:py-14">
				<section className="rounded-2xl border border-slate-200 bg-white p-8 md:p-12">
					<h1 className="text-3xl font-bold tracking-tight md:text-5xl">Database</h1>

					{!hasPasswordConfigured ? (
						<p className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
							DATABASE_PAGE_PASSWORD is not configured in .env.
						</p>
					) : !hasAccess ? (
						<p className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
							Access denied. Return to the newsletter page and enter the correct password.
						</p>
					) : (
						<>
							<p className="mt-4 max-w-3xl text-base text-slate-600 md:text-lg">
								Write a message and send it to every newsletter subscriber saved in Neon.
							</p>

							<DatabaseEmailComposer
								access={access}
								sendAction={sendNewsletterAction}
								status={status}
								total={total}
								sent={sent}
								failed={failed}
								message={message}
							/>

							<div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
								<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
									<h2 className="text-lg font-semibold text-slate-900">Newsletter Subscribers</h2>
									{csvDataUri && (
										<a
											href={csvDataUri}
											download="newsletter-subscribers.csv"
											className="inline-flex w-fit items-center rounded-md bg-slate-800 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-700"
										>
											Download CSV
										</a>
									)}
								</div>

								<p className="mt-2 text-sm text-slate-600">Total subscribers: {subscribers.length}</p>

								{tableError && (
									<p className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
										{tableError}
									</p>
								)}

								<div className="mt-4 overflow-x-auto rounded-md border border-slate-200 bg-white">
									<table className="min-w-full text-left text-sm">
										<thead className="bg-slate-100 text-slate-700">
											<tr>
												<th className="px-4 py-3 font-semibold">First Name</th>
												<th className="px-4 py-3 font-semibold">Last Name</th>
												<th className="px-4 py-3 font-semibold">Email</th>
												<th className="px-4 py-3 font-semibold">Joined</th>
											</tr>
										</thead>
										<tbody>
											{subscribers.length === 0 ? (
												<tr>
													<td className="px-4 py-4 text-slate-500" colSpan={4}>
														No subscribers found.
													</td>
												</tr>
											) : (
												subscribers.map((subscriber) => (
													<tr key={subscriber.email} className="border-t border-slate-100">
														<td className="px-4 py-3">{subscriber.firstName}</td>
														<td className="px-4 py-3">{subscriber.lastName}</td>
														<td className="px-4 py-3">{subscriber.email}</td>
														<td className="px-4 py-3">{subscriber.createdAt.toLocaleString()}</td>
													</tr>
												))
											)}
										</tbody>
									</table>
								</div>
							</div>
						</>
					)}
				</section>
			</main>

			<Footer />
		</div>
	);
}
