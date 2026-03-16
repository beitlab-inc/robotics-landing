import { expect, test } from "@playwright/test";

test.describe("Landing page", () => {
  test("renders branding, hero, and primary sections", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator(".brand-copy strong")).toHaveText(/beitlab robotics/i);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Reliable robotics");
    await expect(page.locator("#capabilities")).toBeVisible();
    await expect(page.locator("#areas")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
  });

  test("keeps brand and Contact link visible in medium desktop widths", async ({ page }) => {
    await page.setViewportSize({ width: 1122, height: 379 });
    await page.goto("/#areas");

    const header = await page.locator(".site-header").boundingBox();
    const brand = await page.locator(".brand").boundingBox();
    const contactLink = await page.getByRole("link", { name: "Contact" }).boundingBox();

    expect(header).not.toBeNull();
    expect(brand).not.toBeNull();
    expect(contactLink).not.toBeNull();

    expect(brand.x).toBeGreaterThanOrEqual(header.x - 1);
    expect(contactLink.x + contactLink.width).toBeLessThanOrEqual(header.x + header.width + 1);
  });

  test("anchor navigation keeps contact heading below sticky header", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/#contact");

    const header = await page.locator(".site-header").boundingBox();
    const heading = await page.locator("#contact .section-heading h2").boundingBox();

    expect(header).not.toBeNull();
    expect(heading).not.toBeNull();
    expect(heading.y).toBeGreaterThanOrEqual(header.y + header.height - 2);
  });

  test("shows validation feedback when contact form is empty", async ({ page }) => {
    await page.goto("/#contact");

    await page.getByRole("button", { name: "Request a consultation" }).click();

    await expect(page.locator("#form-status")).toContainText(
      "Please complete all required fields with valid information."
    );
    const invalidCount = await page.locator('#contact-form [aria-invalid="true"]').count();
    expect(invalidCount).toBeGreaterThan(0);
  });

  test("uses the current contact email in the UI", async ({ page }) => {
    await page.goto("/#contact");
    await expect(page.locator('a[href="mailto:robotics-hello@beitlab.com"]')).toBeVisible();
  });
});
