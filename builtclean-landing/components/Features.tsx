const features = [
  {
    title: "AI Workout Coach",
    description:
      "Adaptive programs that evolve with your schedule, energy, and goals — not a static 12-week plan you'll abandon by week 3.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M2 8h2M12 8h2M4.5 4.5l1.5 1.5M10 4.5L8.5 6M8 2v2M4.5 11.5l1.5-1.5M10 11.5L8.5 10M8 14v-2"
          stroke="white"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <circle cx="8" cy="8" r="2" stroke="white" strokeWidth="1.25" />
      </svg>
    ),
  },
  {
    title: "Habit & Streak Engine",
    description:
      "Smart nudges at the right moment. Daily streaks that reward showing up — even when the workout is short.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M8 2l1.5 3 3.5.5-2.5 2.5.6 3.5L8 10l-3.1 1.5.6-3.5L3 5.5l3.5-.5L8 2z"
          stroke="white"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Personalized Meal Plans",
    description:
      "Nutrition synced to your training load. Real foods, flexible macros, and zero calorie-counting guilt.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M5 2v5a3 3 0 006 0V2"
          stroke="white"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path d="M8 9v5M6 14h4" stroke="white" strokeWidth="1.25" strokeLinecap="round" />
        <path d="M11 2v3" stroke="white" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Progress Insights",
    description:
      "Visual trends and weekly AI summaries that show what's actually working — not just raw numbers.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M2 12l3.5-4 3 2.5 2-3.5L14 4"
          stroke="white"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="2" y="12" width="12" height="1" rx="0.5" fill="white" fillOpacity="0.2" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-20 md:py-28 px-6"
      style={{ background: "#0a0a0a" }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#444" }}>
            Features
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white"
            style={{ letterSpacing: "-0.02em" }}
          >
            Everything your coach<br className="hidden sm:block" /> should be.
          </h2>
        </div>

        {/* 2×2 feature grid */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid #1a1a1a" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {features.map((feature, i) => {
              const isLastRow = i >= 2;
              const isRightCol = i % 2 === 1;
              return (
                <div
                  key={feature.title}
                  className="p-8 md:p-10"
                  style={{
                    borderBottom: !isLastRow ? "1px solid #1a1a1a" : undefined,
                    borderRight: !isRightCol ? "1px solid #1a1a1a" : undefined,
                  }}
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-base font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
