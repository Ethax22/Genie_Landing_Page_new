import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WAITLIST } from "@/content/copy";

export const metadata: Metadata = {
  title: "You're on the list — Genie",
  robots: { index: false },
};

export default function ThankYou() {
  return (
    <main className="stars flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-night to-cosmic/50 px-4 text-center">
      <Image
        src="/mascot/one_hand_thumbs_up_genie.png"
        alt=""
        width={140}
        height={140}
        className="h-32 w-32 object-contain"
      />
      <h1 className="mt-6 font-heading text-3xl font-bold text-gold">
        {WAITLIST.success.heading}
      </h1>
      <p className="mt-3 max-w-md text-slate/75">{WAITLIST.success.body}</p>
      <Link href="/" className="mt-8 rounded-full border border-gold px-6 py-2.5 text-sm text-gold transition-colors hover:bg-gold hover:text-night">
        Back to Genie
      </Link>
    </main>
  );
}
