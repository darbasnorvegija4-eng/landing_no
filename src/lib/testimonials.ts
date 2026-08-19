export type Testimonial = {
  quote: string;
  author: string;
  service?: string;
};

const genericAuthorPattern =
  /^(kunde|customer|borettslag|housing association)(?:\s*,|$)/i;
const numericGoogleRatingPattern = /\d(?:[.,]\d)?\s*\/\s*5.*google/i;
const legacyGoogleLabelPattern =
  /^(kundeomtaler på google|reviews on google)$/i;

export function isPublishableTestimonial(item: Testimonial): boolean {
  const quote = item.quote.trim();
  const author = item.author.trim();

  return (
    quote.length >= 20 &&
    author.length >= 2 &&
    !genericAuthorPattern.test(author)
  );
}

export function googleTrustLabel(value: string, locale: "no" | "en"): string {
  const fallback =
    locale === "no"
      ? "Vurder Takfornyelse på Google"
      : "Review Takfornyelse on Google";
  const label = value.trim();

  if (
    !label ||
    numericGoogleRatingPattern.test(label) ||
    legacyGoogleLabelPattern.test(label)
  )
    return fallback;
  return label;
}
