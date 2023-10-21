const pair = (x, y) => [x, y];
const head = (pair) => pair[0];
const tail = (pair) => pair[1];
const list = (...args) => {
  return args.length === 0 ? null : pair(args[0], list(...args.slice(1)));
};

const last_pair = (list2) => (tail(list2) === null ? list(head(list2)) : last_pair(tail(list2)));

console.log(last_pair(list(23, 72, 149, 34)));
