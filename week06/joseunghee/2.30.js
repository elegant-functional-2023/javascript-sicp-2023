const pair = (x, y) => [x, y];
const head = (pair) => pair[0];
const tail = (pair) => pair[1];
export const list = (...args) =>
  args.length === 0 ? null : pair(args[0], list(...args.slice(1)));
const is_null = (x) => x === null;
const is_pair = (x) => Array.isArray(x) && x.length === 2;
const is_number = (x) => typeof x === "number";
const map = (fn, list) =>
  is_null(list) ? null : pair(fn(head(list)), map(fn, tail(list)));

export const square_tree = (tree) => {
  return map(
    (sub_tree) =>
      is_number(sub_tree) ? sub_tree * sub_tree : square_tree(sub_tree),
    tree
  );
};
