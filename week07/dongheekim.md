// 2.80

```js
function install_javascript_number_package() {
  function is_equal_to_zero(x) {
    return x === 0;
  }
  // ...

  put("is_equal_to_zero", list("javascript_number"), is_equal_to_zero);

  // ...
}

function install_rational_package() {
  function is_equal_to_zero(x) {
    return numer(x) === 0;
  }

  // ...

  put("is_equal_to_zero", list("rational"), is_equal_to_zero);

  // ...
}

function install_complex_package() {
  function is_equal_to_zero(z) {
    return real_part(z) === 0 && imag_part(z) === 0;
  }
  // ...

  put("is_equal_to_zero", list("complex"), is_equal_to_zero);

  // ...
}

function is_equal_to_zero(z) {
  return apply_generic("is_equal_to_zero", list(z));
}
```


## 2.81

a.  무한 반복 -> maximum call stack size exceeded 에러 발생
b. 결과적으로는 현재의  `apply_generic`이 올바르게 동작하고 있으나, 형식이 같은 수의 강제 형변환이 추가되면 오작동을 한다
c. 
```js
function apply_generic(op, args) {
  const type_tags = map(type_tag, args);
  const fun = get(op, type_tags);
  if (!is_undefined(fun)) {
    return apply(fun, map(contents, args));
  } else {
    if (length(args) === 2) {
      const type1 = head(type_tags);
      const type2 = head(tail(type_tags));

      if (is_same_type(type1, type2)) {
        return error(list(op, type_tags), "no method for these types");
      }

      const a1 = head(args);
      const a2 = head(tail(args));
      const t1_to_t2 = get_coercion(type1, type2);
      const t2_to_t1 = get_coercion(type2, type1);
      return !is_undefined(t1_to_t2)
        ? apply_generic(lop, list(t1_to_t2(a1)), a2)
        : !is(undefined(t2_to_t1))
        ? apply_generic(lop, list(a1, t2_to_t1(a2)))
        : error(list(op, type_tags), "no method for these types");
    } else {
      return error(list(op, type_tags), "no method for these types");
    }
  }
}

```


 ## 2.87

```js
// 2.87
function install_polynomial_package() {
  // ...
  function is_equal_to_zero_poly(L) {
    return is_empty_termlist(L)
      ? true
      : is_equal_to_zero(coeff(first_term(L)))
      ? is_equal_to_zero_poly(rest_terms(L))
      : false;
  }
  
  // ...
  put("is_equal_to_zero", list("polynomial"), is_equal_to_zero_poly);
  
  // ...
}
```

