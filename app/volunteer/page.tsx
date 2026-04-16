import Header from "@/components/header";
import Footer from "@/components/footer";
import { VOLUNTEER_OPPORTUNITIES_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";

type VolunteerOpportunity = {
    _id: string;
    title?: string | null;
    description?: string | null;
    linkText?: string | null;
    emailSubject?: string | null;
    linkUrl?: string | null;
};

export default async function WaysToVolunteer() {
    const { data: opportunities } = await sanityFetch({
        query: VOLUNTEER_OPPORTUNITIES_QUERY,
        tags: ["volunteerOpportunity"],
    });
    const opportunityEmail = "info@patriothousing.org";

    return (
        <div className="flex min-h-screen flex-col overflow-x-hidden bg-slate-50 text-slate-900">
            <Header />

            <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-12">
                <section className="relative flex min-h-[18rem] items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-[url('/images/volunteerImage3.png')] bg-cover bg-center px-4 shadow-sm sm:min-h-[20rem] sm:px-6 md:min-h-[24rem] md:px-8">

                    {/* overlay */}
                    <div className="absolute inset-0 bg-blue-900/50"></div>

                    {/* centered content */}
                    <h1 className="relative z-10 mx-auto max-w-3xl rounded-2xl border border-white/30 bg-white/20 px-8 py-6 text-center text-3xl font-bold tracking-tight text-white shadow-lg backdrop-blur-md md:text-5xl">
                        Ways to Volunteer
                    </h1>

                </section>

                <section className="mt-8 grid gap-6 md:grid-cols-3">
                    {opportunities?.map((opportunity: VolunteerOpportunity) => {
                        const emailSubject = opportunity.emailSubject || opportunity.title || "Volunteer Opportunity";
                        const mailtoHref = `mailto:${opportunityEmail}?subject=${encodeURIComponent(emailSubject)}`;
                        const href = opportunity.linkUrl?.trim() ? opportunity.linkUrl : mailtoHref;

                        return (
                            <div key={opportunity._id}
                                 className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-2 items-center">
                                <h2 className="text-red-800 font-bold">{opportunity.title}</h2>
                                <p>{opportunity.description}</p>
                                <a className="text-slate-900 underline" href={href}>{opportunity.linkText}</a>
                            </div>
                        );
                    })}
                </section>

            </main>

            <Footer />
        </div>
    );
}
