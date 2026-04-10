"use client";

import { useState, useEffect } from "react";
import AdminLoginGate from "@/components/admin-login-gate";
import NewsletterEmailComposer from "@/components/newsletter-email-composer";

type SubscriberRow = {
	firstName: string;
	lastName: string;
	email: string;
	createdAt: string;
};

function escapeCsvCell(value: string): string {
	const escaped = value.replaceAll('"', '""');
	return `"${escaped}"`;
}

function createCsvDataUri(rows: SubscriberRow[]): string {
	const header = ["firstName", "lastName", "email", "createdAt"];
	const csvRows = rows.map((row) => [
		escapeCsvCell(row.firstName),
		escapeCsvCell(row.lastName),
		escapeCsvCell(row.email),
		escapeCsvCell(row.createdAt),
	]);
	const csv = [header.join(","), ...csvRows.map((row) => row.join(","))].join("\n");
	const withBom = `\uFEFF${csv}`;
	return `data:text/csv;charset=utf-8,${encodeURIComponent(withBom)}`;
}

export default function AdminDashboard() {
	const [token, setToken] = useState<string | null>(null);
	const [subscribers, setSubscribers] = useState<SubscriberRow[]>([]);
	const [tableError, setTableError] = useState("");
	const [isLoadingSubscribers, setIsLoadingSubscribers] = useState(false);

	function handleAuthenticated(newToken: string) {
		setToken(newToken);
	}

	// Load subscribers once authenticated
	useEffect(() => {
		if (!token) {
			return;
		}

		async function loadSubscribers() {
			setIsLoadingSubscribers(true);
			setTableError("");

			try {
				const response = await fetch("/api/admin/subscribers", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ token }),
				});

				if (!response.ok) {
					const data = await response.json();
					setTableError(data.error || "Unable to load subscribers.");
					return;
				}

				const data = await response.json();
				setSubscribers(data.subscribers || []);
			} catch {
				setTableError("Unable to connect to the server.");
			} finally {
				setIsLoadingSubscribers(false);
			}
		}

		loadSubscribers();
	}, [token]);

	const csvDataUri = subscribers.length > 0 ? createCsvDataUri(subscribers) : "";

	if (!token) {
		return <AdminLoginGate onAuthenticated={handleAuthenticated} />;
	}

	return (
		<>
			<p className="mt-4 max-w-3xl text-sm text-slate-600 sm:text-base md:text-lg">
				Write a message and send it to every newsletter subscriber.
			</p>

			<div className="mt-6 sm:mt-8">
				<NewsletterEmailComposer token={token} />
			</div>

			<div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:mt-10 sm:p-6">
				{/* Header Row */}
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<h2 className="text-base font-semibold text-slate-900 sm:text-lg">
						Newsletter Subscribers
					</h2>

					{csvDataUri && (
						<a
							href={csvDataUri}
							download="newsletter-subscribers.csv"
							className="inline-flex w-full cursor-pointer items-center justify-center rounded-md bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 sm:w-fit"
						>
							Download CSV
						</a>
					)}
				</div>

				<p className="mt-2 text-sm text-slate-600">
					Total subscribers: {isLoadingSubscribers ? "…" : subscribers.length}
				</p>

				{tableError && (
					<p className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
						{tableError}
					</p>
				)}

				{isLoadingSubscribers ? (
					<div className="flex items-center justify-center py-10">
						<div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-700" />
					</div>
				) : (
					<>
						{/* Table */}
						<div className="mt-4 overflow-hidden rounded-md border border-slate-200 bg-white">
							<div className="overflow-x-auto">
								<table className="min-w-[640px] w-full text-left text-sm">
									<thead className="bg-slate-100 text-slate-700">
										<tr>
											<th className="px-3 py-3 font-semibold sm:px-4">First Name</th>
											<th className="px-3 py-3 font-semibold sm:px-4">Last Name</th>
											<th className="px-3 py-3 font-semibold sm:px-4">Email</th>
											<th className="px-3 py-3 font-semibold sm:px-4">Joined</th>
										</tr>
									</thead>

									<tbody>
										{subscribers.length === 0 ? (
											<tr>
												<td className="px-3 py-4 text-slate-500 sm:px-4" colSpan={4}>
													No subscribers found.
												</td>
											</tr>
										) : (
											subscribers.map((subscriber) => (
												<tr key={subscriber.email} className="border-t border-slate-100">
													<td className="px-3 py-3 sm:px-4">{subscriber.firstName}</td>
													<td className="px-3 py-3 sm:px-4">{subscriber.lastName}</td>
													<td className="px-3 py-3 sm:px-4 break-words">{subscriber.email}</td>
													<td className="px-3 py-3 sm:px-4 whitespace-nowrap">
														{new Date(subscriber.createdAt).toLocaleString()}
													</td>
												</tr>
											))
										)}
									</tbody>
								</table>
							</div>
						</div>

						{/* Mobile hint */}
						<p className="mt-3 text-xs text-slate-500 sm:hidden">
							Swipe sideways to view the full table.
						</p>
					</>
				)}
			</div>
		</>
	);
}
