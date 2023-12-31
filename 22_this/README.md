# 22.1 this 키워드
+ this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수이다.
+ this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.
+ this가 가리키는 값, 즉 this 바인딩은 `함수 호출 방식에 의해 동적으로 결정`된다.
```
🗒️this 바인딩
- 바인딩 : 식별자와 값을 연결하는 과정
- this 바인딩 : this와 this가 가리킬 객체를 바인딩하는 것
```
+ 객체 리터럴 메서드 내부에서의 this는 `메서드를 호출한 객체`를 가리킨다.
```js
const circle = {
    radius : 5,
    getDiameter() {
        return 2 * this.radius; // this는 메서드를 호출한 객체인 circle을 가리킴
    }
};

console.log(circle.getDiameter()); // 10
```
+ 생성자 함수 내부의 this는 `생성자 함수가 생성할 인스턴스`를 가리킨다. 
```js
function Circle(radius){
    this.radius = radius; // this는 생성자 함수가 생성할 인스턴스를 가리킨다
}

Circle.prototype.getDiameter = function(){
    return 2 * this.radius; // this는 생성자 함수가 생성할 인스턴스를 가리킨다
}

const circle = new Circle(5); // 인스턴스 생성
console.log(circle.getDiameter()); // 10
```
+ this는 `함수가 호출되는 방식`에 따라 this에 바인딩될 값, 즉 this 바인딩이 `동적으로 결정`된다.
```js
// this는 어디서든지 참조 가능하다
// 전역에서 this는 전역 객체 window를 가리킨다
console.log(this); // window

function square(number){
    // 일반함수 내부에서 this는 전역 객체 window를 가리킨다
    console.log(this); // window
    return number * number;
}
square(2); 
```
___
<br/><br/>
# 22.2 함수 호출 방식과 this 바인딩
> this 바인딩은 함수 호출 방식, 즉 함수가 어떻게 호출되었는지에 따라 동적으로 결정된다.
```js
const foo = function(){
    console.dir(this); 
};

// 1. 일반 함수 호출
// this는 전역 객체 window를 가리킴
foo(); // window

// 2. 메서드 호출
// this는 메서드를 호출한 객체 obj를 가리킨다
const obj = {foo};
obj.foo(); // obj

// 3. 생성자 함수 호출
// this는 생성자 함수가 생성한 인스턴스를 가리킨다
new foo(); // foo{}

// 4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출
// this는 인수에 의해 결정된다
const bar = {name: 'bar'};

foo.call(bar); // bar
foo.apply(bar); // bar
foo.bind(bar)(); // bar
```
___
## 22.2.1 일반 함수 호출에 따른 this 바인딩 
> this에는 전역 객체 바인딩
+ 일반 함수로 호출된 모든 함수(`중첩 함수, 콜백 함수 포함`) 내부의 this에는 전역 객체가 바인딩된다
+ ⚠️외부 함수인 메서드와 중첩 함수, 콜백 함수의 this가 일치하지 않는다는 것은 중첩 함수, 콜백 함수를 헬퍼 함수로 동작하기 어렵게 만든다 <br/>
```js
var value = 1;

const obj = {
    value: 100,
    foo() {
        console.log(this); // { value: 100, foo: [Function: foo] }
        // 콜백 함수 내부의 this에는 전역 객체가 바인딩된다 
        setTimeout(function (){
            console.log(this); // window
            console.log(this.value); // 1
        }, 100);
    }
};

obj.foo();
```
→ ☑️ 메서드 내부의 중첩 함수나 콜백 함수의 this 바인딩을 메서드의 this 바인딩과 일치시키기 위한 방법
```js
var value = 1;

const obj = {
    value : 100,
    foo() {
        // m1) this 바인딩(obj)을 변수 that에 할당
        const that = this;

        // 콜백 함수 내부에서 this 대신 that을 참조
        setTimeout(function(){
            console.log(that.value); // 100
        }, 100);
    }
}

obj.foo();
```
```js
var value = 1;

const obj = {
    value : 100,
    foo() {
        // m2) 콜백 함수에 명시적으로 this를 바인딩
        setTimeout(function(){
            console.log(this.value); // 100
        }.bind(this), 100);
    }
};

obj.foo();
```
```js
var value = 1;

const obj = {
    value : 100,
    foo() {
        // m3) 화살표 함수 사용해서 this 바인딩 일치시킴 (화살표 함수 내부의 this는 상위 스코프의 this를 가리킨다)
        setTimeout(() => console.log(this.value), 100); // 100
    }
};

obj.foo();
```
___
## 22.2.2 메서드 호출에 따른 this 바인딩
> 메서드를 호출한 객체에 바인딩 
```js
const person = {
    name : 'Lee',
    getName() {
        // 메서드 내부의 this는 메서드를 호출한 객체에 바인딩 
        return this.name;
    }
}
// 메서드 getName()을 호출한 객체는 person 
console.log(person.getName()); // Lee

 // person 객체의 getName 프로퍼티가 가리키는 함수 객체는 person 객체에 포함된 것이 아니라 독립적으로 존재하는 별도의 객체
 // (아래 그림처럼 getName 프로퍼티가 함수 객체를 가리키고 있음) 
```
<img src='https://velog.velcdn.com/images/wjalsrb0923/post/f96ebd61-5d13-4228-9631-ea64b7373ade/image.png' width='600'/>

```js

// getName 메서드는 다른 객체의 프로퍼티에 할당하는 것으로 다른 객체의 메서드가 될 수도 있고 
// 일반변수에 할당하여 일반 함수로 호출될 수도 있다 
const anotherPerson = {
    name : 'Kim'
};
// getName 메서드를 anotherPerson 객체의 메서드로 할당 
anotherPerson.getName = person.getName;

console.log(anotherPerson.getName()); // Kim

// getName 메서드를 변수에 할당 
const getName = person.getName;

console.log(getName()); // ''

// 아래 그림처럼 메서드 내부의 this는 프로퍼티로 메서드를 가리키고 있는 객체와는 관계가 없고 메서드를 호출한 객체에 바인딩된다 
```
<img src='https://velog.velcdn.com/images/wjalsrb0923/post/1c1ef604-7ac0-4e9e-b75e-b80acf672b0a/image.png' width='600'/><br/>
+ 프로토타입 메서드 내부에서 사용된 this도 일반 메서드와 마찬가지로 해당 메서드를 호출한 객체에 바인딩된다
```js
function Person(name) {
    this.name = name;
}

Person.prototype.getName = function () {
    return this.name;
};

const me = new Person('Lee');

console.log(me.getName()); // Lee

Person.prototype.name = 'Kim';

console.log(Person.prototype.getName()); // Kim
```
<img src='https://velog.velcdn.com/images/wjalsrb0923/post/ec1855d9-4b6b-4c19-a594-131388d27842/image.png' width='800'/><br/>
## 22.2.3 생성자 함수 호출에 따른 this 바인딩 
> 생성자 함수가 (미래에)생성할 인스턴스가 바인딩
```js
function Circle(radius) {
    // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다 
    this.radius = radius;
    this.getDiameter = function () {
        return 2 * this.radius;
    };
}

const circle1 = new Circle(5);
const circle2 = new Circle(10);

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
```
+ 생성자 함수는 new 연산자와 함께 호출하지 않으면 일반 함수로 동작
___
## 22.2.4 Function.prototype.apply/call/bind 메서드에 의한 간접 호출에 따른 this 바인딩 

