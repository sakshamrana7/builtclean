# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: demo.spec.ts >> Live demo chat >> decrements message counter after sending
- Location: tests/demo.spec.ts:64:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Send' })
    - locator resolved to <button disabled class="jsx-2aa9f3e469a3bc41 h-11 px-5 rounded-full bg-white text-black text-sm font-semibold disabled:opacity-40 hover:bg-[#e5e5e5] transition-colors">Send</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
      - waiting 100ms
    44 × waiting for element to be visible, enabled and stable
       - element is not enabled
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - main [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e5]:
        - link "BUILTCLEAN" [ref=e6]:
          - /url: /
          - img "BUILTCLEAN" [ref=e7]
        - button "Open menu" [ref=e8]
      - navigation [ref=e12]:
        - link "Features" [ref=e13]:
          - /url: "#features"
        - link "How it works" [ref=e14]:
          - /url: "#how-it-works"
        - link "About" [ref=e15]:
          - /url: "#about"
        - link "Join waitlist" [ref=e16]:
          - /url: "#waitlist"
    - generic [ref=e18]:
      - generic [ref=e19]:
        - generic [ref=e26]:
          - generic [ref=e28]: "2"
          - generic [ref=e30]: ","
          - generic [ref=e32]: "8"
          - generic [ref=e34]: "5"
          - generic [ref=e36]: "0"
        - text: on the waitlist
      - heading "Fitness that keeps you coming back." [level=1] [ref=e37]:
        - generic [ref=e38]: Fitness
        - generic [ref=e39]: that
        - generic [ref=e40]: keeps
        - generic [ref=e41]: you
        - generic [ref=e42]: coming
        - generic [ref=e43]: back.
      - paragraph [ref=e44]: An AI coach that adapts to your life, not the other way around. Built for consistency. Trained for results.
      - generic [ref=e48]:
        - textbox "Enter your email address" [ref=e49]
        - button "Claim early access" [ref=e50]
      - paragraph [ref=e51]: Free forever for founding members · No credit card · No spam
    - generic [ref=e53]:
      - generic [ref=e54]:
        - text: Adapts daily
        - generic [ref=e55]: ·
      - generic [ref=e56]:
        - text: No guilt
        - generic [ref=e57]: ·
      - generic [ref=e58]:
        - text: Real coaching
        - generic [ref=e59]: ·
      - generic [ref=e60]:
        - text: Trained on sports science
        - generic [ref=e61]: ·
      - generic [ref=e62]:
        - text: Built for consistency
        - generic [ref=e63]: ·
      - generic [ref=e64]:
        - text: Built for real life
        - generic [ref=e65]: ·
      - generic [ref=e66]:
        - text: Adapts daily
        - generic [ref=e67]: ·
      - generic [ref=e68]:
        - text: No guilt
        - generic [ref=e69]: ·
      - generic [ref=e70]:
        - text: Real coaching
        - generic [ref=e71]: ·
      - generic [ref=e72]:
        - text: Trained on sports science
        - generic [ref=e73]: ·
      - generic [ref=e74]:
        - text: Built for consistency
        - generic [ref=e75]: ·
      - generic [ref=e76]:
        - text: Built for real life
        - generic [ref=e77]: ·
      - generic [ref=e78]:
        - text: Adapts daily
        - generic [ref=e79]: ·
      - generic [ref=e80]:
        - text: No guilt
        - generic [ref=e81]: ·
      - generic [ref=e82]:
        - text: Real coaching
        - generic [ref=e83]: ·
      - generic [ref=e84]:
        - text: Trained on sports science
        - generic [ref=e85]: ·
      - generic [ref=e86]:
        - text: Built for consistency
        - generic [ref=e87]: ·
      - generic [ref=e88]:
        - text: Built for real life
        - generic [ref=e89]: ·
    - generic [ref=e92]:
      - generic [ref=e93]:
        - term [ref=e94]: AI-first
        - definition [ref=e95]: Built around your coach
      - generic [ref=e96]:
        - term [ref=e97]:
          - generic [ref=e103]: "3"
          - text: min
        - definition [ref=e104]: From signup to first plan
      - generic [ref=e105]:
        - term [ref=e106]:
          - generic [ref=e110]:
            - generic [ref=e112]: "2"
            - generic [ref=e114]: "4"
          - text: /7
        - definition [ref=e115]: Coach always on
      - generic [ref=e116]:
        - term [ref=e117]:
          - text: $
          - generic [ref=e123]: "0"
        - definition [ref=e124]: For founding members
    - generic [ref=e126]:
      - generic [ref=e127]:
        - paragraph [ref=e128]: Try it live
        - heading "Talk to your coach." [level=2] [ref=e129]
        - paragraph [ref=e130]: Five free messages. No signup. Real coaching — same brain as the full app.
      - generic [ref=e131]:
        - generic [ref=e132]:
          - generic [ref=e133]: Coach online
          - generic [ref=e135]: 5 messages left
        - paragraph [ref=e141]: Hey, I'm your coach. Workouts, meals, or those days when motivation just isn't there — I've got you. You've got 5 free messages to start. What's going on?
        - generic [ref=e142]:
          - button "Plan a 30-min workout I can do at home" [ref=e143]
          - button "I missed 3 days. How do I get back on track?" [ref=e144]
          - button "What should I eat after a heavy leg day?" [ref=e145]
          - button "I have low energy today. Should I still train?" [ref=e146]
        - generic [ref=e147]:
          - textbox "Ask anything..." [active] [ref=e148]
          - button "Send" [disabled] [ref=e149]
    - generic [ref=e151]:
      - generic [ref=e152]:
        - paragraph [ref=e153]: What it does
        - heading "Less app. More coach." [level=2] [ref=e154]
        - paragraph [ref=e155]: Every feature exists to remove a reason you'd quit.
      - generic [ref=e156]:
        - generic [ref=e159]:
          - generic [ref=e160]:
            - generic [ref=e163]: Coach
            - heading "An AI coach that learns who you are." [level=3] [ref=e164]:
              - text: An AI coach that
              - text: learns who you are.
            - paragraph [ref=e165]: Not a chatbot. Not a template. A coach that remembers your last session, your bad weeks, and your goals — and adjusts the plan in real time.
          - generic [ref=e166]:
            - generic [ref=e168]: I'm tired today. Should I skip?
            - generic [ref=e170]: Don't skip, swap. Let's do a 15-minute mobility flow instead. Streak stays alive, body gets what it needs.
        - generic [ref=e172]:
          - heading "Streaks that forgive" [level=3] [ref=e173]
          - paragraph [ref=e174]: Miss a day. Get a make-up workout. Keep the chain.
        - generic [ref=e198]:
          - heading "Meals that match" [level=3] [ref=e199]
          - paragraph [ref=e200]: Synced to your training load. Today is push day — your protein target is up by 15g.
          - generic [ref=e201]:
            - generic [ref=e202]: 142g
            - generic [ref=e203]: ↑ 15g vs rest day
        - generic [ref=e205]:
          - heading "Weekly debrief" [level=3] [ref=e206]
          - paragraph [ref=e207]: Every Sunday, a short note from your coach. What worked, what didn't, what's next.
          - generic [ref=e208]: "\"You crushed it this week. Let's push the squat 5% next.\""
        - generic [ref=e211]:
          - generic [ref=e212]:
            - heading "Built around your life" [level=3] [ref=e213]
            - paragraph [ref=e214]: Travelling? No equipment? Bad sleep? The plan flexes. The progress doesn't stop.
          - generic [ref=e215]:
            - generic [ref=e216]: Travel
            - generic [ref=e217]: No gym
            - generic [ref=e218]: Low energy
            - generic [ref=e219]: 30 min
            - generic [ref=e220]: Sore
    - generic [ref=e222]:
      - heading "Not another fitness app." [level=2] [ref=e223]
      - generic [ref=e224]:
        - generic [ref=e225]:
          - generic [ref=e227]: Most apps
          - generic [ref=e228]: BUILTCLEAN
        - generic [ref=e229]:
          - generic [ref=e230]: Adapts to your week
          - img [ref=e232]
          - img [ref=e236]
        - generic [ref=e239]:
          - generic [ref=e240]: Forgives missed days
          - img [ref=e242]
          - img [ref=e246]
        - generic [ref=e249]:
          - generic [ref=e250]: Real conversation with coach
          - img [ref=e252]
          - img [ref=e256]
        - generic [ref=e259]:
          - generic [ref=e260]: Meal plans synced to training
          - img [ref=e262]
          - img [ref=e266]
        - generic [ref=e269]:
          - generic [ref=e270]: Generic 12-week plans
          - img [ref=e272]
          - img [ref=e276]
        - generic [ref=e279]:
          - generic [ref=e280]: Guilt-trips when you skip
          - img [ref=e282]
          - img [ref=e286]
    - generic [ref=e290]:
      - generic [ref=e291]:
        - paragraph [ref=e292]: How it works
        - heading "Three steps to built clean." [level=2] [ref=e293]
      - generic [ref=e294]:
        - generic [ref=e296]:
          - generic [ref=e297]: "01"
          - heading "Tell us about yourself" [level=3] [ref=e298]
          - paragraph [ref=e299]: Answer a few quick questions about your goals, schedule, and fitness history. No lengthy onboarding — just what matters.
        - generic [ref=e301]:
          - generic [ref=e302]: "02"
          - heading "Get your first plan" [level=3] [ref=e303]
          - paragraph [ref=e304]: Your AI coach builds a personalized workout and nutrition plan in seconds, calibrated to your real life.
        - generic [ref=e306]:
          - generic [ref=e307]: "03"
          - heading "Show up daily" [level=3] [ref=e308]
          - paragraph [ref=e309]: Check in each day. Log workouts, meals, or just your mood. The coach adapts in real time.
        - generic [ref=e311]:
          - generic [ref=e312]: "04"
          - heading "Watch habits form" [level=3] [ref=e313]
          - paragraph [ref=e314]: After 30 days you'll see the data — and feel the difference. Consistency compounds.
    - generic [ref=e316]:
      - generic [ref=e317]:
        - paragraph [ref=e318]: Early feedback
        - heading "People are excited." [level=2] [ref=e319]
      - generic [ref=e320]:
        - generic [ref=e321]:
          - img [ref=e322]
          - paragraph [ref=e324]: I've tried every fitness app. The problem was always me as I'd miss a few days and just give up. Builtclean is the first one that actually adjusts when life gets in the way instead of making me feel like a failure.
          - generic [ref=e325]:
            - generic [ref=e326]: DB
            - generic [ref=e327]:
              - paragraph [ref=e328]: Dhruv B.
              - paragraph [ref=e329]: Early beta tester
        - generic [ref=e330]:
          - img [ref=e331]
          - paragraph [ref=e333]: I didn't expect the meal planning to be this good. It's not just macro targets, it actually suggests meals I'd eat and shifts around my training days. Finally feels like it was built for a real person.
          - generic [ref=e334]:
            - generic [ref=e335]: VS
            - generic [ref=e336]:
              - paragraph [ref=e337]: Varun S.
              - paragraph [ref=e338]: Waitlist member
        - generic [ref=e339]:
          - img [ref=e340]
          - paragraph [ref=e342]: Most fitness apps feel like they were designed to make you feel guilty. This one feels like it's actually in your corner. It's a small difference but it changes everything about whether you keep showing up.
          - generic [ref=e343]:
            - generic [ref=e344]: DS
            - generic [ref=e345]:
              - paragraph [ref=e346]: Darpan S.
              - paragraph [ref=e347]: Early beta tester
    - generic [ref=e349]:
      - heading "Common questions." [level=2] [ref=e350]
      - generic [ref=e351]:
        - generic [ref=e352]:
          - button "When does it launch?" [ref=e353]:
            - generic [ref=e354]: When does it launch?
            - img [ref=e355]
          - generic [ref=e358]: We're rolling out to founding members in waves starting Q1 2026. Joining the waitlist locks in early access + free forever pricing.
        - button "How is this different from a fitness app with AI features?" [ref=e360]:
          - generic [ref=e361]: How is this different from a fitness app with AI features?
          - img [ref=e362]
        - button "Do I need equipment or a gym?" [ref=e365]:
          - generic [ref=e366]: Do I need equipment or a gym?
          - img [ref=e367]
        - button "Will it actually keep me consistent?" [ref=e370]:
          - generic [ref=e371]: Will it actually keep me consistent?
          - img [ref=e372]
        - button "What does it cost?" [ref=e375]:
          - generic [ref=e376]: What does it cost?
          - img [ref=e377]
        - button "Is my data private?" [ref=e380]:
          - generic [ref=e381]: Is my data private?
          - img [ref=e382]
    - generic [ref=e385]:
      - heading "Ready to build something clean?" [level=2] [ref=e386]:
        - text: Ready to build
        - text: something clean?
      - paragraph [ref=e387]: Join the waitlist. Be first. It's free.
      - generic [ref=e391]:
        - textbox "Enter your email address" [ref=e392]
        - button "Claim your spot" [ref=e393]
    - generic [ref=e395]:
      - link "BUILTCLEAN" [ref=e396]:
        - /url: /
        - img "BUILTCLEAN" [ref=e397]
      - navigation [ref=e398]:
        - link "Privacy" [ref=e399]:
          - /url: /privacy
        - link "Terms" [ref=e400]:
          - /url: /terms
        - link "Contact" [ref=e401]:
          - /url: mailto:builtcleanai@gmail.com
      - generic [ref=e402]:
        - link "Built Clean on Instagram" [ref=e403]:
          - /url: https://instagram.com/builtclean.ai
          - img [ref=e404]
        - generic [ref=e408]: © 2025 Built Clean. All rights reserved.
  - button "Open Next.js Dev Tools" [ref=e414] [cursor=pointer]:
    - img [ref=e415]
  - alert [ref=e420]
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | test.describe("Live demo chat", () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     // Stub Turnstile BEFORE navigation so it's ready when React mounts the widget
  6   |     await page.addInitScript(() => {
  7   |       Object.defineProperty(window, "turnstile", {
  8   |         value: {
  9   |           render: (_el: unknown, opts: { callback?: (token: string) => void }) => {
  10  |             opts?.callback?.("test-token");
  11  |             return "widget-id";
  12  |           },
  13  |           reset: () => {},
  14  |           remove: () => {},
  15  |         },
  16  |         writable: true,
  17  |       });
  18  |     });
  19  | 
  20  |     await page.goto("/");
  21  |     await page.locator("text=Talk to your coach.").scrollIntoViewIfNeeded();
  22  |     // Wait for the input to be enabled (Turnstile resolved)
  23  |     await page.getByPlaceholder(/ask anything/i).waitFor({ state: "visible", timeout: 10000 });
  24  |   });
  25  | 
  26  |   test("renders initial coach message", async ({ page }) => {
  27  |     await expect(page.getByText(/hey, i'm your coach/i)).toBeVisible();
  28  |   });
  29  | 
  30  |   test("shows message counter", async ({ page }) => {
  31  |     await expect(page.getByText(/5 messages left/i)).toBeVisible();
  32  |   });
  33  | 
  34  |   test("shows suggestion chips on load", async ({ page }) => {
  35  |     await expect(page.getByText(/plan a 30-min workout/i)).toBeVisible();
  36  |     await expect(page.getByText(/missed 3 days/i)).toBeVisible();
  37  |   });
  38  | 
  39  |   test("input is enabled once Turnstile resolves", async ({ page }) => {
  40  |     const input = page.getByPlaceholder(/ask anything/i);
  41  |     await expect(input).toBeEnabled();
  42  |   });
  43  | 
  44  |   test("sends a message and shows response", async ({ page }) => {
  45  |     // Mock the demo API to return a canned response
  46  |     await page.route("/api/demo", async (route) => {
  47  |       await route.fulfill({
  48  |         status: 200,
  49  |         headers: {
  50  |           "Content-Type": "text/plain; charset=utf-8",
  51  |           "X-RateLimit-Remaining": "4",
  52  |         },
  53  |         body: "Train. Don't skip. You'll feel better after.",
  54  |       });
  55  |     });
  56  | 
  57  |     await page.getByPlaceholder(/ask anything/i).fill("Should I train today?");
  58  |     await page.getByRole("button", { name: "Send" }).click();
  59  | 
  60  |     await expect(page.getByText(/should i train today/i)).toBeVisible();
  61  |     await expect(page.getByText(/train\. don't skip/i)).toBeVisible({ timeout: 10000 });
  62  |   });
  63  | 
  64  |   test("decrements message counter after sending", async ({ page }) => {
  65  |     await page.route("/api/demo", (route) =>
  66  |       route.fulfill({
  67  |         status: 200,
  68  |         headers: { "Content-Type": "text/plain; charset=utf-8" },
  69  |         body: "Keep going.",
  70  |       })
  71  |     );
  72  | 
  73  |     await page.getByPlaceholder(/ask anything/i).fill("Hi");
> 74  |     await page.getByRole("button", { name: "Send" }).click();
      |                                                      ^ Error: locator.click: Test timeout of 30000ms exceeded.
  75  | 
  76  |     await expect(page.getByText(/4 messages left/i)).toBeVisible({ timeout: 5000 });
  77  |   });
  78  | 
  79  |   test("shows upgrade CTA when limit is reached", async ({ page }) => {
  80  |     await page.route("/api/demo", (route) =>
  81  |       route.fulfill({
  82  |         status: 429,
  83  |         body: JSON.stringify({ error: "Demo limit reached.", upgrade: true }),
  84  |       })
  85  |     );
  86  | 
  87  |     await page.getByPlaceholder(/ask anything/i).fill("Hi");
  88  |     await page.getByRole("button", { name: "Send" }).click();
  89  | 
  90  |     await expect(page.getByText(/join waitlist for unlimited access/i)).toBeVisible({ timeout: 5000 });
  91  |   });
  92  | 
  93  |   test("disables input after reaching 0 messages", async ({ page }) => {
  94  |     // Exhaust all 5 messages
  95  |     for (let i = 0; i < 5; i++) {
  96  |       await page.route("/api/demo", (route) =>
  97  |         route.fulfill({
  98  |           status: 200,
  99  |           headers: { "Content-Type": "text/plain; charset=utf-8" },
  100 |           body: "Reply.",
  101 |         })
  102 |       );
  103 |       await page.getByPlaceholder(/ask anything/i).fill(`Message ${i + 1}`);
  104 |       await page.getByRole("button", { name: "Send" }).click();
  105 |       await page.getByText("Reply.").last().waitFor({ timeout: 5000 });
  106 |     }
  107 | 
  108 |     await expect(page.getByPlaceholder(/sign up to keep going/i)).toBeDisabled();
  109 |   });
  110 | });
  111 | 
```