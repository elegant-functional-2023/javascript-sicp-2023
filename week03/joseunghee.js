// 1.30

// 항등함수
function identity(x) {
  return x;
}

function inc(x) {
  return x + 1;
}

function sum(term, a, next, b) {
  function iter(a, result) {
    return a > b ? result : iter(next(a), result + term(a));
  }
  return iter(a, 0);
}

sum(identity, 1, inc, 10);

// 1.31

// 윌리스 곱 = https://namu.wiki/w/%EC%9B%94%EB%A6%AC%EC%8A%A4%20%EA%B3%B1
function product(term, a, next, b) {
  function iter(a, result) {
    return a > b ? result : iter(next(a), result * term(a));
  }

  return iter(a, 1);
}

function factorial(n) {
  return product(identity, 1, inc, n);
}

// n이 높을수록 오차가 적어짐
function wallisProduct(n) {
  function term(n) {
    return (4 * n * n) / (4 * n * n - 1);
  }

  return product(term, 1.0, inc, n);
}

const pi = 2 * wallisProduct(1000);
console.log(pi);

// 1.32
function combiner(a, b) {
  return a + b;
}

function accumulate(combiner, nullValue, term, a, next, b) {
  function iter(a, result) {
    return a > b ? result : iter(next(a), combiner(result, term(a)));
  }

  return iter(a, nullValue);
}

function sum2(term, a, next, b) {
  return accumulate((a, b) => a + b, 0, term, a, next, b);
}

function product2(term, a, next, b) {
  return accumulate((a, b) => a * b, 0, term, a, next, b);
}

console.log("sum2", sum2(identity, 1, inc, 10));
console.log("product2", product2(identity, 1, inc, 10));

// 1.34

// fail 2 is not function
function f(g) {
  return g(2);
}

// 1.35
// 황금비 1.6180
const tolerance = 0.00001;

function fixed_point(f, firstGuess) {
  function close_enough(v1, v2) {
    return Math.abs(v1 - v2) < tolerance;
  }

  function try_with(guess) {
    const next = f(guess);
    return close_enough(guess, next) ? next : try_with(next);
  }

  return try_with(firstGuess);
}

const golden_ratio = fixed_point((x) => 1 + 1 / x, 1.0);

// 1.40
function dx() {
  return 0.00001;
}

function deriv(g) {
  return (x) => (g(x + dx()) - g(x)) / dx();
}

function newton_transform(g) {
  return (x) => x - g(x) / deriv(g)(x);
}

function newtons_method(g, guess) {
  return fixed_point(newton_transform(g), guess);
}

function cubic(a, b, c) {
  return (x) => x * x * x + a * x * x + b * x + c;
}

// 1.41
function double(doubleF) {
  return (x) => doubleF(doubleF(x));
}

console.log(double(double(double))(inc)(5)); // 21

// 1.42
function square(x) {
  return x * x;
}

function compose(f, g) {
  return (x) => f(g(x));
}

console.log(compose(square, inc)(6));

// 1.43
function repeated(f, n) {
  let result = f;
  for (let i = 1; i < n; i++) {
    result = compose(f, result);
  }
  return result;
}

console.log(repeated(square, 2)(5));

// 1.44

function smooth(f) {
  return (x) => f(x - dx) + f(x) + f(x + dx) / 3;
}
function n_smooth(f, n) {
  return repeated(smooth, f, n);
}
