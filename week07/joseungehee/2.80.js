let table = {};

function set_table(key, value) {
  table[key] = value;
}

function put(op, type_tag, item) {
  const key = JSON.stringify(op + "" + type_tag);
  const value = item;
  return set_table(key, value);
}

function get(op, type_tags) {
  const key = JSON.stringify(op + "" + type_tags);
  return table[key];
}

function pair(x, y) {
  return [x, y];
}
function head(pair) {
  return pair[0];
}

function tail(pair) {
  return pair[1];
}

function math_sqrt(x) {
  return Math.sqrt(x);
}

function math_square(x) {
  return x * x;
}

function list(...args) {
  return args.length === 0 ? null : [args[0], list(...args.slice(1))];
}

function is_null(x) {
  return x === null;
}
function is_pair(x) {
  return Array.isArray(x) && x.length === 2;
}

function map(proc, items) {
  return is_null(items) ? null : pair(proc(head(items)), map(proc, tail(items)));
}

function attach_tag(type_tag, contents) {
  return pair(type_tag, contents);
}

function type_tag(datum) {
  if (is_pair(datum)) {
    return head(datum);
  } else {
    throw Error(datum, "Bad tagged datum -- type_tag");
  }
}

// 데이터 객체에서 실제 내용을 추출하는 함수
function contents(datum) {
  if (is_pair(datum)) {
    return tail(datum);
  } else {
    throw Error(datum, "Bad tagged datum -- contents");
  }
}
function install_javascript_number_package() {
  function tag(x) {
    return attach_tag("javascript_number", x);
  }

  put("is_equal_to_zero", "javascript_number", (x) => x === 0);
  put("add", list("javascript_number", "javascript_number"), (x, y) => tag(x + y));
  put("sub", list("javascript_number", "javascript_number"), (x, y) => tag(x - y));
  put("mul", list("javascript_number", "javascript_number"), (x, y) => tag(x * y));
  put("div", list("javascript_number", "javascript_number"), (x, y) => tag(x / y));
  put("make", "javascript_number", (x) => tag(x));
  return "done";
}

install_javascript_number_package();

function make_javascript_number(n) {
  return get("make", "javascript_number")(n);
}

// 인수가 하나일때만 적용되는 apply_generic
function apply_generic(op, args) {
  const fn = get(op, type_tag(args));
  return fn(contents(args));
}

function is_equal_to_zero(x) {
  return apply_generic("is_equal_to_zero", x);
}

console.log(is_equal_to_zero(make_javascript_number(0)));
