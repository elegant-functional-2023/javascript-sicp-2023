import { describe, it, expect } from "vitest";
import { union_set, list } from "./2.59";

describe("union_set", () => {
  it("should return null when both sets are null", () => {
    expect(union_set(null, null)).toBe(null);
  });

  it("should return set1 when set2 is null", () => {
    expect(union_set(list(1, 2, 3), null)).toEqual(list(1, 2, 3));
  });

  it("should return set2 when set1 is null", () => {
    expect(union_set(null, list(1, 2, 3))).toEqual(list(1, 2, 3));
  });

  it("should return union set of set1 and set2", () => {
    expect(union_set(list(1, 2, 3), list(2, 3, 4))).toEqual(list(1, 2, 3, 4));
  });

  it("should return union set of set1 and set2", () => {
    expect(union_set(list(1, 2, 3), list(4, 5, 6))).toEqual(list(1, 2, 3, 4, 5, 6));
  });
});
