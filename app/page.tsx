import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import pic1 from "@/images/pic1.png";
import pic2 from "@/images/pic2.jpg"

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-6 py-10 md:px-10 md:py-15">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 md:p-12">
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
            Patriot Housing
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
            Insert Description Here
          </p>
        </section>

        <div>
          <div style={{ backgroundColor: "white", height: "180vh" }}>
            <Image src={pic1} alt="Stock photo 1" width={ 1260 } height={ 100 }/>

          </div>
          <div
              style={{ backgroundColor: "white", height: "250vh" }}>
            <Image src={pic2} alt="Stock photo 2" width={ 500 } height={ 100 }/>

          </div>

          <div
              style={{ backgroundColor: "#0A3161", height: "50vh" }}>
          </div>
          <div
              style={{ backgroundColor: "white", height: "150vh" }}>
          </div>
          <div
              style={{ backgroundColor: "#0A3161", height: "70vh" }}>
          </div>
        </div>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
            Section 1
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
            Section 2
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
            Section 3
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
