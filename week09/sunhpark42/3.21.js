// 자바스크립트에서 다음과 같이 출력되는 이유?
// list 를 출력할 때 rear에 대한 ptr을 호출하기 때문

// 오 한결님 짱
const print_queue(x) {
    // 프론트 queue 만 출력하고, rear는 출력하지 않는다.
    console.log(front_queue(x))
}