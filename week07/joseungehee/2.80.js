let table = {};

function set_table(key, value) {
  table[key] = value;
}

function put(op, type_tag, item) {
  const key = JSON.stringify(op + "" + type_tag);
  const value = item;
  return set_table(key, value);
}

function get(op, type_tags) {
  const key = JSON.stringify(op + "" + type_tags);
  return table[key];
}

function pair(x, y) {
  return [x, y];
}
function head(pair) {
  return pair[0];
}

function tail(pair) {
  return pair[1];
}

function math_sqrt(x) {
  return Math.sqrt(x);
}

function math_square(x) {
  return x * x;
}

function list(...args) {
  return args.length === 0 ? null : [args[0], list(...args.slice(1))];
}

function is_null(x) {
  return x === null;
}
function is_pair(x) {
  return Array.isArray(x) && x.length === 2;
}

function map(proc, items) {
  return is_null(items) ? null : pair(proc(head(items)), map(proc, tail(items)));
}

function attach_tag(type_tag, contents) {
  return pair(type_tag, contents);
}

function type_tag(datum) {
  if (is_pair(datum)) {
    return head(datum);
  } else {
    throw Error(datum, "Bad tagged datum -- type_tag");
  }
}

// 데이터 객체에서 실제 내용을 추출하는 함수
function contents(datum) {
  if (is_pair(datum)) {
    return tail(datum);
  } else {
    throw Error(datum, "Bad tagged datum -- contents");
  }
}
// 직교좌표계 패키지
function install_rectangular_package() {
  function real_part(z) {
    return head(z);
  }
  function imag_part(z) {
    return tail(z);
  }
  function make_from_real_imag(x, y) {
    return pair(x, y);
  }
  function magnitude(z) {
    return math_sqrt(math_square(real_part(z)) + math_square(imag_part(z)));
  }
  function angle(z) {
    return Math.atan2(imag_part(z), real_part(z));
  }
  function make_from_mag_ang(r, a) {
    return pair(r * Math.cos(a), r * Math.sin(a));
  }
  function tag(x) {
    return attach_tag("rectangular", x);
  }

  function is_equal_to_zero(z) {
    return head(z) === 0 && tail(z) === 0;
  }

  put("is_equal_to_zero", "rectangular", is_equal_to_zero);
  put("real_part", list("rectangular"), real_part);
  put("imag_part", list("rectangular"), imag_part);
  put("magnitude", list("rectangular"), magnitude);
  put("angle", list("rectangular"), angle);
  put("make_from_real_imag", "rectangular", (x, y) => tag(make_from_real_imag(x, y)));
  put("make_from_mag_ang", "rectangular", (r, a) => tag(make_from_mag_ang(r, a)));
  return "done";
}

// 극좌표계 패키지
function install_polar_package() {
  function magnitude(z) {
    return head(z);
  }
  function angle(z) {
    return tail(z);
  }
  function make_from_mag_ang(r, a) {
    return pair(r, a);
  }
  function real_part(z) {
    return magnitude(z) * math_cos(angle(z));
  }
  function imag_part(z) {
    return magnitude(z) * math_sin(angle(z));
  }
  function make_from_real_imag(x, y) {
    return pair(math_sqrt(math_square(x) + math_square(y)), math_atan2(y, x));
  }
  function tag(x) {
    return attach_tag("polar", x);
  }

  function is_equal_to_zero(z1) {
    return magnitude(z1) === 0;
  }

  put("is_equal_to_zero", "polar", is_equal_to_zero);
  put("real_part", list("polar"), real_part);
  put("imag_part", list("polar"), imag_part);
  put("magnitude", list("polar"), magnitude);
  put("angle", list("polar"), angle);
  put("make_from_real_imag", "polar", (x, y) => tag(make_from_real_imag(x, y)));
  put("make_from_mag_ang", "polar", (r, a) => tag(make_from_mag_ang(r, a)));
  return "done";
}

function install_complex_package() {
  // 직교좌표계
  function make_from_real_imag(x, y) {
    return get("make_from_real_imag", "rectangular")(x, y);
  }
  // 극좌표계
  function make_from_mag_ang(r, a) {
    return get("make_from_mag_ang", "polar")(r, a);
  }

  function add_complex(z1, z2) {
    return make_from_real_imag(real_part(z1) + real_part(z2), imag_part(z1) + imag_part(z2));
  }

  function sub_complex(z1, z2) {
    return make_from_real_imag(real_part(z1) - real_part(z2), imag_part(z1) - imag_part(z2));
  }

  function mul_complex(z1, z2) {
    return make_from_mag_ang(magnitude(z1) * magnitude(z2), angle(z1) + angle(z2));
  }

  function div_complex(z1, z2) {
    return make_from_mag_ang(magnitude(z1) / magnitude(z2), angle(z1) - angle(z2));
  }

  function is_equal_to_zero(z1) {
    return make_from_real_imag(real_part(z1), imag_part(z1));
  }

  function tag(z) {
    return attach_tag("complex", z);
  }

  put("is_equal_to_zero", "complex", (z) => tag(is_equal_to_zero(z)));
  put("add", list("complex", "complex"), (x, y) => tag(add_complex(x, y)));
  put("sub", list("complex", "complex"), (x, y) => tag(sub_complex(x, y)));
  put("mul", list("complex", "complex"), (x, y) => tag(mul_complex(x, y)));
  put("div", list("complex", "complex"), (x, y) => tag(div_complex(x, y)));
  put("make_from_real_imag", "complex", (x, y) => tag(make_from_real_imag(x, y)));
  put("make_from_mag_ang", "complex", (r, a) => tag(make_from_mag_ang(r, a)));
  return "done";
}
function install_javascript_number_package() {
  function tag(x) {
    return attach_tag("javascript_number", x);
  }

  put("is_equal_to_zero", "javascript_number", (x) => tag(x === 0));
  put("add", list("javascript_number", "javascript_number"), (x, y) => tag(x + y));
  put("sub", list("javascript_number", "javascript_number"), (x, y) => tag(x - y));
  put("mul", list("javascript_number", "javascript_number"), (x, y) => tag(x * y));
  put("div", list("javascript_number", "javascript_number"), (x, y) => tag(x / y));
  put("make", "javascript_number", (x) => tag(x));
  return "done";
}

install_javascript_number_package();

function make_javascript_number(n) {
  return get("make", "javascript_number")(n);
}
function make_complex_from_real_imag(x, y) {
  return get("make_from_real_imag", "complex")(x, y);
}

// 인수가 하나일때만 적용되는 apply_generic
function apply_generic(op, args) {
  const fn = get(op, type_tag(args));
  return fn(contents(args));
}

function is_equal_to_zero(x) {
  return apply_generic("is_equal_to_zero", x);
}

console.log(is_equal_to_zero(make_complex_from_real_imag(0, 1)));
console.log(is_equal_to_zero(make_javascript_number(0)));
