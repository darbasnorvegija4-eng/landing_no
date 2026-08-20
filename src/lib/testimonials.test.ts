import { describe, expect, it } from "vitest";
import enMessages from "@/i18n/messages/en.json";
import noMessages from "@/i18n/messages/no.json";
import { featuredGoogleReviews } from "@/content/google-business";
import { pageCopyFromMessages, pageCopyFromSettingsDoc } from "./page-copy";
import { googleTrustLabel, isPublishableTestimonial } from "./testimonials";

describe("customer testimonials", () => {
  it("publishes the complete verified Google review snapshot", () => {
    expect(featuredGoogleReviews).toHaveLength(2);
    expect(featuredGoogleReviews.map((review) => review.author)).toEqual([
      "Ola Brage Hansen",
      "Gerda Rekevičiūtė",
    ]);
    expect(featuredGoogleReviews.every((review) => review.rating === 5)).toBe(
      true,
    );
  });

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

  it("replaces a stale numeric Google rating with the verified summary", () => {
    expect(googleTrustLabel("4.9/5 på Google", "no")).toBe(
      "5,0/5 på Google · 2 omtaler",
    );
    expect(googleTrustLabel("4.9/5 on Google", "en")).toBe(
      "5.0/5 on Google · 2 reviews",
    );
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
      no: "5,0/5 på Google · 2 omtaler",
      en: "5.0/5 on Google · 2 reviews",
    });
  });

  it("replaces legacy generic Google labels with the verified summary", () => {
    expect(googleTrustLabel("Kundeomtaler på Google", "no")).toBe(
      "5,0/5 på Google · 2 omtaler",
    );
    expect(googleTrustLabel("Reviews on Google", "en")).toBe(
      "5.0/5 on Google · 2 reviews",
    );
  });
});
