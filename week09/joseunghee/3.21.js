const pair = (x, y) => [x, y];
const head = (pair) => pair[0];
const tail = (pair) => pair[1];
const is_null = (x) => x === null;
const list = (...args) =>
  args.length === 0 ? null : pair(args[0], list(...args.slice(1)));

const last_pair = (list) =>
  tail(list) === null ? list : last_pair(tail(list));

const front_ptr = (queue) => head(queue);

const rear_ptr = (queue) => tail(queue);

const is_empty_queue = (queue) => is_null(front_ptr(queue));

const make_queue = () => pair(null, null);

function set_head(pair, item) {
  pair[0] = item;
}

function set_tail(pair, item) {
  pair[1] = item;
}

function set_front_ptr(queue, item) {
  set_head(queue, item);
}

function set_rear_ptr(queue, item) {
  set_tail(queue, item);
}

function front_queue(queue) {
  return is_empty_queue(queue) ? Error("Error") : head(front_ptr(queue));
}

function insert_queue(queue, item) {
  const new_pair = pair(item, null);
  // 만약 초기 queue(빈 큐)라면
  if (is_empty_queue(queue)) {
    // front, rear의 참조값을 new_pair로 설정
    set_front_ptr(queue, new_pair);
    set_rear_ptr(queue, new_pair);
  } else {
    // 아니라면 기존 rear의 tail을 new_pair로 설정
    set_tail(rear_ptr(queue), new_pair);

    // rear의 참조값을 new_pair로 설정
    set_rear_ptr(queue, new_pair);
  }
}

function delete_queue(queue) {
  if (is_empty_queue(queue)) {
    Error("Error");
  } else {
    set_front_ptr(queue, tail(front_ptr(queue)));
    return queue;
  }
}

const q1 = make_queue();

insert_queue(q1, "a");
print_queue(q1);

insert_queue(q1, "b");
print_queue(q1);

delete_queue(q1);
print_queue(q1);

delete_queue(q1);
print_queue(q1);

// queue의 입구(front)부터 출구(rear)까지 출력하는 함수
// queue의 front_ptr을 순회하면서 출력
function print_queue(queue) {
  if (is_empty_queue(queue)) {
    console.log([]);
    return;
  }

  const front = front_ptr(queue);
  traverse(front, []);

  function traverse(pair, arr) {
    if (is_null(pair)) {
      console.log(arr);
      return;
    }
    traverse(tail(pair), [...arr, head(pair)]);
  }
}
