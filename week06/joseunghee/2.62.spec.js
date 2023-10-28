import { describe, it, expect } from "vitest";
import { union_set, list } from "./2.62";

describe("2.62 테스트", () => {
  describe("union_set", () => {
    it("공집합과 합집합하는 경우1", () => {
      expect(union_set(list(1), null)).toEqual(list(1));
    });

    it("공집합과 합집합하는 경우2", () => {
      expect(union_set(null, list(3))).toEqual(list(3));
    });

    it("원소가 있는 집합끼리 합집합하는 경우", () => {
      expect(union_set(list(1, 88, 99), list(2, 100))).toEqual(list(1, 2, 88, 99, 100));
    });
  });
});
