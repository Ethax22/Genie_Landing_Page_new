"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { CHATBOX } from "@/content/copy";

const STORAGE_KEY = "genie-chatbox-shown";

/** Creedom-style popup: appears once when the carousel scrolls into view. */
export default function MascotChatbox({ watchId }: { watchId: string }) {
  const [visible, setVisible] = useState(false);
  const dismissed = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const target = document.getElementById(watchId);
    if (!target) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !dismissed.current) {
          setVisible(true);
          sessionStorage.setItem(STORAGE_KEY, "1");
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(target);
    return () => io.disconnect();
  }, [watchId]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-40 flex max-w-xs items-end gap-3 motion-safe:animate-fade-up"
      role="dialog"
      aria-label="Genie says"
    >
      <div className="relative rounded-2xl rounded-br-sm border border-genie/60 bg-cosmic p-4 shadow-2xl shadow-night/60">
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => setVisible(false)}
          className="absolute right-2 top-2 text-slate/50 hover:text-cream"
        >
          <X size={16} />
        </button>
        <p className="pr-4 text-sm text-cream">{CHATBOX.message}</p>
        <a
          href={CHATBOX.cta.href}
          onClick={() => setVisible(false)}
          className="btn-gold mt-3 inline-block rounded-full px-4 py-2 text-xs font-semibold transition-transform hover:scale-105"
        >
          {CHATBOX.cta.label}
        </a>
      </div>
      <Image
        src="/mascot/thinking_image.png"
        alt=""
        width={80}
        height={80}
        className="h-20 w-20 shrink-0 object-contain"
      />
    </div>
  );
}
