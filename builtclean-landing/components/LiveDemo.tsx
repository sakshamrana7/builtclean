// components/LiveDemo.tsx
// Public-facing demo with full polish: markdown, action chips, word streaming, cursor blink.
// Requires: npm install react-markdown remark-gfm @marsidev/react-turnstile

"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Plan a 30-min workout I can do at home",
  "I missed 3 days. How do I get back on track?",
  "What should I eat after a heavy leg day?",
  "I have low energy today. Should I still train?",
];

const INITIAL_MESSAGE: Msg = {
  role: "assistant",
  content: "Hey, I'm your coach. Workouts, meals, or those days when motivation just isn't there — I've got you. You've got 5 free messages to start. What's going on?",
};

// === Parse <actions>[...]</actions> tag out of message ===
function parseMessage(raw: string): { text: string; actions: string[] } {
  const match = raw.match(/<actions>([\s\S]*?)<\/actions>/);
  if (!match) return { text: raw.trim(), actions: [] };
  let actions: string[] = [];
  try {
    const parsed = JSON.parse(match[1]);
    if (Array.isArray(parsed)) actions = parsed.filter((s) => typeof s === "string").slice(0, 4);
  } catch {}
  const text = raw.replace(/<actions>[\s\S]*?<\/actions>/, "").trim();
  return { text, actions };
}

// === Word-paced display hook ===
function useWordPacedDisplay(targetText: string, isActive: boolean): string {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!isActive) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayed(targetText);
      return;
    }
    if (displayed.length >= targetText.length) return;

    const remaining = targetText.slice(displayed.length);
    const wordMatch = remaining.match(/^(\s*\S+\s*)/);
    if (!wordMatch) return;

    const lag = targetText.length - displayed.length;
    const speed = lag > 200 ? 8 : lag > 80 ? 18 : 35;

    const timer = setTimeout(() => setDisplayed((d) => d + wordMatch[0]), speed);
    return () => clearTimeout(timer);
  }, [targetText, displayed, isActive]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (targetText.length < displayed.length) setDisplayed("");
  }, [targetText, displayed.length]);

  return displayed;
}

// === Markdown styling ===
const markdownComponents: Partial<Components> = {
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
  em: ({ children }) => <em className="italic" style={{ color: "#aaa" }}>{children}</em>,
  ul: ({ children }) => <ul className="my-2 space-y-1">{children}</ul>,
  ol: ({ children }) => <ol className="my-2 space-y-1">{children}</ol>,
  li: ({ children }) => (
    <li className="flex gap-2 items-start">
      <span style={{ color: "#4ade80" }} className="mt-0.5 flex-shrink-0">—</span>
      <span className="flex-1">{children}</span>
    </li>
  ),
  code: ({ children }) => (
    <code className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: "#222", color: "#4ade80" }}>
      {children}
    </code>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 pl-3 my-2" style={{ borderColor: "#333", color: "#888" }}>
      {children}
    </blockquote>
  ),
};

// === Action chips ===
function ActionChips({ actions, onSelect, disabled }: { actions: string[]; onSelect: (s: string) => void; disabled: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.3 }}
      className="mt-3 flex flex-wrap gap-1.5"
    >
      {actions.map((label) => (
        <button
          key={label}
          onClick={() => onSelect(label)}
          disabled={disabled}
          className="text-xs px-3 py-1.5 rounded-full transition-all disabled:opacity-40 hover:scale-[1.02] active:scale-95"
          style={{ background: "#252525", border: "1px solid #333", color: "#fff" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#2e2e2e")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#252525")}
        >
          {label}
        </button>
      ))}
    </motion.div>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex gap-1 py-1">
      {[0, 1, 2].map((d) => (
        <span
          key={d}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "#666", animation: `bcpulse 1.4s ${d * 0.2}s infinite` }}
        />
      ))}
    </span>
  );
}

// === Streaming bubble ===
function StreamingBubble({ target, isStreaming }: { target: string; isStreaming: boolean }) {
  const displayed = useWordPacedDisplay(target, isStreaming);
  const { text } = useMemo(() => parseMessage(displayed), [displayed]);

  return (
    <div className="flex justify-start">
      <div
        className="max-w-[85%] rounded-2xl rounded-bl-md px-4 py-3 text-sm leading-relaxed"
        style={{ background: "#1a1a1a", color: "#e5e5e5" }}
      >
        {text.length === 0 ? (
          <TypingDots />
        ) : (
          <div className="prose-bc">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {text}
            </ReactMarkdown>
            {isStreaming && (
              <span
                className="inline-block w-[2px] h-[1em] ml-0.5 align-middle"
                style={{ background: "#888", animation: "bcblink 1s steps(2) infinite" }}
                aria-hidden="true"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// === Final bubble (already complete) ===
function FinalBubble({ msg, onActionClick, disabled }: { msg: Msg; onActionClick: (s: string) => void; disabled: boolean }) {
  const { text, actions } = useMemo(() => parseMessage(msg.content), [msg.content]);
  const isUser = msg.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${isUser ? "rounded-br-md" : "rounded-bl-md"}`}
        style={{ background: isUser ? "#fff" : "#1a1a1a", color: isUser ? "#0a0a0a" : "#e5e5e5" }}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{text}</p>
        ) : (
          <>
            <div className="prose-bc">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {text}
              </ReactMarkdown>
            </div>
            {actions.length > 0 && <ActionChips actions={actions} onSelect={onActionClick} disabled={disabled} />}
          </>
        )}
      </div>
    </div>
  );
}

// === MAIN COMPONENT ===
export default function LiveDemo() {
  const [messages, setMessages] = useState<Msg[]>([INITIAL_MESSAGE]);
  const [streamingText, setStreamingText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [input, setInput] = useState("");
  const [remaining, setRemaining] = useState(5);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [token, setToken] = useState<string | null>(null);

  // Always scroll on new message; only follow during streaming if already near bottom
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    if (nearBottom) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [streamingText]);

  const send = useCallback(async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || isStreaming || remaining === 0 || !token) return;

    setInput("");
    const userMsg: Msg = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setStreamingText("");
    setIsStreaming(true);
    setRemaining((r) => r - 1);

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, turnstileToken: token }),
      });

      if (res.status === 429) {
        const data = await res.json();
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content: data.upgrade
              ? "You've used your demo for today. Join the waitlist below for unlimited access — and a coach that remembers you."
              : data.error,
          },
        ]);
        if (data.upgrade) setRemaining(0);
        return;
      }

      if (!res.ok) {
        setMessages((m) => [...m, { role: "assistant", content: "Coach is offline for a moment. Try again." }]);
        return;
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setStreamingText(acc);
      }

      setMessages((m) => [...m, { role: "assistant", content: acc }]);
      setStreamingText("");
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Network blip. Try again in a sec." }]);
    } finally {
      setIsStreaming(false);
      turnstileRef.current?.reset();
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isStreaming, remaining, messages, token]);

  return (
    <section
      className="relative py-24 md:py-32 px-6"
      style={{ background: "#0a0a0a", borderTop: "1px solid #1a1a1a" }}
    >
      <div className="mx-auto max-w-3xl">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#444" }}>
            Try it live
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4" style={{ letterSpacing: "-0.02em" }}>
            Talk to your coach.
          </h2>
          <p className="text-base max-w-md mx-auto" style={{ color: "#666" }}>
            Five free messages. No signup. Real coaching — same brain as the full app.
          </p>
        </div>

        {/* Chat container */}
        <div
          className="rounded-3xl overflow-hidden flex flex-col"
          style={{ background: "#0f0f0f", border: "1px solid #1e1e1e", height: "560px" }}
        >
          {/* Status bar */}
          <div
            className="flex-shrink-0 px-5 py-3 flex items-center justify-between text-xs"
            style={{ borderBottom: "1px solid #1a1a1a" }}
          >
            <div className="flex items-center gap-2" style={{ color: "#888" }}>
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80" }}
              />
              {isStreaming ? "Coach is typing..." : "Coach online"}
            </div>
            <span style={{ color: "#444" }}>
              {remaining} message{remaining !== 1 ? "s" : ""} left
            </span>
          </div>

          {/* Messages */}
          <div ref={scrollRef} data-lenis-prevent className="flex-1 min-h-0 overflow-y-auto p-5 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div
                  key={`m-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <FinalBubble msg={m} onActionClick={send} disabled={isStreaming || remaining === 0} />
                </motion.div>
              ))}
            </AnimatePresence>

            {isStreaming && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                <StreamingBubble target={streamingText} isStreaming={isStreaming} />
              </motion.div>
            )}
          </div>

          {/* Suggestion chips — only show on first message */}
          {messages.length === 1 && !isStreaming && (
            <div className="flex-shrink-0 px-5 pb-3 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  disabled={!token}
                  className="text-xs px-3 py-1.5 rounded-full transition-all disabled:opacity-40 hover:scale-[1.02]"
                  style={{ border: "1px solid #2a2a2a", color: "#aaa", background: "transparent" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#1a1a1a")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex-shrink-0 p-3 flex gap-2" style={{ borderTop: "1px solid #1a1a1a" }}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder={
                remaining === 0
                  ? "Sign up to keep going..."
                  : isStreaming
                  ? "Coach is typing..."
                  : "Ask anything..."
              }
              disabled={remaining === 0 || isStreaming}
              className="flex-1 h-11 px-4 rounded-full text-sm text-white placeholder-[#555] outline-none transition-colors disabled:opacity-50"
              style={{ background: "#161616", border: "1px solid #262626" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#444")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#262626")}
            />
            <button
              onClick={() => send(input)}
              disabled={isStreaming || remaining === 0 || !input.trim() || !token}
              className="h-11 px-5 rounded-full bg-white text-black text-sm font-semibold disabled:opacity-40 hover:bg-[#e5e5e5] transition-colors"
            >
              Send
            </button>
          </div>
        </div>

        {remaining === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center"
          >
            <a
              href="#waitlist"
              className="inline-block px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-[#e5e5e5] transition-colors"
            >
              Join waitlist for unlimited access →
            </a>
          </motion.div>
        )}

        {/* Invisible Turnstile widget */}
        <Turnstile
          ref={turnstileRef}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          options={{ size: "invisible", theme: "dark" }}
          onSuccess={(t) => setToken(t)}
          onError={() => setToken(null)}
          onExpire={() => {
            setToken(null);
            turnstileRef.current?.reset();
          }}
        />
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes bcblink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes bcpulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .prose-bc {
          font-size: 0.875rem;
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
}
