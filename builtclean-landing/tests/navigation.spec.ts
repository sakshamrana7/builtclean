import { test, expect } from "@playwright/test";

test.describe("Navbar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders logo image", async ({ page }) => {
    await expect(page.getByAltText("BUILTCLEAN")).toBeVisible();
  });

  test("renders join waitlist CTA in navbar", async ({ page }) => {
    await expect(page.getByRole("link", { name: /join waitlist/i }).first()).toBeVisible();
  });

  test("navbar stays visible after scrolling", async ({ page }) => {
    const navbar = page.locator("header");
    await expect(navbar).toBeVisible();
    await page.evaluate(() => window.scrollBy(0, 800));
    await page.waitForTimeout(300);
    await expect(navbar).toBeVisible();
  });

  test("navbar join waitlist link scrolls to hero form", async ({ page }) => {
    await page.getByRole("link", { name: /join waitlist/i }).first().click();
    await expect(page.locator("#waitlist")).toBeInViewport({ timeout: 3000 });
  });

  test("mobile menu button is visible on small screens", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await expect(page.getByRole("button", { name: /open menu/i })).toBeVisible();
  });

  test("mobile menu opens and shows nav links", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.getByRole("button", { name: /open menu/i }).click();
    await expect(page.getByRole("button", { name: /close menu/i })).toBeVisible();
    // Nav links should now be visible
    await expect(page.getByRole("link", { name: /join waitlist/i }).first()).toBeVisible();
  });

  test("mobile menu closes when close button is clicked", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.getByRole("button", { name: /open menu/i }).click();
    await page.getByRole("button", { name: /close menu/i }).click();
    await expect(page.getByRole("button", { name: /open menu/i })).toBeVisible();
  });
});

test.describe("Page scrolling and anchors", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("features section is reachable via scroll", async ({ page }) => {
    await page.locator("#features").scrollIntoViewIfNeeded();
    await expect(page.locator("#features")).toBeInViewport({ timeout: 3000 });
  });

  test("how-it-works section is reachable via scroll", async ({ page }) => {
    await page.locator("#how-it-works").scrollIntoViewIfNeeded();
    await expect(page.locator("#how-it-works")).toBeInViewport({ timeout: 3000 });
  });

  test("page title is correct", async ({ page }) => {
    await expect(page).toHaveTitle(/built clean/i);
  });
});
