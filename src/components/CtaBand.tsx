import Image from "next/image";
import { CTA_BAND } from "@/content/copy";

export default function CtaBand() {
  return (
    <section className="relative bg-night px-6 pb-24 pt-32">
      <div className="relative mx-auto max-w-4xl">
        {/* Mascot overhangs the panel's top edge — kept outside the clipped panel so it isn't cropped */}
        <Image
          src="/mascot/sitting-genie-pose.png"
          alt=""
          width={280}
          height={280}
          className="absolute left-1/2 top-0 z-10 h-52 w-auto -translate-x-1/2 -translate-y-[55%] object-contain drop-shadow-[0_20px_35px_rgba(37,99,235,0.55)] sm:h-64"
        />

        {/* Elevated gradient panel */}
        <div className="ambient-horizon relative overflow-hidden rounded-[2rem] border border-gold/30 bg-gradient-to-b from-cosmic/70 via-genie/25 to-night px-6 pb-14 pt-24 text-center shadow-2xl shadow-genie/30 sm:px-12 sm:pt-28">
          {/* soft top glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gold/10 to-transparent"
          />

          <h2 className="relative mx-auto max-w-2xl font-heading text-3xl font-bold leading-tight text-cream md:text-4xl">
            {CTA_BAND.line}
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-slate/75">{CTA_BAND.sub}</p>

          <a
            href={CTA_BAND.cta.href}
            className="btn-gold relative mt-8 inline-block rounded-full px-10 py-4 text-lg font-semibold transition-transform hover:scale-105"
          >
            {CTA_BAND.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
