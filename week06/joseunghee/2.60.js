const pair = (x, y) => [x, y];
const head = (pair) => pair[0];
const tail = (pair) => pair[1];
export const list = (...args) => (args.length === 0 ? null : pair(args[0], list(...args.slice(1))));

const is_pair = (x) => Array.isArray(x) && x.length === 2;
const is_null = (x) => x === null;

export const equal = (a1, a2) => {
  if (is_pair(a1) && is_pair(a2)) {
    return equal(head(a1), head(a2)) && equal(tail(a1), tail(a2));
  }
  return a1 === a2;
};

const is_element_of = (x, set) => {
  if (is_null(set)) return false;
  if (equal(x, head(set))) return true;
  return is_element_of(x, tail(set));
};

const adjoin_set = (x, set) => {
  return pair(x, set);
};

const intersection_set = (set1, set2) => {
  if (is_null(set1) || is_null(set2)) return null;
  return intersection_set(tail(set1), set2);
};

export const union_set = (set1, set2) => {
  if (is_null(set1)) return set2;
  if (is_null(set2)) return set1;
  return pair(head(set1), union_set(tail(set1), set2));
};

// 성능 향상
// 더이상 중복을 확인할 필요가없음 (is_element_of)
// 따라서 O(N) 만큼의 시간이 사라지고 O(1) 만큼의 시간이 추가됨
// 대신 메모리 오버헤드가 커짐
