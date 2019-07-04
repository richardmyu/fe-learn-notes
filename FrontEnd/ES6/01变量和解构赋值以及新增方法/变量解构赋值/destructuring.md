# 变量的解构赋值

## 1.数组的解构赋值

### 1.1.基本用法

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为**解构**（Destructuring）。

本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。如果解构不成功，变量的值就等于 undefined。如果是不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。

```js
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo; // 1
bar; // 2
baz; // 3

// 如果解构不成功，变量的值就等于 undefined
let [x, y] = ["a"];
x; // "a"
y; // undefined

let [, , third] = ["foo", "bar", "baz"];
third; // "baz"

let [x, , y] = [1, 2, 3];
x; // 1
y; // 3

let [head, ...tail] = [1, 2, 3, 4];
head; // 1
tail; // [2, 3, 4]

// 不完全解构
let [x, y] = [1, 2, 3];
x; // 1
y; // 2
```

如果等号的右边不是数组（或者严格地说，不是可遍历的结构），那么将会报错。

```js
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
```

上面的语句都会报错，因为等号右边的值，要么转为对象以后不具备 Iterator 接口（前五个表达式），要么本身就不具备 Iterator 接口（最后一个表达式）。

对于 Set 结构，也可以使用数组的解构赋值。

```js
let [x, y, z] = new Set(["a", "b", "c"]);
x; // "a"
```

事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。

```js
// fibs是一个 Generator 函数，原生具有 Iterator 接口
// 解构赋值会依次从这个接口获取值
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

let [first, second, third, fourth, fifth, sixth] = fibs();
sixth; // 5
```

### 1.2.默认值

解构赋值允许指定默认值。注意，ES6 内部使用严格相等运算符（`===`），判断一个位置是否有值。所以，只有当一个数组成员严格等于 undefined，默认值才会生效。

```js
let [foo = true] = [];
foo; // true

let [x, y = "b"] = ["a"]; // x='a', y='b'
let [x, y = "b"] = ["a", undefined]; // x='a', y='b'

// undefined === undefined
let [x = 1] = [undefined];
x; // 1

// null !== undefined
let [x = 1] = [null];
x; // null
```

如果默认值是一个表达式，那么这个表达式是**惰性求值**的，即只有在用到的时候，才会求值。

```js
function f() {
  console.log("aaa");
}

let [x = f()] = [1];
```

默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

```js
let [x = 1, y = x] = []; // x=1; y=1
let [x = 1, y = x] = [2]; // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = []; // ReferenceError: y is not defined
```

## 2.对象的解构赋值

### 2.1.基本用法

```js
let { foo, bar } = { foo: "aaa", bar: "bbb" };
foo; // "aaa"
bar; // "bbb"
```

对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。如果解构失败，变量的值等于 undefined。

```js
let { bar, foo } = { foo: "aaa", bar: "bbb" };
foo; // "aaa"
bar; // "bbb"

let { baz } = { foo: "aaa", bar: "bbb" };
baz; // undefined
```

对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。

```js
// 例一
let { log, sin, cos } = Math;

// 例二
const { log } = console;
log("hello"); // hello
```

如果变量名与属性名不一致，必须写成下面这样。

```js
let { foo: baz } = { foo: "aaa", bar: "bbb" };
baz; // "aaa"

let obj = { first: "hello", last: "world" };
let { first: f, last: l } = obj;
f; // 'hello'
l; // 'world'
```

这实际上说明，对象的解构赋值是下面形式的简写（参见《对象的扩展》一章）。

```js
let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
// （因为同名）简写
let { foo, bar } = { foo: "aaa", bar: "bbb" };
```

也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。

```js
let { foo: baz } = { foo: "aaa", bar: "bbb" };
baz; // "aaa"
foo; // ReferenceError: foo is not defined
```

与数组一样，解构也可以用于嵌套结构的对象。

```js
let obj = {
  p: ["Hello", { y: "World" }]
};

let {
  p: [x, { y }]
} = obj;
x; // "Hello"
y; // "World"
p; // ReferenceError: p is not defined

// 要想 p 也作为赋值变量
let {
  p,
  p: [x, { y }]
} = obj;
x; // "Hello"
y; // "World"
p; // ["Hello", {y: "World"}]
```

如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错。

```js
// TypeError: Cannot destructure property `bar` of 'undefined' or 'null'.
// foo === undefined foo.bar <==> undefiend.bar
let {
  foo: { bar }
} = { baz: "baz" };
```

注意，对象的解构赋值可以取到继承的属性。

```js
const obj1 = {};
const obj2 = { foo: "bar" };
Object.setPrototypeOf(obj1, obj2);

const { foo } = obj1;
foo; // "bar"

const { toString: toS } = Array;
toS; // ƒ toString() { [native code] }
```

### 2.2.默认值

对象的解构也可以指定默认值。默认值生效的条件是，对象的属性值严格等于 undefined。

```js
var { x = 3 } = {};
x; // 3

var { x, y = 5 } = { x: 1 };
x; // 1
y; // 5

var { x: y = 3 } = {};
y; // 3

var { x: y = 3 } = { x: 5 };
y; // 5

var { x = 3 } = { x: null };
x; // null
```

### 2.3.注意点

1. 如果要将一个已经声明的变量用于解构赋值，必须非常小心。

```js
// 错误的写法
let x;
{x} = {x: 1};
// SyntaxError: syntax error
```

上面代码的写法会报错，因为 JavaScript 引擎会将 `{x}` 理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。

```js
// 正确的写法
let x;
({ x } = { x: 1 });
```

2. 解构赋值允许等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式。

```js
// 表达式虽然毫无意义，但是语法是合法的，可以执行
({} = [true, false]);
({} = "abc");
({} = []);
```

3. 由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。

```js
let arr = [1, 2, 3];
let { 0: first, [arr.length - 1]: last } = arr;
first; // 1
last; // 3
```

## 3.字符串的解构赋值

字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

```js
const [a, b, c, d, e] = "hello";
a; // "h"
b; // "e"
c; // "l"
d; // "l"
e; // "o"
```

类似数组的对象都有一个 length 属性，因此还可以对这个属性解构赋值。

```js
let { length: len } = "hello";
len; // 5
```

## 4.数值和布尔值的解构赋值

解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

```js
let { toString: s } = 123;
s === Number.prototype.toString; // true

let { toString: s } = true;
s === Boolean.prototype.toString; // true
```

解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于 undefined 和 null 无法转为对象，所以对它们进行解构赋值，都会报错。

```js
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

## 5.函数参数的解构赋值

函数的参数也可以使用解构赋值。

```js
function add([x, y]) {
  return x + y;
}

add([1, 2]); // 3

[1, 7, 11].map(parseInt);
// [1, NaN, 3]
```

函数参数的解构也可以使用默认值。undefined 就会触发函数参数的默认值。

```js
// 注意以下写法的区别
// 为变量 x 和 y 指定默认值
function move({ x = 0, y = 0 } = {}) {
  return [x, y];
}

move({ x: 3, y: 8 }); // [3, 8]
move({ x: 3 }); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]

// 为函数的参数指定默认值
function move({ x, y } = { x: 0, y: 0 }) {
  return [x, y];
}

move({ x: 3, y: 8 }); // [3, 8]
move({ x: 3 }); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
```

## 6.圆括号问题

解构赋值虽然很方便，但是解析起来并不容易。对于编译器来说，一个式子到底是模式，还是表达式，没有办法从一开始就知道，必须解析到（或解析不到）等号才能知道。

由此带来的问题是，如果模式中出现圆括号怎么处理。ES6 的规则是，只要有可能导致解构的歧义，就不得使用圆括号。

但是，这条规则实际上不那么容易辨别，处理起来相当麻烦。因此，建议只要有可能，就不要在模式中放置圆括号。

### 6.1.不能使用圆括号的情况

1.**变量声明语句**

```js
// 全部报错，变量声明语句，模式不能使用圆括号
let [(a)] = [1];

let {x: (c)} = {};
let ({x: c}) = {};
let {(x: c)} = {};
let {(x): c} = {};

let { o: ({ p: p }) } = { o: { p: 2 } };
```

2.**函数参数**

函数参数也属于变量声明，因此不能带有圆括号。

```js
// 报错
function f([(z)]) { return z; }
// 报错
function f([z,(x)]) { return x; }
```

3.**赋值语句的模式**

```js
// 全部报错
({ p: a }) = { p: 42 };
([a]) = [5];
```

### 6.2.可以使用圆括号的情况

可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号。

```js
[b] = [3]; // 正确
({ p: d } = {}); // 正确
```

## 7.用途

1.**交换变量的值**

```js
let x = 1;
let y = 2;

[x, y] = [y, x];
```

2.**从函数返回多个值**

函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便。

```js
// 返回一个数组

function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();
```

3.**函数参数的定义/函数参数的默认值**

```js
// 参数是一组有次序的值
function f([x, y = 0, z = 0]) {}
f([1, 2, 3]); // 1 2 3
f([1]); // 1 0 0

// 参数是一组无次序的值
function f({ x, y, z }) {}
f({ z: 3, y: 2, x: 1 });
```

4.**提取 JSON 数据**

```js
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```

5.遍历 Map 结构

任何部署了 Iterator 接口的对象，都可以用 `for...of` 循环遍历。Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便。

```js
const map = new Map();
map.set("first", "hello");
map.set("second", "world");

// key 键名  value 键值
for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
```

6.输入模块的指定方法

加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。

`const { SourceMapConsumer, SourceNode } = require("source-map");`
