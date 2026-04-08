import Image from "next/image";
import guy from "@/components/images/Guy.png";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/footer";

export default function DonatePage() {
    return (
        <div className="min-h-screen bg-white text-slate-900">
            <Header />

            <main className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 lg:py-24">
                <div className="flex flex-col gap-12">

                    {/* Top section: Ways to Volunteer */}
                    <section className="rounded-2xl border border-slate-200 bg-white p-8 md:p-12 shadow-sm">
                        <div className="relative flex items-center justify-center overflow-hidden rounded-2xl bg-[url('/images/backgroundImage.jpg')] bg-cover bg-center px-4 py-20">
                            <div className="absolute inset-0 bg-blue-900/50"></div>

                            <h1 className="relative z-10 mx-auto max-w-3xl rounded-2xl border border-white/30 bg-white/20 px-8 py-6 text-center text-3xl font-bold tracking-tight text-white shadow-lg backdrop-blur-md md:text-5xl">
                                Donate
                            </h1>
                        </div>
                    </section>

                    {/* Bottom row: Image + Text */}
                    <section className="grid items-center gap-12 lg:grid-cols-[auto_1fr]">
                        <div className="flex justify-center lg:justify-start">
                            <div className="p-10 rounded-xl bg-[url('/cameo_background.png')] bg-cover bg-center shadow-lg">
                                <Image
                                    src={guy}
                                    alt="Veteran"
                                    width={400}
                                    height={450}
                                    priority
                                    className="h-auto w-full max-w-sm rounded-lg"
                                />
                            </div>
                        </div>

                        <div className="rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/70 p-8 text-white shadow-xl backdrop-blur ring-1 ring-white/10">
                            <div className="max-w-xl">
                                <p className="text-[20px]">
                                    At Patriot Housing, we provide housing, job support,
                                    and long-term stability for Veterans facing hardship.
                                </p>

                                <p className="pt-8 text-[20px]">
                                    We build pathways to permanent housing and
                                    self-sufficiency. One Hero, one home, one community at a time.
                                </p>

                                <p className="pt-8 text-[20px]">
                                    We can&apos;t do it alone.
                                    Your support turns compassion into action.
                                </p>

                                <div className="mt-6 flex justify-center lg:justify-start">
                                    <a
                                        href="https://givebutter.com/c/XRhwPV"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button className="bg-blue-600 hover:bg-blue-700">
                                            Support a Veteran
                                        </Button>
                                    </a>
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

