import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel"
import Carousel1 from "@/components/images/Carousel1.jpg";
import Carousel2 from "@/components/images/Carousel2.jpg";
import Carousel3 from "@/components/images/Carousel3.jpg";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-6 py-10 md:px-10 md:py-15 flex flex-col space-y-4">

        <section className="relative overflow-hidden px-4 py-20 bg-[url('/images/backgroundImage.jpg')] bg-cover bg-center rounded-2xl drop-shadow-amber-100 ">
          {/* Overlay (tint) */}
          <div className="absolute inset-0 bg-blue-900/50"></div>

          <div className="relative z-10 mx-auto max-w-3xl text-center
                bg-white/20 backdrop-blur-md
                px-8 py-6 rounded-2xl
                border border-white/30 shadow-lg">
            <h1 className="text-3xl text-white font-bold md:text-5xl drop-shadow-md ">
              Welcome to Patriot Housing
            </h1>
            <p className="theme-hero-copy mx-auto mt-5 max-w-3xl text-lg md:text-xl text-white">
              Providing safe, affordable housing to veterans and their families, because those who served deserve a place to call home.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" variant="secondary">
                Learn More <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg">Apply for Housing</Button>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 md:p-12">
          <h3 className="text-xl font-bold text-black">
            At The Patriot Housing Project, we’re working to change that narrative.
            Our mission is simple: to provide housing, jobs, and hope for Veterans who have fallen on hard times.
            We’re building pathways to permanent housing and self-sufficiency — one Hero, one home, one community at a time.
            But we can’t do it alone.
            Your support is what turns compassion into action.
          </h3>
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <Image src={ Carousel1 } alt="Carousel Image 1" className="block h-80 w-full rounded-2xl object-cover" />
              </CarouselItem>
              <CarouselItem>
                <Image src={ Carousel2 } alt="Carousel Image 2" className="block h-80 w-full rounded-2xl object-cover" />
              </CarouselItem>
              <CarouselItem>
                <Image src={ Carousel3 } alt="Carousel Image 3" className="block h-80 w-full rounded-2xl object-cover" />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

        </section>

      </main>

      <Footer />
    </div>
  );
}
