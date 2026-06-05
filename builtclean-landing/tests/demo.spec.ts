import { test, expect } from "@playwright/test";

test.describe("Live demo chat", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    // Mock Turnstile — always return a fake token so the widget doesn't block tests
    await page.addInitScript(() => {
      // Stub the Turnstile global so the widget calls onSuccess immediately
      Object.defineProperty(window, "turnstile", {
        value: {
          render: (_el: unknown, opts: { callback?: (token: string) => void }) => {
            opts?.callback?.("test-token");
            return "widget-id";
          },
          reset: () => {},
          remove: () => {},
        },
        writable: true,
      });
    });

    await page.locator("text=Talk to your coach.").scrollIntoViewIfNeeded();
  });

  test("renders initial coach message", async ({ page }) => {
    await expect(page.getByText(/hey, i'm your coach/i)).toBeVisible();
  });

  test("shows message counter", async ({ page }) => {
    await expect(page.getByText(/5 messages left/i)).toBeVisible();
  });

  test("shows suggestion chips on load", async ({ page }) => {
    await expect(page.getByText(/plan a 30-min workout/i)).toBeVisible();
    await expect(page.getByText(/missed 3 days/i)).toBeVisible();
  });

  test("input is enabled once Turnstile resolves", async ({ page }) => {
    const input = page.getByPlaceholder(/ask anything/i);
    await expect(input).toBeEnabled();
  });

  test("sends a message and shows response", async ({ page }) => {
    // Mock the demo API to return a canned response
    await page.route("/api/demo", async (route) => {
      const body = new TextEncoder().encode("Train. Don't skip. You'll feel better after.");
      await route.fulfill({
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "X-RateLimit-Remaining": "4",
        },
        body,
      });
    });

    await page.getByPlaceholder(/ask anything/i).fill("Should I train today?");
    await page.getByRole("button", { name: "Send" }).click();

    await expect(page.getByText(/should i train today/i)).toBeVisible();
    await expect(page.getByText(/train\. don't skip/i)).toBeVisible({ timeout: 10000 });
  });

  test("decrements message counter after sending", async ({ page }) => {
    await page.route("/api/demo", (route) =>
      route.fulfill({
        status: 200,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
        body: "Keep going.",
      })
    );

    await page.getByPlaceholder(/ask anything/i).fill("Hi");
    await page.getByRole("button", { name: "Send" }).click();

    await expect(page.getByText(/4 messages left/i)).toBeVisible({ timeout: 5000 });
  });

  test("shows upgrade CTA when limit is reached", async ({ page }) => {
    await page.route("/api/demo", (route) =>
      route.fulfill({
        status: 429,
        body: JSON.stringify({ error: "Demo limit reached.", upgrade: true }),
      })
    );

    await page.getByPlaceholder(/ask anything/i).fill("Hi");
    await page.getByRole("button", { name: "Send" }).click();

    await expect(page.getByText(/join waitlist for unlimited access/i)).toBeVisible({ timeout: 5000 });
  });

  test("disables input after reaching 0 messages", async ({ page }) => {
    // Exhaust all 5 messages
    for (let i = 0; i < 5; i++) {
      await page.route("/api/demo", (route) =>
        route.fulfill({
          status: 200,
          headers: { "Content-Type": "text/plain; charset=utf-8" },
          body: "Reply.",
        })
      );
      await page.getByPlaceholder(/ask anything/i).fill(`Message ${i + 1}`);
      await page.getByRole("button", { name: "Send" }).click();
      await page.getByText("Reply.").last().waitFor({ timeout: 5000 });
    }

    await expect(page.getByPlaceholder(/sign up to keep going/i)).toBeDisabled();
  });
});
