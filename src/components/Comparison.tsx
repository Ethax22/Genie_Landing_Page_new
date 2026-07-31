import Image from "next/image";
import { Check, X } from "lucide-react";
import { COMPARISON } from "@/content/copy";
import Reveal from "./Reveal";

function GenieMark() {
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-400/15">
      <Check aria-label="Yes" className="text-green-400" size={18} strokeWidth={3} />
    </span>
  );
}

function OtherMark() {
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-400/10">
      <X aria-label="No" className="text-red-400/80" size={18} strokeWidth={3} />
    </span>
  );
}

export default function Comparison() {
  return (
    <section id="genie-vs-ai" className="bg-night py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="text-center font-heading text-3xl font-bold text-cream md:text-4xl">
          {COMPARISON.heading}
        </h2>
        <p className="mt-3 text-center text-lg text-slate/70">{COMPARISON.subheading}</p>

        {/* Desktop: elevated card holding a 3-col table */}
        <div className="mt-14 hidden md:block">
          <div className="rounded-3xl border border-cosmic/70 bg-gradient-to-b from-cosmic/40 to-night p-2.5 shadow-2xl shadow-genie/20">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="w-[46%] p-5 text-left align-middle">
                    <span className="font-heading text-lg font-bold text-cream">What you get</span>
                  </th>
                  {/* Genie header — lamp only */}
                  <th className="w-[27%] p-5 align-middle">
                    <Image
                      src={COMPARISON.genieLogo}
                      alt={COMPARISON.colGenie}
                      width={44}
                      height={44}
                      className="mx-auto h-11 w-11 object-contain"
                    />
                  </th>
                  {/* Competitors header — logos only */}
                  <th className="w-[27%] p-5 align-middle">
                    <div className="flex items-center justify-center gap-4">
                      {COMPARISON.competitors.map((c) => (
                        <Image
                          key={c.name}
                          src={c.src}
                          alt={c.name}
                          width={26}
                          height={26}
                          className={`h-[26px] w-[26px] object-contain ${c.invert ? "invert" : ""}`}
                        />
                      ))}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.rows.map((row, i) => (
                  <Reveal
                    as="tr"
                    key={row}
                    delay={i * 70}
                    className="border-t border-cosmic/50"
                  >
                    <td className="p-5 align-middle">
                      <p className="font-medium leading-relaxed text-slate/90">{row}</p>
                    </td>
                    <td className="p-5 text-center align-middle">
                      <GenieMark />
                    </td>
                    <td className="p-5 text-center align-middle">
                      <OtherMark />
                    </td>
                  </Reveal>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile: compact 3-column table (feature · Genie · Others) */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-cosmic/70 bg-gradient-to-b from-cosmic/40 to-night shadow-xl shadow-genie/20 md:hidden">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-cosmic/60">
                <th className="px-3 py-3.5">
                  <span className="font-heading text-sm font-bold text-cream">What you get</span>
                </th>
                <th className="w-[3.25rem] px-1 py-3.5 align-middle">
                  <Image
                    src={COMPARISON.genieLogo}
                    alt={COMPARISON.colGenie}
                    width={28}
                    height={28}
                    className="mx-auto h-7 w-7 object-contain"
                  />
                </th>
                <th className="w-[3.25rem] px-1 py-3.5 align-middle">
                  <span className="block text-center font-mono text-[9px] tracking-widest text-slate/45">
                    OTHERS
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.rows.map((row, i) => (
                <Reveal as="tr" key={row} delay={i * 55} className="border-t border-cosmic/40">
                  <td className="px-3 py-3.5 align-middle">
                    <p className="text-[13px] font-medium leading-snug text-slate/90">{row}</p>
                  </td>
                  <td className="px-1 py-3.5 text-center align-middle">
                    <Check aria-label="Yes" size={17} strokeWidth={3} className="mx-auto text-green-400" />
                  </td>
                  <td className="px-1 py-3.5 text-center align-middle">
                    <X aria-label="No" size={17} strokeWidth={3} className="mx-auto text-red-400/80" />
                  </td>
                </Reveal>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
