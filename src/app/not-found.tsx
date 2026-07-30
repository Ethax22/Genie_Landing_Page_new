import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="stars flex min-h-screen flex-col items-center justify-center bg-night px-4 text-center">
      <Image
        src="/mascot/welcome_genie.png"
        alt=""
        width={120}
        height={120}
        className="h-28 w-28 object-contain opacity-80"
      />
      <h1 className="mt-6 font-heading text-4xl font-bold text-cream">404</h1>
      <p className="mt-3 text-cream/70">This page hasn&apos;t been wished into existence yet.</p>
      <Link href="/" className="mt-8 rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-night">
        Back to Genie
      </Link>
    </main>
  );
}
