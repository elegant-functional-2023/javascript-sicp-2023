function is_null(list){
    return list === null;
}
const pair = (x,y) => [x,y];
const head = (pair) => pair[0];
const tail = (pair) => pair[1];
const list = (...args) => {
    return args.length === 0
        ? null
        : pair(args[0], list(...args.slice(1)));
}

function for_each(fn, items){
    if(is_null(items)){
        return true;
    } else {
        fn(head(items));
        return for_each(fn, tail(items));
    }
}

console.log(for_each(x => console.log(x), list(1,2,3,4,5)))