import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />

      <main className="mx-auto w-full max-w-6xl px-6 py-10 md:px-10 md:py-15">
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
