import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/images/PatriotHousingLogo.png"
import { House, Users, Heart, Mail, BookOpen,} from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-2 md:px-8">
        <span className="text-base font-bold text-slate-900">
          <Link href="/" className="inline-flex items-center gap-2 px-2 hover:underline hover:decoration-red-600 hover:underline-offset-6 decoration-3"><Image src={Logo} alt="Patriot Housing Logo" className="size-6" />Patriot Housing</Link>
        </span>
        <nav className="text-md font-bold text-slate-600">
          <div className="mx-auto flex flex-col gap-5 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-10">
            <Link href="/" className="inline-flex items-center gap-1 px-2 hover:underline hover:decoration-red-600 hover:underline-offset-6 decoration-3"><House className="size-4" />Home</Link>
            <Link href="/updates" className="inline-flex items-center gap-1 px-2 hover:underline hover:decoration-red-600 hover:underline-offset-6 decoration-3"><Mail className="size-4" />Updates</Link>
            <Link href="/donate" className="inline-flex items-center gap-1 px-2 hover:underline hover:decoration-red-600 hover:underline-offset-6 decoration-3"><Heart className="size-4" />Donate</Link>
            <Link href="/volunteer" className="inline-flex items-center gap-1 px-2 hover:underline hover:decoration-red-600 hover:underline-offset-6 decoration-3"><Users className="size-4" />Volunteer</Link>
            <Link href="/resources" className="inline-flex items-center gap-1 px-2 hover:underline hover:decoration-red-600 hover:underline-offset-6 decoration-3"><BookOpen className="size-4" />Resources</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}