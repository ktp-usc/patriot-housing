import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import Providers from "@/components/providers";
import { SanityLive } from "@/sanity/lib/live";

export const metadata: Metadata = {
    title: "Patriot Housing",
    description: "KTP SP26"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body>
        <Providers>
            { children }
            <SanityLive />
        </Providers>
        </body>
        </html>
    );
}
