"use client";

import { FormEvent, useState, useEffect, useRef } from "react";

type AdminLoginGateProps = {
	onAuthenticated: (token: string) => void;
};

export default function AdminLoginGate({ onAuthenticated }: AdminLoginGateProps) {
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [lockedUntil, setLockedUntil] = useState<number | null>(null);
	const [countdown, setCountdown] = useState(0);
	const [isCheckingSession, setIsCheckingSession] = useState(true);
	const inputRef = useRef<HTMLInputElement | null>(null);

	// Check for existing session on mount
	useEffect(() => {
		async function checkExistingSession() {
			const storedToken = sessionStorage.getItem("admin_token");
			if (!storedToken) {
				setIsCheckingSession(false);
				return;
			}

			try {
				const response = await fetch("/api/admin/verify", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ token: storedToken }),
				});

				if (response.ok) {
					onAuthenticated(storedToken);
					return;
				}
			} catch {
				// Token invalid — fall through to login form
			}

			sessionStorage.removeItem("admin_token");
			setIsCheckingSession(false);
		}

		checkExistingSession();
	}, [onAuthenticated]);

	// Countdown timer for lockout
	useEffect(() => {
		if (!lockedUntil) {
			setCountdown(0);
			return;
		}

		function tick() {
			const remaining = Math.max(0, Math.ceil((lockedUntil! - Date.now()) / 1000));
			setCountdown(remaining);

			if (remaining <= 0) {
				setLockedUntil(null);
				setError("");
			}
		}

		tick();
		const interval = setInterval(tick, 1000);
		return () => clearInterval(interval);
	}, [lockedUntil]);

	// Derive lockout state from countdown (managed by the timer effect) rather than
	// calling Date.now() directly in render, which can produce stale values.
	const isLockedOut = countdown > 0;

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError("");

		const trimmed = password.trim();
		if (!trimmed) {
			setError("Password is required.");
			return;
		}

		if (isLockedOut) {
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await fetch("/api/admin/auth", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ password: trimmed }),
			});

			const data = await response.json();

			if (response.ok && data.token) {
				sessionStorage.setItem("admin_token", data.token);
				onAuthenticated(data.token);
				return;
			}

			if (response.status === 429 && data.lockedUntil) {
				setLockedUntil(data.lockedUntil);
			}

			setError(data.error || "Authentication failed.");
			setPassword("");
			inputRef.current?.focus();
		} catch {
			setError("Unable to connect to the server.");
		} finally {
			setIsSubmitting(false);
		}
	}

	if (isCheckingSession) {
		return (
			<div className="flex items-center justify-center py-20">
				<div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-700" />
			</div>
		);
	}


	return (
		<div className="mx-auto mt-10 w-full max-w-md">
			<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
				<div className="mb-6 text-center">
					<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
						<svg
							className="h-7 w-7 text-slate-600"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
							/>
						</svg>
					</div>

					<h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
						Admin Access
					</h2>

					<p className="mt-2 text-sm text-slate-500">
						Enter the admin password to access the newsletter management tools.
					</p>
				</div>

				<form onSubmit={handleSubmit} className="grid gap-4" noValidate>
					<label className="grid gap-2 text-sm font-medium text-slate-700" htmlFor="admin-password">
						Password
						<input
							ref={inputRef}
							id="admin-password"
							type="password"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							disabled={isLockedOut || isSubmitting}
							className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-slate-600 disabled:cursor-not-allowed disabled:bg-slate-100"
							placeholder="Enter admin password"
							autoFocus
							required
						/>
					</label>

					<button
						type="submit"
						disabled={isLockedOut || isSubmitting}
						className="inline-flex w-full cursor-pointer items-center justify-center rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
					>
						{isSubmitting
							? "Verifying..."
							: isLockedOut
								? `Locked (${Math.floor(countdown / 60)}:${String(countdown % 60).padStart(2, "0")})`
								: "Sign In"}
					</button>

					{error && (
						<p
							className={`rounded-lg border px-4 py-3 text-sm ${
								isLockedOut
									? "border-amber-200 bg-amber-50 text-amber-700"
									: "border-rose-200 bg-rose-50 text-rose-700"
							}`}
						>
							{error}
							{isLockedOut && countdown > 0 && (
								<span className="mt-1 block text-xs">
									Try again in {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, "0")}
								</span>
							)}
						</p>
					)}
				</form>
			</div>
		</div>
	);
}
