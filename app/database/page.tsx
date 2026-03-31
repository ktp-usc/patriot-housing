import Header from "@/components/header";
import Footer from "@/components/footer";

export default function DatabasePage() {
	return (
		<div className="min-h-screen bg-white text-slate-900">
			<Header />

			<main className="mx-auto w-full max-w-7xl px-6 py-10 md:px-10 md:py-14">
				<section className="rounded-2xl border border-slate-200 bg-white p-8 md:p-12">
					<h1 className="text-3xl font-bold tracking-tight md:text-5xl">Database</h1>

					<p className="mt-4 max-w-3xl text-base text-slate-600 md:text-lg"></p>

					<div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
						<h2 className="text-lg font-semibold text-slate-900">Newsletter Entries</h2>
						<div className="mt-4 min-h-56 overflow-x-auto rounded-md border border-slate-200 bg-white p-4" />
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
