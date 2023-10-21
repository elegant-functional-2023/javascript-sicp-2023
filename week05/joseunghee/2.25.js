const pair = (x,y) => [x,y];
const list = (...args) => args.length === 0 ? null : pair(args[0], list(...args.slice(1)));
const head = (pair) => pair[0];
const tail = (pair) => pair[1];

const list1 = list(1,3,list(5,7),9);
const list2 = list(list(7)) // [[7,null], null]
const list3 = list(1, list(2, list(3, list(4, list(5, list(6,7))))));

console.log((head(tail(head(tail(tail(list1)))))))
console.log(head(head(list2)));
console.log(head(tail(head(tail(head(tail(head(tail(head(tail(head(tail(list3)))))))))))))