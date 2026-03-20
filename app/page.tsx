"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Briefcase,
  ExternalLink,
  Facebook,
  Heart,
  Home,
  House,
  Hospital,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Phone,
  Shield,
  Twitter,
  Users,
  X,
  Youtube,
} from "lucide-react";

const navigationLinks = [
  { name: "Home", href: "#", icon: Home },
  { name: "Volunteering", href: "#volunteering", icon: Users },
  { name: "Donate", href: "#donate", icon: Heart },
  { name: "Newsletter", href: "#newsletter", icon: Mail },
  { name: "Resources", href: "#resources", icon: BookOpen },
  { name: "Contact", href: "#contact", icon: Phone },
];

const slideImages = [
  {
    url: "https://images.unsplash.com/photo-1766764925755-2fa39f0d0556?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWVyaWNhbiUyMGZsYWclMjBwYXRyaW90aWMlMjBob21lfGVufDF8fHx8MTc3MjY5MDQxOXww&ixlib=rb-4.1.0&q=80&w=1080",
    caption: "Honoring Those Who Served",
  },
  {
    url: "https://images.unsplash.com/photo-1697618990624-255318316bea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmFuJTIwZmFtaWx5JTIwaGFwcHklMjBob3VzZXxlbnwxfHx8fDE3NzI2OTA0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    caption: "Building Homes, Creating Futures",
  },
  {
    url: "https://images.unsplash.com/photo-1766503493494-2f05e7eaf454?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxpdGFyeSUyMHNlcnZpY2UlMjBtZW1iZXJzJTIwY29tbXVuaXR5fGVufDF8fHx8MTc3MjY5MDQxOXww&ixlib=rb-4.1.0&q=80&w=1080",
    caption: "Supporting Our Heroes",
  },
  {
    url: "https://images.unsplash.com/photo-1715231667593-5a32b2828546?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBidWlsZGluZyUyMG5ldyUyMGhvbWV8ZW58MXx8fHwxNzcyNjkwNDIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    caption: "Together We Build",
  },
  {
    url: "https://images.unsplash.com/photo-1495467270795-cf51cd29f1b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWVyaWNhbiUyMHZldGVyYW4lMjBzYWx1dGUlMjBmbGFnfGVufDF8fHx8MTc3MjY5MDQyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    caption: "Serving Those Who Served",
  },
];

const veteranResources = [
  {
    category: "Housing Assistance",
    icon: House,
    resources: [
      { name: "VA Home Loan Programs", url: "#", description: "Zero down payment home loans" },
      { name: "Emergency Housing Assistance", url: "#", description: "Immediate support for veterans in crisis" },
      { name: "Home Adaptation Grants", url: "#", description: "Accessibility modification support" },
    ],
  },
  {
    category: "Employment & Career",
    icon: Briefcase,
    resources: [
      { name: "Veterans Job Bank", url: "#", description: "Job listings focused on veterans" },
      { name: "Career Counseling", url: "#", description: "Guidance for military-to-civilian transition" },
      { name: "Vocational Rehabilitation", url: "#", description: "Training and employment services" },
    ],
  },
  {
    category: "Healthcare Services",
    icon: Hospital,
    resources: [
      { name: "VA Healthcare Enrollment", url: "#", description: "Comprehensive health coverage" },
      { name: "Mental Health Support", url: "#", description: "PTSD counseling and wellness support" },
      { name: "Veterans Crisis Line", url: "#", description: "Call 988, then press 1" },
    ],
  },
];

const socialMedia = [
  { name: "Facebook", icon: Facebook, url: "#" },
  { name: "Twitter", icon: Twitter, url: "#" },
  { name: "Instagram", icon: Instagram, url: "#" },
  { name: "LinkedIn", icon: Linkedin, url: "#" },
  { name: "YouTube", icon: Youtube, url: "#" },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % slideImages.length);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, []);

  const goToPreviousSlide = () => {
    setCurrentSlide((previous) => (previous - 1 + slideImages.length) % slideImages.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((previous) => (previous + 1) % slideImages.length);
  };

  return (
    <div className="theme-page min-h-screen">
      <nav className="theme-nav sticky top-0 z-50 border-b backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <span className="text-lg font-semibold">Patriot Housing</span>
          </div>

          <div className="hidden items-center gap-5 md:flex">
            {navigationLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a key={link.name} href={link.href} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                  <Icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </a>
              );
            })}
            <Button size="sm">Get Involved</Button>
          </div>

          <button
            className="rounded-md border border-blue-700 bg-blue-700 p-2 text-white hover:bg-blue-800 md:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t px-4 py-3 md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-3">
              {navigationLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    {link.name}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      <section className="theme-hero px-4 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl font-bold md:text-5xl">Welcome to Patriot Housing</h1>
          <p className="theme-hero-copy mx-auto mt-5 max-w-3xl text-lg md:text-xl">
            Providing safe, affordable housing to veterans and their families, because those who served deserve a place to call home.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" variant="secondary">
              Learn More <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg">Apply for Housing</Button>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <div className="relative overflow-hidden rounded-xl border">
          {slideImages.map((slide, index) => (
            <div key={slide.url} className={index === currentSlide ? "block" : "hidden"}>
              <div className="relative h-[320px] w-full md:h-[500px]">
                <Image
                  src={slide.url}
                  alt={slide.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-xl font-semibold text-white md:text-3xl">{slide.caption}</p>
              </div>
            </div>
          ))}

          <button
            onClick={goToPreviousSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-blue-700 bg-blue-700 p-2 text-white hover:bg-blue-800"
            aria-label="Previous slide"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goToNextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-blue-700 bg-blue-700 p-2 text-white hover:bg-blue-800"
            aria-label="Next slide"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      <section id="volunteering" className="theme-subtle px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold md:text-3xl">About Patriot Housing</h2>
          <p className="mt-5 text-muted-foreground">
            Patriot Housing is dedicated to ensuring that every veteran has access to safe, affordable, and dignified housing. We understand that the transition from military to civilian life can be challenging, and having a stable home is the foundation for success in all other areas of life.
          </p>
          <p className="mt-4 text-muted-foreground">
            Founded by veterans for veterans, our organization has been serving those who served since 2010. We work tirelessly to provide not just housing, but comprehensive support services that help veterans and their families thrive in their communities.
          </p>
          <p className="mt-4 text-muted-foreground">
            Founded by veterans for veterans, our organization has been serving those who served since 2010. We work tirelessly to provide not just housing, but comprehensive support services that help veterans and their families thrive in their communities.
          </p>
          <p className="mt-4 text-muted-foreground">
            Through partnerships with local organizations, government agencies, and generous community support, we&apos;ve helped over 5,000 veterans find homes. Our programs include emergency housing assistance, long-term affordable housing solutions, home renovation services, and ongoing case management to ensure lasting success.
          </p>
          <p className="mt-4 text-muted-foreground">
            We partner with local organizations, agencies, and volunteers to provide emergency help, affordable housing pathways, and ongoing advocacy.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="theme-card rounded-lg border p-4 text-center">
              <p className="text-2xl font-bold">5,000+</p>
              <p className="text-sm text-muted-foreground">Veterans Housed</p>
            </div>
            <div className="theme-card rounded-lg border p-4 text-center">
              <p className="text-2xl font-bold">500+</p>
              <p className="text-sm text-muted-foreground">Active Volunteers</p>
            </div>
            <div className="theme-card rounded-lg border p-4 text-center">
              <p className="text-2xl font-bold">15+</p>
              <p className="text-sm text-muted-foreground">Years of Service</p>
            </div>
          </div>
        </div>
      </section>

      <section id="resources" className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold md:text-3xl">Veteran Resources</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Support services for housing, careers, and healthcare.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {veteranResources.map((category) => {
              const Icon = category.icon;
              return (
                <article key={category.category} className="theme-card rounded-lg border p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    <h3 className="font-semibold">{category.category}</h3>
                  </div>

                  <div className="space-y-3">
                    {category.resources.map((resource) => (
                      <div key={resource.name} className="border-l pl-3">
                        <a href={resource.url} className="inline-flex items-center gap-1 text-sm font-medium hover:underline">
                          {resource.name}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="donate" className="px-4 pb-16">
        <div className="theme-hero mx-auto max-w-4xl rounded-xl p-8 text-center md:p-10">
          <h2 className="text-2xl font-bold">Need Help Navigating Resources?</h2>
          <p className="theme-hero-copy mx-auto mt-3 max-w-2xl">
            Our advocates can help veterans and families find and access services quickly.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" variant="secondary">Contact an Advocate</Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Call: (555) 123-4567
            </Button>
          </div>
        </div>
      </section>

      <footer id="contact" className="theme-subtle border-t px-4 py-10">
        <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span className="font-semibold">Patriot Housing</span>
            </div>
            <p className="text-sm text-muted-foreground">Serving those who served with dignity, respect, and gratitude.</p>
          </div>

          <div id="newsletter">
            <h3 className="font-semibold">Contact</h3>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@patriothousing.org</li>
              <li>123 Veterans Way, Hometown, ST 12345</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Social</h3>
            <div className="mt-3 flex items-center gap-2">
              {socialMedia.map((social) => {
                const Icon = social.icon;
                return (
                  <a key={social.name} href={social.url} aria-label={social.name} className="rounded-md border p-2 hover:bg-accent">
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-6xl border-t pt-6 text-center text-sm text-muted-foreground">
          © 2026 Patriot Housing. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
