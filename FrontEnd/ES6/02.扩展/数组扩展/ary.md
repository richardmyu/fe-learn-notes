# 数组的扩展

## 1.扩展运算符

### 1.1.含义

扩展运算符（spread）是三个点（`...`），将一个数组转为用逗号分隔的参数序列。该运算符主要用于函数调用。

```js
console.log(...[1, 2, 3]);
// 1 2 3

function push(array, ...items) {
  array.push(...items);
}
```

扩展运算符与正常的函数参数可以结合使用，非常灵活。

```js
function f(v, w, x, y, z) {}
const args = [0, 1];
f(-1, ...args, 2, ...[3]);
```

扩展运算符后面还可以放置表达式。

```js
const arr = [...(x > 0 ? ["a"] : []), "b"];
```

如果扩展运算符后面是一个空数组，则不产生任何效果。

```js
[...[], 1];
// [1]
```

注意，只有函数调用时，扩展运算符才可以放在圆括号中，否则会报错。

```js
(...[1, 2])
// Uncaught SyntaxError: Unexpected number

console.log((...[1, 2]))
// Uncaught SyntaxError: Unexpected number

console.log(...[1, 2])
// 1 2
```

### 1.2.替代函数的 apply 方法

由于扩展运算符可以展开数组，所以不再需要 apply 方法，将数组转为函数的参数了。

```js
// ES5 的写法
function f(x, y, z) {
  // ...
}
var args = [0, 1, 2];
f.apply(null, args);

// ES6的写法
function f(x, y, z) {
  // ...
}
let args = [0, 1, 2];
f(...args);

// ES5 的写法
Math.max.apply(null, [14, 3, 77]);

// ES6 的写法
Math.max(...[14, 3, 77]);

// 等同于
Math.max(14, 3, 77);
```

将一个数组添加到另一个数组的尾部（ES5 中，push 方法的参数不能是数组）。

```js
// ES5的 写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);

// ES6 的写法
let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];
arr1.push(...arr2);
```

### 1.3.扩展运算符的应用

#### 1.3.1.复制数组

扩展运算符提供了复制数组的简便写法。

```js
const a1 = [1, 2];
// 写法一
const a2 = [...a1];
// 写法二
const [...a2] = a1;
```

#### 1.3.2.合并数组

扩展运算符提供了数组合并的新写法。

```js
const arr1 = ["a", "b"];
const arr2 = ["c"];
const arr3 = ["d", "e"];

// ES5 的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6 的合并数组
[...arr1, ...arr2, ...arr3];
// [ 'a', 'b', 'c', 'd', 'e' ]
```

#### 1.3.3.与解构赋值结合

扩展运算符可以与解构赋值结合起来，用于生成数组。如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。

```js
// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list
```

#### 1.3.4.字符串

扩展运算符还可以将字符串转为真正的数组。有一个重要的好处，那就是能够正确识别四个字节的 Unicode 字符。

```js
[..."hello"];
// [ "h", "e", "l", "l", "o" ]

'x\uD83D\uDE80y'.length // 4
[...'x\uD83D\uDE80y'].length // 3

let str = 'x\uD83D\uDE80y';

str.split('').reverse().join('')
// 'y\uDE80\uD83Dx'

[...str].reverse().join('')
// 'y\uD83D\uDE80x'
```

#### 1.3.5.实现了 Iterator 接口的对象

任何定义了遍历器（Iterator）接口的对象，都可以用扩展运算符转为真正的数组。

```js
let nodeList = document.querySelectorAll("div");
let array = [...nodeList];
```

对于那些没有部署 Iterator 接口的类似数组的对象，扩展运算符就无法将其转为真正的数组。

```js
let arrayLike = {
  "0": "a",
  "1": "b",
  "2": "c",
  length: 3
};

// TypeError: Cannot spread non-iterable object.
let arr = [...arrayLike];
```

#### 1.3.6.Map 和 Set 结构，Generator 函数

扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符，比如 Map 结构。

```js
let map = new Map([[1, "one"], [2, "two"], [3, "three"]]);

let arr = [...map.keys()]; // [1, 2, 3]
```

Generator 函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。

```js
const go = function*() {
  yield 1;
  yield 2;
  yield 3;
};

[...go()]; // [1, 2, 3]
```

如果对没有 Iterator 接口的对象，使用扩展运算符，将会报错。

```js
const obj = { a: 1, b: 2 };
let arr = [...obj]; // TypeError: Cannot spread non-iterable object
```

## 2.Array.from()

Array.from 方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。

```js
let arrayLike = {
  "0": "a",
  "1": "b",
  "2": "c",
  length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```

如果参数是一个真正的数组，Array.from 会返回一个一模一样的新数组。

```js
Array.from([1, 2, 3]);
// [1, 2, 3]
```

扩展运算符背后调用的是遍历器接口（Symbol.iterator），如果一个对象没有部署这个接口，就无法转换。Array.from 方法还支持类似数组的对象。所谓类似数组的对象，本质特征只有一点，即必须有 length 属性。因此，任何有 length 属性的对象，都可以通过 Array.from 方法转为数组，而此时扩展运算符就无法转换。

Array.from 还可以接受第二个参数，作用类似于数组的 map 方法，用来对每个元素进行处理，将处理后的值放入返回的数组。

```js
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], x => x * x);
// [1, 4, 9]
```

数组中布尔值为 false 的成员转为 0。

```js
Array.from([1, , 2, , 3], n => n || 0);
// [1, 0, 2, 0, 3]
```

> 如果 map 函数里面用到了 this 关键字，还可以传入 Array.from 的第三个参数，用来绑定 this。

`Array.from()` 的另一个应用是，将字符串转为数组，然后返回字符串的长度。因为它能正确处理各种 Unicode 字符，可以避免 JavaScript 将大于 `\uFFFF` 的 Unicode 字符，算作两个字符的 bug。

```js
function countSymbols(string) {
  return Array.from(string).length;
}
```

## 3.Array.of()

Array.of 方法用于将一组值，转换为数组。

```js
Array.of(3, 11, 8); // [3,11,8]
Array.of(3); // [3]
Array.of(3).length; // 1
```

这个方法的主要目的，是弥补数组构造函数 Array()的不足。因为参数个数的不同，会导致 Array()的行为有差异。

```js
Array(); // []
Array(3); // [, , ,]
Array(3, 11, 8); // [3, 11, 8]
```

Array.of 基本上可以用来替代 `Array()` 或 `new Array()`，并且不存在由于参数不同而导致的重载。它的行为非常统一。Array.of 总是返回参数值组成的数组。如果没有参数，就返回一个空数组。

## 4.数组实例的 copyWithin()

数组实例的 copyWithin()方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。

`Array.prototype.copyWithin(target, start = 0, end = this.length)`

它接受三个参数。

- target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
  >
- start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
  >
- end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。

这三个参数都应该是数值，如果不是，会自动转为数值。

```js
[1, 2, 3, 4, 5].copyWithin(0, 3);
// [4, 5, 3, 4, 5]
```

## 5.数组实例的 find() 和 findIndex()

数组实例的 find 方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为 true 的成员，然后返回该成员。如果没有符合条件的成员，则返回 undefined。

```js
[1, 4, -5, 10].find(n => n < 0);
// -5
```

数组实例的 findIndex 方法的用法与 find 方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。

```js
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}); // 2
```

这两个方法都可以接受第二个参数，用来绑定回调函数的 this 对象。

```js
function f(v) {
  return v > this.age;
}
let person = { name: "John", age: 20 };
[10, 12, 26, 15].find(f, person); // 26
```

另外，这两个方法都可以发现 NaN，弥补了数组的 indexOf 方法的不足。

```js
[NaN]
  .indexOf(NaN)
  // -1

  [NaN].findIndex(y => Object.is(NaN, y));
// 0
```

## 6.数组实例的 fill()

fill 方法使用给定值，填充一个数组。

```js
["a", "b", "c"].fill(7);
// [7, 7, 7]

new Array(3).fill(7);
// [7, 7, 7]
```

fill 方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。

```js
["a", "b", "c"].fill(7, 1, 2);
// ['a', 7, 'c']
```

注意，如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。

```js
let arr = new Array(3).fill({ name: "Mike" });
arr[0].name = "Ben";
arr;
// [{name: "Ben"}, {name: "Ben"}, {name: "Ben"}]

let arr = new Array(3).fill([]);
arr[0].push(5);
arr;
// [[5], [5], [5]]
```

## 7.数组实例的 entries()，keys() 和 values()

ES6 提供三个新的方法 —— `entries()`，`keys()` 和 `values()` —— 用于遍历数组。它们都返回一个遍历器对象，可以用 for...of 循环进行遍历，唯一的区别是 `keys()` 是对键名的遍历、`values()` 是对键值的遍历，`entries()` 是对键值对的遍历。

```js
for (let index of ["a", "b"].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ["a", "b"].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ["a", "b"].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

如果不使用 for...of 循环，可以手动调用遍历器对象的 next 方法，进行遍历。

```js
let letter = ["a", "b", "c"];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']
```

## 8.数组实例的 includes()

Array.prototype.includes 方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的 includes 方法类似。ES2016 引入了该方法。

```js
[1, 2, 3].includes(2); // true
[(1, 2, 3)].includes(4); // false
[(1, 2, NaN)].includes(NaN); // true
```

该方法的第二个参数表示搜索的起始位置，默认为 0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为 3），则会重置为从 0 开始。

```js
[1, 2, 3].includes(3, 3); // false
[1, 2, 3].includes(3, -1); // true
[1, 2, 3].includes(3, -4); // true
[1, 2, 3].includes(3, 0); // true
```

没有该方法之前，我们通常使用数组的 indexOf 方法，检查是否包含某个值。

```js
if (arr.indexOf(el) !== -1) {
  // ...
}
```

indexOf 方法有两个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于 -1，表达起来不够直观。二是，它内部使用严格相等运算符（`===`）进行判断，这会导致对 NaN 的误判。

```js
[NaN].indexOf(NaN);
// -1
```

includes 使用的是不一样的判断算法，就没有这个问题。

```js
[NaN].includes(NaN);
// true
```

## 9.数组实例的 flat()，flatMap()

数组的成员有时还是数组，Array.prototype.flat()用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。

```js
[1, 2, [3, 4]].flat();
// [1, 2, 3, 4]
```

`flat()` 默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将 `flat()` 方法的参数写成一个整数，表示想要拉平的层数，默认为 1。

```js
[1, 2, [3, [4, 5]]].flat()[
  // [1, 2, 3, [4, 5]]

  (1, 2, [3, [4, 5]])
].flat(2);
// [1, 2, 3, 4, 5]
```

如果不管有多少层嵌套，都要转成一维数组，可以用 Infinity 关键字作为参数。

```js
[1, [2, [3]]].flat(Infinity);
// [1, 2, 3]
```

如果原数组有空位，`flat()`方法会跳过空位。

```js
[1, 2, , 4, 5].flat();
// [1, 2, 4, 5]
```

`flatMap()` 方法对原数组的每个成员执行一个函数（相当于执行 `Array.prototype.map()`），然后对返回值组成的数组执行 `flat()` 方法。该方法返回一个新数组，不改变原数组。

```js
[2, 3, 4].flatMap(x => [x, x * 2]);
// [2, 4, 3, 6, 4, 8]
// 相当于
[2, 3, 4].map(x => [x, x * 2]).flat();
```

`flatMap()` 只能展开一层数组。

```js
// 相当于 [[[2]], [[4]], [[6]], [[8]]].flat()
[1, 2, 3, 4].flatMap(x => [[x * 2]]);
// [[2], [4], [6], [8]]
```

`flatMap()` 方法的参数是一个遍历函数，该函数可以接受三个参数，分别是当前数组成员、当前数组成员的位置（从零开始）、原数组。

```js
arr.flatMap(function callback(currentValue[, index[, array]]) {
  // ...
}[, thisArg])
```

`flatMap()` 方法还可以有第二个参数，用来绑定遍历函数里面的 this。

## 10.数组的空位

数组的空位指，数组的某一个位置没有任何值。比如，Array 构造函数返回的数组都是空位。

`Array(3) // [, , ,]`

注意，空位不是 undefined，一个位置的值等于 undefined，依然是有值的。空位是没有任何值，in 运算符可以说明这一点。

```js
0 in [undefined, undefined, undefined]; // true
0 in [, , ,]; // false
```

ES5 对空位的处理，已经很不一致了，大多数情况下会忽略空位。

- `forEach()`, `filter()`, `reduce()`, `every()` 和 `some()` 都会跳过空位。
  >
- `map()` 会跳过空位，但会保留这个值
  >
- `join()` 和 `toString()` 会将空位视为 undefined，而 undefined 和 null 会被处理成空字符串。

ES6 则是明确将空位转为 undefined。

Array.from 方法会将数组的空位，转为 undefined，也就是说，这个方法不会忽略空位。

```js
Array.from(["a", , "b"]);
// [ "a", undefined, "b" ]
```

扩展运算符（`...`）也会将空位转为 undefined。

```js
[...["a", , "b"]];
// [ "a", undefined, "b" ]
```

`copyWithin()` 会连空位一起拷贝。

`[,'a','b',,].copyWithin(2,0) // [,"a",,"a"]`
`fill()` 会将空位视为正常的数组位置。

`new Array(3).fill('a') // ["a","a","a"]`

for...of 循环也会遍历空位。

```js
let arr = [, ,];
for (let i of arr) {
  console.log(1);
}
// 1
// 1
```

`entries()`、`keys()`、`values()`、`find()` 和 `findIndex()` 会将空位处理成 undefined。

```js
// entries()
[...[,'a'].entries()] // [[0,undefined], [1,"a"]]

// keys()
[...[,'a'].keys()] // [0,1]

// values()
[...[,'a'].values()] // [undefined,"a"]

// find()
[,'a'].find(x => true) // undefined

// findIndex()
[,'a'].findIndex(x => true) // 0
```
