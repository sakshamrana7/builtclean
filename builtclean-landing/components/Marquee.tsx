const items = [
  "Adapts daily",
  "No guilt",
  "Real coaching",
  "Trained on sports science",
  "Built for consistency",
  "Built for real life",
];

export default function Marquee() {
  return (
    <div
      className="overflow-hidden py-6"
      style={{ borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", background: "#0a0a0a" }}
    >
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="text-sm flex items-center gap-12" style={{ color: "#444" }}>
            {item}
            <span style={{ color: "#222" }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
