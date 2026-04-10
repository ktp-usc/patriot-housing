"use client";

import {FormEvent, useState} from "react";
import {useRouter} from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function DatabaseLogin() {
    const router = useRouter();
    const [databasePasswordInput, setDatabasePasswordInput] = useState("");
    const [databaseError, setDatabaseError] = useState("");

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
        <div className="flex min-h-screen flex-col overflow-x-hidden bg-slate-900 text-slate-900">
            <Header/>
            <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-14">
                <section className="mt-8 border-t border-slate-200 pt-6 sm:mt-10">
                    <h2 className="text-xs font-semibold uppercase tracking-wide text-white">
                        Database Access
                    </h2>

                    <p className="mt-1 text-xs text-white">
                        Enter the password to open the database page.
                    </p>

                    <form
                        onSubmit={handleDatabaseAccess}
                        className="mt-3 flex flex-col gap-3 sm:gap-2 md:flex-row md:items-center"
                    >
                        <input
                            type="password"
                            value={databasePasswordInput}
                            onChange={(event) => setDatabasePasswordInput(event.target.value)}
                            className="w-full rounded-md border text-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-600 md:max-w-[220px]"
                            placeholder="Password"
                            required
                        />

                        <button
                            type="submit"
                            className="inline-flex w-full items-center justify-center rounded-md bg-slate-800 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 md:w-fit"
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
            </main>

            <Footer/>;
        </div>
    );
}