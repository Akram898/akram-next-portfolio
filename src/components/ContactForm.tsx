"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

export default function ContactForm() {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
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
        message:
          "The form is unavailable at the moment. Please email me directly.",
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
          message:
            "Unable to send your message. Please try again or email me directly.",
        });
        return;
      }
      form.reset();
      setStatus({
        success: true,
        message: "Your message has been sent. Thank you for getting in touch.",
      });
    } catch {
      setStatus({
        success: false,
        message:
          "Unable to send your message right now. Please try again or email me directly.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="contact-form-panel">
      <h3>Tell me about your project</h3>
      <p className="contact-form-note">
        Share a little context and I&apos;ll reply by email. Prefer to write
        directly? <a href={`mailto:${site.email}`}>Email me</a>.
      </p>
      <noscript>
        <p>
          Please <a href={`mailto:${site.email}`}>email me directly</a> to
          discuss your project.
        </p>
        <style>{`.contact-form-panel form { display: none; }`}</style>
      </noscript>
      {!accessKey && (
        <p className="contact-form-unavailable">
          The form is unavailable at the moment. Please{" "}
          <a href={`mailto:${site.email}`}>email me directly</a>.
        </p>
      )}
      <form onSubmit={submit} aria-label="Project inquiry" aria-busy={pending}>
        <label htmlFor="contact-name">
          Your name
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
          Email address
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
          Your project
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            minLength={10}
            maxLength={5000}
            disabled={pending}
            placeholder="What are you building, and where do you need help?"
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
          {pending ? "Sending…" : "Send message"}
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
