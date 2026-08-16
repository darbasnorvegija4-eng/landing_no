import { describe, expect, it } from "vitest";
import {
  getSeoLandingPage,
  seoLandingPages,
  seoLandingSlugs,
} from "./seo-landing-pages";

describe("SEO landing pages", () => {
  it("contains every priority Norwegian search page", () => {
    expect(seoLandingSlugs).toEqual(
      expect.arrayContaining([
        "takvask",
        "takvask-og-impregnering",
        "takmaling",
        "takfornying",
        "nytt-tak",
        "priser",
        "takvask-oslo",
        "takfornying-baerum",
        "takmaling-drammen",
        "takvask-og-impregnering-lillestrom",
        "takfornying-viken",
      ]),
    );
  });

  it("uses unique Norwegian titles and descriptions", () => {
    expect(new Set(seoLandingPages.map((page) => page.metaTitle.no)).size).toBe(
      seoLandingPages.length,
    );
    expect(
      new Set(seoLandingPages.map((page) => page.metaDescription.no)).size,
    ).toBe(seoLandingPages.length);
  });

  it("provides useful content rather than thin keyword pages", () => {
    for (const page of seoLandingPages) {
      expect(page.intro.no.length).toBeGreaterThan(100);
      expect(page.benefits.length).toBeGreaterThanOrEqual(4);
      expect(page.process.length).toBeGreaterThanOrEqual(4);
      expect(page.faq.length).toBeGreaterThanOrEqual(3);
      expect(page.image).toMatch(/^\/references\//);
      expect(getSeoLandingPage(page.slug)).toBe(page);
    }
  });

  it("keeps renewal prices aligned with the published packages", () => {
    const renewalCopy = seoLandingPages
      .filter(
        (page) => page.slug.includes("takfornying") || page.slug === "priser",
      )
      .map(
        (page) =>
          `${page.price.no} ${page.priceNote.no} ${page.faq.map((item) => item.answer.no).join(" ")}`,
      )
      .join(" ");

    expect(renewalCopy).toContain("360 kr");
    expect(renewalCopy).not.toContain("600–1 200");
  });

  it("connects priority service pages to documented projects", () => {
    for (const slug of [
      "takvask",
      "takmaling",
      "takfornying",
      "takvask-oslo",
      "takfornying-viken",
    ]) {
      expect(getSeoLandingPage(slug)?.referenceProjectId).toBeTruthy();
    }
  });
});
