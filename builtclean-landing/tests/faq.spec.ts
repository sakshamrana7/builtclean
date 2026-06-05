import { test, expect } from "@playwright/test";

test.describe("FAQ accordion", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByText("Common questions.").scrollIntoViewIfNeeded();
  });

  test("first FAQ item is open by default", async ({ page }) => {
    await expect(page.getByText(/rolling out to founding members/i)).toBeVisible();
  });

  test("clicking a closed item opens it", async ({ page }) => {
    await page.getByText("Do I need equipment or a gym?").click();
    await expect(page.getByText(/full gym, dumbbells at home/i)).toBeVisible();
  });

  test("clicking an open item closes it", async ({ page }) => {
    // First item is open — click it to close
    await page.getByText("When does it launch?").click();
    await expect(page.getByText(/rolling out to founding members/i)).not.toBeVisible();
  });

  test("only one item is open at a time", async ({ page }) => {
    await page.getByText("What does it cost?").click();
    await expect(page.getByText(/\$12\/month/i)).toBeVisible();
    // First item should now be closed
    await expect(page.getByText(/rolling out to founding members/i)).not.toBeVisible();
  });
});
