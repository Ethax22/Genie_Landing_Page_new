"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, Loader2, Minus, Plus } from "lucide-react";
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

type EditDemoData = Extract<Tab["demo"], { kind: "edit" }>;

/** Renders the caption line so each preset has a visibly DISTINCT animated
 *  look — chunks pop, build-up rises word-by-word, marker wipes in, karaoke
 *  sweeps, etc. Keyed remount (in LivePreview) replays it on every switch. */
function CaptionRender({ line, style }: { line: string; style: string }) {
  const words = line.split(" ");
  const delay = (i: number, step: number) =>
    ({ "--cap-delay": `${(i * step).toFixed(2)}s` } as React.CSSProperties);

  let nodes: React.ReactNode;
  switch (style) {
    case "Build-Up": // Cumulative — words add up left-to-right
      nodes = words.map((w, i) => (
        <span key={i} style={delay(i, 0.22)} className="cap-rise inline-block font-extrabold text-cream">
          {w}
        </span>
      ));
      break;
    case "Marker": // Highlighter — marker pen wipes in behind each word
      nodes = words.map((w, i) => (
        <span key={i} className="relative inline-block px-1 font-extrabold text-cream">
          <span style={delay(i, 0.15)} className="cap-marker-bar absolute inset-y-0 left-0 -z-10 rounded bg-gold/40" />
          <span className="relative">{w}</span>
        </span>
      ));
      break;
    case "3D Punch": // MrBeast — chunky caps with a layered 3D shadow
      nodes = words.map((w, i) => (
        <span
          key={i}
          style={delay(i, 0.14)}
          className="cap-pop inline-block font-extrabold uppercase text-gold [text-shadow:_2px_2px_0_#b91c1c,_4px_4px_0_rgba(0,0,0,0.35)]"
        >
          {w}
        </span>
      ));
      break;
    case "Pop-In": // Single-word focus, springs in one at a time
      nodes = words.map((w, i) => (
        <span key={i} style={delay(i, 0.26)} className="cap-pop inline-block font-extrabold text-gold">
          {w}
        </span>
      ));
      break;
    case "Word Sweep": // Karaoke — gold fill sweeps across each word
      nodes = words.map((w, i) => (
        <span key={i} style={delay(i, 0.18)} className="cap-karaoke inline-block font-extrabold">
          {w}
        </span>
      ));
      break;
    case "Bold Chunks": // Hormozi — alternating colour chunks, pop in
    default:
      nodes = words.map((w, i) => (
        <span
          key={i}
          style={delay(i, 0.14)}
          className={`cap-pop inline-block rounded-md px-1.5 font-extrabold ${
            i % 2 === 0 ? "bg-gold text-night" : "bg-cream/15 text-cream"
          }`}
        >
          {w}
        </span>
      ));
  }
  return <>{nodes}</>;
}

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onClick}
      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
        on ? "bg-gold" : "bg-cosmic"
      }`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-cream transition-all ${
          on ? "left-[1.125rem]" : "left-0.5"
        }`}
      />
    </button>
  );
}

/** Colour-grade presets for the POLISH tab — each maps to a CSS filter on the
 *  subject plus a blended tint, both scaled by the intensity slider (t: 0–1). */
const GRADE_CONFIG: Record<
  string,
  { filter: (t: number) => string; tint: string; blend: React.CSSProperties["mixBlendMode"]; overlayMax: number }
> = {
  Cinematic: {
    filter: (t) => `contrast(${(1 + 0.25 * t).toFixed(2)}) saturate(${(1 + 0.55 * t).toFixed(2)})`,
    tint: "20,70,115",
    blend: "soft-light",
    overlayMax: 0.55,
  },
  Warm: {
    filter: (t) => `saturate(${(1 + 0.45 * t).toFixed(2)}) brightness(${(1 + 0.05 * t).toFixed(2)})`,
    tint: "255,150,60",
    blend: "soft-light",
    overlayMax: 0.55,
  },
  Vintage: {
    filter: (t) => `sepia(${(0.65 * t).toFixed(2)}) contrast(${(1 - 0.08 * t).toFixed(2)})`,
    tint: "190,150,95",
    blend: "overlay",
    overlayMax: 0.5,
  },
  "B&W": {
    filter: (t) => `grayscale(${t.toFixed(2)})`,
    tint: "0,0,0",
    blend: "normal",
    overlayMax: 0,
  },
};

/** Tall "live preview" panel: mascot centered, caption pops in word-by-word in
 *  the selected style. On POLISH, the chosen grade + intensity tint the frame. */
function LivePreview({
  line,
  style,
  replayKey,
  grade = null,
  gradeT = 0,
}: {
  line: string;
  style: string;
  replayKey: string;
  grade?: string | null;
  gradeT?: number;
}) {
  const g = grade ? GRADE_CONFIG[grade] : null;
  const subjectFilter = g ? g.filter(gradeT) : undefined;
  const overlayOpacity = g ? g.overlayMax * gradeT : 0;

  return (
    <div className="relative flex h-44 flex-col items-center justify-end overflow-hidden rounded-xl border border-cosmic bg-gradient-to-b from-cosmic/50 via-night to-night sm:h-52">
      <span className="absolute right-3 top-3 z-20 inline-flex items-center gap-1.5 font-mono text-[9px] tracking-widest text-slate/50">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> LIVE PREVIEW
      </span>
      <span className="absolute bottom-2.5 right-3 z-20 font-mono text-[9px] tracking-widest text-slate/25">
        GENIE
      </span>
      <Image
        src="/mascot/thumbs_up_genie.png"
        alt=""
        width={140}
        height={140}
        style={{ filter: subjectFilter, transition: "filter 0.2s" }}
        className="pointer-events-none absolute left-1/2 top-3 h-24 w-auto -translate-x-1/2 object-contain drop-shadow-[0_10px_30px_rgba(37,99,235,0.5)] sm:top-4 sm:h-28"
      />
      {overlayOpacity > 0 && g ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[5] transition-opacity duration-200"
          style={{ backgroundColor: `rgba(${g.tint},${overlayOpacity.toFixed(2)})`, mixBlendMode: g.blend }}
        />
      ) : null}
      <div
        key={replayKey}
        className="relative z-10 mb-5 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 px-5 text-center font-heading text-lg leading-tight sm:text-xl"
      >
        <CaptionRender line={line} style={style} />
      </div>
    </div>
  );
}

function EditDemo({ demo }: { demo: EditDemoData }) {
  const [sub, setSub] = useState<(typeof demo.subtabs)[number]["id"]>(demo.subtabs[0].id);
  const [style, setStyle] = useState<string>(demo.captionStyles[0].name);
  const [styleTick, setStyleTick] = useState(0);
  const selectedStyle = demo.captionStyles.find((c) => c.name === style) ?? demo.captionStyles[0];
  const [brollOn, setBrollOn] = useState(true);
  const [grade, setGrade] = useState<string>(demo.grades[0]);
  const [intensity, setIntensity] = useState(60);
  const [noiseOn, setNoiseOn] = useState(true);
  const [variant, setVariant] = useState(0);
  const [applyState, setApplyState] = useState<"idle" | "running" | "done">("idle");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (applyState !== "running") return;
    const id = setInterval(() => setProgress((p) => Math.min(100, p + 5)), 70);
    return () => clearInterval(id);
  }, [applyState]);

  useEffect(() => {
    if (applyState === "running" && progress >= 100) setApplyState("done");
  }, [applyState, progress]);

  const handleApply = () => {
    if (applyState === "running") return;
    if (applyState === "done") {
      setApplyState("idle");
      setProgress(0);
      return;
    }
    setProgress(0);
    setApplyState("running");
  };

  return (
    <div className="stagger space-y-4 text-sm">
      <LivePreview
        line={selectedStyle.sample}
        style={style}
        replayKey={`${sub}-${style}-${styleTick}`}
        grade={sub === "polish" ? grade : null}
        gradeT={intensity / 100}
      />

      {/* Sub-tool row */}
      <div role="tablist" aria-label="Edit tools" className="flex flex-wrap gap-1.5">
        {demo.subtabs.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={sub === s.id}
            onClick={() => setSub(s.id)}
            className={`rounded-md px-3 py-1.5 font-mono text-[11px] tracking-wide transition-colors ${
              sub === s.id ? "bg-gold text-night" : "bg-night/50 text-slate/60 hover:text-cream"
            }`}
          >
            {s.label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* CAPTIONS — style picker restyles the preview word */}
      {sub === "captions" ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {demo.captionStyles.map((cs) => {
            const on = style === cs.name;
            return (
              <button
                key={cs.name}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setStyle(cs.name);
                  setStyleTick((t) => t + 1);
                }}
                className={`rounded-lg border p-3 text-left transition-colors ${
                  on ? "border-gold bg-gold/10" : "border-cosmic bg-night/50 hover:border-genie"
                }`}
              >
                <span className={`block font-heading text-sm font-semibold ${on ? "text-gold" : "text-cream"}`}>
                  {cs.name}
                </span>
                <span className="mt-0.5 block text-xs text-slate/60">{cs.desc}</span>
              </button>
            );
          })}
        </div>
      ) : null}

      {/* B-ROLL — toggle + auto-detected insert points */}
      {sub === "broll" ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3 rounded-lg border border-cosmic bg-night/50 p-3">
            <span className="text-slate/85">Genie inserts matching B-roll with crossfades</span>
            <Toggle on={brollOn} onClick={() => setBrollOn((v) => !v)} />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {demo.broll.map((b) => (
              <div
                key={b.at}
                className={`rounded-lg border p-2.5 text-center transition-opacity ${
                  brollOn ? "border-genie/50 bg-genie/10 opacity-100" : "border-cosmic bg-night/50 opacity-40"
                }`}
              >
                <span className="block font-mono text-xs text-gold">{b.at}</span>
                <span className="mt-0.5 block truncate text-[11px] text-slate/70">“{b.keyword}”</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* POLISH — colour grades + Genie cleanup + controls */}
      {sub === "polish" ? (
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-2">
            {demo.grades.map((g) => {
              const on = grade === g;
              return (
                <button
                  key={g}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setGrade(g)}
                  className={`rounded-lg border py-2 font-mono text-[10px] tracking-wide transition-colors ${
                    on
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-cosmic bg-night/50 text-slate/60 hover:text-cream"
                  }`}
                >
                  {g.toUpperCase()}
                </button>
              );
            })}
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs text-slate/70">
              <span>Grade intensity</span>
              <span className="font-mono text-gold">{intensity}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              aria-label="Grade intensity"
              className="h-1.5 w-full cursor-pointer accent-gold"
            />
          </div>
          <div className="space-y-2">
            {demo.items.map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-lg border border-cosmic bg-night/50 p-3">
                <span className="inline-flex items-center gap-2 text-slate/80">
                  <Check size={14} className="text-gold" /> {item.label}
                </span>
                <span className="font-mono text-xs text-gold">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between gap-3 rounded-lg border border-cosmic bg-night/50 p-3">
            <span className="text-slate/85">AI noise reduction</span>
            <Toggle on={noiseOn} onClick={() => setNoiseOn((v) => !v)} />
          </div>
          <div className="rounded-lg border border-genie/50 bg-genie/15 p-3">
            <span className="font-mono text-xs text-genie">TYPED COMMAND</span>
            <p className="mt-1 text-cream">{demo.command}</p>
          </div>
        </div>
      ) : null}

      {/* VARIANTS — output formats */}
      {sub === "variants" ? (
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {demo.variants.map((v, i) => {
              const on = variant === i;
              return (
                <button
                  key={v.label}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setVariant(i)}
                  className={`rounded-lg border p-3 text-left transition-colors ${
                    on ? "border-gold bg-gold/10" : "border-cosmic bg-night/50 hover:border-genie"
                  }`}
                >
                  <span className={`block font-heading text-sm font-semibold ${on ? "text-gold" : "text-cream"}`}>
                    {v.label}
                  </span>
                  <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-wide text-slate/55">
                    {v.value}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate/70">{demo.variants.length} output formats · ready</span>
            <div className="flex items-center gap-1.5">
              {demo.variants.map((v, i) => (
                <span
                  key={v.label}
                  className={`h-1.5 rounded-full transition-all ${
                    variant === i ? "w-4 bg-gold" : "w-1.5 bg-cream/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="space-y-2">
        <button
          type="button"
          onClick={handleApply}
          disabled={applyState === "running"}
          className={`flex w-full items-center justify-center gap-2 rounded-lg py-3 font-semibold transition-transform hover:scale-[1.02] disabled:hover:scale-100 ${
            applyState === "done" ? "bg-emerald-500 text-night" : "bg-gold text-night"
          }`}
        >
          {applyState === "idle" ? (
            <>
              {demo.applyLabel} <ArrowRight size={16} />
            </>
          ) : applyState === "running" ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Auto-editing…
            </>
          ) : (
            <>
              <Check size={16} /> Exported — tap to redo
            </>
          )}
        </button>
        {applyState !== "idle" ? (
          <div className="h-1 w-full overflow-hidden rounded-full bg-cosmic">
            <div
              className="h-full rounded-full bg-gold transition-[width] duration-100 ease-linear"
              style={{ width: `${applyState === "done" ? 100 : progress}%` }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
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
    case "script": {
      // Compact single-line rows with an inline label, like a real script sheet.
      const rows = [
        { label: "HOOK", tone: "gold" as const, text: demo.hook },
        ...demo.beats.map((b) => ({
          label: "BEAT" as const,
          tone: "plain" as const,
          text: b.replace(/^Beat\s*\d+\s*[—-]\s*/, ""),
        })),
        { label: "CTA", tone: "genie" as const, text: demo.cta },
      ];
      return (
        <div className="space-y-2 text-sm">
          {rows.map((r, i) => {
            const box =
              r.tone === "gold"
                ? "border-gold/40 bg-gold/10"
                : r.tone === "genie"
                ? "border-genie/50 bg-genie/15"
                : "border-cosmic bg-night/50";
            const label =
              r.tone === "gold" ? "text-gold" : r.tone === "genie" ? "text-genie" : "text-slate/40";
            return (
              <div key={i} className={`flex items-baseline gap-3 rounded-lg border px-3 py-2 ${box}`}>
                <span className={`w-10 shrink-0 font-mono text-[10px] tracking-wide ${label}`}>
                  {r.label}
                </span>
                <span className="text-slate/85">
                  <TypeText text={r.text} startDelay={at(r.text)} />
                </span>
              </div>
            );
          })}
        </div>
      );
    }
    case "edit":
      return <EditDemo demo={demo} />;
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
                    : "border-cosmic text-slate/70 hover:border-genie hover:text-cream"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <p className="mt-4 font-mono text-xs text-slate/60">
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
              <span className="text-slate/85">
                <TypeText text={slot.platform} startDelay={at(slot.platform)} />
              </span>
              <span className="font-mono text-xs text-slate/60">{slot.when}</span>
              <span
                className={`rounded-full px-2.5 py-1 font-mono text-[10px] ${
                  slot.status === "Scheduled" ? "bg-gold/15 text-gold" : "bg-cosmic text-slate/60"
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
  // Tracks the active touch so we can tell a horizontal "tilt" drag apart from a
  // vertical page-scroll — and leave taps on the inner controls alone.
  const touch = useRef<{ startX: number; startY: number; mode: "idle" | "tilt" | "skip" }>({
    startX: 0,
    startY: 0,
    mode: "idle",
  });
  const tab = MOCKUP.tabs.find((t) => t.id === active)!;

  const reducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function tiltFrom(clientX: number, clientY: number) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setTilt({
      x: (clientX - rect.left) / rect.width - 0.5,
      y: (clientY - rect.top) / rect.height - 0.5,
    });
  }

  function onMove(e: React.MouseEvent) {
    if (reducedMotion()) return;
    tiltFrom(e.clientX, e.clientY);
  }

  function onTouchStart(e: React.TouchEvent) {
    if (reducedMotion()) return;
    const t = e.touches[0];
    // Don't hijack drags that begin on an interactive control (tabs, slider, buttons).
    const onControl = (e.target as HTMLElement).closest?.(
      'button, a, input, select, textarea, [role="tab"], [role="switch"]'
    );
    touch.current = { startX: t.clientX, startY: t.clientY, mode: onControl ? "skip" : "idle" };
  }

  function onTouchMove(e: React.TouchEvent) {
    if (touch.current.mode === "skip" || reducedMotion()) return;
    const t = e.touches[0];
    if (touch.current.mode === "idle") {
      const dx = Math.abs(t.clientX - touch.current.startX);
      const dy = Math.abs(t.clientY - touch.current.startY);
      if (dx < 8 && dy < 8) return; // wait until the gesture has a direction
      // Vertical-dominant → let the page scroll; horizontal → we own it as a tilt.
      touch.current.mode = dx > dy ? "tilt" : "skip";
      if (touch.current.mode === "skip") return;
    }
    tiltFrom(t.clientX, t.clientY);
  }

  function resetTilt() {
    touch.current.mode = "idle";
    setTilt({ x: 0, y: 0 });
  }

  return (
    <section id="product" className="relative overflow-hidden bg-night py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-16 lg:px-14">
        {/* Left: copy + tool accordion */}
        <div className="lg:sticky lg:top-28">
          <h2 className="font-heading text-3xl font-bold leading-tight text-cream md:text-4xl">
            {MOCKUP.heading}
          </h2>
          <p className="mt-4 text-slate/70">{MOCKUP.subheading}</p>

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
                        isOpen ? "text-gold" : "text-slate/80"
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
                      <Plus size={16} className="shrink-0 text-slate/50" />
                    )}
                  </button>
                  {isOpen ? (
                    <p className="max-w-sm pb-5 pl-5 text-sm leading-relaxed text-slate/70">
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
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={resetTilt}
            onTouchCancel={resetTilt}
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
                      : "border-transparent text-slate/55 hover:text-cream"
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
              width={160}
              height={160}
              className="h-24 w-24 shrink-0 object-contain -my-2 sm:h-36 sm:w-36 sm:-my-4"
            />
            <p className="text-sm leading-relaxed text-slate/85">{MOCKUP.banner.text}</p>
            <span className="shrink-0 font-mono text-[10px] tracking-widest text-gold">
              {MOCKUP.banner.tag}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
