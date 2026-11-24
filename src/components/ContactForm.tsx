"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import type { PortfolioCopy } from "@/lib/portfolio-content";

export default function ContactForm({
  t,
  accessKey,
}: {
  t: PortfolioCopy["contact"]["form"];
  /** Web3Forms key, passed down from the server component. */
  accessKey?: string;
}) {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const body = new FormData(form);
    if (!accessKey) {
      setStatus({
        success: false,
        message: `${t.unavailable} ${t.unavailableLink}.`,
      });
      return;
    }
    body.set("access_key", accessKey);
    body.set("subject", "New portfolio inquiry from ahmedakram.com");
    body.set("from_name", "Ahmed Akram Portfolio");
    setPending(true);
    setStatus(null);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body,
        signal: AbortSignal.timeout(15_000),
      });
      const data = await response.json();
      if (!response.ok || data.success !== true) {
        setStatus({
          success: false,
          message: t.failed,
        });
        return;
      }
      form.reset();
      setStatus({
        success: true,
        message: t.sent,
      });
    } catch {
      setStatus({
        success: false,
        message: t.offline,
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="contact-form-panel">
      <h3>{t.title}</h3>
      <p className="contact-form-note">
        {t.note} <a href={`mailto:${site.email}`}>{t.noteLink}</a>.
      </p>
      <noscript>
        <p>
          <a href={`mailto:${site.email}`}>{t.noscript}</a>
        </p>
        <style>{`.contact-form-panel form { display: none; }`}</style>
      </noscript>
      {!accessKey && (
        <p className="contact-form-unavailable">
          {t.unavailable}{" "}
          <a href={`mailto:${site.email}`}>{t.unavailableLink}</a>.
        </p>
      )}
      <form onSubmit={submit} aria-label={t.aria} aria-busy={pending}>
        <label htmlFor="contact-name">
          {t.name}
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            disabled={pending}
          />
        </label>
        <label htmlFor="contact-email">
          {t.email}
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            disabled={pending}
          />
        </label>
        <label className="contact-message" htmlFor="contact-message">
          {t.project}
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            minLength={10}
            maxLength={5000}
            disabled={pending}
            placeholder={t.placeholder}
          />
        </label>
        <div className="contact-botcheck" aria-hidden>
          <label htmlFor="contact-website">Leave this field empty</label>
          <input
            id="contact-website"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <button type="submit" disabled={pending || !accessKey}>
          {pending ? t.sending : t.send}
          <span aria-hidden>↗</span>
        </button>
        <p
          className={`contact-form-status${status ? ` contact-form-status-${status.success ? "success" : "error"}` : ""}`}
          role={status && !status.success ? "alert" : "status"}
        >
          {status?.message}
        </p>
      </form>
    </div>
  );
}
