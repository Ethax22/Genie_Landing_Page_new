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
      className="stars relative overflow-hidden bg-gradient-to-b from-night via-cosmic/60 to-night pb-16 pt-32 md:pb-24 md:pt-44"
    >
      {/* Ghosted pain-point background text — hidden on mobile where there are
          no side gutters, so it never collides with the headline or mascot. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
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
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate/75">
            {HERO.subhead}
          </p>
          <div className="mt-9 flex flex-col items-start gap-3">
            <a
              href="#waitlist"
              className="btn-gold rounded-full px-9 py-4 font-semibold transition-transform hover:scale-105"
            >
              {HERO.cta}
            </a>
            <span className="text-sm text-slate/60">{HERO.microcopy}</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md pt-28 md:pt-24">
          {/* Mascot greeting card — sits above the mascot's head */}
          <div className="absolute left-1/2 top-6 z-10 -translate-x-1/2 rounded-2xl rounded-bl-sm border border-genie/50 bg-cosmic/80 px-5 py-3 shadow-xl shadow-night/50 backdrop-blur-sm md:left-auto md:right-2 md:-translate-x-0 md:top-8">
            <p className="font-heading text-sm font-semibold text-cream">
              {HERO.greeting.title}
            </p>
            <p className="mt-0.5 max-w-[15rem] text-xs leading-relaxed text-slate/70">
              {HERO.greeting.line}
            </p>
          </div>

          <Image
            src="/mascot/genie-mascot-home.png"
            alt="Genie mascot"
            width={480}
            height={480}
            priority
            className="w-full drop-shadow-[0_0_50px_rgba(37,99,235,0.5)]"
          />

          {/* Desktop: chips float in the gutters around the mascot */}
          {HERO.chips.map((chip, i) => (
            <StatChip
              key={chip.label}
              emoji={chip.emoji}
              label={chip.label}
              className={`float-chip absolute hidden md:inline-flex ${
                ["top-1/3 md:-left-10", "top-1/2 md:-right-8", "bottom-12 left-6"][i]
              }`}
              style={{ "--float-delay": `${i * 0.9}s` } as React.CSSProperties}
            />
          ))}

          {/* Mobile: chips sit in a tidy wrapped row below the mascot */}
          <div className="mt-6 flex flex-wrap justify-center gap-2 md:hidden">
            {HERO.chips.map((chip) => (
              <StatChip key={chip.label} emoji={chip.emoji} label={chip.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
