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

function map(fun,items){
    return is_null(items)
    ?  null
    : pair(fun(head(items)), map(fun,tail(items)));
}

function square_list(items){
    return is_null(items)
    ? null
    : pair(head(items) * head(items), square_list(tail(items)));
}

function square_list2(items){
    return map(x=> x * x, items)
}