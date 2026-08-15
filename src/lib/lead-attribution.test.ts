import { describe, expect, it } from "vitest";
import { captureLeadAttribution } from "@/lib/lead-attribution";

describe("captureLeadAttribution", () => {
  it("captures advertising parameters and the initial landing context", () => {
    expect(
      captureLeadAttribution(
        "https://www.takfornyelse.as/no?utm_source=meta&utm_medium=paid_social&utm_campaign=august&utm_content=for_etter&fbclid=abc#referanser",
        "https://www.facebook.com/",
      ),
    ).toEqual({
      utmSource: "meta",
      utmMedium: "paid_social",
      utmCampaign: "august",
      utmContent: "for_etter",
      fbclid: "abc",
      landingPage:
        "https://www.takfornyelse.as/no?utm_source=meta&utm_medium=paid_social&utm_campaign=august&utm_content=for_etter&fbclid=abc#referanser",
      referrer: "https://www.facebook.com/",
    });
  });

  it("does not add empty attribution values", () => {
    expect(captureLeadAttribution("https://www.takfornyelse.as/no")).toEqual({
      landingPage: "https://www.takfornyelse.as/no",
      referrer: undefined,
    });
  });
});
