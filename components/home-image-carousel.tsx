"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import guyImage from "@/components/images/Guy.png";
import logoImage from "@/components/images/PatriotHousingLogo.png";

type Slide = {
  src: string | StaticImageData;
  alt: string;
  title: string;
  description: string;
  imageClassName?: string;
  previewClassName?: string;
};

const slides: Slide[] = [
  {
    src: "/images/backgroundImage.jpg",
    alt: "Patriot Housing homes and community support",
    title: "Safe housing with room to rebuild",
    description:
      "Stable housing is the foundation for recovery, connection, and long-term independence.",
    imageClassName: "object-cover object-center",
    previewClassName: "bg-slate-200",
  },
  {
    src: guyImage,
    alt: "Veteran receiving support through Patriot Housing",
    title: "Support that stays personal",
    description:
      "We pair housing with practical guidance, advocacy, and a plan that helps each Veteran move forward.",
    imageClassName: "object-contain bg-slate-100 p-6",
    previewClassName: "bg-slate-100",
  },
  {
    src: logoImage,
    alt: "Patriot Housing Project logo",
    title: "A mission centered on service",
    description:
      "Partnerships, donations, and community action help turn this mission into real housing outcomes.",
    imageClassName: "object-contain bg-white p-10",
    previewClassName: "bg-white",
  },
];

export default function HomeImageCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  const showSlide = (index: number) => {
    setActiveIndex((index + slides.length) % slides.length);
  };

  return (
    <section className="grid gap-4 md:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.75fr)]">
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 shadow-sm">
        <div className="relative aspect-[16/10]">
          <Image
            src={activeSlide.src}
            alt={activeSlide.alt}
            fill
            priority
            sizes="(min-width: 768px) 65vw, 100vw"
            className={activeSlide.imageClassName ?? "object-cover"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
                Community Spotlight
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
                {activeSlide.title}
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-slate-200 md:text-base">
                {activeSlide.description}
              </p>
            </div>

            <div className="hidden gap-2 md:flex">
              <button
                type="button"
                onClick={() => showSlide(activeIndex - 1)}
                aria-label="Show previous slide"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => showSlide(activeIndex + 1)}
                aria-label="Show next slide"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              Image Carousel
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Browse a few mission moments from Patriot Housing.
            </p>
          </div>

          <div className="flex gap-2 md:hidden">
            <button
              type="button"
              onClick={() => showSlide(activeIndex - 1)}
              aria-label="Show previous slide"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => showSlide(activeIndex + 1)}
              aria-label="Show next slide"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={slide.title}
                type="button"
                onClick={() => showSlide(index)}
                className={`flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition ${
                  isActive
                    ? "border-blue-700 bg-blue-50 shadow-sm"
                    : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white"
                }`}
              >
                <div
                  className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-xl ${
                    slide.previewClassName ?? "bg-slate-200"
                  }`}
                >
                  <Image
                    src={slide.src}
                    alt=""
                    fill
                    sizes="80px"
                    className={slide.imageClassName ?? "object-cover"}
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">
                    {slide.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {slide.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
