import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { firstName, lastName, email } = body;

        if (!firstName || !lastName || !email) {
            return NextResponse.json(
                { success: false, message: "First name, last name, and email are required." },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, message: "Please provide a valid email address." },
                { status: 400 }
            );
        }

        await prisma.newsletterSubscriber.create({
            data: {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim().toLowerCase(),
            },
        });

        return NextResponse.json({ success: true, message: "Successfully subscribed!" });
    } catch (error: unknown) {
        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            (error as { code: string }).code === "P2002"
        ) {
            return NextResponse.json(
                { success: false, message: "This email is already subscribed." },
                { status: 409 }
            );
        }

        console.error("Newsletter subscribe error:", error);
        return NextResponse.json(
            { success: false, message: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
