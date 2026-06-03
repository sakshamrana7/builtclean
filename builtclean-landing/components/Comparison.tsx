const rows = [
  { feature: "Adapts to your week", others: false, bc: true },
  { feature: "Forgives missed days", others: false, bc: true },
  { feature: "Real conversation with coach", others: false, bc: true },
  { feature: "Meal plans synced to training", others: false, bc: true },
  { feature: "Generic 12-week plans", others: true, bc: false },
  { feature: "Guilt-trips when you skip", others: true, bc: false },
];

export default function Comparison() {
  return (
    <section className="py-24 md:py-32 px-6" style={{ background: "#0a0a0a", borderTop: "1px solid #1a1a1a" }}>
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-12" style={{ letterSpacing: "-0.02em" }}>
          Not another fitness app.
        </h2>
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #1a1a1a" }}>
          <div className="grid grid-cols-3 px-6 py-4 text-xs uppercase tracking-widest" style={{ background: "#111", color: "#666" }}>
            <span></span>
            <span className="text-center">Most apps</span>
            <span className="text-center text-white">BUILTCLEAN</span>
          </div>
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className="grid grid-cols-3 px-6 py-4 items-center"
              style={{ borderTop: i > 0 ? "1px solid #1a1a1a" : undefined, background: "#0a0a0a" }}
            >
              <span className="text-sm" style={{ color: "#aaa" }}>{row.feature}</span>
              <span className="text-center">
                <Mark check={row.others} />
              </span>
              <span className="text-center">
                <Mark check={row.bc} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Mark({ check = false }: { check?: boolean }) {
  if (check) {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" className="mx-auto">
        <circle cx="10" cy="10" r="9" fill="#4ade80" fillOpacity="0.15" />
        <path d="M6 10l3 3 5-5" stroke="#4ade80" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" className="mx-auto">
      <circle cx="10" cy="10" r="9" stroke="#2a2a2a" strokeWidth="1" fill="none" />
      <path d="M7 7l6 6M13 7l-6 6" stroke="#444" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}
