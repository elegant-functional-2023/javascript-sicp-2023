const cube = (x) => x * x * x;

const is_good_enough = (previous_guess, guess) =>
  Math.abs(previous_guess - guess) < 0.001;
