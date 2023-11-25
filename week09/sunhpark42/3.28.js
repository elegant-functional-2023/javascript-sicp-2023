function or_gate(a1, a2, output) {
  function or_action_function() {
    const new_value = logical_or(get_signal(a1), get_signal(a2));
    after_delay(or_gate_delay, () => set_signal(output, new_value));
  }

  or_action(a1, or_action_function);
  or_action(a2, or_action_function);
  return "ok";
}
