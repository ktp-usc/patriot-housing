import Header from "@/components/header";
import Footer from "@/components/footer";
import { ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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

          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-red-600">
              Watch Our Story
            </p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              See the impact of Patriot Housing
            </h2>
          </div>

          <div className="grid items-stretch gap-10 lg:grid-cols-2">
            <div className="rounded-2xl h-full flex flex-col bg-gradient-to-br from-slate-900/90 to-slate-800/70 p-8 text-white shadow-xl backdrop-blur ring-1 ring-white/10">
              <h3 className="text-2xl font-semibold text-white">
                Changing the Story for Veterans
              </h3>

              <p className="mt-4 leading-relaxed text-slate-200">
                At Patriot Housing Project, we’re working to change that narrative.
                Our mission is simple: provide housing, jobs, and hope for veterans
                who have fallen on hard times.
              </p>

              <p className="mt-4 leading-relaxed text-slate-200">
                We’re building pathways to permanent housing and self-sufficiency —
                one hero, one home, one community at a time.
              </p>

              <div className="mt-6 flex gap-4">


                <a
                  href="/donate"
                  className="rounded-xl border bg-blue-800 border-white/20 px-5 py-3 font-semibold text-white hover:bg-blue-900"
                >
                  Donate Now
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl h-full shadow-xl ring-1 ring-slate-200">
              <div className="h-full aspect-video lg:aspect-auto">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/d9Nsgidtak8"
                  title="Patriot Housing video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 md:p-13">
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <Image src={Carousel1} alt="Carousel Image 1" className="block h-100 w-full rounded-2xl object-cover" />
              </CarouselItem>
              <CarouselItem>
                <Image src={Carousel2} alt="Carousel Image 2" className="block h-100 w-full rounded-2xl object-cover" />
              </CarouselItem>
              <CarouselItem>
                <Image src={Carousel3} alt="Carousel Image 3" className="block h-100 w-full rounded-2xl object-cover" />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

        </section>

        <section className=" rounded-2xl bg-slate-50 py-20  shadow-xl backdrop-blur ring-1 ring-white/10">
          <div className="mx-auto  max-w-5xl px-6">

            {/* Header */}
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-red-600">
                Our Mission
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                Answering the Call — Bringing Hope Home for Our Heroes
              </h2>
            </div>

            {/* Mission Card */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/70 bg-white p-8 md:p-12 shadow-xl ring-1 ring-slate-200">

              <h3 className="text-xl font-bold text-slate-200">
                The Patriot Housing Project
              </h3>

              <p className="mt-4 text-slate-200 leading-relaxed">
                Twelve years ago, Tri-County Veterans Support Network (TCVSN) was founded with one simple mission:
                to connect struggling Veterans in the Charleston area with the local resources they need to rebuild their lives.
              </p>

              <p className="mt-4 text-slate-200 leading-relaxed">
                Over the years, one truth has remained constant — too many of our nation’s heroes lack a safe, stable place
                to call home. Through partnerships with local community organizations, TCVSN has already helped more than
                <span className="font-semibold text-slate-200"> 7,000 Veterans </span>
                secure housing, employment, benefits, and critical support.
              </p>

              <p className="mt-4 text-slate-200 leading-relaxed">
                But this challenge extends far beyond Charleston. That’s why we launched the Patriot Housing Project —
                a nationwide initiative providing homes, job training, and hope for Veterans in communities across America.
              </p>

              <p className="mt-4 text-slate-200 leading-relaxed">
                Now, we’re calling on Patriots like you to stand up, step forward, and make a difference for the Veterans
                in your community. Together, we can ensure that every Hero has a place to heal, rebuild, and thrive.
              </p>

              {/* CTA */}
              <div className="mt-8 text-center">
                <p className="text-slate-200 font-medium">
                  Want to bring this initiative to your community?
                </p>

                <a
                  href="mailto:info@tcvsn.org"
                  className="mt-4 inline-block rounded-xl bg-blue-800 px-6 py-3 font-semibold text-white hover:bg-blue-900"
                >
                  Contact Us
                </a>
              </div>

            </div>
          </div>
        </section>


      </main >

      <Footer />
    </div >
  );
}
