import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy Policy | Ahmed Akram",
  description: "How ahmedakram.com and its Instagram and Facebook auto-replies handle your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <article>
          <header className="guide-hero">
            <p className="eyebrow">Legal / Privacy</p>
            <h1>Privacy Policy</h1>
            <p className="guide-lede">Last updated 15 November 2026.</p>
          </header>

          <div className="guide-body">
            <h2>Who this covers</h2>
            <p>
              This policy covers ahmedakram.com and the automatic replies sent from Ahmed Akram&apos;s
              own Instagram accounts and Facebook Pages. It does not cover Instagram or Facebook
              themselves; Meta&apos;s own privacy policy applies to your use of those apps.
            </p>

            <h2>What we receive</h2>
            <p>
              When you comment on one of our posts or send us a message, Meta passes us the comment
              or message text, its ID, and your Instagram or Facebook user ID and username. We use
              this only to recognise a keyword in your comment and to send you the link you asked for,
              by direct message and sometimes a short public reply to your comment.
            </p>

            <h2>What we keep</h2>
            <p>
              We do not store your comments, messages or profile data in a database. Our hosting
              provider keeps short-lived technical logs (the comment ID and whether a reply was
              sent) for troubleshooting, which expire automatically. We never sell or share your
              data, and we do not use it for advertising.
            </p>

            <h2>Website visits</h2>
            <p>
              The website uses privacy-friendly, cookie-free analytics to count page views. If you
              use the contact form, your name, email and message are sent to us by email so we can
              reply.
            </p>

            <h2 id="data-deletion">Deleting your data</h2>
            <p>
              To have any data about you removed, email{" "}
              <a href={`mailto:${site.email}?subject=Data%20deletion%20request`}>{site.email}</a> with
              the subject &quot;Data deletion request&quot; and your Instagram or Facebook username.
              We will delete anything we hold and confirm within 30 days. You can also delete your
              comment or the conversation in Instagram or Facebook at any time.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about this policy: <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
