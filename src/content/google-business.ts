export const googleBusinessProfile = {
  name: "Takfornyelse",
  profileUrl: "https://www.google.com/maps?cid=6574243853004816006",
  reviewUrl: "https://g.page/r/CYa-JdXzZzxbEBM/review",
  rating: 5,
  reviewCount: 2,
  verifiedAt: "2026-08-20",
} as const;

export function googleReviewSummary(locale: "no" | "en") {
  const rating = googleBusinessProfile.rating.toFixed(1);

  return locale === "no"
    ? `${rating.replace(".", ",")}/5 på Google · ${googleBusinessProfile.reviewCount} omtaler`
    : `${rating}/5 on Google · ${googleBusinessProfile.reviewCount} reviews`;
}
