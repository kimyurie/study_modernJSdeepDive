# 5.1 값
> 식(표현식)이 평가되어 생성된 결과이며 변수에 할당되는 것
```js
// 변수에는 10 + 20이 평가되어 생성된 숫자값 30이 할당된다 (10 + 20이 할당되지 않음)
var sum = 10 + 20;
```
___
<br/><br/>
# 5.2 리터럴
> 사람이 이해할 수 있는 문자 또는 약속된 기호를 사용해 값을 생성하는 표기법 
```js
// 숫자 리터럴 3
// = 사람이 이해할 수 있는 아라비아 숫자를 사용해 숫자 리터럴 3을 코드에 기술하면 js 엔진은 이를 평가해 숫자값 3을 생성
3
```
+ js 엔진은 코드가 실행되는 시점인 런타임에 리터럴을 평가해 값을 생성
___
<br/><br/>
# 5.3 표현식
> 표현식은 값으로 평가될 수 있는 문으로 표현식이 평가되면 새로운 값을 생성하거나 기존의 값을 참조한다
+ `값으로 평가될 수 있는 모든 문 = 표현식!` <br/>
+ ex) 리터럴, 식별자, 연산자, 함수 호출 등
___
<br/><br/>
# 5.4 문
> 프로그램을 구성하는 기본 단위이자 최소 실행 단위 (명령문이라고도 함) <br/>
ㄴ ex) 선언문, 할당문, 조건문, 반복문
+ 토큰 : 문법적으로 더 이상 나눌 수 없는 코드의 기본 요소 <br/>
         (ex) 키워드, 식별자, 연산자, 리터럴, 세미콜론, 마침표)
___
<br/><br/>
# 5.5 세미콜론과 세미콜론 자동 삽입 기능
+ js는 문장 끝에 세미콜론 자동 삽입 기능있어 세미콜론 생략 가능하지만 그래도 되도록이면 쓰는게 나음
___
<br/><br/>
# 5.6 표현식인 문과 표현식이 아닌 문
> - 표현식인 문 : 값으로 평가될 수 있는 문 (ex) 할당문)<br/>
> - 표현식이 아닌 문 : 값으로 평가될 수 없는 문 (ex) 변수 선언문)
+ 구별 방법 = 변수에 할당해 보는 것
```js
var foo = var x;  // 다음과 같은 선언문은 변수할당 불가능 → SyntaxError
var foo = x = 100; // 다음과 같은 할당문은 변수할당 가능
```
+ 표현식인 문 → 값으로 평가됨 → 변수에 할당 가능
+ 표현식이 아닌 문 → 값으로 평가되지 않음 → 변수에 할당하면 에러 발생

```
[ 📝 완료값 ]
- 크롬 개발자 도구에서 표현식이 아닌 문 실행하면 언제나 undefined 출력되는데 이를 완료값이라 함
- 완료값은 표현식의 평가 결과가 아님! → 다른 값과 같이 변수에 할당 x 참조 x
```
___


  

  

