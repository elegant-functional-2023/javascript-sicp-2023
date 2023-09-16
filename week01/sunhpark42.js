/**
 * 1.1
 */

const answer1 = {
  1: 10,
  2: 12,
  3: 8,
  4: 3,
  5: 6,
  6: undefined,
  7: undefined,
  8: 19,
  9: false,
  10: 4,
  11: 16,
  12: 6,
  13: 16,
};

/**
 * 1.2
 */

const answer2 = (5 + 4 + (2 - (3 - (6 + 4 / 5)))) / (3 * (6 - 2) * (2 - 7));

/**
 * 1.3
 */

const answer3 = (num1, num2, num3) => {
  const minNumber = Math.min(num1, num2, num3);
  const targetNumber = [num1, num2, num3].filter((num) => num !== minNumber);

  if (targetNumber.length < 2) {
    return "cannot calculate";
  }

  return targetNumber.reduce((acc, current) => acc + current * current, 0);
};

const anotherAnswer3 = (num1, num2, num3) => {
  const minNumber = Math.min(num1, num2, num3);
  return num1 * num1 + num2 * num2 + num3 * num3 - minNumber * minNumber;
};

/**
 * 1.4
 */

const answer4 = `
    a, b 의 값을 전달 받아, b가 0보다 크거나 같으면 plus 함수로 평가되고, 아니면 minus 함수로 평가된다.
    평가된 함수에 a, b를 전달하여 결과를 반환한다.
`;

/**
 * 1.5
 */

const answer5 = `
    test(0, p())

    인수 우선 평가를 사용할 때:
        인수를 먼저 평가하고, 값을 적용한다.
        test(0, p())를 평가할 때, 0, p()를 먼저 평가하고, test 함수를 적용한다.
        이때 p()은 p() 함수를 리턴하고, 계속해서 p() 함수를 호출한다.
        따라서 해당 함수는 무한 루프에 빠진다.

    정상 순서 평가를 사용할 때:
        식을 완전히 전개한 후 축약한다.
        이에 따라 test(0, p()) 을 펼치면
        test (0 , p)
        0 === 0 ? 0 : p
        이므로
        0으로 평가된다.
`;

/**
 * 1.6
 */

const answer6 = `
    1. 인수 적용되기 전에 항상 평가된다.
    2. 인수를 평가할 때 sqrt_iter 는 본일을 재귀적으로 호출하기 때문에
    무한루프에 빠진다.
`;

/**
 * 1.7
 */

const answer7 = `
    제곱근 계산에 쓰인 is_good_enough 함수는 0.001보다 작거나 같은지 확인하는 함수이다.
    그러나 컴퓨터는 산술 연산 시 유효자릿수로 인한 오차가 발생할 수 있다. => 컴퓨터는 부동소수점 연산을 사용한다.
    (참고: https://ko.wikipedia.org/wiki/%EB%B6%80%EB%8F%99%EC%86%8C%EC%88%98%EC%A0%90)
    (참고: https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html)
    유효자리수 제한을 초과한 값의 제곱근을 구하고자 하는 경우, is_good_enough 함수는 제대로 동작하지 않을 수 있다.
    또는 8.999999999999 와 같은 값은 9와 동일하게 평가 된다. (8.999999999999999999999 === 9 의 결과는 true 이다.)

    큰 수의 경우
    : 차이가 0.01 보다 작아질때까지 무한히 반복하기 때문에, 계산이 끝나지 않을 수 있다.

    작은수의 경우
    : 소수점 계산에 의해 명확하지 않을 수 있다. 


    제안된 방식으로 구현한 함수.

    const newIsGoodEnough = (previousGuess, guess) => {
        const 변화량 = abs((guess - previousGuess) / guess);
        return 변화량 < 0.001;
      };
      
    const newSqrtIter = (guess, x) => {
        const nextGuess = improve(guess, x);
      
        return newIsGoodEnough(guess, nextGuess) ? guess : newSqrtIter(nextGuess, x);
    };
      

    제안한 방식으로 개선하게 되면, 계산 단계를 줄일 수 있어 큰 수의 경우에도 빠르게 계산할 수 있다.
`;

/**
 * 1.8
 */

const answer8 = `
    const is_good_enough = (guess, x) => abs(guess * guess * guess - x) < 0.001;
    const 세제곱근_구하기 = (guess, x) =>
    is_good_enough(guess, x)
        ? guess
        : 세제곱근_구하기((x / (guess * guess) + 2 * guess) / 3, x);
`;

/**
 * 1.9
 */

const answer9 = ``;

/**
 * 1.10
 */

const answer10 = `
    1. A(1, 10)

    A(0, A(1, 9))
    A(0, A(0, A(1, 8))) ...
    으로 진행된다.

    A(1, 0) 까지 진행될 것이므로 마지막 값은 2이며,
    A(0, A(1,0)) 은 2*2 으로 2의 제곱,
    즉 값은 2^10 으로 1024가 된다.

    2. A(2, 4)

    A(1, A(2, 3))
    A(1, A(1, A(2, 2)))
    A(1, A(1, A(1, A(2, 1))))

    으로 진행되며 A(2, 1) 는 2이다.

    이때 A(1, 2)의 값을 구하면 A(0, A(1, 1)) 이 되며,
    이때의 평가 값은, A(0, 2) 가 된다. A(0,2)의 값은 2*2 이다.

    해당값을 대입하면
    A(1, A(1, A(1, 2)))
    A(1, A(1, 2*2))
    이를 반복하면

    A(0, A(1, 3))
    A(0, A(0, A(1, 2)))
    A(0, A(0, 2*2))
    A(0, 2*2*2))
    2^4 가 된다.

    A(1, 2^4) 이므로,

    즉 2^16 = 65536 이다.

    3. A(3, 3) 은 수식으로 평가하면 2^(2^2^(n-1))이므로
    대입하면 값은 2^16 = 65536 이다.

    주어진 함수들을 수식으로 표현하면,
    f(n)은 2*n,
    g(n)은 2^n,
    h(n)은 2^(2^(n-1))
    이다
`;

/**
 * 1.11
 */

const answer11 = (n) => {
  if (n < 3) {
    return n;
  }

  return answer11(n - 1) + 2 * answer11(n - 2) + 3 * answer11(n - 3);
};

/**
 * 1.12
 */

const 파스칼의_삼각형 = (n, k) => {
  if (k === 0 || k === n) {
    return 1;
  }

  return 파스칼의_삼각형(n - 1, k - 1) + 파스칼의_삼각형(n - 1, k);
};

/**
 * 1.13 - 증명..건너뛰기
 */

/**
 * 1.14
 */

/**
 * 1.15
 */

const answer15 = `
    a. 5번

    b.
`;

/**
 * 1.16
 */

/**
 * 1.17
 */

/**
 * 1.18
 */

/**
 * 1.19
 */

/**
 * 1.20
 */

/**
 * 1.21
 */

const answer21 = `
    199
    1999
    7
`;

/**
 * 1.22
 */

/**
 * 1.23
 */

const answer23 = `
    수정 전 수행시간:
    수정 후 수행시간:
    속도 비: 
`;

/**
 * 1.24
 */

/**
 * 1.25
 */

/**
 * 1.26
 */

/**
 * 1.27
 */

/**
 * 1.28
 */
