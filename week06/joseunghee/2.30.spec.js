import { describe, it, expect } from "vitest";
import { square_tree, list } from "./2.30";

describe("square tree", () => {
  it("should return square tree", () => {
    expect(square_tree(list(1, 2, 3))).toEqual(list(1, 4, 9));
    expect(square_tree(list(1, list(2, 3), list(4, 5, 6)))).toEqual(
      list(1, list(4, 9), list(16, 25, 36))
    );
  });
});
