/**
 * ALL page copy lives here as typed constants.
 * Copy rule (non-negotiable): every claim must be defensible against the
 * Genie codebase audit (docs/landing-page-draft.md in the main repo).
 * Locked stats: 11 languages · 38 voices · 74 consulted · 70+ beta · 2 platforms.
 */

export const LANGUAGES = [
  "Hindi",
  "Tamil",
  "Telugu",
  "Marathi",
  "Kannada",
  "Bengali",
  "Gujarati",
  "Punjabi",
  "Hinglish",
  "Tanglish",
  "English",
] as const;

export const NAV = {
  links: [
    { label: "Product", href: "#product" },
    { label: "Languages", href: "#languages" },
    { label: "Genie vs AI", href: "#genie-vs-ai" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: { label: "Join the Waitlist", href: "#waitlist" },
} as const;

export const HERO = {
  ghostLines: [
    "MERA SCRIPT KAHA HAI",
    "YEH ENGLISH ONLY HAI",
    "TRANSLATION SOUNDS ROBOTIC",
    "NO ONE PAYS ME IN UPI",
    "EDITING TAKES ALL NIGHT",
    "STUCK ON 3G",
    "DUBBING COSTS TOO MUCH",
    "SIX TOOLS, SIX EXPORTS",
    "CAPTIONS GOT MY NAME WRONG",
    "WHY IS IT ONLY IN ENGLISH",
    "RE-UPLOADING AGAIN",
    "MY AUDIENCE SPEAKS TAMIL",
  ],
  eyebrow: "DPIIT-RECOGNIZED · BUILT FOR INDIA'S REGIONAL CREATORS",
  h1: "Record once. Genie edits, dubs, and publishes — in 11 Indian languages.",
  subhead:
    "One studio, not six tools — AI editing, native-sounding dubbing, and publishing straight to YouTube Shorts and Instagram Reels.",
  cta: "Join the Waitlist",
  microcopy: "Free to join · No credit card",
  greeting: {
    title: "Hi, I'm Genie 👋",
    line: "Your reel, in every language your audience speaks",
  },
  chips: [
    { emoji: "🎬", label: "1 upload → 4 outputs" },
    { emoji: "🌏", label: "11 languages, one take" },
    { emoji: "💸", label: "Paid in UPI" },
  ],
} as const;

export const TRUST = {
  label: "Our Trusted Partners",
  partners: [
    { name: "Microsoft", src: "/partners/microsoft.svg" },
    { name: "AWS", src: "/partners/aws.svg" },
    { name: "Deepgram", src: "/partners/deepgram.svg" },
    { name: "Sarvam AI", src: "/partners/sarvam.png" },
    { name: "Anthropic", src: "/partners/anthropic.svg" },
  ],
} as const;

export const MOCKUP = {
  heading: "One upload in. A published reel out.",
  subheading:
    "Genie bundles the whole pipeline in one window, so you go from a blank page to a published reel without switching apps. Open any stage — it's the real thing.",
  banner: {
    text: "One pipeline behind every stage. Genie carries your script, your voice and your language from the first line to the published reel.",
    tag: "THE GENIE PIPELINE",
  },
  windowTag: "LIVE PREVIEW",
  tabs: [
    {
      id: "script",
      label: "Script",
      title: "Script Generator",
      description:
        "Genie breaks your idea into a hook, beats, and a call-to-action — in the language your audience speaks.",
      demo: {
        kind: "script" as const,
        hook: "“Your phone shoots 4K. So why do your Reels look like 2014?”",
        beats: [
          "Beat 1 — The 3 settings every creator gets wrong",
          "Beat 2 — Shoot once, in your language, straight to camera",
          "Point — Genie cuts the fillers and dead air for you",
        ],
        cta: "“Follow for part 2 — dubbing this into Tamil.”",
      },
    },
    {
      id: "edit",
      label: "Edit",
      title: "Auto Editor",
      description:
        "1 upload → edit, captions, titles, thumbnail. Genie transcribes word-by-word, cuts fillers and silences, and every cut stays reviewable.",
      demo: {
        kind: "edit" as const,
        items: [
          { label: "Filler words removed", value: "14 cuts" },
          { label: "Silences trimmed", value: "9 cuts" },
          { label: "Captions", value: "word-level, styled" },
          { label: "Title + thumbnail", value: "generated from the same pass" },
        ],
        command: "“remove the pause at 0:42”",
      },
    },
    {
      id: "dub",
      label: "Dub",
      title: "Multi-Language Dubbing",
      description:
        "Pick a language, pick a voice. Hinglish stays Hinglish, Tanglish stays Tanglish — 11 languages, 38 voices.",
      demo: {
        kind: "dub" as const,
        voices: "38 voices · auto gender match",
      },
    },
    {
      id: "publish",
      label: "Publish",
      title: "Publish & Schedule",
      description:
        "Connect once. Genie uploads on time to YouTube Shorts and Instagram Reels — and retries if a platform hiccups.",
      demo: {
        kind: "publish" as const,
        slots: [
          { platform: "YouTube Shorts", when: "Tue · 7:30 PM", status: "Scheduled" },
          { platform: "Instagram Reels", when: "Tue · 7:45 PM", status: "Scheduled" },
          { platform: "YouTube Shorts", when: "Thu · 6:00 PM", status: "Draft" },
        ],
      },
    },
  ],
} as const;

export const COMPARISON = {
  heading: "Genie vs General AI",
  subheading: "AI answers. Genie builds your reel.",
  colGenie: "Genie",
  colOther: "ChatGPT · Claude · Gemini",
  badge: "RECOMMENDED",
  genieLogo: "/logo-lamp.png",
  competitors: [
    { name: "ChatGPT", src: "/partners/openai.svg", invert: true },
    { name: "Claude", src: "/partners/claude-color.svg", invert: false },
    { name: "Gemini", src: "/partners/gemini.svg", invert: false },
  ],
  rows: [
    "Dubs your video into 11 Indian languages with natural human voices",
    "Edits your footage end to end — cuts fillers, adds word-level captions, exports ready to post",
    "Takes one recording to a scheduled Short or Reel without switching apps",
    "Keeps Tanglish & Hinglish natural, matching how you actually speak",
    "Built to run on 2G/3G and low-end Android phones",
    "Collects payments from your audience directly over UPI",
  ],
} as const;

export const CAROUSEL = {
  heading: "Everything a creator ships with",
  subheading: "Every card below is a shipped feature, not a roadmap slide.",
  cards: [
    {
      demo: "script",
      icon: "FileText",
      title: "Script Generator",
      description: "Hooks, beats and CTAs in your language — with your brand voice enforced.",
    },
    {
      demo: "video",
      icon: "Clapperboard",
      title: "Video Generator",
      description: "Turn a script into a multi-scene video — generated, then stitched into one clip.",
    },
    {
      demo: "edit",
      icon: "Scissors",
      title: "Auto Editor",
      description: "Actually edits your footage — cuts fillers, silences and dead takes, every cut reviewable.",
    },
    {
      demo: "dub",
      icon: "Languages",
      title: "Multi-Language Dubbing",
      description: "11 languages · 38 voices. Hinglish stays Hinglish, Tanglish stays Tanglish.",
    },
    {
      demo: "thumbnail",
      icon: "ImagePlus",
      title: "Thumbnail Generator",
      description: "16:9 and 9:16 thumbnails out of the same editing pass.",
    },
    {
      demo: "publish",
      icon: "CalendarClock",
      title: "Auto-Publish",
      description: "YouTube Shorts & Instagram Reels — scheduled, uploaded on time, retried on failure.",
    },
    {
      demo: "upi",
      icon: "IndianRupee",
      title: "UPI Payments",
      description: "Collect UPI payments from your audience directly, with a public pay page.",
    },
  ],
} as const;

export const CHATBOX = {
  message: "Ready to script your next reel in Tamil? Join the waitlist",
  cta: { label: "Join the Waitlist", href: "#waitlist" },
} as const;

export const FAQ = {
  heading: "Questions, answered honestly",
  categories: [
    {
      id: "general",
      label: "General",
      items: [
        {
          q: "What is Genie?",
          a: "Genie is a Creator OS for India. It is one place to script, generate, edit, dub and publish your videos. Instead of stitching together six different tools, you record once and Genie takes it all the way to a finished reel in up to 11 Indian languages, ready to post to YouTube Shorts and Instagram Reels.",
        },
        {
          q: "Who is it for?",
          a: "Short-form and regional-language creators on YouTube and Instagram, especially anyone whose audience speaks Hindi, Tamil, Telugu or any Indian language, not just English. If you are a solo creator doing your own scripting, editing and posting, Genie replaces the tool-juggling so you can focus on making.",
        },
        {
          q: "What languages does Genie speak?",
          a: "Eleven, dubbed end to end with natural voices: Hindi, Tamil, Telugu, Marathi, Kannada, Bengali, Gujarati, Punjabi, plus Hinglish, Tanglish and English. It is real dubbing matched to a real voice, not subtitle-style text translation, and it keeps code-mixed speech like Hinglish sounding the way you actually talk.",
        },
        {
          q: "Do I need editing or tech skills to use it?",
          a: "No. If you can record on your phone and type a sentence, you can use Genie. It does the heavy editing automatically and you steer it in plain language, with no timelines, no keyframes and no jargon.",
        },
      ],
    },
    {
      id: "features",
      label: "Features",
      items: [
        {
          q: "What does the auto editor actually do?",
          a: "It transcribes your footage word by word, then automatically cuts fillers, silences and dead takes and adds styled word-level captions, B-roll suggestions, titles and thumbnails. Every single cut stays reviewable, nothing is hidden, and you can fine-tune by plain typed command, like “remove the pause at 0:42”. It does the grunt work while you stay in control.",
        },
        {
          q: "Does dubbing clone my voice?",
          a: "Not yet, and we will not pretend otherwise. Today you choose from 38 studio voices and Genie matches the voice to the speaker's gender and tone. Voice cloning in your own voice, with lip-sync, is in active development for launch, and when it ships it will be opt-in and tied to your account.",
        },
        {
          q: "Does Genie generate video from scratch, or edit my footage?",
          a: "Both, and they are deliberately kept as separate features so neither pretends to be the other. The Video Generator builds multi-scene video from a script (text-to-video, image-to-video and reference-to-video). The Auto Editor works on footage you upload, cutting, captioning and packaging your own recording. Use whichever the job needs, or both in one project.",
        },
        {
          q: "Where does my video go?",
          a: "Wherever you want it. Render and download it from Genie, or schedule and publish it straight to YouTube Shorts and Instagram Reels from inside the app, with no re-exporting and no re-uploading. You keep both the source files and the final cut.",
        },
        {
          q: "Can I review and override what the AI does?",
          a: "Always. Genie is assistive, not autopilot. Every cut, caption and dub is reviewable, and you can accept, tweak or redo any of it before it goes out. Nothing publishes without your say-so.",
        },
        {
          q: "What formats does Genie export?",
          a: "Both 9:16 for Shorts and Reels and 16:9 for long-form and YouTube, generated from the same edit pass. One recording gives you the vertical and horizontal cut without re-editing.",
        },
      ],
    },
    {
      id: "waitlist",
      label: "Waitlist",
      items: [
        {
          q: "How do I join the waitlist?",
          a: "Join right here on this page. It takes under a minute. You will be among the first creators we invite when Genie opens up, and we will email you the moment your access is ready.",
        },
        {
          q: "What do waitlist members get?",
          a: "First access when we launch, ahead of the public, plus early updates on what we are building.",
        },
        {
          q: "Does joining the waitlist cost anything?",
          a: "No. It is completely free and there is no card required. You are just reserving your spot for early access.",
        },
        {
          q: "When is Genie launching?",
          a: "We are in the final stretch toward launch. We are not committing to a public date yet because we would rather ship it right, but waitlist members will be the first to know and the first to get in.",
        },
      ],
    },
    {
      id: "company",
      label: "Company",
      items: [
        {
          q: "Who builds Genie?",
          a: "Genie is built by Genie Hive Private Limited, a DPIIT-recognized, India-based startup focused entirely on tools for India's regional-language creators.",
        },
        {
          q: "Is my content safe?",
          a: "Yes. Uploads are virus-scanned, your transcripts and files are stored encrypted, and two-factor authentication is available on your account. Your content stays yours and we never sell it. We may use it to train and improve Genie's own models over time, but never anyone else's.",
        },
        {
          q: "How do I reach you?",
          a: "Email support@geniehive.in and a real person will get back to you.",
        },
      ],
    },
  ],
} as const;

export const WAITLIST = {
  heading: "Get in before the doors open.",
  subheading:
    "Closed beta is limited. Waitlist members get first access as seats free up.",
  fields: {
    name: "Name",
    email: "Email",
    platform: "Platform",
    handle: "Your handle",
    language: "Primary language",
  },
  platforms: ["Instagram", "YouTube"] as const,
  button: "Join the Waitlist",
  microcopy: "No spam. One email when your seat is ready.",
  success: {
    heading: "You're on the list.",
    body: "We'll send one email when your seat is ready. Until then — keep recording.",
  },
} as const;

export const CTA_BAND = {
  line: "Your audience speaks eleven languages. You publish in one.",
  sub: "That gap is the whole opportunity — and Genie closes it with a single recording. Get in before the doors open.",
  cta: { label: "Join the Waitlist", href: "#waitlist" },
} as const;

export const FOOTER = {
  copyright: "© 2026 Genie Hive Private Limited",
  legal: [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Refund Policy", href: "/refund" },
  ],
  socials: [
    { label: "YouTube", href: "https://www.youtube.com/@GenieHive_official" },
    {
      label: "Instagram",
      href: "https://www.instagram.com/genie_hive?igsh=NHZ3MmZoeG5vc28z",
    },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/genie-hive/" },
  ],
} as const;

export const META = {
  title: "Genie — Record once. Publish in 11 Indian languages.",
  description:
    "Genie is a Creator OS for India's regional-language creators: AI editing, dubbing in 11 Indian languages with 38 voices, and direct publishing to YouTube Shorts and Instagram Reels. Join the waitlist.",
  siteName: "Genie",
  url: "https://geniehive.in",
} as const;
