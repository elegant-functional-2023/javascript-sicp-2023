import { describe, it, expect } from "vitest";
import {
  make_record,
  look_up2,
  make_tree,
  left_branch,
  entry,
  value,
  right_branch,
} from "./2.66";

describe("2.66 테스트", () => {
  describe("look_up2", () => {
    it("키가 C인 레코드의 값을 찾는다.", () => {
      //   B(3)
      // A(1) C(5)
      //         E(10)
      //       D(9) F(11)

        const tree = make_tree(
            make_record("B", 3),
            make_tree(make_record("A", 1), null, null),
            make_tree(make_record("C", 5), null, 
                make_tree(make_record("E", 10), 
                    make_tree(make_record("D", 9), null, null), 
                    make_tree(make_record("F", 11), null, null)))
        );
        
        expect(look_up2("D", tree)).toBe(9);
        expect(look_up2("C", tree)).toBe(5);
        expect(look_up2("F", tree)).toBe(11);
        
    });

    // make_tree를 사용하여 복잡한 이진 트리를 만들어서 테스트한다.
    // 오름차순으로 정렬된 상태라고 가정한다.
  });
});
