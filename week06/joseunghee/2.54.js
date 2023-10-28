const pair = (x, y) => [x, y];
const head = (pair) => pair[0];
const tail = (pair) => pair[1];
const list = (...args) => (args.length === 0 ? null : pair(args[0], list(...args.slice(1))));

const is_number = (x) => typeof x === "number";
const is_string = (x) => typeof x === "string";
const is_pair = (x) => Array.isArray(x) && x.length === 2;

const equal = (a1, a2) => {
  if (is_number(a1) && is_number(a2)) return a1 === a2;
  if (is_string(a1) && is_string(a2)) return a1 === a2;
  if (is_pair(a1) && is_pair(a2)) {
    return equal(head(a1), head(a2)) && equal(tail(a1), tail(a2));
  }
  return a1 === a2;
};

console.log(equal(1, 1));
console.log(equal(1, 2));

console.log(equal("a", "a"));
console.log(equal("a", "b"));

console.log(equal(list(1, 2), list(1, 3)));
console.log(equal(list(1, 2, 3), list(1, 2, 4)));

console.log(equal(list("this", "is", "a", "list"), list("this", "is", "a", "list")));
console.log(equal(list("this", "is", "a", "list"), list("this", list("is", "a"), "list")));
