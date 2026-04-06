import Image from "next/image";
import guy from "@/components/images/Guy.png";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function DonatePage() {
    return (
        <div>
            <Header />

            <div className="relative flex h-screen bg-white items-center px-20 gap-16">

                {/* Image */}
                <Image src={guy} alt="Veteran" width={400} height={450} />

                {/* Text Content */}
                <div className="max-w-xl">
                    <p className="text-[20px]">
                        At Patriot Housing, we provide housing, job support,
                        and long-term stability for Veterans facing hardship.
                    </p>

                    <p className="text-[20px] pt-8">
                        We build pathways to permanent housing and
                        self-sufficiency. One Hero, one home, one community at a time.
                    </p>

                    <p className="text-[20px] pt-8">
                        We can't do it alone.
                        Your support turns compassion into action.
                    </p>

                    {/* Heading */}
                    <h1 className="text-4xl pt-12 text-center">
                        Be the reason a Veteran finds stability
                    </h1>

                    {/* Button */}
                    <Button className="mt-6 ml-55 bg-blue-600 hover:bg-blue-700">
                        Support a Veteran
                    </Button>
                </div>

            </div>
            <Footer />
        </div>

    );
}