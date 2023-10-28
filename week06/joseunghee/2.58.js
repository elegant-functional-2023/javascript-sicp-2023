const util = require("util");
const pair = (x, y) => [x, y];
const head = (pair) => pair[0];
const tail = (pair) => pair[1];
const list = (...args) => (args.length === 0 ? null : pair(args[0], list(...args.slice(1))));

const is_number = (x) => typeof x === "number";
const is_pair = (x) => Array.isArray(x) && x.length === 2;
const is_exp = (x) => is_pair(x) && (is_sum(x) || is_product(x) || is_exponent(x));
const is_string = (x) => typeof x === "string";
const is_variable = (x) => is_string(x);
const is_same_variable = (v1, v2) => is_variable(v1) && is_variable(v2) && v1 === v2;

const number_equal = (exp, num) => is_number(exp) && exp === num;

const make_sum = (a1, a2) => {
  if (number_equal(a1, 0)) return a2;
  if (number_equal(a2, 0)) return a1;
  if (is_number(a1) && is_number(a2)) return a1 + a2;
  // 동일한 변수라면 계수를 더한다.
  if (is_same_variable(a1, a2)) return make_product(2, a1);

  return list(a1, "+", a2);
};

// (3 + x) * x -> m1: 3, m2: (3 * x)
const make_product = (m1, m2) => {
  if (number_equal(m1, 0) || number_equal(m2, 0)) return 0;
  if (number_equal(m1, 1)) return m2;
  if (number_equal(m2, 1)) return m1;
  if (is_number(m1) && is_number(m2)) return m1 * m2;

  // 동일한 변수라면 지수를 더한다.
  if (is_same_variable(m1, m2)) return make_exponent(m1, 2);

  // 식(exp)가 있다면 재귀적으로 식을 분해한다.
  if (is_exp(m1)) {
    return make_sum(make_product(multiplier(m1), m2), make_product(multiplicand(m1), m2));
  }

  if (is_exp(m2)) {
    return make_sum(make_product(m1, multiplier(m2)), make_product(m1, multiplicand(m2)));
  }

  return list(m1, "*", m2);
};

const is_sum = (exp) => is_pair(exp) && head(tail(exp)) === "+";
const is_product = (exp) => is_pair(exp) && head(tail(exp)) === "*";

// 1 + 3  => addend: 1, augend: 3
const addend = (s) => head(s);
const augend = (s) => head(tail(tail(s)));

// 1 * 3 => multiplier: 1, multiplicand: 3
// [1, ["*",[3,null]]]
const multiplier = (exp) => head(exp);
const multiplicand = (exp) => head(tail(tail(exp)));

// 거듭제곱 미분을 위한 함수
// base: 밑, exp: 지수  2 ** 5 => base: 2, exp: 5
const is_exponent = (exp) => is_pair(exp) && head(tail(exp)) === "**";
const base = (pair) => {
  if (is_exponent(pair)) {
    return head(tail(pair));
  }
  throw new Error("base called with non exponent");
};
const exponent = (pair) => {
  if (is_exponent(pair)) {
    return head(tail(tail(pair)));
  }
  throw new Error("exponent called with non exponent");
};

// 밑과 지수를 받아서 거듭제곱을 만들어주는 함수
// 밑이 1이면 항상 1, 지수가 0이면 항상 1

// (x+3) ** 3 => (x+3) * (x+3) * (x+3)
const make_exponent = (base, exp) => {
  if (base === 1 || exp === 0) {
    return 1;
  }

  if (is_number(base) && is_number(exp)) {
    return base ** exp;
  }

  if (is_exp(base) && is_number(exp)) {
    return make_product(exp, base);
  }

  return list(base, "**", exp);
};

function deriv(exp, variable) {
  // 숫자라면 미분값은 0
  if (is_number(exp)) return 0;

  // 계수가 1인 변수: 같은 변수라면 미분값은 1, 아니면 0
  if (is_variable(exp)) return is_same_variable(exp, variable) ? 1 : 0;

  // 합 수식이라면 각각의 항을 미분한 값을 더한 값(재귀적)
  if (is_sum(exp)) return make_sum(deriv(addend(exp), variable), deriv(augend(exp), variable));

  // 곱 미분 f(x) * g(x) = f'(x) * g(x) + f(x) * g'(x)
  if (is_product(exp)) {
    return make_sum(make_product(multiplier(exp), deriv(multiplicand(exp), variable)), make_product(deriv(multiplier(exp), variable), multiplicand(exp)));
  }

  // 지수 수식이라면
  // f(x) ** n 을 미분하면 (n * f(x) ** (n - 1))
  if (is_exponent(exp)) {
    return make_product(exponent(exp), make_exponent(base(exp), exponent(exp) - 1));
  }

  return console.log(exp, "unknown expression type in deriv");
}

// 중위 연산자를 사용한 수식을 문자열로 변환
const list_to_string = (li) => {
  if (is_pair(li)) {
    return "(" + list_to_string(head(li)) + " " + head(tail(li)) + " " + list_to_string(head(tail(tail(li)))) + ")";
  }
  return li;
};

// 3*x를 미분 => 3
console.log(deriv(make_product(3, "x"), "x"));

// 1 + "x" + "x"를 미분 => 2
console.log(list_to_string(deriv(make_sum(1, make_sum("x", "x")), "x")));

// (x+3) * 3 => x * 3 + 9 을 미분하면 3
console.log(list_to_string(deriv(make_product(make_sum("x", 3), 3), "x")));

// x ** 3를 미분 => 3 * x ** 2
console.log(list_to_string(make_sum(make_exponent("x", 3), make_exponent("x", 3))));

// (3+x) + (4*x) => 5 * x + 3  만족하게 만들기가 너무 어려움 ...
