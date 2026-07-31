import Image from "next/image";
import { TRUST } from "@/content/copy";

export default function TrustStrip() {
  return (
    <section className="border-y border-cosmic/40 bg-night py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="mb-10 text-center font-mono text-xs tracking-widest text-slate/50">
          {TRUST.label.toUpperCase()}
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8 sm:justify-between">
          {TRUST.partners.map((p) => (
            <li key={p.name} className="flex items-center gap-2.5">
              <Image
                src={p.src}
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 object-contain grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
              />
              <span className="whitespace-nowrap text-sm text-slate/70">{p.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
