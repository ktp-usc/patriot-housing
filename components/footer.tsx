import Image from "next/image";
import Logo from "@/components/images/PatriotHousingLogo.png"
import Link from "next/link";
import { BookOpen, Heart, Home, Mail, Users } from "lucide-react";
export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900">
      <div className="mx-auto w-full max-w-7xl px-6 py-3 text-sm md:px-10 text-white mt-8 grid gap-6 md:grid-cols-2">
        <section className="">
          <Image src={Logo} alt="Patriot Housing Logo" className="size-20 inline-flex" />
          <h1 className="text-5xl font-bold inline-flex ml-2">Patriot Housing</h1>
        </section>
        <section>
          <Link href="/" className="inline-flex items-center gap-2 px-2">
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
      </div>
    </footer>
  );
}
