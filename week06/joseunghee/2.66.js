const pair = (x, y) => [x, y];
const head = (pair) => pair[0];
const tail = (pair) => pair[1];
const list = (...args) =>
  args.length === 0 ? null : pair(args[0], list(...args.slice(1)));

const is_pair = (x) => Array.isArray(x) && x.length === 2;
const is_null = (x) => x === null;

export const make_record = (key, value) => list(key, value);
export const key = (record) => head(record);
export const value = (record) => head(tail(record));

const equal = (a1, a2) => {
  if (is_pair(a1) && is_pair(a2)) {
    return equal(head(a1), head(a2)) && equal(tail(a1), tail(a2));
  }
  return a1 === a2;
};

// 처음부터 끝까지 순회하면서 key를 비교한다.
const look_up = (given_key, set_of_records) => {
  if (is_null(set_of_records)) {
    return null;
  }
  const record = head(set_of_records);
  if (equal(given_key, key(record))) {
    return value(record);
  }
  return look_up(given_key, tail(set_of_records));
};

// 이진트리 look_up. 오름차순으로 정렬된 상태라고 가정한다.
export const entry = (tree) => head(tree);
export const left_branch = (tree) => head(tail(tree));
export const right_branch = (tree) => head(tail(tail(tree)));
export const make_tree = (entry, left, right) => list(entry, left, right); // [entry, [left, [right, null]]]

const is_element_of = (x, set) => {
  if (is_null(set)) return false;
  if (equal(x, entry(set))) return true;
  if (entry(set) > x) {
    return is_element_of(x, left_branch(set));
  }
  return is_element_of(x, right_branch(set));
};

const adjoin_set = (x, tree) => {
  if (is_null(tree)) {
    return make_tree(x, null, null);
  }
  if (entry(tree) > x) {
    return make_tree(
      entry(tree),
      adjoin_set(x, left_branch(tree)),
      right_branch(tree)
    );
  }
  return make_tree(
    entry(tree),
    left_branch(tree),
    adjoin_set(tree, right_branch(tree))
  );
};

export const look_up2 = (given_key, tree) => {
  if (is_null(tree)) {
    return false;
  }

  const record = entry(tree);
  const record_key = key(record);
  const record_value = value(record);

  if (equal(given_key, record_key)) {
    return record_value;
  }

  if (record_key > given_key) {
    return look_up2(given_key, left_branch(tree));
  }

  return look_up2(given_key, right_branch(tree));
};
