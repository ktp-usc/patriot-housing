"use client";

import { FormEvent, useState } from "react";
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
    const [formState, setFormState] = useState<NewsletterFormState>(initialFormState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

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

    return (
        <div className="flex min-h-screen flex-col overflow-x-hidden bg-slate-50 text-slate-900">
            <Header />

            <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-14">
                <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6 md:p-8 md:p-12">
                    <section className="relative overflow-hidden rounded-2xl bg-[url('/images/newsletterImage.jpg')] bg-cover bg-center px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20">
                        <div className="absolute inset-0 bg-blue-900/50"></div>

                        <div className="relative z-10 mx-auto max-w-3xl rounded-2xl border border-white/30 bg-white/20 px-4 py-5 text-center shadow-lg backdrop-blur-md sm:px-6 sm:py-6 md:px-8">
                            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-5xl">
                                Newsletter
                            </h1>
                        </div>
                    </section>

                    <p className="mt-4 max-w-2xl text-sm text-slate-600 sm:text-base md:text-lg">
                        Get Patriot Housing updates by email.
                    </p>

                    <form onSubmit={handleNewsletterSubmit} className="mt-6 grid gap-4 sm:mt-8 sm:gap-5" noValidate>
                        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                            <label className="grid gap-2 text-sm font-medium text-slate-700" htmlFor="firstName">
                                First Name
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    autoComplete="given-name"
                                    value={formState.firstName}
                                    onChange={(event) =>
                                        setFormState((prev) => ({ ...prev, firstName: event.target.value }))
                                    }
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-slate-600"
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
                                    onChange={(event) =>
                                        setFormState((prev) => ({ ...prev, lastName: event.target.value }))
                                    }
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-slate-600"
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
                                onChange={(event) =>
                                    setFormState((prev) => ({ ...prev, email: event.target.value }))
                                }
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-slate-600"
                                required
                            />
                        </label>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400 sm:w-fit"
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

                </section>
            </main>

        
            <Footer />
        </div>
    );
}
