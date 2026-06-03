"use client";

import { motion, type Variants } from "motion/react";
import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";
import WaitlistForm from "./WaitlistForm";

const EASE = [0.19, 1, 0.22, 1] as [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: EASE },
  }),
};

export default function Hero() {
  const [count, setCount] = useState(2847);

  useEffect(() => {
    const tick = () => {
      setCount((c) => c + Math.floor(Math.random() * 3) + 1);
    };
    const interval = setInterval(tick, 8000 + Math.random() * 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="waitlist"
      className="relative overflow-hidden flex flex-col items-center text-center px-6 pt-32 pb-24 md:pt-40 md:pb-32"
      style={{ background: "#0a0a0a" }}
    >
      {/* Aurora background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-40 blur-[120px]"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
            animation: "aurora 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute left-[20%] top-[60%] w-[400px] h-[400px] rounded-full opacity-30 blur-[100px]"
          style={{
            background: "radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)",
            animation: "aurora 25s ease-in-out infinite reverse",
          }}
        />
      </div>

      <div className="relative w-full max-w-[920px] flex flex-col items-center gap-8">
        {/* Live early access badge */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs text-[#aaa] border border-[#222]"
          style={{ background: "rgba(20,20,20,0.6)", backdropFilter: "blur(8px)" }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ background: "#4ade80", animation: "ping 2s infinite" }}
            />
            <span
              className="relative inline-flex rounded-full h-1.5 w-1.5"
              style={{ background: "#4ade80" }}
            />
          </span>
          <NumberFlow value={count} format={{ useGrouping: true }} /> on the waitlist
        </motion.div>

        {/* H1 — word-by-word reveal */}
        <h1
          className="text-[clamp(2.5rem,7vw,6rem)] font-extrabold leading-[1.02] tracking-tight"
          style={{ letterSpacing: "-0.04em" }}
        >
          {["Fitness", "that", "keeps"].map((word, i) => (
            <motion.span
              key={word}
              custom={i + 1}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="inline-block mr-[0.25em] text-white"
            >
              {word}
            </motion.span>
          ))}
          <br />
          {["you", "coming", "back."].map((word, i) => (
            <motion.span
              key={word}
              custom={i + 4}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="inline-block mr-[0.25em]"
              style={{ color: "#666" }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtext */}
        <motion.p
          custom={7}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-base sm:text-lg leading-relaxed max-w-xl"
          style={{ color: "#888" }}
        >
          An AI coach that adapts to your life, not the other way around. Built for
          consistency. Trained for results.
        </motion.p>

        {/* Form */}
        <motion.div
          custom={8}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="w-full max-w-md"
        >
          <WaitlistForm buttonText="Claim early access" />
        </motion.div>

        {/* Microcopy */}
        <motion.p
          custom={9}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-xs"
          style={{ color: "#444" }}
        >
          Free forever for founding members · No credit card · No spam
        </motion.p>
      </div>
    </section>
  );
}
