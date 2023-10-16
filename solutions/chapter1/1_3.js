// Define a procedure that takes three numbers as arguments and returns the sum of the squares of the two larger numbers.

const square = (x) => x * x;

const sum_of_squares = (x, y) => square(x) + square(y);

const solution = (x, y, z) => {
  if (x <= y && x <= z) {
    return sum_of_squares(y, z);
  }

  if (y <= x && y <= z) {
    return sum_of_squares(x, z);
  }

  return sum_of_squares(x, y);
};

console.log(solution(10, 10, 10) === sum_of_squares(10, 10));
console.log(solution(1, 10, 10) === sum_of_squares(10, 10));
console.log(solution(10, 1, 10) === sum_of_squares(10, 10));
console.log(solution(10, 10, 1) === sum_of_squares(10, 10));
console.log(solution(1, 10, 100) === sum_of_squares(10, 100));
