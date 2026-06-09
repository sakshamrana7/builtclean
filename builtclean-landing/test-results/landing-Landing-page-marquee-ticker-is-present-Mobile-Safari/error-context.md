# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: landing.spec.ts >> Landing page >> marquee ticker is present
- Location: tests/landing.spec.ts:28:7

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
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Landing page", () => {
  4  |   test.beforeEach(async ({ page }) => {
> 5  |     await page.goto("/");
     |                ^ Error: page.goto: Test timeout of 30000ms exceeded.
  6  |   });
  7  | 
  8  |   test("renders all key sections", async ({ page }) => {
  9  |     await expect(page.getByRole("heading", { name: /fitness that keeps/i })).toBeVisible();
  10 |     await expect(page.getByText(/less app. more coach/i)).toBeVisible();
  11 |     await expect(page.getByText(/talk to your coach/i)).toBeVisible();
  12 |     await expect(page.getByText(/not another fitness app/i)).toBeVisible();
  13 |     await expect(page.getByText(/common questions/i)).toBeVisible();
  14 |   });
  15 | 
  16 |   test("navbar is visible and sticky", async ({ page }) => {
  17 |     const navbar = page.locator("header");
  18 |     await expect(navbar).toBeVisible();
  19 |     await page.evaluate(() => window.scrollBy(0, 400));
  20 |     await expect(navbar).toBeVisible();
  21 |   });
  22 | 
  23 |   test("navbar join waitlist button scrolls to hero form", async ({ page }) => {
  24 |     await page.getByRole("link", { name: /join waitlist/i }).first().click();
  25 |     await expect(page.locator("#waitlist")).toBeInViewport({ timeout: 5000 });
  26 |   });
  27 | 
  28 |   test("marquee ticker is present", async ({ page }) => {
  29 |     await expect(page.getByText(/adapts daily/i).first()).toBeVisible();
  30 |   });
  31 | 
  32 |   test("stats section shows key values", async ({ page }) => {
  33 |     await page.locator("section").filter({ hasText: "Built around your coach" }).scrollIntoViewIfNeeded();
  34 |     await expect(page.getByText(/built around your coach/i)).toBeVisible();
  35 |     await expect(page.getByText(/for founding members/i).first()).toBeVisible();
  36 |   });
  37 | });
  38 | 
```