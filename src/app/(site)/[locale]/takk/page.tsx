import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isNorwegian = locale === "no";

  return {
    title: isNorwegian ? "Takk for henvendelsen" : "Thank you for your enquiry",
    description: isNorwegian
      ? "Vi har mottatt henvendelsen din og følger opp så snart som mulig."
      : "We have received your enquiry and will follow up as soon as possible.",
    robots: { index: false, follow: false },
  };
}

export default async function ThankYouPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isNorwegian = locale === "no";

  return (
    <section className="section-pad min-h-[65vh]">
      <div className="container-narrow max-w-3xl text-center">
        <CheckCircle2
          aria-hidden="true"
          className="text-accent mx-auto size-16"
        />
        <p className="eyebrow mt-6">
          {isNorwegian ? "Henvendelsen er mottatt" : "Enquiry received"}
        </p>
        <h1 className="heading-display mt-3 text-balance">
          {isNorwegian ? "Takk for henvendelsen" : "Thank you for your enquiry"}
        </h1>
        <p className="text-muted-foreground mx-auto mt-5 max-w-2xl text-lg leading-relaxed">
          {isNorwegian
            ? "Vi har mottatt opplysningene dine. En av våre fagfolk følger opp så snart som mulig for å avklare behovet og neste steg."
            : "We have received your details. One of our specialists will follow up as soon as possible to clarify your needs and the next step."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="bg-accent text-accent-foreground rounded-xl px-6 py-3 font-semibold"
          >
            {isNorwegian ? "Til forsiden" : "Back to home"}
          </Link>
          <Link
            href="/takvask"
            className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold hover:bg-white/10"
          >
            {isNorwegian ? "Les om takvask" : "Read about roof cleaning"}
          </Link>
        </div>
      </div>
    </section>
  );
}
