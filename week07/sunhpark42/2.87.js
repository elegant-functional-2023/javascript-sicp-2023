// 다항식을 위한 is_equal_to_zero를 정의해서 일반적 산술 패키지에 설치하라. adjoin_term은 그 자체로 다항식인 계수들을 처리할 때 이 술어를 사용한다.

// 솔직히 2.80이랑 무슨 차이가 있는 지 모르겠음.

const is_equal_to_zero = (value) => coeff(value) === 0;
