"use client";

import { useRef, useState } from "react";
import { LANGUAGES, WAITLIST } from "@/content/copy";

type Errors = Partial<Record<"name" | "email" | "platform_handle" | "primary_language", string>>;

const inputClass =
  "w-full rounded-lg border border-cosmic bg-night/60 px-4 py-3 text-sm text-cream placeholder:text-slate/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";

export default function WaitlistForm() {
  const startedAt = useRef(Date.now());
  const [platform, setPlatform] = useState<(typeof WAITLIST.platforms)[number]>("Instagram");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const values = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      platform,
      platform_handle: String(fd.get("platform_handle") || "").trim(),
      primary_language: String(fd.get("primary_language") || ""),
      website: String(fd.get("website") || ""),
      started_at: startedAt.current,
    };

    const nextErrors: Errors = {};
    if (!values.name) nextErrors.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = "Enter a valid email.";
    if (!values.platform_handle) nextErrors.platform_handle = "Enter your handle.";
    if (!values.primary_language) nextErrors.primary_language = "Pick your primary language.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    setServerError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setServerError(json.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setServerError("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center" role="status">
        <h3 className="font-heading text-2xl font-bold text-gold">{WAITLIST.success.heading}</h3>
        <p className="mt-3 text-slate/75">{WAITLIST.success.body}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {/* Honeypot — visually hidden, tab-skipped */}
      <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="wl-name" className="mb-1.5 block text-sm text-slate/80">
          {WAITLIST.fields.name}
        </label>
        <input id="wl-name" name="name" type="text" autoComplete="name" className={inputClass} />
        {errors.name ? <p className="mt-1 text-xs text-red-400">{errors.name}</p> : null}
      </div>

      <div>
        <label htmlFor="wl-email" className="mb-1.5 block text-sm text-slate/80">
          {WAITLIST.fields.email}
        </label>
        <input id="wl-email" name="email" type="email" autoComplete="email" className={inputClass} />
        {errors.email ? <p className="mt-1 text-xs text-red-400">{errors.email}</p> : null}
      </div>

      <div>
        <span className="mb-1.5 block text-sm text-slate/80">{WAITLIST.fields.platform}</span>
        <div className="flex gap-2" role="group" aria-label="Platform">
          {WAITLIST.platforms.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPlatform(p)}
              aria-pressed={platform === p}
              className={`rounded-lg border px-4 py-2 text-sm transition-colors ${
                platform === p
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-cosmic text-slate/70 hover:border-genie"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <input
          name="platform_handle"
          type="text"
          placeholder={`@your${platform.toLowerCase()}handle`}
          className={`${inputClass} mt-2`}
          aria-label={WAITLIST.fields.handle}
        />
        {errors.platform_handle ? (
          <p className="mt-1 text-xs text-red-400">{errors.platform_handle}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="wl-language" className="mb-1.5 block text-sm text-slate/80">
          {WAITLIST.fields.language}
        </label>
        <select id="wl-language" name="primary_language" defaultValue="" className={inputClass}>
          <option value="" disabled>
            Choose a language
          </option>
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        {errors.primary_language ? (
          <p className="mt-1 text-xs text-red-400">{errors.primary_language}</p>
        ) : null}
      </div>

      {serverError ? <p className="text-sm text-red-400">{serverError}</p> : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-gold w-full rounded-full py-3.5 font-semibold transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {status === "submitting" ? "Joining…" : WAITLIST.button}
      </button>
      <p className="text-center text-xs text-slate/50">{WAITLIST.microcopy}</p>
    </form>
  );
}
