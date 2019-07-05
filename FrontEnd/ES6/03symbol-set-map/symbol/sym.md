# Symbol

## 1.概述

ES5 的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是 ES6 引入 Symbol 的原因。

ES6 引入了一种新的原始数据类型 Symbol，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。

Symbol 值通过 Symbol 函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

```js
let s = Symbol();
let b = Symbol();

typeof s; // "symbol"
s === b; // false
```

注意，Symbol 函数前不能使用 new 命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。

Symbol 函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。注意，Symbol 函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的 Symbol 函数的返回值是不相等的。

```js
let s1 = Symbol("foo");
let s2 = Symbol("foo");

s1; // Symbol(foo)
s2; // Symbol(foo)
s1 === s2; // false

s1.toString(); // "Symbol(foo)"
s2.toString(); // "Symbol(foo)"
```

如果 Symbol 的参数是一个对象，就会调用该对象的 toString 方法，将其转为字符串，然后才生成一个 Symbol 值。

```js
const obj = {
  toString() {
    return "abc";
  }
};
const sym = Symbol(obj);
sym; // Symbol(abc)

Symbol({}); // Symbol([object Object])
Symbol({ name: "123" }); // Symbol([object Object])
```

Symbol 值不能与其他类型的值进行运算，会报错。

```js
let sym = Symbol("My symbol");

"your symbol is " + sym;
// TypeError: can't convert symbol to string
`your symbol is ${sym}`;
// TypeError: can't convert symbol to string
```

但是，Symbol 值可以显式转为字符串。

```js
let sym = Symbol("My symbol");

String(sym); // 'Symbol(My symbol)'
sym.toString(); // 'Symbol(My symbol)'
```

另外，Symbol 值也可以转为布尔值，但是不能转为数值。

```js
let sym = Symbol();
Boolean(sym); // true
!sym; // false

Number(sym); // TypeError
sym + 2; // TypeError
```

## 2.Symbol.prototype.description

创建 Symbol 的时候，可以添加一个描述。但是，读取这个描述需要将 Symbol 显式转为字符串，即下面的写法。

```js
const sym = Symbol("foo");

String(sym); // "Symbol(foo)"
```

ES2019 提供了一个实例属性 description，直接返回 Symbol 的描述。

```js
const sym = Symbol("foo");

sym.description; // "foo"
```

## 3.作为属性名的 Symbol

由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。注意，Symbol 值作为对象属性名时，不能用点运算符（因为点运算符后面总是字符串，所以不会读取 mySymbol 作为标识名所指代的那个值）。

```js
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = "Hello!";

// 第二种写法
let a = {
  [mySymbol]: "Hello!"
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: "Hello!" });

// 以上写法都得到同样结果
a[mySymbol]; // "Hello!"

// 如果用点运算符。。。
a.mySymbol = "Hello!";
a[mySymbol]; // undefined
```

Symbol 类型还可以用于定义一组常量，保证这组常量的值都是不相等的。

```js
const log = {};

log.levels = {
  DEBUG: Symbol("debug"),
  INFO: Symbol("info"),
  WARN: Symbol("warn")
};
console.log(log.levels.DEBUG, "debug message");
console.log(log.levels.INFO, "info message");
```

> 还有一点需要注意，Symbol 值作为属性名时，该属性还是公开属性，不是私有属性。

## 4.消除魔术字符串

魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替。

```js
function getArea(shape, options) {
  let area = 0;

  switch (shape) {
    case "Triangle": // 魔术字符串
      area = 0.5 * options.width * options.height;
      break;
    /* ... more code ... */
  }

  return area;
}

getArea("Triangle", { width: 100, height: 100 }); // 魔术字符串
```

字符串 Triangle 就是一个魔术字符串。它多次出现，与代码形成“强耦合”，不利于将来的修改和维护。

常用的消除魔术字符串的方法，就是把它写成一个变量。

```js
const shapeType = {
  triangle: Symbol()
};

function getArea(shape, options) {
  let area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = 0.5 * options.width * options.height;
      break;
  }
  return area;
}

getArea(shapeType.triangle, { width: 100, height: 100 });
```

## 5.属性名的遍历

Symbol 作为属性名，该属性不会出现在 `for...in`、`for...of` 循环中，也不会被 `Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()` 返回。但是，它也不是私有属性，有一个 `Object.getOwnPropertySymbols` 方法，可以获取指定对象的所有 Symbol 属性名。

`Object.getOwnPropertySymbols` 方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。

```js
const obj = {};
let a = Symbol("a");
let b = Symbol("b");

obj[a] = "Hello";
obj[b] = "World";

const objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols;
// [Symbol(a), Symbol(b)]
```

另一个新的 API，`Reflect.ownKeys` 方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。

```js
let obj = {
  [Symbol("my_key")]: 1,
  enum: 2,
  nonEnum: 3
};

Reflect.ownKeys(obj);
//  ["enum", "nonEnum", Symbol(my_key)]
```

## 6.Symbol.for()，Symbol.keyFor()

有时，我们希望重新使用同一个 Symbol 值，Symbol.for 方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。

```js
let s1 = Symbol.for("foo");
let s2 = Symbol.for("foo");

s1 === s2; // true
```

`Symbol.for()` 与 `Symbol()` 这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。`Symbol.for()` 不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的 key 是否已经存在，如果不存在才会新建一个值。比如，如果你调用 `Symbol.for("cat")` 30 次，每次都会返回同一个 Symbol 值，但是调用 `Symbol("cat")` 30 次，会返回 30 个不同的 Symbol 值。

```js
Symbol.for("bar") === Symbol.for("bar");
// true

Symbol("bar") === Symbol("bar");
// false
```

Symbol.keyFor 方法返回一个已登记的 Symbol 类型值的 key。（一句话：Symbol.keyFor 是用来区分 symbol 是由 `Symbol()` 还是 `Symbol.for()` 生成）

```js
let s1 = Symbol.for("foo");
Symbol.keyFor(s1); // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2); // undefined
```

需要注意的是，Symbol.for 为 Symbol 值登记的名字，是全局环境的，可以在不同的 iframe 或 service worker 中取到同一个值。

```js
iframe = document.createElement("iframe");
iframe.src = String(window.location);
document.body.appendChild(iframe);

iframe.contentWindow.Symbol.for("foo") === Symbol.for("foo");
// true
```

## 7.模块的 Singleton 模式

Singleton 模式指的是调用一个类，任何时候返回的都是同一个实例。

对于 Node 来说，模块文件可以看成是一个类。怎么保证每次执行这个模块文件，返回的都是同一个实例呢？

很容易想到，可以把实例放到顶层对象 global。

```js
// mod.js
function A() {
  this.foo = "hello";
}

if (!global._foo) {
  global._foo = new A();
}

module.exports = global._foo;
```

然后，加载上面的 mod.js。

```js
const a = require("./mod.js");
console.log(a.foo);
```

变量 a 任何时候加载的都是 A 的同一个实例。

但是，这里有一个问题，全局变量 `global._foo` 是可写的，任何文件都可以修改。

```js
global._foo = { foo: "world" };

const a = require("./mod.js");
console.log(a.foo);
```

上面的代码，会使得加载 mod.js 的脚本都失真。

为了防止这种情况出现，我们就可以使用 Symbol。

```js
// mod.js
const FOO_KEY = Symbol.for("foo");

function A() {
  this.foo = "hello";
}

if (!global[FOO_KEY]) {
  global[FOO_KEY] = new A();
}

module.exports = global[FOO_KEY];
```

上面代码中，可以保证 `global[FOO_KEY]` 不会被无意间覆盖，但还是可以被改写。

```js
global[Symbol.for("foo")] = { foo: "world" };

const a = require("./mod.js");
```

如果键名使用 Symbol 方法生成，那么外部将无法引用这个值，当然也就无法改写。

```js
// mod.js
const FOO_KEY = Symbol("foo");

// 后面代码相同 ……
```

上面代码将导致其他脚本都无法引用 FOO_KEY。但这样也有一个问题，就是如果多次执行这个脚本，每次得到的 FOO_KEY 都是不一样的。虽然 Node 会将脚本的执行结果缓存，一般情况下，不会多次执行同一个脚本，但是用户可以手动清除缓存，所以也不是绝对可靠。

```js
var global = {};
const FOO_KEY = Symbol.for("foo");

function A() {
  this.foo = "hello";
}

if (!global[FOO_KEY]) {
  global[FOO_KEY] = new A();
  // 配置属性不可修改
  Object.defineProperty(global, FOO_KEY, {
    configurable: false,
    writable: false
  });
}
console.log(global[FOO_KEY]);
global[FOO_KEY] = { foo: "world" };
console.log(global[FOO_KEY]);
```

## 8.内置的 Symbol 值

除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。

### 8.1.Symbol.iterator

对象的 Symbol.iterator 属性，指向该对象的默认遍历器方法。

```js
const myIterable = {};
myIterable[Symbol.iterator] = function*() {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable]; // [1, 2, 3]
```

对象进行 for...of 循环时，会调用 Symbol.iterator 方法，返回该对象的默认遍历器。

```js
class Collection {
  *[Symbol.iterator]() {
    let i = 0;
    while (this[i] !== undefined) {
      yield this[i];
      ++i;
    }
  }
}

let myCollection = new Collection();
myCollection[0] = 1;
myCollection[1] = 2;

for (let value of myCollection) {
  console.log(value);
}
// 1
// 2
```
