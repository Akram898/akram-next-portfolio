"use client";

import { site } from "@/lib/site";

export default function ContactSection() {
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

      <div className="contact-meta">
        <p>{site.location}<br />{site.timezone}</p>
        <p><a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><br /><a href={site.github} target="_blank" rel="noreferrer">GitHub ↗</a></p>
        <p>AI systems.<br />Enterprise discipline.</p>
      </div>
    </section>
  );
}
