import { ExternalLink, Star } from "lucide-react";
import {
  featuredGoogleReviews,
  googleBusinessProfile,
} from "@/content/google-business";

type Props = {
  locale: "no" | "en";
  className?: string;
};

export function GoogleReviewCards({ locale, className = "" }: Props) {
  const copy =
    locale === "no"
      ? {
          heading: "5,0 av 5 på Google Maps",
          count: "2 offentlige omtaler",
          source: "Se omtalen på Google Maps",
          translated: "Oversatt fra norsk",
          disclosureBeforeSource:
            "Viser alle 2 offentlige omtaler, kontrollert mot",
          disclosureAfterSource:
            "20. august 2026. Omtaler er ikke verifisert av Google.",
        }
      : {
          heading: "5.0 out of 5 on Google Maps",
          count: "2 public reviews",
          source: "View the review on Google Maps",
          translated: "Translated from Norwegian",
          disclosureBeforeSource:
            "Showing all 2 public reviews, checked against",
          disclosureAfterSource:
            "on 20 August 2026. Reviews are not verified by Google.",
        };

  return (
    <div className={className}>
      <div className="bg-background-elevated/60 flex flex-col gap-4 rounded-2xl border border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="text-lg font-semibold">{copy.heading}</p>
          <p className="text-muted-foreground mt-1 text-sm">{copy.count}</p>
        </div>
        <div
          className="flex gap-1"
          aria-label={`${googleBusinessProfile.rating} / 5`}
        >
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              className="fill-accent text-accent size-5"
              aria-hidden
            />
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {featuredGoogleReviews.map((review) => {
          const initials = review.author
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          return (
            <blockquote
              key={review.author}
              className="bg-background/60 flex h-full flex-col rounded-2xl border border-white/10 p-5 sm:p-6"
            >
              <header className="flex items-start gap-3">
                <span
                  className="bg-accent-soft text-accent flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                  aria-hidden
                >
                  {initials}
                </span>
                <div className="min-w-0">
                  <p className="text-foreground font-semibold">
                    {review.author}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span
                      className="flex gap-0.5"
                      aria-label={`${review.rating} / 5`}
                    >
                      {Array.from({ length: review.rating }, (_, index) => (
                        <Star
                          key={index}
                          className="fill-accent text-accent size-4"
                          aria-hidden
                        />
                      ))}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {review.published[locale]}
                    </span>
                  </div>
                </div>
              </header>

              <p className="text-foreground/90 mt-5 leading-relaxed">
                “{review.excerpt[locale]}”
              </p>
              {locale === "en" && review.translatedInEnglish ? (
                <p className="text-muted-foreground mt-2 text-xs">
                  {copy.translated}
                </p>
              ) : null}

              <footer className="mt-auto pt-5">
                <a
                  href={review.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-hover inline-flex items-center gap-2 text-sm font-semibold"
                >
                  {copy.source}
                  <ExternalLink className="size-4" aria-hidden />
                </a>
              </footer>
            </blockquote>
          );
        })}
      </div>

      <p className="text-muted-foreground mt-4 text-xs leading-relaxed">
        {copy.disclosureBeforeSource} <span translate="no">Google Maps</span>{" "}
        {copy.disclosureAfterSource}
      </p>
    </div>
  );
}
