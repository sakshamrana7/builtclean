# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: demo.spec.ts >> Live demo chat >> shows upgrade CTA when limit is reached
- Location: tests/demo.spec.ts:79:7

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
  - generic [ref=e14]:
    - generic [ref=e15]:
      - img "2,847" [ref=e20]:
        - generic [ref=e22]:
          - generic [ref=e23]: "2"
          - generic [ref=e24]: ","
          - generic [ref=e25]: "8"
          - generic [ref=e26]: "4"
          - generic [ref=e27]: "7"
      - text: on the waitlist
    - heading "Fitness that keeps you coming back." [level=1] [ref=e28]:
      - generic [ref=e29]: Fitness
      - generic [ref=e30]: that
      - generic [ref=e31]: keeps
      - generic [ref=e32]: you
      - generic [ref=e33]: coming
      - generic [ref=e34]: back.
    - paragraph [ref=e35]: An AI coach that adapts to your life, not the other way around. Built for consistency. Trained for results.
    - generic [ref=e39]:
      - textbox "Enter your email address" [ref=e40]
      - button "Claim early access" [ref=e41]
    - paragraph [ref=e42]: Free forever for founding members · No credit card · No spam
  - generic [ref=e44]:
    - generic [ref=e45]:
      - text: Adapts daily
      - generic [ref=e46]: ·
    - generic [ref=e47]:
      - text: No guilt
      - generic [ref=e48]: ·
    - generic [ref=e49]:
      - text: Real coaching
      - generic [ref=e50]: ·
    - generic [ref=e51]:
      - text: Trained on sports science
      - generic [ref=e52]: ·
    - generic [ref=e53]:
      - text: Built for consistency
      - generic [ref=e54]: ·
    - generic [ref=e55]:
      - text: Built for real life
      - generic [ref=e56]: ·
    - generic [ref=e57]:
      - text: Adapts daily
      - generic [ref=e58]: ·
    - generic [ref=e59]:
      - text: No guilt
      - generic [ref=e60]: ·
    - generic [ref=e61]:
      - text: Real coaching
      - generic [ref=e62]: ·
    - generic [ref=e63]:
      - text: Trained on sports science
      - generic [ref=e64]: ·
    - generic [ref=e65]:
      - text: Built for consistency
      - generic [ref=e66]: ·
    - generic [ref=e67]:
      - text: Built for real life
      - generic [ref=e68]: ·
    - generic [ref=e69]:
      - text: Adapts daily
      - generic [ref=e70]: ·
    - generic [ref=e71]:
      - text: No guilt
      - generic [ref=e72]: ·
    - generic [ref=e73]:
      - text: Real coaching
      - generic [ref=e74]: ·
    - generic [ref=e75]:
      - text: Trained on sports science
      - generic [ref=e76]: ·
    - generic [ref=e77]:
      - text: Built for consistency
      - generic [ref=e78]: ·
    - generic [ref=e79]:
      - text: Built for real life
      - generic [ref=e80]: ·
  - generic [ref=e83]:
    - generic [ref=e84]:
      - term [ref=e85]: AI-first
      - definition [ref=e86]: Built around your coach
    - generic [ref=e87]:
      - term [ref=e88]: 3 min
      - definition [ref=e89]: From signup to first plan
    - generic [ref=e90]:
      - term [ref=e91]: 24/7
      - definition [ref=e92]: Coach always on
    - generic [ref=e93]:
      - term [ref=e94]: $0
      - definition [ref=e95]: For founding members
  - generic [ref=e97]:
    - generic [ref=e98]:
      - paragraph [ref=e99]: Try it live
      - heading "Talk to your coach." [level=2] [ref=e100]
      - paragraph [ref=e101]: Five free messages. No signup. Real coaching — same brain as the full app.
    - generic [ref=e102]:
      - generic [ref=e103]:
        - generic [ref=e104]: Coach online
        - generic [ref=e106]: 5 messages left
      - paragraph [ref=e112]: Hey, I'm your coach. Workouts, meals, or those days when motivation just isn't there — I've got you. You've got 5 free messages to start. What's going on?
      - generic [ref=e113]:
        - button "Plan a 30-min workout I can do at home" [disabled] [ref=e114]
        - button "I missed 3 days. How do I get back on track?" [disabled] [ref=e115]
        - button "What should I eat after a heavy leg day?" [disabled] [ref=e116]
        - button "I have low energy today. Should I still train?" [disabled] [ref=e117]
      - generic [ref=e118]:
        - textbox "Ask anything..." [ref=e119]
        - button "Send" [disabled] [ref=e120]
  - generic [ref=e122]:
    - generic [ref=e123]:
      - paragraph [ref=e124]: What it does
      - heading "Less app. More coach." [level=2] [ref=e125]
      - paragraph [ref=e126]: Every feature exists to remove a reason you'd quit.
    - generic [ref=e127]:
      - generic [ref=e130]:
        - generic [ref=e131]:
          - generic [ref=e134]: Coach
          - heading "An AI coach that learns who you are." [level=3] [ref=e135]:
            - text: An AI coach that
            - text: learns who you are.
          - paragraph [ref=e136]: Not a chatbot. Not a template. A coach that remembers your last session, your bad weeks, and your goals — and adjusts the plan in real time.
        - generic [ref=e137]:
          - generic [ref=e139]: I'm tired today. Should I skip?
          - generic [ref=e141]: Don't skip, swap. Let's do a 15-minute mobility flow instead. Streak stays alive, body gets what it needs.
      - generic [ref=e143]:
        - heading "Streaks that forgive" [level=3] [ref=e144]
        - paragraph [ref=e145]: Miss a day. Get a make-up workout. Keep the chain.
      - generic [ref=e169]:
        - heading "Meals that match" [level=3] [ref=e170]
        - paragraph [ref=e171]: Synced to your training load. Today is push day — your protein target is up by 15g.
        - generic [ref=e172]:
          - generic [ref=e173]: 142g
          - generic [ref=e174]: ↑ 15g vs rest day
      - generic [ref=e176]:
        - heading "Weekly debrief" [level=3] [ref=e177]
        - paragraph [ref=e178]: Every Sunday, a short note from your coach. What worked, what didn't, what's next.
        - generic [ref=e179]: "\"You crushed it this week. Let's push the squat 5% next.\""
      - generic [ref=e182]:
        - generic [ref=e183]:
          - heading "Built around your life" [level=3] [ref=e184]
          - paragraph [ref=e185]: Travelling? No equipment? Bad sleep? The plan flexes. The progress doesn't stop.
        - generic [ref=e186]:
          - generic [ref=e187]: Travel
          - generic [ref=e188]: No gym
          - generic [ref=e189]: Low energy
          - generic [ref=e190]: 30 min
          - generic [ref=e191]: Sore
  - generic [ref=e193]:
    - heading "Not another fitness app." [level=2] [ref=e194]
    - generic [ref=e195]:
      - generic [ref=e196]:
        - generic [ref=e198]: Most apps
        - generic [ref=e199]: BUILTCLEAN
      - generic [ref=e200]:
        - generic [ref=e201]: Adapts to your week
        - img [ref=e203]
        - img [ref=e207]
      - generic [ref=e210]:
        - generic [ref=e211]: Forgives missed days
        - img [ref=e213]
        - img [ref=e217]
      - generic [ref=e220]:
        - generic [ref=e221]: Real conversation with coach
        - img [ref=e223]
        - img [ref=e227]
      - generic [ref=e230]:
        - generic [ref=e231]: Meal plans synced to training
        - img [ref=e233]
        - img [ref=e237]
      - generic [ref=e240]:
        - generic [ref=e241]: Generic 12-week plans
        - img [ref=e243]
        - img [ref=e247]
      - generic [ref=e250]:
        - generic [ref=e251]: Guilt-trips when you skip
        - img [ref=e253]
        - img [ref=e257]
  - generic [ref=e261]:
    - generic [ref=e262]:
      - paragraph [ref=e263]: How it works
      - heading "Three steps to built clean." [level=2] [ref=e264]:
        - text: Three steps to
        - text: built clean.
    - generic [ref=e265]:
      - generic [ref=e267]:
        - generic [ref=e268]: "01"
        - heading "Tell us about yourself" [level=3] [ref=e269]
        - paragraph [ref=e270]: Answer a few quick questions about your goals, schedule, and fitness history. No lengthy onboarding — just what matters.
      - generic [ref=e272]:
        - generic [ref=e273]: "02"
        - heading "Get your first plan" [level=3] [ref=e274]
        - paragraph [ref=e275]: Your AI coach builds a personalized workout and nutrition plan in seconds, calibrated to your real life.
      - generic [ref=e277]:
        - generic [ref=e278]: "03"
        - heading "Show up daily" [level=3] [ref=e279]
        - paragraph [ref=e280]: Check in each day. Log workouts, meals, or just your mood. The coach adapts in real time.
      - generic [ref=e282]:
        - generic [ref=e283]: "04"
        - heading "Watch habits form" [level=3] [ref=e284]
        - paragraph [ref=e285]: After 30 days you'll see the data — and feel the difference. Consistency compounds.
  - generic [ref=e287]:
    - generic [ref=e288]:
      - paragraph [ref=e289]: Early feedback
      - heading "People are excited." [level=2] [ref=e290]
    - generic [ref=e291]:
      - generic [ref=e292]:
        - img [ref=e293]
        - paragraph [ref=e295]: I've tried every fitness app. The problem was always me as I'd miss a few days and just give up. Builtclean is the first one that actually adjusts when life gets in the way instead of making me feel like a failure.
        - generic [ref=e296]:
          - generic [ref=e297]: DB
          - generic [ref=e298]:
            - paragraph [ref=e299]: Dhruv B.
            - paragraph [ref=e300]: Early beta tester
      - generic [ref=e301]:
        - img [ref=e302]
        - paragraph [ref=e304]: I didn't expect the meal planning to be this good. It's not just macro targets, it actually suggests meals I'd eat and shifts around my training days. Finally feels like it was built for a real person.
        - generic [ref=e305]:
          - generic [ref=e306]: VS
          - generic [ref=e307]:
            - paragraph [ref=e308]: Varun S.
            - paragraph [ref=e309]: Waitlist member
      - generic [ref=e310]:
        - img [ref=e311]
        - paragraph [ref=e313]: Most fitness apps feel like they were designed to make you feel guilty. This one feels like it's actually in your corner. It's a small difference but it changes everything about whether you keep showing up.
        - generic [ref=e314]:
          - generic [ref=e315]: DS
          - generic [ref=e316]:
            - paragraph [ref=e317]: Darpan S.
            - paragraph [ref=e318]: Early beta tester
  - generic [ref=e320]:
    - heading "Common questions." [level=2] [ref=e321]
    - generic [ref=e322]:
      - generic [ref=e323]:
        - button "When does it launch?" [ref=e324]:
          - generic [ref=e325]: When does it launch?
          - img [ref=e326]
        - generic [ref=e329]: We're rolling out to founding members in waves starting Q1 2026. Joining the waitlist locks in early access + free forever pricing.
      - button "How is this different from a fitness app with AI features?" [ref=e331]:
        - generic [ref=e332]: How is this different from a fitness app with AI features?
        - img [ref=e333]
      - button "Do I need equipment or a gym?" [ref=e336]:
        - generic [ref=e337]: Do I need equipment or a gym?
        - img [ref=e338]
      - button "Will it actually keep me consistent?" [ref=e341]:
        - generic [ref=e342]: Will it actually keep me consistent?
        - img [ref=e343]
      - button "What does it cost?" [ref=e346]:
        - generic [ref=e347]: What does it cost?
        - img [ref=e348]
      - button "Is my data private?" [ref=e351]:
        - generic [ref=e352]: Is my data private?
        - img [ref=e353]
  - generic [ref=e356]:
    - heading "Ready to build something clean?" [level=2] [ref=e357]:
      - text: Ready to build
      - text: something clean?
    - paragraph [ref=e358]: Join the waitlist. Be first. It's free.
    - generic [ref=e362]:
      - textbox "Enter your email address" [ref=e363]
      - button "Claim your spot" [ref=e364]
  - generic [ref=e366]:
    - link "BUILTCLEAN" [ref=e367] [cursor=pointer]:
      - /url: /
      - img "BUILTCLEAN" [ref=e368]
    - navigation [ref=e369]:
      - link "Privacy" [ref=e370] [cursor=pointer]:
        - /url: /privacy
      - link "Terms" [ref=e371] [cursor=pointer]:
        - /url: /terms
      - link "Contact" [ref=e372] [cursor=pointer]:
        - /url: mailto:builtcleanai@gmail.com
    - generic [ref=e373]:
      - link "Built Clean on Instagram" [ref=e374] [cursor=pointer]:
        - /url: https://instagram.com/builtclean.ai
        - img [ref=e375]
      - generic [ref=e379]: © 2025 Built Clean. All rights reserved.
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