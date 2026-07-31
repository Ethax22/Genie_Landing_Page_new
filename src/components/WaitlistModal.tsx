"use client";

import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import { WAITLIST } from "@/content/copy";
import WaitlistForm from "./WaitlistForm";

/**
 * Opens whenever the URL hash becomes #waitlist — so every existing
 * `href="#waitlist"` CTA (nav, hero, final band, chatbox) triggers it
 * with no extra wiring. Closing clears the hash so the next click reopens it.
 */
export default function WaitlistModal() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    if (typeof window !== "undefined" && window.location.hash === "#waitlist") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  // Watch the hash (initial load + every hashchange).
  useEffect(() => {
    const check = () => {
      if (window.location.hash === "#waitlist") setOpen(true);
    };
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);

  // While open: lock body scroll and close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="waitlist-modal-title"
    >
      <div
        onClick={close}
        className="absolute inset-0 bg-night/80 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="no-scrollbar relative z-10 max-h-[90vh] w-full max-w-lg animate-fade-up overflow-y-auto rounded-2xl border border-gold/60 bg-night/95 p-8 shadow-2xl shadow-genie/30 sm:p-10">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-1.5 text-slate/60 transition-colors hover:bg-cosmic/60 hover:text-cream"
        >
          <X size={20} />
        </button>
        <h2
          id="waitlist-modal-title"
          className="text-center font-heading text-3xl font-bold text-cream"
        >
          {WAITLIST.heading}
        </h2>
        <p className="mb-8 mt-3 text-center text-sm text-slate/70">{WAITLIST.subheading}</p>
        <WaitlistForm />
      </div>
    </div>
  );
}
