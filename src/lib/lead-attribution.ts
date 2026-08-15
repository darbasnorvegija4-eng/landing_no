export const attributionKeys = [
  "utmSource",
  "utmMedium",
  "utmCampaign",
  "utmContent",
  "utmTerm",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
] as const;

export type MarketingConsentChoice = "granted" | "denied" | "unknown";

export type LeadAttribution = Partial<
  Record<(typeof attributionKeys)[number], string>
> & {
  landingPage?: string;
  referrer?: string;
  marketingConsent?: MarketingConsentChoice;
};

const queryParamByField: Record<(typeof attributionKeys)[number], string> = {
  utmSource: "utm_source",
  utmMedium: "utm_medium",
  utmCampaign: "utm_campaign",
  utmContent: "utm_content",
  utmTerm: "utm_term",
  gclid: "gclid",
  gbraid: "gbraid",
  wbraid: "wbraid",
  fbclid: "fbclid",
  msclkid: "msclkid",
};

function clean(value: string | null, maxLength: number) {
  const normalized = value?.trim();
  return normalized ? normalized.slice(0, maxLength) : undefined;
}

export function captureLeadAttribution(
  href: string,
  referrer = "",
): LeadAttribution {
  const url = new URL(href);
  const attribution: LeadAttribution = {
    landingPage: clean(url.href, 1000),
    referrer: clean(referrer, 1000),
  };

  for (const field of attributionKeys) {
    const maxLength = field.startsWith("utm") ? 255 : 512;
    const value = clean(
      url.searchParams.get(queryParamByField[field]),
      maxLength,
    );
    if (value) attribution[field] = value;
  }

  return attribution;
}
