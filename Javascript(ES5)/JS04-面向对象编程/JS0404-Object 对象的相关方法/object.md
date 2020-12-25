### 2.Object 对象的相关方法

[TOC]

#### 2.1.Object.getPrototypeOf()

`Object.getPrototypeOf` 方法返回参数对象的原型（内部 `[[Prototype]]` 属性的值）。这是获取原型对象的标准方法。如果没有继承属性，则返回 `null`。在 ES5 中，如果参数不是一个对象类型，将抛出一个 `TypeError` 异常。在 ES6 中，参数会被强制转换为一个 Object。

```javascript
var F = function() {};
var f = new F();
Object.getPrototypeOf(f) === F.prototype; // true

Object.getPrototypeOf(null);
// TypeError: Cannot convert undefined or null to object
```

下面是几种特殊对象的原型。

```javascript
// 空对象(也包括其他对象)的原型是 Object.prototype
Object.getPrototypeOf({}) === Object.prototype; // true

// Object.prototype 的原型是 null
Object.getPrototypeOf(Object.prototype) === null; // true

// Function.prototype 的原型是 Object.prototype
Object.getPrototypeOf(Function.prototype) === Object.prototype; // true

// 函数的原型是 Function.prototype
function f() {}
Object.getPrototypeOf(f) === Function.prototype; // true
```

#### 2.2.Object.setPrototypeOf()

`Object.setPrototypeOf` 方法为对象设置原型，返回该对象。它接受两个参数，第一个是参数对象，第二个是新原型对象或 `null`（忽略其他类型值）。

```javascript
var a = {};
var b = { x: 1 };

Object.setPrototypeOf(a, b) === a; //true
Object.getPrototypeOf(a) === b; //true
a.x; // 1
```

> 警告: 由于现代 JavaScript 引擎优化属性访问所带来的特性的关系，更改对象的 `[[Prototype]]` 在各个浏览器和 JavaScript 引擎上都是一个很慢的操作。其在更改继承的性能上的影响是微妙而又广泛的，这不仅仅限于 `obj.__proto__ = ...` 语句上的时间花费，而且可能会延伸到任何代码，那些可以访问任何 `[[Prototype]]` 已被更改的对象的代码。如果你关心性能，你应该避免设置一个对象的 `[[Prototype]]`。相反，你应该使用 `Object.create()` 来创建带有你想要的 `[[Prototype]]` 的新对象。

如果对象的 `[[Prototype]]` 被修改成不可扩展(通过 `Object.isExtensible()` 查看)，就会抛出 `TypeError` 异常。？？？

```js
function Fn() {
  this.name = "jack";
}
let fn = new Fn();

// case 1：对象原型不可扩展，设置原型不会报错
Object.preventExtensions(Object.getPrototypeOf(fn));
Object.setPrototypeOf(fn, {}); //...

// case 2：对象不可扩展，设置原型报错
Object.preventExtensions(fn);
Object.setPrototypeOf(fn, {}); //TypeError: #<Fn> is not extensible
```

`new` 命令可以使用 `Object.setPrototypeOf` 方法模拟。

```javascript
var F = function() {
  this.foo = "bar";
};

var f = new F();
// 等同于

var f = Object.setPrototypeOf({}, F.prototype);
// !!! 注意要改变this的指向
F.call(f);
```

#### 2.3.Object.create()

`Object.create()` 方法创建一个新对象，使用现有的对象来提供新创建的对象的`__proto__`。 该新对象 _完全继承_ 原型对象的属性。

**语法**

`Object.create(proto, [propertiesObject])`

**参数**

- proto
  - 新创建对象的原型对象。
    >
- propertiesObject
  - 可选。如果没有指定为 `undefined`，则是要添加到新创建对象的可枚举属性（即其自身定义的属性，而不是其原型链上的枚举属性）对象的属性描述符以及相应的属性名称。这些属性对应 `Object.defineProperties()` 的第二个参数。

```javascript
// 原型对象
var A = {
  print: function() {
    console.log("hello");
  }
};

// 新对象
var B = Object.create(A);

Object.getPrototypeOf(B) === A; // true
B.print(); // hello
B.print === A.print; // true
```

实际上，`Object.create` 方法可以用下面的代码模拟：

```javascript
// 模拟 Object.create
let _create = function(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
};

let aa = { a: 111 };
let bb = _create(aa);
Object.getPrototypeOf(bb) === aa; //true
bb.a; //111
bb.a === aa.a; //true
```

下面三种方式生成的新对象是等价的。

```javascript
var obj1 = Object.create({});
var obj2 = Object.create(Object.prototype);
var obj3 = new Object();
```

如果想要生成一个不继承任何属性（比如没有 `toString` 和 `valueOf` 方法）的对象，可以将 `Object.create` 的参数设为 `null`。

```javascript
var obj = Object.create(null);

obj.valueOf();
// TypeError: Object [object Object] has no method 'valueOf'
```

使用 `Object.create` 方法的时候，必须提供对象原型，即参数不能为空，或者不是对象，否则会报错。

```javascript
Object.create();
// TypeError: Object prototype may only be an Object or null

Object.create(123);
// TypeError: Object prototype may only be an Object or null
```

- 1.`object.create` 方法生成的新对象，**动态继承**了原型。在原型上添加或修改任何方法，会立刻反映在新对象之上。

```javascript
var obj1 = { p: 1 };
var obj2 = Object.create(obj1);

obj1.p = 2;
obj2.p; // 2
```

- 2.除了对象的原型，`Object.create` 方法还可以接受第二个参数。该参数是一个**属性描述对象**，它所描述的对象属性，会添加到实例对象，作为该对象自身的属性。

```javascript
var obj = Object.create(
  {},
  {
    p1: {
      value: 123,
      enumerable: true,
      configurable: true,
      writable: true
    },
    p2: {
      value: "abc",
      enumerable: true,
      configurable: true,
      writable: true
    }
  }
);

// 等同于
var obj = Object.create({});
obj.p1 = 123;
obj.p2 = "abc";
```

- 3.`Object.create` 方法生成的对象，继承了它的原型对象的构造函数。

```javascript
function A() {}
var a = new A();
var b = Object.create(a);

b.constructor === A; // true
b instanceof A; // true
```

**返回值**

一个新对象，带着指定的原型对象和属性。

**例外**

~~如果 propertiesObject 参数是 `null` 或非原始包装对象，则抛出一个 `TypeError` 异常。~~如果 propertiesObject 参数是 `null` 或非原始包装对象，则抛出一个 `TypeError` 异常。

```js
// 2019-07-14 Google Chrome  75.0.3770.100（正式版本） （64 位）
let obj1 = { p: 1 };
let obj2 = Object.create(obj1, null);
// TypeError: Cannot convert undefined or null to object

let obj3 = Object.create(obj1, undefined);
// {}
//   __proto__:
//     p: 1
//     __proto__: Object

let obj4 = Object.create(obj1, 123);
// {}
//   __proto__:
//     p: 1
//     __proto__: Object

let obj4 = Object.create(obj1, "123");
// TypeError: Property description must be an object: 1
```

#### 2.4.Object.prototype.isPrototypeOf()

实例对象的 `isPrototypeOf` 方法，用来判断该对象是否为参数对象的原型。

```javascript
var o1 = {};
var o2 = Object.create(o1);
var o3 = Object.create(o2);

o2.isPrototypeOf(o3); // true
o1.isPrototypeOf(o3); // true
```

上面代码中，o1 和 o2 都是 o3 的原型。这表明只要实例对象处在参数对象的原型链上，`isPrototypeOf` 方法都返回 true。

```javascript
Object.prototype.isPrototypeOf({}); // true
Object.prototype.isPrototypeOf([]); // true
Object.prototype.isPrototypeOf(/xyz/); // true
Object.prototype.isPrototypeOf(Object.create(null)); // false
```

上面代码中，由于 `Object.prototype` 处于原型链的最顶端，所以对各种实例都返回 true，只有直接继承自 `null` 的对象除外。

> 注释：`Object.prototype` 继承自 `null` ，但 `null` 不在原型链中，故由 `null` 直接继承而来的对象跟 `Object.prototype` 是并级的，而也不在原型链中，当然这都基于 `Object.prototype` 处于原型链的最顶端，至于为什么是，不知道？？？

#### 2.5.`Object.prototype.__proto__`

**实例对象的 `__proto__` 属性，返回该对象的原型**。该属性可读写。

> 请注意，`__proto__` 与内部的 `[[Prototype]]` 不一样。`__proto__` 是 `[[Prototype]]` 的 `getter/setter`。

```javascript
var obj = {};
var p = {};

obj.__proto__ = p;
Object.getPrototypeOf(obj) === p; // true
```

根据语言标准，`__proto__` 属性只有浏览器才需要部署，其他环境可以没有这个属性。但实际上，包括服务端在内的所有环境都支持它。

它前后的两根下划线，表明它本质是一个内部属性，它的存在是出于历史的原因，不应该对使用者暴露。因此，应该尽量少用这个属性，而是用 `Object.getPrototypeOf()` 和 `Object.setPrototypeOf()`，进行原型对象的读写操作。

原型链可以用 `__proto__` 很直观地表示。

```javascript
var A = {
  name: "张三"
};

var B = {
  name: "李四"
};

var proto = {
  print: function() {
    console.log(this.name);
  }
};

//Object.setPrototypeOf(A, proto);
A.__proto__ = proto;
B.__proto__ = proto;

A.print(); // 张三
B.print(); // 李四

A.print === B.print; // true
A.print === proto.print; // true
B.print === proto.print; // true
```

#### 2.6.获取原型对象方法的比较

如前所述，`__proto__` 属性指向当前对象的原型对象，即构造函数的 `prototype` 属性。

```javascript
var obj = new Object();

obj.__proto__ === Object.prototype;
// true
obj.__proto__ === obj.constructor.prototype;
// true

obj.constructor; //Object()
```

因此，获取实例对象 obj 的原型对象，有三种方法。

```javascript
obj.__proto__;
obj.constructor.prototype;
Object.getPrototypeOf(obj);
```

上面三种方法之中，前两种都不是很可靠。`__proto__` 属性只有浏览器才需要部署，其他环境可以不部署。而 `obj.constructor.prototype` 在手动改变原型对象时，可能会失效。

```javascript
var Q = function() {};
var q = new Q();

var A = function() {};

A.prototype = q;
var a = new A();

a.constructor.prototype === q; // false
```

上面代码中，构造函数 A 的原型对象被改成了 q，但是实例对象的 `c.constructor.prototype` 却没有指向 q。所以，在改变原型对象时，一般要同时设置 `constructor` 属性。

```javascript
C.prototype = p;
C.prototype.constructor = C;

var c = new C();
c.constructor.prototype === p; // true
```

因此，推荐使用第三种 `Object.getPrototypeOf` 方法，获取原型对象。

#### 2.7.Object.getOwnPropertyNames()

`Object.getOwnPropertyNames` 方法返回一个数组，成员是参数对象本身的所有属性的键名，不包含继承的属性键名，但不区分是否可遍历属性。

```javascript
console.log(Object.getOwnPropertyNames(Date));
//["length", "name", "prototype", "now", "parse", "UTC"]
console.log(Object.keys(Date)); //[]

console.log(Object.getOwnPropertyNames(Math));
//["abs", "acos", "acosh", "asin", ... , "SQRT2"]
console.log(Object.keys(Math)); //[]

console.log(Object.getOwnPropertyNames(Array));
//["length", "name", "prototype", "isArray", "from", "of"]
console.log(Object.keys(Array)); //[]

console.log(Object.getOwnPropertyNames(Object));
//["length", "name", "prototype", ..., "entries", "values"]
console.log(Object.keys(Object)); //[]

console.log(Object.getOwnPropertyNames(RegExp));
//["length", "name", "prototype", "input", ..., "$8", "$9"]
console.log(Object.keys(RegExp)); //[]
```

对象本身的属性之中，有的是可以遍历的，有的是不可以遍历的。`Object.getOwnPropertyNames` 方法返回所有键名，不管是否可以遍历。只获取那些可以遍历的属性，使用 `Object.keys` 方法。

> `Date` 对象所有自身的属性，都是不可以遍历的。

#### 2.8.Object.prototype.hasOwnProperty()

对象实例的 `hasOwnProperty` 方法返回一个布尔值，用于判断某个属性定义在对象自身，还是定义在原型链上(用来判断某个属性是否来自本身即是否私有，不区分是否可遍历性)。

```javascript
Date.hasOwnProperty("length"); // true
Date.hasOwnProperty("toString"); // false
```

上面代码表明，`Date.length`（构造函数 `Date` 可以接受多少个参数）是 Date 自身的属性，`Date.toString` 是继承的属性。

> 另外，`hasOwnProperty` 方法是 JavaScript 之中唯一一个处理对象属性时，不会遍历原型链的方法，即该方法无法检测该对象的原型链中是否具有该属性，该属性必须是对象本身的一个成员。

#### 2.9.`in` 运算符和 `for…in` 循环

`in` 运算符返回一个布尔值，表示一个对象是否具有某个属性。它不区分该属性是对象自身的属性，还是继承的属性。

```javascript
"length" in Date; // true
"toString" in Date; // true
```

`in` 运算符常用于检查一个属性是否存在。

获得对象的所有可遍历属性（不管是自身的还是继承的；既可以遍历私有属性也可以遍历非内置公有属性，但无法遍历内置公有属性），可以使用 `for...in` 循环。

```javascript
var o1 = { p1: 123 };

var o2 = Object.create(o1, {
  p2: { value: "abc", enumerable: true }
});

for (p in o2) {
  console.info(p);
}
// p2
// p1
```

上面对象中，对象 o2 的 p2 属性是自身的，p1 属性是继承的。这两个属性都会被 `for...in` 循环遍历。

为了在 `for...in` 循环中获得对象自身的属性，可以采用 `hasOwnProperty` 方法判断一下。

```javascript
for (var name in object) {
  if (object.hasOwnProperty(name)) {
    /* loop code */
  }
}
```

获得对象的所有属性（不管是自身的还是继承的，也不管是否可枚举），可以使用下面的函数。

```javascript
function inheritedPropertyNames(obj) {
  var props = {};
  while (obj) {
    Object.getOwnPropertyNames(obj).forEach(function(p) {
      props[p] = true;
    });
    obj = Object.getPrototypeOf(obj);
  }
  return Object.getOwnPropertyNames(props);
}
```

上面代码依次获取 obj 对象的每一级原型对象“自身”的属性，从而获取 Obj 对象的“所有”属性，不管是否可遍历。

下面是一个例子，列出 `Date` 对象的所有属性。

```javascript
inheritedPropertyNames(Date);
// [
//  "caller",
//  "constructor",
//  "toString",
//  "UTC",
//  ...
// ]
```

#### 2.10.对象的拷贝

如果要拷贝一个对象，需要做到下面两件事情。

---

- 确保拷贝后的对象，与原对象具有同样的原型。
- 确保拷贝后的对象，与原对象具有同样的实例属性。

---

下面就是根据上面两点，实现的对象拷贝函数。

```javascript
function copyObject(orig) {
  var copy = Object.create(Object.getPrototypeOf(orig));
  copyOwnPropertiesFrom(copy, orig);
  return copy;
}

function copyOwnPropertiesFrom(target, source) {
  Object.getOwnPropertyNames(source).forEach(function(propKey) {
    var desc = Object.getOwnPropertyDescriptor(source, propKey);
    Object.defineProperty(target, propKey, desc);
  });
  return target;
}
```

另一种更简单的写法，是利用 ES2017 才引入标准的 `Object.getOwnPropertyDescriptors` 方法。

```javascript
function copyObject(orig) {
  return Object.create(
    Object.getPrototypeOf(orig),
    Object.getOwnPropertyDescriptors(orig)
  );
}
```

对象的深克隆

```javascript
//第一种方法:通过递归解析解决
function deepCopy(oldObj, newObj) {
  var newObj = newObj || {};
  for (var i in oldObj) {
    if (typeof oldObj[i] === "object") {
      if (oldObj[i] === null) {
        newObj[i] = oldObj[i];
      } else {
        if (oldObj[i].constructor === Array) {
          newObj[i] = [];
        } else {
          newObj[i] = {};
        }
        deepCopy(oldObj[i], newObj[i]);
      }
    } else {
      newObj[i] = oldObj[i];
    }
  }
  return newObj;
}

let obj = {
  a: 123,
  b: [1, 2],
  c: function() {},
  m: null,
  n: undefined,
  l: NaN,
  d: {
    e: {
      f: "zxcv"
    }
  }
};
var nObj = {};
nObj = deepCopy(obj, nObj);
console.log(nObj);
//...
nObj.b = [1, 2, 3];
console.log(obj.b); //[1,2]

//第二种方法:通过JSON解析解决(缺点：会忽略函数和原型对象)
var nObj = JSON.parse(JSON.stringify(obj));
console.log(nObj);
// a:123
// b:(3) [1, 2, 3]
//
// d:{e: {…}}
nObj.b = [1, 2, 3];
console.log(obj.b); //[1, 2]
```
