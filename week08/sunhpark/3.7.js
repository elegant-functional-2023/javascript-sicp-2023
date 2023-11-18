const make_account = (initBalance, initPasswords) => {
  const passwords =
    typeof initPasswords === "string"
      ? [initPasswords]
      : new Array(...initPasswords);

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

  const add_password = (newPw) => {
    passwords.push(newPw);
    return passwords;
  };

  const dispatch = (message) => {
    return message === "withdraw"
      ? withdraw
      : message === "deposit"
      ? deposit
      : "add_password"
      ? add_password
      : console.log("메세지 이상해 ㄴㄴ");
  };

  const isCorrectPassword = (pw) => passwords.includes(pw);

  return (pw, message) => {
    if (!isCorrectPassword(pw)) {
      return () => "Incorrect password";
    }

    return dispatch(message);
  };
};

const make_joint = (acc, pw, newPw) => {
  acc(pw, "add_password")(newPw);

  return acc;
};

const peter_acc = make_account(100, "secret password");
const paul_acc = make_joint(peter_acc, "secret password", "new password");

console.log(peter_acc("secret password", "withdraw")(40));
console.log(paul_acc("new password", "withdraw")(40));
