import { NextResponse } from "next/server";
import { ensureProcessEnvFromExample, getServerEnv } from "@/lib/env";

type NewsletterPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    ensureProcessEnvFromExample(["DATABASE_URL"]);

    const databaseUrl = getServerEnv("DATABASE_URL");
    if (!databaseUrl || !/^postgres(ql)?:\/\//i.test(databaseUrl)) {
      return NextResponse.json(
        { message: "DATABASE_URL must use postgres:// or postgresql:// in .env.example." },
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

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { message: "Unable to save newsletter signup. Verify your database connection settings." },
      { status: 500 },
    );
  }
}
