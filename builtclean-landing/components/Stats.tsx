const stats = [
  { value: "One AI coach", label: "that knows your body" },
  { value: "< 3 min", label: "from signup to first plan" },
  { value: "Every day", label: "a plan built for that day" },
  { value: "Free", label: "for founding members" },
];

export default function Stats() {
  return (
    <section
      className="w-full"
      style={{ borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", background: "#0a0a0a" }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-10 px-6 text-center"
              style={{
                borderRight: i < stats.length - 1 ? "1px solid #1a1a1a" : undefined,
              }}
            >
              <dt
                className="text-3xl sm:text-4xl font-extrabold text-white mb-1"
                style={{ letterSpacing: "-0.02em" }}
              >
                {stat.value}
              </dt>
              <dd className="text-xs uppercase tracking-widest" style={{ color: "#444" }}>
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
