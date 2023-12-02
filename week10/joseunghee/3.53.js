const util = require("util");
const { stream_map_2, pair, stream_tail } = require("./3.50.js");

function add_stream(stream1, stream2) {
  return stream_map_2((x1, x2) => x1 + x2, stream1, stream2);
}

const s = pair(1, () => add_stream(s, s));

// 스트림 s는 다음 요소가 add_stream(s, s)로 정의된 스트림으로
// 2의 지수승으로 증가하는 스트림 (1, 2, 4, 8, 16, 32, 64, 128, 256, 512, ...)

console.log(stream_tail(s));
console.log(stream_tail(stream_tail(s)));
console.log(stream_tail(stream_tail(stream_tail(s))));
