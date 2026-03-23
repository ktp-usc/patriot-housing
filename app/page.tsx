import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-6 py-10 md:px-10 md:py-15">
        {/* TODO: Add image/banner here */}
        <section className="theme-hero px-4 py-20">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="text-3xl font-bold md:text-5xl">Welcome to Patriot Housing</h1>
            <p className="theme-hero-copy mx-auto mt-5 max-w-3xl text-lg md:text-xl">
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
