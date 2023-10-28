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

const equal = (list1, list2) => {
  if (is_pair(list1) && is_pair(list2)) {
    return equal(head(list1), head(list2)) && equal(tail(list1), tail(list2));
  }

  if (!is_pair(list1) && !is_pair(list2)) {
    return list1 === list2;
  }

  return false;
};

console.log(
  "answer1: ",
  equal(list("this", "is", "a", "list"), list("this", "is", "a", "list")),
  "\nanswer2",
  equal(list("this", "is", "a", "list"), list("this", list("is", "a"), "list"))
);
