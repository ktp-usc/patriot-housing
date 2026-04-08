import Header from "@/components/header";
import Footer from "@/components/footer";

//
export default function WaysToVolunteer() {
    return (
        <div className="min-h-screen bg-white text-slate-900">
            <Header />

            <main className="mx-auto w-full max-w-7xl px-6 py-10 md:px-10 md:py-15">
                <section className="rounded-2xl border border-slate-200 bg-white p-8 md:p-12">

                    <div className="relative overflow-hidden px-4 py-20 bg-[url('/images/volunteerImage3.png')] bg-cover bg-center rounded-2xl flex items-center justify-center">

                        {/* overlay */}
                        <div className="absolute inset-0 bg-blue-900/50"></div>

                        {/* centered content */}
                        <h1 className="relative z-10 mx-auto max-w-3xl text-center bg-white/20 backdrop-blur-md px-8 py-6 rounded-2xl border border-white/30 shadow-lg text-3xl font-bold tracking-tight md:text-5xl text-white">
                            Ways to Volunteer
                        </h1>

                    </div>

                </section>

                <section className="mt-8 grid gap-6 md:grid-cols-3">
                    <div className="rounded-xl border  border-slate-200 bg-slate-50 p-6 space-y-2 items-center">
                        <h2 className = "text-red-800 font-bold">Build & Repair Team</h2>
                        <p>Help with light construction, painting, and home repair projects for families and veterans in need.</p>
                        <a className = "text-slate-900 underline" href = "#">Weekday and Saturday Dates </a>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                        <h2 className = "text-red-800 font-bold">Community Outreach</h2>
                        <p>Represent Habitat Housing at local events, share resources and connect neighbors to housing support.</p>
                        <a className = "text-slate-900 underline" href = "#">Flexible Monthly Events</a>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                        <h2 className = "text-red-800 font-bold">Office & Admin Support</h2>
                        <p>Assist with scheduling, data entry, and volunteer coordination to keep programs running smoothly.</p>
                        <a className = "text-slate-900 underline" href = "#">2-4 hours per week</a>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                        <h2 className = "text-red-800 font-bold">Donation & Supply Drive</h2>
                        <p>Organize and sort donated household items, furniture, and welcome kits for newly housed residents.</p>
                        <a className = "text-slate-900 underline" href = "#">Seasonal and ongoing opporuntities</a>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                        <h2 className = "text-red-800 font-bold">Mentorship & Move-In Support</h2>
                        <p>Welcome families into stable housing by helping with move-ins and providing basic neighborhood orientation.</p>
                        <a className = "text-slate-900 underline" href = "#">As-needed weekend support</a>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                        <h2 className = "text-red-800 font-bold">Professional Skills Volunteer</h2>
                        <p>Contribute legal, financial, counseling, or job-readiness expertise to empower long-term success.</p>
                        <a className = "text-slate-900 underline" href = "#">By Appointment</a>
                    </div>
                </section>
            </main>

            <Footer />
        </div>

    );
}