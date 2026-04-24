import { describe, expect, it } from "vitest";
import { normalizeHttpsUrl } from "@/lib/url";

describe("normalizeHttpsUrl", () => {
  it("returns normalized HTTPS URLs", () => {
    expect(normalizeHttpsUrl("https://example.com/tickets")).toBe("https://example.com/tickets");
  });

  it("rejects non-HTTPS URLs", () => {
    expect(normalizeHttpsUrl("http://example.com/tickets")).toBeNull();
    expect(normalizeHttpsUrl("javascript:alert('xss')")).toBeNull();
  });

  it("returns null for invalid or empty values", () => {
    expect(normalizeHttpsUrl("")).toBeNull();
    expect(normalizeHttpsUrl("not-a-url")).toBeNull();
    expect(normalizeHttpsUrl(null)).toBeNull();
    expect(normalizeHttpsUrl(undefined)).toBeNull();
  });
});
