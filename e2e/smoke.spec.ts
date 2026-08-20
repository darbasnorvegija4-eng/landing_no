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
  await expect(page.getByText("375 000 kr", { exact: true })).toBeVisible();
  await expect(page.getByText("63 188 kr", { exact: true })).toBeVisible();
  await expect(page.getByText("311 813 kr", { exact: true })).toBeVisible();
  await expect(
    page.getByText(
      "I dette regneeksempelet er takfornying omtrent 83 % rimeligere",
      { exact: true },
    ),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "5,0/5 på Google · 2 omtaler" }),
  ).toHaveAttribute("href", "https://g.page/r/CYa-JdXzZzxbEBM/review");
  const reviewSection = page.locator("#omtaler");
  await expect(reviewSection.getByText("Ola Brage Hansen")).toBeVisible();
  await expect(reviewSection.getByText("Gerda Rekevičiūtė")).toBeVisible();
  await expect(
    reviewSection.getByRole("link", { name: "Se omtalen på Google Maps" }),
  ).toHaveCount(2);
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
  await expect(page.getByText("Ola Brage Hansen")).toBeVisible();
  await expect(page.getByText("Gerda Rekevičiūtė")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Se omtalen på Google Maps" }),
  ).toHaveCount(2);
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

test("project gallery presents photos in a clear chronological order", async ({
  page,
}) => {
  await page.goto("/no#referanser");

  const paintingProject = page
    .getByRole("article")
    .filter({ hasText: "Takmaling – 240 m² tak i Viken" });

  await expect(paintingProject.getByRole("heading", { level: 4 })).toHaveText([
    "Før",
    "Under arbeid",
    "Etter",
  ]);
  await expect(paintingProject.locator("figure")).toHaveCount(5);
  await expect(paintingProject.getByText("Før 1 / 2")).toBeVisible();
  await expect(paintingProject.getByText("Under arbeid 1 / 1")).toBeVisible();
  await expect(paintingProject.getByText("Etter 1 / 2")).toBeVisible();
});
