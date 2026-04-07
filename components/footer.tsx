import Image from "next/image";
import Logo from "@/components/images/PatriotHousingLogo.png"
import Link from "next/link";
import { BookOpen, Heart, Home, Mail, Users } from "lucide-react";
export default function Footer() {
  return (
<<<<<<< HEAD
    <footer className="mt-8 border-t border-slate-200 bg-blue-700">
      <div className="mx-auto flex w-full max-w-7xl justify-center px-6 py-10 text-white md:px-10">
        <div className="flex w-full max-w-4xl flex-col items-center gap-6 md:flex-row md:items-stretch md:justify-center">
          <section className="flex w-full max-w-lg flex-col justify-center p-6 text-center">
            <div className="flex w-full items-center justify-center gap-4">
              <Image src={Logo} alt="Patriot Housing Logo" className="size-14" />
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Patriot Housing</h2>
            </div>
            <p className="mt-4 text-base leading-7 font-semibold text-blue-100">
              Providing safe, affordable housing to veterans and their families, because those who served deserve a place to call home.
            </p>
          </section>

          <nav aria-label="Quick Links" className="flex w-full max-w-sm flex-col p-6 text-center">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
              Quick Links
            </h2>
            <div className="mt-4 flex flex-col items-center gap-3 text-base font-semibold">
              <Link href="/" className="inline-flex text-blue-100 transition hover:text-white hover:underline hover:decoration-red-400 hover:underline-offset-6 decoration-2">Home</Link>
              <Link href="/newsletter" className="inline-flex text-blue-100 transition hover:text-white hover:underline hover:decoration-red-400 hover:underline-offset-6 decoration-2">Newsletter</Link>
              <Link href="/donate" className="inline-flex text-blue-100 transition hover:text-white hover:underline hover:decoration-red-400 hover:underline-offset-6 decoration-2">Donate</Link>
              <Link href="/volunteer" className="inline-flex text-blue-100 transition hover:text-white hover:underline hover:decoration-red-400 hover:underline-offset-6 decoration-2">Volunteer</Link>
              <Link href="/resources" className="inline-flex text-blue-100 transition hover:text-white hover:underline hover:decoration-red-400 hover:underline-offset-6 decoration-2">Resources</Link>
            </div>
          </nav>
        </div>
=======
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
          <Link href="/resources" className="inline-flex items-center gap-2 px-2 hover:text-blue-400 transition">
            <BookOpen size={16} />Resources</Link>
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
>>>>>>> 90bfd9098c08f00b5a357c7b686e68335b021e6e
      </div>
      {/* <p className="mx-auto mt-8 max-w-6xl border-t pt-6 text-center text-sm text-muted-foreground">
        © 2026 Patriot Housing. All rights reserved.
      </p> */}
    </footer>
  );
}