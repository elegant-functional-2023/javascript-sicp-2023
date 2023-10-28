const square = (x) => x * x;

const abs = (x) => (x < 0 ? -x : x);

const is_good_enough = (guess, x) => abs(square(guess) - x) < 0.001;

const average = (x, y) => (x + y) / 2;

const improve = (guess, x) => {
  return average(guess, x / guess);
};

const sqrt_iter = (guess, x) => {
  if (is_good_enough(guess, improve(guess, x))) {
    return guess;
  }

  return sqrt_iter(improve(guess, x), x);
};

const sqrt = (x) => {
  sqrt_iter(1.0, x);
};

// console.log(sqrt(123456789012345));
console.log(0.00000000123456);
