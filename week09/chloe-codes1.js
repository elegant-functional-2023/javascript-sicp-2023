/*
  3.21)
  대기열을 받고 대기열에 담긴 항목들의 순차열을 출력하는 함수
*/

function print_queue(queue) {
  function generate_queue_chain(queue) {
    if (is_empty_queue(queue) || front_ptr(queue) === rear_ptr(queue)) {
      return null;
    }

    // queue의 맨 앞 요소를 사용하여 pair를 재귀적으로 생성
    return pair(head(front_ptr(queue)), generate_queue_chain(tail(queue)));
  }

  function print(pair) {
    if (is_null(pair)) {
      console.log([]);
      return;
    }
    console.log(head(pair));
    print(tail(pair));
  }

  const queue_chain = generate_queue_chain(queue);
  print(queue_chain);
}
