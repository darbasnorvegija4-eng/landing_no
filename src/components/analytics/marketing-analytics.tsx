"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/routing";

const CONSENT_STORAGE_KEY = "takfornyelse_marketing_consent";
const OPEN_CONSENT_EVENT = "takfornyelse:open-marketing-consent";

const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim();
const googleAdsLeadLabel =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL?.trim();
const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID?.trim();
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
const marketingConfigured = Boolean(
  googleAdsId || googleAnalyticsId || metaPixelId,
);

export type ConsentChoice = "granted" | "denied";
type MetaPixelFunction = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
    fbq?: MetaPixelFunction;
    _fbq?: MetaPixelFunction;
  }
}

function sendGoogleEvent(name: string, params?: Record<string, unknown>) {
  window.gtag?.("event", name, params || {});
}

function sendMetaEvent(name: string, params?: Record<string, unknown>) {
  window.fbq?.("track", name, params || {});
}

function sendMetaCustomEvent(name: string, params?: Record<string, unknown>) {
  window.fbq?.("trackCustom", name, params || {});
}

export function getMarketingConsentChoice(): ConsentChoice | "unknown" {
  if (typeof window === "undefined") return "unknown";
  const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return stored === "granted" || stored === "denied" ? stored : "unknown";
}

type LeadFormEvent =
  | "lead_form_start"
  | "lead_form_step_complete"
  | "lead_form_submit_attempt"
  | "lead_form_validation_error";

const metaLeadFormEvents: Record<LeadFormEvent, string> = {
  lead_form_start: "LeadFormStart",
  lead_form_step_complete: "LeadFormStepComplete",
  lead_form_submit_attempt: "LeadFormSubmitAttempt",
  lead_form_validation_error: "LeadFormValidationError",
};

export function trackLeadFormEvent(
  name: LeadFormEvent,
  params?: {
    step?: number;
    inquiryType?: string;
    errorType?: string;
  },
) {
  const eventParams = {
    ...(params?.step ? { form_step: params.step } : {}),
    ...(params?.inquiryType ? { inquiry_type: params.inquiryType } : {}),
    ...(params?.errorType ? { error_type: params.errorType } : {}),
  };
  sendGoogleEvent(name, eventParams);
  sendMetaCustomEvent(metaLeadFormEvents[name], eventParams);
}

export function trackLeadConversion(params?: { inquiryType?: string }) {
  const eventParams = params?.inquiryType
    ? { inquiry_type: params.inquiryType }
    : undefined;

  sendGoogleEvent("generate_lead", eventParams);
  if (googleAdsId && googleAdsLeadLabel) {
    sendGoogleEvent("conversion", {
      send_to: `${googleAdsId}/${googleAdsLeadLabel}`,
    });
  }
  sendMetaEvent("Lead", eventParams);
}

function initializeGoogleTracking() {
  const loaderId = googleAnalyticsId || googleAdsId;
  if (!loaderId) return;

  window.dataLayer ||= [];
  window.gtag ||= (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());

  for (const measurementId of [googleAnalyticsId, googleAdsId]) {
    if (!measurementId) continue;
    window.gtag("config", measurementId, {
      anonymize_ip: true,
      send_page_view: false,
    });
  }

  if (!document.querySelector("script[data-google-tag]")) {
    const script = document.createElement("script");
    script.async = true;
    script.dataset.googleTag = loaderId;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(loaderId)}`;
    document.head.appendChild(script);
  }
}

function initializeMetaPixel() {
  if (!metaPixelId) return;

  if (!window.fbq) {
    const fbq = ((...args: unknown[]) => {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    }) as MetaPixelFunction;
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    window.fbq = fbq;
    window._fbq = fbq;
  }

  window.fbq("init", metaPixelId);
  if (!document.querySelector(`script[data-meta-pixel="${metaPixelId}"]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.dataset.metaPixel = metaPixelId;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }
}

function revokeTrackingConsent() {
  window.gtag?.("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });
  window.fbq?.("consent", "revoke");
}

export function MarketingAnalytics() {
  const locale = useLocale() as "no" | "en";
  const pathname = usePathname();
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored === "granted" || stored === "denied") setChoice(stored);
    const openSettings = () => setSettingsOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, openSettings);
  }, []);

  useEffect(() => {
    if (choice !== "granted") return;
    initializeGoogleTracking();
    initializeMetaPixel();
  }, [choice]);

  useEffect(() => {
    if (choice !== "granted") return;
    sendGoogleEvent("page_view", {
      page_location: window.location.href,
      page_path: pathname,
    });
    sendMetaEvent("PageView");
  }, [choice, pathname]);

  useEffect(() => {
    if (choice !== "granted") return;

    const trackContactClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      const href = anchor?.getAttribute("href") || "";

      if (href.startsWith("tel:")) {
        sendGoogleEvent("phone_click");
        sendMetaEvent("Contact", { contact_method: "phone" });
      } else if (href.startsWith("mailto:")) {
        sendGoogleEvent("email_click");
        sendMetaEvent("Contact", { contact_method: "email" });
      }
    };

    document.addEventListener("click", trackContactClick);
    return () => document.removeEventListener("click", trackContactClick);
  }, [choice]);

  function saveChoice(nextChoice: ConsentChoice) {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, nextChoice);
    setChoice(nextChoice);
    setSettingsOpen(false);
    if (nextChoice === "denied") revokeTrackingConsent();
  }

  if (!marketingConfigured) return null;

  const visible = choice === null || settingsOpen;
  if (!visible) return null;

  const text =
    locale === "no"
      ? {
          title: "Valgfri annonsemåling",
          body: "Vi bruker Google Analytics, Google Ads og Meta Pixel for å måle hvilke annonser som gir henvendelser. Markedsføringssporing aktiveres bare hvis du samtykker.",
          accept: "Godta",
          decline: "Avslå",
          privacy: "Les personvernerklæringen",
        }
      : {
          title: "Optional advertising measurement",
          body: "We use Google Analytics, Google Ads and Meta Pixel to measure which ads generate enquiries. Marketing tracking is activated only if you consent.",
          accept: "Accept",
          decline: "Decline",
          privacy: "Read the privacy policy",
        };

  return (
    <aside
      aria-label={text.title}
      className="fixed inset-x-3 bottom-24 z-[70] mx-auto max-w-2xl rounded-2xl border border-white/15 bg-[#11151b]/98 p-4 shadow-2xl backdrop-blur md:bottom-5 md:p-5"
    >
      <p className="font-semibold">{text.title}</p>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        {text.body}{" "}
        <Link
          href="/personvern"
          className="text-accent underline-offset-2 hover:underline"
        >
          {text.privacy}
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className="bg-accent text-accent-foreground rounded-xl px-5 py-2.5 text-sm font-semibold"
          onClick={() => saveChoice("granted")}
        >
          {text.accept}
        </button>
        <button
          type="button"
          className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold hover:bg-white/10"
          onClick={() => saveChoice("denied")}
        >
          {text.decline}
        </button>
      </div>
    </aside>
  );
}

export function MarketingSettingsButton() {
  const locale = useLocale();
  if (!marketingConfigured) return null;

  return (
    <button
      type="button"
      className="hover:text-accent text-left"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
    >
      {locale === "no" ? "Informasjonskapsler" : "Cookie settings"}
    </button>
  );
}
