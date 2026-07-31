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

        {/* Mobile: stacked cards */}
        <ul className="mt-10 space-y-3 md:hidden">
          {COMPARISON.rows.map((row, i) => (
            <Reveal as="li" key={row} delay={i * 60}>
              <div className="rounded-xl border border-cosmic bg-cosmic/30 p-4">
                <p className="text-sm font-medium leading-relaxed text-slate/90">{row}</p>
                <div className="mt-3 flex items-center gap-6 text-xs">
                  <span className="inline-flex items-center gap-2 font-semibold text-slate/80">
                    <Check size={15} strokeWidth={3} className="text-green-400" />
                    {COMPARISON.colGenie}
                  </span>
                  <span className="inline-flex items-center gap-2 text-slate/45">
                    <X size={15} strokeWidth={3} className="text-red-400/80" />
                    Others
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
