// 3.1
function make_accumulator (n) {
    return  x => n = n + x;
}
const a = make_accumulator(5);
console.log(a(10))
console.log(a(10))

// 3.5
// 3.7
function make_joint(account, password, new_password) {
    function helper(p) {
        if (p === password) {
            return account;
        } else if (p === new_password) {
            return account;
        } else {
            return "비밀번호 오류";
        }
    }
    return helper;
}
// 3.9
/*
* factorial(6)
* factorial(6(factorial(5))
* factorial(6(factorial(5(factorial(4))))
* factorial(6(factorial(5(factorial(4(factorial(3))))))
* factorial(6(factorial(5(factorial(4(factorial(3(factorial(2))))))))
* factorial(6(factorial(5(factorial(4(factorial(3(factorial(2(factorial(1))))))))))
* 720
*
* factorial(6)
* factorial(1, 1, 6)
* factorial(1, 2, 6)
* factorial(2, 3, 6)
* factorial(6, 4, 6)
* factorial(24, 5, 6)
* factorial(120, 6, 6)
* 720
* */
// 3.10
function make_withdraw(initial_amount) {
    return (balance =>
        amount => {
            if (balance >= amount) {
                balance = balance - amount;
                return balance;
            } else {
                return "Insufficient funds";
            }
        }
    )(initial_amount);
}
const W1 = make_withdraw(100);
console.log(W1(50));
const W2 = make_withdraw(100);
// make_withdraw -> w1 -> (balance, initial_amount) -> amount
// 3.11
function make_account(balace) {
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
    function dispatch(m) {
        if (m === "withdraw") {
            return withdraw;
        } else if (m === "deposit") {
            return deposit;
        } else {
            return "Unknown request -- make_account";
        }
    }
}
