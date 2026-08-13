import { describe, expect, it } from "vitest";
import { contactMethodSchema } from "./lead-contact-validation";

describe("contactMethodSchema", () => {
  it("accepts phone only", () => {
    expect(contactMethodSchema.safeParse({ phone: "90000000" }).success).toBe(
      true,
    );
  });

  it("accepts email only", () => {
    expect(
      contactMethodSchema.safeParse({ email: "kunde@example.no" }).success,
    ).toBe(true);
  });

  it("accepts phone and email together", () => {
    expect(
      contactMethodSchema.safeParse({
        phone: "90000000",
        email: "kunde@example.no",
      }).success,
    ).toBe(true);
  });

  it("rejects a lead without either contact method", () => {
    expect(contactMethodSchema.safeParse({}).success).toBe(false);
  });
});
