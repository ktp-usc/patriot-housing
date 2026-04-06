import Image from "next/image";
import guy from "@/components/images/Guy.png";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function DonatePage() {
    return (
        <div className="min-h-screen bg-white text-slate-900">
            <Header />

            <main className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-6 py-12 md:px-10 md:py-16">
                <section className="flex w-full max-w-5xl flex-col items-center justify-center gap-10 md:flex-row md:gap-16">
                    {/* Image */}
                    <Image src={guy} alt="Veteran" width={400} height={450} />

                    {/* Text Content */}
                    <div className="max-w-xl text-center md:text-left">
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

<<<<<<< HEAD
                        {/* Heading */}
                        <h1 className="pt-12 text-4xl text-center md:text-left">
                            Be the reason a Veteran finds stability
                        </h1>
=======
                    <p className="text-[20px] pt-8">
                        We can&apos;t do it alone.
                        Your support turns compassion into action.
                    </p>
>>>>>>> d513d410fb113068085a11d381c148536f36652e

                        {/* Button */}
                        <div className="mt-6 flex justify-center md:justify-start">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                Support a Veteran
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
