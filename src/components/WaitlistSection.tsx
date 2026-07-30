import { WAITLIST } from "@/content/copy";
import WaitlistForm from "./WaitlistForm";

export default function WaitlistSection() {
  return (
    <section id="waitlist" className="stars relative bg-gradient-to-b from-night to-cosmic/50 py-24">
      <div className="relative mx-auto max-w-lg px-4 sm:px-6">
        <div className="rounded-2xl border border-gold/60 bg-night/80 p-8 shadow-2xl shadow-genie/20 sm:p-10">
          <h2 className="text-center font-heading text-3xl font-bold text-cream">
            {WAITLIST.heading}
          </h2>
          <p className="mb-8 mt-3 text-center text-sm text-cream/70">{WAITLIST.subheading}</p>
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
