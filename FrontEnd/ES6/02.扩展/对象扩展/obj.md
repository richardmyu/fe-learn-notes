# 对象的扩展

## 1.属性的简洁表示法

ES6 允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

```js
const foo = "bar";

const baz = { foo: foo };
// 等同于
const baz = { foo };

baz; // {foo: "bar"}

const o = {
  method: function() {
    return "Hello!";
  }
};
// 等同于
const o = {
  method() {
    return "Hello!";
  }
};
```

注意，简洁写法的属性名总是字符串，这会导致一些看上去比较奇怪的结果。

```js
const obj = {
  class() {}
};

// 等同于

var obj = {
  class: function() {}
};
```

class 是字符串，所以不会因为它属于关键字，而导致语法解析报错。

如果某个方法的值是一个 Generator 函数，前面需要加上星号。

```js
const obj = {
  *m() {
    yield "hello world";
  }
};
```

## 2.属性名表达式

JavaScript 定义对象的属性，有两种方法。

```js
// 方法一
obj.foo = true;

// 方法二
obj["a" + "bc"] = 123;
```

但是，如果使用字面量方式定义对象（使用大括号），在 ES5 中只能使用方法一（标识符）定义属性（属性名只能是字符串而不能是表达式）。

```js
var obj = {
  foo: true,
  abc: 123
};
```

ES6 允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。

```js
let propKey = "foo";

let obj = {
  [propKey]: true,
  ["a" + "bc"]: 123
};
```

注意，属性名表达式与简洁表示法，不能同时使用，会报错。

```js
// 报错
const foo = 'bar';
const bar = 'abc';
const baz = { [foo] };

// 正确
const foo = 'bar';
const baz = { [foo]: 'abc'};
```

## 3.方法的 name 属性

函数的 name 属性，返回函数名。对象方法也是函数，因此也有 name 属性。

```js
function fn() {}
fn.name; // fn

// obj
const person = {
  sayName() {
    console.log("hello!");
  }
};

person.sayName.name; // "sayName"
```

如果对象的方法使用了取值函数（getter）和存值函数（setter），则 name 属性不是在该方法上面，而是该方法的属性的 描述对象 的 get 和 set 属性上面，返回值是方法名前加上 get 和 set。

```js
const obj = {
  get foo() {},
  set foo(x) {}
};

obj.foo.name;
// TypeError: Cannot read property 'name' of undefined

const descriptor = Object.getOwnPropertyDescriptor(obj, "foo");

descriptor.get.name; // "get foo"
descriptor.set.name; // "set foo"
```

有两种特殊情况：bind 方法创造的函数，name 属性返回 bound 加上原函数的名字；Function 构造函数创造的函数，name 属性返回 anonymous。

```js
new Function().name; // "anonymous"

var doSomething = function() {};
doSomething.bind().name; // "bound doSomething"
```

如果对象的方法是一个 Symbol 值，那么 name 属性返回的是这个 Symbol 值的描述。

```js
const key1 = Symbol("description");
const key2 = Symbol();
let obj = {
  [key1]() {},
  [key2]() {}
};
obj[key1].name; // "[description]"
obj[key2].name; // ""
```

## 4.属性的可枚举性和遍历

### 4.1.可枚举性

对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。Object.getOwnPropertyDescriptor 方法可以获取该属性的描述对象。

```js
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, "foo");
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }
```

描述对象的 enumerable 属性，称为“可枚举性”，如果该属性为 false，就表示某些操作会忽略当前属性。

目前，有四个操作会忽略 enumerable 为 false 的属性。

- `for...in` 循环：只遍历对象自身的和继承的可枚举的属性。
  >
- `Object.keys()`：返回对象自身的所有可枚举的属性的键名。
  >
- `JSON.stringify()`：只串行化对象自身的可枚举的属性。
  >
- `Object.assign()`： 忽略 enumerable 为 false 的属性，只拷贝对象自身的可枚举的属性。

这四个操作之中，前三个是 ES5 就有的，最后一个 `Object.assign()` 是 ES6 新增的。其中，只有 for...in 会返回继承的属性，其他三个方法都会忽略继承的属性，只处理对象自身的属性。实际上，引入“可枚举”（enumerable）这个概念的最初目的，就是让某些属性可以规避掉 for...in 操作，不然所有内部属性和方法都会被遍历到。比如，对象原型的 toString 方法，以及数组的 length 属性，就通过“可枚举性”，从而避免被 for...in 遍历到。

另外，ES6 规定，所有 Class 的原型的方法都是不可枚举的。

```js
Object.getOwnPropertyDescriptor(
  class {
    foo() {}
  }.prototype,
  "foo"
).enumerable;
// false
```

总的来说，操作中引入继承的属性会让问题复杂化，大多数时候，我们只关心对象自身的属性。所以，尽量不要用 for...in 循环，而用 `Object.keys()` 代替。

#### 4.2.属性的遍历

ES6 一共有 5 种方法可以遍历对象的属性。

（1）**for...in**

for...in 循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

（2）**Object.keys(obj)**

Object.keys 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

（3）**Object.getOwnPropertyNames(obj)**

Object.getOwnPropertyNames 返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

（4）**Object.getOwnPropertySymbols(obj)**

Object.getOwnPropertySymbols 返回一个数组，包含对象自身的所有 Symbol 属性的键名。

（5）**Reflect.ownKeys(obj)**

Reflect.ownKeys 返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

- 首先遍历所有数值键，按照数值升序排列。

- 其次遍历所有字符串键，按照加入时间升序排列。

- 最后遍历所有 Symbol 键，按照加入时间升序排列。

```js
Reflect.ownKeys({ [Symbol()]: 0, b: 0, 10: 0, 2: 0, a: 0 });
// ['2', '10', 'b', 'a', Symbol()]
```

## 5.对象的扩展运算符

### 5.1.对象的扩展运算符

对象的解构赋值用于从一个对象取值，相当于将目标对象自身的所有可遍历的（enumerable）、但尚未被读取的属性，分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。

```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x; // 1
y; // 2
z; // { a: 3, b: 4 }
```

由于解构赋值要求等号右边是一个对象，所以如果等号右边是 undefined 或 null，就会报错，因为它们无法转为对象。解构赋值必须是最后一个参数，否则会报错。

```js
let { ...z } = null; // 运行时错误

let { ...x, y, z } = someObject; // 句法错误
```

注意，解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。扩展运算符的解构赋值，不能复制继承自原型对象的属性。

```js
const o = Object.create({ x: 1, y: 2 });
o.z = 3;

let { x, ...newObj } = o;
let { y, z } = newObj;
x; // 1
y; // undefined
z; // 3
```

### 5.2.扩展运算符

对象的扩展运算符（`...`）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。

```js
let z = { a: 3, b: 4 };
let n = { ...z };
n; // { a: 3, b: 4 }
```

如果扩展运算符后面是一个空对象，则没有任何效果。

```js
{...{}, a: 1}
// { a: 1 }
```

如果扩展运算符后面不是对象，则会自动将其转为对象。

```js
// 等同于 {...Object(1)}
{...1} // {}
```

但是，如果扩展运算符后面是字符串，它会自动转成一个类似数组的对象，因此返回的不是空对象。

```js
{...'hello'}
// {0: "h", 1: "e", 2: "l", 3: "l", 4: "o"}
```

对象的扩展运算符等同于使用 `Object.assign()` 方法。

```js
let aClone = { ...a };
// 等同于
let aClone = Object.assign({}, a);
```

如果想完整克隆一个对象，还拷贝对象原型的属性，可以采用下面的写法。

```js
// 写法一
const clone2 = Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);

// 写法二
const clone3 = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
);
```

扩展运算符可以用于合并两个对象。

```js
let ab = { ...a, ...b };
// 等同于
let ab = Object.assign({}, a, b);
```

如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。这用来修改现有对象部分的属性就很方便了。如果把自定义属性放在扩展运算符前面，就变成了设置新对象的默认属性值。（一句话总结：后来的同名属性会覆盖前面属性的值）

```js
let newVersion = {
  ...previousVersion,
  name: "New Name" // Override the name property
};
```

对象的扩展运算符后面可以跟表达式。

```js
const obj = {
  ...(x > 1 ? { a: 1 } : {}),
  b: 2
};
```

扩展运算符的参数对象之中，如果有取值函数 get，这个函数是会执行的。

```js
// 并不会抛出错误，因为 x 属性只是被定义，但没执行
let aWithXGetter = {
  ...a,
  get x() {
    throw new Error("not throw yet");
  }
};

// 会抛出错误，因为 x 属性被执行了
let runtimeError = {
  ...a,
  ...{
    get x() {
      throw new Error("throw now");
    }
  }
};
```
