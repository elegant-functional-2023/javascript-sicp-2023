/*

a. apply_generic()은 강제 형변환 된 type들에 대해 재귀적으로 스스로를 호출하기 때문에 infinite recursion에 빠진다.
b. 옳지 않다! 두 인수의 형식이 같을 때는 강제 형변환을 적용하지 않게 해야한다.

*/

function apply_generic(op, args) {
  function no_such_method(type_tags) {
    return error(list(op, type_tags), "no method for these types");
  }

  // ...

  if (length(args) === 2) {
    if (type1 === type2) {
      return no_such_method(type_tags);
    }
    // ...
  }
}
