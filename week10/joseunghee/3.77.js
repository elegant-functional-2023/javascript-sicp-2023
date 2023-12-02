const { stream_tail } = require("./3.50");

function integral(delayed_integrand, initial_value, dt) {
  const integ = pair(initial_value, () => {
    const integrand = delayed_integrand();
    return add_streams(scale_stream(integrand, dt), integ);
  });
}

function integral_2(integrand, initial_value, dt) {
  if (!integrand) {
    return pair(initial_value, null);
  }

  return pair(
    initial_value,
    integral_2(stream_tail(integrand), dt * head(integrand) + initial_value, dt)
  );
}

function delayed_integral_2(delayed_integrand, initial_value, dt) {
  if (!delayed_integrand) {
    return pair(initial_value, null);
  }

  return pair(initial_value, () => {
    const integrand = delayed_integrand();
    return delayed_integral_2(
      stream_tail(integrand),
      dt * head(integrand) + initial_value,
      dt
    );
  });
}

function solve(fun, y0, dt) {
  const y = delayed_integral_2(() => dy, y0, dt);
  const dy = stream_map(fun, y);
  return y;
}
