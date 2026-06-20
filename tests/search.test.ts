import { describe, expect, it } from "vitest";
import { searchProvince, searchWard } from "../src";

describe("search", () => {
  it("searches province with diacritics", () => {
    expect(searchProvince("Khánh Hòa")[0]?.item.code).toBe("56");
  });

  it("searches province without diacritics", () => {
    expect(searchProvince("khanh hoa")[0]?.item.code).toBe("56");
  });

  it("searches ward with province filter", () => {
    const results = searchWard("loc tho", { provinceCode: "56" });
    expect(results).toHaveLength(1);
    expect(results[0]?.item.code).toBe("56001");
  });

  it("returns multiple candidates for ambiguous ward names", () => {
    const results = searchWard("loc tho");
    expect(results.length).toBeGreaterThan(1);
  });
});
