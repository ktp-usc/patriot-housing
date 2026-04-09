import { NextResponse } from "next/server";

export async function GET() {
    // Check if DATABASE_URL is available (for production/Vercel)
    if (!process.env.DATABASE_URL) {
        return NextResponse.json(
            { error: "Database not configured for this environment." },
            { status: 503 }
        );
    }

    // Dynamically import Prisma only when database is available
    const { prisma } = await import("@/lib/prisma");

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
