export const googleBusinessProfile = {
  name: "Takfornyelse",
  profileUrl: "https://www.google.com/maps?cid=6574243853004816006",
  reviewUrl: "https://g.page/r/CYa-JdXzZzxbEBM/review",
  rating: 5,
  reviewCount: 2,
  verifiedAt: "2026-08-20",
} as const;

export const featuredGoogleReviews = [
  {
    author: "Ola Brage Hansen",
    rating: 5,
    published: { no: "august 2026", en: "August 2026" },
    excerpt: {
      no: "Veldig fornøyd med jobben som ble utført på taket vårt i Oslo. Taket ble grundig vasket, impregnert og malt, og resultatet ble veldig bra.",
      en: "Very satisfied with the work done on our roof in Oslo. The roof was thoroughly washed, impregnated and painted, and the result was very good.",
    },
    translatedInEnglish: true,
    sourceUrl: googleBusinessProfile.profileUrl,
  },
  {
    author: "Gerda Rekevičiūtė",
    rating: 5,
    published: { no: "august 2026", en: "August 2026" },
    excerpt: { no: "Great price", en: "Great price" },
    translatedInEnglish: false,
    sourceUrl: googleBusinessProfile.profileUrl,
  },
] as const;

export function googleReviewSummary(locale: "no" | "en") {
  const rating = googleBusinessProfile.rating.toFixed(1);

  return locale === "no"
    ? `${rating.replace(".", ",")}/5 på Google · ${googleBusinessProfile.reviewCount} omtaler`
    : `${rating}/5 on Google · ${googleBusinessProfile.reviewCount} reviews`;
}
