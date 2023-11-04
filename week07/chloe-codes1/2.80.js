/*

문제)
인수가 0인지 판정하는 일반적 술어 is_equal_to_zero를 정의하고, 일반적 산술 패키지에 설치하라.
이 연산은 보통 수와 유리수, 복소수에 대해 작동해야 한다

*/

function install_javascript_number_package() {
  function is_equal_to_zero(x) {
    return x === 0;
  }
  // ...

  put("is_equal_to_zero", list("javascript_number"), is_equal_to_zero);

  // ...

  return "done";
}

function install_rational_package() {
  function is_equal_to_zero(x) {
    return numer(x) === 0;
  }
  // ...

  put("is_equal_to_zero", list("rational"), is_equal_to_zero);

  // ...

  return "done";
}

function install_complex_package() {
  function is_equal_to_zero(x) {
    return real_part(x) === 0 && imag_part(x) === 0;
  }
  // ...

  put("is_equal_to_zero", list("rational"), is_equal_to_zero);

  // ...

  return "done";
}
