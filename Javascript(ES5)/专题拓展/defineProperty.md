# Object.defineProperty

方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

```js
// 'use strict'
const obj = {}

Object.defineProperty(obj, 'age', {
  value: 42,
  writable: false
})

// 严格模式报错
// Uncaught TypeError: Cannot assign to read only property 'age' of object '#<Object>'
obj.age = 77

// 42
console.log(obj.age)
```

### 语法

```js
Object.defineProperty(obj, prop, descriptor)
```

- 参数

  - `obj`

    - 要定义属性的对象。

  - `prop`

    - 要定义或修改的属性的名称或 Symbol 。

  - `descriptor`

    - 要定义或修改的属性描述符。

- 返回值

  - 被传递给函数的对象。

> 在 ES6 中，由于 Symbol 类型的特殊性，用 Symbol 类型的值来做对象的 key与常规的定义或修改不同，而 `Object.defineProperty` 是定义 key为 Symbol 的属性的方法之一。

### 描述

该方法允许精确地添加或修改对象的属性。通过赋值操作添加的普通属性是可枚举的，在枚举对象属性时会被枚举到（`for...in` 或 `Object.keys` 方法），可以改变这些属性的值，也可以删除这些属性。这个方法允许修改默认的额外选项（或配置）。默认情况下，使用 `Object.defineProperty()` 添加的属性值是不可修改（immutable）的。

```js
const normalObj = {
  name: '张三'
}

Object.defineProperty(normalObj, 'age', {
  value: 3
})

// 已申明的属性，再次申明会报错
// Uncaught TypeError: Cannot redefine property: age
Object.defineProperty(normalObj, 'age', {
  value: 4
})

// 枚举/遍历
for (let key in normalObj) {
  console.log('key: ', key)
}
// key:  name

Object.keys(normalObj).map(item => console.log(item))
// name

// 赋值
normalObj.name = '李四'
normalObj.age = 4

normalObj.name // 李四
normalObj.age // 3

// 删除
delete normalObj.name // true
delete normalObj.age // false

normalObj.name // undefined
normalObj.age // 3
```

对象里目前存在的属性描述符有两种主要形式：**数据描述符** 和 **存取描述符**。

> 一个描述符只能是这两者其中之一；不能同时是两者。

这两种描述符都是对象。它们共享以下可选键值（默认值是指在使用 `Object.defineProperty()` 定义属性时的默认值）：

- `configurable` (可配置性)

  - 当且仅当该属性的 `configurable` 键值为 true 时，该属性的描述符才能够被改变(???)，同时该属性也能从对应的对象上被删除。
  - 默认为 false。

```js
const obj = {}
Object.defineProperty(obj, 'name', {
  value: '张三',
  configurable: false
})
Object.defineProperty(obj, 'age', {
  value: 3,
  configurable: true
})
objobj.name // 张三
objobj.age // 3

for (let key in obj) {
  console.log('key: ', key) // 没有遍历
}
Object.keys(obj).map(item => console.log('key: ',item)) // 没有遍历

obj.name = '李四'
obj.age = 4
obj.name // 张三
obj.age // 3

delete obj.name // false
delete obj.age // true
obj.name // 张三
obj.age // undefined
```

- `enumerable` (可遍历性)

  - 当且仅当该属性的 `enumerable` 键值为 true 时，该属性才会出现在对象的枚举属性中。
  - 默认为 false。

```js
const obj = {}
Object.defineProperty(obj, 'name', {
  value: '张三',
  enumerable: false
})

Object.defineProperty(obj, 'age', {
  value: 3,
  enumerable: true
})
obj.name // 张三
obj.age // 3

for (let key in obj) {
  console.log('key: ', key) // key:  age
}
Object.keys(obj).map(item => console.log('key: ', item)) // key:  age

obj.name = '李四'
obj.age = 4
obj.name // 张三
obj.age // 3

delete obj.name // false
delete obj.age // false
obj.name // 张三
obj.age // 3
```

数据描述符还具有以下可选键值：

- `value` (值)

  - 该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。
  - 默认为 undefined。

```js
const obj = {}
function addressFn() {
  return '湖北省' + '武汉市' + '哈哈区'
}

Object.defineProperty(obj, 'name', {
  value: '张三'
})

Object.defineProperty(obj, 'age', {
  value: 3
})

Object.defineProperty(obj, 'class', {
  value: {
    grade: '三年级',
    class: '1班'
  }
})

Object.defineProperty(obj, 'address', {
  value: addressFn()
})

obj.name // '张三'
obj.age // 3
obj.class // {grade: "三年级", class: "1班"}
obj.address // 湖北省武汉市哈哈区
```

- `writable` (可写性)

  - 当且仅当该属性的 `writable` 键值为 true 时，属性的值，也就是上面的 value，才能被赋值运算符改变。
  - 默认为 false。

```js
const obj = {}
Object.defineProperty(obj, 'name', {
  value: '张三',
  writable: false
})

Object.defineProperty(obj, 'age', {
  value: 3,
  writable: true
})
obj.name // 张三
obj.age // 3

for (let key in obj) {
  console.log('key: ', key) // 没有遍历
}
Object.keys(obj).map(item => console.log('key: ', item)) // 没有遍历

obj.name = '李四'
obj.age = 4
obj.name // 张三
obj.age // 4

delete obj.name // false
delete obj.age // false
obj.name // 张三
obj.age // 4
```

存取描述符还具有以下可选键值：

- `get`

  - 属性的 `getter` 函数，如果没有 `getter`，则为 undefined。当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 `this` 对象（由于继承关系，这里的 `this` 并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。
  - 默认为 undefined。

```js
const obj = {}
Object.defineProperty(obj, 'name', {
  get() {
    // 每次获取 name，都会执行改函数
    console.log('this:', this == obj) // true true
    return
  }
})
Object.defineProperty(obj, 'age', {
  get() {
    return 3
  }
})

obj.name // undefined
obj.age // 3

obj.name = '李四'
obj.name // undefined
```

- `set`

  - 属性的 `setter` 函数，如果没有 `setter`，则为 undefined。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 `this` 对象。
  - 默认为 undefined。

```js
const obj = {}
let name = '张三'

Object.defineProperty(obj, 'name', {
  get() {
    return name
  },
  set(val) {
    name = val
  }
})

Object.defineProperty(obj, 'age', {
  get() {
    return 3
  }
})

obj.name // 张三
obj.age // 3

obj.name = "李四"
obj.age = 4

obj.name // 李四
obj.age // 3
```

描述符可拥有的键值

|            | configurable | enumerable | value  | writable |  get   |  set   |
| ---------- | :----------: | :--------: | :----: | :------: | :----: | :----: |
| 数据描述符 |     可以     |    可以    |  可以  |   可以   | 不可以 | 不可以 |
| 存取描述符 |     可以     |    可以    | 不可以 |  不可以  |  可以  |  可以  |

如果一个描述符不具有 `value`、`writable`、`get` 和 `set` 中的任意一个键，那么它将被认为是一个数据描述符。如果一个描述符同时拥有 `value` 或 `writable` 和 `get` 或 `set` 键，则会产生一个异常。

记住，这些选项不一定是自身属性，也要考虑继承来的属性。为了确认保留这些默认值，在设置之前，可能要冻结 `Object.prototype`，明确指定所有的选项，或者通过 `Object.create(null)` 将 `__proto__` 属性指向 `null`。(???)

### 示例

- **创建属性**

如果对象中不存在指定的属性，`Object.defineProperty()` 会创建这个属性。当描述符中省略某些字段时，这些字段将使用它们的默认值。

```js
let obj = {}

// 数据描述符示例
Object.defineProperty(obj, "age", {
  value: 37,
  writable: true,
  enumerable: true,
  configurable: true
})
obj.age // 37

// 存取描述符示例
let name = '张三'
Object.defineProperty(obj, "name", {
  get() {
    return name
  },
  set(val) {
    name = val;
  },
  enumerable: true,
  configurable: true
})

obj.name // 张三

// 数据描述符和存取描述符不能混合使用
Object.defineProperty(obj, "conflict", {
  value: 0x9f91102,
  get() {
    return 0xdeadbeef
  }
})
// Invalid property descriptor.Cannot both specify accessors and a value or writable attribute

// 重复定义，不会报错，
Object.defineProperty(obj, "age", {
  value: 7,
  writable: true,
  enumerable: true,
  configurable: true
})
obj.age // 7

name = '李四'
Object.defineProperty(obj, "name", {
  get() {
    return name
  },
  set(val) {
    name = val;
  },
  enumerable: true,
  configurable: true
})

obj.name // 李四
```

- **修改属性**

如果属性已经存在，`Object.defineProperty()` 将尝试根据描述符中的值以及对象当前的配置来修改这个属性。如果旧描述符将其 `configurable` 属性设置为 false，则该属性被认为是“不可配置的”，并且没有属性可以被改变（除了单向改变 `writable` 为 false）。当属性不可配置时，不能在数据和访问器属性类型之间切换。

当试图改变不可配置属性（除了 `value` 和 `writable` 属性之外）的值时，会抛出 `TypeError`，除非当前值和新值相同。

- `Writable` 属性

当 `writable` 属性设置为 false 时，该属性被称为“不可写的”。它不能被重新赋值。

```js
let obj = {};

Object.defineProperty(obj, 'age', {
  value: 37,
  writable: false
});

obj.age; // 37

obj.age = 25; // 非严格模式下，不会抛出错误
obj.age; // 37

// 严格模式
(function () {
  'use strict'
  var obj = {};
  Object.defineProperty(obj, 'age', {
    value: 2,
    writable: false
  });
  obj.age = 3 //  Cannot assign to read only property 'age' of object
  return obj.age;
}());
```

- `Enumerable` 属性

`enumerable` 定义了对象的属性是否可以在 `for...in` 循环和 `Object.keys()` 中被枚举。

```js
const o = {};

Object.defineProperty(o, "a", { value: 1, enumerable: true });
Object.defineProperty(o, "b", { value: 2, enumerable: false });

// enumerable 默认为 false
Object.defineProperty(o, "c", { value: 3 });

// 如果使用直接赋值的方式创建对象的属性，则 enumerable 为 true
o.d = 4;

Object.defineProperty(o, Symbol.for('e'), {
  value: 5,
  enumerable: true
});

Object.defineProperty(o, Symbol.for('f'), {
  value: 6,
  enumerable: false
});

for (var i in o) {
  console.log(i);
}
// 'a'
// 'd'

console.log(Object.keys(o)); // ['a', 'd']

// 可遍历性判断
console.log(o.propertyIsEnumerable('a')); // true
console.log(o.propertyIsEnumerable('b')); // false
console.log(o.propertyIsEnumerable('c')); // false
console.log(o.propertyIsEnumerable('d')); // true
console.log(o.propertyIsEnumerable(Symbol.for('e'))); // true
console.log(o.propertyIsEnumerable(Symbol.for('f'))); // false

const p = { ...o }
console.log(p.a) // 1
console.log(p.b) // undefined
console.log(p.c) // undefined
console.log(p.d) // 4
console.log(p[Symbol.for('e')]) // 5
console.log(p[Symbol.for('f')]) // undefined
```

- `Configurable` 属性

`configurable` 特性表示对象的属性是否可以被删除，以及除 `value` 和 `writable` 特性外的其他特性是否可以被修改。

```js
const o = {};
Object.defineProperty(o, 'a', {
  get() { return 1; },
  configurable: false
});

// Cannot redefine property: a
Object.defineProperty(o, 'a', {
  configurable: true
});

// Cannot redefine property: a
Object.defineProperty(o, 'a', {
  enumerable: true
});

// Cannot redefine property: a
Object.defineProperty(o, 'a', {
  set() { }
});

// Cannot redefine property: a
Object.defineProperty(o, 'a', {
  get() { return 1; }
});

// Cannot redefine property: a
Object.defineProperty(o, 'a', {
  value: 4
});
```

小结：

- `configurable` 默认值是 false;
- 使用【数据描述符】的情况下，`configurable` 为 false：
  - `value` 赋值(无论严格模式还是非严格模式):
    - 赋同值不会报错，其他值报错
  - `writable`/`enumerable`/`configurable` 赋值(无论严格模式还是非严格模式):
    - 新值设为 true 报错
    - 新值设为 false 不报错
  - `set`/`get`  赋值:
    - 都报错
- 使用【存储描述符】的情况下：`configurable` 为 false：
  - `enumerable`/`configurable` 赋值(无论严格模式还是非严格模式):
    - 新值设为 true 报错
    - 新值设为 false 不报错
  - 都报错

---

- **添加多个属性和默认值**

考虑特性被赋予的默认特性值非常重要，通常，使用点运算符和 `Object.defineProperty()` 为对象的属性赋值时，数据描述符中的属性默认值是不同的，如下例所示。

```js
var o = {};

o.a = 1;
// 等同于：
Object.defineProperty(o, "a", {
  value: 1,
  writable: true,
  configurable: true,
  enumerable: true
});


// 另一方面，
Object.defineProperty(o, "a", { value : 1 });
// 等同于：
Object.defineProperty(o, "a", {
  value: 1,
  writable: false,
  configurable: false,
  enumerable: false
});
```

- **继承属性**

如果访问者的属性是被继承的，它的 `get` 和 `set` 方法会在子对象的属性被访问或者修改时被调用。如果这些方法用一个变量存值，该值会被所有对象共享。

```js
function myclass() {
}

var value;
Object.defineProperty(myclass.prototype, "x", {
  get() {
    return value;
  },
  set(x) {
    value = x;
  }
});

var a = new myclass();
var b = new myclass();
a.x = 1;
console.log(b.x); // 1
```

这可以通过将值存储在另一个属性中解决。在 `get` 和 `set` 方法中，`this` 指向某个被访问和修改属性的对象。

```js
function myclass() {
}

Object.defineProperty(myclass.prototype, "x", {
  get() {
    return this.stored_x;
  },
  set(x) {
    this.stored_x = x;
  }
});

var a = new myclass();
var b = new myclass();
a.x = 1;
console.log(b.x); // undefined
```

不像访问者属性，值属性始终在对象自身上设置，而不是一个原型。然而，如果一个不可写的属性被继承，它仍然可以防止修改对象的属性。

```js
function myclass() {
}

myclass.prototype.x = 1;
Object.defineProperty(myclass.prototype, "y", {
  writable: false,
  value: 1
});

var a = new myclass();
a.x = 2;
console.log(a.x); // 2
console.log(myclass.prototype.x); // 1

a.y = 2; // Ignored, throws in strict mode
console.log(a.y); // 1
console.log(myclass.prototype.y); // 1
```

### 兼容性问题

- **重定义数组 Array 对象的 length 属性**

重定义数组的 `length` 属性是可能的，但是会受到一般的重定义限制。（`length` 属性初始为 `non-configurable`，`non-enumerable` 以及 `writable`。对于一个内容不变的数组，改变其 `length` 属性的值或者使它变为 `non-writable` 是可能的。但是改变其可枚举性和可配置性或者当它是 non-writable 时尝试改变它的值或是可写性，这两者都是不允许的。）然而，并不是所有的浏览器都允许 `Array.length` 的重定义。

在 Firefox 4 至 22 版本中，尝试重定义数组的 length 属性都会抛出 TypeError 异常。

一些版本的 Chrome 中，`Object.defineProperty()` 在某些情况下会忽略不同于数组当前 `length` 属性的 `length` 值。有些情况下改变可写性并不起作用（也不抛出异常）。同时，比如 `Array.prototype.push` 的一些数组操作方法也不会考虑不可读的 `length` 属性。

一些版本的 Safari 中，`Object.defineProperty()` 在某些情况下会忽略不同于数组当前 `length` 属性的 `length` 值。尝试改变可写性的操作会正常执行而不抛出错误，但事实上并未改变属性的可写性。

只在 Internet Explorer 9及以后版本和 Firefox 23 及以后版本中，才完整地正确地支持数组 `length` 属性的重新定义。目前不要依赖于重定义数组 `length` 属性能够起作用，或在特定情形下起作用。与此同时，即使你能够依赖于它，你也没有合适的理由这样做。

阅读：

1.[Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

3.[不会Object.defineProperty你就out了](https://imweb.io/topic/56d40adc0848801a4ba198ce)

4.[属性描述对象](https://javascript.ruanyifeng.com/stdlib/attributes.html)
