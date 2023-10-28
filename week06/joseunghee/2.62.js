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

const is_element_of = (x, set) => {
  if (is_null(set)) return false;
  if (equal(x, head(set))) return true;
  if (head(set) > x) {
    return false;
  }
  return is_element_of(x, tail(set));
};

export const union_set = (set1, set2) => {
  if (공집합인지(set1)) return set2;
  if (공집합인지(set2)) return set1;

  const head1 = head(set1);
  const head2 = head(set2);

  // head가 같다면 head를 제외한 나머지를 비교한다.
  if (head1 === head2) {
    return pair(head1, union_set(tail(set1), tail(set2)));
  }

  // head2가 크다면, head1을 추가하고 head1을 제외한 나머지를 비교한다.
  if (head1 < head2) {
    return pair(head1, union_set(tail(set1), set2));
  }

  if (head1 > head2) {
    return pair(head2, union_set(set1, tail(set2)));
  }
  return pair(head1, union_set(tail(set1), tail(set2)));
};
