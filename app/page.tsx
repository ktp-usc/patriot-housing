import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-6 py-10 md:px-10 md:py-15">

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

        {/* TODO: Image Courasel Here, can also put in section below*/}
        <section className="rounded-2xl border border-slate-200 bg-white p-8 md:p-12">
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
            Patriot Housing
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
            Insert Description Here
          </p>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
            Section 1
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
            Section 2
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
            Section 3
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
