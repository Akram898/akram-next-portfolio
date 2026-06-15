"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    setStatusMessage("Sending your message...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: new FormData(form),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to send your message.");
      }

      form.reset();
      setStatus("success");
      setStatusMessage("Message sent. I will get back to you soon.");
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error ? error.message : "Unable to send your message.",
      );
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="contact-heading">
        <p className="eyebrow">Available for ambitious systems</p>
        <h2>Bring the hard problem.</h2>
      </div>

      <div className="contact-direct">
        <p>Direct contact</p>
        <a href={`mailto:${site.email}`}>
          <span>Email</span>
          <strong>{site.email}</strong>
        </a>
        <a href={site.phoneHref}>
          <span>Mobile</span>
          <strong>{site.phone}</strong>
        </a>
      </div>

      <details className="contact-form-panel">
        <summary>
          <span>
            <small>Prefer a little context?</small>
            <strong>Open contact form</strong>
          </span>
          <i aria-hidden>+</i>
        </summary>
        <form onSubmit={handleSubmit}>
          <input
            className="contact-botcheck"
            type="checkbox"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
          />
          <label>
            Name
            <input name="name" autoComplete="name" disabled={status === "sending"} required />
          </label>
          <label>
            Email
            <input name="email" type="email" autoComplete="email" disabled={status === "sending"} required />
          </label>
          <label className="contact-message">
            What are you building?
            <textarea name="message" rows={5} disabled={status === "sending"} required />
          </label>
          <button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send message"}
            <svg aria-hidden viewBox="0 0 24 24">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </button>
          <p className={`contact-form-status contact-form-status-${status}`} aria-live="polite">
            {statusMessage}
          </p>
        </form>
      </details>

      <div className="contact-meta">
        <p>{site.location}<br />{site.timezone}</p>
        <p><a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><br /><a href={site.github} target="_blank" rel="noreferrer">GitHub ↗</a></p>
        <p>AI systems.<br />Enterprise discipline.</p>
      </div>
    </section>
  );
}
