const pair = (x,y) => [x,y];
const list = (...args) => args.length === 0 ? null : pair(args[0], list(...args.slice(1)));
const head = (pair) => pair[0];
const tail = (pair) => pair[1];


const x = list(1,2,3)
const y = list(4,5,6)

append(x,y) 
// [1,[2,[3,[4,[5,[6,null]]]]
// list(1,2,3,4,5,6)


pair(list(1,2,3), list(4,5,6))
// [ [ 1, [ 2, [ 3, null ] ] ], [ 4, [ 5, [ 6, null ] ] ] ]
// list(list(1,2,3), list(4,5,6))

list(x,y)
// [[1,[2,[3,null]]],[[4,[5,[6,null]]],null]
// list(list(1,2,3), list(4,5,6))