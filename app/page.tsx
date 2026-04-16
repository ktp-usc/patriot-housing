import Header from "@/components/header";
import Footer from "@/components/footer";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Carousel1 from "@/components/images/Carousel1.jpg";
import Carousel2 from "@/components/images/Carousel2.jpg";
import Carousel3 from "@/components/images/Carousel3.jpg";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { HOMEPAGE_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";


export default async function Home() {
  const homepage = await client.fetch(HOMEPAGE_QUERY);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 md:px-10 md:py-12">
        <section className="relative flex min-h-[18rem] items-center justify-center overflow-hidden rounded-2xl bg-[url('/images/backgroundImage.jpg')] bg-cover bg-center px-4 sm:min-h-[20rem] sm:px-6 md:min-h-[24rem] md:px-8">
          <div className="absolute inset-0 bg-blue-900/50" />

          <div
            className="
              relative z-10 mx-auto max-w-3xl rounded-2xl border border-white/30
              bg-white/20 px-4 py-5 text-center shadow-lg backdrop-blur-md
              sm:px-6 sm:py-6 md:px-8
            "
          >
            <h1 className="text-2xl font-bold text-white drop-shadow-md sm:text-3xl md:text-5xl">
              {homepage?.heroTitle || "Welcome to Patriot Housing"}
            </h1>

            <p className="theme-hero-copy mx-auto mt-4 max-w-3xl text-sm text-white sm:text-base md:mt-5 md:text-xl">
              {homepage?.heroSubtitle ||
                "Providing safe, affordable housing to veterans and their families, because those who served deserve a place to call home."}
            </p>
          </div>
        </section>

        <section className="rounded-2xl bg-slate-50 py-12 shadow-xl ring-1 ring-white/10 backdrop-blur sm:py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-8 text-center sm:mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-red-600 sm:text-sm">
                {homepage?.storyTitle || "Watch Our Story"}
              </p>

              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl md:text-4xl">
                {homepage?.storyHeading || "See the impact of Patriot Housing"}
              </h2>
            </div>

            <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-10">
              <div className="flex h-full flex-col rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/70 p-5 text-white shadow-xl ring-1 ring-white/10 backdrop-blur sm:p-6 md:p-8">
                <h3 className="text-xl font-semibold text-white sm:text-2xl">
                  Changing the Story for Veterans
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-slate-200 sm:text-base">
                  At Patriot Housing Project, we’re working to change that narrative.
                  Our mission is simple: provide housing, jobs, and hope for veterans
                  who have fallen on hard times.
                </p>

                <p className="mt-4 text-sm leading-relaxed text-slate-200 sm:text-base">
                  We’re building pathways to permanent housing and self-sufficiency —
                  one hero, one home, one community at a time.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <a
                    href="/donate"
                    className="inline-flex w-full items-center justify-center rounded-xl border border-white/20 bg-blue-800 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-900 sm:w-fit"
                  >
                    Donate Now
                  </a>
                </div>
              </div>

              <div className="h-full overflow-hidden rounded-2xl bg-slate-950 shadow-xl ring-1 ring-slate-200">
                <div className="aspect-video w-full">
                  <iframe
                    className="block h-full w-full"
                    src={homepage?.youtubeUrl || "https://www.youtube.com/embed/d9Nsgidtak8"}
                    title="Patriot Housing video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-slate-50 p-4 shadow-xl ring-1 ring-white/10 backdrop-blur sm:p-6 md:p-8">
          <Carousel className="group mx-auto w-full max-w-5xl">
            <CarouselContent>
              {homepage?.carouselImages && homepage.carouselImages.length > 0 ? (
                homepage.carouselImages.map((image: any, index: number) => (
                  <CarouselItem key={index}>
                    <div className="overflow-hidden rounded-2xl">
                      <Image
                        src={urlFor(image).url()}
                        alt={image.alt || `Patriot Housing carousel image ${index + 1}`}
                        className="block h-64 w-full object-cover sm:h-80 md:h-[28rem]"
                        width={800}
                        height={400}
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <>
                  <CarouselItem>
                    <div className="overflow-hidden rounded-2xl">
                      <Image
                        src={Carousel1}
                        alt="Patriot Housing carousel image 1"
                        className="block h-64 w-full object-cover sm:h-80 md:h-[28rem]"
                        priority
                      />
                    </div>
                  </CarouselItem>

                  <CarouselItem>
                    <div className="overflow-hidden rounded-2xl">
                      <Image
                        src={Carousel2}
                        alt="Patriot Housing carousel image 2"
                        className="block h-64 w-full object-cover sm:h-80 md:h-[28rem]"
                      />
                    </div>
                  </CarouselItem>

                  <CarouselItem>
                    <div className="overflow-hidden rounded-2xl">
                      <Image
                        src={Carousel3}
                        alt="Patriot Housing carousel image 3"
                        className="block h-64 w-full object-cover sm:h-80 md:h-[28rem]"
                      />
                    </div>
                  </CarouselItem>
                </>
              )}
            </CarouselContent>

            <CarouselPrevious className="left-4 hidden size-12 border-white/0 bg-white/0 text-white/0 shadow-none transition-all duration-200 sm:flex sm:opacity-0 sm:group-hover:opacity-100 sm:group-hover:border-white/15 sm:group-hover:bg-slate-900/35 sm:group-hover:text-white/85 sm:focus-visible:opacity-100 sm:focus-visible:text-white hover:border-white/25 hover:bg-slate-900/65 hover:text-white focus-visible:border-white/25 focus-visible:bg-slate-900/65 [&_svg]:size-5" />
            <CarouselNext className="right-4 hidden size-12 border-white/0 bg-white/0 text-white/0 shadow-none transition-all duration-200 sm:flex sm:opacity-0 sm:group-hover:opacity-100 sm:group-hover:border-white/15 sm:group-hover:bg-slate-900/35 sm:group-hover:text-white/85 sm:focus-visible:opacity-100 sm:focus-visible:text-white hover:border-white/25 hover:bg-slate-900/65 hover:text-white focus-visible:border-white/25 focus-visible:bg-slate-900/65 [&_svg]:size-5" />
          </Carousel>
        </section>

        <section className="rounded-2xl bg-slate-50 py-12 shadow-xl ring-1 ring-white/10 backdrop-blur sm:py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mb-8 text-center sm:mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-red-600 sm:text-sm">
                {homepage?.missionTitle || "Our Mission"}
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl md:text-4xl">
                {homepage?.missionHeading || "Answering the Call — Bringing Hope Home for Our Heroes"}
              </h2>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/70 p-5 shadow-xl ring-1 ring-slate-200 sm:p-6 md:p-12">
              <h3 className="text-lg font-bold text-slate-200 sm:text-xl">
                The Patriot Housing Project
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-slate-200 sm:text-base">
                Twelve years ago, Tri-County Veterans Support Network (TCVSN) was founded with one simple mission:
                to connect struggling Veterans in the Charleston area with the local resources they need to rebuild their lives.
              </p>

              <p className="mt-4 text-sm leading-relaxed text-slate-200 sm:text-base">
                Over the years, one truth has remained constant — too many of our nation’s heroes lack a safe, stable place
                to call home. Through partnerships with local community organizations, TCVSN has already helped more than
                <span className="font-semibold text-slate-200"> 7,000 Veterans </span>
                secure housing, employment, benefits, and critical support.
              </p>

              <p className="mt-4 text-sm leading-relaxed text-slate-200 sm:text-base">
                But this challenge extends far beyond Charleston. That’s why we launched the Patriot Housing Project —
                a nationwide initiative providing homes, job training, and hope for Veterans in communities across America.
              </p>

              <p className="mt-4 text-sm leading-relaxed text-slate-200 sm:text-base">
                Now, we’re calling on Patriots like you to stand up, step forward, and make a difference for the Veterans
                in your community. Together, we can ensure that every Hero has a place to heal, rebuild, and thrive.
              </p>

              <div className="mt-8 text-center">
                <p className="text-sm font-medium text-slate-200 sm:text-base">
                  {homepage?.contactText || "Want to bring this initiative to your community?"}
                </p>

                <a
                  href={`mailto:${homepage?.contactEmail || "info@tcvsn.org"}`}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-blue-800 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-900 sm:w-auto"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
