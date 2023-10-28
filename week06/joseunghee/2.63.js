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

const entry = (tree) => head(tree);
const left_branch = (tree) => head(tail(tree));
const right_branch = (tree) => tail(tail(tree));
const make_tree = (entry, left, right) => list(entry, left, right);

const is_element_of = (x, set) => {
  if (is_null(set)) return false;
  if (equal(x, entry(set))) return true;

  // 원소가 tree의 entry보다 작다면 왼쪽 branch에서 재귀적으로 탐색한다.
  if (entry(set) > x) {
    return is_element_of(x, left_branch(set));
  }

  // 원소가 tree의 entry보다 크다면 왼쪽 branch에서 재귀적으로 탐색한다.
  return is_element_of(x, right_branch(set));
};
