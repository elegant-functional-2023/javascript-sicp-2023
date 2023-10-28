import { describe, it, expect } from "vitest";
import { list, count_lives, pair } from "./2.35";

describe("count_lives", () => {
  it("should count lives", () => {
    const tree = list(1, 2, 3);
    const tree2 = list(1, 2, list(2, 3));
    const tree3 = list(1, 2, list(2, 3, list(3, 4)));
    expect(count_lives(tree)).toBe(3);
    expect(count_lives(tree2)).toBe(4);
    expect(count_lives(tree3)).toBe(6);
  });
});
