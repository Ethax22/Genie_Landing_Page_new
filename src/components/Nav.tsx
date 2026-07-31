"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAV } from "@/content/copy";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 z-50 px-4 transition-all duration-300 ${
        scrolled ? "top-2" : "top-5"
      }`}
    >
      <nav
        className={`relative z-[60] mx-auto flex max-w-5xl items-center justify-between rounded-full border border-cosmic/60 px-4 shadow-lg shadow-night/50 transition-all duration-300 sm:px-6 ${
          scrolled ? "py-2" : "py-3"
        }`}
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          backgroundColor: "rgba(8,12,24,0.72)",
        }}
      >
        <a href="#top" className="flex items-center" aria-label="GenieHive — home">
          <Image src="/logo.png" alt="GenieHive" width={160} height={38} className="h-9 w-auto object-contain" priority />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-slate/80 transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={NAV.cta.href}
            className="btn-gold hidden rounded-full px-5 py-2 text-sm font-semibold transition-transform hover:scale-105 md:inline-block"
          >
            {NAV.cta.label}
          </a>
          <button
            type="button"
            className="p-2 text-cream md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="fixed inset-0 top-0 z-40 bg-night pt-24 md:hidden">
          <ul className="flex flex-col gap-2 px-6 pt-8">
            {[...NAV.links, NAV.cta].map((link, i) => (
              <li
                key={link.href + link.label}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={
                    "label" in link && link.label === NAV.cta.label
                      ? "mt-4 inline-block rounded-full bg-gold px-6 py-3 font-semibold text-night"
                      : "block py-3 font-heading text-2xl font-semibold text-cream"
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
