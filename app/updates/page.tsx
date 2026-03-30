import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Updates() {
    return (
        <div className="min-h-screen bg-white text-slate-900">
            <Header />

            <main className="mx-auto w-full max-w-7xl px-6 py-10 md:px-10 md:py-15">
                <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 md:p-12 shadow-sm">
                    {/* Red incomplete border accent (top-left) */}
                    <div className="absolute left-0 top-0 h-1.5 w-32 bg-red-600 rounded-br-full"></div>
                    <div className="absolute left-0 top-0 h-32 w-1.5 bg-red-600 rounded-br-full"></div>

                    {/* header */}
                    <div className="relative z-10">
                        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                            Updates
                        </h1>
                        <p className="mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
                            Keeping you updated on everything Patriot Housing! From new homes to events, we've got you covered.
                        </p>
                    </div>
                </section>

                {/* body */}
                <section className="mt-8 grid gap-6 md:grid-cols-3">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                        Waiting on facebook integration.
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                        Waiting on facebook integration.
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                        Waiting on facebook integration. 3
                    </div>
                </section>
            </main>

            <Footer />
        </div>

    );
}