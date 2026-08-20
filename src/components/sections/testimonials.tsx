"use client";

import { ArrowRight, Star } from "lucide-react";
import { useLocale } from "next-intl";
import { GoogleReviewActions } from "@/components/reviews/google-review-actions";
import { GoogleReviewCards } from "@/components/reviews/google-review-cards";
import { Link } from "@/i18n/routing";
import { Reveal } from "@/components/ui/reveal";
import { usePageCopy } from "@/components/site-settings-provider";
import { isPublishableTestimonial } from "@/lib/testimonials";

export function TestimonialsSection() {
  const copy = usePageCopy();
  const locale = useLocale() as "no" | "en";
  const items = copy.testimonials.items.filter(isPublishableTestimonial);
  const text =
    locale === "no"
      ? {
          verifiedTitle: "Offentlige omtaler på Google",
          intro:
            "Vi viser bare omtaler som kan knyttes til en offentlig eller dokumenterbar kilde.",
          all: "Les om kundeomtaler",
        }
      : {
          verifiedTitle: "Public reviews on Google",
          intro:
            "We only display reviews that can be linked to a public or documented source.",
          all: "Read about customer reviews",
        };

  return (
    <section id="omtaler" className="section-pad bg-background-elevated/30">
      <div className="container-narrow">
        <Reveal>
          <p className="eyebrow">{copy.testimonials.eyebrow}</p>
          <h2 className="heading-display mt-3 text-balance">
            {items.length > 0 ? copy.testimonials.title : text.verifiedTitle}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            {text.intro}
          </p>
        </Reveal>

        {items.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {items.map((item, i) => (
              <Reveal
                key={`${item.author}-${i}`}
                delay={Math.min(i * 0.06, 0.18)}
              >
                <blockquote className="bg-background/60 flex h-full flex-col rounded-2xl border border-white/10 p-6">
                  <Star
                    className="fill-accent text-accent mb-4 size-5"
                    aria-hidden
                  />
                  <p className="text-foreground/90 text-base leading-relaxed">
                    “{item.quote}”
                  </p>
                  <footer className="text-muted-foreground mt-auto pt-5 text-sm">
                    <span className="text-foreground/80 font-medium">
                      {item.author}
                    </span>
                    {item.service ? (
                      <span className="mt-0.5 block text-xs">
                        {item.service}
                      </span>
                    ) : null}
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        ) : null}

        <Reveal delay={0.06}>
          <GoogleReviewCards locale={locale} className="mt-8" />
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-8 flex flex-col gap-4">
            <GoogleReviewActions locale={locale} />
            <Link
              href="/kundeomtaler"
              className="text-accent hover:text-accent-hover inline-flex w-fit items-center gap-2 text-sm font-semibold"
            >
              {text.all}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
