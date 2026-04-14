const steps = [
  {
    number: "01",
    title: "Tell us about yourself",
    description:
      "Answer a few quick questions about your goals, schedule, and fitness history. No lengthy onboarding — just what matters.",
  },
  {
    number: "02",
    title: "Get your first plan",
    description:
      "Your AI coach builds a personalized workout and nutrition plan in seconds, calibrated to your real life.",
  },
  {
    number: "03",
    title: "Show up daily",
    description:
      "Check in each day. Log workouts, meals, or just your mood. The coach adapts in real time.",
  },
  {
    number: "04",
    title: "Watch habits form",
    description:
      "After 30 days you'll see the data — and feel the difference. Consistency compounds.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 md:py-28 px-6"
      style={{
        background: "#0a0a0a",
        borderTop: "1px solid #1a1a1a",
        borderBottom: "1px solid #1a1a1a",
      }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#444" }}>
            How it works
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white"
            style={{ letterSpacing: "-0.02em" }}
          >
            Three steps to<br className="hidden sm:block" /> built clean.
          </h2>
        </div>

        {/* Steps row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="flex flex-col gap-4 lg:pr-10"
              style={{
                borderRight: i < steps.length - 1 ? "1px solid #1a1a1a" : undefined,
                paddingLeft: i > 0 ? undefined : undefined,
              }}
            >
              <div className="lg:px-8" style={{ paddingLeft: i > 0 ? "2rem" : undefined }}>
                <span
                  className="text-xs font-mono font-semibold block mb-3"
                  style={{ color: "#333" }}
                >
                  {step.number}
                </span>
                <h3 className="text-base font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
