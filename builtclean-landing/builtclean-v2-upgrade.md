# BUILTCLEAN — Landing Page v2: The Million Dollar Upgrade
# Feed this to Claude Code in VS Code

---

## CONTEXT

The current landing page is a solid v1 — clean monochrome design, good copy, dark theme. 
This upgrade transforms it into something that *feels* like a $1M product:
- Motion that earns attention (not flashy, deliberate)
- A live AI coach demo on the page (the actual product, working)
- Asymmetric bento layouts (Linear/Vercel-grade)
- Micro-interactions that reward curiosity
- Real numbers, real data, real polish

We are NOT rewriting from scratch. We are surgically upgrading the existing components.

---

## PHASE 0 — INSTALL THE TOOLBOX

```bash
npm install motion lenis @number-flow/react class-variance-authority \
  @anthropic-ai/sdk @vercel/analytics @vercel/speed-insights vaul
```

Why each:
- `motion` — successor to framer-motion, for all animations
- `lenis` — buttery smooth scroll (Apple/Linear use this exact lib)
- `@number-flow/react` — animated counter that handles digit transitions properly
- `class-variance-authority` — clean variant API for buttons/cards
- `@anthropic-ai/sdk` — for the live AI coach demo
- `@vercel/analytics` + `@vercel/speed-insights` — real-time visitor data
- `vaul` — Apple-style bottom sheet for mobile

---

## PHASE 1 — GLOBAL FOUNDATION

### 1.1 `app/globals.css` — add the missing layer

Add these on top of the current file. The existing tokens stay.

```css
@import "tailwindcss";

@theme inline {
  /* existing... */
  --color-bc-bg: #0a0a0a;
  --color-bc-surface: #111111;
  --color-bc-surface-2: #1a1a1a;
  --color-bc-border: #1a1a1a;
  --color-bc-border-card: #2a2a2a;
  --color-bc-text: #ffffff;
  --color-bc-muted: #666666;
  --color-bc-faint: #444444;
  --color-bc-green: #4ade80;

  /* NEW: subtle ramps for depth */
  --color-bc-elevated: #131313;
  --color-bc-glow: rgba(74, 222, 128, 0.08);
  --color-bc-accent-glow: rgba(255, 255, 255, 0.04);

  /* NEW: typography */
  --font-display: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', monospace;

  /* NEW: motion easing */
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  --ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);
}

/* Grain overlay — subtle film noise across the whole page */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 100;
  opacity: 0.025;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* Auto-hide scrollbar, keep functionality */
::-webkit-scrollbar { width: 0; background: transparent; }

/* Lenis smooth scroll */
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: hidden; }

/* Selection styling — already there, but more refined */
::selection {
  background: #ffffff;
  color: #0a0a0a;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

### 1.2 Create `app/providers.tsx` — smooth scroll + analytics

```tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => { lenis.destroy(); };
  }, []);

  return (
    <>
      {children}
      <Analytics />
      <SpeedInsights />
    </>
  );
}
```

Wrap `<Providers>` around `{children}` in `layout.tsx`.

---

## PHASE 2 — HERO REBUILD (the most important change)

Replace `components/Hero.tsx` with a hero that has:
- Animated aurora gradient behind the H1 (subtle, never distracting)
- Word-by-word text reveal on mount
- Live waitlist counter that ticks up
- A floating phone mockup on desktop showing the AI coach mid-conversation

```tsx
"use client";

import { motion } from "motion/react";
import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";
import WaitlistForm from "./WaitlistForm";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.19, 1, 0.22, 1] },
  }),
};

export default function Hero() {
  const [count, count] = useState(2847);

  // Live-feel: small jitter every 8–14s to make the counter feel alive
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
      {/* Aurora background — subtle moving gradient */}
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

      <style jsx>{`
        @keyframes aurora {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-45%, -55%) scale(1.15); }
        }
      `}</style>

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
```

---

## PHASE 3 — LIVE AI COACH DEMO (the killer feature)

Add a section right after the Hero where visitors can chat with the actual AI coach. 
This is the highest-converting element you can add — let people experience the product before signing up.

### 3.1 Create `app/api/demo/route.ts`

```tsx
import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

export const runtime = "edge";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

const SYSTEM = `You are the Built Clean AI coach — warm, direct, and built for consistency over perfection.

This is a public landing-page demo. The user is not logged in. Keep responses concise (2-4 sentences max).
Show off your coaching personality. Don't be generic. If they ask about workouts, give one. If they ask
about meals, give a real suggestion. If they ask about motivation, be honest, not corny.

Never break character. Never mention you're a demo or a language model. You are the Built Clean coach.

End every 3rd message with a gentle prompt to join the waitlist for the full experience.`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const stream = await anthropic.messages.stream({
    model: "claude-sonnet-4-20250514",
    max_tokens: 400,
    system: SYSTEM,
    messages,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
          controller.enqueue(encoder.encode(chunk.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
```

### 3.2 Create `components/LiveDemo.tsx`

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const SUGGESTIONS = [
  "Plan a 30-min workout I can do at home",
  "I missed 3 days. How do I get back on track?",
  "What should I eat after a heavy leg day?",
  "I have low energy today. Should I still train?",
];

type Msg = { role: "user" | "assistant"; content: string };

export default function LiveDemo() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content: "Hey — I'm your Built Clean coach. Ask me anything. Pick one below to start.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [remaining, setRemaining] = useState(5);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async (content: string) => {
    if (!content.trim() || loading || remaining === 0) return;
    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setRemaining((r) => r - 1);

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        body: JSON.stringify({ messages: next }),
      });
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value);
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative py-24 md:py-32 px-6"
      style={{ background: "#0a0a0a", borderTop: "1px solid #1a1a1a" }}
    >
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#444" }}>
            Try it live
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            Talk to your coach.
          </h2>
          <p className="text-base max-w-md mx-auto" style={{ color: "#666" }}>
            Five free messages. No signup. This is the real coach — same model, same brain.
          </p>
        </div>

        {/* Chat container */}
        <div
          className="rounded-3xl overflow-hidden flex flex-col"
          style={{ background: "#0f0f0f", border: "1px solid #1e1e1e", minHeight: "520px" }}
        >
          {/* Status bar */}
          <div
            className="px-5 py-3 flex items-center justify-between text-xs"
            style={{ borderBottom: "1px solid #1a1a1a" }}
          >
            <div className="flex items-center gap-2" style={{ color: "#666" }}>
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80" }}
              />
              Coach online
            </div>
            <span style={{ color: "#444" }}>
              {remaining} message{remaining !== 1 ? "s" : ""} left
            </span>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      m.role === "user" ? "rounded-br-md" : "rounded-bl-md"
                    }`}
                    style={{
                      background: m.role === "user" ? "#ffffff" : "#1a1a1a",
                      color: m.role === "user" ? "#0a0a0a" : "#e5e5e5",
                    }}
                  >
                    {m.content || (
                      <span className="inline-flex gap-1">
                        {[0, 1, 2].map((d) => (
                          <span
                            key={d}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              background: "#666",
                              animation: `pulse 1.4s ${d * 0.2}s infinite`,
                            }}
                          />
                        ))}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="px-5 pb-3 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs px-3 py-1.5 rounded-full border border-[#2a2a2a] text-[#aaa] hover:bg-[#1a1a1a] transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 flex gap-2" style={{ borderTop: "1px solid #1a1a1a" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder={remaining === 0 ? "Sign up to keep going..." : "Ask anything..."}
              disabled={remaining === 0}
              className="flex-1 h-11 px-4 rounded-full bg-[#161616] border border-[#262626] text-sm text-white placeholder-[#555] outline-none focus:border-[#444] disabled:opacity-50"
            />
            <button
              onClick={() => send(input)}
              disabled={loading || remaining === 0}
              className="h-11 px-5 rounded-full bg-white text-black text-sm font-semibold disabled:opacity-40 hover:bg-[#e5e5e5] transition-colors"
            >
              Send
            </button>
          </div>
        </div>

        {remaining === 0 && (
          <div className="mt-6 text-center">
            <a
              href="#waitlist"
              className="inline-block px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-[#e5e5e5] transition-colors"
            >
              Join waitlist for unlimited access →
            </a>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
```

Add `<LiveDemo />` to `app/page.tsx` right after `<Hero />`.

---

## PHASE 4 — BENTO FEATURES (replace the 2×2 grid)

Replace `components/Features.tsx`. The new bento layout has asymmetric tiles —
one large hero tile (the AI coach), two medium tiles (streaks + meals), two small tiles (insights + adapt).

```tsx
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
            Every feature exists to remove a reason you'd quit.
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
                  Don&apos;t skip — swap. Let&apos;s do a 15-minute mobility flow instead.
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
      transition={{ duration: 0.7, delay, ease: [0.19, 1, 0.22, 1] }}
      className={`relative rounded-3xl p-7 md:p-8 group ${className}`}
      style={{
        background: "linear-gradient(180deg, #131313 0%, #0f0f0f 100%)",
        border: "1px solid #1e1e1e",
      }}
    >
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.03), transparent 40%)",
        }}
      />
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
```

---

## PHASE 5 — SECTIONS TO ADD

### 5.1 Comparison table — `components/Comparison.tsx`

A short, brutal table showing BUILTCLEAN vs "everyone else." Place between Features and HowItWorks.

```tsx
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
                {row.others ? <Mark check /> : <Mark />}
              </span>
              <span className="text-center">
                {row.bc ? <Mark check /> : <Mark />}
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
```

### 5.2 FAQ accordion — `components/FAQ.tsx`

Place between Testimonials and CtaSection. Six short, direct Q&As.

```tsx
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
                    transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
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
```

### 5.3 Marquee — `components/Marquee.tsx`

A subtle moving ticker. Place between Hero and Stats. Builds credibility through repetition.

```tsx
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
      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
```

---

## PHASE 6 — STATS UPGRADE

Replace `Stats.tsx` to use NumberFlow for animated numbers and add hover state.

```tsx
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
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
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
```

---

## PHASE 7 — NEW PAGE ORDER

Update `app/page.tsx`:

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import LiveDemo from "@/components/LiveDemo";
import Features from "@/components/Features";
import Comparison from "@/components/Comparison";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      <Navbar />
      <Hero />
      <Marquee />
      <Stats />
      <LiveDemo />
      <Features />
      <Comparison />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CtaSection />
      <Footer />
    </main>
  );
}
```

Story flow: hook → tease → prove → let them try → show → compare → explain → social proof → answer doubts → close.

---

## PHASE 8 — POLISH PASS

### 8.1 Navbar — add scroll behaviour

Update `Navbar.tsx` so it gets a backdrop blur + shrinks on scroll:

```tsx
// Add to top of component
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 20);
  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, []);

// Update header style:
style={{
  background: scrolled ? "rgba(10,10,10,0.7)" : "transparent",
  backdropFilter: scrolled ? "blur(12px)" : "none",
  borderBottom: scrolled ? "1px solid #1a1a1a" : "1px solid transparent",
  transition: "all 0.3s ease",
}}
```

### 8.2 Magnetic CTA button

Wrap any primary CTA button in this for subtle magnetic hover:

```tsx
// components/MagneticButton.tsx
"use client";
import { useRef, useState } from "react";
import { motion } from "motion/react";

export function MagneticButton({ children, className = "", ...props }: any) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.2;
    const y = (clientY - (top + height / 2)) * 0.2;
    setPos({ x, y });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}
```

### 8.3 Page transitions

Add to `app/layout.tsx` for view transitions:

```tsx
// In <html> tag
<html lang="en" className="h-full" style={{ viewTransitionName: "root" }}>
```

### 8.4 OG image

Generate dynamic OG: create `app/opengraph-image.tsx`:

```tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Built Clean — AI Fitness Coach";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div style={{ color: "#666", fontSize: 24, letterSpacing: "0.2em", marginBottom: 40 }}>
          BUILTCLEAN
        </div>
        <div style={{ color: "#fff", fontSize: 110, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.03em" }}>
          Fitness that keeps
        </div>
        <div style={{ color: "#666", fontSize: 110, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.03em" }}>
          you coming back.
        </div>
        <div style={{ color: "#888", fontSize: 32, marginTop: 60 }}>
          The AI coach built for consistency.
        </div>
      </div>
    ),
    size
  );
}
```

---

## PHASE 9 — DON'T SKIP THESE

Once everything's built:

1. Run `npm run build` and fix every warning, not just errors
2. Test on a real phone (iOS Safari + Android Chrome)
3. Run Lighthouse — aim for 95+ across the board
4. Check `prefers-reduced-motion` — animations should disable cleanly
5. Test the live demo with rate limiting in mind (add IP-based limiting later)
6. Add a `robots.txt` and `sitemap.ts`
7. Set up Vercel Analytics + Speed Insights dashboards
8. Hook up Plausible or Fathom for privacy-friendly analytics

---

## INSTRUCTION TO CLAUDE CODE

You are upgrading an existing landing page. Read the current code in:
- app/page.tsx
- app/layout.tsx
- app/globals.css
- components/*.tsx

Then implement this upgrade in 9 phases. After each phase:
1. Run `npm run build`
2. Show me the diff
3. Wait for approval before continuing

DO NOT rewrite existing code that's already good — only enhance.
DO NOT break the existing visual language (monochrome dark, no color accents except green).
KEEP all existing copy unless explicitly told to change it.

Start with Phase 0 (install dependencies) right now.
