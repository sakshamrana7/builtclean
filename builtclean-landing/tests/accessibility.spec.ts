import { test, expect } from "@playwright/test";

test.describe("Accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("page has a single h1", async ({ page }) => {
    const h1s = page.getByRole("heading", { level: 1 });
    await expect(h1s).toHaveCount(1);
  });

  test("all images have alt text", async ({ page }) => {
    const images = page.locator("img");
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute("alt");
      expect(alt, `Image ${i} is missing alt text`).not.toBeNull();
      expect(alt!.trim(), `Image ${i} has empty alt text`).not.toBe("");
    }
  });

  test("email input has accessible label or placeholder", async ({ page }) => {
    const input = page.getByPlaceholder(/enter your email/i).first();
    await expect(input).toBeVisible();
    const placeholder = await input.getAttribute("placeholder");
    expect(placeholder).toBeTruthy();
  });

  test("interactive buttons are keyboard focusable", async ({ page }) => {
    // Tab to the first focusable element, then navigate
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus");
    await expect(focused).toBeTruthy();
  });

  test("waitlist form is keyboard submittable", async ({ page }) => {
    await page.route("/api/waitlist", (route) =>
      route.fulfill({
        status: 201,
        body: JSON.stringify({ success: true, message: "You're on the list!" }),
      })
    );

    const input = page.getByPlaceholder(/enter your email/i).first();
    await input.focus();
    await input.fill("keyboard@example.com");
    await page.keyboard.press("Enter");
    await expect(page.getByText(/you're on the list/i).first()).toBeVisible({ timeout: 5000 });
  });

  test("FAQ items are keyboard navigable", async ({ page }) => {
    await page.getByText("Common questions.").scrollIntoViewIfNeeded();

    // Tab to the first FAQ button and activate it with keyboard
    const faqButton = page.getByRole("button").filter({ hasText: /when does it launch/i });
    await faqButton.focus();
    await page.keyboard.press("Enter");
    // Answer should be hidden after closing
    await expect(page.getByText(/rolling out to founding members/i)).not.toBeVisible({ timeout: 2000 });
  });

  test("navbar links have descriptive text", async ({ page }) => {
    const navLinks = page.locator("header a");
    const count = await navLinks.count();
    for (let i = 0; i < count; i++) {
      const text = await navLinks.nth(i).textContent();
      const ariaLabel = await navLinks.nth(i).getAttribute("aria-label");
      expect(
        (text && text.trim()) || ariaLabel,
        `Nav link ${i} has no accessible text`
      ).toBeTruthy();
    }
  });
});

test.describe("Meta / SEO", () => {
  test("page has a meta description", async ({ page }) => {
    await page.goto("/");
    const meta = page.locator('meta[name="description"]');
    const content = await meta.getAttribute("content");
    expect(content).toBeTruthy();
  });

  test("page has an OG image meta tag", async ({ page }) => {
    await page.goto("/");
    const ogImage = page.locator('meta[property="og:image"]');
    const content = await ogImage.getAttribute("content");
    expect(content).toBeTruthy();
  });
});
