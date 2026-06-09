# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: faq.spec.ts >> FAQ accordion >> first FAQ item is open by default
- Location: tests/faq.spec.ts:9:7

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
  3  | test.describe("FAQ accordion", () => {
  4  |   test.beforeEach(async ({ page }) => {
> 5  |     await page.goto("/");
     |                ^ Error: page.goto: Test timeout of 30000ms exceeded.
  6  |     await page.getByText("Common questions.").scrollIntoViewIfNeeded();
  7  |   });
  8  | 
  9  |   test("first FAQ item is open by default", async ({ page }) => {
  10 |     await expect(page.getByText(/rolling out to founding members/i)).toBeVisible();
  11 |   });
  12 | 
  13 |   test("clicking a closed item opens it", async ({ page }) => {
  14 |     await page.getByText("Do I need equipment or a gym?").click();
  15 |     await expect(page.getByText(/full gym, dumbbells at home/i)).toBeVisible();
  16 |   });
  17 | 
  18 |   test("clicking an open item closes it", async ({ page }) => {
  19 |     // First item is open — click it to close
  20 |     await page.getByText("When does it launch?").click();
  21 |     await expect(page.getByText(/rolling out to founding members/i)).not.toBeVisible();
  22 |   });
  23 | 
  24 |   test("only one item is open at a time", async ({ page }) => {
  25 |     await page.getByText("What does it cost?").click();
  26 |     await expect(page.getByText(/\$12\/month/i)).toBeVisible();
  27 |     // First item should now be closed
  28 |     await expect(page.getByText(/rolling out to founding members/i)).not.toBeVisible();
  29 |   });
  30 | });
  31 | 
```