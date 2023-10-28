const pair = (x, y) => [x, y];
const head = (pair) => pair[0];
const tail = (pair) => pair[1];
export const list = (...args) => (args.length === 0 ? null : pair(args[0], list(...args.slice(1))));

const is_pair = (x) => Array.isArray(x) && x.length === 2;
const is_null = (x) => x === null;
const 공집합인지 = (set) => is_null(set);

export const equal = (a1, a2) => {
  if (is_pair(a1) && is_pair(a2)) {
    return equal(head(a1), head(a2)) && equal(tail(a1), tail(a2));
  }
  return a1 === a2;
};

// 오름차순으로 유지하는 집합
const is_element_of = (x, set) => {
  if (is_null(set)) return false;
  if (equal(x, head(set))) return true;

  // 집합의 가장 작은 수보다 작다면 집합에 존재하지 않는 수
  if (head(set) > x) {
    return false;
  }

  // 집합의 가장 작은 수보다 크다면 그 다음 수를 확인한다.
  return is_element_of(x, tail(set));
};

export const adjoin_set = (x, set) => {
  if (공집합인지(set)) {
    return pair(x, set);
  }
  // 집합의 가장 작은 수보다 작다면 집합에 존재하지 않는 수
  // 바로 집합에 포함한다.
  if (head(set) > x) {
    return pair(x, set);
  }
  return adjoin_set(x, tail(set));
};
