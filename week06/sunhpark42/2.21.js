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

const square_list = (items) => {
  return is_null(items)
    ? null
    : pair(square(head(items)), square_list(tail(items), null));
};

const square_list_with_map = (items) => {
  return map(square, items);
};

console.log(square_list(list(1, 2, 3, 4)));
console.log(square_list_with_map(list(1, 2, 3, 4)));
