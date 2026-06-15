const items = [
  { label: "Claude", tone: "sand" },
  { label: "GPT", tone: "chalk" },
  { label: "Gemini", tone: "violet" },
  { label: "MCP", tone: "blue" },
  { label: "RAG", tone: "cyan" },
  { label: "AWS", tone: "gold" },
  { label: "Docker", tone: "blue" },
  { label: "Kubernetes", tone: "cyan" },
  { label: "n8n", tone: "magenta" },
  { label: "TypeScript", tone: "blue" },
  { label: "Python", tone: "gold" },
  { label: "CI/CD", tone: "pulse" },
];

function Row() {
  return (
    <>
      {items.map((item) => (
        <span key={item.label} className={`marquee-item marquee-${item.tone}`}>
          {item.label}
          <i aria-hidden>✦</i>
        </span>
      ))}
    </>
  );
}

export default function TechMarquee({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className={`tech-marquee${reverse ? " marquee-reverse" : ""}`} aria-hidden>
      <div className="marquee-track">
        <Row />
        <Row />
        <Row />
      </div>
    </div>
  );
}
