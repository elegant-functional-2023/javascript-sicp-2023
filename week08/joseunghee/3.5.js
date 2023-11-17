function random_in_range(low, high) {
  return low + Math.random() * (high - low);
}

function monte_carlo(trials, experiment) {
  function iter(trials_remaining, trials_passed) {
    if (trials_remaining === 0) {
      return trials_passed / trials;
    } else {
      if (experiment()) {
        return iter(trials_remaining - 1, trials_passed + 1);
      } else {
        return iter(trials_remaining - 1, trials_passed);
      }
    }
  }
  return iter(trials, 0);
}

function estimate_integral(trials) {
  const random_in_unit_circle = () => {
    const x = random_in_range(-1, 1);
    const y = random_in_range(-1, 1);

    // 중심이 0이고 반지름이 1인 원 내부에 있는지 확인
    const distance = Math.sqrt(x * x + y * y);
    if (distance <= 1) {
      return true;
    } else {
      return false;
    }
  };
  return monte_carlo(trials, random_in_unit_circle);
}

// 통과한 비율 * 직사각형의 넓이 = 원의 넓이
console.log(estimate_integral(100) * 4);
console.log(estimate_integral(1000) * 4);
console.log(estimate_integral(2000) * 4);
console.log(estimate_integral(3000) * 4);
console.log(estimate_integral(4000) * 4);
console.log(estimate_integral(5000) * 4);
console.log(estimate_integral(9000) * 4);
