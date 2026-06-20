import { describe, expect, it } from "vitest";
import { convertOldToNew } from "../src";

describe("convertOldToNew", () => {
  it("converts full old province + district + ward", () => {
    const result = convertOldToNew({ province: "Khánh Hòa", district: "Nha Trang", ward: "Lộc Thọ", streetAddress: "123 Lê Lợi" });
    expect(result.success).toBe(true);
    expect(result.newAddress?.wardCode).toBe("56001");
    expect(result.confidence).toBeGreaterThan(0.9);
  });

  it("converts no-diacritics input", () => {
    const result = convertOldToNew({ province: "Khanh Hoa", district: "Nha Trang", ward: "Loc Tho" });
    expect(result.success).toBe(true);
    expect(result.newAddress?.provinceCode).toBe("56");
  });

  it("missing ward returns candidates", () => {
    const result = convertOldToNew({ province: "Khánh Hòa", district: "Nha Trang" });
    expect(result.success).toBe(false);
    expect(result.candidates.length).toBeGreaterThan(0);
  });

  it("ambiguous ward does not force a match", () => {
    const result = convertOldToNew({ province: "Khánh Hòa", ward: "Unknown" });
    expect(result.success).toBe(false);
  });
});
