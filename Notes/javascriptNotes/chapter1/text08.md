#### 10.参数

##### 10.1 概述

函数运行的时候，有时需要提供外部数据，不同的外部数据会得到不同的结果，这种外部数据就叫参数。

javascript 函数是参数化的：函数的定义会包括一个被称为**形参（parameter）**的标识符列表，这些参数在函数体中像局部变量一样工作。

函数调用会为形参提供实参的值。除了实参外，每次调用还会拥有另一个值--本次调用的上下文 ——— 这就是 `this` 关键字的值。

如果函数挂载在一个对象上，作为对象的一个属性，就称它为对象的方法。当通过对象来调用函数时，该对象就是此次调用的**上下文（context）**。

用于初始化一个新创建的对象的函数称为**构造函数（constructor）**。

> 在 JavaScript 里，函数即对象，程序可以随意操控它们。

##### 10.2 参数的省略

函数参数不是必需的，Javascript 允许省略参数。

但是运行时无论提供多少个参数（或者不提供参数），JavaScript 都不会报错。省略的参数的值就变为 `undefined`。

但是，没有办法只省略靠前的参数，而保留靠后的参数。如果一定要省略靠前的参数，只有显式传入 `undefined`。

##### 10.3 传递方式

函数参数如果是原始类型的值（数值、字符串、布尔值），传递方式是**传值传递（passes by value）**。这意味着，在函数体内修改参数值，不会影响到函数外部。

但是，如果函数参数是复合类型的值（数组、对象、其他函数），传递方式是**传址传递（pass by reference）**。也就是说，传入函数的原始值的地址，因此在函数内部修改参数，将会影响到原始值。

实际上应用的策略是 `call by sharing`，通俗的说就是，它并不是把引用直接传递进去，而是把引用的拷贝（浅拷贝）传递进去存储在函数内部的活动对象里。因此，如果你对这个引用进行第二次赋值的时候，实际上把这份引用指向了另外一个对象，所以之后对这个对象的操作不会影响到外部的对象。

> 注意，如果函数内部修改的，不是参数对象的某个属性，而是替换掉整个参数(改变了引用地址)，这时不会影响到原始值。

##### 10.4 同名参数

如果有同名的参数，则取最后出现的那个值。

```javascript
function f(a, a) {
  console.log(a);
}

f(1, 2); // 2
f(1); //undefined
```

#### 11.`arguments`对象

##### 11.1.定义

ECMAScript 函数不限制传递参数的个数和类型。因为参数在函数内部是用一个数组来表示的。函数始终接收的都是这个数组。

在函数体内可以通过 `arguments` 对象来访问这个参数数组，从而获取传递给函数的每一个参数（所以可以不写形参）。这个对象只有在函数体内部，才可以使用。

ECMAScript 函数的重要特点：

---

- 1).形参只提供便利，不是必须的；
- 2).`arguments` 对象可以与形参一起使用；
- 3).`arguments` 的值永远与对应形参的值保持同步（他们是值同步的，但空间独立）；
- 4).`arguments` 对象的长度由传入参数的长度来决定（跟定义函数的命名参数的个数 `length` 无关）；
- 5).没有传递值的形参将自动被赋予 `undefined`；

---

> 正常模式下，`arguments` 对象可以在运行时修改。严格模式：重写 `arguments` 会导致语法错误（不执行）；对 `arguments` 元素赋值无效。

##### 11.2 类数组

与数组类似（但并不是 `Array` 的实例），因此可以使用方括号语法访问它的任意元素，使用 `length` 属性来确定传递进来多少个参数。

如果要让 `arguments` 对象使用数组方法，真正的解决方法是将 `arguments` 转为真正的数组。下面是两种常用的转换方法：`slice` 方法和逐一填入新数组。

```javascript
var args = Array.prototype.slice.call(arguments);

// 或者
var args = [];
for (var i = 0; i < arguments.length; i++) {
  args.push(arguments[i]);
}
```

##### 11.3 `callee` 属性

`arguments` 对象带有一个 `callee` 属性，返回它所对应的原函数。

```javascript
var f = function() {
  console.log(arguments.callee === f);
};

f(); // true
```

可以通过 `arguments.callee`，达到调用函数自身的目的。这个属性在严格模式里面是禁用的，因此不建议使用。

##### 11.4 `caller`

指向调用当前函数的函数(即只有在函数被调用时才能取到值)

```javascript
function f1() {
  console.log(f1.caller); //指向调用该函数的函数
  console.log(arguments.callee); //指向该函数本身
}

function f2() {
  f1();
}
f2();
```

#### 12.没有重载

ECMAScript 函数没有**签名**（接收的参数的类型和数量），因为其参数是由包含 0 或多个值的数组来表示的。而没有函数签名，真正的重载是不可能做到的。

#### 13.闭包

理解**闭包（closure）**，首先必须理解变量作用域。JavaScript 有两种作用域：全局作用域和函数作用域。函数内部可以直接读取全局变量。但是，函数外部无法读取函数内部声明的变量。

如果出于种种原因，需要得到函数内的局部变量。正常情况下，这是办不到的，只有通过变通方法才能实现。那就是在函数的内部，再定义一个函数。

```javascript
function f1() {
  var n = 999;
  function f2() {
    console.log(n); // 999
  }
}
```

上面代码中，函数 f2 就在函数 f1 内部，这时 f1 内部的所有局部变量，对 f2 都是可见的。但是反过来就不行，f2 内部的局部变量，对 f1 就是不可见的。这就是 JavaScript 语言特有的**链式作用域（chain scope）**结构，子对象会一级一级地向上寻找所有父对象的变量。所以，父对象的所有变量，对子对象都是可见的，反之则不成立。

既然 f2 可以读取 f1 的局部变量，那么只要把 f2 作为返回值，我们不就可以在 f1 外部读取它的内部变量了吗！

```javascript
function f1() {
  var n = 999;
  function f2() {
    console.log(n);
  }
  return f2;
}

var result = f1();
result(); // 999
```

闭包就是函数 f2，即**能够读取其他函数内部变量的函数**。由于在 JavaScript 语言中，只有函数内部的子函数才能读取内部变量，因此可以把闭包简单理解成“定义在一个函数内部的函数”。

闭包最大的特点，就是它可以“记住”诞生的环境，比如 f2 记住了它诞生的环境 f1，所以从 f2 可以得到 f1 的内部变量。**在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁**。

闭包的最大用处有两个，一个是可以读取函数内部的变量，另一个就是让这些变量始终保持在内存中，即闭包可以使得它诞生环境一直存在。请看下面的例子，闭包使得内部变量记住上一次调用时的运算结果。

```javascript
function createIncrementor(start) {
  return function() {
    return start++;
  };
}

var inc = createIncrementor(5);

inc(); // 5
inc(); // 6
inc(); // 7
```

上面代码中，start 是函数 createIncrementor 的内部变量。通过闭包，start 的状态被保留了，每一次调用都是在上一次调用的基础上进行计算。从中可以看到，闭包 inc 使得函数 createIncrementor 的内部环境，一直存在。所以，**闭包可以看作是函数内部作用域的一个接口**。

为什么会这样呢？原因就在于 inc 始终在内存中，而 inc 的存在依赖于 createIncrementor，因此也始终在内存中，不会在调用结束后，被垃圾回收机制回收。

闭包的另一个用处，是封装对象的私有属性和私有方法。

```javascript
function Person(name) {
  var _age;
  function setAge(n) {
    _age = n;
  }
  function getAge() {
    return _age;
  }

  return {
    name: name,
    getAge: getAge,
    setAge: setAge
  };
}

var p1 = Person("mark");
p1.setAge(25);
p1.getAge(); // 25
```

注意，外层函数每次运行，都会生成一个新的闭包，而这个闭包又会保留外层函数的内部变量，所以内存消耗很大。因此不能滥用闭包，否则会造成网页的性能问题。

#### 14.立即调用的函数表达式（IIFE）

在 Javascript 中，圆括号 `()` 是一种运算符，跟在函数名之后，表示调用该函数。

有时，我们需要在定义函数之后，立即调用该函数。这时，你不能在函数的定义之后加上圆括号，这会产生语法错误。

产生这个错误的原因是，`function` 这个关键字即可以当作语句，也可以当作表达式。

为了避免解析上的歧义，JavaScript 引擎规定，如果 `function` 关键字出现在行首，一律解释成语句。因此，JavaScript 引擎看到行首是 `function` 关键字之后，认为这一段都是函数的定义，不应该以圆括号结尾，所以就报错了。

解决方法就是不要让 `function` 出现在行首，让引擎将其理解成一个表达式。最简单的处理，就是将其放在一个圆括号里面。

```javascript
(function() {
  /* code */
})();
// 或者
(function() {
  /* code */
})();
```

上面两种写法都是以圆括号开头，引擎就会认为后面跟的是一个表示式，而不是函数定义语句，所以就避免了错误。这就叫做**立即调用的函数表达式（Immediately-Invoked Function Expression）**，简称 IIFE。

> 注意，上面两种写法最后的分号都是必须的。如果省略分号，遇到连着两个 IIFE，可能就会报错(JavaScript 会将它们连在一起解释，将第二行解释为第一行的参数。)。

推而广之，任何让解释器以表达式来处理函数定义的方法，都能产生同样的效果，比如下面三种写法。

```javascript
var i = (function() {
  return 10;
})();
true &&
  (function() {
    /* code */
  })();
0,
  (function() {
    /* code */
  })();
```

通常情况下，只对匿名函数使用这种“立即执行的函数表达式”。它的目的有两个：

- 一是不必为函数命名，避免了污染全局变量；
- 二是 IIFE 内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量。

```javascript
// 写法一
var tmp = newData;
processData(tmp);
storeData(tmp);

// 写法二
(function() {
  var tmp = newData;
  processData(tmp);
  storeData(tmp);
})();
```

上面代码中，写法二比写法一更好，因为完全避免了污染全局变量。

#### 15.`eval`

`eval` 命令的作用是，将字符串当作语句执行。

放在 `eval` 中的字符串，应该有独自存在的意义，不能用来与 `eval` 以外的命令配合使用。

`eval` 没有自己的作用域，都在当前作用域内执行，因此可能会修改当前作用域的变量的值，造成安全问题。

为了防止这种风险，JavaScript 规定，如果使用严格模式，`eval` 内部声明的变量，不会影响到外部作用域。

```javascript
(function f() {
  "use strict";
  eval("var foo = 123");
  console.log(foo); // ReferenceError: foo is not defined
})();
```

不过，即使在严格模式下，`eval` 依然可以读写当前作用域的变量。

```javascript
(function f() {
  "use strict";
  var foo = 1;
  eval("foo = 2");
  console.log(foo); // 2
})();
```

上面代码中，严格模式下，`eval` 内部还是改写了外部变量，可见安全风险依然存在。

此外，`eval` 的命令字符串不会得到 JavaScript 引擎的优化，运行速度较慢。这也是一个不应该使用它的理由。

> 通常情况下，`eval` 最常见的场合是解析 `JSON` 数据字符串，不过正确的做法应该是使用浏览器提供的 `JSON.parse` 方法。

JavaScript 引擎内部，`eval` 实际上是一个引用，默认调用一个内部方法。这使得 `eval` 的使用分成两种情况，一种是像上面这样的调用 `eval(expression)`，这叫做“直接使用”，这种情况下 `eval` 的作用域就是当前作用域。除此之外的调用方法，都叫“间接调用”，此时 `eval` 的作用域总是全局作用域。

```javascript
var a = 1;

function f() {
  var a = 2;
  var e = eval;
  e("console.log(a)");
}

f(); // 1
```

上面代码中，`eval` 是间接调用，所以即使它是在函数中，它的作用域还是全局作用域，因此输出的 a 为全局变量。

与 `eval` 作用类似的还有 `Function` 构造函数。利用它生成一个函数，然后调用该函数，也能将字符串当作命令执行。

```javascript
var jsonp = 'foo({"id": 42})';

var f = new Function("foo", jsonp);
// 相当于定义了如下函数
// function f(foo) {
//   foo({"id":42});
// }

f(function(json) {
  console.log(json.id); // 42
});
```

上面代码中，jsonp 是一个字符串，`Function` 构造函数将这个字符串，变成了函数体。调用该函数的时候，jsonp 就会执行。这种写法的实质是将代码放到函数作用域执行，避免对全局作用域造成影响。

不过，`new Function()` 的写法也可以读写全局作用域，所以也是应该避免使用它。
