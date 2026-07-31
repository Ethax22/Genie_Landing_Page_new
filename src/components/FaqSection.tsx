"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ } from "@/content/copy";

/**
 * Categorized tabs; <details>-based accordions inside so content stays
 * readable without JS (all categories render, tabs just hide/show via CSS class).
 */
export default function FaqSection() {
  const [active, setActive] = useState<(typeof FAQ.categories)[number]["id"]>(
    FAQ.categories[0].id
  );

  return (
    <section id="faq" className="bg-night py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-center font-heading text-3xl font-bold text-cream md:text-4xl">
          {FAQ.heading}
        </h2>

        <div
          role="tablist"
          aria-label="FAQ categories"
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {FAQ.categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              id={`faq-tab-${cat.id}`}
              aria-selected={active === cat.id}
              aria-controls={`faq-panel-${cat.id}`}
              onClick={() => setActive(cat.id)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                active === cat.id
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-cosmic text-slate/70 hover:border-genie"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {FAQ.categories.map((cat) => (
          <div
            key={cat.id}
            role="tabpanel"
            id={`faq-panel-${cat.id}`}
            aria-labelledby={`faq-tab-${cat.id}`}
            className={active === cat.id ? "mt-8 space-y-3" : "hidden"}
          >
            {cat.items.map((item) => (
              <details
                key={item.q}
                className="group surface card-glow rounded-xl px-5 py-4 open:border-genie"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-sm font-semibold text-cream [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ChevronDown
                    size={18}
                    className="shrink-0 text-gold transition-transform group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate/75">{item.a}</p>
              </details>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
