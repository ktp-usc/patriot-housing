import Link from "next/link";
import { House, Users, Heart, Mail, BookOpen,} from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-2 md:px-8">
        <span className="text-base font-bold text-slate-900">
          Patriot Housing
        </span>
        <nav className="text-md font-bold text-slate-600">
          <div className="mx-auto flex flex-col gap-5 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-10">
            <Link href="/" className="px-2 hover:underline hover:decoration-red-600 hover:underline-offset-6 decoration-3"><House className="inline-block size-4" />Home</Link>
            <Link href="/newsletter" className="px-2 hover:underline hover:decoration-red-600 hover:underline-offset-6 decoration-3"><Mail className="inline-block size-4" />Newsletter</Link>
            <Link href="/donate" className="px-2 hover:underline hover:decoration-red-600 hover:underline-offset-6 decoration-3"><Heart className="inline-block size-4" />Donate</Link>
            <Link href="/volunteer" className="px-2 hover:underline hover:decoration-red-600 hover:underline-offset-6 decoration-3"><Users className="inline-block size-4" />Volunteer</Link>
            <Link href="/resources" className="px-2 hover:underline hover:decoration-red-600 hover:underline-offset-6 decoration-3"><BookOpen className="inline-block size-4" />Resources</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}