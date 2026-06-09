# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: sections.spec.ts >> Stats section >> renders stats section heading
- Location: tests/sections.spec.ts:39:7

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
- generic [active] [ref=e1]:
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
        - img "2,847" [ref=e24]:
          - generic [ref=e26]:
            - generic [ref=e27]: "2"
            - generic [ref=e28]: ","
            - generic [ref=e29]: "8"
            - generic [ref=e30]: "4"
            - generic [ref=e31]: "7"
        - text: on the waitlist
      - heading "Fitness that keeps you coming back." [level=1] [ref=e32]:
        - generic [ref=e33]: Fitness
        - generic [ref=e34]: that
        - generic [ref=e35]: keeps
        - generic [ref=e36]: you
        - generic [ref=e37]: coming
        - generic [ref=e38]: back.
      - paragraph [ref=e39]: An AI coach that adapts to your life, not the other way around. Built for consistency. Trained for results.
      - generic [ref=e43]:
        - textbox "Enter your email address" [ref=e44]
        - button "Claim early access" [ref=e45]
      - paragraph [ref=e46]: Free forever for founding members · No credit card · No spam
    - generic [ref=e48]:
      - generic [ref=e49]:
        - text: Adapts daily
        - generic [ref=e50]: ·
      - generic [ref=e51]:
        - text: No guilt
        - generic [ref=e52]: ·
      - generic [ref=e53]:
        - text: Real coaching
        - generic [ref=e54]: ·
      - generic [ref=e55]:
        - text: Trained on sports science
        - generic [ref=e56]: ·
      - generic [ref=e57]:
        - text: Built for consistency
        - generic [ref=e58]: ·
      - generic [ref=e59]:
        - text: Built for real life
        - generic [ref=e60]: ·
      - generic [ref=e61]:
        - text: Adapts daily
        - generic [ref=e62]: ·
      - generic [ref=e63]:
        - text: No guilt
        - generic [ref=e64]: ·
      - generic [ref=e65]:
        - text: Real coaching
        - generic [ref=e66]: ·
      - generic [ref=e67]:
        - text: Trained on sports science
        - generic [ref=e68]: ·
      - generic [ref=e69]:
        - text: Built for consistency
        - generic [ref=e70]: ·
      - generic [ref=e71]:
        - text: Built for real life
        - generic [ref=e72]: ·
      - generic [ref=e73]:
        - text: Adapts daily
        - generic [ref=e74]: ·
      - generic [ref=e75]:
        - text: No guilt
        - generic [ref=e76]: ·
      - generic [ref=e77]:
        - text: Real coaching
        - generic [ref=e78]: ·
      - generic [ref=e79]:
        - text: Trained on sports science
        - generic [ref=e80]: ·
      - generic [ref=e81]:
        - text: Built for consistency
        - generic [ref=e82]: ·
      - generic [ref=e83]:
        - text: Built for real life
        - generic [ref=e84]: ·
    - generic [ref=e87]:
      - generic [ref=e88]:
        - term [ref=e89]: AI-first
        - definition [ref=e90]: Built around your coach
      - generic [ref=e91]:
        - term [ref=e92]: 3 min
        - definition [ref=e93]: From signup to first plan
      - generic [ref=e94]:
        - term [ref=e95]: 24/7
        - definition [ref=e96]: Coach always on
      - generic [ref=e97]:
        - term [ref=e98]: $0
        - definition [ref=e99]: For founding members
    - generic [ref=e101]:
      - generic [ref=e102]:
        - paragraph [ref=e103]: Try it live
        - heading "Talk to your coach." [level=2] [ref=e104]
        - paragraph [ref=e105]: Five free messages. No signup. Real coaching — same brain as the full app.
      - generic [ref=e106]:
        - generic [ref=e107]:
          - generic [ref=e108]: Coach online
          - generic [ref=e110]: 5 messages left
        - paragraph [ref=e116]: Hey, I'm your coach. Workouts, meals, or those days when motivation just isn't there — I've got you. You've got 5 free messages to start. What's going on?
        - generic [ref=e117]:
          - button "Plan a 30-min workout I can do at home" [disabled] [ref=e118]
          - button "I missed 3 days. How do I get back on track?" [disabled] [ref=e119]
          - button "What should I eat after a heavy leg day?" [disabled] [ref=e120]
          - button "I have low energy today. Should I still train?" [disabled] [ref=e121]
        - generic [ref=e122]:
          - textbox "Ask anything..." [ref=e123]
          - button "Send" [disabled] [ref=e124]
    - generic [ref=e126]:
      - generic [ref=e127]:
        - paragraph [ref=e128]: What it does
        - heading "Less app. More coach." [level=2] [ref=e129]
        - paragraph [ref=e130]: Every feature exists to remove a reason you'd quit.
      - generic [ref=e131]:
        - generic [ref=e134]:
          - generic [ref=e135]:
            - generic [ref=e138]: Coach
            - heading "An AI coach that learns who you are." [level=3] [ref=e139]:
              - text: An AI coach that
              - text: learns who you are.
            - paragraph [ref=e140]: Not a chatbot. Not a template. A coach that remembers your last session, your bad weeks, and your goals — and adjusts the plan in real time.
          - generic [ref=e141]:
            - generic [ref=e143]: I'm tired today. Should I skip?
            - generic [ref=e145]: Don't skip, swap. Let's do a 15-minute mobility flow instead. Streak stays alive, body gets what it needs.
        - generic [ref=e147]:
          - heading "Streaks that forgive" [level=3] [ref=e148]
          - paragraph [ref=e149]: Miss a day. Get a make-up workout. Keep the chain.
        - generic [ref=e173]:
          - heading "Meals that match" [level=3] [ref=e174]
          - paragraph [ref=e175]: Synced to your training load. Today is push day — your protein target is up by 15g.
          - generic [ref=e176]:
            - generic [ref=e177]: 142g
            - generic [ref=e178]: ↑ 15g vs rest day
        - generic [ref=e180]:
          - heading "Weekly debrief" [level=3] [ref=e181]
          - paragraph [ref=e182]: Every Sunday, a short note from your coach. What worked, what didn't, what's next.
          - generic [ref=e183]: "\"You crushed it this week. Let's push the squat 5% next.\""
        - generic [ref=e186]:
          - generic [ref=e187]:
            - heading "Built around your life" [level=3] [ref=e188]
            - paragraph [ref=e189]: Travelling? No equipment? Bad sleep? The plan flexes. The progress doesn't stop.
          - generic [ref=e190]:
            - generic [ref=e191]: Travel
            - generic [ref=e192]: No gym
            - generic [ref=e193]: Low energy
            - generic [ref=e194]: 30 min
            - generic [ref=e195]: Sore
    - generic [ref=e197]:
      - heading "Not another fitness app." [level=2] [ref=e198]
      - generic [ref=e199]:
        - generic [ref=e200]:
          - generic [ref=e202]: Most apps
          - generic [ref=e203]: BUILTCLEAN
        - generic [ref=e204]:
          - generic [ref=e205]: Adapts to your week
          - img [ref=e207]
          - img [ref=e211]
        - generic [ref=e214]:
          - generic [ref=e215]: Forgives missed days
          - img [ref=e217]
          - img [ref=e221]
        - generic [ref=e224]:
          - generic [ref=e225]: Real conversation with coach
          - img [ref=e227]
          - img [ref=e231]
        - generic [ref=e234]:
          - generic [ref=e235]: Meal plans synced to training
          - img [ref=e237]
          - img [ref=e241]
        - generic [ref=e244]:
          - generic [ref=e245]: Generic 12-week plans
          - img [ref=e247]
          - img [ref=e251]
        - generic [ref=e254]:
          - generic [ref=e255]: Guilt-trips when you skip
          - img [ref=e257]
          - img [ref=e261]
    - generic [ref=e265]:
      - generic [ref=e266]:
        - paragraph [ref=e267]: How it works
        - heading "Three steps to built clean." [level=2] [ref=e268]
      - generic [ref=e269]:
        - generic [ref=e271]:
          - generic [ref=e272]: "01"
          - heading "Tell us about yourself" [level=3] [ref=e273]
          - paragraph [ref=e274]: Answer a few quick questions about your goals, schedule, and fitness history. No lengthy onboarding — just what matters.
        - generic [ref=e276]:
          - generic [ref=e277]: "02"
          - heading "Get your first plan" [level=3] [ref=e278]
          - paragraph [ref=e279]: Your AI coach builds a personalized workout and nutrition plan in seconds, calibrated to your real life.
        - generic [ref=e281]:
          - generic [ref=e282]: "03"
          - heading "Show up daily" [level=3] [ref=e283]
          - paragraph [ref=e284]: Check in each day. Log workouts, meals, or just your mood. The coach adapts in real time.
        - generic [ref=e286]:
          - generic [ref=e287]: "04"
          - heading "Watch habits form" [level=3] [ref=e288]
          - paragraph [ref=e289]: After 30 days you'll see the data — and feel the difference. Consistency compounds.
    - generic [ref=e291]:
      - generic [ref=e292]:
        - paragraph [ref=e293]: Early feedback
        - heading "People are excited." [level=2] [ref=e294]
      - generic [ref=e295]:
        - generic [ref=e296]:
          - img [ref=e297]
          - paragraph [ref=e299]: I've tried every fitness app. The problem was always me as I'd miss a few days and just give up. Builtclean is the first one that actually adjusts when life gets in the way instead of making me feel like a failure.
          - generic [ref=e300]:
            - generic [ref=e301]: DB
            - generic [ref=e302]:
              - paragraph [ref=e303]: Dhruv B.
              - paragraph [ref=e304]: Early beta tester
        - generic [ref=e305]:
          - img [ref=e306]
          - paragraph [ref=e308]: I didn't expect the meal planning to be this good. It's not just macro targets, it actually suggests meals I'd eat and shifts around my training days. Finally feels like it was built for a real person.
          - generic [ref=e309]:
            - generic [ref=e310]: VS
            - generic [ref=e311]:
              - paragraph [ref=e312]: Varun S.
              - paragraph [ref=e313]: Waitlist member
        - generic [ref=e314]:
          - img [ref=e315]
          - paragraph [ref=e317]: Most fitness apps feel like they were designed to make you feel guilty. This one feels like it's actually in your corner. It's a small difference but it changes everything about whether you keep showing up.
          - generic [ref=e318]:
            - generic [ref=e319]: DS
            - generic [ref=e320]:
              - paragraph [ref=e321]: Darpan S.
              - paragraph [ref=e322]: Early beta tester
    - generic [ref=e324]:
      - heading "Common questions." [level=2] [ref=e325]
      - generic [ref=e326]:
        - generic [ref=e327]:
          - button "When does it launch?" [ref=e328]:
            - generic [ref=e329]: When does it launch?
            - img [ref=e330]
          - generic [ref=e333]: We're rolling out to founding members in waves starting Q1 2026. Joining the waitlist locks in early access + free forever pricing.
        - button "How is this different from a fitness app with AI features?" [ref=e335]:
          - generic [ref=e336]: How is this different from a fitness app with AI features?
          - img [ref=e337]
        - button "Do I need equipment or a gym?" [ref=e340]:
          - generic [ref=e341]: Do I need equipment or a gym?
          - img [ref=e342]
        - button "Will it actually keep me consistent?" [ref=e345]:
          - generic [ref=e346]: Will it actually keep me consistent?
          - img [ref=e347]
        - button "What does it cost?" [ref=e350]:
          - generic [ref=e351]: What does it cost?
          - img [ref=e352]
        - button "Is my data private?" [ref=e355]:
          - generic [ref=e356]: Is my data private?
          - img [ref=e357]
    - generic [ref=e360]:
      - heading "Ready to build something clean?" [level=2] [ref=e361]:
        - text: Ready to build
        - text: something clean?
      - paragraph [ref=e362]: Join the waitlist. Be first. It's free.
      - generic [ref=e366]:
        - textbox "Enter your email address" [ref=e367]
        - button "Claim your spot" [ref=e368]
    - generic [ref=e370]:
      - link "BUILTCLEAN" [ref=e371]:
        - /url: /
        - img "BUILTCLEAN" [ref=e372]
      - navigation [ref=e373]:
        - link "Privacy" [ref=e374]:
          - /url: /privacy
        - link "Terms" [ref=e375]:
          - /url: /terms
        - link "Contact" [ref=e376]:
          - /url: mailto:builtcleanai@gmail.com
      - generic [ref=e377]:
        - link "Built Clean on Instagram" [ref=e378]:
          - /url: https://instagram.com/builtclean.ai
          - img [ref=e379]
        - generic [ref=e383]: © 2025 Built Clean. All rights reserved.
  - button "Open Next.js Dev Tools" [ref=e389] [cursor=pointer]:
    - img [ref=e390]
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | test.describe("Hero section", () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     await page.goto("/");
  6   |   });
  7   | 
  8   |   test("renders main heading", async ({ page }) => {
  9   |     await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  10  |   });
  11  | 
  12  |   test("renders waitlist form in hero", async ({ page }) => {
  13  |     await expect(page.getByPlaceholder(/enter your email/i).first()).toBeVisible();
  14  |     await expect(page.getByRole("button", { name: /claim early access/i })).toBeVisible();
  15  |   });
  16  | 
  17  |   test("renders live user counter", async ({ page }) => {
  18  |     await expect(page.getByText(/on the waitlist/i).first()).toBeVisible();
  19  |   });
  20  | });
  21  | 
  22  | test.describe("Marquee section", () => {
  23  |   test.beforeEach(async ({ page }) => {
  24  |     await page.goto("/");
  25  |   });
  26  | 
  27  |   test("renders marquee with feature pills", async ({ page }) => {
  28  |     await expect(page.getByText(/adapts daily/i).first()).toBeVisible();
  29  |     await expect(page.getByText(/no guilt/i).first()).toBeVisible();
  30  |   });
  31  | });
  32  | 
  33  | test.describe("Stats section", () => {
  34  |   test.beforeEach(async ({ page }) => {
> 35  |     await page.goto("/");
      |                ^ Error: page.goto: Test timeout of 30000ms exceeded.
  36  |     await page.locator("text=Every feature exists to remove").scrollIntoViewIfNeeded();
  37  |   });
  38  | 
  39  |   test("renders stats section heading", async ({ page }) => {
  40  |     await expect(page.getByText(/every feature exists to remove a reason/i)).toBeVisible();
  41  |   });
  42  | 
  43  |   test("renders stat labels", async ({ page }) => {
  44  |     // Check stat labels are visible after scroll-trigger
  45  |     await expect(page.getByText(/workouts logged/i).or(page.getByText(/app consistency/i)).or(page.getByText(/founding members/i)).first()).toBeVisible({ timeout: 5000 });
  46  |   });
  47  | });
  48  | 
  49  | test.describe("Features section", () => {
  50  |   test.beforeEach(async ({ page }) => {
  51  |     await page.goto("/");
  52  |     await page.locator("#features").scrollIntoViewIfNeeded();
  53  |   });
  54  | 
  55  |   test("renders features section", async ({ page }) => {
  56  |     await expect(page.locator("#features")).toBeVisible();
  57  |   });
  58  | 
  59  |   test("renders bento tile headings", async ({ page }) => {
  60  |     await expect(page.getByText(/streaks that forgive/i)).toBeVisible({ timeout: 5000 });
  61  |     await expect(page.getByText(/meals that match/i)).toBeVisible({ timeout: 5000 });
  62  |   });
  63  | 
  64  |   test("renders weekly debrief tile", async ({ page }) => {
  65  |     await expect(page.getByText(/weekly debrief/i)).toBeVisible({ timeout: 5000 });
  66  |   });
  67  | });
  68  | 
  69  | test.describe("Comparison section", () => {
  70  |   test.beforeEach(async ({ page }) => {
  71  |     await page.goto("/");
  72  |     await page.getByText("Not another fitness app.").scrollIntoViewIfNeeded();
  73  |   });
  74  | 
  75  |   test("renders comparison heading", async ({ page }) => {
  76  |     await expect(page.getByText("Not another fitness app.")).toBeVisible();
  77  |   });
  78  | 
  79  |   test("renders column headers", async ({ page }) => {
  80  |     await expect(page.getByText("Most apps")).toBeVisible();
  81  |     await expect(page.getByText("BUILTCLEAN").first()).toBeVisible();
  82  |   });
  83  | 
  84  |   test("renders comparison rows", async ({ page }) => {
  85  |     await expect(page.getByText("Adapts to your week")).toBeVisible();
  86  |     await expect(page.getByText("Forgives missed days")).toBeVisible();
  87  |     await expect(page.getByText("Real conversation with coach")).toBeVisible();
  88  |   });
  89  | });
  90  | 
  91  | test.describe("CTA section", () => {
  92  |   test.beforeEach(async ({ page }) => {
  93  |     await page.goto("/");
  94  |     await page.getByText("Ready to build").scrollIntoViewIfNeeded();
  95  |   });
  96  | 
  97  |   test("renders CTA heading", async ({ page }) => {
  98  |     await expect(page.getByText(/ready to build/i)).toBeVisible();
  99  |   });
  100 | 
  101 |   test("renders sub-heading", async ({ page }) => {
  102 |     await expect(page.getByText(/join the waitlist. be first. it's free/i)).toBeVisible();
  103 |   });
  104 | 
  105 |   test("renders waitlist form", async ({ page }) => {
  106 |     await expect(page.getByRole("button", { name: /claim your spot/i })).toBeVisible();
  107 |   });
  108 | 
  109 |   test("CTA form submits successfully", async ({ page }) => {
  110 |     await page.route("/api/waitlist", (route) =>
  111 |       route.fulfill({
  112 |         status: 201,
  113 |         body: JSON.stringify({ success: true, message: "You're on the list!" }),
  114 |       })
  115 |     );
  116 |     await page.getByPlaceholder(/enter your email/i).last().fill("cta@example.com");
  117 |     await page.getByRole("button", { name: /claim your spot/i }).click();
  118 |     await expect(page.getByText(/you're on the list/i).last()).toBeVisible({ timeout: 5000 });
  119 |   });
  120 | });
  121 | 
```