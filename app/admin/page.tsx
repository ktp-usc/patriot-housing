import Header from "@/components/header";
import Footer from "@/components/footer";
import AdminDashboard from "@/components/admin-dashboard";

export default function AdminPage() {
	return (
		<div className="flex min-h-screen flex-col overflow-x-hidden bg-slate-50 text-slate-900">
			<Header />

			<main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-14">
				<section className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6 md:p-8 md:p-12">
					<section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-14">
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)]" />
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(220,38,38,0.1),transparent_50%)]" />

						<div className="relative z-10 mx-auto max-w-3xl rounded-2xl border border-white/20 bg-white/10 px-4 py-5 text-center shadow-lg backdrop-blur-md sm:px-6 sm:py-6 md:px-8">
							<h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-5xl">
								Newsletter Admin
							</h1>
							<p className="mx-auto mt-3 max-w-lg text-sm text-white/70 sm:text-base">
								Manage subscribers and send newsletter updates
							</p>
						</div>
					</section>

					<AdminDashboard />
				</section>
			</main>

			<Footer />
		</div>
	);
}
