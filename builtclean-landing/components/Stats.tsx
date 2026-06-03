"use client";

import { motion } from "motion/react";
import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";

const stats = [
  { value: "AI", suffix: "-first", label: "Built around your coach" },
  { value: 3, suffix: " min", label: "From signup to first plan" },
  { value: 24, suffix: "/7", label: "Coach always on" },
  { value: 0, prefix: "$", label: "For founding members" },
];

export default function Stats() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="w-full"
      style={{ borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", background: "#0a0a0a" }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] }}
              className="flex flex-col items-center justify-center py-12 px-6 text-center group cursor-default"
              style={{ borderRight: i < stats.length - 1 ? "1px solid #1a1a1a" : undefined }}
            >
              <dt className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 transition-transform group-hover:scale-105 duration-300" style={{ letterSpacing: "-0.03em" }}>
                {stat.prefix}
                {typeof stat.value === "number" && visible ? (
                  <NumberFlow value={stat.value} />
                ) : (
                  stat.value
                )}
                {stat.suffix}
              </dt>
              <dd className="text-xs uppercase tracking-[0.15em]" style={{ color: "#444" }}>
                {stat.label}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
