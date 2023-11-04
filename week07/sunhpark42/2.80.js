// 인수가 0인지 판정하는 일반적 술어 is_equal_to_zero를 정의하고 일반적 산술 패키지에 설치하라. 이 연산은 보통 수와 유리수, 복소수에 대해 작동해야 한다.

const is_null = (value) => value == null;

const pair = (a, b) => [a, b];

const head = (pair) => pair[0];
const tail = (pair) => pair[1];

const list = (...items) => {
  const iter = (items, acc) => {
    if (is_null(items)) {
      return acc;
    }

    const hello = [...items].slice(1, items.length);

    return iter(hello.length > 0 ? hello : null, pair(head(items), acc));
  };

  return iter(items.reverse(), null);
};

// 산술 패키지 p.275
function install_javascript_number_package() {
  function tag(x) {
    return attach_tag("javascript_number", x);
  }

  put("add", list("javascript_number", "javascript_number"), (x, y) =>
    tag(x + y)
  );

  put("sub", list("javascript_number", "javascript_number"), (x, y) =>
    tag(x - y)
  );

  put("mul", list("javascript_number", "javascript_number"), (x, y) =>
    tag(x * y)
  );

  put("div", list("javascript_number", "javascript_number"), (x, y) =>
    tag(x / y)
  );

  put("make", "javascript_number", (x) => tag(x));

  put("is_equal_to_zero", list("javascript_number"), (x) => x === 0);

  return "done";
}

function make_javascript_number(n) {
  return get("make", "javascript_number")(n);
}

const result = get(
  "is_equal_to_zero",
  "javascript_number"
)(make_javascript_number(0));
