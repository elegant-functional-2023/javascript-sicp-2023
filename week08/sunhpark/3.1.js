const make_accumulator = (init) => {
  let sum = init;

  return (num) => {
    sum += num;
    return sum;
  };
};

const a = make_accumulator(5);

console.log(a(10));
console.log(a(10));
