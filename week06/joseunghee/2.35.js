export const pair = (x, y) => [x, y];
const head = (pair) => pair[0];
const tail = (pair) => pair[1];
const is_null = (x) => x === null;
export const list = (...args) =>
  args.length === 0 ? null : pair(args[0], list(...args.slice(1)));

const filter = (fn, sequence) => {
  if (sequence === null) {
    return;
  }
  // 만족하면 선택하고, 나머지는 재귀적으로 탐색한다.
  if (fn(head(sequence))) {
    return pair(head(sequence), filter(fn, tail(sequence)));
  }
  // 만족하지 않는다면 나머지만 재귀적으로 탐색한다.
  return filter(fn, tail(sequence));
};

const accumulate = (op, initial, sequence) => {
  if (is_null(sequence)) {
    return initial;
  }
  return op(head(sequence), accumulate(op, initial, tail(sequence)));
};

const plus = (a, b) => a + b;

const map = (fn, sequence) => {
  if (is_null(sequence)) {
    return null;
  }
  return pair(fn(head(sequence)), map(fn, tail(sequence)));
};

export const count_lives = (tree) => {
  return accumulate(
    plus,
    0,
    map(function (sub_tree) {
      // 빈 트리인 경우 0 반환
      if (sub_tree === null) {
        return 0;
      }

      // 잎이있는 노드라면 재귀적으로 탐색해서 잎의 갯수를 센다.
      if (tail(sub_tree)) {
        return count_lives(sub_tree);
      }

      // 잎만 있는 노드라면 1 반환
      return 1;
    }, tree)
  );
};
