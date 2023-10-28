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

const flatmap = (func, sequence) => {
  return accumulate(append, null, map(func, sequence));
};

const enumerate_interval = (low, high) => {
  return low > high ? null : pair(low, enumerate_interval(low + 1, high));
};

const enumerate_number_list = (n) => {
  return flatmap((i) => {
    return map((j) => list(i, j), enumerate_interval(1, i - 1));
  }, enumerate_interval(1, n));
};

// 정수 n이 주어졌을 때 1  j < i  n인 순서쌍 (i, j)들의 순차열을 생성하는 함수 unique_pairs를 작성하라.
// 그리고 그 unique_pairs를 이용해서 앞에 나온 prime_sum_pairs를 더 간단하게 정의하라.

const unique_pair = (n) => {
  return n < 1 ? null : enumerate_number_list(n);
};

console.log(unique_pair(3));
