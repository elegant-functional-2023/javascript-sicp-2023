function make_account(balance) {
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
    return m === "withdraw"
      ? withdraw
      : m === "deposit"
      ? deposit
      : "Unknown request: make_account";
  }
  return dispatch;
}

// TODO: 환경구조 도식화
const acc = make_account(50);

acc("deposit")(40);
acc("withdraw")(60);

// acc의 지역상태는 어디에 저장되는가?

const acc2 = make_account(100);

// 또 다른 은행계좌를 만드는 경우, 지역상태는 어떻게 분리 되고, 환경구조에서 acc, acc2가 공유하는 요소들은 무엇인가?

const answer = `
    - acc의 지역상태는 acc의 매개변수인 amount와 인수 50의 바인딩을 가진 프레임을 담은 새 환경에 저장된다.
    - 지역상태는 별도로 분리 된다.
    - 환경구조에서 공유하는 값은 make_account 함수이다.
`;
