import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="section not-found">
        <p className="eyebrow">404 / Page not found</p>
        <h1>This route ends here.</h1>
        <p>The page may have moved. Explore the portfolio or find a practical guide.</p>
        <div className="hero-actions">
          <Link href="/" className="hero-pill hero-pill-solid">Back to home</Link>
          <Link href="/guides" className="hero-pill hero-pill-ghost">Browse guides</Link>
        </div>
      </main>
    </>
  );
}
