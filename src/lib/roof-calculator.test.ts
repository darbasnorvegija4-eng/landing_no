import { describe, expect, it } from "vitest";
import { calculateRoofComparison } from "./roof-calculator";

describe("roof price comparison", () => {
  it("compares the approved VAT-inclusive renewal rate", () => {
    expect(calculateRoofComparison(150, 2500, 421.25)).toEqual({
      newRoof: 375000,
      renewal: 63187.5,
      difference: 311812.5,
      savingsPercent: 83,
    });
  });

  it("never presents a negative saving", () => {
    expect(calculateRoofComparison(100, 300, 400)).toEqual({
      newRoof: 30000,
      renewal: 40000,
      difference: 0,
      savingsPercent: 0,
    });
  });
});
