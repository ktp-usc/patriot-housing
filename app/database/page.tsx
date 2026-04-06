"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useSubscribers } from "@/client/queries/use-subscribers";
import { Download, RefreshCw, Loader2, Inbox } from "lucide-react";
import * as XLSX from "xlsx";

const ADMIN_SESSION_KEY = "patriot_housing_database_auth";

export default function DatabasePage() {
	const router = useRouter();
	const [authorized, setAuthorized] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const session = window.sessionStorage.getItem(ADMIN_SESSION_KEY);
			if (session !== "true") {
				router.replace("/newsletter");
			} else {
				setAuthorized(true);
			}
		}
	}, [router]);

	const { data: subscribers, isLoading, error, refetch, isFetching } = useSubscribers();

	function handleDownload() {
		if (!subscribers || subscribers.length === 0) return;

		const rows = subscribers.map((s) => ({
			"First Name": s.firstName,
			"Last Name": s.lastName,
			"Email": s.email,
			"Joined Date": new Date(s.createdAt).toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
			}),
		}));

		const worksheet = XLSX.utils.json_to_sheet(rows);

		/* Auto-size columns */
		const colWidths = Object.keys(rows[0]).map((key) => {
			const maxLen = Math.max(
				key.length,
				...rows.map((r) => String(r[key as keyof typeof r]).length)
			);
			return { wch: maxLen + 2 };
		});
		worksheet["!cols"] = colWidths;

		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Subscribers");
		XLSX.writeFile(workbook, "newsletter_subscribers.xlsx");
	}

	if (!authorized) {
		return (
			<div className="min-h-screen bg-white text-slate-900">
				<Header />
				<main className="mx-auto flex w-full max-w-7xl items-center justify-center px-6 py-20">
					<Loader2 className="h-6 w-6 animate-spin text-slate-400" />
				</main>
				<Footer />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white text-slate-900">
			<Header />

			<main className="mx-auto w-full max-w-7xl px-6 py-10 md:px-10 md:py-14">
				<section className="rounded-2xl border border-slate-200 bg-white p-8 md:p-12">
					<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
						<div>
							<h1 className="text-3xl font-bold tracking-tight md:text-5xl">Database</h1>
							<p className="mt-2 text-base text-slate-600 md:text-lg">
								View and export newsletter subscriber data.
							</p>
						</div>

						<div className="flex gap-3">
							<button
								onClick={() => refetch()}
								disabled={isFetching}
								className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-95 disabled:pointer-events-none disabled:opacity-50"
							>
								<RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
								Refresh
							</button>

							<button
								onClick={handleDownload}
								disabled={!subscribers || subscribers.length === 0}
								className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 active:scale-95 disabled:pointer-events-none disabled:bg-slate-400"
							>
								<Download className="h-4 w-4" />
								Download .xlsx
							</button>
						</div>
					</div>

					{/* Data table */}
					<div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
						<h2 className="text-lg font-semibold text-slate-900">Newsletter Entries</h2>

						{isLoading ? (
							<div className="mt-6 flex items-center justify-center py-16">
								<Loader2 className="h-6 w-6 animate-spin text-slate-400" />
								<span className="ml-3 text-sm text-slate-500">Loading subscribers...</span>
							</div>
						) : error ? (
							<div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
								Failed to load subscribers. Please try refreshing.
							</div>
						) : !subscribers || subscribers.length === 0 ? (
							<div className="mt-6 flex flex-col items-center justify-center py-16 text-slate-400">
								<Inbox className="h-10 w-10" />
								<p className="mt-3 text-sm">No subscribers yet.</p>
							</div>
						) : (
							<div className="mt-4 overflow-x-auto rounded-md border border-slate-200 bg-white">
								<table className="w-full text-left text-sm">
									<thead>
										<tr className="border-b border-slate-200 bg-slate-100">
											<th className="px-4 py-3 font-semibold text-slate-700">First Name</th>
											<th className="px-4 py-3 font-semibold text-slate-700">Last Name</th>
											<th className="px-4 py-3 font-semibold text-slate-700">Email</th>
											<th className="px-4 py-3 font-semibold text-slate-700">Joined Date</th>
										</tr>
									</thead>
									<tbody>
										{subscribers.map((sub) => (
											<tr
												key={sub.id}
												className="border-b border-slate-100 transition hover:bg-slate-50"
											>
												<td className="px-4 py-3 text-slate-900">{sub.firstName}</td>
												<td className="px-4 py-3 text-slate-900">{sub.lastName}</td>
												<td className="px-4 py-3 text-slate-600">{sub.email}</td>
												<td className="px-4 py-3 text-slate-600">
													{new Date(sub.createdAt).toLocaleDateString("en-US", {
														year: "numeric",
														month: "long",
														day: "numeric",
													})}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}

						{subscribers && subscribers.length > 0 && (
							<p className="mt-3 text-xs text-slate-400">
								{subscribers.length} subscriber{subscribers.length !== 1 ? "s" : ""} total
							</p>
						)}
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
