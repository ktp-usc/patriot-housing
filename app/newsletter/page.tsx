"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { postJSON } from "@/client/api/jsonutils";

type NewsletterFormState = {
    firstName: string;
    lastName: string;
    email: string;
};

const initialFormState: NewsletterFormState = {
    firstName: "",
    lastName: "",
    email: "",
};

export default function NewsletterPage() {
    const router = useRouter();
    const [formState, setFormState] = useState<NewsletterFormState>(initialFormState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [databasePasswordInput, setDatabasePasswordInput] = useState("");
    const [databaseError, setDatabaseError] = useState("");

    async function handleNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitError("");
        setIsSubmitted(false);
        setIsSubmitting(true);

        try {
            await postJSON<{ success: boolean }>("/api/newsletter", formState);

            setFormState(initialFormState);
            setIsSubmitted(true);
        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : "Something went wrong.");
        } finally {
            setIsSubmitting(false);
        }
    }

    function handleDatabaseAccess(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setDatabaseError("");

        const normalizedPasswordInput = databasePasswordInput.trim();

        if (!normalizedPasswordInput) {
            setDatabaseError("Password is required.");
            return;
        }

        router.push(`/database?access=${encodeURIComponent(normalizedPasswordInput)}`);
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <Header />

            <main className="mx-auto w-full max-w-4xl px-6 py-10 md:px-10 md:py-14">
                <section className="rounded-2xl border border-slate-200 bg-slate-50 p-8 md:p-12">
                    <section className = "relative overflow-hidden px-4 py-20 bg-[url('/images/newsletterImage.jpg')] bg-cover bg-center rounded-2xl drop-shadow-amber-100 ">
                        <div className="absolute inset-0 bg-blue-900/50"></div>
                        <h1 className= "relative z-10 mx-auto max-w-3xl text-centerbg-white/20 backdrop-blur-md px-8 py-6 rounded-2xl border border-white/30 shadow-lg text-3xl font-bold tracking-tight md:text-5xl text-white">Newsletter</h1>
                    </section>
                    <p className="mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
                        Get Patriot Housing updates by email.
                    </p>

                    <form onSubmit={handleNewsletterSubmit} className="mt-8 grid gap-5" noValidate>
                        <div className="grid gap-5 md:grid-cols-2">
                            <label className="grid gap-2 text-sm font-medium text-slate-700" htmlFor="firstName">
                                First Name
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    autoComplete="given-name"
                                    value={formState.firstName}
                                    onChange={(event) => setFormState((prev) => ({ ...prev, firstName: event.target.value }))}
                                    className="rounded-lg border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-slate-600"
                                    required
                                />
                            </label>

                            <label className="grid gap-2 text-sm font-medium text-slate-700" htmlFor="lastName">
                                Last Name
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    autoComplete="family-name"
                                    value={formState.lastName}
                                    onChange={(event) => setFormState((prev) => ({ ...prev, lastName: event.target.value }))}
                                    className="rounded-lg border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-slate-600"
                                    required
                                />
                            </label>
                        </div>

                        <label className="grid gap-2 text-sm font-medium text-slate-700" htmlFor="email">
                            Email
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={formState.email}
                                onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
                                className="rounded-lg border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-slate-600"
                                required
                            />
                        </label>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex w-fit items-center rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                        >
                            {isSubmitting ? "Submitting..." : "Join Newsletter"}
                        </button>

                        {isSubmitted && (
                            <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                                You are signed up. We will keep you updated.
                            </p>
                        )}

                        {submitError && (
                            <p className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                                {submitError}
                            </p>
                        )}
                    </form>

                    <section className="mt-10 border-t border-slate-200 pt-6">
                        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Database Access</h2>
                        <p className="mt-1 text-xs text-slate-500">
                            Enter the password to open the database page.
                        </p>

                        <form onSubmit={handleDatabaseAccess} className="mt-3 flex flex-col gap-2 md:flex-row md:items-center">
                            <input
                                type="password"
                                value={databasePasswordInput}
                                onChange={(event) => setDatabasePasswordInput(event.target.value)}
                                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-600 md:max-w-[220px]"
                                placeholder="Password"
                                required
                            />
                            <button
                                type="submit"
                                className="inline-flex w-fit items-center rounded-md bg-slate-800 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-700"
                            >
                                Open Database
                            </button>
                        </form>

                        {databaseError && (
                            <p className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                                {databaseError}
                            </p>
                        )}
                    </section>
                </section>
            </main>

            <Footer />
        </div>
    );
}
