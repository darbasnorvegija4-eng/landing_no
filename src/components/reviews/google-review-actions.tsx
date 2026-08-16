import { ExternalLink, MessageSquareHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { googleBusinessProfile } from "@/content/google-business";

type Props = {
  locale: "no" | "en";
  size?: "default" | "lg";
};

export function GoogleReviewActions({ locale, size = "default" }: Props) {
  const copy =
    locale === "no"
      ? {
          write: "Skriv en omtale på Google",
          view: "Se Google-profilen",
        }
      : {
          write: "Write a review on Google",
          view: "View the Google profile",
        };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <Button asChild size={size}>
        <a
          href={googleBusinessProfile.reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageSquareHeart aria-hidden />
          {copy.write}
        </a>
      </Button>
      <Button asChild size={size} variant="outline">
        <a
          href={googleBusinessProfile.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {copy.view}
          <ExternalLink aria-hidden />
        </a>
      </Button>
    </div>
  );
}
