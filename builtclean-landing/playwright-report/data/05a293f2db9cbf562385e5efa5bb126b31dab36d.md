# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accessibility.spec.ts >> Accessibility >> email input has accessible label or placeholder
- Location: tests/accessibility.spec.ts:23:7

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
  3  | test.describe("Accessibility", () => {
  4  |   test.beforeEach(async ({ page }) => {
> 5  |     await page.goto("/");
     |                ^ Error: page.goto: Test timeout of 30000ms exceeded.
  6  |   });
  7  | 
  8  |   test("page has a single h1", async ({ page }) => {
  9  |     const h1s = page.getByRole("heading", { level: 1 });
  10 |     await expect(h1s).toHaveCount(1);
  11 |   });
  12 | 
  13 |   test("all images have alt text", async ({ page }) => {
  14 |     const images = page.locator("img");
  15 |     const count = await images.count();
  16 |     for (let i = 0; i < count; i++) {
  17 |       const alt = await images.nth(i).getAttribute("alt");
  18 |       expect(alt, `Image ${i} is missing alt text`).not.toBeNull();
  19 |       expect(alt!.trim(), `Image ${i} has empty alt text`).not.toBe("");
  20 |     }
  21 |   });
  22 | 
  23 |   test("email input has accessible label or placeholder", async ({ page }) => {
  24 |     const input = page.getByPlaceholder(/enter your email/i).first();
  25 |     await expect(input).toBeVisible();
  26 |     const placeholder = await input.getAttribute("placeholder");
  27 |     expect(placeholder).toBeTruthy();
  28 |   });
  29 | 
  30 |   test("interactive buttons are keyboard focusable", async ({ page }) => {
  31 |     // Tab to the first focusable element, then navigate
  32 |     await page.keyboard.press("Tab");
  33 |     const focused = page.locator(":focus");
  34 |     await expect(focused).toHaveCount(1);
  35 |   });
  36 | 
  37 |   test("waitlist form is keyboard submittable", async ({ page }) => {
  38 |     await page.route("/api/waitlist", (route) =>
  39 |       route.fulfill({
  40 |         status: 201,
  41 |         body: JSON.stringify({ success: true, message: "You're on the list!" }),
  42 |       })
  43 |     );
  44 | 
  45 |     const input = page.getByPlaceholder(/enter your email/i).first();
  46 |     await input.focus();
  47 |     await input.fill("keyboard@example.com");
  48 |     await page.keyboard.press("Enter");
  49 |     await expect(page.getByText(/you're on the list/i).first()).toBeVisible({ timeout: 5000 });
  50 |   });
  51 | 
  52 |   test("FAQ items are keyboard navigable", async ({ page }) => {
  53 |     await page.getByText("Common questions.").scrollIntoViewIfNeeded();
  54 | 
  55 |     // Tab to the first FAQ button and activate it with keyboard
  56 |     const faqButton = page.getByRole("button").filter({ hasText: /when does it launch/i });
  57 |     await faqButton.focus();
  58 |     await page.keyboard.press("Enter");
  59 |     // Answer should be hidden after closing
  60 |     await expect(page.getByText(/rolling out to founding members/i)).not.toBeVisible({ timeout: 2000 });
  61 |   });
  62 | 
  63 |   test("navbar links have descriptive text", async ({ page }) => {
  64 |     // Logo link — accessible via img alt text
  65 |     const logoLink = page.locator("header").getByAltText("BUILTCLEAN");
  66 |     await expect(logoLink).toBeVisible();
  67 | 
  68 |     // Text links — must have non-empty text content
  69 |     const joinLink = page.locator("header").getByRole("link", { name: /join waitlist/i });
  70 |     await expect(joinLink.first()).toBeVisible();
  71 |   });
  72 | });
  73 | 
  74 | test.describe("Meta / SEO", () => {
  75 |   test("page has a meta description", async ({ page }) => {
  76 |     await page.goto("/");
  77 |     const meta = page.locator('meta[name="description"]');
  78 |     const content = await meta.getAttribute("content");
  79 |     expect(content).toBeTruthy();
  80 |   });
  81 | 
  82 |   test("page has an OG image meta tag", async ({ page }) => {
  83 |     await page.goto("/");
  84 |     const ogImage = page.locator('meta[property="og:image"]');
  85 |     const content = await ogImage.getAttribute("content");
  86 |     expect(content).toBeTruthy();
  87 |   });
  88 | });
  89 | 
```