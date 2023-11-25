// 3.12
function append(x, y) {
    return is_null(x)
        ? y
        : pair(head(x), append(tail(x), y));
}
function is_null(x) {
    return x === null;
}
function append_mutator(x, y) {
    set_tail(last_pair(x), y);
    return x;
}
function set_tail(x, y) {
    x[1] = y;
}
function last_pair(x) {
    return is_null(tail(x))
        ? x
        : last_pair(tail(x));
}
const x = list("a", "b");
const y = list("C", "d");
const z = append(x, y);
z;
["a", ["b", ["C", ["d", null]]]]
tail(x);
["b", null]
const w = append_mutator(x, y);
w;
["a", ["b", ["C", ["d", null]]]]
tail(x);
["b", ["C", ["d", null]]]
// 3.21
function set_head(queue, item) {queue[0] = item;}
function front_ptr(queue) {return head(queue);}
function rear_ptr(queue) {return tail(queue);}
function set_front_ptr(queue, item) {set_head(queue, item);}
function set_rear_ptr(queue, item) {set_tail(queue, item);}
function make_queue() {return pair(null, null);}
function is_empty_queue(queue) {return is_null(front_ptr(queue));}
function insert_queue(queue, item) {
    const new_pair = pair(item, null);
    if(is_empty_queue(queue)) {
        set_front_ptr(queue, new_pair);
        set_rear_ptr(queue, new_pair);
    } else {
        set_tail(rear_ptr(queue), new_pair);
        set_rear_ptr(queue, new_pair);
    }
    return queue;
}
function delete_queue(queue) {
    if(is_empty_queue(queue)) {
       throw new Error(queue, "delete_queue called with an empty queue");
    } else {
        const deleted = front_ptr(queue);
        set_front_ptr(queue, tail(front_ptr(queue)));
        return deleted;
    }
}
const q1 = make_queue();
insert_queue(q1, "a");
[["a", null], ["a", null]]
insert_queue(q1, "b");
[["a", ["b", null]], ["b", null]]
delete_queue(q1);
[["b", null], ["b", null]]
delete_queue(q1);
[null, ["b", null]]
function print_queue(queue) {
    display(front_ptr(queue));
    display(rear_ptr(queue));
}
