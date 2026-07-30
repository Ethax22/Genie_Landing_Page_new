import Image from "next/image";
import { CTA_BAND } from "@/content/copy";

export default function CtaBand() {
  return (
    <section className="relative bg-night px-6 pb-24 pt-32">
      <div className="relative mx-auto max-w-4xl">
        {/* Elevated gradient panel with the mascot overhanging the top edge */}
        <div className="relative overflow-hidden rounded-[2rem] border border-gold/30 bg-gradient-to-b from-cosmic/70 via-genie/25 to-night px-6 pb-14 pt-24 text-center shadow-2xl shadow-genie/30 sm:px-12 sm:pt-28">
          {/* soft top glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gold/10 to-transparent"
          />

          <Image
            src="/mascot/thumbs_up_genie.png"
            alt=""
            width={180}
            height={180}
            className="absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_20px_35px_rgba(91,59,140,0.6)] sm:h-40 sm:w-40"
          />

          <h2 className="relative mx-auto max-w-2xl font-heading text-3xl font-bold leading-tight text-cream md:text-4xl">
            {CTA_BAND.line}
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-cream/75">{CTA_BAND.sub}</p>

          <a
            href={CTA_BAND.cta.href}
            className="relative mt-8 inline-block rounded-full bg-gold px-10 py-4 text-lg font-semibold text-night shadow-lg shadow-gold/30 transition-transform hover:scale-105"
          >
            {CTA_BAND.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
