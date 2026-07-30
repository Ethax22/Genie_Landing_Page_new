import { LANGUAGES } from "@/content/copy";

/**
 * Looping micro-demos that sit on top of each carousel card.
 * Pure CSS keyframes (see globals.css) — no video files, no JS timers,
 * and the global reduced-motion rule freezes them all.
 */

// Inset preview panel: a rounded, darker box that floats inside the card body,
// with the card surface framing it on all sides (Creedom-style).
const shell =
  "relative h-60 overflow-hidden rounded-xl border border-cosmic/70 bg-night p-4";
const label = "font-mono text-[9px] tracking-widest text-cream/45";

function delay(i: number) {
  return { "--demo-delay": `${i * 0.45}s` } as React.CSSProperties;
}

function ScriptDemo() {
  return (
    <div className={shell}>
      <span className={label}>SCRIPT BUILDER</span>
      <div className="mt-3 rounded-lg border border-cosmic bg-cosmic/40 p-2.5">
        <p className="overflow-hidden whitespace-nowrap text-[11px] text-cream">
          <span className="demo-type inline-block overflow-hidden align-bottom">
            POV: your Reels look like 2014
          </span>
          <span className="demo-caret text-gold">|</span>
        </p>
      </div>
      <div className="mt-3 space-y-1.5">
        {[
          ["HOOK", "The 3 settings every creator gets wrong"],
          ["BEAT", "Shoot once, straight to camera"],
          ["CTA", "Follow for the Tamil dub"],
        ].map(([tag, line], i) => (
          <div
            key={tag}
            style={delay(i)}
            className="demo-pop flex items-center gap-2.5 rounded-md border border-cosmic bg-cosmic/30 px-2.5 py-1.5"
          >
            <span className="font-mono text-[9px] text-gold">{tag}</span>
            <span className="truncate text-[10px] text-cream/75">{line}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[10px] text-cream/45">Writing in your voice…</p>
    </div>
  );
}

function VideoDemo() {
  return (
    <div className={shell}>
      <span className={label}>SCENE SEQUENCE</span>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={delay(i)}
            className="demo-pop relative flex h-20 items-end rounded-md border border-genie/40 bg-gradient-to-br from-genie/50 to-cosmic p-1.5"
          >
            <span className="font-mono text-[8px] text-cream/60">SCENE {i + 1}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-cosmic">
        <div className="demo-fill h-full rounded-full bg-gold" />
      </div>
      <div className="mt-4 rounded-md border border-cosmic bg-cosmic/30 px-2.5 py-2">
        <span className="text-[10px] text-cream/70">Stitching 3 scenes into one clip…</span>
      </div>
    </div>
  );
}

function EditDemo() {
  return (
    <div className={shell}>
      <span className={label}>TIMELINE · FILLER PASS</span>
      <div className="mt-5 flex h-28 items-end gap-[3px]">
        {Array.from({ length: 26 }).map((_, i) => {
          const isCut = [4, 5, 12, 13, 19].includes(i);
          const height = 30 + Math.round(Math.abs(Math.sin(i * 1.7)) * 65);
          return (
            <span
              key={i}
              style={{ ...delay(i % 6), height: `${height}%` }}
              className={`flex-1 origin-bottom rounded-sm ${
                isCut ? "demo-cut bg-red-400/70" : "demo-bar bg-genie"
              }`}
            />
          );
        })}
      </div>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-[10px] text-cream/45">14 fillers · 9 silences</span>
        <span className="rounded-full bg-gold/15 px-2 py-0.5 font-mono text-[9px] text-gold">
          CUT
        </span>
      </div>
    </div>
  );
}

function DubDemo() {
  return (
    <div className={shell}>
      <span className={label}>LANGUAGE · VOICE</span>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {LANGUAGES.slice(0, 10).map((lang, i) => (
          <span
            key={lang}
            style={delay(i)}
            className="demo-pop rounded-full border border-cosmic px-2.5 py-1 text-[9px] text-cream/75"
          >
            {lang}
          </span>
        ))}
      </div>
      <div className="mt-4 flex h-10 items-center gap-[3px]">
        {Array.from({ length: 22 }).map((_, i) => (
          <span
            key={i}
            style={delay(i % 7)}
            className="demo-bar h-full flex-1 origin-center rounded-sm bg-gold/70"
          />
        ))}
      </div>
      <p className="mt-3 text-[10px] text-cream/45">38 voices · auto gender match</p>
    </div>
  );
}

function ThumbnailDemo() {
  return (
    <div className={shell}>
      <span className={label}>THUMBNAIL · 2 FORMATS</span>
      <div className="mt-5 flex items-end gap-4">
        <div
          style={delay(0)}
          className="demo-pop relative h-28 flex-1 overflow-hidden rounded-md border border-genie/40 bg-gradient-to-br from-genie/50 to-cosmic"
        >
          <span className="absolute bottom-1.5 left-2 font-mono text-[8px] text-cream/70">16:9</span>
        </div>
        <div
          style={delay(1)}
          className="demo-pop relative h-32 w-20 overflow-hidden rounded-md border border-gold/40 bg-gradient-to-br from-gold/30 to-cosmic"
        >
          <span className="absolute bottom-1.5 left-2 font-mono text-[8px] text-cream/70">9:16</span>
        </div>
      </div>
      <p className="mt-4 text-[10px] text-cream/45">Generated from the same pass</p>
    </div>
  );
}

function PublishDemo() {
  return (
    <div className={shell}>
      <span className={label}>SCHEDULE</span>
      <div className="mt-4 space-y-2.5">
        {[
          ["YouTube Shorts", "Tue 7:30 PM"],
          ["Instagram Reels", "Tue 7:45 PM"],
          ["YouTube Shorts", "Thu 6:00 PM"],
        ].map(([platform, when], i) => (
          <div
            key={i}
            style={delay(i)}
            className="demo-pop flex items-center justify-between rounded-md border border-cosmic bg-cosmic/40 px-3 py-2.5"
          >
            <span className="text-[10px] text-cream/80">{platform}</span>
            <span className="font-mono text-[9px] text-gold">{when}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[10px] text-cream/45">Uploads on time · retries on failure</p>
    </div>
  );
}

function UpiDemo() {
  return (
    <div className={shell}>
      <span className={label}>PAY PAGE</span>
      <div className="mt-4 rounded-lg border border-gold/40 bg-gold/10 p-5 text-center">
        <p className="font-mono text-3xl text-gold">₹ 199</p>
        <p className="mt-1.5 text-[10px] text-cream/60">from your audience, direct</p>
      </div>
      <div
        style={delay(1)}
        className="demo-pop mt-4 rounded-md bg-genie/30 py-2.5 text-center font-mono text-[10px] text-cream"
      >
        PAY VIA UPI
      </div>
      <p className="mt-2.5 text-[10px] text-cream/45">Public pay page · Razorpay UPI</p>
    </div>
  );
}

const DEMOS: Record<string, React.FC> = {
  script: ScriptDemo,
  video: VideoDemo,
  edit: EditDemo,
  dub: DubDemo,
  thumbnail: ThumbnailDemo,
  publish: PublishDemo,
  upi: UpiDemo,
};

export default function CardDemo({ id }: { id: string }) {
  const Demo = DEMOS[id];
  return Demo ? <Demo /> : null;
}
