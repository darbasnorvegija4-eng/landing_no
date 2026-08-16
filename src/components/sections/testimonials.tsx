"use client";

import { ArrowRight, Star } from "lucide-react";
import { useLocale } from "next-intl";
import { GoogleReviewActions } from "@/components/reviews/google-review-actions";
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
          intro:
            "Vi samler nye, verifiserbare kundeomtaler på Google-profilen til Fornyelse Gruppen AS – selskapet bak Takfornyelse.",
          empty:
            "Har vi utført arbeid for deg? Vi setter pris på en ærlig tilbakemelding om kommunikasjonen, arbeidet og resultatet.",
          all: "Les om kundeomtaler",
        }
      : {
          intro:
            "We collect new, verifiable customer reviews on the Google profile of Fornyelse Gruppen AS – the company behind Takfornyelse.",
          empty:
            "Have we completed work for you? We appreciate honest feedback about the communication, work and result.",
          all: "Read about customer reviews",
        };

  return (
    <section id="omtaler" className="section-pad bg-background-elevated/30">
      <div className="container-narrow">
        <Reveal>
          <p className="eyebrow">{copy.testimonials.eyebrow}</p>
          <h2 className="heading-display mt-3 text-balance">
            {copy.testimonials.title}
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
        ) : (
          <Reveal delay={0.06}>
            <p className="text-muted-foreground mt-8 max-w-2xl leading-relaxed">
              {text.empty}
            </p>
          </Reveal>
        )}

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
