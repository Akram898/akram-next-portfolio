import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Ahmed Akram — AI Solutions Engineer & Architect. Applied AI · Multi-Agent Systems · MLOps.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const node = (label: string, accent = false) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: accent ? "3px solid #e8a33d" : "2px solid rgba(242,241,237,0.18)",
      borderRadius: 10,
      color: accent ? "#f2f1ed" : "#8a8d93",
      fontSize: 20,
      padding: "10px 18px",
      background: "#121316",
      letterSpacing: 2,
    }}
  >
    {label}
  </div>
);

const wire = (
  <div style={{ display: "flex", width: 36, height: 2, background: "#e8a33d", opacity: 0.55 }} />
);

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0c0e",
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", color: "#e8a33d", fontSize: 24, letterSpacing: 4 }}>
            AHMED AKRAM · DUBAI
          </div>
          <div
            style={{
              display: "flex",
              color: "#f2f1ed",
              fontSize: 80,
              fontWeight: 700,
              marginTop: 16,
              letterSpacing: -2,
            }}
          >
            Applied AI, drawn to spec.
          </div>
          <div style={{ display: "flex", color: "#8a8d93", fontSize: 30, marginTop: 12 }}>
            AI Solutions Engineer & Architect — Multi-Agent Systems · MLOps
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          {node("GATEWAY")}
          {wire}
          {node("IDENTITY")}
          {wire}
          {node("PLANNER", true)}
          {wire}
          {node("AGENTS ×3")}
          {wire}
          {node("EVAL GATE")}
          {wire}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#ff5c38",
              color: "#0b0c0e",
              fontSize: 20,
              borderRadius: 10,
              padding: "12px 18px",
              letterSpacing: 2,
            }}
          >
            200 ▸
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(242,241,237,0.18)",
            paddingTop: 20,
            color: "#8a8d93",
            fontSize: 22,
            letterSpacing: 3,
          }}
        >
          <div style={{ display: "flex" }}>AHMEDAKRAM.COM</div>
          <div style={{ display: "flex" }}>//01 · CONTROL PLANE</div>
        </div>
      </div>
    ),
    size,
  );
}
