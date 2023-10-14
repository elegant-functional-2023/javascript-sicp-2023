// 2.2
type Tuple<T, K> = [T, K];
type Point = Tuple<number, number>;
type Segment = [Point, Point];

function pair<T, K>(x: T, y: K): Tuple<T, K> {
  return [x, y];
}

function head<T, K>(pair: Tuple<T, K>) {
  return pair[0];
}

function tail<T, K>(pair: Tuple<T, K>) {
  return pair[1];
}

function x_point(point: Point) {
  return head(point);
}

function y_point(point: Point) {
  return tail(point);
}

function make_point(x: number, y: number): Point {
  return pair(x, y);
}

function make_segment(start_point: Point, end_point: Point): Segment {
  return pair(start_point, end_point);
}

function start_segment(segment: Segment): Point {
  return head(segment);
}

function end_segment(segment: Segment): Point {
  return tail(segment);
}

// point 인터페이스를 사용한 mid_point
function mid_point(p1: Point, p2: Point) {
  return make_point((x_point(p1) + x_point(p2)) / 2, (y_point(p1) + y_point(p2)) / 2);
}

// mid_point 인터페이스와 segment 인터페이스를 사용한 mid_point_segment
function midpoint_segment(segment: Segment): Point {
  return mid_point(start_segment(segment), end_segment(segment));
}

console.log(midpoint_segment(make_segment(make_point(1, 2), make_point(3, 4)))); // [2, 3]

// 2.3
type Rectangle = [Segment, Segment, Segment, Segment];

function get_segment_length(segment: Segment): number {
  return Math.sqrt(
    Math.pow(x_point(start_segment(segment)) - x_point(end_segment(segment)), 2) +
      Math.pow(y_point(start_segment(segment)) - y_point(end_segment(segment)), 2)
  );
}

// 직사각형 모양
// p1 p4
// p2 p3
function make_rectangle1(p1: Point, p2: Point, p3: Point, p4: Point): Rectangle {
  // 직사각형 검증 로직은 생략
  return [make_segment(p1, p2), make_segment(p2, p4), make_segment(p3, p4), make_segment(p3, p1)];
}

function make_rectangle2(s1: Segment, s2: Segment, s3: Segment, s4: Segment): Rectangle {
  return [s1, s2, s3, s4];
}

function get_rectangle_round(rectangle: Rectangle): number {
  return (
    get_segment_length(rectangle[0]) +
    get_segment_length(rectangle[1]) +
    get_segment_length(rectangle[2]) +
    get_segment_length(rectangle[3])
  );
}

function get_rectangle_area(rectangle: Rectangle): number {
  return get_segment_length(rectangle[0]) * get_segment_length(rectangle[1]);
}

console.log(
  get_rectangle_round(make_rectangle1(make_point(1, 2), make_point(1, 0), make_point(4, 2), make_point(4, 0)))
);

console.log(
  get_rectangle_round(
    make_rectangle2(
      make_segment(make_point(1, 2), make_point(1, 0)),
      make_segment(make_point(1, 0), make_point(4, 0)),
      make_segment(make_point(4, 0), make_point(4, 2)),
      make_segment(make_point(4, 2), make_point(1, 2))
    )
  )
);

console.log(
  get_rectangle_area(make_rectangle1(make_point(1, 2), make_point(1, 0), make_point(4, 2), make_point(4, 0)))
);

console.log(
  get_rectangle_area(
    make_rectangle2(
      make_segment(make_point(1, 2), make_point(1, 0)),
      make_segment(make_point(1, 0), make_point(4, 0)),
      make_segment(make_point(4, 0), make_point(4, 2)),
      make_segment(make_point(4, 2), make_point(1, 2))
    )
  )
);

// Q) 2.4

// A)
// head2(pair2(1, 3))
// head2( (m)=> m(1,3) )
// (m)=> m(1,3)( (p,q)=> p )
// ((p,q)=> p) (1,3)
// 1

// function pair3(x: number, y: number) {
//   return function (m: number) {
//     return m === 0 ? x : m === 1 ? y : Error("0 또는 1을 입력하세요");
//   };
// }

// function pair2(x: number, y: number) {
//   return (m: Function) => m(x, y);
// }

// function head2(z) {
//   return z((p, q) => p);
// }

// function tail2(z) {
//   return z((p, q) => q);
// }

// Q) 2.5

// Q) 2.6
// 참고) https://gist.github.com/vivekhaldar/ce824497e0084bc226f7
// https://en.wikipedia.org/wiki/Church_encoding
// https://medium.com/@jooyunghan/%EB%9E%8C%EB%8B%A4%EC%99%80-%EC%B9%9C%ED%95%B4%EC%A7%80%EA%B3%A0-%EC%8B%B6%EB%8B%A4%EB%A9%B4-de8de2a99035

// const one = (f) => (x) => f(x);
// let zero = (f) => (x) => x;
// let add_1 = (n) => (f) => (x) => f(n(f)(x));

// let one = (f) => (x) => f(x);
// let two = (f) => (x) => f(f(x));

// let plus = (m) => (n) => (f) => (x) => m(f)(n(f)(x));

// Q) 2.7

type Interval = [number, number];

function make_interval(x: number, y: number): Interval {
  return [x, y];
}

function lower_bound(interval: Interval) {
  return Math.min(...interval);
}

function upper_bound(interval: Interval) {
  return Math.max(...interval);
}

function add_interval(i1: Interval, i2: Interval) {
  return make_interval(lower_bound(i1) + lower_bound(i2), upper_bound(i1) + upper_bound(i2));
}

function sub_interval(i1: Interval, i2: Interval) {
  return make_interval(lower_bound(i1) - upper_bound(i2), upper_bound(i1) - lower_bound(i2));
}

function mul_interval(i1: Interval, i2: Interval) {
  const p1 = lower_bound(i1) * lower_bound(i2);
  const p2 = lower_bound(i1) * upper_bound(i2);
  const p3 = upper_bound(i1) * lower_bound(i2);
  const p4 = upper_bound(i1) * upper_bound(i2);
  return make_interval(Math.min(p1, p2, p3, p4), Math.max(p1, p2, p3, p4));
}

function div_interval(i1: Interval, i2: Interval) {
  if (lower_bound(i2) === 0 || upper_bound(i2) >= 0) {
    return Error("0으로 나눌 수 없습니다.");
  }
  return mul_interval(i1, make_interval(1 / upper_bound(i2), 1 / lower_bound(i2)));
}

// Q) 2.11
function make_center_width(c: number, w: number) {
  return make_interval(c - w, c + w);
}

function center(i: Interval) {
  return (lower_bound(i) + upper_bound(i)) / 2;
}

function width(i: Interval) {
  return (upper_bound(i) - lower_bound(i)) / 2;
}

// 2.11
// 참고 https://studyingeugene.github.io/sicp/chapter-2/exercise-2-11/

// 2.12

// make_center_percent(10, 30)
function make_center_percent(c: number, p: number) {
  return make_interval(c - (c * p) / 100, c + (c * p) / 100);
}

function percent(interval: Interval) {
  return ((upper_bound(interval) - center(interval)) / center(interval)) * 100;
}

console.log(make_center_percent(10, 30)); // [7, 13]
console.log(percent([7, 13])); // 30
