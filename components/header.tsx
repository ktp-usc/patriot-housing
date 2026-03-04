import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <span className="text-base font-semibold text-slate-900">
          Patriot Housing
        </span>
        <nav className="text-sm font-semibold text-slate-600"> **//TODO: increase margin and update current CSS**
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-10">
            <Link href="/">Home</Link>
            <Link href="/newsletter">Newsletter</Link>
            <Link href="/donate">Donate</Link>
            <Link href="/volunteer">Volunteer</Link>
            <Link href="/resources">Resources</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}