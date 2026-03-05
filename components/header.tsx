import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-2 md:px-8">
        <span className="text-base font-bold text-slate-900">
          Patriot Housing
        </span>
        <nav className="text-md font-bold text-slate-600">
          <div className="mx-auto flex flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-10">
            <Link href="/" className="hover:underline hover:decoration-red-600 underline-offset-5">Home</Link>
            <Link href="/newsletter" className="hover:underline hover:decoration-red-600 underline-offset-5">Newsletter</Link>
            <Link href="/donate" className="hover:underline hover:decoration-red-600 underline-offset-5">Donate</Link>
            <Link href="/volunteer" className="hover:underline hover:decoration-red-600 underline-offset-5">Volunteer</Link>
            <Link href="/resources" className="hover:underline hover:decoration-red-600 underline-offset-5">Resources</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}