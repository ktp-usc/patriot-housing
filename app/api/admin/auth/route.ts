import { NextRequest, NextResponse } from "next/server";
import { getServerEnv } from "@/lib/env";
import { rateLimitStore, sessionStore } from "@/lib/admin-store";
import crypto from "node:crypto";

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 5 * 60 * 1000; // 5 minutes
const SESSION_TTL_MS = 4 * 60 * 60 * 1000; // 4 hours

function getClientIp(request: NextRequest): string {
	const forwarded = request.headers.get("x-forwarded-for");
	if (forwarded) {
		return forwarded.split(",")[0].trim();
	}

	return request.headers.get("x-real-ip") ?? "unknown";
}

function constantTimeEqual(a: string, b: string): boolean {
	const bufferA = Buffer.from(a, "utf8");
	const bufferB = Buffer.from(b, "utf8");

	if (bufferA.length !== bufferB.length) {
		// Still do a comparison to avoid timing leak on length
		const padded = Buffer.alloc(bufferA.length, 0);
		crypto.timingSafeEqual(bufferA, padded);
		return false;
	}

	return crypto.timingSafeEqual(bufferA, bufferB);
}

function cleanupExpiredSessions() {
	const now = Date.now();
	for (const [token, session] of sessionStore) {
		if (now - session.createdAt > SESSION_TTL_MS) {
			sessionStore.delete(token);
		}
	}
}

export async function POST(request: NextRequest) {
	const ip = getClientIp(request);
	const now = Date.now();

	// Check rate limit
	const entry = rateLimitStore.get(ip);
	if (entry) {
		if (entry.lockedUntil && now < entry.lockedUntil) {
			const retryAfter = Math.ceil((entry.lockedUntil - now) / 1000);
			return NextResponse.json(
				{
					error: "Too many failed attempts. Please try again later.",
					retryAfter,
					lockedUntil: entry.lockedUntil,
				},
				{ status: 429 },
			);
		}

		// Reset if lockout has expired
		if (entry.lockedUntil && now >= entry.lockedUntil) {
			rateLimitStore.delete(ip);
		}
	}

	let body: { password?: string };
	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
	}

	const password = typeof body.password === "string" ? body.password.trim() : "";
	if (!password) {
		return NextResponse.json({ error: "Password is required." }, { status: 400 });
	}

	const correctPassword = getServerEnv("DATABASE_PAGE_PASSWORD");
	if (!correctPassword) {
		return NextResponse.json(
			{ error: "Admin access is not configured on this server." },
			{ status: 503 },
		);
	}

	const isCorrect = constantTimeEqual(password, correctPassword);

	if (!isCorrect) {
		const current = rateLimitStore.get(ip) ?? { attempts: 0, lockedUntil: null };
		current.attempts += 1;

		if (current.attempts >= MAX_ATTEMPTS) {
			current.lockedUntil = now + LOCKOUT_DURATION_MS;
			rateLimitStore.set(ip, current);

			const retryAfter = Math.ceil(LOCKOUT_DURATION_MS / 1000);
			return NextResponse.json(
				{
					error: `Too many failed attempts. Locked out for ${Math.ceil(LOCKOUT_DURATION_MS / 60000)} minutes.`,
					retryAfter,
					lockedUntil: current.lockedUntil,
				},
				{ status: 429 },
			);
		}

		rateLimitStore.set(ip, current);
		const remaining = MAX_ATTEMPTS - current.attempts;
		return NextResponse.json(
			{
				error: `Incorrect password. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`,
				attemptsRemaining: remaining,
			},
			{ status: 401 },
		);
	}

	// Success — clear rate limit and issue token
	rateLimitStore.delete(ip);
	cleanupExpiredSessions();

	const token = crypto.randomUUID();
	sessionStore.set(token, { createdAt: now });

	return NextResponse.json({ token });
}
