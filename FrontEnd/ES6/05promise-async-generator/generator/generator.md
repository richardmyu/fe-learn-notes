# Generator 函数的语法

## 1.简介

### 1.1.基本概念

Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。

Generator 函数有多种理解角度。语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。

执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

形式上，Generator 函数是一个普通函数，但是有两个特征。

- 一是，function 关键字与函数名之间有一个星号；
  >
- 二是，函数体内部使用 yield 表达式，定义不同的内部状态（yield 在英语里的意思就是“产出”）。

```js
function* helloWorldGenerator() {
  yield "hello";
  yield "world";
  return "ending";
}

var hw = helloWorldGenerator();
```

然后，Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是的**遍历器对象**（Iterator Object）。

下一步，必须调用遍历器对象的 next 方法，使得指针移向下一个状态。也就是说，每次调用 next 方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个 yield 表达式（或 return 语句）为止。换言之，Generator 函数是分段执行的，yield 表达式是暂停执行的标记，而 next 方法可以恢复执行。

```js
function* helloWorldGenerator() {
  console.log("一切猜刚刚开始");
  yield "hello";
  console.log("准备好了吗？");
  console.log("omg，已经开始了吗？");
  yield "world";
  console.log("也许我可以做得更多");
  return "ending";
}

var hw = helloWorldGenerator();
console.log(hw);

console.log(hw.next());
// 一切猜刚刚开始
// { value: 'hello', done: false }

console.log(hw.next());
// 准备好了吗？
// omg，已经开始了吗？
// { value: 'world', done: false }

console.log(hw.next());
// 也许我可以做得更多
// { value: 'ending', done: true }

console.log(hw.next());
// { value: undefined, done: true }
```

第一次调用，Generator 函数开始执行，直到遇到第一个 yield 表达式为止。next 方法返回一个对象，它的 value 属性就是当前 yield 表达式的值 hello，done 属性的值 false，表示遍历还没有结束。

第二次调用，Generator 函数从上次 yield 表达式停下的地方，一直执行到下一个 yield 表达式。next 方法返回的对象的 value 属性就是当前 yield 表达式的值 world，done 属性的值 false，表示遍历还没有结束。

第三次调用，Generator 函数从上次 yield 表达式停下的地方，一直执行到 return 语句（如果没有 return 语句，就执行到函数结束）。next 方法返回的对象的 value 属性，就是紧跟在 return 语句后面的表达式的值（如果没有 return 语句，则 value 属性的值为 undefined），done 属性的值 true，表示遍历已经结束。

第四次调用，此时 Generator 函数已经运行完毕，next 方法返回对象的 value 属性为 undefined，done 属性为 true。以后再调用 next 方法，返回的都是这个值。

总结一下，调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。以后，每次调用遍历器对象的 next 方法，就会返回一个有着 value 和 done 两个属性的对象。value 属性表示当前的内部状态的值，是 yield 表达式后面那个表达式的值；done 属性是一个布尔值，表示是否遍历结束。

ES6 没有规定，function 关键字与函数名之间的星号，写在哪个位置。这导致下面的写法都能通过。

```js
function * foo(x, y) { ··· }
function *foo(x, y) { ··· }
function* foo(x, y) { ··· }
function*foo(x, y) { ··· }
```

由于 Generator 函数仍然是普通函数，所以一般的写法是上面的第三种，即星号紧跟在 function 关键字后面。

### 1.2.yield 表达式

由于 Generator 函数返回的遍历器对象，只有调用 next 方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield 表达式就是暂停标志。

遍历器对象的 next 方法的运行逻辑如下。

（1）遇到 yield 表达式，就暂停执行后面的操作，并将紧跟在 yield 后面的那个表达式的值，作为返回的对象的 value 属性值。

（2）下一次调用 next 方法时，再继续往下执行，直到遇到下一个 yield 表达式。

（3）如果没有再遇到新的 yield 表达式，就一直运行到函数结束，直到 return 语句为止，并将 return 语句后面的表达式的值，作为返回的对象的 value 属性值。

（4）如果该函数没有 return 语句，则返回的对象的 value 属性值为 undefined。

需要注意的是，yield 表达式后面的表达式，只有当调用 next 方法、内部指针指向该语句时才会执行，因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。

yield 表达式与 return 语句既有相似之处，也有区别。相似之处在于，都能返回紧跟在语句后面的那个表达式的值。区别在于每次遇到 yield，函数暂停执行，下一次再从该位置继续向后执行，而 return 语句不具备位置记忆的功能。

一个函数里面，只能执行一次（或者说一个）return 语句，但是可以执行多次（或者说多个）yield 表达式。正常函数只能返回一个值，因为只能执行一次 return；Generator 函数可以返回一系列的值，因为可以有任意多个 yield。从另一个角度看，也可以说 Generator 生成了一系列的值，这也就是它的名称的来历（英语中，generator 这个词是“生成器”的意思）。

Generator 函数可以不用 yield 表达式，这时就变成了一个单纯的暂缓执行函数。

```js
function* f() {
  console.log("执行了！");
}

var generator = f();

generator.next();
setTimeout(function() {
  generator.next();
}, 2000);
// 执行了！
```

另外需要注意，yield 表达式只能用在 Generator 函数里面，用在其他地方都会报错。

```js
(function (){
  yield 1;
})()
// SyntaxError: Unexpected number
```

下面是另外一个例子。

```js
var arr = [1, [[2, 3], 4], [5, 6]];

var flat = function* (a) {
  a.forEach(function (item) {
    if (typeof item !== 'number') {
      yield* flat(item);
    } else {
      yield item;
    }
  });
};

for (var f of flat(arr)){
  console.log(f);
}
```

上面代码也会产生句法错误，因为 forEach 方法的参数是一个普通函数，但是在里面使用了 yield 表达式（这个函数里面还使用了 `yield*` 表达式）。一种修改方法是改用 for 循环。

```js
var arr = [1, [[2, 3], 4], [5, 6]];

var flat = function*(a) {
  var length = a.length;
  for (var i = 0; i < length; i++) {
    var item = a[i];
    if (typeof item !== "number") {
      yield* flat(item);
    } else {
      yield item;
    }
  }
};

for (var f of flat(arr)) {
  console.log(f);
}
// 1, 2, 3, 4, 5, 6
```

另外，yield 表达式如果用在另一个表达式之中，必须放在圆括号里面。

```js
function* demo() {
  console.log('Hello' + yield); // SyntaxError
  console.log('Hello' + yield 123); // SyntaxError

  console.log('Hello' + (yield)); // OK
  console.log('Hello' + (yield 123)); // OK
}
```

yield 表达式用作函数参数或放在赋值表达式的右边，可以不加括号。

```js
function* demo() {
  foo(yield "a", yield "b"); // OK
  let input = yield; // OK
}
```

## 2.next 方法的参数

## 3.for...of 循环

## 4.Generator.prototype.throw()

## 5.Generator.prototype.return()

## 6.next()、throw()、return() 的共同点

## 7.yield\* 表达式

## 8.作为对象属性的 Generator 函数

## 9.Generator 函数的 this

## 10.含义

## 11.应用
