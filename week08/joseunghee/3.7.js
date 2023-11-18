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

  function dispatch(_comparison_password, type) {
    if (_comparison_password !== password) {
      throw Error("Incorrect password");
    }

    if (type === "withdraw") {
      return withdraw;
    } else if (type === "deposit") {
      return deposit;
    } else if (type === "comparison_password") {
      return comparison_password;
    }
  }

  function comparison_password(p) {
    return p === password;
  }

  return dispatch;
}

function make_joint(account, password, joint_password) {
  if (!account(password, "comparison_password")) {
    throw new Error("Incorrect password");
  }
  return (_joint_password, type) => {
    if (_joint_password !== joint_password) {
      throw new Error("Incorrect joint password");
    }
    return account(password, type);
  };
}
const peter_acc = make_account(100, "피터패스워드");
const paul_acc = make_joint(peter_acc, "피터패스워드", "폴패스워드");

console.log(peter_acc("피터패스워드", "withdraw")(40)); // 60
console.log(paul_acc("폴패스워드", "withdraw")(40)); // 20
