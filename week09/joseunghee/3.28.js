// 논리 함수 모음. 책의 예시보다 조금 더 간단하게 구현
function logical_not(s) {
  return s === 0 ? 1 : 0;
}

function logical_and(a1, a2) {
  return a1 === 1 && a2 === 1 ? 1 : 0;
}

function logical_or(a1, a2) {
  return a1 === 1 || a2 === 1 ? 1 : 0;
}

function get_signal(wire) {}
function set_signal(wire, new_value) {}
function add_action(wire, cb) {}

// 인버터: 입력 신호를 반전시킨 출력 신호를 반환한다.
function inverter(input) {
  function invert_input() {
    const new_value = logical_not(get_signal(input));
    after_delay(inverter_delay, () => set_signal(output, new_value));
  }

  add_action(input, invert_input);

  return "ok";
}

// AND 게이트: 두 입력 신호가 모두 1일 때만 1을 반환한다.
// 게이트의 두 입력 중 하나라도 변하면 실행되어야 한다.
function and_gate(a1, a2, output) {
  function and_action_function() {
    const new_value = logical_and(get_signal(a1), get_signal(a2));
    after_delay(and_gate_delay, () => set_signal(output, new_value));
  }

  add_action(a1, and_action_function);
  add_action(a2, and_action_function);
  return "ok";
}

// OR 게이트: 두 입력 신호 중 하나라도 1이면 1을 반환한다.
function or_gate(a1, a, output2) {
  function or_action_function() {
    const new_value = logical_or(get_signal(a1), get_signal(a2));
    after_delay(or_gate_delay, () => set_signal(output, new_value));
  }

  add_action(a1, or_action_function);
  add_action(a2, or_action_function);
}
