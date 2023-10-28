const is_null = (value) => value == null;

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

const map = (func, items) => {
  return is_null(items)
    ? null
    : pair(func(head(items)), map(func, tail(items)));
};

const square = (x) => x * x;

const is_pair = (pair) => Array.isArray(pair) && pair.length === 2;

const square_tree = (items) => {
  return is_null(items)
    ? null
    : !is_pair(items)
    ? square(items)
    : pair(square_tree(head(items)), square_tree(tail(items)));
};

const result = square_tree(list(1, list(2, list(3, 4), 5), list(6, 7)));

// list(1, list(4, list(9, 16), 25), list(36, 49));

console.log(result.toString());
