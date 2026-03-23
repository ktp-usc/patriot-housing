import Image from "next/image";
import Logo from "@/components/images/PatriotHousingLogo.png"
import Link from "next/link";

export default function Footer() {
  return (
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
      </div>
    </footer>
  );
}
