import Header from "@/components/header";
import Footer from "@/components/footer";
import { client } from "@/sanity/lib/client";
import { VOLUNTEER_OPPORTUNITIES_QUERY } from "@/sanity/lib/queries";

export default async function WaysToVolunteer() {
    const opportunities = await client.fetch(VOLUNTEER_OPPORTUNITIES_QUERY);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <Header />

            <main className="mx-auto w-full max-w-7xl px-6 py-10 md:px-10 md:py-15">
                <section className="rounded-2xl border border-slate-200 bg-slate-50 p-8 md:p-12">

                    <div className="relative overflow-hidden rounded-2xl bg-[url('/images/volunteerImage3.png')] bg-cover bg-center px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20 flex items-center justify-center">

                        {/* overlay */}
                        <div className="absolute inset-0 bg-blue-900/50"></div>

                        {/* centered content */}
                        <h1 className="relative z-10 mx-auto max-w-3xl text-center bg-white/20 backdrop-blur-md px-8 py-6 rounded-2xl border border-white/30 shadow-lg text-3xl font-bold tracking-tight md:text-5xl text-white">
                            Ways to Volunteer
                        </h1>

                    </div>

                </section>

                <section className="mt-8 grid gap-6 md:grid-cols-3">
                    {opportunities?.map((opportunity: any) => (
                        <div key={opportunity._id} className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-2 items-center">
                            <h2 className="text-red-800 font-bold">{opportunity.title}</h2>
                            <p>{opportunity.description}</p>
                            <a className="text-slate-900 underline" href={opportunity.linkUrl}>{opportunity.linkText}</a>
                        </div>
                    ))}
                </section>

            </main>

            <Footer />
        </div>
    );
}
