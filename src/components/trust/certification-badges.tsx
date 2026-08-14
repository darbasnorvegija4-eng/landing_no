import Image from "next/image";
import { cn } from "@/lib/utils";

type CertificationBadgesProps = {
  className?: string;
};

export function CertificationBadges({ className }: CertificationBadgesProps) {
  return (
    <div className={cn("overflow-hidden rounded-2xl bg-[#0c0e12]", className)}>
      <Image
        src="/certifications/sertifisert-og-godkjent.png"
        alt="Sertifisert og godkjent: Sentralt godkjent, StartBANK og Miljøfyrtårn"
        width={1839}
        height={855}
        sizes="(max-width: 640px) calc(100vw - 2rem), 505px"
        className="h-auto w-full"
        loading="lazy"
        quality={90}
      />
    </div>
  );
}
