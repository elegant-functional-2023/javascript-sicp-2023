const pair = (x,y) => [x,y];
const head = (pair) => pair[0];
const tail = (pair) => pair[1];
const list = (...args) => {
    return args.length === 0
        ? null
        : pair(args[0], list(...args.slice(1)));
}

const is_null = (x) => x === null;

function reverse(items){
    function reverse_iter(items, result){
        return is_null(items)
            ? result
            : reverse_iter(tail(items), pair(head(items), result));
    }

    return reverse_iter(items, null);
}


// function deep_reverse(items){
//     function deep_reverse_iter(items, result){
//         return is_null(items)
//             ? result
//             : deep_reverse_iter(tail(items), pair(reverse(head(items)), result));
//     }
// }

console.log(reverse(list(list(1,2), list(3,4))));