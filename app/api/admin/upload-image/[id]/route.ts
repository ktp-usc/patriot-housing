import { NextRequest, NextResponse } from "next/server";
import { imageStore } from "@/lib/admin-store";

export async function GET(
	_request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;

	const image = imageStore.get(id);
	if (!image) {
		return NextResponse.json({ error: "Image not found." }, { status: 404 });
	}

	return new NextResponse(new Uint8Array(image.data), {
		status: 200,
		headers: {
			"Content-Type": image.contentType,
			"Cache-Control": "public, max-age=86400",
			"Content-Length": String(image.data.length),
		},
	});
}
