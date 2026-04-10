"use client";

import { FormEvent, useMemo, useRef, useState } from "react";

type NewsletterEmailComposerProps = {
	token: string;
};

function stripHtmlToText(html: string): string {
	return html
		.replace(/<br\s*\/?>/gi, "\n")
		.replace(/<\/(p|div|li|h1|h2|h3|h4|h5|h6)>/gi, "\n")
		.replace(/<[^>]+>/g, "")
		.replace(/&nbsp;/g, " ")
		.trim();
}

type SendResult = {
	status: "success" | "error";
	total: number;
	sent: number;
	failed: number;
	message: string;
};

export default function NewsletterEmailComposer({ token }: NewsletterEmailComposerProps) {
	const editorRef = useRef<HTMLDivElement | null>(null);
	const [htmlContent, setHtmlContent] = useState("");
	const [isSending, setIsSending] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [sendResult, setSendResult] = useState<SendResult | null>(null);
	const [sendError, setSendError] = useState("");

	const plainTextContent = useMemo(() => stripHtmlToText(htmlContent), [htmlContent]);

	function syncEditorHtml() {
		setHtmlContent(editorRef.current?.innerHTML ?? "");
	}

	async function uploadImage(dataUrl: string): Promise<string | null> {
		try {
			const response = await fetch("/api/admin/upload-image", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ token, dataUrl }),
			});

			if (!response.ok) {
				return null;
			}

			const data = await response.json();
			return data.url ?? null;
		} catch {
			return null;
		}
	}

	function insertImageAtCaret(src: string) {
		const editor = editorRef.current;
		if (!editor) {
			return;
		}

		const image = document.createElement("img");
		image.src = src;
		image.alt = "Pasted image";
		image.style.maxWidth = "100%";
		image.style.height = "auto";
		image.style.margin = "8px 0";
		image.style.borderRadius = "8px";

		const selection = window.getSelection();
		if (!selection || selection.rangeCount === 0) {
			editor.appendChild(image);
			syncEditorHtml();
			return;
		}

		const range = selection.getRangeAt(0);
		range.deleteContents();
		range.insertNode(image);
		range.setStartAfter(image);
		range.collapse(true);
		selection.removeAllRanges();
		selection.addRange(range);

		syncEditorHtml();
	}

	async function handlePaste(event: FormEvent<HTMLDivElement>) {
		const nativeEvent = event.nativeEvent as ClipboardEvent;
		const items = nativeEvent.clipboardData?.items;

		if (!items || items.length === 0) {
			return;
		}

		const imageItems = Array.from(items).filter((item) => item.type.startsWith("image/"));
		if (imageItems.length === 0) {
			return;
		}

		event.preventDefault();
		setIsUploading(true);

		for (const item of imageItems) {
			const file = item.getAsFile();
			if (!file) {
				continue;
			}

			const dataUrl = await new Promise<string | null>((resolve) => {
				const reader = new FileReader();
				reader.onload = () => {
					resolve(typeof reader.result === "string" ? reader.result : null);
				};
				reader.onerror = () => resolve(null);
				reader.readAsDataURL(file);
			});

			if (!dataUrl) {
				continue;
			}

			// Upload to server and get a hosted URL
			const hostedUrl = await uploadImage(dataUrl);
			if (hostedUrl) {
				insertImageAtCaret(hostedUrl);
			} else {
				// Fallback: use data URL if upload fails (will work in preview, but not in email)
				insertImageAtCaret(dataUrl);
			}
		}

		setIsUploading(false);
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setSendResult(null);
		setSendError("");

		const formData = new FormData(event.currentTarget);
		const subject = (formData.get("subject") as string)?.trim() ?? "";

		if (!subject || (!plainTextContent && !htmlContent.trim())) {
			setSendError("Subject and content are required.");
			return;
		}

		setIsSending(true);

		try {
			const response = await fetch("/api/admin/send-newsletter", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					token,
					subject,
					content: plainTextContent,
					htmlContent,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				setSendResult(data);
			} else {
				setSendError(data.error || "Unable to send newsletter.");
			}
		} catch {
			setSendError("Unable to connect to the server.");
		} finally {
			setIsSending(false);
		}
	}

	return (
		<form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:mt-8 sm:gap-5" noValidate>
			<label className="grid gap-2 text-sm font-medium text-slate-700" htmlFor="subject">
				Email Subject
				<input
					id="subject"
					name="subject"
					type="text"
					defaultValue="Patriot Housing Update"
					className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-slate-600"
					required
				/>
			</label>

			<div className="grid gap-2 text-sm font-medium text-slate-700">
				<span>
					Email Content (you can paste images directly)
					{isUploading && (
						<span className="ml-2 inline-flex items-center gap-1.5 text-xs font-normal text-slate-500">
							<span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
							Uploading image…
						</span>
					)}
				</span>

				<div className="relative">
					{htmlContent.trim().length === 0 && (
						<span className="pointer-events-none absolute left-4 top-3 right-4 text-sm leading-relaxed text-slate-400">
							Write your newsletter update here, then paste image screenshots directly into the box.
						</span>
					)}

					<div
						ref={editorRef}
						contentEditable
						suppressContentEditableWarning
						onInput={syncEditorHtml}
						onBlur={syncEditorHtml}
						onPaste={handlePaste}
						className="min-h-[220px] w-full rounded-lg border border-slate-300 px-4 py-3 text-base font-normal outline-none transition focus:border-slate-600 sm:min-h-[260px]"
					/>
				</div>
			</div>

			<div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-600">
				Brevo free tier has daily send limits. Large lists may require multiple sends across days.
			</div>

			<button
				type="submit"
				disabled={isSending}
				className="inline-flex w-full cursor-pointer items-center justify-center rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400 sm:w-fit"
			>
				{isSending ? "Sending..." : "Send To All Subscribers"}
			</button>

			{sendResult && sendResult.status === "success" && (
				<div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
					<p>
						{sendResult.message || "Send complete."} Total: {sendResult.total || 0}, Sent:{" "}
						{sendResult.sent || 0}, Failed: {sendResult.failed || 0}.
					</p>

					{(sendResult.failed || 0) > 0 && (
						<p className="mt-2 text-amber-700">
							Some batches failed due to Brevo limits or API errors.
						</p>
					)}
				</div>
			)}

			{sendResult && sendResult.status === "error" && (
				<p className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
					{sendResult.message || "Unable to send email."}
				</p>
			)}

			{sendError && (
				<p className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
					{sendError}
				</p>
			)}
		</form>
	);
}
