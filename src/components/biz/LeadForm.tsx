"use client";

import { useState, type FormEvent } from "react";
import type { Copy } from "@/lib/site-content";
import { site, whatsappLink } from "@/lib/site";
import { MailIcon, WhatsAppIcon } from "./icons";

type Props = {
  form: Copy["contact"]["form"];
  needs: string[];
  /** Public Web3Forms key, read on the server. Without it the form hands off to WhatsApp or email. */
  formKey?: string;
};

export default function LeadForm({ form, needs, formKey }: Props) {
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, setPending] = useState(false);

  function compose(el: HTMLFormElement) {
    const data = new FormData(el);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const picked = data.getAll("needs").map(String);
    const name = get("name");
    const reach = get("reach");
    if (!name || !reach) return null;
    const lines = [
      form.whatsappIntro,
      `${form.name}: ${name}`,
      get("business") && `${form.business}: ${get("business")}`,
      picked.length > 0 && `${form.needs} ${picked.join(", ")}`,
      get("message") && `${form.message} ${get("message")}`,
      `${form.reach}: ${reach}`,
    ].filter(Boolean);
    return { name, reach, picked, text: lines.join("\n"), business: get("business"), message: get("message") };
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const el = event.currentTarget;
    const via = ((event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value ?? "whatsapp";
    const msg = compose(el);
    if (!msg) {
      setStatus({ ok: false, text: form.missing });
      return;
    }
    setStatus(null);

    if (via === "whatsapp") {
      window.open(whatsappLink(msg.text), "_blank", "noopener");
      return;
    }
    if (via === "email") {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(form.emailSubject)}&body=${encodeURIComponent(msg.text)}`;
      return;
    }

    if (!formKey) return;
    setPending(true);
    try {
      const body = new FormData();
      body.set("access_key", formKey);
      body.set("subject", `New business inquiry: ${msg.name}`);
      body.set("from_name", "ahmedakram.com");
      body.set("name", msg.name);
      body.set("contact", msg.reach);
      body.set("message", msg.text);
      if (/@/.test(msg.reach)) body.set("email", msg.reach);
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body,
        signal: AbortSignal.timeout(15_000),
      });
      const data = await res.json();
      if (!res.ok || data.success !== true) throw new Error("send failed");
      el.reset();
      setStatus({ ok: true, text: form.sent });
    } catch {
      setStatus({ ok: false, text: form.failed });
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="lead" onSubmit={submit} aria-busy={pending}>
      <h3>{form.title}</h3>
      <div className="lead-grid">
        <label>
          {form.name}
          <input name="name" autoComplete="name" required maxLength={100} />
        </label>
        <label>
          {form.reach}
          <input name="reach" autoComplete="tel" required maxLength={120} placeholder={form.reachPlaceholder} />
        </label>
        <label className="lead-wide">
          {form.business}
          <input name="business" autoComplete="organization" maxLength={160} placeholder={form.businessPlaceholder} />
        </label>
      </div>
      <fieldset className="lead-needs">
        <legend>{form.needs}</legend>
        {needs.map((need) => (
          <label key={need} className="lead-chip">
            <input type="checkbox" name="needs" value={need} />
            <span>{need}</span>
          </label>
        ))}
      </fieldset>
      <label className="lead-wide">
        {form.message}
        <textarea name="message" rows={3} maxLength={2000} placeholder={form.messagePlaceholder} />
      </label>
      <div className="lead-actions">
        {formKey ? (
          <>
            <button type="submit" value="web" className="btn btn-accent" disabled={pending}>
              {pending ? form.sending : form.send}
            </button>
            <button type="submit" value="whatsapp" className="btn btn-ghost" disabled={pending}>
              <WhatsAppIcon className="ax-ico" />{form.sendWhatsapp}
            </button>
          </>
        ) : (
          <>
            <button type="submit" value="whatsapp" className="btn btn-wa">
              <WhatsAppIcon className="ax-ico" />{form.sendWhatsapp}
            </button>
            <button type="submit" value="email" className="btn btn-ghost">
              <MailIcon className="ax-ico" />{form.sendEmail}
            </button>
          </>
        )}
      </div>
      <p className={`lead-status${status ? (status.ok ? " is-ok" : " is-error") : ""}`} role="status">
        {status?.text}
      </p>
    </form>
  );
}
