# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: demo.spec.ts >> Live demo chat >> shows suggestion chips on load
- Location: tests/demo.spec.ts:34:7

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "http://localhost:3000/", waiting until "load"

```

# Page snapshot

```yaml
- main [ref=e2]:
  - generic [ref=e3]:
    - generic [ref=e5]:
      - link "BUILTCLEAN" [ref=e6] [cursor=pointer]:
        - /url: /
        - img "BUILTCLEAN" [ref=e7]
      - navigation [ref=e8]:
        - link "Features" [ref=e9] [cursor=pointer]:
          - /url: "#features"
        - link "How it works" [ref=e10] [cursor=pointer]:
          - /url: "#how-it-works"
        - link "About" [ref=e11] [cursor=pointer]:
          - /url: "#about"
        - link "Join waitlist" [ref=e12] [cursor=pointer]:
          - /url: "#waitlist"
      - button "Open menu" [ref=e13]
    - navigation [ref=e14]:
      - link "Features" [ref=e15] [cursor=pointer]:
        - /url: "#features"
      - link "How it works" [ref=e16] [cursor=pointer]:
        - /url: "#how-it-works"
      - link "About" [ref=e17] [cursor=pointer]:
        - /url: "#about"
      - link "Join waitlist" [ref=e18] [cursor=pointer]:
        - /url: "#waitlist"
  - generic [ref=e20]:
    - generic [ref=e21]:
      - img "2,847" [ref=e23]:
        - generic [ref=e25]:
          - generic [ref=e26]: "2"
          - generic [ref=e27]: ","
          - generic [ref=e28]: "8"
          - generic [ref=e29]: "4"
          - generic [ref=e30]: "7"
      - text: on the waitlist
    - heading "Fitnessthatkeeps youcomingback." [level=1] [ref=e31]:
      - text: Fitnessthatkeeps
      - text: youcomingback.
    - paragraph [ref=e32]: An AI coach that adapts to your life, not the other way around. Built for consistency. Trained for results.
    - generic [ref=e36]:
      - textbox "Enter your email address" [ref=e37]
      - button "Claim early access" [ref=e38]
    - paragraph [ref=e39]: Free forever for founding members · No credit card · No spam
  - generic [ref=e41]:
    - generic [ref=e42]: Adapts daily·
    - generic [ref=e43]: No guilt·
    - generic [ref=e44]: Real coaching·
    - generic [ref=e45]: Trained on sports science·
    - generic [ref=e46]: Built for consistency·
    - generic [ref=e47]: Built for real life·
    - generic [ref=e48]: Adapts daily·
    - generic [ref=e49]: No guilt·
    - generic [ref=e50]: Real coaching·
    - generic [ref=e51]: Trained on sports science·
    - generic [ref=e52]: Built for consistency·
    - generic [ref=e53]: Built for real life·
    - generic [ref=e54]: Adapts daily·
    - generic [ref=e55]: No guilt·
    - generic [ref=e56]: Real coaching·
    - generic [ref=e57]: Trained on sports science·
    - generic [ref=e58]: Built for consistency·
    - generic [ref=e59]: Built for real life·
  - generic [ref=e62]:
    - generic [ref=e63]:
      - term [ref=e64]: AI-first
      - definition [ref=e65]: Built around your coach
    - generic [ref=e66]:
      - term [ref=e67]: 3 min
      - definition [ref=e68]: From signup to first plan
    - generic [ref=e69]:
      - term [ref=e70]: 24/7
      - definition [ref=e71]: Coach always on
    - generic [ref=e72]:
      - term [ref=e73]: $0
      - definition [ref=e74]: For founding members
  - generic [ref=e76]:
    - generic [ref=e77]:
      - paragraph [ref=e78]: Try it live
      - heading "Talk to your coach." [level=2] [ref=e79]
      - paragraph [ref=e80]: Five free messages. No signup. Real coaching — same brain as the full app.
    - generic [ref=e81]:
      - generic [ref=e82]:
        - generic [ref=e83]: Coach online
        - generic [ref=e84]: 5 messages left
      - paragraph [ref=e90]: Hey, I'm your coach. Workouts, meals, or those days when motivation just isn't there — I've got you. You've got 5 free messages to start. What's going on?
      - generic [ref=e91]:
        - button "Plan a 30-min workout I can do at home" [disabled] [ref=e92]
        - button "I missed 3 days. How do I get back on track?" [disabled] [ref=e93]
        - button "What should I eat after a heavy leg day?" [disabled] [ref=e94]
        - button "I have low energy today. Should I still train?" [disabled] [ref=e95]
      - generic [ref=e96]:
        - textbox "Ask anything..." [ref=e97]
        - button "Send" [disabled] [ref=e98]
  - generic [ref=e100]:
    - generic [ref=e101]:
      - paragraph [ref=e102]: What it does
      - heading "Less app. More coach." [level=2] [ref=e103]
      - paragraph [ref=e104]: Every feature exists to remove a reason you'd quit.
    - generic [ref=e105]:
      - generic [ref=e108]:
        - generic [ref=e109]:
          - generic [ref=e110]: Coach
          - heading "An AI coach that learns who you are." [level=3] [ref=e111]:
            - text: An AI coach that
            - text: learns who you are.
          - paragraph [ref=e112]: Not a chatbot. Not a template. A coach that remembers your last session, your bad weeks, and your goals — and adjusts the plan in real time.
        - generic [ref=e113]:
          - generic [ref=e115]: I'm tired today. Should I skip?
          - generic [ref=e117]: Don't skip, swap. Let's do a 15-minute mobility flow instead. Streak stays alive, body gets what it needs.
      - generic [ref=e119]:
        - heading "Streaks that forgive" [level=3] [ref=e120]
        - paragraph [ref=e121]: Miss a day. Get a make-up workout. Keep the chain.
      - generic [ref=e123]:
        - heading "Meals that match" [level=3] [ref=e124]
        - paragraph [ref=e125]: Synced to your training load. Today is push day — your protein target is up by 15g.
        - generic [ref=e126]: 142g↑ 15g vs rest day
      - generic [ref=e128]:
        - heading "Weekly debrief" [level=3] [ref=e129]
        - paragraph [ref=e130]: Every Sunday, a short note from your coach. What worked, what didn't, what's next.
        - generic [ref=e131]: "\"You crushed it this week. Let's push the squat 5% next.\""
      - generic [ref=e134]:
        - generic [ref=e135]:
          - heading "Built around your life" [level=3] [ref=e136]
          - paragraph [ref=e137]: Travelling? No equipment? Bad sleep? The plan flexes. The progress doesn't stop.
        - generic [ref=e138]: TravelNo gymLow energy30 minSore
  - generic [ref=e140]:
    - heading "Not another fitness app." [level=2] [ref=e141]
    - generic [ref=e142]:
      - generic [ref=e143]: Most appsBUILTCLEAN
      - generic [ref=e144]:
        - text: Adapts to your week
        - img [ref=e146]
        - img [ref=e150]
      - generic [ref=e153]:
        - text: Forgives missed days
        - img [ref=e155]
        - img [ref=e159]
      - generic [ref=e162]:
        - text: Real conversation with coach
        - img [ref=e164]
        - img [ref=e168]
      - generic [ref=e171]:
        - text: Meal plans synced to training
        - img [ref=e173]
        - img [ref=e177]
      - generic [ref=e180]:
        - text: Generic 12-week plans
        - img [ref=e182]
        - img [ref=e186]
      - generic [ref=e189]:
        - text: Guilt-trips when you skip
        - img [ref=e191]
        - img [ref=e195]
  - generic [ref=e199]:
    - generic [ref=e200]:
      - paragraph [ref=e201]: How it works
      - heading "Three steps to built clean." [level=2] [ref=e202]:
        - text: Three steps to
        - text: built clean.
    - generic [ref=e203]:
      - generic [ref=e205]:
        - text: "01"
        - heading "Tell us about yourself" [level=3] [ref=e206]
        - paragraph [ref=e207]: Answer a few quick questions about your goals, schedule, and fitness history. No lengthy onboarding — just what matters.
      - generic [ref=e209]:
        - text: "02"
        - heading "Get your first plan" [level=3] [ref=e210]
        - paragraph [ref=e211]: Your AI coach builds a personalized workout and nutrition plan in seconds, calibrated to your real life.
      - generic [ref=e213]:
        - text: "03"
        - heading "Show up daily" [level=3] [ref=e214]
        - paragraph [ref=e215]: Check in each day. Log workouts, meals, or just your mood. The coach adapts in real time.
      - generic [ref=e217]:
        - text: "04"
        - heading "Watch habits form" [level=3] [ref=e218]
        - paragraph [ref=e219]: After 30 days you'll see the data — and feel the difference. Consistency compounds.
  - generic [ref=e221]:
    - generic [ref=e222]:
      - paragraph [ref=e223]: Early feedback
      - heading "People are excited." [level=2] [ref=e224]
    - generic [ref=e225]:
      - generic [ref=e226]:
        - img [ref=e227]
        - paragraph [ref=e229]: I've tried every fitness app. The problem was always me as I'd miss a few days and just give up. Builtclean is the first one that actually adjusts when life gets in the way instead of making me feel like a failure.
        - generic [ref=e230]:
          - generic [ref=e231]: DB
          - generic [ref=e232]:
            - paragraph [ref=e233]: Dhruv B.
            - paragraph [ref=e234]: Early beta tester
      - generic [ref=e235]:
        - img [ref=e236]
        - paragraph [ref=e238]: I didn't expect the meal planning to be this good. It's not just macro targets, it actually suggests meals I'd eat and shifts around my training days. Finally feels like it was built for a real person.
        - generic [ref=e239]:
          - generic [ref=e240]: VS
          - generic [ref=e241]:
            - paragraph [ref=e242]: Varun S.
            - paragraph [ref=e243]: Waitlist member
      - generic [ref=e244]:
        - img [ref=e245]
        - paragraph [ref=e247]: Most fitness apps feel like they were designed to make you feel guilty. This one feels like it's actually in your corner. It's a small difference but it changes everything about whether you keep showing up.
        - generic [ref=e248]:
          - generic [ref=e249]: DS
          - generic [ref=e250]:
            - paragraph [ref=e251]: Darpan S.
            - paragraph [ref=e252]: Early beta tester
  - generic [ref=e254]:
    - heading "Common questions." [level=2] [ref=e255]
    - generic [ref=e256]:
      - generic [ref=e257]:
        - button "When does it launch?" [ref=e258]:
          - text: When does it launch?
          - img [ref=e259]
        - generic [ref=e262]: We're rolling out to founding members in waves starting Q1 2026. Joining the waitlist locks in early access + free forever pricing.
      - button "How is this different from a fitness app with AI features?" [ref=e264]:
        - text: How is this different from a fitness app with AI features?
        - img [ref=e265]
      - button "Do I need equipment or a gym?" [ref=e268]:
        - text: Do I need equipment or a gym?
        - img [ref=e269]
      - button "Will it actually keep me consistent?" [ref=e272]:
        - text: Will it actually keep me consistent?
        - img [ref=e273]
      - button "What does it cost?" [ref=e276]:
        - text: What does it cost?
        - img [ref=e277]
      - button "Is my data private?" [ref=e280]:
        - text: Is my data private?
        - img [ref=e281]
  - generic [ref=e284]:
    - heading "Ready to build something clean?" [level=2] [ref=e285]:
      - text: Ready to build
      - text: something clean?
    - paragraph [ref=e286]: Join the waitlist. Be first. It's free.
    - generic [ref=e290]:
      - textbox "Enter your email address" [ref=e291]
      - button "Claim your spot" [ref=e292]
  - generic [ref=e294]:
    - link "BUILTCLEAN" [ref=e295] [cursor=pointer]:
      - /url: /
      - img "BUILTCLEAN" [ref=e296]
    - navigation [ref=e297]:
      - link "Privacy" [ref=e298] [cursor=pointer]:
        - /url: /privacy
      - link "Terms" [ref=e299] [cursor=pointer]:
        - /url: /terms
      - link "Contact" [ref=e300] [cursor=pointer]:
        - /url: mailto:builtcleanai@gmail.com
    - generic [ref=e301]:
      - link "Built Clean on Instagram" [ref=e302] [cursor=pointer]:
        - /url: https://instagram.com/builtclean.ai
        - img [ref=e303]
      - text: © 2025 Built Clean. All rights reserved.
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
> 20  |     await page.goto("/");
      |                ^ Error: page.goto: Test timeout of 30000ms exceeded.
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
  74  |     await page.getByRole("button", { name: "Send" }).click();
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