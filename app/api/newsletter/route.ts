import { NextResponse } from "next/server";
import { ensureProcessEnvFromDotEnv, getServerEnv } from "@/lib/env";
import { DEFAULT_SENDER_NAME, sendBrevoWelcomeEmail } from "@/lib/brevo";

type NewsletterPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email },
      select: { email: true },
    });

    if (existingSubscriber) {
      await prisma.newsletterSubscriber.update({
        where: { email },
        data: { firstName, lastName },
      });
    } else {
      await prisma.newsletterSubscriber.create({
        data: { firstName, lastName, email },
      });

      const apiKey = getServerEnv("BREVO_API_KEY");
      const senderEmail = getServerEnv("BREVO_SENDER_EMAIL");
      const senderName = getServerEnv("BREVO_SENDER_NAME") ?? DEFAULT_SENDER_NAME;

      if (apiKey && senderEmail) {
        try {
          await sendBrevoWelcomeEmail({
            apiKey,
            senderEmail,
            senderName,
            recipientEmail: email,
            firstName,
          });
        } catch (error) {
          console.error("Welcome email send error:", error);
        }
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
