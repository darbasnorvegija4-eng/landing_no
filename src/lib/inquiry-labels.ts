const LABELS_NO: Record<string, string> = {
  takvask: "Takvask",
  takvask_impregnering: "Takvask + impregnering",
  impregnering: "Impregnering",
  takmaling: "Takmaling",
  nytt_tak: "Nytt tak",
  usikker: "Usikker – taksjekk",
  vedlikehold: "Vedlikehold (eldre)",
  kledning: "Kledning (eldre)",
};

export function inquiryTypeLabelNo(type: string) {
  return LABELS_NO[type] || type;
}

export function languageLabelNo(locale: string) {
  return locale === "en" ? "Engelsk" : "Norsk";
}
