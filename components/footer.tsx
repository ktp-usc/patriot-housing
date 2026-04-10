import Image from "next/image";
import Logo from "@/components/images/PatriotHousingLogo.png";
import Link from "next/link";
import { Heart, Home, Mail, Users } from "lucide-react";
import FooterDatabaseAccess from "@/components/footer-database-access";

// The footer is shared by multiple public pages. This flag allows one page to opt into
// the low-visibility database access strip without copying the footer markup or exposing
// the control globally across the rest of the site.
type FooterProps = {
  showDatabaseAccess?: boolean;
};

export default function Footer({ showDatabaseAccess = false }: FooterProps) {
  return (
    <footer className="mt-auto bg-slate-900 text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 md:grid-cols-3 md:gap-10 md:px-10 md:py-10">
        <section className="flex flex-col items-center text-center md:items-start md:text-left">
          <div className="flex items-center justify-center gap-3 sm:gap-4 md:justify-start">
            <Image
              src={Logo}
              alt="Patriot Housing Logo"
              className="h-14 w-14 object-contain sm:h-16 sm:w-16"
            />
            <h2 className="text-xl font-bold sm:text-2xl">Patriot Housing</h2>
          </div>

          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/90 sm:text-base">
            Providing safe, affordable housing to veterans and their families,
            because those who served deserve a place to call home.
          </p>
        </section>

        <section className="mx-auto flex w-full max-w-sm flex-col gap-2 md:items-center md:justify-center md:pt-2">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md px-3 py-2.5 text-center transition hover:bg-white/5 hover:text-blue-400 md:w-auto md:px-2 md:py-2"
          >
            <Home className="h-4 w-4 shrink-0" />
            <span>Home</span>
          </Link>

          <Link
            href="/newsletter"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md px-3 py-2.5 text-center transition hover:bg-white/5 hover:text-blue-400 md:w-auto md:px-2 md:py-2"
          >
            <Mail className="h-4 w-4 shrink-0" />
            <span>Newsletter</span>
          </Link>

          <Link
            href="/donate"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md px-3 py-2.5 text-center transition hover:bg-white/5 hover:text-blue-400 md:w-auto md:px-2 md:py-2"
          >
            <Heart className="h-4 w-4 shrink-0" />
            <span>Donate</span>
          </Link>

          <Link
            href="/volunteer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md px-3 py-2.5 text-center transition hover:bg-white/5 hover:text-blue-400 md:w-auto md:px-2 md:py-2"
          >
            <Users className="h-4 w-4 shrink-0" />
            <span>Volunteer</span>
          </Link>
        </section>

        <section className="text-center text-slate-400 md:text-left">
          <p className="text-lg font-bold sm:text-xl">Contact:</p>
          <a
            className="mt-1 block break-words text-sm text-white sm:text-base"
            href="mailto:info@tcvsn.org"
          >
            info@tcvsn.org
          </a>

          <p className="mt-4 text-lg font-bold sm:text-xl">Address:</p>
          <p className="mt-1 text-sm leading-relaxed text-white sm:text-base">
            1520 Remount Rd (by appt only)
            <br />
            N Charleston, SC 29406, US
          </p>
        </section>
      </div>

      {showDatabaseAccess ? (
        <>
          {/* 
            This extra row is visually separated from the main footer content so it feels like
            a subtle utility control instead of a primary call to action. The actual form lives
            in a client component because it needs local input state and router navigation.
          */}
        <div className="border-t border-white/10">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between md:px-10">
            <div className="text-center md:text-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">
                Database Access
              </p>
              <p className="mt-1 text-xs text-white/45">
                Authorized access only.
              </p>
            </div>

            <FooterDatabaseAccess />
          </div>
        </div>
        </>
      ) : null}

      {/* <p className="mx-auto mt-8 max-w-6xl border-t border-slate-700 pt-6 text-center text-sm text-slate-400">
        (c) 2026 Patriot Housing. All rights reserved.
      </p> */}
    </footer>
  );
}
