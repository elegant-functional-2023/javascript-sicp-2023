// f는 인자 두개를 받는 함수
function stream_map_2(f, stream1, stream2) {
  if (!stream1 || !stream2) return null;

  return pair(f(head(stream1), head(stream2)), () =>
    stream_map_2(f, stream_tail(stream1), stream_tail(stream2))
  );
}

function stream_map_2_optimized(f, stream1, stream2) {
  if (!stream1 || !stream2) return null;
  return pair(
    f(head(stream1), head(stream2)),
    memo(() =>
      stream_map_2_optimized(f, stream_tail(stream1), stream_tail(stream2))
    )
  );
}

function memo(fun) {
  let already_run = false;
  let result = undefined;
  return () => {
    if (!already_run) {
      result = fun();
      already_run = true;
      return result;
    } else {
      return result;
    }
  };
}

function stream_tail(stream) {
  return tail(stream)();
}

function tail(pair) {
  return pair[1];
}

function head(pair) {
  return pair[0];
}

function pair(x, y) {
  return [x, y];
}

module.exports = {
  pair,
  stream_map_2,
  stream_tail,
};
