import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-2 md:px-8">
        <span className="text-base font-bold text-slate-900">
          Patriot Housing
        </span>
        <nav className="text-md font-bold text-slate-600">
          <div className="mx-auto flex flex-col gap-5 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-10">
            <Link href="/" className="px-2 hover:underline hover:decoration-red-600 hover:underline-offset-6 decoration-3">Home</Link>
            <Link href="/newsletter" className="px-2 hover:underline hover:decoration-red-600 hover:underline-offset-6 decoration-3">Newsletter</Link>
            <Link href="/donate" className="px-2 hover:underline hover:decoration-red-600 hover:underline-offset-6 decoration-3">Donate</Link>
            <Link href="/volunteer" className="px-2 hover:underline hover:decoration-red-600 hover:underline-offset-6 decoration-3">Volunteer</Link>
            <Link href="/resources" className="px-2 hover:underline hover:decoration-red-600 hover:underline-offset-6 decoration-3">Resources</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}