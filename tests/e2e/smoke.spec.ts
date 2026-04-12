import { expect, test } from "@playwright/test";

const coreRoutes = ["/", "/product", "/vision", "/about", "/contact", "/faq", "/future"];

test.describe("launch smoke", () => {
  for (const route of coreRoutes) {
    test(`route responds and renders for ${route}`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.ok()).toBeTruthy();
      await expect(page.locator("main")).toBeVisible();
    });
  }

  test("about page founder links open in new tab and point to expected linkedin profiles", async ({ page }) => {
    await page.goto("/about");

    const tyLink = page.getByRole("link", { name: "Ty Stevens" });
    const bucurLink = page.getByRole("link", { name: "Bucur Andrei Borcoman" });

    await expect(tyLink).toHaveAttribute("href", "https://www.linkedin.com/in/ty-stevens-/");
    await expect(tyLink).toHaveAttribute("target", "_blank");
    await expect(tyLink).toHaveAttribute("rel", /noopener noreferrer/);

    await expect(bucurLink).toHaveAttribute("href", "https://www.linkedin.com/in/bucur-andrei-borcoman/");
    await expect(bucurLink).toHaveAttribute("target", "_blank");
    await expect(bucurLink).toHaveAttribute("rel", /noopener noreferrer/);
  });

  test("contact form handles validation and backend-unavailable state gracefully", async ({ page }) => {
    await page.goto("/contact");

    await page.getByRole("button", { name: "Send inquiry" }).click();
    await expect(page.getByText("Name is required.")).toBeVisible();
    await expect(page.getByText("Email is required.")).toBeVisible();

    await page.getByLabel("Name").fill("Ty Stevens");
    await page.getByLabel("Email").fill("ty@tailortaste.com");
    await page.getByLabel("Organization").fill("Tailor Taste");
    await page.getByLabel("Inquiry type").selectOption("Pilot venue / hotel");
    await page.getByLabel("Message").fill("Interested in discussing a pilot.");
    await page.getByRole("button", { name: "Send inquiry" }).click();

    await expect(page.getByText("Contact delivery is not configured yet.")).toBeVisible();
  });
});
