import { test, expect } from "@playwright/test";

test.describe("Hero section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders main heading", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("renders waitlist form in hero", async ({ page }) => {
    await expect(page.getByPlaceholder(/enter your email/i).first()).toBeVisible();
    await expect(page.getByRole("button", { name: /claim early access/i })).toBeVisible();
  });

  test("renders live user counter", async ({ page }) => {
    // NumberFlow counter — check the surrounding label text exists
    await expect(page.getByText(/people waiting/i)).toBeVisible();
  });
});

test.describe("Marquee section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders marquee with feature pills", async ({ page }) => {
    await expect(page.getByText(/adapts daily/i).first()).toBeVisible();
    await expect(page.getByText(/no guilt/i).first()).toBeVisible();
  });
});

test.describe("Stats section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("text=Every feature exists to remove").scrollIntoViewIfNeeded();
  });

  test("renders stats section heading", async ({ page }) => {
    await expect(page.getByText(/every feature exists to remove a reason/i)).toBeVisible();
  });

  test("renders stat labels", async ({ page }) => {
    // Check stat labels are visible after scroll-trigger
    await expect(page.getByText(/workouts logged/i).or(page.getByText(/app consistency/i)).or(page.getByText(/founding members/i)).first()).toBeVisible({ timeout: 5000 });
  });
});

test.describe("Features section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("#features").scrollIntoViewIfNeeded();
  });

  test("renders features section", async ({ page }) => {
    await expect(page.locator("#features")).toBeVisible();
  });

  test("renders bento tile headings", async ({ page }) => {
    await expect(page.getByText(/streaks that forgive/i)).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/meals that match/i)).toBeVisible({ timeout: 5000 });
  });

  test("renders weekly debrief tile", async ({ page }) => {
    await expect(page.getByText(/weekly debrief/i)).toBeVisible({ timeout: 5000 });
  });
});

test.describe("Comparison section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByText("Not another fitness app.").scrollIntoViewIfNeeded();
  });

  test("renders comparison heading", async ({ page }) => {
    await expect(page.getByText("Not another fitness app.")).toBeVisible();
  });

  test("renders column headers", async ({ page }) => {
    await expect(page.getByText("Most apps")).toBeVisible();
    await expect(page.getByText("BUILTCLEAN")).toBeVisible();
  });

  test("renders comparison rows", async ({ page }) => {
    await expect(page.getByText("Adapts to your week")).toBeVisible();
    await expect(page.getByText("Forgives missed days")).toBeVisible();
    await expect(page.getByText("Real conversation with coach")).toBeVisible();
  });
});

test.describe("CTA section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByText("Ready to build").scrollIntoViewIfNeeded();
  });

  test("renders CTA heading", async ({ page }) => {
    await expect(page.getByText(/ready to build/i)).toBeVisible();
  });

  test("renders sub-heading", async ({ page }) => {
    await expect(page.getByText(/join the waitlist. be first. it's free/i)).toBeVisible();
  });

  test("renders waitlist form", async ({ page }) => {
    await expect(page.getByRole("button", { name: /claim your spot/i })).toBeVisible();
  });

  test("CTA form submits successfully", async ({ page }) => {
    await page.route("/api/waitlist", (route) =>
      route.fulfill({
        status: 201,
        body: JSON.stringify({ success: true, message: "You're on the list!" }),
      })
    );
    await page.getByPlaceholder(/enter your email/i).last().fill("cta@example.com");
    await page.getByRole("button", { name: /claim your spot/i }).click();
    await expect(page.getByText(/you're on the list/i).last()).toBeVisible({ timeout: 5000 });
  });
});
