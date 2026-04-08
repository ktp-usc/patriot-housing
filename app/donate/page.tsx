import Image from "next/image";
import guy from "@/components/images/Guy.png";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function DonatePage() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <Header />

            <main className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 lg:py-24">
                <div className="flex flex-col gap-12">

                    {/* Top section: Ways to Volunteer */}
                    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-8 md:p-12 shadow-sm">
                        <div className="relative flex items-center justify-center overflow-hidden rounded-2xl bg-[url('/images/backgroundImage.jpg')] bg-cover bg-center px-4 py-20">
                            <div className="absolute inset-0 bg-blue-900/50"></div>

                            <h1 className="relative z-10 mx-auto max-w-3xl rounded-2xl border border-white/30 bg-white/20 px-8 py-6 text-center text-3xl font-bold tracking-tight text-white shadow-lg backdrop-blur-md md:text-5xl">
                                Donate
                            </h1>
                        </div>
                    </section>

                    {/* Bottom row: Image + Text */}
                    <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 shadow-2xl">
                        <div className="grid items-stretch lg:grid-cols-[minmax(320px,0.95fr)_1.05fr]">
                            <div className="flex items-center justify-center bg-[url('/cameo_background.png')] bg-cover bg-center p-8 md:p-10">
                                <Image
                                    src={guy}
                                    alt="Veteran"
                                    width={400}
                                    height={450}
                                    priority
                                    className="h-auto w-full max-w-sm rounded-[1.5rem] object-contain drop-shadow-2xl"
                                />
                            </div>

                            <div className="flex items-center bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 text-white md:p-10 lg:p-12">
                                <div className="space-y-8">
                                    <p className="text-2xl font-semibold leading-relaxed md:text-[1.85rem]">
                                        At Patriot Housing, we provide housing, job support,
                                        and long-term stability for Veterans facing hardship.
                                    </p>

                                    <p className="text-2xl font-semibold leading-relaxed md:text-[1.85rem]">
                                        We build pathways to permanent housing and
                                        self-sufficiency. One Hero, one home, one community at a time.
                                    </p>

                                    <p className="text-2xl font-semibold leading-relaxed md:text-[1.85rem]">
                                        We can&apos;t do it alone.
                                        Your support turns compassion into action.
                                    </p>

                                    <div className="flex justify-center pt-2 lg:justify-start">
                                        <a
                                            href="https://givebutter.com/c/XRhwPV"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Button size="lg" className="bg-blue-600 px-6 text-base hover:bg-blue-700">
                                                Support a Veteran
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

