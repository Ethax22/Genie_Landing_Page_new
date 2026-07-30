"use client";

import { useRef } from "react";
import {
  FileText,
  Clapperboard,
  Scissors,
  Languages,
  ImagePlus,
  CalendarClock,
  IndianRupee,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { CAROUSEL } from "@/content/copy";
import CardDemo from "./CardDemos";

const ICONS: Record<string, LucideIcon> = {
  FileText,
  Clapperboard,
  Scissors,
  Languages,
  ImagePlus,
  CalendarClock,
  IndianRupee,
};

export default function Carousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollBy(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("article");
    const step = card ? card.getBoundingClientRect().width + 20 : 320;
    el.scrollBy({ left: step * direction, behavior: "smooth" });
  }

  return (
    <section id="features" className="bg-night py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-14">
        <div className="flex items-end justify-between gap-8">
          <div>
            <h2 className="font-heading text-3xl font-bold text-cream md:text-4xl">
              {CAROUSEL.heading}
            </h2>
            <p className="mt-3 max-w-2xl text-cream/70">{CAROUSEL.subheading}</p>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            {([-1, 1] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => scrollBy(dir)}
                aria-label={dir === -1 ? "Previous features" : "Next features"}
                className="rounded-full border border-cosmic p-3 text-cream/70 transition-colors hover:border-gold hover:text-gold"
              >
                {dir === -1 ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              </button>
            ))}
          </div>
        </div>

        {/* Track lives inside the container so it reads as a bounded frame —
            cards clip at the left and right edges of the content column. */}
        <div
          ref={trackRef}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
        >
          {CAROUSEL.cards.map((card) => {
            const Icon = ICONS[card.icon];
            return (
              <article
                key={card.title}
                className="flex w-[19rem] shrink-0 snap-start flex-col rounded-2xl border border-cosmic bg-cosmic/60 p-3 transition-colors hover:border-genie sm:w-[21rem]"
              >
              <CardDemo id={card.demo} />
              <div className="flex flex-1 flex-col px-2 pb-1 pt-4">
                <h3 className="flex items-center gap-2.5 font-heading text-lg font-semibold text-cream">
                  <span className="inline-flex rounded-lg bg-genie/25 p-2">
                    <Icon className="text-gold" size={16} aria-hidden />
                  </span>
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/70">
                  {card.description}
                </p>
              </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
