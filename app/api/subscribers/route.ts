import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const subscribers = await prisma.newsletterSubscriber.findMany({
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                createdAt: true,
            },
        });

        return NextResponse.json({ data: subscribers });
    } catch (error) {
        console.error("Fetch subscribers error:", error);
        return NextResponse.json(
            { error: "Failed to fetch subscribers." },
            { status: 500 }
        );
    }
}
