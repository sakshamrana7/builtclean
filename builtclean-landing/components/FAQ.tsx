"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const faqs = [
  {
    q: "When does it launch?",
    a: "We're rolling out to founding members in waves starting Q1 2026. Joining the waitlist locks in early access + free forever pricing.",
  },
  {
    q: "How is this different from a fitness app with AI features?",
    a: "Most apps bolt AI onto a static template. Built Clean is built around the AI — your coach is the product. Plans regenerate daily based on your data, your feedback, and your life.",
  },
  {
    q: "Do I need equipment or a gym?",
    a: "No. The coach designs around whatever you have — full gym, dumbbells at home, or just bodyweight in a hotel room.",
  },
  {
    q: "Will it actually keep me consistent?",
    a: "Honestly? You still have to show up. But every design decision — forgiving streaks, adaptive plans, gentle nudges — is built to reduce the cost of restarting.",
  },
  {
    q: "What does it cost?",
    a: "Free forever for founding members on the waitlist. Pro plan at $12/month for everyone after launch.",
  },
  {
    q: "Is my data private?",
    a: "Yes. Your data trains your coach, not someone else's. We never sell data. End-to-end encrypted, GDPR-compliant.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32 px-6" style={{ background: "#0a0a0a", borderTop: "1px solid #1a1a1a" }}>
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-12 text-center" style={{ letterSpacing: "-0.02em" }}>
          Common questions.
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden"
              style={{ background: "#0f0f0f", border: "1px solid #1a1a1a" }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#131313] transition-colors"
              >
                <span className="text-base font-medium text-white pr-4">{faq.q}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  className="flex-shrink-0 transition-transform duration-300"
                  style={{ transform: open === i ? "rotate(45deg)" : "rotate(0)" }}
                >
                  <path d="M7 2v10M2 7h10" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "#888" }}>
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
