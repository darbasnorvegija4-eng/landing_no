import Image from "next/image";
import { cn } from "@/lib/utils";

type CertificationBadgesProps = {
  className?: string;
};

export function CertificationBadges({ className }: CertificationBadgesProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-white/10 bg-[#02062a] shadow-[0_18px_60px_rgba(0,0,0,0.2)]",
        className,
      )}
    >
      <Image
        src="/certifications/sertifisert-og-godkjent.png"
        alt="Sertifisert og godkjent: Sentralt godkjent, StartBANK og Miljøfyrtårn"
        width={505}
        height={235}
        sizes="(max-width: 640px) calc(100vw - 2rem), 505px"
        className="h-auto w-full"
        loading="lazy"
        quality={90}
      />
    </div>
  );
}
