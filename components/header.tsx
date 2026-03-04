export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <span className="text-base font-semibold text-slate-900">
          Patriot Housing
        </span>
        <nav className="text-sm text-slate-600">
          <div className="mx-auto">
            <link href="page.tsx">Home</link>
            <link href="@/newsletter/newsletter.tsx">Newsletter</link>
            <link href="@/donate/donate.tsx">Donate</link>
            <link href="@/volunteer/volunteer.tsx">Volunteer</link>
            <link href="@/resources/resources.tsx">Resources</link>
          </div>
        </nav>
      </div>
    </header>
  );
}