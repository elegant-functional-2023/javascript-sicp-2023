const a = `이항 함수(인수가 두 개인 함수)와 스트림 두 개를 받고,
그 두 스트림의 두 요소(색인이 같은)로 그 이항 함수를 호출해서 얻은 요소들을 나열하는 스트림을 돌려주는 함수 stream_map_2를 선언하라.
function stream_map_2(f, s1, s2) 
    {    
        ...
    }
그리고 이 stream_map_2를 수정해서, 
결과 스트림에 대해 메모화를 적용하는 함수 stream_map_2_optimized를 작성하라.`;

const stream_map_2 = (f, s1, s2) => {
  if (is_empty_list(s1) || is_empty_list(s2)) {
    return [];
  } else {
    return pair(f(head(s1), head(s2)), () =>
      stream_map_2(f, stream_tail(s1), stream_tail(s2))
    );
  }
};
