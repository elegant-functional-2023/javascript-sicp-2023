const pair = (x,y) => [x,y];
const head = (pair) => pair[0];
const tail = (pair) => pair[1];
const list = (...args) => {
    return args.length === 0
        ? null
        : pair(args[0], list(...args.slice(1)));
}


const plus_curried = (x) => (y) => x + y;
function brooks(fn, ...args){
    return args.length === 1 ? 
        fn(args[0]) : 
        brooks(fn(args[0]), args.slice(1));
}

console.log(brooks(plus_curried, list(3,4)))
console.log(plus_curried(3)(4));

// brooks(plus_curried, [3,4])는 (plus_curried(3)(4)와 같음