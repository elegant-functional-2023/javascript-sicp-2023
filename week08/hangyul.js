// 정리 문서 https://teal-line-f3e.notion.site/20231118-SICP-in-JavaScript-f5b48418b39443ca960fb56a76173cc6?pvs=4

// 3.1 연습문제

function make_accumulator(initialValue) {
  let sum = initialValue || 0;
  return (amount) => (sum += amount);
}

const a = make_accumulator(5);

console.log(a(10));
// 15

console.log(a(10));
// 25

// 3.5 연습문제

function estimate_integral(p, x11, x2, y1, y2, n) {
  //모르겠슈
}

// 3.7 연습문제

function make_joint(passwordProtectedAccount, originalPassword, newPassword) {
  let password = newPassword;
  if (passwordProtectedAccount(password)(0) !== "Incorrect Password") {
    function dispatch(givenPassword, m) {
      if (password === givenPassword) {
        return m === "withdraw"
          ? passwordProtectedAccount(originalPassword, "withdraw")
          : m === "deposit"
          ? passwordProtectedAccount(originalPassword, "deposit")
          : error(m, "unknown request");
      } else {
        return (_) => "Incorrect password";
      }
    }
    return dispatch;
  }
}

// c.f. 3.3
function make_account(balance, initialPassword) {
  let password = initialPassword;

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

  function dispatch(given_password, m) {
    if (password === given_password) {
      return m === "withdraw"
        ? withdraw
        : m === "deposit"
        ? deposit
        : error(m, "unknown request");
    } else {
      return (_) => "Incorrect password";
    }
  }
  return dispatch;
}

// 3.9 연습문제

// 3.10 연습문제
// 3.11 연습문제
