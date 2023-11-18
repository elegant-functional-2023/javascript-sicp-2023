const factorial_재귀 = (n) => (n === 1 ? 1 : n * factorial_재귀(n - 1));

const fact_iter = (product, counter, max_count) =>
  counter > max_count
    ? product
    : fact_iter(counter * product, counter + 1, max_count);
const factorial_반복 = (n) => fact_iter(1, 1, n);

// factorial(6) 의 평가로 만들어지는 환경구조 도식화
