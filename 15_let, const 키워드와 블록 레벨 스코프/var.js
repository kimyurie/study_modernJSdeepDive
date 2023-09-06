var x = 1;
var y = 1;

// var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.
// 초기화문(변수 선언과 동시에 초기값 할당하는 문)이 있는 변수 선언문은 js엔진에 의해 var키워드가 없는 것처럼 동작!
var x = 100;
// 초기화문이 없는 변수 선언문은 무시된다. 
var y;

console.log(x);
console.log(y);