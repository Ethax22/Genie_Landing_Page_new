import Image from "next/image";
import { HERO } from "@/content/copy";
import StatChip from "./StatChip";

/**
 * Ghost lines sit in the outer gutters so the headline and mascot stay clean.
 * `hideSm` drops the ones that would collide with content on narrow screens.
 */
const GHOST_POSITIONS: { top: string; left: string; hideSm?: boolean }[] = [
  // Left gutter — kept clear of the headline band (28%–60%)
  { top: "6%", left: "1%" },
  { top: "20%", left: "-2%" },
  { top: "70%", left: "1%", hideSm: true },
  { top: "86%", left: "8%" },
  // Right gutter
  { top: "12%", left: "87%", hideSm: true },
  { top: "26%", left: "91%", hideSm: true },
  { top: "34%", left: "84%", hideSm: true },
  { top: "46%", left: "90%", hideSm: true },
  { top: "58%", left: "86%", hideSm: true },
  { top: "66%", left: "93%", hideSm: true },
  { top: "78%", left: "62%", hideSm: true },
  { top: "92%", left: "55%", hideSm: true },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="stars relative overflow-hidden bg-gradient-to-b from-night via-cosmic/60 to-night pb-24 pt-36 md:pt-44"
    >
      {/* Ghosted pain-point background text */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {GHOST_POSITIONS.map((pos, i) => (
          <span
            key={i}
            className={`ghost-line ${pos.hideSm ? "hidden md:block" : ""}`}
            style={{ top: pos.top, left: pos.left }}
          >
            {HERO.ghostLines[i % HERO.ghostLines.length]}
          </span>
        ))}
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 sm:px-10 md:grid-cols-[1.15fr_0.85fr] lg:px-14">
        <div>
          <p className="mb-5 inline-block rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-mono text-[10px] font-medium tracking-widest text-gold sm:text-xs">
            {HERO.eyebrow}
          </p>
          <h1 className="max-w-[16ch] font-heading text-4xl font-bold leading-[1.1] text-cream sm:text-5xl lg:text-[3.25rem] xl:max-w-[18ch]">
            {HERO.h1}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/75">
            {HERO.subhead}
          </p>
          <div className="mt-9 flex flex-col items-start gap-3">
            <a
              href="#waitlist"
              className="rounded-full bg-gold px-9 py-4 font-semibold text-night shadow-lg shadow-gold/20 transition-transform hover:scale-105"
            >
              {HERO.cta}
            </a>
            <span className="text-sm text-cream/60">{HERO.microcopy}</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md pt-28 md:pt-24">
          {/* Mascot greeting card — sits above the mascot's head */}
          <div className="absolute left-1/2 top-6 z-10 -translate-x-1/2 rounded-2xl rounded-bl-sm border border-genie/50 bg-cosmic/80 px-5 py-3 shadow-xl shadow-night/50 backdrop-blur-sm md:left-auto md:right-2 md:-translate-x-0 md:top-8">
            <p className="font-heading text-sm font-semibold text-cream">
              {HERO.greeting.title}
            </p>
            <p className="mt-0.5 max-w-[15rem] text-xs leading-relaxed text-cream/70">
              {HERO.greeting.line}
            </p>
          </div>

          <Image
            src="/mascot/genie-mascot-home.png"
            alt="Genie mascot"
            width={480}
            height={480}
            priority
            className="w-full drop-shadow-[0_0_50px_rgba(91,59,140,0.5)]"
          />

          {HERO.chips.map((chip, i) => (
            <StatChip
              key={chip.label}
              emoji={chip.emoji}
              label={chip.label}
              className={`float-chip absolute ${
                ["left-0 top-1/3 md:-left-10", "-right-2 top-1/2 md:-right-8", "bottom-12 left-6"][i]
              }`}
              style={{ "--float-delay": `${i * 0.9}s` } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
