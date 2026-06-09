import { test, expect } from "@playwright/test";

test.describe("Landing page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders all key sections", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /fitness that keeps/i })).toBeVisible();
    await expect(page.getByText(/less app. more coach/i)).toBeVisible();
    await expect(page.getByText(/talk to your coach/i)).toBeVisible();
    await expect(page.getByText(/not another fitness app/i)).toBeVisible();
    await expect(page.getByText(/common questions/i)).toBeVisible();
  });

  test("navbar is visible and sticky", async ({ page }) => {
    const navbar = page.locator("header");
    await expect(navbar).toBeVisible();
    await page.evaluate(() => window.scrollBy(0, 400));
    await expect(navbar).toBeVisible();
  });

  test("navbar join waitlist button scrolls to hero form", async ({ page }) => {
    await page.getByRole("link", { name: /join waitlist/i }).first().click();
    await expect(page.locator("#waitlist")).toBeInViewport({ timeout: 5000 });
  });

  test("marquee ticker is present", async ({ page }) => {
    await expect(page.getByText(/adapts daily/i).first()).toBeVisible();
  });

  test("stats section shows key values", async ({ page }) => {
    await page.locator("section").filter({ hasText: "Built around your coach" }).scrollIntoViewIfNeeded();
    await expect(page.getByText(/built around your coach/i)).toBeVisible();
    await expect(page.getByText(/for founding members/i).first()).toBeVisible();
  });
});
