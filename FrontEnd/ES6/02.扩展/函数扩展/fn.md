# 函数的扩展

## 1.函数参数的默认值

### 1.1.基本用法

ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。

```js
function log(x, y = "World") {
  console.log(x, y);
}

log("Hello"); // Hello World
log("Hello", "China"); // Hello China
log("Hello", ""); // Hello
```

参数变量是默认声明的，所以不能用 let 或 const 再次声明。

```js
function foo(x = 5) {
  let x = 1; // error
  const x = 2; // error
}
```

使用参数默认值时，函数不能有同名参数。

```js
// 不报错
function foo(x, x, y) {
  // ...
}

// 报错
function foo(x, x, y = 1) {
  // ...
}
// SyntaxError: Duplicate parameter name not allowed in this context
```

另外，一个容易忽略的地方是，参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是 _惰性求值_ 的。

```js
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}

foo(); // 100

x = 100;
foo(); // 101
```

### 1.2.与解构赋值默认值结合使用

参数默认值可以与解构赋值的默认值，结合起来使用。

```js
function foo({ x, y = 5 }) {
  console.log(x, y);
}

foo({}); // undefined 5
foo({ x: 1 }); // 1 5
foo({ x: 1, y: 2 }); // 1 2
foo(); // TypeError: Cannot read property 'x' of undefined
```

通过提供函数参数的默认值，就可以避免这种情况。

```js
function foo({ x, y = 5 } = {}) {
  console.log(x, y);
}

foo(); // undefined 5
```

### 1.3.参数默认值的位置

通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的。若不想输入具体参数，可以显式输入 undefined。

```js
// 例一
function f(x = 1, y) {
  return [x, y];
}

f() // [1, undefined]
f(2) // [2, undefined])
f(, 1) // 报错
f(undefined, 1) // [1, 1]

// 例二
function f(x, y = 5, z) {
  return [x, y, z];
}

f() // [undefined, 5, undefined]
f(1) // [1, 5, undefined]
f(1, ,2) // 报错
f(1, undefined, 2) // [1, 5, 2]
```

### 1.4.函数的 length 属性

指定了默认值以后，函数的 length 属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length 属性将失真。

```js
(function(a) {}.length); // 1
(function(a = 5) {}.length); // 0
(function(a, b, c = 5) {}.length); // 2
```

这是因为 length 属性的含义是，该函数预期传入的参数个数。某个参数指定默认值以后，预期传入的参数个数就不包括这个参数了。同理，后文的 rest 参数也不会计入 length 属性。

`(function(...args) {}).length // 0`

如果设置了默认值的参数不是尾参数，那么 length 属性也不再计入后面的参数了。

```js
(function(a = 0, b, c) {}.length); // 0
(function(a, b = 1, c) {}.length); // 1
```

### 1.5.作用域

一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。

```js
var x = 1;

function f(y = x) {
  console.log(y);
}

f(2); // 2
```

如果参数的默认值是一个函数，该函数的作用域也遵守这个规则。请看下面的例子。

```js
let foo = "outer";

function bar(func = () => foo) {
  let foo = "inner";
  console.log(func());
}

bar(); // outer
```

### 1.6.应用

利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。

```js
function throwIfMissing() {
  throw new Error("Missing parameter");
}

function foo(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}

foo();
// Error: Missing parameter
```

另外，可以将参数默认值设为 undefined，表明这个参数是可以省略的。

`function foo(optional = undefined) { ··· }`

## 2.rest 参数

ES6 引入 **rest 参数**（形式为 `...变量` 名），用于获取函数的多余参数，这样就不需要使用 arguments 对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

```js
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3); // 10
```

注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。

```js
// 报错
function f(a, ...b, c) {
  // ...
}
```

函数的 length 属性，不包括 rest 参数。

```js
(function(a) {}
  .length(
    // 1
    function(...a) {}
  )
  .length(
    // 0
    function(a, ...b) {}
  ).length); // 1
```

## 3.严格模式

从 ES5 开始，函数内部可以设定为严格模式。

```js
function doSomething(a, b) {
  "use strict";
  // code
}
```

ES2016 做了一点修改，规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。

```js
// 报错
function doSomething(a, b = a) {
  'use strict';
  // code
}

// 报错
const doSomething = function ({a, b}) {
  'use strict';
  // code
};

// 报错
const doSomething = (...a) => {
  'use strict';
  // code
};
```

这样规定的原因是，函数内部的严格模式，同时适用于函数体和函数参数。但是，函数执行的时候，先执行函数参数，然后再执行函数体。这样就有一个不合理的地方，只有从函数体之中，才能知道参数是否应该以严格模式执行，但是参数却应该先于函数体执行。

虽然可以先解析函数体代码，再执行参数代码，但是这样无疑就增加了复杂性。因此，标准索性禁止了这种用法，只要参数使用了默认值、解构赋值、或者扩展运算符，就不能显式指定严格模式。

两种方法可以规避这种限制。第一种是设定全局性的严格模式，这是合法的。

```js
"use strict";

function doSomething(a, b = a) {
  // code
}
```

第二种是把函数包在一个无参数的立即执行函数里面。

```js
const doSomething = (function() {
  "use strict";
  return function(value = 42) {
    return value;
  };
})();
```

## 4.name 属性

函数的 name 属性，返回该函数的函数名。

```js
function foo() {}
foo.name; // "foo"
```

这个属性早就被浏览器广泛支持，但是直到 ES6，才将其写入了标准。

需要注意的是，ES6 对这个属性的行为做出了一些修改。如果将一个匿名函数赋值给一个变量，ES5 的 name 属性，会返回空字符串，而 ES6 的 name 属性会返回实际的函数名。

```js
var f = function() {};

// ES5
f.name; // ""

// ES6
f.name; // "f"
```

如果将一个具名函数赋值给一个变量，则 ES5 和 ES6 的 name 属性都返回这个具名函数原本的名字。

```js
const bar = function baz() {};

// ES5
bar.name; // "baz"

// ES6
bar.name; // "baz"
```

Function 构造函数返回的函数实例，name 属性的值为 anonymous。

`(new Function).name // "anonymous"`

bind 返回的函数，name 属性值会加上 bound 前缀。

```js
function foo() {}
foo.bind({}).name; // "bound foo"

(function() {}.bind({}).name); // "bound "
```

## 5.箭头函数

### 5.1.基本用法

ES6 允许使用“箭头”（`=>`）定义函数。如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。

```js
var f = v => v;

// 等同于
var f = function(v) {
  return v;
};

var f = () => 5;
```

如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用 return 语句返回。

`var sum = (num1, num2) => { return num1 + num2; }`

由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。

```js
// 报错
let getTempItem = id => { id: id, name: "Temp" };

// 不报错
let getTempItem = id => ({ id: id, name: "Temp" });
```

如果箭头函数只有一行语句，且不需要返回值，可以采用下面的写法，就不用写大括号了。

`let fn = () => void doesNotReturn();`

箭头函数可以与变量解构结合使用。

```js
const full = ({ first, last }) => first + " " + last;

// 等同于
function full(person) {
  return person.first + " " + person.last;
}
```

箭头函数的一个用处是简化回调函数。

```js
// 正常函数写法
[1, 2, 3].map(function(x) {
  return x * x;
});

// 箭头函数写法
[1, 2, 3].map(x => x * x);
```

### 5.2.使用注意点

箭头函数有几个使用注意点。

（1）函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。

（2）不可以当作构造函数，也就是说，不可以使用 new 命令，否则会抛出一个错误。

（3）不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

（4）不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。

this 指向的固定化，并不是因为箭头函数内部有绑定 this 的机制，实际原因是箭头函数根本没有自己的 this，导致内部的 this 就是外层代码块的 this。正是因为它没有 this，所以也就不能用作构造函数。

除了 this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target。

```js
function foo() {
  setTimeout(() => {
    console.log("args:", arguments);
  }, 100);
}

foo(2, 4, 6, 8);
// args: [2, 4, 6, 8]
```

### 5.3.不适用场合

由于箭头函数使得 this 从“动态”变成“静态”，下面两个场合不应该使用箭头函数。

第一个场合是定义对象的方法，且该方法内部包括 this。

```js
const cat = {
  lives: 9,
  jumps: () => {
    this.lives--;
  }
};
```

第二个场合是需要动态 this 的时候，也不应使用箭头函数。

```js
var button = document.getElementById("press");
button.addEventListener("click", () => {
  this.classList.toggle("on");
});
```

另外，如果函数体很复杂，有许多行，或者函数内部有大量的读写操作，不单纯是为了计算值，这时也不应该使用箭头函数，而是要使用普通函数，这样可以提高代码可读性。

### 5.4.嵌套的箭头函数

```js
// ES5
function insert(value) {
  return {
    into: function(array) {
      return {
        after: function(afterValue) {
          array.splice(array.indexOf(afterValue) + 1, 0, value);
          return array;
        }
      };
    }
  };
}

insert(2)
  .into([1, 3])
  .after(1); //[1, 2, 3]

// ES6
let insert = value => ({
  into: array => ({
    after: afterValue => {
      array.splice(array.indexOf(afterValue) + 1, 0, value);
      return array;
    }
  })
});

insert(2)
  .into([1, 3])
  .after(1); //[1, 2, 3]
```

## 6.尾调用优化

### 6.1.尾调用优化

**尾调用**（Tail Call）是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚，就是指某个函数的 _最后一步_ 是 _调用另一个函数_。

```js
function f(x) {
  return g(x);
}
```

尾调用不一定出现在函数尾部，只要是最后一步操作即可。

```js
function f(x) {
  if (x > 0) {
    return m(x);
  }
  return n(x);
}
```

### 6.2.尾调用优化

尾调用之所以与其他调用不同，就在于它的特殊的调用位置。

我们知道，函数调用会在内存形成一个“调用记录”，又称“**调用帧**”（call frame），保存调用位置和内部变量等信息。如果在函数 A 的内部调用函数 B，那么在 A 的调用帧上方，还会形成一个 B 的调用帧。等到 B 运行结束，将结果返回到 A，B 的调用帧才会消失。如果函数 B 内部还调用函数 C，那就还有一个 C 的调用帧，以此类推。所有的调用帧，就形成一个“**调用栈**”（call stack）。

尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。

```js
function f() {
  let m = 1;
  let n = 2;
  return g(m + n);
}
f();

// 等同于
function f() {
  return g(3);
}
f();

// 等同于
g(3);
```

如果函数 g 不是尾调用，函数 f 就需要保存内部变量 m 和 n 的值、g 的调用位置等信息。但由于调用 g 之后，函数 f 就结束了，所以执行到最后一步，完全可以删除 f(x)的调用帧，只保留 g(3)的调用帧。

这就叫做“**尾调用优化**”（Tail call optimization），即只保留内层函数的调用帧。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。这就是“尾调用优化”的意义。

注意，只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行“尾调用优化”。

```js
function addOne(a) {
  var one = 1;
  function inner(b) {
    return b + one;
  }
  return inner(a);
}
```

上面的函数不会进行尾调用优化，因为内层函数 inner 用到了外层函数 addOne 的内部变量 one。

### 6.3.尾递归

函数调用自身，称为递归。如果尾调用自身，就称为尾递归。

递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“**栈溢出**”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。

```js
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

factorial(5); // 120
```

如果改写成尾递归，只保留一个调用记录，复杂度 O(1) 。

```js
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

factorial(5, 1); // 120
```

尾递归优化过的 Fibonacci 数列实现如下。

```js
function Fibonacci2(n, ac1 = 1, ac2 = 1) {
  if (n <= 1) {
    return ac2;
  }

  return Fibonacci2(n - 1, ac2, ac1 + ac2);
}

Fibonacci2(1000); // 7.0330367711422765e+208
Fibonacci2(10000); // RangeError: Maximum call stack size exceeded

// test 开销太大
function factorial(n) {
  if (n === 1) return 1;
  if (n === 2) return 1;
  return factorial(n - 1) + factorial(n - 2);
}
```

由此可见，“尾调用优化”对递归操作意义重大，所以一些函数式编程语言将其写入了语言规格。ES6 亦是如此，第一次明确规定，所有 ECMAScript 的实现，都必须部署“尾调用优化”。这就是说，ES6 中只要使用尾递归，就不会发生栈溢出（或者层层递归造成的超时），相对节省内存。

### 6.4.严格模式

ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。

这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。

- `func.arguments`：返回调用时函数的参数。
- `func.caller`：返回调用当前函数的那个函数。

尾调用优化发生时，函数的调用栈会改写，因此上面两个变量就会失真。严格模式禁用这两个变量，所以尾调用模式仅在严格模式下生效。

```js
function restricted() {
  "use strict";
  restricted.caller; // 报错
  restricted.arguments; // 报错
}
restricted();
```

### 6.5.尾递归优化的实现

尾递归优化只在严格模式下生效，那么正常模式下，或者那些不支持该功能的环境中，有没有办法也使用尾递归优化呢？回答是可以的，就是自己实现尾递归优化。

它的原理非常简单。尾递归之所以需要优化，原因是调用栈太多，造成溢出，那么只要减少调用栈，就不会溢出。怎么做可以减少调用栈呢？就是采用“循环”换掉“递归”。

蹦床函数（trampoline）可以将递归执行转为循环执行。

```js
function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}

function sum(x, y) {
  if (y > 0) {
    return sum.bind(null, x + 1, y - 1);
  } else {
    return x;
  }
}

trampoline(sum(1, 100000));
```

蹦床函数并不是真正的尾递归优化，下面的实现才是。

```js
function tco(f) {
  var value;
  var active = false;
  var accumulated = [];

  return function accumulator() {
    accumulated.push(arguments);
    if (!active) {
      active = true;
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift());
      }
      active = false;
      return value;
    }
  };
}

var sum = tco(function(x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1);
  } else {
    return x;
  }
});

sum(1, 100000);
// 100001
```

## 7.函数参数的尾逗号

ES2017 允许函数的最后一个参数有尾逗号（trailing comma）。此前，函数定义和调用时，都不允许最后一个参数后面出现逗号。

```js
function clownsEverywhere(param1, param2) {
  /* ... */
}

clownsEverywhere("foo", "bar");
```

如果像上面这样，将参数写成多行（即每个参数占据一行），以后修改代码的时候，想为函数 clownsEverywhere 添加第三个参数，或者调整参数的次序，就势必要在原来最后一个参数后面添加一个逗号。这对于版本管理系统来说，就会显示添加逗号的那一行也发生了变动。这看上去有点冗余，因此新的语法允许定义和调用时，尾部直接有一个逗号。

```
function clownsEverywhere(param1, param2,) {
  /* ... */
}

clownsEverywhere("foo", "bar",);
```

这样的规定也使得，函数参数与数组和对象的尾逗号规则，保持一致了。
