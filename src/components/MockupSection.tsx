"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Check, Minus, Plus } from "lucide-react";
import { LANGUAGES, MOCKUP } from "@/content/copy";

type Tab = (typeof MOCKUP.tabs)[number];
type Language = (typeof LANGUAGES)[number];

const WORD_MS = 90; // time between words
const LINE_GAP = 220; // pause before the next line starts typing

/** Reveals `text` one word at a time, starting after `startDelay` ms.
 *  Remounts (and thus replays) whenever its React key changes — the panel
 *  is keyed by the active tab, so switching tabs retypes everything. */
function TypeText({
  text,
  startDelay = 0,
  className,
}: {
  text: string;
  startDelay?: number;
  className?: string;
}) {
  const words = useMemo(() => text.split(" "), [text]);
  const [count, setCount] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setCount(words.length);
      setTyping(false);
      return;
    }
    setCount(0);
    setTyping(false);
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(
      setTimeout(() => {
        setTyping(true);
        words.forEach((_, i) => {
          timers.push(
            setTimeout(() => {
              setCount(i + 1);
              if (i === words.length - 1) setTyping(false);
            }, i * WORD_MS)
          );
        });
      }, startDelay)
    );
    return () => timers.forEach(clearTimeout);
  }, [words, startDelay]);

  const typed = words.slice(0, count).join(" ");
  const rest = words.slice(count).join(" ");

  return (
    <span aria-label={text} className={className}>
      {/* The untyped remainder stays in the DOM at opacity 0 so the line
          reserves its full height from the start — no layout shift while typing. */}
      <span aria-hidden="true">
        {typed}
        {typing ? <span className="type-caret">▍</span> : null}
        {rest ? (
          <span style={{ opacity: 0 }}>{(typed ? " " : "") + rest}</span>
        ) : null}
      </span>
    </span>
  );
}

/** Sequences typed lines one after another: hand each line its text and it
 *  returns the ms offset at which that line should begin typing. */
function makeSequencer() {
  let cursor = 0;
  return (text: string) => {
    const start = cursor;
    cursor += text.split(" ").length * WORD_MS + LINE_GAP;
    return start;
  };
}

function TabDemo({
  tab,
  lang,
  setLang,
}: {
  tab: Tab;
  lang: Language;
  setLang: (l: Language) => void;
}) {
  const demo = tab.demo;
  const at = makeSequencer();
  switch (demo.kind) {
    case "script":
      return (
        <div className="space-y-3 text-sm">
          <div className="rounded-lg border border-gold/40 bg-gold/10 p-3">
            <span className="font-mono text-xs text-gold">HOOK</span>
            <p className="mt-1 text-cream">
              <TypeText text={demo.hook} startDelay={at(demo.hook)} />
            </p>
          </div>
          {demo.beats.map((beat) => (
            <div key={beat} className="rounded-lg border border-cosmic bg-night/50 p-3 text-cream/80">
              <TypeText text={beat} startDelay={at(beat)} />
            </div>
          ))}
          <div className="rounded-lg border border-genie/50 bg-genie/15 p-3">
            <span className="font-mono text-xs text-genie">CTA</span>
            <p className="mt-1 text-cream">
              <TypeText text={demo.cta} startDelay={at(demo.cta)} />
            </p>
          </div>
        </div>
      );
    case "edit":
      return (
        <div className="space-y-3 text-sm">
          {demo.items.map((item) => (
            <div key={item.label} className="flex items-center justify-between rounded-lg border border-cosmic bg-night/50 p-3">
              <span className="inline-flex items-center gap-2 text-cream/80">
                <Check size={14} className="text-gold" /> {item.label}
              </span>
              <span className="font-mono text-xs text-gold">{item.value}</span>
            </div>
          ))}
          <div className="rounded-lg border border-genie/50 bg-genie/15 p-3">
            <span className="font-mono text-xs text-genie">TYPED COMMAND</span>
            <p className="mt-1 text-cream">{demo.command}</p>
          </div>
        </div>
      );
    case "dub":
      return (
        <div className="text-sm">
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  lang === l
                    ? "border-gold bg-gold/15 text-gold"
                    : "border-cosmic text-cream/70 hover:border-genie hover:text-cream"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <p className="mt-4 font-mono text-xs text-cream/60">
            {/* keyed by lang so the line retypes when a language is picked */}
            <TypeText
              key={lang}
              text={`Dubbing into ${lang} · ${demo.voices}`}
              startDelay={120}
            />
          </p>
        </div>
      );
    case "publish":
      return (
        <div className="space-y-3 text-sm">
          {demo.slots.map((slot, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-cosmic bg-night/50 p-3">
              <span className="text-cream/85">
                <TypeText text={slot.platform} startDelay={at(slot.platform)} />
              </span>
              <span className="font-mono text-xs text-cream/60">{slot.when}</span>
              <span
                className={`rounded-full px-2.5 py-1 font-mono text-[10px] ${
                  slot.status === "Scheduled" ? "bg-gold/15 text-gold" : "bg-cosmic text-cream/60"
                }`}
              >
                {slot.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      );
  }
}

export default function MockupSection() {
  const [active, setActive] = useState<Tab["id"]>("script");
  const [lang, setLang] = useState<Language>("Tamil");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const tab = MOCKUP.tabs.find((t) => t.id === active)!;

  function onMove(e: React.MouseEvent) {
    const el = cardRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    setTilt({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  }

  return (
    <section id="product" className="relative overflow-hidden bg-night py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16 lg:px-14">
        {/* Left: copy + tool accordion */}
        <div className="lg:sticky lg:top-28">
          <h2 className="font-heading text-3xl font-bold leading-tight text-cream md:text-4xl">
            {MOCKUP.heading}
          </h2>
          <p className="mt-4 text-cream/70">{MOCKUP.subheading}</p>

          <ul className="mt-8 border-t border-cosmic/60">
            {MOCKUP.tabs.map((t) => {
              const isOpen = active === t.id;
              return (
                <li key={t.id} className="border-b border-cosmic/60">
                  <button
                    type="button"
                    onClick={() => setActive(t.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left"
                  >
                    <span
                      className={`flex items-center gap-3 font-heading text-base font-semibold transition-colors ${
                        isOpen ? "text-gold" : "text-cream/80"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-sm transition-colors ${
                          isOpen ? "bg-gold" : "bg-genie"
                        }`}
                      />
                      {t.title}
                    </span>
                    {isOpen ? (
                      <Minus size={16} className="shrink-0 text-gold" />
                    ) : (
                      <Plus size={16} className="shrink-0 text-cream/50" />
                    )}
                  </button>
                  {isOpen ? (
                    <p className="max-w-sm pb-5 pl-5 text-sm leading-relaxed text-cream/70">
                      {t.description}
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right: window card that leans toward the cursor */}
        <div className="relative">
          <div
            ref={cardRef}
            onMouseMove={onMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            className="overflow-hidden rounded-2xl border border-cosmic bg-cosmic/40 shadow-2xl shadow-genie/20 transition-transform duration-200 ease-out will-change-transform"
            style={{
              transform: `perspective(1400px) rotateY(${tilt.x * 11}deg) rotateX(${
                -tilt.y * 7
              }deg) translateX(${tilt.x * 22}px) translateY(${tilt.y * 12}px)`,
            }}
          >
            <div className="flex items-center justify-between border-b border-cosmic px-4 py-3">
              <div className="flex gap-1.5" aria-hidden>
                <span className="h-3 w-3 rounded-full bg-red-400/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
                <span className="h-3 w-3 rounded-full bg-green-400/70" />
              </div>
              <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                {MOCKUP.windowTag}
              </span>
            </div>

            <div role="tablist" aria-label="Genie pipeline" className="flex gap-2 px-3 pt-3">
              {MOCKUP.tabs.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  id={`mockup-tab-${t.id}`}
                  aria-selected={active === t.id}
                  aria-controls={`mockup-panel-${t.id}`}
                  onClick={() => setActive(t.id)}
                  className={`flex-1 rounded-t-lg border-b-2 px-2 py-2.5 font-mono text-xs tracking-wide transition-colors sm:text-sm ${
                    active === t.id
                      ? "border-gold bg-night/50 text-gold"
                      : "border-transparent text-cream/55 hover:text-cream"
                  }`}
                >
                  {t.label.toUpperCase()}
                </button>
              ))}
            </div>

            <div
              role="tabpanel"
              id={`mockup-panel-${tab.id}`}
              aria-labelledby={`mockup-tab-${tab.id}`}
              className="border-t border-cosmic p-5 sm:p-7"
            >
              {/* keyed by tab so the staggered reveal replays on every switch */}
              <div key={active}>
                <TabDemo tab={tab} lang={lang} setLang={setLang} />
              </div>
            </div>
          </div>

          {/* Intelligence-layer style banner */}
          <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-genie/50 bg-genie/20 p-5 sm:flex-row sm:items-center sm:gap-5">
            <Image
              src="/mascot/pointing_side_genie.png"
              alt=""
              width={56}
              height={56}
              className="h-12 w-12 shrink-0 object-contain"
            />
            <p className="text-sm leading-relaxed text-cream/85">{MOCKUP.banner.text}</p>
            <span className="shrink-0 font-mono text-[10px] tracking-widest text-gold">
              {MOCKUP.banner.tag}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
