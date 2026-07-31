import { FOOTER } from "@/content/copy";

// Brand icons were removed from lucide-react v1, so these are inline SVGs.
const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  YouTube: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
    </svg>
  ),
  Instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  LinkedIn: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  ),
};

export default function Footer() {
  return (
    <footer className="border-t border-cosmic/40 bg-night py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-sm text-slate/60 sm:px-6 md:flex-row md:justify-between">
        <span>{FOOTER.copyright}</span>
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          {FOOTER.legal.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-gold">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <ul className="flex items-center gap-4">
          {FOOTER.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                aria-label={social.label}
                className="text-slate/50 transition-colors hover:text-gold"
                target="_blank"
                rel="noopener noreferrer"
              >
                {SOCIAL_ICONS[social.label]}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
