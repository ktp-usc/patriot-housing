import Image from "next/image";
import Logo from "@/components/images/PatriotHousingLogo.png"
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-blue-700">
      <div className="mx-auto w-full max-w-7xl px-6 py-6 text-sm md:px-10 text-white mt-8 grid gap-6 md:grid-cols-2">
        <section className="">
          <Image src={Logo} alt="Patriot Housing Logo" className="size-20 inline-flex" />
          <h1 className="text-5xl font-bold inline-flex">Patriot Housing</h1>
        </section>
        <section>
          <p className="text-base leading-7">Quick Links</p>
          <Link href="/" className="inline-flex items-center gap-1 px-2">Home</Link>
          <Link href="/newsletter" className="inline-flex items-center gap-1 px-2">Newsletter</Link>
          <Link href="/donate" className="inline-flex items-center gap-1 px-2 ">Donate</Link>
          <Link href="/volunteer" className="inline-flex items-center gap-1 px-2 ">Volunteer</Link>
          <Link href="/resources" className="inline-flex items-center gap-1 px-2 ">Resources</Link>
        </section>
      </div>
    </footer>
  );
}
