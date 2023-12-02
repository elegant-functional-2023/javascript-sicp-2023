function sqrt_stream_optimized(x) {
  return pair(
    1,
    memo(() =>
      stream_map((guess) => sqrt_improved(guess, x), sqrt_stream_optimized(x))
    )
  );
}

function sqrt_stream_optimized_2(x) {
  const guesses = pair(
    1,
    memo(() => stream_map((guess) => sqrt_improved(guess, x), guesses))
  );

  return guesses;
}

// sqrt_stream_optimized(3);
pair(
  1,
  memo(() =>
    stream_map((guess) => sqrt_improved(guess, 3), sqrt_stream_optimized(3))
  )
);

// sqrt_stream_optimized_2(3);
const guesses = pair(
  1,
  memo(() => stream_map((guess) => sqrt_improved(guess, 3), guesses))
);

// 스트림이기 때문에 접근할때 guess가 평가된다.
const guess = sqrt_stream_optimized_2(3);

stream_tail(guess);

// A. 잘 모르겠음..

// 루이스의 스트림은 map을 평가할때마다 sqrt_stream_optimized(x)를 평가하는 성능상 단점이 있다
// 알리사의 스트림은 map을 평가할때 이미 평가된 guess를 사용하기 때문에 성능상 이점이 있을 것 같다
