import { NextResponse } from "next/server";
import { ensureProcessEnvFromDotEnv, getServerEnv } from "@/lib/env";
import { client } from "@/sanity/lib/client";
import { toHTML } from "@portabletext/to-html";

type NewsletterPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BREVO_API_URL = process.env.BREVO_API_URL;

export async function POST(request: Request) {
  try {
    ensureProcessEnvFromDotEnv(["DATABASE_URL"]);

    const databaseUrl = getServerEnv("DATABASE_URL");
    if (!databaseUrl || !/^postgres(ql)?:\/\//i.test(databaseUrl)) {
      return NextResponse.json(
        { message: "DATABASE_URL must use postgres:// or postgresql:// in .env." },
        { status: 500 },
      );
    }

    const { prisma } = await import("@/lib/prisma");
    const body = (await request.json()) as NewsletterPayload;

    const firstName = body.firstName?.trim();
    const lastName = body.lastName?.trim();
    const email = body.email?.trim().toLowerCase();

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 },
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format." },
        { status: 400 },
      );
    }

    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: { firstName, lastName },
      create: { firstName, lastName, email },
    });

    // Attempt to send welcome email
    const apiKey = getServerEnv("BREVO_API_KEY");
    const senderEmail = getServerEnv("BREVO_SENDER_EMAIL");
    const senderName = getServerEnv("BREVO_SENDER_NAME") ?? "Patriot Housing Project";

    if (apiKey && senderEmail && BREVO_API_URL) {
      try {
        let welcomeSubject = "";
        let welcomeHtml = "";

        try {
          const settings = await client.fetch('*[_type == "newsletterSettings"][0]');
          if (settings && settings.welcomeSubject && settings.welcomeMessage) {
            welcomeSubject = settings.welcomeSubject;
            const rawHtml = toHTML(settings.welcomeMessage);
            welcomeHtml = rawHtml.replace(/\{\{firstName\}\}/g, firstName ? firstName : "there");
          } else {
            console.warn("Skipping welcome email: No Sanity configuration found.");
            return NextResponse.json({ success: true });
          }
        } catch (err) {
          console.error("Failed to fetch Sanity settings for welcome email:", err);
          return NextResponse.json({ success: true });
        }
        
        await fetch(BREVO_API_URL, {
          method: "POST",
          headers: {
            accept: "application/json",
            "api-key": apiKey,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            sender: { email: senderEmail, name: senderName },
            to: [{ email, name: [firstName, lastName].filter(Boolean).join(" ") || undefined }],
            subject: welcomeSubject,
            htmlContent: welcomeHtml,
            replyTo: { email: senderEmail, name: senderName },
          }),
        });
      } catch (err) {
        console.error("Failed to send welcome email:", err);
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { message: "Unable to save newsletter signup. Verify your database connection settings." },
      { status: 500 },
    );
  }
}
