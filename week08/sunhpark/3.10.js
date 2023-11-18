function make_withdraw(initial_amount) {
  return ((balance) => (amount) => {
    if (balance >= amount) {
      balance = balance - amount;
      return balance;
    } else {
      return "insufficient funds";
    }
  })(initial_amount);
}

// 환경구조가 어떻게 다른가?
