// 몬테카를로 적분
const random_in_range = (low, high) => {
  return Math.random() * (high - low) + low;
};

const monte_carlo = (trials, experiment) => {
  function iter(trials_remaining, trials_passed) {
    return trials_remaining === 0
      ? trials_passed / trials
      : experiment()
      ? iter(trials_remaining - 1, trials_passed + 1)
      : iter(trials_remaining - 1, trials_passed);
  }
  return iter(trials, 0);
};

const estimate_integral = (P, x1, x2, y1, y2) => {
  const trials = 1000;
  const random_x = () => random_in_range(x1, x2);
  const random_y = () => random_in_range(y1, y2);
  const experiment = () => P(random_x(), random_y());

  return monte_carlo(trials, experiment) * ((x2 - x1) * (y2 - y1));
};

const square = (x) => x * x;

const foo = (x, y) => square(x - 5) + square(y - 7) <= square(3);

console.log(estimate_integral(foo, 2, 4, 8, 10));
