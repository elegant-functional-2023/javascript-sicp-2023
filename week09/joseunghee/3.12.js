const pair = (x, y) => [x, y];
const head = (pair) => pair[0];
const tail = (pair) => pair[1];
const list = (...args) =>
  args.length === 0 ? null : pair(args[0], list(...args.slice(1)));

const is_null = (x) => x === null;

function append(x, y) {
  return is_null(x) ? y : pair(head(x), append(tail(x), y));
}

function set_tail(pair, new_tail) {
  pair[1] = new_tail;
}

const last_pair = (x) => (is_null(tail(x)) ? x : last_pair(tail(x)));

function append_mutator(x, y) {
  set_tail(last_pair(x), y);
  return x;
}

const x = list("a", "b");
const y = list("c", "d");
const z = append(x, y);

console.log(head(x));
console.log(tail(x));

// append 함수는 인자로 받은 x,y의 값을 직접 변경하지 않고 새로운 리스트를 생성하여 반환하는 함수: "순수 함수"
// 따라서 z의 tail이 가리키는 값과 x의 tail이 가리키는 값은 다른 값이다.

const w = append_mutator(x, y);

// w는 x의 참조값을 가짐
// append_mutator 함수는 x를 직접 변경하는 set_tail mutator를 호출함
console.log(w);
console.log(x);
