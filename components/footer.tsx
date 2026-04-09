import Image from "next/image";
import Logo from "@/components/images/PatriotHousingLogo.png";
import Link from "next/link";
import { Heart, Home, Mail, Users } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 md:grid-cols-3 md:px-10">
        <section className="flex flex-col">
          <div className="flex items-center gap-3 sm:gap-4">
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

        <section className="flex flex-col gap-2 md:items-center md:justify-center md:pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md px-2 py-2 transition hover:text-blue-400"
          >
            <Home className="h-4 w-4 shrink-0" />
            <span>Home</span>
          </Link>

          <Link
            href="/newsletter"
            className="inline-flex items-center gap-2 rounded-md px-2 py-2 transition hover:text-blue-400"
          >
            <Mail className="h-4 w-4 shrink-0" />
            <span>Newsletter</span>
          </Link>

          <Link
            href="/donate"
            className="inline-flex items-center gap-2 rounded-md px-2 py-2 transition hover:text-blue-400"
          >
            <Heart className="h-4 w-4 shrink-0" />
            <span>Donate</span>
          </Link>

          <Link
            href="/volunteer"
            className="inline-flex items-center gap-2 rounded-md px-2 py-2 transition hover:text-blue-400"
          >
            <Users className="h-4 w-4 shrink-0" />
            <span>Volunteer</span>
          </Link>
        </section>

        <section className="text-slate-400">
          <p className="text-lg font-bold sm:text-xl">Contact:</p>
          <a
            className="mt-1 block break-words text-sm text-white sm:text-base"
            href="mailto:info@patriothousing.org"
          >
            info@patriothousing.org
          </a>

          <p className="mt-4 text-lg font-bold sm:text-xl">Address:</p>
          <p className="mt-1 text-sm leading-relaxed text-white sm:text-base">
            1520 Remount Rd (by appt only)
            <br />
            N Charleston, SC 29406, US
          </p>
        </section>
      </div>

      {/* <p className="mx-auto mt-8 max-w-6xl border-t border-slate-700 pt-6 text-center text-sm text-slate-400">
        © 2026 Patriot Housing. All rights reserved.
      </p> */}
    </footer>
  );
}