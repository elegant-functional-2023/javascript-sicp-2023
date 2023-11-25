const question = `본문의 테이블 구현은 키의 상등 판정에 equal을 사용한다(assoc이 equal을 호출한다).
그런데 이런 상등 판정이 적합하지 않은 경우도 있다. 
예를 들어 키들이 수치인 테이블에서 어떤 항목을 찾을 때 반드시 키의 값이 정확히 같아야 하는 것이 아니라 
오차가 일정한 허용치 이내이기만 하면 같은 키로 간주한다고 하자.
키들의 상등을 판정하는 커스텀 함수를 same_key라는 인수로 받는 테이블 생성자 make_table을 설계하라.
본문에서처럼 이 make_table 함수는 테이블을 표현한 함수 dispatch를 돌려주어야 하며,
그 dispatch는 지역 테이블을 조회하고 삽입하기 위한 적절한 lookup 함수와 insert 함수를 제공해야 한다.`;

// README: 근데 이거 assoc을 same_key로 바꿔치기 하는거 말고 달라지는게 있나요..? (멍청..)

function make_table(same_key) {
  const local_table = list("*table*");

  function lookup(key_1, key_2) {
    const subtable = same_key(key_1, tail(local_table));

    if (is_undefined(subtable)) {
      return undefined;
    } else {
      const record = same_key(key_2, tail(subtable));
      return is_undefined(record) ? undefined : tail(record);
    }
  }

  function insert(key_1, key_2, value) {
    const subtable = same_key(key_1, tail(local_table));
    if (is_undefined(subtable)) {
      set_tail(
        local_table,
        pair(list(key_1, pair(key_2, value)), tail(local_table))
      );
    } else {
      const record = same_key(key_2, tail(subtable));
      if (is_undefined(record)) {
        set_tail(subtable, pair(pair(key_2, value), tail(subtable)));
      } else {
        set_tail(record, value);
      }
    }
  }

  function dispatch(m) {
    return m === "lookup"
      ? lookup
      : m === "insert"
      ? insert
      : error(m, "unknown operation -- table");
  }
  return dispatch;
}
