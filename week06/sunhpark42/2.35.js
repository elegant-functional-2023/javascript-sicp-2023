const is_null = (value) => value == null;
const is_not_null = (value) => !is_null(value);

const pair = (a, b) => [a, b];

const head = (pair) => pair[0];
const tail = (pair) => pair[1];

const list = (...items) => {
  const iter = (items, acc) => {
    if (is_null(items)) {
      return acc;
    }

    const hello = [...items].slice(1, items.length);

    return iter(hello.length > 0 ? hello : null, pair(head(items), acc));
  };

  return iter(items.reverse(), null);
};

const is_pair = (pair) => Array.isArray(pair) && pair.length === 2;

const append = (list1, list2) => {
  return is_null(list1) ? list2 : pair(head(list1), append(tail(list1), list2));
};

const enumerate_tree = (tree) => {
  return is_null(tree)
    ? null
    : !is_pair(tree)
    ? list(tree)
    : append(enumerate_tree(head(tree)), enumerate_tree(tail(tree)));
};

const accumulate = (operation, initial, sequence) => {
  return is_null(sequence)
    ? initial
    : operation(head(sequence), accumulate(operation, initial, tail(sequence)));
};

const map = (func, items) => {
  return is_null(items)
    ? null
    : pair(func(head(items)), map(func, tail(items)));
};

const filter = (predicate, sequence) => {
  return is_null(sequence)
    ? null
    : predicate(head(sequence))
    ? pair(head(sequence), filter(predicate, tail(sequence)))
    : filter(predicate, tail(sequence));
};

const plus = (x, y) => x + y;

// 트리의 전체 잎 노드수를 반환

// 열거: 트리의 잎
// 필터: is_null
// 누산: +, 0
const count_leaves = (tree) => {
  return accumulate(
    plus,
    0,
    map(() => 1, filter(is_not_null, enumerate_tree(tree)))
  );
};

console.log(count_leaves(list(1, list(2, list(3, 4)), list(5, 6))));
