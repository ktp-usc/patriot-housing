"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/images/PatriotHousingLogo.png";
import { House, Users, Heart, Mail, Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }

  return (
    <header className="border-b border-slate-800 bg-black">
      <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 md:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            onClick={closeMenu}
            className="inline-flex items-center gap-2 text-base font-bold text-white hover:underline hover:decoration-red-600 hover:underline-offset-6 decoration-3"
          >
            <Image
              src={Logo}
              alt="Patriot Housing Logo"
              className="h-8 w-8 object-contain"
            />
            <span>Patriot Housing</span>
          </Link>

          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex items-center justify-center rounded-md border border-slate-700 p-2 text-white transition hover:bg-slate-900 md:hidden"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <nav className="hidden md:block">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-100 lg:gap-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-center transition hover:bg-slate-900 hover:underline hover:decoration-red-600 hover:underline-offset-4"
              >
                <House className="h-4 w-4 shrink-0" />
                <span>Home</span>
              </Link>

              <Link
                href="/newsletter"
                className="inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-center transition hover:bg-slate-900 hover:underline hover:decoration-red-600 hover:underline-offset-4"
              >
                <Mail className="h-4 w-4 shrink-0" />
                <span>Newsletter</span>
              </Link>

              <Link
                href="/donate"
                className="inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-center transition hover:bg-slate-900 hover:underline hover:decoration-red-600 hover:underline-offset-4"
              >
                <Heart className="h-4 w-4 shrink-0" />
                <span>Donate</span>
              </Link>

              <Link
                href="/volunteer"
                className="inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-center transition hover:bg-slate-900 hover:underline hover:decoration-red-600 hover:underline-offset-4"
              >
                <Users className="h-4 w-4 shrink-0" />
                <span>Volunteer</span>
              </Link>
            </div>
          </nav>
        </div>

        {isOpen && (
          <nav className="mt-3 border-t border-slate-800 pt-3 md:hidden">
            <div className="grid grid-cols-1 gap-2 text-sm font-bold text-slate-100">
              <Link
                href="/"
                onClick={closeMenu}
                className="inline-flex items-center gap-2 rounded-md px-3 py-3 transition hover:bg-slate-900"
              >
                <House className="h-4 w-4 shrink-0" />
                <span>Home</span>
              </Link>

              <Link
                href="/newsletter"
                onClick={closeMenu}
                className="inline-flex items-center gap-2 rounded-md px-3 py-3 transition hover:bg-slate-900"
              >
                <Mail className="h-4 w-4 shrink-0" />
                <span>Newsletter</span>
              </Link>

              <Link
                href="/donate"
                onClick={closeMenu}
                className="inline-flex items-center gap-2 rounded-md px-3 py-3 transition hover:bg-slate-900"
              >
                <Heart className="h-4 w-4 shrink-0" />
                <span>Donate</span>
              </Link>

              <Link
                href="/volunteer"
                onClick={closeMenu}
                className="inline-flex items-center gap-2 rounded-md px-3 py-3 transition hover:bg-slate-900"
              >
                <Users className="h-4 w-4 shrink-0" />
                <span>Volunteer</span>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}