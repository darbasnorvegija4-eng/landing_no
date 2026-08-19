import type { Metadata } from "next";
import {
  CheckCircle2,
  MessageSquareHeart,
  ShieldCheck,
  Star,
} from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { GoogleReviewActions } from "@/components/reviews/google-review-actions";
import { Link, routing } from "@/i18n/routing";
import { getSiteContent } from "@/lib/cms-content";
import { localizeCopy } from "@/lib/page-copy";
import { siteConfig, type Locale } from "@/lib/site";
import { isPublishableTestimonial } from "@/lib/testimonials";

export const revalidate = 60;

type Props = {
  params: Promise<{ locale: string }>;
};

const pageCopy = {
  no: {
    metaTitle: "Kundeomtaler om takvask og takfornying",
    metaDescription:
      "Les dokumenterte kundeerfaringer og legg igjen en ærlig Google-omtale av Takfornyelse.",
    eyebrow: "Kundeomtaler",
    title: "Del din erfaring med Takfornyelse",
    intro:
      "Vi samler nye, verifiserbare kundeomtaler på Google-profilen til Takfornyelse. Tilbakemeldingene hjelper andre boligeiere med å velge riktig takbehandling.",
    reviewsTitle: "Dokumenterte kundeerfaringer",
    emptyTitle: "Vi bygger en åpen og etterprøvbar omtalehistorikk",
    emptyBody:
      "Nye omtaler vises her når de kan knyttes til et faktisk oppdrag og kunden har samtykket til publisering. Inntil da kan du se eller skrive en omtale direkte på Google.",
    howTitle: "Slik gjør vi det trygt og troverdig",
    steps: [
      "Vi ber om en ærlig omtale først etter at et faktisk arbeid er utført.",
      "Vi tilbyr aldri rabatt, betaling eller gave i bytte mot en omtale.",
      "Vi svarer saklig på både positive og kritiske tilbakemeldinger.",
    ],
    ctaTitle: "Har vi jobbet på taket ditt?",
    ctaBody:
      "Fortell gjerne hva vi utførte, hvor arbeidet ble gjort og hvordan du opplevde kommunikasjonen og resultatet. Du velger selv vurdering og innhold.",
    profileNote: "Google-omtalen publiseres på profilen til Takfornyelse.",
    home: "Forside",
  },
  en: {
    metaTitle: "Customer reviews of roof cleaning and renewal",
    metaDescription:
      "Read documented customer experiences and leave an honest Google review of Takfornyelse.",
    eyebrow: "Customer reviews",
    title: "Share your experience with Takfornyelse",
    intro:
      "We collect new, verifiable customer reviews on the Takfornyelse Google profile. The feedback helps other homeowners choose the right roof treatment.",
    reviewsTitle: "Documented customer experiences",
    emptyTitle: "We are building an open and verifiable review history",
    emptyBody:
      "New reviews appear here when they can be linked to real work and the customer has consented to publication. Until then, you can view or write a review directly on Google.",
    howTitle: "How we keep reviews trustworthy",
    steps: [
      "We ask for honest feedback only after real work has been completed.",
      "We never offer a discount, payment or gift in exchange for a review.",
      "We respond professionally to both positive and critical feedback.",
    ],
    ctaTitle: "Have we worked on your roof?",
    ctaBody:
      "Tell others what we completed, where the work took place, and how you experienced the communication and result. You choose the rating and wording.",
    profileNote: "The Google review is published on the Takfornyelse profile.",
    home: "Home",
  },
} as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const copy = pageCopy[loc];
  const pageUrl = `${siteConfig.url}/${locale}/kundeomtaler`;

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: pageUrl,
      languages: {
        no: `${siteConfig.url}/no/kundeomtaler`,
        en: `${siteConfig.url}/en/kundeomtaler`,
        "x-default": `${siteConfig.url}/no/kundeomtaler`,
      },
    },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      type: "website",
      url: pageUrl,
    },
    robots: { index: true, follow: true },
  };
}

export default async function CustomerReviewsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const copy = pageCopy[loc];
  const content = await getSiteContent();
  const localized = localizeCopy(content.copy, loc);
  const testimonials = localized.testimonials.items.filter(
    isPublishableTestimonial,
  );
  const pageUrl = `${siteConfig.url}/${locale}/kundeomtaler`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        name: copy.metaTitle,
        description: copy.metaDescription,
        url: pageUrl,
        inLanguage: loc === "no" ? "nb-NO" : "en",
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: copy.home,
            item: `${siteConfig.url}/${locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.eyebrow,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <main>
        <section className="section-pad bg-background-elevated/30 border-b border-white/10">
          <div className="container-narrow max-w-4xl">
            <p className="eyebrow">
              <Link href="/" className="hover:text-accent-hover">
                {copy.home}
              </Link>
              <span aria-hidden> / </span>
              {copy.eyebrow}
            </p>
            <h1 className="heading-display mt-3 max-w-3xl text-balance">
              {copy.title}
            </h1>
            <p className="text-muted-foreground mt-6 max-w-3xl text-lg leading-8">
              {copy.intro}
            </p>
            <div className="mt-8">
              <GoogleReviewActions locale={loc} size="lg" />
            </div>
            <p className="text-muted-foreground mt-4 max-w-2xl text-sm leading-relaxed">
              {copy.profileNote}
            </p>
          </div>
        </section>

        <section className="section-pad">
          <div className="container-narrow">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 className="heading-display mt-3">{copy.reviewsTitle}</h2>

            {testimonials.length > 0 ? (
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {testimonials.map((item, index) => (
                  <blockquote
                    key={`${item.author}-${index}`}
                    className="bg-background-elevated/50 flex h-full flex-col rounded-2xl border border-white/10 p-6"
                  >
                    <Star
                      className="fill-accent text-accent mb-4 size-5"
                      aria-hidden
                    />
                    <p className="text-foreground/90 leading-relaxed">
                      “{item.quote}”
                    </p>
                    <footer className="text-muted-foreground mt-auto pt-5 text-sm">
                      <span className="text-foreground/80 font-semibold">
                        {item.author}
                      </span>
                      {item.service ? (
                        <span className="mt-1 block text-xs">
                          {item.service}
                        </span>
                      ) : null}
                    </footer>
                  </blockquote>
                ))}
              </div>
            ) : (
              <div className="border-accent/20 bg-accent-soft mt-10 max-w-3xl rounded-2xl border p-6 sm:p-8">
                <MessageSquareHeart
                  className="text-accent size-7"
                  aria-hidden
                />
                <h3 className="mt-4 text-xl font-semibold">
                  {copy.emptyTitle}
                </h3>
                <p className="text-muted-foreground mt-3 leading-relaxed">
                  {copy.emptyBody}
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="section-pad bg-background-elevated/30 border-y border-white/10">
          <div className="container-narrow grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <ShieldCheck className="text-accent size-8" aria-hidden />
              <h2 className="heading-display mt-4">{copy.howTitle}</h2>
            </div>
            <ul className="space-y-4">
              {copy.steps.map((step) => (
                <li
                  key={step}
                  className="bg-background/50 flex gap-3 rounded-xl border border-white/10 p-5"
                >
                  <CheckCircle2
                    className="text-accent mt-0.5 size-5 shrink-0"
                    aria-hidden
                  />
                  <span className="text-muted-foreground leading-relaxed">
                    {step}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-pad">
          <div className="container-narrow max-w-3xl">
            <h2 className="heading-display">{copy.ctaTitle}</h2>
            <p className="text-muted-foreground mt-4 text-lg leading-8">
              {copy.ctaBody}
            </p>
            <div className="mt-8">
              <GoogleReviewActions locale={loc} size="lg" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
