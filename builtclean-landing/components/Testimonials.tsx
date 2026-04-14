const testimonials = [
  {
    quote:
      "I've tried every fitness app. The problem was always me — I'd miss a few days and just give up. BUILTCLEAN is the first one that actually adjusts when life gets in the way instead of making me feel like a failure.",
    name: "Dhruv B.",
    role: "Early beta tester",
    initials: "DB",
  },
  {
    quote:
      "I didn't expect the meal planning to be this good. It's not just macro targets — it actually suggests meals I'd eat and shifts around my training days. Finally feels like it was built for a real person.",
    name: "Varun S.",
    role: "Waitlist member",
    initials: "VS",
  },
  {
    quote:
      "Most fitness apps feel like they were designed to make you feel guilty. This one feels like it's actually in your corner. It's a small difference but it changes everything about whether you keep showing up.",
    name: "Darpan S.",
    role: "Early beta tester",
    initials: "DS",
  },
];

export default function Testimonials() {
  return (
    <section
      id="about"
      className="py-20 md:py-28 px-6"
      style={{ background: "#0a0a0a" }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#444" }}>
            Early feedback
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white"
            style={{ letterSpacing: "-0.02em" }}
          >
            People are excited.
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl p-7 flex flex-col gap-5"
              style={{ background: "#111", border: "1px solid #1e1e1e" }}
            >
              {/* Quote mark */}
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
                <path
                  d="M0 14V8.4C0 3.733 2.267 1.067 6.8 0l1 1.6C5.267 2.267 4.133 3.6 3.8 5.6H7V14H0zm11 0V8.4C11 3.733 13.267 1.067 17.8 0l1 1.6c-2.533.667-3.667 2-4 4H18V14h-7z"
                  fill="#333"
                />
              </svg>

              <p className="text-sm leading-relaxed flex-1" style={{ color: "#888" }}>
                {t.quote}
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0"
                  style={{ background: "#2a2a2a" }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-tight">{t.name}</p>
                  <p className="text-xs leading-tight" style={{ color: "#444" }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
