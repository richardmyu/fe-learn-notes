# 面向对象编程

[TOC]

## 1.构造函数与 `new` 命令

JavaScript 语言具有很强的面向对象编程能力。

### 1.1.对象是什么

**面向对象编程**（Object Oriented Programming，缩写为 OOP）是目前主流的编程范式。它将真实世界各种复杂的关系，抽象为一个个对象，然后由对象之间的分工与合作，完成对真实世界的模拟。

每一个对象都是功能中心，具有明确分工，可以完成接受信息、处理数据、发出信息等任务。对象可以复用，通过继承机制还可以定制。因此，面向对象编程具有灵活、代码可复用、高度模块化等特点，容易维护和开发，比起由一系列函数或指令组成的传统的**过程式编程**（procedural programming），更适合多人合作的大型软件项目。

对象是单个实物的抽象；对象是一个容器，封装了**属性**（property）和**方法**（method）。

> **属性是对象的状态，方法是对象的行为**。

### 1.2.构造函数

面向对象编程的第一步，就是要生成对象。通常需要一个模板，表示某一类实物的共同特征，然后对象根据这个模板生成。

典型的面向对象编程语言（比如 C++ 和 Java），都有**类**（class）这个概念。所谓“类”就是对象的模板，对象就是“类”的实例。但是，JavaScript 语言的对象体系，不是基于“类”的，而是基于**构造函数**（constructor）和**原型**（prototype）。

JavaScript 语言使用构造函数作为对象的模板。所谓”构造函数”，就是专门用来生成实例对象的函数。它就是对象的模板，描述实例对象的基本结构。一个构造函数，可以生成多个实例对象，这些实例对象都有相同的结构。

构造函数就是一个普通的函数，但是有自己的特征和用法。为了与普通函数区别，构造函数名字的第一个字母通常大写(这是规范要求，不是实际区分普通函数和构造函数的关键点)。

构造函数的特点（区分的关键点）有两个。

- 函数体内部使用了 `this` 关键字，代表了所要生成的对象实例。
- 生成对象的时候，必须使用 `new` 命令。

### 1.3.`new` 命令

#### 1.3.1.基本用法

`new` 命令的作用，就是执行构造函数，返回一个实例对象。

```javascript
var Vehicle = function() {
  this.price = 1000;
};

var v = new Vehicle();
v; // Vehicle {price: 1000}
v.price; // 1000
```

使用 `new` 命令时，根据需要，构造函数也可以接受参数。

```javascript
var Vehicle = function(num) {
  this.price = num;
};

var v = new Vehicle(500);
v.price; //500
```

`new` 命令本身就可以执行构造函数，所以后面的构造函数可以带括号，也可以不带括号。

```js
// 推荐的写法
var v = new Vehicle();
// 不推荐的写法
var v = new Vehicle();
```

一个很自然的问题是，如果忘了使用 `new` 命令，直接调用构造函数会发生什么事？

这种情况下，构造函数就变成了普通函数，并不会生成实例对象。如果函数在全局下定义，那么 `this` 这时代表全局对象。

```javascript
var Vehicle = function() {
  this.price = 1000;
};

var v = Vehicle();
console.log(v); // undefined
console.log(v.price); // TypeError
console.log(price); // 1000
```

因此，应该非常小心，避免不使用 `new` 命令、直接调用构造函数。

为了保证构造函数必须与 `new` 命令一起使用，一个解决办法是，构造函数内部使用严格模式，即第一行加上 `use strict`。这样的话，一旦忘了使用 `new` 命令，直接调用构造函数就会报错。

```javascript
function Fubar(foo, bar) {
  "use strict";
  this._foo = foo;
  this._bar = bar;
}

Fubar();
// TypeError: Cannot set property '_foo' of undefined
```

这是因为在严格模式中，函数内部的 `this` 不能指向全局对象，默认等于 `undefined`（而 JavaScript 不允许对 `undefined` 或 `null` 添加属性），导致不加 `new` 调用会报错。

另一个解决办法，构造函数内部判断是否使用 `new` 命令，如果发现没有使用，则直接返回一个实例对象。

```javascript
function Fubar(foo, bar) {
  if (!(this instanceof Fubar)) {
    return new Fubar(foo, bar);
  }

  this.foo = foo;
  this.bar = bar;
}

Fubar(1, 2);
//Fubar {foo: 1, bar: 2}

new Fubar(1, 2);
//Fubar {foo: 1, bar: 2}

Fubar(1, 2).foo; //1

new Fubar(1, 2).foo; //1
```

#### 1.3.2.`new` 命令的原理

使用 `new` 命令时，它后面的函数依次执行下面的步骤（<a href="./demo/new.html" target="_blank">demo</a>）。

---

- a.创建一个空对象，作为将要返回的对象实例。
- b.将这个空对象的原型，指向构造函数的 `prototype` 属性。
- c.将这个空对象赋值给函数内部的 `this` 关键字。
- d.开始执行构造函数内部的代码。

---

也就是说，构造函数内部，`this` 指的是一个新生成的空对象，所有针对 `this` 的操作，都会发生在这个空对象上。构造函数之所以叫“构造函数”，就是说这个函数的目的，就是操作一个空对象（即 `this` 对象），将其“构造”为需要的样子。默认返回 `this` 对象。

`new` 命令简化的内部流程，可以用下面的代码表示。

```javascript
// ES5
function _new(constructor, params) {
  var args = [].slice.call(arguments);
  var constructor = args.shift();
  var context = Object.create(constructor.prototype);
  var result = constructor.apply(context, args);
  return typeof result === "object" && result != null ? result : context;
}

// ES6
function _new(constructor, ...params) {
  let context = Object.create(constructor.prototype);
  let result = constructor.apply(context, params);
  return typeof result === "object" && result != null ? result : context;
}
```

如果构造函数内部有 `return` 语句，而且 `return` 后面跟着一个对象，`new` 命令则会返回 `return` 语句指定的对象；否则，就会不管 `return` 语句，返回 `this` 对象。

```javascript
var Vehicle = function() {
  this.price = 1000;
  return 1000;
};

new Vehicle() === 1000;
// false
```

但是，如果 `return` 语句返回的是一个跟 `this` 无关的新对象，`new` 命令会返回这个新对象，而不是 `this` 对象。这一点需要特别引起注意。

```javascript
var Vehicle = function() {
  this.price = 1000;
  return { price: 2000 };
};

new Vehicle().price;
// 2000
```

另一方面，如果对普通函数（内部没有 `this` 关键字的函数）使用 `new` 命令，则会返回一个空对象或指定对象（不论有没有 `return` 语句）。

```javascript
// 有明确的返回值
function getMessage() {
  return "this is a message";
}

var msg = new getMessage();

msg; // {}
typeof msg; // "object"

// 没有返回值
function getMessages() {
  let a = 100;
}

var msgs = new getMessages();

console.log(msgs); // {}
console.log(typeof msgs); // "object"
```

> 因为 `new` 命令总是返回一个对象，要么是实例对象，要么是 `return` 语句指定的对象。

#### 1.3.3.`new.target`

函数内部可以使用 `new.target` 属性。如果当前函数是 `new` 命令调用，`new.target` 指向当前函数，否则为 `undefined`。但注意，不能直接使用 `new`。

```javascript
function f() {
  // console.log(new); // SyntaxError: Unexpected token )
  console.log(new.target);
  console.log(new.target === f);
}

f(); // undefined  false
new f(); // f(){...}  true
```

使用这个属性，可以判断 函数调用的时候，是否使用 `new` 命令。

```javascript
function f() {
  if (!new.target) {
    throw new Error("请使用 new 命令调用！");
  }
  // ...
}

f(); // Uncaught Error: 请使用 new 命令调用！
```
