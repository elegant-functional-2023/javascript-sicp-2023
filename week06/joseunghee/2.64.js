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

const list_to_tree = (elements) => partial_tree(elements, length(elements));

const partial_tree = (elts, n) => {
  if (n === 0) {
    return pair(null, elts);
  }
  const left_size = math_floor((n - 1) / 2);
  const left_result = partial_tree(elts, left_size);
  const left_tree = head(left_result);
  const non_left_elts = tail(left_result);
  const right_size = n - (left_size + 1);
  const this_entry = head(non_left_elts);
  const right_result = partial_tree(tail(non_left_elts), right_size);
  const right_tree = head(right_result);
  const remaining_elts = tail(right_result);
  return pair(make_tree(this_entry, left_tree, right_tree), remaining_elts);
};
