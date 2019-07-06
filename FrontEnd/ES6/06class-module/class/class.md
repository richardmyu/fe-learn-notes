# Class 的基本语法

## 1.简介

### 1.1.类的由来

JavaScript 语言中，生成实例对象的传统方法是通过构造函数。

```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function() {
  return "(" + this.x + ", " + this.y + ")";
};

var p = new Point(1, 2);
```

ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过 class 关键字，可以定义类。

基本上，ES6 的 class 可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的 class 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。上面的代码用 ES6 的 class 改写，就是下面这样。使用的时候，也是直接对类使用 new 命令，跟构造函数的用法完全一致。

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return "(" + this.x + ", " + this.y + ")";
  }
}

typeof Point; // "function"
Point === Point.prototype.constructor; // true

var b = new Bar();
b.doStuff(); // "stuff"
```

构造函数的 prototype 属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的 prototype 属性上面。

```js
class Point {
  constructor() {},
  toString() {},
  toValue() {},
}

// 等同于

Point.prototype = {
  constructor() {}
  toString() {}
  toValue() {}
};
```

由于类的方法都定义在 prototype 对象上面，所以类的新方法可以添加在 prototype 对象上面。Object.assign 方法可以很方便地一次向类添加多个方法。

```js
class Point {
  constructor() {
    // ...
  }
}

Object.assign(Point.prototype, {
  toString() {},
  toValue() {}
});
```

prototype 对象的 constructor 属性，直接指向“类”的本身，这与 ES5 的行为是一致的。

`Point.prototype.constructor === Point // true`

另外，类的内部所有定义的方法，都是不可枚举的（non-enumerable）。这一点与 ES5 的行为不一致。

```js
class Point {
  constructor() {}
  toString() {}
}
Object.keys(Point.prototype);
// []
Object.getOwnPropertyNames(Point.prototype);
// ["constructor","toString"]

// ES5
var Point = function(x, y) {};
Point.prototype.toString = function() {};
Object.keys(Point.prototype);
// ["toString"]
Object.getOwnPropertyNames(Point.prototype);
// ["constructor","toString"]
```

### 1.2.constructor 方法

constructor 方法是类的默认方法，通过 new 命令生成对象实例时，自动调用该方法。一个类必须有 constructor 方法，如果没有显式定义，一个空的 constructor 方法会被默认添加。

```js
class Point {}

// 等同于
class Point {
  constructor() {}
}
```

constructor 方法默认返回实例对象（即 this），完全可以指定返回另外一个对象。

```js
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo;
// false
```

类必须使用 new 调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用 new 也可以执行。

```js
class Foo {
  constructor() {
    return Object.create(null);
  }
}

Foo();
// TypeError: Class constructor Foo cannot be invoked without 'new'
```

### 1.3.类的实例

与 ES5 一样，实例的属性除非显式定义在其本身（即定义在 this 对象上），否则都是定义在原型上（即定义在 class 上）。类的所有实例共享一个原型对象。

```js
//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return "(" + this.x + ", " + this.y + ")";
  }
}

var point = new Point(2, 3);

point.toString(); // (2, 3)

point.hasOwnProperty("x"); // true
point.hasOwnProperty("y"); // true
point.hasOwnProperty("toString"); // false
Object.getPrototypeOf(point).hasOwnProperty("toString"); // true
```

### 1.4.取值函数（getter）和存值函数（setter）

与 ES5 一样，在“类”的内部可以使用 get 和 set 关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

```js
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return "getter";
  }
  set prop(value) {
    console.log("setter: " + value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop;
// 'getter'
```

存值函数和取值函数是设置在属性的 Descriptor 对象上的。这与 ES5 完全一致。

```js
class CustomHTMLElement {
  constructor(element) {
    this.element = element;
  }

  get html() {
    return this.element.innerHTML;
  }

  set html(value) {
    this.element.innerHTML = value;
  }
}

var descriptor = Object.getOwnPropertyDescriptor(
  CustomHTMLElement.prototype,
  "html"
);

"get" in descriptor; // true
"set" in descriptor; // true
```

### 1.5.属性表达式

类的属性名，可以采用表达式。

```js
let methodName = "getArea";

class Square {
  constructor() {}

  [methodName]() {}
}
```

### 1.6.Class 表达式

与函数一样，类也可以使用表达式的形式定义。

```js
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
```

需要注意的是，这个类的名字是 Me，但是 Me 只在 Class 的内部可用，指代当前类，如果类的内部没用到的话，可以省略 Me。在 Class 外部，这个类只能用 MyClass 引用。

### 1.7.注意点

（1）严格模式

类和模块的内部，默认就是严格模式，所以不需要使用 `use strict` 指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。

（2）不存在提升

类不存在变量提升（hoist），这一点与 ES5 完全不同。

（3）name 属性

由于本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被 Class 继承，包括 name 属性。

```js
class Point {}
Point.name; // "Point"
```

name 属性总是返回紧跟在 class 关键字后面的类名。

（4）Generator 方法

如果某个方法之前加上星号（`*`），就表示该方法是一个 Generator 函数。

```js
class Foo {
  // ...args 是解构赋值
  constructor(...args) {
    this.args = args;
  }
  *[Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg;
    }
  }
}

for (let x of new Foo("hello", "world")) {
  console.log(x);
}
// hello
// world
```

（5）this 的指向

类的方法内部如果含有 this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。

```js
class Logger {
  printName(name = "there") {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
```

printName 方法中的 this，默认指向 Logger 类的实例。但是，如果将这个方法提取出来单独使用，this 会指向该方法运行时所在的环境（由于 class 内部是严格模式，所以 this 实际指向的是 undefined），从而导致找不到 print 方法而报错。

一个比较简单的解决方法是，在构造方法中绑定 this，这样就不会找不到 print 方法了。

```js
class Logger {
  constructor() {
    this.printName = this.printName.bind(this);
  }

  // ...
}
```

另一种解决方法是使用箭头函数。箭头函数内部的 this 总是指向定义时所在的对象。上面代码中，箭头函数位于构造函数内部，它的定义生效的时候，是在构造函数执行的时候。这时，箭头函数所在的运行环境，肯定是实例对象，所以 this 会总是指向实例对象。

```js
class Obj {
  constructor() {
    this.getThis = () => this;
  }
}

const myObj = new Obj();
myObj.getThis() === myObj; // true
```

还有一种解决方法是使用 Proxy，获取方法的时候，自动绑定 this。

```js
function selfish(target) {
  const cache = new WeakMap();
  const handler = {
    get(target, key) {
      const value = Reflect.get(target, key);
      if (typeof value !== "function") {
        return value;
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(target));
      }
      return cache.get(value);
    }
  };
  const proxy = new Proxy(target, handler);
  return proxy;
}

const logger = selfish(new Logger());
```

## 2.静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上 `static` 关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

```js
class Foo {
  static classMethod() {
    return "hello";
  }
}

Foo.classMethod(); // 'hello'

var foo = new Foo();
foo.classMethod();
// TypeError: foo.classMethod is not a function
```

注意，如果静态方法包含 this 关键字，这个 this 指的是类，而不是实例。

```js
class Foo {
  static bar() {
    this.baz();
  }
  static baz() {
    console.log("hello");
  }
  baz() {
    console.log("world");
  }
}

Foo.bar(); // hello
```

父类的静态方法，可以被子类继承。

```js
class Foo {
  static classMethod() {
    return "hello";
  }
}

class Bar extends Foo {}

Bar.classMethod(); // 'hello'
```

静态方法也是可以从 super 对象上调用的。

```js
class Foo {
  static classMethod() {
    return "hello";
  }
}

class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ", too";
  }
}

Bar.classMethod(); // "hello, too"
```

## 3.实例属性的新写法

实例属性除了定义在 `constructor()` 方法里面的 this 上面，也可以定义在类的最顶层。

```js
class IncreasingCounter {
  constructor() {
    this._count = 0;
  }
  get value() {
    console.log("Getting the current value!");
    return this._count;
  }
  increment() {
    this._count++;
  }
}
```

另一种写法是，这个属性也可以定义在类的最顶层，其他都不变。

```js
class IncreasingCounter {
  _count = 0;
  get value() {
    console.log("Getting the current value!");
    return this._count;
  }
  increment() {
    this._count++;
  }
}
```

这种新写法的好处是，所有实例对象自身的属性都定义在类的头部，看上去比较整齐，一眼就能看出这个类有哪些实例属性。

```js
class foo {
  bar = "hello";
  baz = "world";

  constructor() {
    // ...
  }
}
```

## 4.静态属性

静态属性指的是 Class 本身的属性。

```js
class Foo {}

Foo.prop = 1;
Foo.prop; // 1
```

目前，只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。现在有一个提案提供了类的静态属性，写法是在实例属性法的前面，加上 static 关键字。

```js
class MyClass {
  static myStaticProp = 42;

  constructor() {
    console.log(MyClass.myStaticProp); // 42
  }
}
```

这个新写法大大方便了静态属性的表达。

```js
// 老写法
class Foo {
  // ...
}
Foo.prop = 1;

// 新写法
class Foo {
  static prop = 1;
}
```

## 5.私有方法和私有属性

### 5.1.现有的解决方案

私有方法和私有属性，是只能在类的内部访问的方法和属性，外部不能访问。这是常见需求，有利于代码的封装，但 ES6 不提供，只能通过变通方法模拟实现。

一种做法是在命名上加以区别。但是，这种命名是不保险的，在类的外部，还是可以调用到这个方法。

```js
class Widget {
  // 公有方法
  foo(baz) {
    this._bar(baz);
  }

  // 私有方法
  _bar(baz) {
    return (this.snaf = baz);
  }

  // ...
}
```

另一种方法就是索性将私有方法移出模块，因为模块内部的所有方法都是对外可见的。

```js
class Widget {
  foo(baz) {
    bar.call(this, baz);
  }

  // ...
}

function bar(baz) {
  return (this.snaf = baz);
}
```

还有一种方法是利用 Symbol 值的唯一性，将私有方法的名字命名为一个 Symbol 值。一般情况下无法获取到它们，因此达到了私有方法和私有属性的效果。但是也不是绝对不行，`Reflect.ownKeys()` 依然可以拿到它们。

```js
const bar = Symbol("bar");
const snaf = Symbol("snaf");

export default class myClass {
  // 公有方法
  foo(baz) {
    this[bar](baz);
  }

  // 私有方法
  [bar](baz) {
    return (this[snaf] = baz);
  }

  // ...
}
```

### 5.2.私有属性的提案

目前，有一个提案，为 class 加了私有属性。方法是在属性名之前，使用 `#` 表示。只能在类的内部使用（`this.#count`）。如果在类的外部使用，就会报错。

```js
class IncreasingCounter {
  #count = 0;
  get value() {
    console.log("Getting the current value!");
    return this.#count;
  }
  increment() {
    this.#count++;
  }
}
const counter = new IncreasingCounter();
counter.#count;
// SyntaxError: Undefined private field undefined: must be declared in an enclosing class
```

之所以要引入一个新的前缀 `#` 表示私有属性，而没有采用 `private` 关键字，是因为 JavaScript 是一门动态语言，没有类型声明，使用独立的符号似乎是唯一的比较方便可靠的方法，能够准确地区分一种属性是否为私有属性。另外，Ruby 语言使用 `@` 表示私有属性，ES6 没有用这个符号而使用 `#`，是因为 `@` 已经被留给了 Decorator。

这种写法不仅可以写私有属性，还可以用来写私有方法。

```js
class Foo {
  #a;
  #b;
  constructor(a, b) {
    this.#a = a;
    this.#b = b;
  }
  #sum() {
    return #a + #b;
  }
  printSum() {
    console.log(this.#sum());
  }
}
```

另外，私有属性也可以设置 getter 和 setter 方法。

```js
class Counter {
  #xValue = 0;

  constructor() {
    super();
    // ...
  }

  get #x() { return #xValue; }
  set #x(value) {
    this.#xValue = value;
  }
}
```

私有属性不限于从 this 引用，只要是在类的内部，实例也可以引用私有属性。

```js
class Foo {
  #privateValue = 42;
  static getPrivateValue(foo) {
    return foo.#privateValue;
  }
}

Foo.getPrivateValue(new Foo()); // 42
```

私有属性和私有方法前面，也可以加上 static 关键字，表示这是一个静态的私有属性或私有方法。

```js
class FakeMath {
  static PI = 22 / 7;
  static #totallyRandomNumber = 4;

  static #computeRandomNumber() {
    return FakeMath.#totallyRandomNumber;
  }

  static random() {
    console.log('I heard you like random numbers…')
    return FakeMath.#computeRandomNumber();
  }
}

FakeMath.PI // 3.142857142857143
FakeMath.random()
// I heard you like random numbers…
// 4
FakeMath.#totallyRandomNumber // 报错
FakeMath.#computeRandomNumber() // 报错
```

## 6.new.target 属性

new 是从构造函数生成实例对象的命令。ES6 为 new 命令引入了一个 new.target 属性，该属性一般用在构造函数之中，返回 new 命令作用于的那个构造函数。如果构造函数不是通过 new 命令或 `Reflect.construct()` 调用的，new.target 会返回 undefined，因此这个属性可以用来确定构造函数是怎么调用的。

```js
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error("必须使用 new 命令生成实例");
  }
}

// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error("必须使用 new 命令生成实例");
  }
}

var person = new Person("张三"); // 正确
var notAPerson = Person.call(person, "张三"); // 报错
```

Class 内部调用 new.target，返回当前 Class。

```js
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    this.length = length;
    this.width = width;
  }
}

var obj = new Rectangle(3, 4); // 输出 true
```

需要注意的是，子类继承父类时，new.target 会返回子类。

```js
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    // ...
  }
}

class Square extends Rectangle {
  constructor(length) {
    super(length, width);
  }
}

var obj = new Square(3); // 输出 false
```

利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。

```js
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error("本类不能实例化");
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}

var x = new Shape(); // 报错
var y = new Rectangle(3, 4); // 正确
```
