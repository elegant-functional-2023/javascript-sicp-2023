// [노션 정리문서](https://teal-line-f3e.notion.site/20231104-SICP-in-JavaScript-22c11aa186e4456cb498a44972671e2a?pvs=4)

// 2.80

function is_equal_to_zero(x) {
  return apply_generic("is_equal_to_zero", x);
}

function install_javascript_number_package() {
  // ...
  put("is_equal_to_zero", "javascript_number", (x) => x === 0);
  return "done";
}

// 2.81
// 두 인수의 형식이 같을 때도 `apply_generic` 이 인수들을 상대방 형식으로 변환하려 드는 경우가 있음

// 각 형식의 인수를 그 형식 자체로 강제 형변환하는 함수를 강제 형변환 테이블에 추가해야 마땅하다고 추론

// 1. 루이스의 이 강제 형변환한 함수들을 설치했다고 할 때, `“complex”` 형식의 두 인수나 `“javascript_number”` 형식의 두 인수와 테이블에는 해당 함수가 없는 연산으로 apply_generic을 호출하면 어떤 일이 벌어질까?
// 2. 형식이 같은 수들의 강제 형변환을 손봐야 한다는 루이스의 생각이 옳을까? 아니면 현재의 `apply_generic`이 올바르게 작동하는 것일까?
// 3. 두 인수의 형식이 같을 때는 강제 형변환을 적용하지 않도록 `apply_generic`을 수정하라.

// 2,87
// 다항식을 위한 `is_equal_to_zero` 를 정의해서 일반적 산술 패키지에 설치하라
// `adjoin_term`은 그 자체로 다항식인 계쑤들을 처리할 때 이 술어를 사용한다.
