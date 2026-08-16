"use client";

import { useEffect, useState } from "react";
import { Phone, CalendarCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/routing";
import {
  usePageCopy,
  useSiteSettings,
} from "@/components/site-settings-provider";

export function StickyBottomCta() {
  const copy = usePageCopy();
  const settings = useSiteSettings();
  const pathname = usePathname();
  const [hasLocalBooking, setHasLocalBooking] = useState(false);

  useEffect(() => {
    setHasLocalBooking(Boolean(document.getElementById("bestill")));
  }, [pathname]);

  const bookingClassName =
    "bg-accent text-accent-foreground shadow-accent/20 inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg text-sm font-semibold shadow-md transition-colors active:scale-[0.98]";
  const bookingLabel = (
    <>
      <CalendarCheck className="size-3.5" />
      {copy.sticky.book}
    </>
  );

  return (
    <div className="bg-background/90 fixed inset-x-0 bottom-0 z-40 border-t border-white/10 px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <a
          href={settings.phoneHref}
          className="text-foreground inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-white/5 text-sm font-medium transition-colors active:scale-[0.98]"
        >
          <Phone className="size-3.5" />
          {copy.sticky.call}
        </a>
        {hasLocalBooking ? (
          <a href="#bestill" className={bookingClassName}>
            {bookingLabel}
          </a>
        ) : (
          <Link href="/#bestill" className={bookingClassName}>
            {bookingLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
