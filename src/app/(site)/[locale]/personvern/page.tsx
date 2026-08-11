import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getSiteContent } from "@/lib/cms-content";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

export const revalidate = 60;

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const content = await getSiteContent();
  const loc = locale as "no" | "en";
  const title = content.settings.privacy.title[loc];
  return {
    title,
    description: title,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/personvern`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${siteConfig.url}/${l}/personvern`]),
      ),
    },
    robots: { index: true, follow: true },
  };
}

function renderMarkdownLite(body: string) {
  return body.split(/\n\n+/).map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith("## ")) {
      return (
        <h2 key={i} className="mt-8 text-xl font-semibold tracking-tight">
          {trimmed.replace(/^##\s+/, "")}
        </h2>
      );
    }
    if (trimmed.startsWith("- ")) {
      const items = trimmed.split("\n").filter((l) => l.startsWith("- "));
      return (
        <ul
          key={i}
          className="text-muted-foreground mt-3 list-disc space-y-1 pl-5"
        >
          {items.map((item, j) => (
            <li key={j}>{item.replace(/^-\s+/, "")}</li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i} className="text-muted-foreground mt-3 leading-relaxed">
        {trimmed}
      </p>
    );
  });
}

function withMarketingDisclosure(body: string, locale: "no" | "en") {
  const trackingConfigured = Boolean(
    process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ||
    process.env.NEXT_PUBLIC_META_PIXEL_ID,
  );
  if (!trackingConfigured || /Google Ads|Meta Pixel/i.test(body)) return body;

  const outdated =
    locale === "no"
      ? "Vi bruker ikke markedsføringscookies eller sporingsverktøy på nettsiden."
      : "We do not use marketing cookies or tracking tools on the website.";
  const disclosure =
    locale === "no"
      ? `## Annonsemåling og informasjonskapsler
Hvis du samtykker i informasjonskapselbanneret, bruker vi Google Ads og Meta Pixel til å måle sidevisninger, henvendelser og klikk på telefon- og e-postlenker. Vi sender ikke navn, telefonnummer, e-postadresse, adresse, melding eller bilder til disse annonsetjenestene. Markedsføringssporing aktiveres ikke hvis du avslår. Du kan når som helst endre valget via «Informasjonskapsler» nederst på nettsiden.`
      : `## Advertising measurement and cookies
If you consent in the cookie banner, we use Google Ads and Meta Pixel to measure page views, enquiries, and clicks on phone and email links. We do not send names, phone numbers, email addresses, addresses, messages, or photos to these advertising services. Marketing tracking is not activated if you decline. You can change your choice at any time through “Cookie settings” in the website footer.`;

  return `${body.replace(outdated, "").trim()}\n\n${disclosure}`;
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as "no" | "en";
  const content = await getSiteContent();
  const privacy = content.settings.privacy;
  const privacyBody = withMarketingDisclosure(privacy.body[loc], loc);

  return (
    <section className="section-pad">
      <div className="container-narrow max-w-3xl">
        <p className="eyebrow">
          <Link href="/" className="hover:text-accent">
            {loc === "no" ? "Forside" : "Home"}
          </Link>
        </p>
        <h1 className="heading-display mt-3 text-balance">
          {privacy.title[loc]}
        </h1>
        <div className="mt-8">{renderMarkdownLite(privacyBody)}</div>
      </div>
    </section>
  );
}
