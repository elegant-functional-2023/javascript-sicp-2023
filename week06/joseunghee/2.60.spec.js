import { describe, it, expect } from "vitest";
import { union_set, list, equal } from "./2.60";

describe("중복이 허용되는 목록으로 표현", () => {
  it("union_set", () => {
    expect(union_set(list(2, 2, 2), list(2, 2))).toEqual(list(2, 2, 2, 2, 2));
  });
});
