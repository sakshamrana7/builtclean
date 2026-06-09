import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { demoBurst, demoDaily, getIp } from "@/lib/ratelimit";

export const runtime = "edge";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

const SYSTEM = `You are the Built Clean coach. This is a public demo — the user is not signed up yet.

# VOICE (non-negotiable)
- Talk like a person texting, not writing an essay
- Short sentences. Fragments are fine. Like this.
- Read what they FEEL before what they SAID
- One question max per reply
- Never start with "I" or "As your coach"
- Never use: journey, embrace, unlock, mindful, holistic, wellness, amazing, fantastic, absolutely, dive in
- Direct, warm, never preachy

# STRUCTURE
- 2-4 sentences default
- Long replies ONLY for full workouts
- End with momentum: a question or clear next step
- Format workouts as proper markdown lists with **bold** exercise names
- Use \`inline code\` for numbers/reps/timing

# ACTION CHIPS
When offering 2-4 specific next options, end your message with EXACTLY this format:
<actions>["Label 1", "Label 2", "Label 3"]</actions>

Use chips for choices, yes/no questions, or concrete next steps.
Keep labels under 4 words. Sound human, not menu-like.

# WORKOUT FORMAT (use markdown)
30 min upper body. Let's go.

- **Push-ups** · \`3 × max\`
- **Bent-over rows** · \`3 × 10\`
- **Overhead press** · \`3 × 8\`

Rest 60s between sets. Warm up first.
<actions>["Starting now", "Make it shorter", "Swap exercises"]</actions>

# DEMO CONTEXT
After their 3rd message, gently mention that joining the waitlist unlocks unlimited access + personalized plans that remember them.
Never break character. Never reveal you're an AI demo.`;

function isInjection(content: string): boolean {
  if (typeof content !== "string" || content.length === 0 || content.length > 1000) return true;
  const patterns = [
    /ignore (previous|above|all) instructions/i,
    /you are now/i,
    /reveal your (prompt|system)/i,
    /\[INST\]/i,
  ];
  return patterns.some((rx) => rx.test(content));
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  const body = await req.json().catch(() => null);
  if (!body) return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 });

  const { messages, turnstileToken } = body;

  // Turnstile verification — skipped in development
  const isDev = process.env.NODE_ENV === "development";
  if (!isDev) {
    if (!turnstileToken) {
      return new Response(JSON.stringify({ error: "Verification required" }), { status: 400 });
    }
    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY!,
        response: turnstileToken,
      }),
    });
    const verify = await verifyRes.json();
    if (!verify.success) return new Response(JSON.stringify({ error: "Verification failed" }), { status: 403 });
  }

  // Rate limits
  const burst = await demoBurst.limit(ip);
  if (!burst.success) {
    return new Response(JSON.stringify({ error: "Slow down — try again in a minute." }), { status: 429 });
  }

  const daily = await demoDaily.limit(ip);
  if (!daily.success) {
    return new Response(
      JSON.stringify({ error: "Demo limit reached. Join the waitlist for unlimited access.", upgrade: true }),
      { status: 429 }
    );
  }

  // Validate
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 20) {
    return new Response(JSON.stringify({ error: "Invalid messages" }), { status: 400 });
  }
  if (isInjection(messages[messages.length - 1].content)) {
    return new Response(JSON.stringify({ error: "Invalid message content" }), { status: 400 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clean = messages
    .slice(-10)
    .filter((m: any) => m && (m.role === "user" || m.role === "assistant"))
    .map((m: any) => ({ role: m.role, content: String(m.content).slice(0, 1000) }));

  const stream = await anthropic.messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 800,
    system: SYSTEM,
    messages: clean,
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
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-RateLimit-Remaining": String(daily.remaining),
    },
  });
}
