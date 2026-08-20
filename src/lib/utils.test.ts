import { describe, expect, it } from "vitest";
import { formatNok, formatNokRate } from "./utils";

describe("NOK formatting", () => {
  it("uses Norwegian separators for Norwegian pages", () => {
    expect(formatNokRate(421.25, "no")).toContain("421,25");
  });

  it("uses English separators and an explicit currency code", () => {
    expect(formatNok(63187.5, "en")).toContain("NOK 63,188");
    expect(formatNokRate(421.25, "en")).toContain("NOK 421.25");
  });
});
