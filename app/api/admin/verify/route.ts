import { NextRequest, NextResponse } from "next/server";
import { sessionStore } from "@/lib/admin-store";

const SESSION_TTL_MS = 4 * 60 * 60 * 1000; // 4 hours

export async function POST(request: NextRequest) {
	let body: { token?: string };
	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ valid: false }, { status: 400 });
	}

	const token = typeof body.token === "string" ? body.token.trim() : "";
	if (!token) {
		return NextResponse.json({ valid: false }, { status: 400 });
	}

	const session = sessionStore.get(token);
	if (!session) {
		return NextResponse.json({ valid: false }, { status: 401 });
	}

	const now = Date.now();
	if (now - session.createdAt > SESSION_TTL_MS) {
		sessionStore.delete(token);
		return NextResponse.json({ valid: false }, { status: 401 });
	}

	return NextResponse.json({ valid: true });
}
