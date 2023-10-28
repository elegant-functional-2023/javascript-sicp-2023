import { describe, it, expect } from "vitest";
import { union_set, list, adjoin_set } from "./2.61";

describe("2.61 테스트", () => {
  describe("adjoin_set", () => {
    it("공집합에 원소를 추가하는 경우", () => {
      expect(adjoin_set(1, null)).toEqual(list(1));
    });
    it("공집합이 아닌 집합이 원소를 추가하는 경우", () => {
      expect(adjoin_set(1, list(2, 3))).toEqual(list(1, 2, 3));
    });

    it("중복된 원소를 추가하는 경우", () => {
      expect(adjoin_set(1, list(1, 2, 3))).toEqual(list(1, 2, 3));
    });
  });
});
