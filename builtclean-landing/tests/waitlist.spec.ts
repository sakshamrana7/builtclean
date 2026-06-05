import { test, expect } from "@playwright/test";

test.describe("Waitlist form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows validation error for empty submit", async ({ page }) => {
    await page.locator("#waitlist").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /claim early access/i }).click();
    await expect(page.getByText(/valid email/i)).toBeVisible();
  });

  test("shows validation error for invalid email", async ({ page }) => {
    await page.locator("#waitlist").scrollIntoViewIfNeeded();
    await page.getByPlaceholder(/enter your email/i).fill("notanemail");
    await page.getByRole("button", { name: /claim early access/i }).click();
    await expect(page.getByText(/valid email/i)).toBeVisible();
  });

  test("disables button while submitting", async ({ page }) => {
    await page.locator("#waitlist").scrollIntoViewIfNeeded();
    await page.getByPlaceholder(/enter your email/i).fill("test@example.com");

    // Intercept the API call to slow it down so we can observe the loading state
    await page.route("/api/waitlist", async (route) => {
      await new Promise((r) => setTimeout(r, 500));
      await route.fulfill({ status: 201, body: JSON.stringify({ success: true }) });
    });

    await page.getByRole("button", { name: /claim early access/i }).click();
    await expect(page.getByRole("button", { name: /joining/i })).toBeDisabled();
  });

  test("shows success state after valid submission", async ({ page }) => {
    await page.locator("#waitlist").scrollIntoViewIfNeeded();
    await page.getByPlaceholder(/enter your email/i).fill("success@example.com");

    await page.route("/api/waitlist", (route) =>
      route.fulfill({ status: 201, body: JSON.stringify({ success: true, message: "You're on the list!" }) })
    );

    await page.getByRole("button", { name: /claim early access/i }).click();
    await expect(page.getByText(/you're on the list/i)).toBeVisible();
  });

  test("shows error message from server", async ({ page }) => {
    await page.locator("#waitlist").scrollIntoViewIfNeeded();
    await page.getByPlaceholder(/enter your email/i).fill("already@example.com");

    await page.route("/api/waitlist", (route) =>
      route.fulfill({ status: 200, body: JSON.stringify({ success: false, message: "You're already on the list!" }) })
    );

    await page.getByRole("button", { name: /claim early access/i }).click();
    await expect(page.getByText(/already on the list/i)).toBeVisible();
  });
});
