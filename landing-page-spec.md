# Genie Landing Page — Build Spec v2 (Creedom/Obula direction)

**Product:** Genie — Vertical AI Creator OS for India's regional-language creators (YouTube Shorts, Instagram Reels)
**Company:** Genie Hive Private Limited
**Stage:** Pre-launch, waitlist-collection landing page · **Deadline: Demo Day Aug 5**
**Repo:** separate repo (`genie-landing`), Next.js 14+ (App Router), TypeScript, Tailwind, shadcn/ui
**Reference sites:** obula.io/welcome (mockup window + scroll path), creedom.ai (nav, hero, comparison table, mascot chatbox, FAQ)

**Supersedes:** the section layout in `landing-page-build-plan.md` (§3). Its infra decisions still stand and are folded in below: SQLite waitlist (§11 here), anti-spam, Docker/Azure deploy, verification gates. The R3F/WebGL cosmic hero from the old plan is **dropped** — this direction is pure CSS/SVG, no 3D bundle, no animation library.

---

## 0. Design System — "Indigo Depths"

- Night Sky `#0B0E2E`, Cosmic Blue `#23215E`, Genie Purple `#5B3B8C`, Moon Gold `#D4AF37`, Neutral `#F7F7F8`
- Typography: Sora 700 (headings), Inter (body), JetBrains Mono (numeric stats/chips) — all via `next/font`, self-hosted, no CDN
- Cosmic/gradient treatment allowed freely; stars/texture at 4–8% opacity, static, CSS/SVG-generated
- Purple/gold as tints on icon backgrounds and badges — not large flat fills
- No saffron/flag-associated hues anywhere
- Icons: lucide-react. `Clapperboard` = video gen, `ImagePlus` = thumbnail, `Wand2` = fully automated action only. No sparkle/star icons.

**Copy rule (non-negotiable):** every claim must be defensible against the Genie codebase audit. No fabricated stats, ratings, or user counts.

**Locked real numbers (the only stats allowed on the page):**
- `11` Indian languages dubbed end-to-end
- `38` AI voices
- `74` creators consulted / interviewed
- `70+` creators confirmed for closed beta (Tamil Nadu)
- `2` platforms auto-publish today: **YouTube Shorts + Instagram Reels** (Moj/Josh = export-ready, never "auto-publish")

**Locked claims (founder-confirmed defensible):**
- UPI: "Collects UPI payments from your audience directly" — keep the strong phrasing
- "Built to run on 2G/3G" — keep
- CI copy sweep (from old plan): banned-word grep `AI-powered|supercharge|unlock|revolutioni[sz]e|seamless`

**Assets (all in hand — no placeholder phase needed):**
- Mascot poses: hero, chatbox avatar, card-edge reaction, CTA band. Source: `apps/web/public/mascot/` in main repo (port sparkle styling from `GenieMascot.tsx` only if it doesn't violate the no-sparkle-icon rule — mascot's own sparkles are brand art, fine)
- Partner program logos: Microsoft for Startups, AWS Activate, Deepgram Startup Program, Sarvam AI Startup Program, Anthropic (Claude for Startups)

---

## 1. Nav Bar

- Sticky, glass/blur: `backdrop-filter: blur(12px)`, background `rgba(11,14,46,0.7)`, 1px bottom border in Cosmic Blue at low opacity
- Left: Genie logo
- Center links — **reframed to match sections that actually exist**, all same-page anchors:
  - **Product** → §4 mockup section
  - **Languages** → §5 comparison (the dubbing/Tanglish rows) — or §6 carousel if the dub card reads stronger visually; decide at build
  - **Genie vs AI** → §5 comparison table
  - **FAQ** → §7
  - *(No Pricing or Demo links — those sections don't exist pre-launch. Add them only when there's a real pricing page / demo video.)*
- Right: single CTA — **"Join the Waitlist"** (Moon Gold fill) → anchors to §8 waitlist form
- Shrinks on scroll (padding 20px → 12px)
- Mobile: hamburger → full-screen Night Sky overlay, staggered link reveal

---

## 2. Hero

**Layout:** copy left, mascot right (Creedom pattern)

**Ghosted background text** (behind headline, ~6–10% opacity, scattered rotation, `aria-hidden`, non-interactive):
- "MERA SCRIPT KAHA HAI"
- "YEH ENGLISH ONLY HAI"
- "TRANSLATION SOUNDS ROBOTIC"
- "NO ONE PAYS ME IN UPI"
- "EDITING TAKES ALL NIGHT"
- "STUCK ON 3G"
- "DUBBING COSTS TOO MUCH"

**Left column:**
- Eyebrow (Moon Gold small caps): "DPIIT-RECOGNIZED · BUILT FOR INDIA'S REGIONAL CREATORS"
- H1 (approved from draft, reuse): "Record once. Genie edits, dubs, and publishes — in 11 Indian languages." + approved subhead from `landing-page-draft.md`
- CTA: "Join the Waitlist" → §8 form
- Microcopy: "Free to join · No credit card"

**Right column:**
- Genie mascot, hero pose
- Floating stat chips (JetBrains Mono, StatChip component), positioned like Creedom's card chips:
  - "🎙️ 11 languages"
  - "💸 UPI-ready"
  - optional third: "🗣️ 38 AI voices"

---

## 3. Trust Strip

- Single row, grayscale logos → subtle color on hover
- Logos (all supplied): Microsoft for Startups · AWS Activate · Deepgram Startup Program · Sarvam AI Startup Program · Anthropic (Claude for Startups)
- Label above row: **"Built with support from"** (program-acceptance strip, not customer logos — keep modest)

---

## 4. Obula-Style Product Mockup Section

- Window-chrome card: 3 dots top-left, "LIVE PREVIEW" tag top-right
- **4 tabs** across the card top, mapped to the real pipeline and matching the §10 path markers: **Script → Edit → Dub → Publish**
  - *Script:* hook/beat/point/CTA breakdown (Obula style) of a real generated script
  - *Edit:* the anchor feature — auto-editor pass: cuts, captions, title, thumbnail from one upload ("1 upload → edit, captions, titles, thumbnail")
  - *Dub:* language picker showing the 11 languages + voice selection (38 voices)
  - *Publish:* schedule view — YouTube Shorts + Instagram Reels
- Content must reflect actual product behavior — screenshots/recreations of real screens, not invented UI
- Genie mascot at card edge, small scale, reacting (card-edge reaction pose) — doesn't compete with the mockup

---

## 5. Genie vs General AI

Creedom-format check/cross grid. Rows (all founder-confirmed defensible):

| | Genie | ChatGPT / Claude / Gemini |
|---|:---:|:---:|
| Dubs your content into 11 Indian languages, not just translates text | ✓ | ✗ |
| Understands Tanglish/Hinglish the way a creator actually speaks | ✓ | ✗ |
| Takes you from script to a published, payable reel — one workflow | ✓ | ✗ |
| Built to run on 2G/3G, not just broadband | ✓ | ✗ |
| Collects UPI payments from your audience directly | ✓ | ✗ |
| Generates and edits video, not just text | ✓ | ✗ |

Heading pattern: "Genie vs General AI" → "AI answers. Genie builds your reel." (placeholder, refine at build)
Desktop: 3-col table, Genie column highlighted (purple tint border, gold checks). Mobile: stacked cards. Staggered row reveal on scroll-into-view (CSS only).

---

## 6. Superpowers Carousel + Mascot Chatbox

**Carousel:** horizontal card scroll, Creedom-style (icon + title + 1-line description):
- Script Generator
- AI Video Generator (`Clapperboard`)
- Auto Editor — the anchor feature; card copy leads with "actually edits your footage"
- Multi-Language Dubbing — "11 languages · 38 voices"
- Thumbnail Generator (`ImagePlus`)
- Auto-Publish — **"YouTube Shorts & Instagram Reels"** (NOT Moj/Josh — those are export-ready only; omit or footnote)
- UPI Payments — "collect from your audience directly"

**Mascot chatbox:** Creedom popup mechanic — chatbox-avatar pose + speech-bubble card, bottom-right, appears once on scroll-into-view (IntersectionObserver, sessionStorage so it doesn't re-trigger):
> "Ready to script your next reel in Tamil? Join the waitlist"
CTA action → §8 form. Dismissible; respects `prefers-reduced-motion` (no entrance animation).

---

## 7. FAQ

Categorized tabs (Creedom pattern) — reframed to match a pre-launch page honestly:
**General / Features / Beta & Waitlist / Company**
*(not "Pricing & Billing" / "Account & Access" — there are no prices or accounts to answer for yet; a pricing tab invites questions the page can't answer defensibly)*

- Reuse the approved Q&A from `landing-page-draft.md` verbatim, including the honest "Does dubbing clone my voice? — Not yet…" answer
- Any AI-video answer must distinguish true text-to-video vs. auto-editing of uploaded footage
- Accessible tablist; `<details>`-based accordions inside each tab (works without JS); FAQPage JSON-LD generated from the same copy constants

---

## 8. Waitlist Form *(section the CTAs actually land on — was missing from v1 of this spec)*

- Centered card, thin gold border. Header: "Get in before the doors open." + approved microcopy
- **Fields (founder-locked):** Name · Email · Platform handle (Instagram / YouTube — selector + handle input) · Primary language (the 11)
- POST `/api/waitlist` → SQLite (see §11); inline Zod errors; success swaps card to confirmation OR redirects to `/thank-you` (pick one — recommend inline swap, keep `/thank-you` for shared-link campaigns)
- Anti-spam (from old plan): honeypot field + minimum-fill-time check, per-IP token-bucket rate limit, generic success response (no email enumeration), email `UNIQUE COLLATE NOCASE` — lesson from the beta duplicate-accounts incident

---

## 9. CTA Band

Closing section: CTA-band mascot pose + one-liner + button:
> "Your next reel could reach a language ChatGPT can't touch. Be first in when Genie opens up."
> **[Join the Waitlist]** → §8 form

---

## 10. Footer

```
© 2026 Genie Hive Private Limited    Terms & Conditions · Privacy Policy · Refund Policy    [YouTube] [Instagram] [LinkedIn]
```
- Legal name exact: Genie Hive Private Limited
- 3 policy links only: `/terms`, `/privacy`, `/refund`
- Social icons right-aligned, gray → color on hover

---

## 11. Waitlist backend (carried from old plan, fields updated)

- Table: `waitlist(id, name, email UNIQUE COLLATE NOCASE, platform, platform_handle, primary_language, created_at, ip_hash, user_agent)`
- SQLite via better-sqlite3, file on Docker volume (`data/`, gitignored); `scripts/export-waitlist.ts` → CSV for the beta-roster workflow
- No email sending in v1 — export and mail manually

---

## 12. Scroll Line-Following Mascot Effect (Obula-style, build LAST)

1. One static SVG bezier path, single stroke, Genie Purple 40–60% opacity, spanning Hero → §4 mockup → §6 carousel (~3 sections)
2. Mascot = one positioned element, snapped to per-section checkpoints via `IntersectionObserver` — NOT a per-frame scroll listener
3. Progress pill markers on the path = pipeline stages: **Script → Dub → Publish → Get Paid** (same badge component as §4 tabs — keep the stage names consistent between the two)
4. No animation library — pure SVG + CSS transform, position swap on IO triggers only
5. `prefers-reduced-motion`: no transitions, mascot static
6. Disable/simplify on mobile if it costs first-paint budget — decorative polish only

---

## 13. Routes

`/` · `/thank-you` · `/privacy` · `/terms` · `/refund` · `404`

---

## 14. Build Priority Order (hard deadline: Aug 5)

1. Skeleton: repo scaffold, tokens, fonts, `src/content/copy.ts` (ALL copy as typed constants), section shells
2. Nav + Hero (ghost text, chips, mascot)
3. Waitlist form + API + SQLite (the page's entire job — build before any polish)
4. Trust strip
5. Genie vs General AI table
6. Superpowers carousel + mascot chatbox
7. Obula-style mockup section
8. FAQ
9. CTA band + Footer
10. SEO/meta: OG image, favicon, sitemap/robots, Organization + FAQPage JSON-LD, banned-word CI grep
11. Deploy to Azure (Docker standalone + nginx + certbot, per old plan §Phase F) — deploy early with sections 1–3 done, iterate live
12. Scroll line-following effect — last, only if time permits

## 15. Verification (carried from old plan)

- `npm run build` clean; Playwright smoke: all sections render, waitlist POST happy-path + duplicate + honeypot
- Lighthouse CI: Perf ≥ 90 mobile, A11y ≥ 95, SEO ≥ 95 — the 2G/3G claim on the page makes the perf budget a credibility requirement, not just a nicety
- Manual: 375px/768px/1440px, reduced-motion pass, JS-disabled FAQ still readable
- Post-deploy: real signup from a phone on mobile data; CSV export shows it
