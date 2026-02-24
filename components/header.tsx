export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <span className="text-base font-semibold text-slate-900">
          Patriot Housing
        </span>
        <nav className="text-sm text-slate-600">Navigation</nav>
      </div>
    </header>
  );
}