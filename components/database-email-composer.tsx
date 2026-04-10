"use client";

import { FormEvent, useMemo, useRef, useState } from "react";

type DatabaseEmailComposerProps = {
  access: string;
  sendAction: (formData: FormData) => void;
  status: string;
  total: string;
  sent: string;
  failed: string;
  message: string;
};

function stripHtmlToText(html: string): string {
  return html
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<\/(p|div|li|h1|h2|h3|h4|h5|h6)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
}

export default function DatabaseEmailComposer({
  access,
  sendAction,
  status,
  total,
  sent,
  failed,
  message,
}: DatabaseEmailComposerProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [htmlContent, setHtmlContent] = useState("");

  const plainTextContent = useMemo(() => stripHtmlToText(htmlContent), [htmlContent]);

  function syncEditorHtml() {
    setHtmlContent(editorRef.current?.innerHTML ?? "");
  }

  function insertImageAtCaret(dataUrl: string) {
    const editor = editorRef.current;
    if (!editor) {
      return;
    }

    const image = document.createElement("img");
    image.src = dataUrl;
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

  function handlePaste(event: FormEvent<HTMLDivElement>) {
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

    for (const item of imageItems) {
      const file = item.getAsFile();
      if (!file) {
        continue;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          insertImageAtCaret(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <form action={sendAction} className="mt-8 grid gap-5" noValidate>
      <input type="hidden" name="access" value={access} />
      <input type="hidden" name="content" value={plainTextContent} />
      <input type="hidden" name="htmlContent" value={htmlContent} />

      <label className="grid gap-2 text-sm font-medium text-slate-700" htmlFor="subject">
        Email Subject
        <input
          id="subject"
          name="subject"
          type="text"
          defaultValue="Patriot Housing Update"
          className="rounded-lg border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-slate-600"
          required
        />
      </label>

      <div className="grid gap-2 text-sm font-medium text-slate-700">
        <span>Email Content (you can paste images directly)</span>
        <div className="relative">
          {htmlContent.trim().length === 0 && (
            <span className="pointer-events-none absolute left-4 top-3 text-sm text-slate-400">
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
            className="min-h-[260px] w-full rounded-lg border border-slate-300 px-4 py-3 text-base font-normal outline-none transition focus:border-slate-600"
          />
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        Brevo free tier has daily send limits. Large lists may require multiple sends across days.
      </div>

      <button
        type="submit"
        className="inline-flex w-fit items-center rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        Send To All Subscribers
      </button>

      {status === "success" && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <p>
            {message || "Send complete."} Total: {total || "0"}, Sent: {sent || "0"}, Failed: {failed || "0"}.
          </p>
          {Number(failed || "0") > 0 && (
            <p className="mt-2 text-amber-700">Some batches failed due to Brevo limits or API errors.</p>
          )}
        </div>
      )}

      {status === "error" && (
        <p className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {message || "Unable to send email."}
        </p>
      )}
    </form>
  );
}
