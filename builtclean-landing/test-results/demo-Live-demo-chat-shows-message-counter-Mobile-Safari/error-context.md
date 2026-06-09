# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: demo.spec.ts >> Live demo chat >> shows message counter
- Location: tests/demo.spec.ts:30:7

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "http://localhost:3000/", waiting until "load"

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