import Image from "next/image";
import guy from "@/components/images/Guy.png";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function DonatePage() {
    return (
        <div className="min-h-screen bg-white text-slate-900">
            <Header />

            <main className="mx-auto flex w-full max-w-6xl items-center justify-center px-6 py-16 md:px-10 lg:py-24">
                <section className="flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:gap-16">
                    {/* Image */}
                    <Image src={guy} alt="Veteran" width={400} height={450} className="h-auto w-full max-w-sm" />

                    {/* Text Content */}
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
                            We cant do it alone.
                            Your support turns compassion into action.
                        </p>

                    <p className="text-[20px] pt-8">
                        We can&apos;t do it alone.
                        Your support turns compassion into action.
                    </p>

                        {/* Button */}
                        <div className="mt-6 flex justify-center">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                Support a Veteran
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
                <div className="flex justify-center">
                    <a
                        href="https://givebutter.com/c/XRhwPV"
                        target="_blank"
                        rel="noopener noreferrer"
                    >

                    <Button className="mt-6 ml-55 bg-blue-600 hover:bg-blue-700">
                        Support a Veteran
                    </Button>
                    </a>
                </div>

            
            <Footer />
        </div>
    );
}
