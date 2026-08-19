import { expect, test } from "@playwright/test";

test("Norwegian landing page renders its primary content", async ({ page }) => {
  await page.goto("/no");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Gi taket nytt liv – uten full utskifting",
    }),
  ).toBeVisible();
  await expect(page.getByText("99", { exact: true })).toBeVisible();
  await expect(page.getByText("138", { exact: true })).toBeVisible();
  await expect(page.getByText("337", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Vurder Takfornyelse på Google" }),
  ).toHaveAttribute("href", "https://g.page/r/CYa-JdXzZzxbEBM/review");
  await expect(page.locator("#kontakt")).toBeAttached();
});

test("customer review page links to the verified Google review form", async ({
  page,
}) => {
  await page.goto("/no/kundeomtaler");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Del din erfaring med Takfornyelse",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Vurder Takfornyelse på Google" }).first(),
  ).toHaveAttribute("href", "https://g.page/r/CYa-JdXzZzxbEBM/review");
  await expect(page.getByText("4.9/5 på Google")).toHaveCount(0);
  await expect(page.getByText("Kunde, Oslo")).toHaveCount(0);
});

test("roof guide links visitors to the priority service pages", async ({
  page,
}) => {
  await page.goto("/no/blogg");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Takguide for boligeiere",
    }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Les guiden" })).toHaveCount(6);
  await expect(
    page.getByRole("link", { name: "Les guiden" }).first(),
  ).toHaveAttribute("href", "/no/takvask");
  await expect(page.getByText("Ingen publiserte innlegg ennå.")).toHaveCount(0);
});
