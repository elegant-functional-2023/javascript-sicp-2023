function make_account(balance, password) {
  function withdraw(amount) {
    if (balance >= amount) {
      balance = balance - amount;
      return balance;
    } else {
      return "Insufficient funds";
    }
  }

  function deposit(amount) {
    balance = balance + amount;
    return balance;
  }

  function dispatch(newPassword, type) {
    if (newPassword !== password) {
      throw Error("Incorrect password");
    }

    if (type === "withdraw") {
      return withdraw;
    } else if (type === "deposit") {
      return deposit;
    }
  }

  return dispatch;
}

const acc = make_account(100, "비공개 패스워드");
console.log(acc("비공개 패스워드", "withdraw")(40)); // 60
console.log(acc("다른 패스워드")); // Incorrect password
