"use client";

import { motion } from "motion/react";

export default function Features() {
  return (
    <section
      id="features"
      className="py-24 md:py-32 px-6"
      style={{ background: "#0a0a0a" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#444" }}>
            What it does
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            Less app. More coach.
          </h2>
          <p className="text-base" style={{ color: "#666" }}>
            Every feature exists to remove a reason you&apos;d quit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Big tile — AI coach */}
          <BentoTile className="md:col-span-2 md:row-span-2 min-h-[420px]" delay={0}>
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#4ade80", boxShadow: "0 0 8px #4ade80" }}
                  />
                  <span className="text-xs uppercase tracking-widest" style={{ color: "#4ade80" }}>
                    Coach
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ letterSpacing: "-0.02em" }}>
                  An AI coach that<br />learns who you are.
                </h3>
                <p className="text-sm max-w-md" style={{ color: "#888" }}>
                  Not a chatbot. Not a template. A coach that remembers your last session,
                  your bad weeks, and your goals — and adjusts the plan in real time.
                </p>
              </div>

              {/* Mini chat preview */}
              <div className="mt-6 space-y-2">
                <ChatBubble role="user">I&apos;m tired today. Should I skip?</ChatBubble>
                <ChatBubble role="assistant">
                  Don&apos;t skip, swap. Let&apos;s do a 15-minute mobility flow instead.
                  Streak stays alive, body gets what it needs.
                </ChatBubble>
              </div>
            </div>
          </BentoTile>

          {/* Streaks */}
          <BentoTile className="min-h-[200px]" delay={0.1}>
            <h3 className="text-lg font-semibold text-white mb-2">Streaks that forgive</h3>
            <p className="text-sm mb-4" style={{ color: "#666" }}>
              Miss a day. Get a make-up workout. Keep the chain.
            </p>
            <div className="flex gap-1 mt-auto">
              {Array.from({ length: 21 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-8 rounded-sm"
                  style={{ background: i === 13 ? "#222" : i < 18 ? "#4ade80" : "#1a1a1a" }}
                />
              ))}
            </div>
          </BentoTile>

          {/* Meal plans */}
          <BentoTile className="min-h-[200px]" delay={0.2}>
            <h3 className="text-lg font-semibold text-white mb-2">Meals that match</h3>
            <p className="text-sm" style={{ color: "#666" }}>
              Synced to your training load. Today is push day — your protein target is up by 15g.
            </p>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-white">142g</span>
              <span className="text-xs" style={{ color: "#4ade80" }}>↑ 15g vs rest day</span>
            </div>
          </BentoTile>

          {/* Insights */}
          <BentoTile className="min-h-[200px]" delay={0.3}>
            <h3 className="text-lg font-semibold text-white mb-2">Weekly debrief</h3>
            <p className="text-sm mb-4" style={{ color: "#666" }}>
              Every Sunday, a short note from your coach. What worked, what didn&apos;t, what&apos;s next.
            </p>
            <div className="text-xs px-3 py-2 rounded-lg" style={{ background: "#161616", color: "#888" }}>
              &quot;You crushed it this week. Let&apos;s push the squat 5% next.&quot;
            </div>
          </BentoTile>

          {/* Adapt */}
          <BentoTile className="md:col-span-2 min-h-[200px]" delay={0.4}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 h-full">
              <div className="max-w-md">
                <h3 className="text-lg font-semibold text-white mb-2">Built around your life</h3>
                <p className="text-sm" style={{ color: "#666" }}>
                  Travelling? No equipment? Bad sleep? The plan flexes. The progress doesn&apos;t stop.
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {["Travel", "No gym", "Low energy", "30 min", "Sore"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1.5 rounded-full border"
                    style={{ borderColor: "#2a2a2a", color: "#aaa" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </BentoTile>
        </div>
      </div>
    </section>
  );
}

function BentoTile({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] }}
      className={`relative rounded-3xl p-7 md:p-8 group ${className}`}
      style={{
        background: "linear-gradient(180deg, #131313 0%, #0f0f0f 100%)",
        border: "1px solid #1e1e1e",
      }}
    >
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </motion.div>
  );
}

function ChatBubble({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm"
        style={{
          background: role === "user" ? "#ffffff" : "#1a1a1a",
          color: role === "user" ? "#0a0a0a" : "#ddd",
          borderRadius: role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
