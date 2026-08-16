import { describe, expect, it } from "vitest";
import enMessages from "@/i18n/messages/en.json";
import noMessages from "@/i18n/messages/no.json";
import { pageCopyFromMessages, pageCopyFromSettingsDoc } from "./page-copy";
import { googleTrustLabel, isPublishableTestimonial } from "./testimonials";

describe("customer testimonials", () => {
  it("filters generic, untraceable testimonial labels", () => {
    expect(
      isPublishableTestimonial({
        quote: "God kommunikasjon, ryddig arbeid og taket ble som nytt.",
        author: "Kunde, Oslo",
        service: "Takfornying",
      }),
    ).toBe(false);
    expect(
      isPublishableTestimonial({
        quote: "Vi fikk god informasjon underveis og et veldig fint resultat.",
        author: "Kari H., Bærum",
        service: "Takmaling",
      }),
    ).toBe(true);
  });

  it("does not publish an unsupported numeric Google rating", () => {
    expect(googleTrustLabel("4.9/5 på Google", "no")).toBe(
      "Kundeomtaler på Google",
    );
    expect(googleTrustLabel("4.9/5 on Google", "en")).toBe("Reviews on Google");
  });

  it("sanitizes the existing CMS rating before it reaches the page", () => {
    const fallback = pageCopyFromMessages(noMessages, enMessages);
    const copy = pageCopyFromSettingsDoc(
      {
        copyHero: {
          trustRatingNo: "4.9/5 på Google",
          trustRatingEn: "4.9/5 on Google",
        },
      },
      fallback,
    );

    expect(copy.hero.trustRating).toEqual({
      no: "Kundeomtaler på Google",
      en: "Reviews on Google",
    });
  });
});
