import { site } from "@/lib/site";
import ContactForm from "@/components/ContactForm";

export default function ContactSection() {
  return (
    <section className="contact" id="contact">
      <div className="contact-heading">
        <p className="eyebrow">Available for ambitious systems</p>
        <h2>Bring the hard problem.</h2>
        <p className="contact-intro">Tell me what you&apos;re building, what&apos;s getting in the way, and your timeline. We can start with an AI architecture review, an automation workflow, or a production system.</p>
      </div>

      <div className="contact-direct">
        <p>Start a conversation</p>
        <a href={`mailto:${site.email}?subject=Project%20inquiry&body=What%20I%27m%20building%3A%0A%0AThe%20challenge%3A%0A%0ATimeline%3A%0A`}>
          <span>Email about your project ↗</span>
          <strong>{site.email}</strong>
        </a>
        <a href={site.phoneHref}>
          <span>Mobile</span>
          <strong>{site.phone}</strong>
        </a>
      </div>

      <ContactForm />

      <div className="contact-meta">
        <p>{site.location}<br />{site.timezone}</p>
        <p><a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><br /><a href={site.github} target="_blank" rel="noreferrer">GitHub ↗</a></p>
        <p>AI systems.<br />Enterprise discipline.</p>
      </div>
    </section>
  );
}
