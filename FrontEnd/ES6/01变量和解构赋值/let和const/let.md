# let 和 const 命令

## 1.let 命令

### 1.1.基本用法

ES6 新增了 let 命令，用来声明变量。它的用法类似于 var，但是所声明的变量，只在 let 命令所在的代码块内有效。

```js
{
  let a = 10;
  var b = 1;
}

a; // ReferenceError: a is not defined.
b; // 1
```

下面看看 var 和 let 声明的变量在循环中的行为：

```js
// var 声明的 i，在全局范围内都有效，所以全局只有一个变量 i
// 只是每一次循环，变量 i 的值都会发生改变而已
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function() {
    console.log(i);
  };
}
a[6](); // 10

// let 声明的变量仅在块级作用域内有效
// 当前的 i 只在本轮循环有效，所以每一次循环的 i 其实都是一个新的变量
// JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量 i 时，就在上一轮循环的基础上进行计算
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function() {
    console.log(i);
  };
}
a[6](); // 6
```

另外，for 循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。

```js
for (let i = 0; i < 3; i++) {
  let i = "abc";
  console.log(i);
}
// abc
// abc
// abc
```

### 1.2.不存在变量提升

var 命令会发生“变量提升”现象，let 命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。

```js
// var 的情况
console.log(foo); // 输出 undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错 ReferenceError
let bar = 2;
```

### 1.3.暂时性死区

只要块级作用域内存在 let 命令，它所声明的变量就“**绑定**”（binding）这个区域，不再受外部的影响。

```js
var tmp = 123;

// tmp 从全局读取
if (true) {
  tmp = "abc";
  console.log(tmp); //abc
}

// tmp 从 let 声明的读取，但在声明之前使用，报错
if (true) {
  tmp = "abc"; //ReferenceError: tmp is not defined
  let tmp;
  console.log(tmp);
}

// const 同理
if (true) {
  tmp = "abc"; //ReferenceError: tmp is not defined
  const tmp = "abc";
  console.log(tmp);
}
```

ES6 明确规定，如果区块中存在 let 和 const 命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

总之，在代码块内，使用 let 命令声明变量之前，该变量都是不可用的。这在语法上，称为“**暂时性死区**”（temporal dead zone，简称 TDZ）。

```js
if (true) {
  // TDZ 开始
  tmp = "abc"; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ 结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
```

“暂时性死区”也意味着 typeof 不再是一个百分之百安全的操作。

```js
typeof x; // ReferenceError
let x;
```

作为比较，如果一个变量根本没有被声明，使用 typeof 反而不会报错。

`typeof undeclared_variable // "undefined"`

有些“死区”比较隐蔽，不太容易发现。

```js
// 死区
function bar(x = 2, y = x) {
  return [x, y];
}
bar(); // [2, 2]

function bar(x = y, y = 2) {
  return [x, y];
}

bar(); // ReferenceError

// 不报错
var x = x;

// 报错
let x = x;
// ReferenceError: x is not defined
```

ES6 规定暂时性死区和 let、const 语句不出现变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量，从而导致意料之外的行为。这样的错误在 ES5 是很常见的，现在有了这种规定，避免此类错误就很容易了。

总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

### 1.4.不允许重复声明

let 不允许在相同作用域内，重复声明同一个变量。

```js
function func() {
  let a = 10; // SyntaxError
  var a = 1;
}

function func() {
  let a = 10;
  let a = 1; // SyntaxError
}

// 函数内部也不能用 let 或 const 重新声明参数
function func(a) {
  let a = 10; // SyntaxError
}
```

## 2.块级作用域

### 2.1.为什么需要块级作用域

ES5 只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。

第一种场景，内层变量可能会覆盖外层变量。

```js
var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    var tmp = "hello world";
  }
}

f(); // undefined
```

第二种场景，用来计数的循环变量泄露为全局变量。

```js
var s = "hello";

for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}

console.log(i); // 5
```

### 2.2.ES6 的块级作用域

let 实际上为 JavaScript 新增了块级作用域。

```js
function f1() {
  var n = 5;
  if (true) {
    let n = 10; // 5
    var n = 10; // 10
  }
  console.log(n);
}
```

ES6 允许块级作用域的任意嵌套。

```js
{
  {
    {
      {
        {
          let insane = "Hello World";
        }
        console.log(insane); // 报错
      }
    }
  }
}
```

内层作用域可以定义外层作用域的同名变量。

```js
{
  {
    {
      {
        let insane = "Hello World";
        {
          let insane = "Hello World";
        }
      }
    }
  }
}
```

块级作用域的出现，实际上使得获得广泛应用的立即执行函数表达式（IIFE）不再必要了。

```js
// IIFE 写法
(function () {
var tmp = ...;
...
}());

// 块级作用域写法
{
let tmp = ...;
...
}
```

### 2.3.块级作用域与函数声明

函数能不能在块级作用域之中声明？这是一个相当令人混淆的问题。

ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。

```js
// 情况一
if (true) {
  function f() {}
}

// 情况二
try {
  function f() {}
} catch (e) {
  // ...
}
```

上面两种函数声明，根据 ES5 的规定都是非法的。

但是，浏览器没有遵守这个规定，为了兼容以前的旧代码，还是支持在块级作用域之中声明函数，因此上面两种情况实际都能运行，不会报错。

ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，函数声明语句的行为类似于 let，在块级作用域之外不可引用。

```js
function f() {
  console.log("I am outside!");
}

(function() {
  if (false) {
    // 重复声明一次函数 f
    function f() {
      console.log("I am inside!");
    }
  }

  f();
})();
```

上面代码在 ES5 中运行，会得到“I am inside!”，因为在 if 内声明的函数 f 会被提升到函数头部。ES6 就完全不一样了，理论上会得到“I am outside!”。因为块级作用域内声明的函数类似于 let，对作用域之外没有影响。但是，如果你真的在 ES6 浏览器中运行一下上面的代码，是会报错的，这是为什么呢？

```js
// 浏览器的 ES6 环境
(function() {
  if (false) {
    // 重复声明一次函数 f
    function f() {
      console.log("I am inside!");
    }
  }
  f();
})();
// TypeError: f is not a function
```

原来，如果改变了块级作用域内声明的函数的处理规则，显然会对老代码产生很大影响。为了减轻因此产生的不兼容问题，ES6 在附录 B 里面规定，浏览器的实现可以不遵守上面的规定(块级作用域内声明的函数类似于 let，即不会有变量提升)，有自己的行为方式。

- 允许在块级作用域内声明函数。
- 函数声明类似于 var，即会提升到全局作用域或函数作用域的头部。
- 同时，函数声明还会提升到所在的块级作用域的头部。

> 注意，上面三条规则只对 ES6 的浏览器实现有效，其他环境的实现不用遵守，还是将块级作用域的函数声明当作 let 处理。

根据这三条规则，浏览器的 ES6 环境中，块级作用域内声明的函数，行为类似于 var 声明的变量。上面的例子实际运行的代码如下。

```js
// 浏览器的 ES6 环境
(function() {
  if (false) {
    var f = function() {
      console.log("I am inside!");
    };
  }
  f();
})();
// Uncaught TypeError: f is not a function
```

考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。

```js
// 块级作用域内部的函数声明语句，建议不要使用
{
  let a = "secret";
  function f() {
    return a;
  }
}

// 块级作用域内部，优先使用函数表达式
{
  let a = "secret";
  let f = function() {
    return a;
  };
}
```

另外，还有一个需要注意的地方。ES6 的块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域。

```js
// 第一种写法，报错
if (true) let x = 1;
// SyntaxError: Lexical declaration cannot appear in a single-statement context

// 第二种写法，不报错
if (true) {
  let x = 1;
}
```

函数声明也是如此，严格模式下，函数只能声明在当前作用域的顶层。

```js
// 不报错
'use strict';
if (true) {
  function f() {}
}

// 报错
'use strict';
if (true)
function f() {}
// SyntaxError: In strict mode code, functions can only be declared at top level or inside a block.
```

## 3.const 命令

### 3.1.基本用法

const 声明一个只读的常量。一旦声明，常量的值就不能改变。

```js
const PI = 3.1415;
PI; // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.
```

const 声明的变量不得改变值，这意味着，const 一旦声明变量，就必须立即初始化，不能留到以后赋值。

```js
const foo;
// SyntaxError: Missing initializer in const declaration
```

const 的作用域与 let 命令相同：只在声明所在的块级作用域内有效。

```js
if (true) {
  const MAX = 5;
}

MAX; // ReferenceError
```

const 命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。

```js
if (true) {
  console.log(MAX); // ReferenceError
  const MAX = 5;
}
```

const 声明的常量，也与 let 一样不可重复声明。

```js
var message = "Hello!";
let age = 25;

// 以下两行都会报错
const message = "Goodbye!";
const age = 30;
```

### 3.2.本质

const 实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const 只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。

```js
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop; // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: Assignment to constant variable.
```

如果真的想将对象冻结，应该使用 `Object.freeze` 方法。

```js
const foo = Object.freeze({});

// 常规模式时: 不起作用；
// 严格模式时: 报错
// (TypeError: Cannot add property prop, object is not extensible)
foo.prop = 123;
```

除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。

```js
var constantize = obj => {
  Object.freeze(obj);
  Object.keys(obj).forEach((key, i) => {
    if (typeof obj[key] === "object") {
      constantize(obj[key]);
    }
  });
};
```

### 3.3.ES6 声明变量的六种方法

ES5 只有两种声明变量的方法：var 命令和 function 命令。ES6 除了添加 let 和 const 命令，后面章节还会提到，另外两种声明变量的方法：import 命令和 class 命令。所以，ES6 一共有 6 种声明变量的方法。

## 4.顶层对象的属性

顶层对象，在浏览器环境指的是 window 对象，在 Node 指的是 global 对象。ES5 之中，顶层对象的属性与全局变量是等价的。

```js
// 浏览器环境
window.a = 1;
a; // 1

a = 2;
window.a; // 2
```

顶层对象的属性与全局变量挂钩，被认为是 JavaScript 语言最大的设计败笔之一。这样的设计带来了几个很大的问题:

- 首先是没法在编译时就报出变量未声明的错误，只有运行时才能知道（因为全局变量可能是顶层对象的属性创造的，而属性的创造是动态的）；
  >
- 其次，很容易不知不觉地就创建了全局变量（比如打字出错）；
  >
- 最后，顶层对象的属性是到处可以读写的，这非常不利于模块化编程。

另一方面，window 对象有实体含义，指的是浏览器的窗口对象，顶层对象是一个有实体含义的对象，也是不合适的。

ES6 为了改变这一点，一方面规定，为了保持兼容性，var 命令和 function 命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let 命令、const 命令、class 命令声明的全局变量，不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。

```js
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a; // 1

let b = 1;
window.b; // undefined
```

## 5.globalThis 对象

JavaScript 语言存在一个顶层对象，它提供全局环境（即全局作用域），所有代码都是在这个环境中运行。但是，顶层对象在各种实现里面是不统一的。

- 浏览器里面，顶层对象是 window，但 Node 和 Web Worker 没有 window。
- 浏览器和 Web Worker 里面，self 也指向顶层对象，但是 Node 没有 self。
- Node 里面，顶层对象是 global，但其他环境都不支持。

| 环境   | window | self | golbal |
| ------ | :----: | :--: | :----: |
| 浏览器 |   √    |  √   |   ×    |
| node   |   ×    |  ×   |   √    |
| worker |   ×    |  √   |   ×    |

同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用 this 变量，但是有局限性。

- 全局环境中，this 会返回顶层对象。但是，Node 模块和 ES6 模块中，this 返回的是当前模块。
  >
- 函数里面的 this，如果函数不是作为对象的方法运行，而是单纯作为函数运行，this 会指向顶层对象。但是，严格模式下，这时 this 会返回 undefined。
  >
- 不管是严格模式，还是普通模式，`new Function('return this')()`，总是会返回全局对象。但是，如果浏览器用了 CSP（Content Security Policy，内容安全策略），那么 eval、new Function 这些方法都可能无法使用。

| 环境     | 全局域   | 函数域                      |
| -------- | -------- | --------------------------- |
| 浏览器   | 顶层对象 | 调用对象/顶层对象/undefined |
| node     | 当前模块 |
| ES6 模块 | 当前模块 |

综上所述，很难找到一种方法，可以在所有情况下，都取到顶层对象。下面是两种勉强可以使用的方法。

```js
// 方法一
typeof window !== "undefined"
  ? window
  : typeof process === "object" &&
    typeof require === "function" &&
    typeof global === "object"
  ? global
  : this;

// 方法二
var getGlobal = function() {
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw new Error("unable to locate global object");
};
```

现在有一个提案，在语言标准的层面，引入 globalThis 作为顶层对象。也就是说，任何环境下，globalThis 都是存在的，都可以从它拿到顶层对象，指向全局环境下的 this。

垫片库 global-this 模拟了这个提案，可以在所有环境拿到 globalThis。

> 2019.07.04 测试，chrome 浏览器可以获取全局对象，node（10.16.0）不能；
