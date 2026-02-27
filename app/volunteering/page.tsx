const volunteerWays = [
	{
		title: "Build & Repair Team",
		description:
			"Help with light construction, painting, and home repair projects for families and veterans in need.",
		commitment: "Weekday and Saturday shifts",
	},
	{
		title: "Community Outreach",
		description:
			"Represent Patriot Housing at local events, share resources, and connect neighbors to housing support.",
		commitment: "Flexible monthly events",
	},
	{
		title: "Office & Admin Support",
		description:
			"Assist with scheduling, data entry, and volunteer coordination to keep programs running smoothly.",
		commitment: "2-4 hours per week",
	},
	{
		title: "Donation & Supply Drive",
		description:
			"Organize and sort donated household items, furniture, and welcome kits for newly housed residents.",
		commitment: "Seasonal and ongoing opportunities",
	},
	{
		title: "Mentorship & Move-In Support",
		description:
			"Welcome families into stable housing by helping with move-ins and providing basic neighborhood orientation.",
		commitment: "As-needed weekend support",
	},
	{
		title: "Professional Skills Volunteer",
		description:
			"Contribute legal, financial, counseling, or job-readiness expertise to empower long-term stability.",
		commitment: "By appointment",
	},
];

export default function VolunteeringPage() {
	return (
		<main className="min-h-screen bg-white text-slate-900">
			<section className="bg-blue-800 text-white">
				<div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
					<p className="mb-3 inline-block rounded-full bg-red-600 px-4 py-1 text-sm font-semibold tracking-wide">
						Patriot Housing
					</p>
					<h1 className="text-4xl font-bold leading-tight md:text-5xl">
						Volunteer With Us
					</h1>
					<p className="mt-4 max-w-2xl text-base text-blue-100 md:text-lg">
						Join our mission to provide safe, stable housing through hands-on service,
						compassionate outreach, and community partnership.
					</p>
				</div>
			</section>

			<section className="border-y border-slate-200 bg-white">
				<div className="mx-auto max-w-6xl px-6 py-8">
					<p className="text-center text-sm font-medium text-slate-700 md:text-base">
						Every hour you give strengthens a family, a veteran, and a neighborhood.
					</p>
				</div>
			</section>

			<section className="mx-auto max-w-6xl px-6 py-14 md:py-16">
				<h2 className="text-2xl font-bold text-blue-800 md:text-3xl">
					Ways to Volunteer
				</h2>
				<div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{volunteerWays.map((way) => (
						<article
							key={way.title}
							className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
						>
							<h3 className="text-xl font-semibold text-red-700">{way.title}</h3>
							<p className="mt-3 text-sm leading-6 text-slate-700">{way.description}</p>
							<p className="mt-4 text-sm font-medium text-blue-700">{way.commitment}</p>
						</article>
					))}
				</div>
			</section>

			<section className="bg-red-700 text-white">
				<div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-12 md:flex-row md:items-center">
					<div>
						<h2 className="text-2xl font-bold md:text-3xl">Ready to Serve?</h2>
						<p className="mt-2 text-red-100">
							Sign up today and help Patriot Housing build stronger communities.
						</p>
					</div>
					<a
						href="mailto:volunteer@patriothousing.org"
						className="rounded-md bg-white px-5 py-3 text-sm font-semibold text-blue-800 transition hover:bg-blue-100"
					>
						Contact Volunteer Team
					</a>
				</div>
			</section>
		</main>
	);
}
