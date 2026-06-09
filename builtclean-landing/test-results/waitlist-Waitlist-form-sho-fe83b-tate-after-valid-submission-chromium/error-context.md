# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: waitlist.spec.ts >> Waitlist form >> shows success state after valid submission
- Location: tests/waitlist.spec.ts:36:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_RESET at http://localhost:3000/
Call log:
  - navigating to "http://localhost:3000/", waiting until "load"

```

# Test source

```ts
  1   | import { test, expect, type Page } from "@playwright/test";
  2   | 
  3   | test.describe("Waitlist form", () => {
  4   |   test.beforeEach(async ({ page }) => {
> 5   |     await page.goto("/");
      |                ^ Error: page.goto: net::ERR_CONNECTION_RESET at http://localhost:3000/
  6   |     await page.locator("#waitlist").scrollIntoViewIfNeeded();
  7   |   });
  8   | 
  9   |   // Scoped helpers to avoid strict-mode violation (two email inputs on page)
  10  |   const heroInput = (page: Page) =>
  11  |     page.locator("#waitlist").getByPlaceholder(/enter your email/i);
  12  | 
  13  |   test("shows validation error for empty submit", async ({ page }) => {
  14  |     await page.getByRole("button", { name: /claim early access/i }).click();
  15  |     await expect(page.getByText(/valid email/i)).toBeVisible();
  16  |   });
  17  | 
  18  |   test("shows validation error for invalid email", async ({ page }) => {
  19  |     await heroInput(page).fill("notanemail");
  20  |     await page.getByRole("button", { name: /claim early access/i }).click();
  21  |     await expect(page.getByText(/valid email/i)).toBeVisible();
  22  |   });
  23  | 
  24  |   test("disables button while submitting", async ({ page }) => {
  25  |     await heroInput(page).fill("test@example.com");
  26  | 
  27  |     await page.route("/api/waitlist", async (route) => {
  28  |       await new Promise((r) => setTimeout(r, 500));
  29  |       await route.fulfill({ status: 201, body: JSON.stringify({ success: true }) });
  30  |     });
  31  | 
  32  |     await page.getByRole("button", { name: /claim early access/i }).click();
  33  |     await expect(page.getByRole("button", { name: /joining/i })).toBeDisabled();
  34  |   });
  35  | 
  36  |   test("shows success state after valid submission", async ({ page }) => {
  37  |     await heroInput(page).fill("success@example.com");
  38  | 
  39  |     await page.route("/api/waitlist", (route) =>
  40  |       route.fulfill({ status: 201, body: JSON.stringify({ success: true, message: "You're on the list!" }) })
  41  |     );
  42  | 
  43  |     await page.getByRole("button", { name: /claim early access/i }).click();
  44  |     await expect(page.getByText(/you're on the list/i)).toBeVisible();
  45  |   });
  46  | 
  47  |   test("shows error message from server", async ({ page }) => {
  48  |     await heroInput(page).fill("already@example.com");
  49  | 
  50  |     await page.route("/api/waitlist", (route) =>
  51  |       route.fulfill({ status: 200, body: JSON.stringify({ success: false, message: "You're already on the list!" }) })
  52  |     );
  53  | 
  54  |     await page.getByRole("button", { name: /claim early access/i }).click();
  55  |     await expect(page.getByText(/already on the list/i)).toBeVisible();
  56  |   });
  57  | 
  58  |   test("shows generic error on server 500", async ({ page }) => {
  59  |     await heroInput(page).fill("error@example.com");
  60  | 
  61  |     await page.route("/api/waitlist", (route) =>
  62  |       route.fulfill({ status: 500, body: JSON.stringify({ success: false, message: "Something went wrong. Please try again." }) })
  63  |     );
  64  | 
  65  |     await page.getByRole("button", { name: /claim early access/i }).click();
  66  |     await expect(page.getByText(/something went wrong/i)).toBeVisible({ timeout: 5000 });
  67  |   });
  68  | 
  69  |   test("shows error on network failure", async ({ page }) => {
  70  |     await heroInput(page).fill("offline@example.com");
  71  | 
  72  |     await page.route("/api/waitlist", (route) => route.abort("failed"));
  73  | 
  74  |     await page.getByRole("button", { name: /claim early access/i }).click();
  75  |     await expect(page.getByText(/network error|something went wrong/i)).toBeVisible({ timeout: 5000 });
  76  |   });
  77  | 
  78  |   test("re-enables form after failed submission", async ({ page }) => {
  79  |     await heroInput(page).fill("retry@example.com");
  80  | 
  81  |     await page.route("/api/waitlist", (route) =>
  82  |       route.fulfill({ status: 500, body: JSON.stringify({ success: false, message: "Something went wrong." }) })
  83  |     );
  84  | 
  85  |     await page.getByRole("button", { name: /claim early access/i }).click();
  86  |     await expect(page.getByText(/something went wrong/i)).toBeVisible({ timeout: 5000 });
  87  | 
  88  |     await expect(heroInput(page)).toBeEnabled();
  89  |   });
  90  | 
  91  |   test("trims whitespace from email before submitting", async ({ page }) => {
  92  |     await page.route("/api/waitlist", async (route) => {
  93  |       await route.fulfill({ status: 201, body: JSON.stringify({ success: true, message: "You're on the list!" }) });
  94  |     });
  95  | 
  96  |     await heroInput(page).fill("  spaces@example.com  ");
  97  |     await page.getByRole("button", { name: /claim early access/i }).click();
  98  |     await expect(page.getByText(/you're on the list/i)).toBeVisible({ timeout: 5000 });
  99  |   });
  100 | });
  101 | 
```