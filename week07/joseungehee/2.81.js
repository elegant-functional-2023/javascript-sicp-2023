function exp(x, y) {
  return apply_generic("exp", list(x, y));
}

// 거즙제곱을 위한 함수, 다른 패키지에는 추가하지 않았다면

function apply_generic(op, args) {
  const type_tags = map(type_tag, args);
  const fun = get(op, type_tags);
  if (!is_undefined(fun)) {
    return fun(map(contents, args));
  } else {
    if (length(args) === 2) {
      const type1 = head(type_tags);
      const type2 = head(tail(type_tags));

      // 타입이 같다면
      if (type1 === type2) {
        return fun(map(contents, args));
      }

      const a1 = head(args);
      const a2 = head(tail(args));
      const t1_to_t2 = get(op, list(type1, type2));
      const t2_to_t1 = get(op, list(type2, type1));
    }
    return error(list(op, type_tags), "No method for these types in apply_generic");
  }
}
