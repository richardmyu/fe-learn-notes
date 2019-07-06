# Class 的继承

## 1.简介

Class 可以通过 extends 关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。

```js
class Point {}

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + " " + super.toString(); // 调用父类的toString()
  }
}
```

子类必须在 constructor 方法中调用 super 方法，否则新建实例时会报错。这是因为子类自己的 this 对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用 super 方法，子类就得不到 this 对象。

ES5 的继承，实质是先创造子类的实例对象 this，然后再将父类的方法添加到 this 上面（`Parent.apply(this)`）。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到 this 上面（所以必须先调用 super 方法），然后再用子类的构造函数修改 this。

如果子类没有定义 constructor 方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有 constructor 方法。

```js
class ColorPoint extends Point {}

// 等同于
class ColorPoint extends Point {
  constructor(...args) {
    super(...args);
  }
}
```

另一个需要注意的地方是，在子类的构造函数中，只有调用 super 之后，才可以使用 this 关键字，否则会报错。这是因为子类实例的构建，基于父类实例，只有 super 方法才能调用父类实例。

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    this.color = color; // ReferenceError
    super(x, y);
    this.color = color; // 正确
  }
}
```

最后，父类的静态方法，也会被子类继承。

```js
class A {
  static hello() {
    console.log("hello world");
  }
}

class B extends A {}

B.hello(); // hello world
```

## 2.Object.getPrototypeOf()

Object.getPrototypeOf 方法可以用来从子类上获取父类。

```js
Object.getPrototypeOf(ColorPoint) === Point;
// true
```

因此，可以使用这个方法判断，一个类是否继承了另一个类。

## 3.super 关键字

super 这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。

第一种情况，super 作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次 super 函数。

```js
class A {}

class B extends A {
  constructor() {
    super();
  }
}
```

注意，super 虽然代表了父类 A 的构造函数，但是返回的是子类 B 的实例，即 super 内部的 this 指的是 B 的实例，因此 `super()` 在这里相当于 `A.prototype.constructor.call(this)`。

```js
class A {
  constructor() {
    console.log(new.target.name);
  }
}
class B extends A {
  constructor() {
    super();
  }
}
new A(); // A
new B(); // B
```

作为函数时，`super()` 只能用在子类的构造函数之中，用在其他地方就会报错。

```js
class A {}

class B extends A {
  m() {
    super(); // 报错
  }
}
```

第二种情况，super 作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

```js
class A {
  p() {
    return 2;
  }
}

class B extends A {
  constructor() {
    super();
    // super ==> A.prototype
    console.log(super.p()); // 2
  }
}

let b = new B();
```

这里需要注意，由于 super 指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过 super 调用的。

```js
class A {
  constructor() {
    this.p = 2;
  }
}

class B extends A {
  get m() {
    return super.p;
  }
}

let b = new B();
b.m; // undefined
```

ES6 规定，在子类普通方法中通过 super 调用父类的方法时，方法内部的 this 指向当前的子类实例。

```js
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print();
  }
}

let b = new B();
b.m(); // 2
```

由于 this 指向子类实例，所以如果通过 super 对某个属性赋值，这时 super 就是 this，赋值的属性会变成子类实例的属性。

```js
class A {
  constructor() {
    this.x = 1;
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
    super.x = 3;
    console.log(super.x); // undefined
    console.log(this.x); // 3
  }
}

let b = new B();
```

如果 super 作为对象，用在静态方法之中，这时 super 将指向父类，而不是父类的原型对象。

```js
class Parent {
  static myMethod(msg) {
    console.log("static", msg);
  }

  myMethod(msg) {
    console.log("instance", msg);
  }
}

class Child extends Parent {
  static myMethod(msg) {
    super.myMethod(msg);
  }

  myMethod(msg) {
    super.myMethod(msg);
  }
}

Child.myMethod(1); // static 1

var child = new Child();
child.myMethod(2); // instance 2
```

另外，在子类的静态方法中通过 super 调用父类的方法时，方法内部的 this 指向当前的子类，而不是子类的实例。

```js
class A {
  constructor() {
    this.x = 1;
  }
  static print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  static m() {
    super.print();
  }
}

B.x = 3;
B.m(); // 3
```

> 注意，使用 super 的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。

最后，由于对象总是继承其他对象的，所以可以在任意一个对象中，使用 super 关键字。

```js
var obj = {
  toString() {
    return "MyObject: " + super.toString();
  }
};

obj.toString(); // MyObject: [object Object]
```

**小结**

| super 使用场合 | 作用                     | super 的指向 | super 内部 this 指向 | 注意                       |
| -------------- | ------------------------ | ------------ | -------------------- | -------------------------- |
| 函数调用       | 塑造子类 this            | 父类构造函数 | 子类的实例           | 只能在子类的构造函数中使用 |
| 对象-普通方法  | 调用父类原型的方法或属性 | 父类原型     | 当前子类的实例       |
| 对象-静态方法  | 调用父类的方法或属性     | 父类         | 当前子类             |

> 备注：super 作为对象时，在普通方法中，所以如果通过 super 对某个属性赋值，这时 super 就是 this；所以如果通过 super 获取某个属性赋值，这时 super 就是父类原型。

## 4.类的 prototype 属性和 `__proto__` 属性

大多数浏览器的 ES5 实现之中，每一个对象都有 `__proto__` 属性，指向对应的构造函数的 prototype 属性。Class 作为构造函数的语法糖，同时有 prototype 属性和 `__proto__` 属性，因此同时存在两条继承链。

（1）子类的 `__proto__` 属性，表示构造函数的继承，总是指向父类。

（2）子类 prototype 属性的 `__proto__` 属性，表示方法的继承，总是指向父类的 prototype 属性。

这样的结果是因为，类的继承是按照下面的模式实现的。

```js
class A {}

class B {}

// B 的实例继承 A 的实例
Object.setPrototypeOf(B.prototype, A.prototype);

// B 继承 A 的静态属性
Object.setPrototypeOf(B, A);

const b = new B();

Object.setPrototypeOf(B.prototype, A.prototype);
// 等同于
B.prototype.__proto__ = A.prototype;

Object.setPrototypeOf(B, A);
// 等同于
B.__proto__ = A;
```

下面，讨论两种情况。第一种，子类继承 Object 类。

```js
class A extends Object {}

A.__proto__ === Object; // true
A.prototype.__proto__ === Object.prototype; // true
```

第二种情况，不存在任何继承。

```js
class A {}

A.__proto__ === Function.prototype; // true
A.prototype.__proto__ === Object.prototype; // true
```

这种情况下，A 作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承 Function.prototype。但是，A 调用后返回一个空对象（即 Object 实例），所以`A.prototype.__proto__` 指向构造函数（Object）的 prototype 属性。

## 5.原生构造函数的继承

以前，这些原生构造函数是无法继承的，比如，不能自己定义一个 Array 的子类。

```js
function MyArray() {
  Array.apply(this, arguments);
}

MyArray.prototype = Object.create(Array.prototype, {
  constructor: {
    value: MyArray,
    writable: true,
    configurable: true,
    enumerable: true
  }
});
```

但是，这个类的行为与 Array 完全不一致。

```js
var colors = new MyArray();
colors[0] = "red";
colors.length; // 0

colors.length = 0;
colors[0]; // "red"
```

之所以会发生这种情况，是因为子类无法获得原生构造函数的内部属性，通过 `Array.apply()` 或者分配给原型对象都不行。原生构造函数会忽略 apply 方法传入的 this，也就是说，原生构造函数的 this 无法绑定，导致拿不到内部属性。

ES6 允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象 this，然后再用子类的构造函数修饰 this，使得父类的所有行为都可以继承。下面是一个继承 Array 的例子。

```js
class MyArray extends Array {
  constructor(...args) {
    super(...args);
  }
}

var arr = new MyArray();
arr[0] = 12;
arr.length; // 1

arr.length = 0;
arr[0]; // undefined
```

这意味着，ES6 可以自定义原生数据结构（比如 Array、String 等）的子类，这是 ES5 无法做到的。这个例子也说明，extends 关键字不仅可以用来继承类，还可以用来继承原生的构造函数。因此可以在原生数据结构的基础上，定义自己的数据结构。下面就是定义了一个带版本功能的数组。

```js
class ExtendableError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.stack = new Error().stack;
    this.name = this.constructor.name;
  }
}

class MyError extends ExtendableError {
  constructor(m) {
    super(m);
  }
}

var myerror = new MyError("ll");
myerror.message; // "ll"
myerror instanceof Error; // true
myerror.name; // "MyError"
myerror.stack;
// Error
//     at MyError.ExtendableError
//     ...
```

注意，继承 Object 的子类，有一个行为差异。

```js
class NewObj extends Object {
  constructor() {
    super(...arguments);
  }
}
var o = new NewObj({ attr: true });
o.attr === true; // false
```

NewObj 继承了 Object，但是无法通过 super 方法向父类 Object 传参。这是因为 ES6 改变了 Object 构造函数的行为，一旦发现 Object 方法不是通过 `new Object()` 这种形式调用，ES6 规定 Object 构造函数会忽略参数。

## 6.Mixin 模式的实现

Mixin 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。它的最简单实现如下。

```js
const a = {
  a: "a"
};
const b = {
  b: "b"
};
const c = { ...a, ...b }; // {a: 'a', b: 'b'}
```

下面是一个更完备的实现，将多个类的接口“混入”（mix in）另一个类。

```js
function mix(...mixins) {
  class Mix {
    constructor() {
      for (let mixin of mixins) {
        copyProperties(this, new mixin()); // 拷贝实例属性
      }
    }
  }

  for (let mixin of mixins) {
    copyProperties(Mix, mixin); // 拷贝静态属性
    copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
  }

  return Mix;
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if (key !== "constructor" && key !== "prototype" && key !== "name") {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}
```
