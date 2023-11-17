function make_accumulator(initialValue) {
  let sum = initialValue;
  return (value) => {
    sum += value;
    return sum;
  };
}

const a = make_accumulator(15);
console.log(a(10)); // 25
console.log(a(10)); // 35
