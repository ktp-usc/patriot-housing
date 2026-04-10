export type BrevoRecipient = {
  email: string;
};

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
export const DEFAULT_SENDER_NAME = "Patriot Housing Project";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendBrevoBatch(input: {
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

export async function sendBrevoWelcomeEmail(input: {
  apiKey: string;
  senderEmail: string;
  senderName?: string;
  recipientEmail: string;
  firstName?: string;
}) {
  const senderName = input.senderName?.trim() || DEFAULT_SENDER_NAME;
  const safeFirstName = input.firstName?.trim() ? escapeHtml(input.firstName.trim()) : "there";

  const subject = "Welcome to the Patriot Housing newsletter";
  const content = [
    `Hello ${safeFirstName},`,
    "",
    "Thank you for signing up for the Patriot Housing newsletter.",
    "We will send you updates as new resources and opportunities are available.",
    "",
    "Patriot Housing Project",
  ].join("\n");

  const htmlContent = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0f172a;">
      <p>Hello ${safeFirstName},</p>
      <p>Thank you for signing up for the Patriot Housing newsletter.</p>
      <p>We will send you updates as new resources and opportunities are available.</p>
      <p>Patriot Housing Project</p>
    </div>
  `.trim();

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
        name: senderName,
      },
      to: [{ email: input.recipientEmail }],
      subject,
      textContent: content,
      htmlContent,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "brevo_welcome_send_failed");
  }
}