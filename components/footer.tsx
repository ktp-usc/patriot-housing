import Image from "next/image";
import Logo from "@/components/images/PatriotHousingLogo.png"
import Link from "next/link";
import { Heart, Home, Mail, Users } from "lucide-react";
export default function Footer() {
  return (
    <footer className="border-slate-200 bg-slate-900">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-6 text-sm text-white md:grid-cols-3 md:px-10">
        <section className="flex flex-col -mt-1">
          <div className="flex items-center gap-4">
            <Image src={Logo}
              alt="Patriot Housing Logo"
              className="size-20 inline-flex"
            />
            <h1 className="text-2xl font-bold inline-flex ml-5">
              Patriot Housing
            </h1>
          </div>
          <p className="mt-3 max-w-sm text-white/90">
            Providing safe, affordable housing to veterans and their families,
            because those who served deserve a place to call home.
          </p>
        </section>
        <section className="flex flex-col items-center justify-center gap-3 md:pt-2">
          <Link href="/" className="inline-flex items-center gap-2 px-2 hover:text-blue-400 transition">
            <Home size={16} />Home</Link>
          <Link href="/newsletter" className="inline-flex items-center gap-2 px-2 hover:text-blue-400 transition">
            <Mail size={16} />Newsletter</Link>
          <Link href="/donate" className="inline-flex items-center gap-2 px-2 hover:text-blue-400 transition">
            <Heart size={16} />Donate</Link>
          <Link href="/volunteer" className="inline-flex items-center gap-2 px-2 hover:text-blue-400 transition">
            <Users size={16} />Volunteer</Link>
        </section>
        <section className="text-1xl font-bold text-slate-400">
          <p className="text-xl font-bold text-slate-400">
            Contact:
          </p>
          <a className="text-sm text-white" href="mailto:info@patriothousing.org">
            info@patriothousing.org
          </a>
          <p className="text-xl font-bold text-slate-400">
            Address:
          </p>
          <p className="text-sm text-white">
            1520 Remount Rd (by appt only)
            N Charleston, SC 29406, US
          </p>
        </section>
      </div>
      {/* <p className="mx-auto mt-8 max-w-6xl border-t pt-6 text-center text-sm text-muted-foreground">
        © 2026 Patriot Housing. All rights reserved.
      </p> */}
    </footer>
  );
}
