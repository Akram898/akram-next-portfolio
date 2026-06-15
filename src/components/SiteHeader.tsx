import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Ahmed Akram, home">
        <span>AA</span>
        <b>Ahmed Akram</b>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/">Home</Link>
        <Link href="/architecture">Architecture</Link>
        <Link href="/lab">Lab</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact">Contact</Link>
      </nav>
      <Link className="header-contact" href="/#contact">
        Let&apos;s talk <span aria-hidden>↓</span>
      </Link>
    </header>
  );
}
