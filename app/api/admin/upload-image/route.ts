import { NextRequest, NextResponse } from "next/server";
import { sessionStore, imageStore } from "@/lib/admin-store";
import crypto from "node:crypto";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
const IMAGE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function cleanupExpiredImages() {
	const now = Date.now();
	for (const [id, image] of imageStore) {
		if (now - image.createdAt > IMAGE_TTL_MS) {
			imageStore.delete(id);
		}
	}
}

export async function POST(request: NextRequest) {
	let body: { token?: string; dataUrl?: string };
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

	const dataUrl = typeof body.dataUrl === "string" ? body.dataUrl : "";
	if (!dataUrl) {
		return NextResponse.json({ error: "No image data provided." }, { status: 400 });
	}

	// Parse data URL: data:image/png;base64,iVBOR...
	const match = dataUrl.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
	if (!match) {
		return NextResponse.json({ error: "Invalid data URL format." }, { status: 400 });
	}

	const contentType = match[1];
	const base64Data = match[2];
	const buffer = Buffer.from(base64Data, "base64");

	if (buffer.length > MAX_IMAGE_SIZE) {
		return NextResponse.json(
			{ error: "Image exceeds 5 MB limit." },
			{ status: 413 },
		);
	}

	cleanupExpiredImages();

	const id = crypto.randomUUID();
	imageStore.set(id, {
		data: buffer,
		contentType,
		createdAt: Date.now(),
	});

	// Build the public URL for this image (used for preview in the editor)
	const origin = request.nextUrl.origin;
	const imageUrl = `${origin}/api/admin/upload-image/${id}`;

	return NextResponse.json({ url: imageUrl, id });
}
