"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

// This small client-only component owns the password field shown in the newsletter footer.
// Keeping it separate from the main footer prevents the entire footer from needing client-side
// state while still letting this form validate input and navigate immediately after submit.
export default function FooterDatabaseAccess() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    // We trim the input so accidental leading/trailing spaces do not create a broken access URL.
    // If the field is empty after normalization, we keep the user on the current page and show
    // a small inline error instead of trying to navigate with an invalid query string.
    const normalizedPassword = password.trim();

    if (!normalizedPassword) {
      setError("Password is required.");
      return;
    }

    // The database page already knows how to validate the provided `access` query parameter
    // against the configured server-side password. This form only packages the input into the
    // existing route contract and forwards the user there.
    router.push(`/database?access=${encodeURIComponent(normalizedPassword)}`);
  }

  return (
    <div className="w-full md:max-w-sm">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end"
      >
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-white/30 focus:bg-white/10"
          placeholder="Password"
          aria-label="Database access password"
          required
        />

        <button
          type="submit"
          className="inline-flex shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white/80 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
        >
          Open
        </button>
      </form>

      {error ? <p className="mt-2 text-xs text-rose-300">{error}</p> : null}
    </div>
  );
}
