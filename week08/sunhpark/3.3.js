const make_account = (initBalance, password) => {
  let balance = initBalance;

  const withdraw = (amount) => {
    if (balance >= amount) {
      balance -= amount;
      return balance;
    } else {
      return "Insufficient funds";
    }
  };

  const deposit = (amount) => {
    balance += amount;
    return balance;
  };

  const dispatch = (message) => {
    return message === "withdraw"
      ? withdraw
      : message === "deposit"
      ? deposit
      : console.log("메세지 이상해 ㄴㄴ");
  };

  return (pw, message) => {
    if (pw !== password) {
      return () => "Incorrect password";
    }

    return dispatch(message);
  };
};

const acc = make_account(100, "secret password");

console.log(acc("secret password", "withdraw")(40));
console.log(acc("wrong password", "withdraw")(40));
