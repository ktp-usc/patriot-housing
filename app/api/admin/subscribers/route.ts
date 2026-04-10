import { NextRequest, NextResponse } from "next/server";
import { sessionStore } from "@/lib/admin-store";
import { ensureProcessEnvFromDotEnv, getServerEnv } from "@/lib/env";

function isPostgresUrl(value: string | undefined): boolean {
	if (!value) {
		return false;
	}
	return /^postgres(ql)?:\/\//i.test(value);
}

export async function POST(request: NextRequest) {
	let body: { token?: string };
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

	const databaseUrl = getServerEnv("DATABASE_URL");
	if (!isPostgresUrl(databaseUrl)) {
		return NextResponse.json(
			{ error: "DATABASE_URL must use postgres:// or postgresql://." },
			{ status: 503 },
		);
	}

	try {
		ensureProcessEnvFromDotEnv(["DATABASE_URL"]);
		const { prisma } = await import("@/lib/prisma");
		const subscribers = await prisma.newsletterSubscriber.findMany({
			select: {
				firstName: true,
				lastName: true,
				email: true,
				createdAt: true,
			},
			orderBy: { createdAt: "desc" },
		});

		return NextResponse.json({ subscribers });
	} catch {
		return NextResponse.json(
			{ error: "Unable to load subscribers. Verify database settings." },
			{ status: 500 },
		);
	}
}
