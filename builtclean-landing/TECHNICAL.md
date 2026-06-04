# BUILTCLEAN Landing Page — Technical Documentation

Complete reference for every file, library, API route, and environment variable in this project.

---

## Languages Used

### TypeScript (`.ts`)

The primary language for all logic files — API routes, utility libraries, and type definitions.

TypeScript is a strict superset of JavaScript that adds static types. Every variable, function parameter, and return value can be typed, which means the editor catches mistakes before the code runs. In this project it's used to:

- Type Supabase query results (so you know the shape of `user_profiles` before using it)
- Enforce that API routes return the correct response shapes
- Catch subtle bugs like passing `number[]` where `[number, number, number, number]` is required (the motion `ease` tuple issue)
- Type rate limiter return values, Anthropic stream chunks, and form schemas

TypeScript compiles down to plain JavaScript — it adds zero runtime cost and zero bundle size. It only exists during development and the build step.

**Files:** `lib/ratelimit.ts`, `lib/resend.ts`, `lib/supabase.ts`, `lib/supabase/server.ts`, `lib/supabase/admin.ts`, all `app/api/*/route.ts` files

---

### TSX (`.tsx`)
TypeScript with JSX — used for every file that renders UI.

JSX is a syntax extension that lets you write HTML-like markup inside JavaScript/TypeScript. It looks like HTML but it is not — every tag compiles to a `React.createElement()` call. TSX = TypeScript + JSX together.

Example of what TSX does:

```tsx
// What you write
<motion.div className="rounded-3xl">Hello</motion.div>

// What it compiles to
React.createElement(motion.div, { className: "rounded-3xl" }, "Hello")
```

In this project TSX is used for every component and page. The `.tsx` extension tells the TypeScript compiler to enable JSX parsing for that file.

**Files:** All `components/*.tsx`, `app/page.tsx`, `app/layout.tsx`, `app/providers.tsx`, `app/opengraph-image.tsx`

---

### CSS (`.css`)
Used in a single file — `app/globals.css` — for things that can't be done with Tailwind utility classes.

Standard CSS with two additions:

**Tailwind CSS v4 `@theme` block** — a special directive that defines design tokens as CSS custom properties. Tailwind reads these at build time and generates utility classes from them (e.g. `text-bc-green` maps to `--color-bc-green: #4ade80`).

```css
@theme inline {
  --color-bc-green: #4ade80;
}
```

**`@keyframes`** — animation definitions that can't be expressed as inline styles or Tailwind classes. Keyframe animations need a name so they can be referenced by multiple elements. Defined once globally, used anywhere via `animation: aurora 20s infinite`.

Everything else in the project is styled with Tailwind utility classes written directly in TSX — no separate `.css` files per component.

**File:** `app/globals.css`

---

### JSON (`.json`)

Configuration files only — not written by hand during feature work.

- `package.json` — lists all dependencies and their versions, defines npm scripts (`dev`, `build`, `lint`)
- `tsconfig.json` — TypeScript compiler settings (which files to include, strict mode, path aliases like `@/` → project root)
- `package-lock.json` — exact locked versions of every installed package and their sub-dependencies. Guarantees reproducible installs across machines

---

### How They Work Together

```
TypeScript (.ts)        — logic, data fetching, utilities
    ↓ compiled by tsc
TSX (.tsx)              — components that combine logic + UI markup
    ↓ compiled by Next.js (Turbopack)
CSS (.css)              — global tokens and animations
    ↓ processed by Tailwind + PostCSS
JavaScript              — what actually runs in the browser / on the server
```

The build tool is **Turbopack** (Next.js 16's default bundler, written in Rust). It compiles TypeScript + TSX to JavaScript, processes CSS through PostCSS + Tailwind, and bundles everything for the browser. It replaces Webpack and is significantly faster.

**Why TypeScript over plain JavaScript?** In a project with API routes, database queries, AI streaming, and rate limiting — all interacting — plain JavaScript would let type mismatches slip through silently. TypeScript makes the contract between every piece explicit. The Anthropic SDK, Supabase client, and motion library all ship their own TypeScript definitions, so you get autocomplete and error-checking for their APIs too.

---

## Stack Overview

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) | Server components, edge functions, built-in image/OG support |
| Language | TypeScript | Type safety across all routes and components |
| Styling | Tailwind CSS v4 | Utility-first, no runtime CSS |
| Animation | Motion (motion/react) | Successor to Framer Motion — smaller, faster, same API |
| Scroll | Lenis | Buttery smooth scroll used by Linear, Apple, Vercel |
| Database | Supabase (Postgres) | Waitlist storage + future user profiles and chat history |
| Auth | Supabase Auth | Cookie-based session management for the app |
| Email | Resend | Transactional emails — waitlist confirmation |
| AI | Anthropic Claude (claude-sonnet-4-6) | Powers the demo chat and the authenticated coach |
| Rate limiting | Upstash Redis | Edge-compatible sliding window rate limiter |
| Bot protection | Cloudflare Turnstile | Invisible CAPTCHA on the demo chat |
| Analytics | Vercel Analytics + Speed Insights | Real visitor data, Core Web Vitals |
| Counters | @number-flow/react | Animated digit transitions in hero and stats |

---

## Project Structure

```
builtclean-landing/
├── app/
│   ├── api/
│   │   ├── coach/route.ts       # Authenticated AI coach endpoint
│   │   ├── demo/route.ts        # Public demo chat endpoint
│   │   └── waitlist/route.ts    # Waitlist signup endpoint
│   ├── globals.css              # Global tokens, keyframes, Lenis setup
│   ├── layout.tsx               # Root layout — metadata, Providers wrapper
│   ├── opengraph-image.tsx      # Dynamic OG image (edge rendered)
│   ├── page.tsx                 # Page composition — section order
│   └── providers.tsx            # Client providers — Lenis, Analytics
├── components/
│   ├── Comparison.tsx           # Feature comparison table vs competitors
│   ├── CtaSection.tsx           # Bottom CTA with waitlist form
│   ├── FAQ.tsx                  # Animated accordion FAQ
│   ├── Features.tsx             # Asymmetric bento grid
│   ├── Footer.tsx               # Footer
│   ├── Hero.tsx                 # Animated hero with live waitlist counter
│   ├── HowItWorks.tsx           # Step-by-step explainer
│   ├── LiveDemo.tsx             # Public AI coach demo chat widget
│   ├── MagneticButton.tsx       # Spring-physics magnetic hover effect
│   ├── Marquee.tsx              # Infinite scrolling ticker
│   ├── Navbar.tsx               # Sticky nav with scroll-reactive blur
│   ├── Stats.tsx                # Animated stat counters
│   ├── Testimonials.tsx         # Social proof section
│   └── WaitlistForm.tsx         # Email capture form with validation
└── lib/
    ├── ratelimit.ts             # Upstash rate limiter setup
    ├── resend.ts                # Resend email client + confirmation template
    ├── supabase.ts              # Legacy public + admin Supabase clients
    ├── supabase/
    │   ├── server.ts            # SSR Supabase client (reads cookies)
    │   └── admin.ts             # Admin Supabase client (bypasses RLS)
```

---

## Page Section Order

Defined in `app/page.tsx`. The order follows a conversion narrative:

```
Navbar        → persistent navigation
Hero          → hook — headline, counter, form
Marquee       → credibility ticker
Stats         → proof — 4 key facts
LiveDemo      → experience the product before signing up
Features      → show what it does
Comparison    → position against competitors
HowItWorks    → remove uncertainty about the process
Testimonials  → social proof
FAQ           → remove doubts
CtaSection    → close — final form
Footer        → links
```

---

## Components

### `Hero.tsx`
- **Motion** — word-by-word H1 reveal using `motion/react` variants with staggered delay (`custom` prop)
- **NumberFlow** — live waitlist counter that animates digit changes. Randomly increments every 8–14s to feel alive
- **Aurora background** — two radial gradient divs animated with CSS `@keyframes aurora`. Pure CSS, no JS
- **`fadeUp` variants** — typed as `Variants` from motion. The `ease` array is cast as `[number, number, number, number]` (a BezierDefinition) because TypeScript rejects plain `number[]` for this type

### `LiveDemo.tsx`
- **Turnstile** — Cloudflare invisible CAPTCHA. Fires `onSuccess(token)` automatically on page load. Token is sent with every API request. Resets after each message to get a fresh token
- **`send()` gate** — blocked until `token !== null`. This means the UI appears ready but silently waits for Turnstile before allowing the first message
- **Streaming** — reads the response body as a `ReadableStream`, appending chunks to `streamingText` state. The `StreamingBubble` component animates these chunks word-by-word via `useWordPacedDisplay`
- **`useWordPacedDisplay`** — adaptive speed hook: fast when many words remain (8ms), slows to 35ms near the end, making responses feel natural rather than mechanical
- **`parseMessage`** — strips `<actions>[...]</actions>` tags from the raw AI response before rendering, and parses the JSON array into chip labels
- **`ReactMarkdown` + `remark-gfm`** — renders the coach's markdown (bold exercise names, inline code for reps) into styled HTML. Custom `markdownComponents` apply the dark theme
- **Action chips** — clickable suggestion buttons emitted by the AI at the end of certain responses. Clicking one calls `send()` directly with that label as the message
- **`X-RateLimit-Remaining` header** — the API returns how many daily messages are left. The component reads this and updates `remaining` from the server's count, not just a local decrement

### `Navbar.tsx`
- **Scroll effect** — `scrollY > 20` triggers `scrolled` state. Background transitions from transparent to `rgba(10,10,10,0.7)` with `backdrop-filter: blur(12px)` — same technique used by Linear and Vercel

### `Features.tsx`
- **Bento grid** — CSS Grid with `md:col-span-2 md:row-span-2` for the large tile. Asymmetric layout can't be done with flexbox
- **`BentoTile`** — each tile uses `whileInView` so it only animates when scrolled into view (`once: true`). `margin: "-80px"` triggers slightly before the element is fully visible

### `Stats.tsx`
- **`NumberFlow`** — only mounts after a 200ms delay (`visible` state) to avoid animating to zero on hydration. Numbers animate from 0 on first render

### `MagneticButton.tsx`
- **Spring physics** — tracks mouse position relative to button center, applies 20% of the offset as `x`/`y` on a `motion.button`. `stiffness: 150, damping: 15` gives it snap without bounciness. Mouse leave snaps back to `{x:0, y:0}`

### `WaitlistForm.tsx`
- **`react-hook-form`** — controlled form with uncontrolled inputs (no re-render on every keystroke)
- **`zod` + `@hookform/resolvers`** — schema validation runs client-side before the API call. The same schema is re-validated server-side in the API route

### `Comparison.tsx`
- Static. No client JS needed — rendered as a Server Component

### `FAQ.tsx`
- **`AnimatePresence`** — required for exit animations. Without it, the closing animation would be skipped because React removes the element from the DOM immediately
- `height: 0 → "auto"` — motion handles this special case; plain CSS transitions can't animate to `height: auto`

### `Marquee.tsx`
- Pure CSS animation — `@keyframes marquee` translates -50% because the list is tripled (`[...items, ...items, ...items]`), so halfway through the animation it has looped seamlessly

---

## API Routes

### `POST /api/demo` — Public demo chat
**Runtime:** Edge (runs at the CDN edge, not a Node.js server)

**Flow:**
1. Extract IP from `cf-connecting-ip` or `x-forwarded-for`
2. Parse request body — fail fast if malformed
3. Verify Cloudflare Turnstile token against `challenges.cloudflare.com/turnstile/v0/siteverify`
4. Check burst rate limit (3 req/60s per IP via Upstash Redis)
5. Check daily rate limit (10 req/24h per IP via Upstash Redis)
6. Validate message array — length, roles, content
7. Run `isInjection()` check on the last message
8. Trim history to last 10 messages, cap each to 1000 chars
9. Stream from Anthropic API → pipe directly to client response
10. Return `X-RateLimit-Remaining` header so the frontend can update its counter

**`isInjection()`** — blocks prompt injection attempts. Checks for patterns like "ignore previous instructions", "you are now", "reveal your prompt", `[INST]` tokens. Returns true (block) if content is empty, too long, or matches any pattern.

**Why edge runtime:** Streaming responses from Anthropic require long-lived connections. Edge functions have no cold start and handle streaming natively. Node.js serverless functions time out on Vercel at 10s by default.

### `POST /api/coach` — Authenticated coach
**Runtime:** Node.js (`runtime = "nodejs"`, `maxDuration = 60`)

**Why Node.js here instead of edge:** Uses `createClient` from `@/lib/supabase/server` which reads cookies via `next/headers`. The `cookies()` API is only available in the Node.js runtime.

**Flow:**
1. Create Supabase server client (reads session cookie)
2. Authenticate user — return 401 if not logged in
3. Fetch user profile from `user_profiles` table
4. Fetch last 20 messages from `chat_messages` table (conversation memory)
5. Parse `content` from request body
6. Save user message to `chat_messages` via admin client (bypasses RLS)
7. Stream from Anthropic with full `buildSystemPrompt(profile)` — personalized to this user
8. Accumulate full response, save to `chat_messages` after stream closes (including `<actions>` tags — frontend strips them)

**`buildSystemPrompt(profile)`** — injects user's name, goals, fitness level, equipment, training days, current streak, and longest streak directly into the system prompt. This is what makes the coach feel personal.

**Action chips** — the AI is instructed to end certain responses with `<actions>["Label 1", "Label 2"]</actions>`. The full string including tags is saved to the database. The frontend parses and strips the tag before displaying.

### `POST /api/waitlist`
**Flow:**
1. Parse + validate body with Zod (`email` must be a valid email)
2. Check if email already exists in `waitlist` table (returns 200 with "already on list" — not an error)
3. Insert new row with `source: "landing_page"`
4. Send confirmation email via Resend (fire-and-forget — email failure does not fail the request)
5. Return 201 success

---

## Libraries

### `motion` (motion/react)
Successor to Framer Motion by the same author. Used for:
- `motion.div` / `motion.span` — animatable elements
- `variants` + `custom` — staggered animations where each element has a different delay
- `whileInView` — scroll-triggered animations
- `AnimatePresence` — exit animations (FAQ accordion close, chat bubbles)
- `animate` on `MagneticButton` — spring-driven position offset

### `lenis`
Smooth scroll library. Replaces the browser's native scroll with a lerp (linear interpolation) animation. Set to `duration: 1.2` with an exponential ease. Initialized in `providers.tsx` and runs its own `requestAnimationFrame` loop. The `html.lenis` CSS class overrides `scroll-behavior: smooth` to prevent double-smoothing.

### `@number-flow/react`
Animated counter component. Handles digit-by-digit transitions correctly — individual digits slide in/out rather than the whole number cross-fading. Used in Hero (waitlist count) and Stats section.

### `@anthropic-ai/sdk`
Official Anthropic SDK. Used with `.messages.stream()` for streaming responses. The stream is an async iterator — `for await (const chunk of stream)` processes each delta. Only `content_block_delta` events with `text_delta` type contain text.

### `@supabase/supabase-js`
Core Supabase client. Used in `lib/supabase.ts` (legacy) and `lib/supabase/admin.ts` for server-side admin operations that bypass Row Level Security.

### `@supabase/ssr`
Supabase's SSR adapter. Provides `createServerClient` which reads and writes cookies through Next.js's `cookies()` API. Required for auth — the standard `createClient` doesn't know about cookies. Used in `lib/supabase/server.ts`.

### `@upstash/ratelimit` + `@upstash/redis`
Edge-compatible rate limiting backed by Upstash Redis (a serverless Redis service with an HTTP API). Used because standard Redis clients use TCP connections which don't work in edge runtimes. `Ratelimit.slidingWindow` is more accurate than a fixed window — it counts requests in a rolling time window rather than resetting at a fixed clock boundary.

### `@marsidev/react-turnstile`
React wrapper for Cloudflare Turnstile. Renders an invisible widget that challenges the browser (device signals, behavioral heuristics) and calls `onSuccess(token)` with a short-lived token. The token is verified server-side against Cloudflare's API. Prevents bots from spamming the demo endpoint without user friction.

### `react-markdown` + `remark-gfm`
Renders markdown strings as React elements. `remark-gfm` adds GitHub Flavored Markdown support (tables, strikethrough, task lists). Used to render the AI coach's responses which include `**bold**` exercise names and `` `inline code` `` for reps/weights.

### `react-hook-form` + `zod` + `@hookform/resolvers`
Form handling trio. `react-hook-form` manages the form state with minimal re-renders. `zod` defines the validation schema as a TypeScript type. `@hookform/resolvers/zod` connects them — validation runs on submit and errors appear inline.

### `resend`
Email API. Used to send the waitlist confirmation email. The client is a lazy singleton (initialized only on first use) to avoid creating a new client on every request.

### `@vercel/analytics` + `@vercel/speed-insights`
Drop-in components that inject Vercel's analytics scripts. `Analytics` tracks page views and custom events. `SpeedInsights` reports Core Web Vitals (LCP, FID, CLS) for real users. Both are included in `providers.tsx` so they're on every page.

### `class-variance-authority`
Utility for building component variants with type-safe props. Installed for future use as the component library grows.

### `vaul`
Apple-style bottom sheet component. Installed for mobile UX patterns — e.g., a drawer for the mobile menu or a sheet for demo interaction on small screens.

---

## Lib Files

### `lib/supabase/server.ts`
Creates a Supabase client that reads the user's session from cookies. This is the correct client to use in Server Components and API routes that need to know who the user is. Uses `@supabase/ssr`'s `createServerClient`.

### `lib/supabase/admin.ts`
Creates a Supabase client using the `SUPABASE_SERVICE_ROLE_KEY` which bypasses all Row Level Security policies. Used only in server-side API routes for operations the user shouldn't be able to trigger directly (e.g., saving AI responses). Implemented as a lazy Proxy so the `createClient` call is deferred to runtime — this prevents a build-time crash when env vars aren't available during static analysis.

### `lib/supabase.ts`
Legacy file from v1. Contains `getSupabase()` (public client) and `getSupabaseAdmin()` (admin client) as lazy singletons. Still used by `app/api/waitlist/route.ts`.

### `lib/ratelimit.ts`
Exports `demoBurst`, `demoDaily`, and `getIp`. When `UPSTASH_REDIS_REST_URL` is not set (local dev), all limiters return a pass-through object so the demo works without Redis. `getIp` prefers `cf-connecting-ip` (set by Cloudflare) over `x-forwarded-for` (can be spoofed by clients).

### `lib/resend.ts`
Lazy Resend singleton + email template builder. `buildConfirmationEmail` returns a full HTML email as a string. Inline styles only — email clients don't support external CSS or `<style>` tags reliably.

---

## Environment Variables

| Variable | Used In | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | `/api/demo`, `/api/coach` | Authenticates requests to Claude API |
| `NEXT_PUBLIC_SUPABASE_URL` | All Supabase clients | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public + SSR Supabase clients | Public key — safe for client-side, limited by RLS |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin Supabase client | Bypasses RLS — server-side only, never expose to client |
| `RESEND_API_KEY` | `lib/resend.ts` | Authenticates email sends |
| `UPSTASH_REDIS_REST_URL` | `lib/ratelimit.ts` | Upstash Redis endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | `lib/ratelimit.ts` | Upstash Redis auth token |
| `TURNSTILE_SECRET_KEY` | `/api/demo` | Server-side Turnstile verification |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | `LiveDemo.tsx` | Client-side Turnstile widget key |
| `NEXT_PUBLIC_APP_URL` | `layout.tsx` metadata | Canonical URL for OG tags |

**Local dev test values (replace before deploying):**
- `TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA` — Cloudflare always-pass test key
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA` — Cloudflare always-pass test key

---

## CSS Architecture (`globals.css`)

| Token | Value | Used For |
|---|---|---|
| `--color-bc-bg` | `#0a0a0a` | Page background |
| `--color-bc-surface` | `#111111` | Card backgrounds |
| `--color-bc-surface-2` | `#1a1a1a` | Chat bubbles, nested surfaces |
| `--color-bc-border` | `#1a1a1a` | Section dividers |
| `--color-bc-border-card` | `#2a2a2a` | Card borders |
| `--color-bc-green` | `#4ade80` | Accent — streaks, online dot, stat callouts |
| `--color-bc-elevated` | `#131313` | Bento tile gradient start |
| `--ease-out-expo` | `cubic-bezier(0.19,1,0.22,1)` | All motion transitions — fast start, slow finish |

**Keyframes defined in globals.css:**
- `aurora` — slow scale + translate oscillation for the hero background gradient
- `ping` — the pulsing green dot animation on the live badge
- `marquee` — infinite left-scroll for the ticker strip
- `bcblink` — cursor blink in the streaming chat bubble
- `bcpulse` — typing indicator dots in the chat

**Grain overlay** — `body::before` with an SVG fractal noise filter as a `background-image`. `opacity: 0.025`, `mix-blend-mode: overlay`, `pointer-events: none`. Adds texture depth without any image asset.

**Lenis CSS** — `html.lenis body { height: auto }` prevents Lenis from conflicting with the browser's scroll height calculation. `.lenis-stopped { overflow: hidden }` used when scroll is locked (e.g., modal open).

---

## OG Image (`app/opengraph-image.tsx`)

Uses Next.js's built-in `ImageResponse` from `next/og`. Renders a React component to a 1200×630 PNG at request time on the edge. Styles must be inline — no Tailwind. The static `/og-image.png` in `layout.tsx` metadata is a fallback; the dynamic route takes precedence when the page is shared.

---

## AI System Prompts

### Demo prompt (`/api/demo`)
Optimized for a first impression. Key constraints:
- 2–4 sentence default, no markdown prose
- Workout format uses markdown lists with `**bold**` names and `` `inline code` `` for reps
- Action chips emitted as `<actions>["Label"]</actions>` — parsed and stripped by the frontend
- After the 3rd message, nudges toward waitlist signup
- `isInjection()` guard runs before the prompt is sent to Claude

### Coach prompt (`/api/coach`)
Personalized with live user data. Key additions vs demo:
- `# THIS USER` section injects name, goals, level, equipment, training frequency, streak data
- `# EMOTIONAL CALIBRATION` — explicit rules for tired/missed days/milestone/frustrated states
- Bad/good examples for 5 common scenarios — few-shot prompting to anchor the voice
- Same action chip format, stored verbatim in the database and stripped by the frontend

---

## Supabase Tables Required

```sql
-- Waitlist (landing page)
create table waitlist (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  source text default 'landing_page',
  created_at timestamptz default now()
);
alter table waitlist enable row level security;
create policy "Service role only" on waitlist using (auth.role() = 'service_role');

-- User profiles (authenticated app)
create table user_profiles (
  id uuid references auth.users primary key,
  full_name text,
  goals text[],
  fitness_level text,
  equipment text[],
  days_per_week int default 3,
  streak_count int default 0,
  longest_streak int default 0,
  updated_at timestamptz default now()
);

-- Chat history (authenticated app)
create table chat_messages (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  role text check (role in ('user', 'assistant')) not null,
  content text not null,
  created_at timestamptz default now()
);
create index on chat_messages (user_id, created_at desc);
```
