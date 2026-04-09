import Image from "next/image";
import guy from "@/components/images/Guy.png";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { client } from "@/sanity/lib/client";
import { DONATION_CONTENT_QUERY } from "@/sanity/lib/queries";

export default async function DonatePage() {
    const donationContent = await client.fetch(DONATION_CONTENT_QUERY);

    return (
        <div className="flex min-h-screen flex-col overflow-x-hidden bg-slate-50 text-slate-900">
            <Header />

            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-12">
                <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">

                    {/* HERO */}
                    <section className="relative flex min-h-[18rem] items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-[url('/images/backgroundImage.jpg')] bg-cover bg-center px-4 shadow-sm sm:min-h-[20rem] sm:px-6 md:min-h-[24rem] md:px-8">
                        <div className="absolute inset-0 bg-blue-900/50"></div>

                        <div className="relative z-10 mx-auto max-w-3xl rounded-2xl border border-white/30 bg-white/20 px-4 py-5 text-center shadow-lg backdrop-blur-md sm:px-6 sm:py-6 md:px-8">
                            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-5xl">
                                {donationContent?.title || "Donate"}
                            </h1>
                        </div>
                    </section>

                    {/* CONTENT SECTION */}
                    <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 shadow-2xl">
                        <div className="grid items-stretch gap-0 lg:grid-cols-[minmax(320px,0.95fr)_1.05fr]">

                            {/* IMAGE */}
                            <div className="flex items-center justify-center bg-[url('/cameo_background.png')] bg-cover bg-center p-6 sm:p-8 md:p-10">
                                <Image
                                    src={guy}
                                    alt="Veteran"
                                    width={400}
                                    height={450}
                                    priority
                                    className="h-auto w-full max-w-xs sm:max-w-sm rounded-[1.5rem] object-contain drop-shadow-2xl"
                                />
                            </div>

                            {/* TEXT */}
                            <div className="flex items-center bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-5 text-white sm:p-6 md:p-8 lg:p-12">
                                <div className="space-y-6 sm:space-y-8">

                                    {donationContent?.mainMessage?.map((block: any, index: number) => (
                                        <p
                                            key={index}
                                            className="text-lg font-semibold leading-relaxed sm:text-xl md:text-2xl"
                                        >
                                            {block.children?.[0]?.text}
                                        </p>
                                    ))}

                                    <div className="flex justify-center pt-2 lg:justify-start">
                                        <a
                                            href={donationContent?.buttonUrl || "https://givebutter.com/c/XRhwPV"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full sm:w-auto"
                                        >
                                            <Button
                                                size="lg"
                                                className="w-full bg-blue-600 px-6 text-sm hover:bg-blue-700 sm:w-auto sm:text-base"
                                            >
                                                {donationContent?.buttonText || "Support a Veteran"}
                                            </Button>
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </main>

            <Footer />
        </div>
    );
}
