import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "Ahmed Akram: portfolio and services. Websites, ads, AI and automation for businesses.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* The card shown when the link is shared on WhatsApp, LinkedIn or Facebook.
   It mirrors the home page: two halves, the person in the seam. */
export default async function OG() {
  const [street, face] = await Promise.all([
    readFile(path.join(process.cwd(), "public/media/hero-night-street.jpg")),
    readFile(path.join(process.cwd(), "src/assets/portrait.jpg")),
  ]);
  const bg = `data:image/jpeg;base64,${street.toString("base64")}`;
  const portrait = `data:image/jpeg;base64,${face.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#070a12" }}>
        <div style={{ width: 600, height: 630, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 56, background: "linear-gradient(160deg, #101a3a 0%, #070a12 75%)" }}>
          <div style={{ display: "flex", color: "#f3f1ec", fontSize: 92, fontWeight: 800, letterSpacing: -4 }}>Portfolio</div>
          <div style={{ display: "flex", color: "#9fb1ff", fontSize: 28, marginTop: 8 }}>AI systems and shipped work</div>
        </div>
        <div style={{ width: 600, height: 630, display: "flex", position: "relative", flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end", padding: 56, background: "#140d07" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={bg} alt="" width={600} height={630} style={{ position: "absolute", top: 0, left: 0, width: 600, height: 630, objectFit: "cover", opacity: 0.45 }} />
          <div style={{ position: "absolute", top: 0, left: 0, width: 600, height: 630, display: "flex", background: "linear-gradient(0deg, rgba(20,13,7,0.95) 10%, rgba(20,13,7,0.2) 80%)" }} />
          <div style={{ display: "flex", position: "relative", color: "#f3f1ec", fontSize: 92, fontWeight: 800, letterSpacing: -4 }}>Services</div>
          <div style={{ display: "flex", position: "relative", color: "#ffc46b", fontSize: 28, marginTop: 8 }}>Websites, ads, AI, automation</div>
        </div>
        <div style={{ position: "absolute", left: 600, top: 0, width: 1, height: 630, display: "flex", background: "rgba(255,255,255,0.35)" }} />
        <div style={{ position: "absolute", left: 480, top: 70, width: 240, display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={portrait} alt="" width={150} height={150} style={{ width: 150, height: 150, borderRadius: 999, objectFit: "cover", border: "4px solid #f3f1ec" }} />
          <div style={{ display: "flex", marginTop: 16, color: "#f3f1ec", fontSize: 30, fontWeight: 700, background: "rgba(7,10,18,0.8)", padding: "6px 18px", borderRadius: 999 }}>Ahmed Akram</div>
        </div>
      </div>
    ),
    size,
  );
}
