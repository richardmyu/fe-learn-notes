# 新增方法

## 1.字符串方法

### 1.1.String.fromCodePoint()

ES5 提供 `String.fromCharCode()` 方法，用于从 Unicode 码点返回对应字符，但是这个方法不能识别码点大于 `0xFFFF` 的字符。

```js
String.fromCharCode(0x20bb7);
// "ஷ"

String.fromCharCode(0xbb7);
// "ஷ"
```

`String.fromCharCode()` 不能识别大于 `0xFFFF` 的码点，所以 `0x20BB7` 就发生了溢出，最高位 2 被舍弃了，最后返回码点 `U+0BB7` 对应的字符，而不是码点 `U+20BB7` 对应的字符。

ES6 提供了 `String.fromCodePoint()` 方法，可以识别大于 `0xFFFF` 的字符，弥补了 `String.fromCharCode()` 方法的不足。在作用上，正好与下面的 `codePointAt()` 方法相反。

```js
String.fromCodePoint(0x20bb7);
// "𠮷"
String.fromCodePoint(0x78, 0x1f680, 0x79);
// x🚀y
```

如果 `String.fromCodePoint` 方法有多个参数，则它们会被合并成一个字符串返回。

> 注意，fromCodePoint 方法定义在 String 对象上，而 codePointAt 方法定义在字符串的实例对象上。

### 1.2.String.raw()

~~ES6 还为原生的 String 对象，提供了一个 `raw()` 方法。该方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，往往用于模板字符串的处理方法。~~

`String.raw()` 是一个模板字符串的**标签函数**，是用来获取一个模板字符串的原始字符串的，比如说，占位符（例如 `${foo}`）会被处理为它所代表的其他字符串，而转义字符（例如 `\n`）不会。在大多数情况下, `String.raw()` 是用来处理模版字符串的。不要被复杂的参数要求吓到，因为像所有的标签函数一样，你通常不需要把它看成一个普通函数，你只需要把它放在模板字符串前面就可以了，而不是在它后面加个括号和一堆参数来调用它，引擎会替你去调用它。

`String.raw()` 是唯一一个内置的模板字符串标签函数，因为它太常用了。不过它并没有什么特殊能力，你自己也可以实现一个和它功能一模一样的标签函数。

```js
// 一般用法
String.raw`Hi\n${2 + 3}!`;
// 返回 "Hi\\n5!"
// Hi\n5! Hi 后面的字符不是换行符，\ 和 n 是两个不同的字符

let str = String.raw`Hi\u000A!`;
str; // Hi\u000A! 同上，这里得到的会是 \、u、0、0、0、A 6个字符
str.length; // 9

// 任何类型的转义形式都会失效，保留原样输出，不信你试试 .length

// 另一种使用语法（不常用）
String.raw(callSite, ...substitutions);
// callSite 一个模板字符串的“调用点对象”
// ...substitutions 任意个可选的参数，表示任意个内插表达式对应的值。
```

`String.raw()` 方法可以作为处理模板字符串的基本方法，~~它会将所有变量替换，而且对斜杠进行转义，方便下一步作为字符串来使用。~~

### 1.3.实例方法：codePointAt()

JavaScript 内部，字符以 UTF-16 的格式储存，每个字符固定为 2 个字节。对于那些需要 4 个字节储存的字符（Unicode 码点大于 `0xFFFF` 的字符），JavaScript 会认为它们是两个字符。

```js
var s = "𠮷";

s.length; // 2
s.charAt(0); // �
s.charAt(1); // �
s.charCodeAt(0); // 55362
s.charCodeAt(1); // 57271
s.charCodeAt(2); // NaN
```

上面代码中，汉字“𠮷”（注意，这个字不是“吉祥”的“吉”）的码点是 `0x20BB7`，UTF-16 编码为 `0xD842 0xDFB7`（十进制为 `55362 57271`），需要 4 个字节储存。对于这种 4 个字节的字符，JavaScript 不能正确处理，字符串长度会误判为 2，而且 `charAt()` 方法无法读取整个字符，`charCodeAt()` 方法只能分别返回前两个字节和后两个字节的值。

ES6 提供了 `codePointAt()` 方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点。

```js
s.codePointAt(0); // 134071
s.codePointAt(1); // 57271
s.codePointAt(2); // undefined
```

`codePointAt()` 方法的参数，是字符在字符串中的位置（从 0 开始）。上面代码中，JavaScript 将“𠮷 a”视为三个字符，codePointAt 方法在第一个字符上，正确地识别了“𠮷”，返回了它的十进制码点 134071（即十六进制的 20BB7）。在第二个字符（即“𠮷”的后两个字节），`codePointAt()` 方法的结果与 `charCodeAt()` 方法相同。

> 总之，`codePointAt()` 方法会正确返回 32 位的 UTF-16 字符的码点。对于那些两个字节储存的常规字符，它的返回结果与 `charCodeAt()` 方法相同。

`codePointAt()` 方法返回的是码点的十进制值，如果想要十六进制的值，可以使用 `toString()` 方法转换一下。

```js
let s = "𠮷 a";

s.codePointAt(0).toString(16); // "20bb7"
s.codePointAt(2).toString(16); // "61"
```

你可能注意到了，`codePointAt()` 方法的参数，仍然是不正确的。比如，上面代码中，字符 a 在字符串 s 的正确位置序号应该是 1，但是必须向 `codePointAt()` 方法传入 2。解决这个问题的一个办法是使用 `for...of` 循环，因为它会正确识别 32 位的 UTF-16 字符。

```js
let s = "𠮷a";
for (let ch of s) {
  console.log(ch.codePointAt(0).toString(16));
}
// 20bb7
// 61
```

另一种方法也可以，使用扩展运算符（`...`）进行展开运算。

```js
let arr = [..."𠮷a"]; // arr.length === 2
arr.forEach(ch => console.log(ch.codePointAt(0).toString(16)));
// 20bb7
// 61
```

`codePointAt()` 方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。

```js
function is32Bit(c) {
  return c.codePointAt(0) > 0xffff;
}

is32Bit("𠮷"); // true
is32Bit("a"); // false
```

### 1.4.实例方法：normalize()

许多欧洲语言有语调符号和重音符号。为了表示它们，Unicode 提供了两种方法。一种是直接提供带重音符号的字符，比如 `Ǒ`（`\u01D1`）。另一种是提供合成符号（combining character），即原字符与重音符号的合成，两个字符合成一个字符，比如 `O`（`\u004F`）和 `ˇ`（`\u030C`）合成 `Ǒ`（`\u004F\u030C`）。

这两种表示方法，在视觉和语义上都等价，但是 JavaScript 不能识别。

```js
"\u01D1" === "\u004F\u030C"; //false

"\u01D1".length; // 1
"\u004F\u030C".length; // 2
```

上面代码表示，JavaScript 将合成字符视为两个字符，导致两种表示方法不相等。

ES6 提供字符串实例的 `normalize()` 方法，用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化。

```js
"\u01D1".normalize() === "\u004F\u030C".normalize();
// true
```

normalize 方法可以接受一个参数来指定 normalize 的方式，参数的四个可选值如下。

- NFC，默认参数，表示“标准等价合成”（Normalization Form Canonical Composition），返回多个简单字符的合成字符。所谓“标准等价”指的是视觉和语义上的等价。
  >
- NFD，表示“标准等价分解”（Normalization Form Canonical Decomposition），即在标准等价的前提下，返回合成字符分解的多个简单字符。
  >
- NFKC，表示“兼容等价合成”（Normalization Form Compatibility Composition），返回合成字符。所谓“兼容等价”指的是语义上存在等价，但视觉上不等价，比如“囍”和“喜喜”。（这只是用来举例，normalize 方法不能识别中文。）
  >
- NFKD，表示“兼容等价分解”（Normalization Form Compatibility Decomposition），即在兼容等价的前提下，返回合成字符分解的多个简单字符。

```js
"\u004F\u030C".normalize("NFC").length; // 1
"\u004F\u030C".normalize("NFD").length; // 2
```

不过，normalize 方法目前不能识别三个或三个以上字符的合成。这种情况下，还是只能使用正则表达式，通过 Unicode 编号区间判断。

### 1.5.实例方法：includes(), startsWith(), endsWith()

传统上，JavaScript 只有 indexOf 方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法。

- `includes()`：返回布尔值，表示是否找到了参数字符串。
- `startsWith()`：返回布尔值，表示参数字符串是否在原字符串的头部。
- `endsWith()`：返回布尔值，表示参数字符串是否在原字符串的尾部。

```js
let s = "Hello world!";

s.startsWith("Hello"); // true
s.endsWith("!"); // true
s.includes("o"); // true
```

这三个方法都支持第二个参数，表示开始搜索的位置。

```js
let s = "Hello world!";

s.startsWith("world", 6); // true
s.endsWith("Hello", 5); // true
s.includes("Hello", 6); // false
```

使用第二个参数 n 时，endsWith 的行为与其他两个方法有所不同。它针对前 n 个字符，而其他两个方法针对从第 n 个位置直到字符串结束。

### 1.6.实例方法：repeat()

repeat 方法返回一个新字符串，表示将原字符串重复 n 次。

```js
"x".repeat(3); // "xxx"
"hello".repeat(2); // "hellohello"
"na".repeat(0); // ""
```

参数如果是小数，会被取整。

```js
"na".repeat(2.9); // "nana"
```

如果 repeat 的参数是负数或者 Infinity，会报错。

```js
"na".repeat(Infinity);
// RangeError
"na".repeat(-1);
// RangeError
```

但是，如果参数是 0 到-1 之间的小数，则等同于 0，这是因为会先进行取整运算。0 到-1 之间的小数，取整以后等于-0，repeat 视同为 0。

```js
"na".repeat(-0.9); // ""

// 参数 NaN 等同于 0
"na".repeat(NaN); // ""
// 如果 repeat 的参数是字符串，则会先转换成数字
"na".repeat("na"); // ""
"na".repeat("3"); // "nanana"
```

### 1.7.实例方法：padStart()，padEnd()

ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。`padStart()` 用于头部补全，`padEnd()` 用于尾部补全。

```js
"x".padStart(5, "ab"); // 'ababx'
"x".padStart(4, "ab"); // 'abax'

"x".padEnd(5, "ab"); // 'xabab'
"x".padEnd(4, "ab"); // 'xaba'
```

`padStart()` 和 `padEnd()` 一共接受两个参数，第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串。

如果原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串。

```js
"xxx".padStart(2, "ab"); // 'xxx'
"xxx".padEnd(2, "ab"); // 'xxx'
```

如果用来补全的字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串。

```js
"abc".padStart(10, "0123456789");
// '0123456abc'
```

如果省略第二个参数，默认使用空格补全长度。

```js
"x".padStart(4); // ' x'
"x".padEnd(4); // 'x '
```

`padStart()` 的常见用途是为数值补全指定位数。下面代码生成 10 位的数值字符串。

```js
"1".padStart(10, "0"); // "0000000001"
"12".padStart(10, "0"); // "0000000012"
"123456".padStart(10, "0"); // "0000123456"
```

另一个用途是提示字符串格式。

```js
"12".padStart(10, "YYYY-MM-DD"); // "YYYY-MM-12"
"09-12".padStart(10, "YYYY-MM-DD"); // "YYYY-09-12"
```

### 1.8.实例方法：trimStart()，trimEnd()

ES2019 对字符串实例新增了 `trimStart()` 和 `trimEnd()` 这两个方法。它们的行为与 `trim()` 一致，`trimStart()` 消除字符串头部的空格，`trimEnd()` 消除尾部的空格。它们返回的都是新字符串，不会修改原始字符串。

```js
const s = " abc ";

s.trim(); // "abc"
s.trimStart(); // "abc "
s.trimEnd(); // " abc"
```

上面代码中，`trimStart()` 只消除头部的空格，保留尾部的空格。`trimEnd()` 也是类似行为。

除了空格键，这两个方法对字符串头部（或尾部）的 tab 键、换行符等不可见的空白符号也有效。

浏览器还部署了额外的两个方法，`trimLeft()` 是 `trimStart()` 的别名，`trimRight()` 是 `trimEnd()` 的别名。

### 1.9.实例方法：matchAll()

如果一个正则表达式在字符串里面有多个匹配，现在一般使用 g 修饰符或 y 修饰符，在循环里面逐一取出。

```js
var regex = /t(e)(st(\d?))/g;
var string = "test1test2test3";

var matches = [];
var match;
while ((match = regex.exec(string))) {
  matches.push(match);
}

matches;
// [
//   ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"],
//   ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"],
//   ["test3", "e", "st3", "3", index: 10, input: "test1test2test3"]
// ]
```

`matchAll()` 方法返回一个包含所有匹配正则表达式及分组捕获结果的迭代器（不可重用，结果耗尽需要再次调用方法，获取一个新的迭代器）。

```js
const string = "test1test2test3";

// g 修饰符加不加都可以
const regex = /t(e)(st(\d?))/g;

for (const match of string.matchAll(regex)) {
  console.log(match);
}
// ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"]
// ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"]
// ["test3", "e", "st3", "3", index: 10, input: "test1test2test3"]
```

遍历器转为数组是非常简单的，使用 `...` 运算符和 `Array.from` 方法就可以了。

```js
// 转为数组方法一
[...string.matchAll(regex)];

// 转为数组方法二
Array.from(string.matchAll(regex));
```

## 2.对象方法

### 2.1.Object.is()

ES5 比较两个值是否相等，只有两个运算符：相等运算符（`==`）和严格相等运算符（`===`）。它们都有缺点，前者会自动转换数据类型，后者的 `NaN` 不等于自身，以及 `+0` 等于 `-0`。JavaScript 缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等。

ES6 提出“Same-value equality”（同值相等）算法，用来解决这个问题。`Object.is` 就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（`===`）的行为基本一致。不同之处只有两个：一是 `+0` 不等于 `-0`，二是 `NaN` 等于自身。

```js
Object.is("foo", "foo");
// true
Object.is({}, {});
// false

+0 === -0; //true
NaN === NaN; // false

Object.is(+0, -0); // false
Object.is(NaN, NaN); // true
```

ES5 可以通过下面的代码，部署 `Object.is`。

```js
Object.defineProperty(Object, "is", {
  value: function(x, y) {
    if (x === y) {
      // 针对+0 不等于 -0的情况
      return x !== 0 || 1 / x === 1 / y;
    }
    // 针对NaN的情况
    return x !== x && y !== y;
  },
  configurable: true,
  enumerable: false,
  writable: true
});
```

### 2.2.Object.assign()

#### 2.2.1.基本用法

Object.assign 方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象的属性。

```js
const target = { a: 1 };

const source1 = { b: 2 };
const source2 = { b: 3 };

Object.assign(target, source1, source2);
target; // {a:1, b:3}
```

如果只有一个参数，Object.assign 会直接返回该参数。

```js
const obj = { a: 1 };
Object.assign(obj) === obj; // true
```

如果该参数不是对象，则会先转成对象，然后返回。

`typeof Object.assign(2) // "object"`

由于 `undefined` 和 `null` 无法转成对象，所以如果它们作为参数，就会报错。

```js
Object.assign(undefined); // 报错
Object.assign(null); // 报错
```

如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。首先，这些参数都会转成对象，如果无法转成对象，就会跳过。

```js
let obj = { a: 1 };
Object.assign(obj, undefined) === obj; // true
Object.assign(obj, null) === obj; // true
```

其他类型的值，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。这是因为只有字符串的包装对象，会产生可枚举属性。

```js
const v1 = "abc";
const v2 = true;
const v3 = 10;

const obj = Object.assign({}, v1, v2, v3);
obj; // { "0": "a", "1": "b", "2": "c" }

// 只有字符串的包装对象，会产生可枚举属性
Object(true); // {[[PrimitiveValue]]: true}
Object(10); //  {[[PrimitiveValue]]: 10}
Object("abc"); // {0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"}
```

布尔值、数值、字符串分别转成对应的包装对象，可以看到它们的原始值都在包装对象的内部属性 `[[PrimitiveValue]]` 上面，这个属性是不会被 `Object.assign` 拷贝的。只有字符串的包装对象，会产生可枚举的实义属性，那些属性则会被拷贝。

Object.assign 拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性。

```js
Object.assign(
  { b: "c" },
  Object.defineProperty({}, "invisible", {
    enumerable: false,
    value: "hello"
  })
);
// { b: 'c' }
```

属性名为 Symbol 值的属性，也会被 `Object.assign` 拷贝。

```js
Object.assign({ a: "b" }, { [Symbol("c")]: "d" });
// { a: 'b', Symbol(c): 'd' }
```

#### 2.2.2.注意点

1.**浅拷贝**

`Object.assign` 方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。

```js
const obj1 = { a: { b: 1 } };
const obj2 = Object.assign({}, obj1);

obj1.a.b = 2;
obj2.a.b; // 2
```

2.**同名属性的替换**

对于这种嵌套的对象，一旦遇到同名属性，`Object.assign` 的处理方法是替换，而不是添加。

```js
const target = { a: { b: "c", d: "e" } };
const source = { a: { b: "hello" } };
Object.assign(target, source);
// { a: { b: 'hello' } }
```

3.**数组的处理**

Object.assign 可以用来处理数组，但是会把数组视为对象。

```js
Object.assign([1, 2, 3], [4, 5]);
// [4, 5, 3]
```

Object.assign 把数组视为属性名为 0、1、2 的对象，因此源数组的 0 号属性 4 覆盖了目标数组的 0 号属性 1。

4.**取值函数的处理**

Object.assign 只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。

```js
const source = {
  get foo() {
    return 1;
  }
};

Object.assign({}, source);
// { foo: 1 }
```

#### 2.2.3.常见用途

1.**为对象添加属性**

```js
class Point {
  constructor(x, y) {
    Object.assign(this, { x, y });
  }
}
```

2.**为对象添加方法**

```js
Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {
    ···
  },
  anotherMethod() {
    ···
  }
});

// 等同于下面的写法
SomeClass.prototype.someMethod = function (arg1, arg2) {
  ···
};
SomeClass.prototype.anotherMethod = function () {
  ···
};
```

3.**克隆对象**

```js
function clone(origin) {
  return Object.assign({}, origin);
}
```

不过，采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。如果想要保持继承链，可以采用下面的代码。

```js
function clone(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}
```

4.**合并多个对象**

将多个对象合并到某个对象。

`const merge = (target, ...sources) => Object.assign(target, ...sources);`

如果希望合并后返回一个新对象，可以改写上面函数，对一个空对象合并。

`const merge = (...sources) => Object.assign({}, ...sources);`

5.**为属性指定默认值**

```js
const DEFAULTS = {
  logLevel: 0,
  outputFormat: "html"
};

function processContent(options) {
  options = Object.assign({}, DEFAULTS, options);
  console.log(options);
  // ...
}
```

### 2.3.Object.getOwnPropertyDescriptors()

ES5 的 `Object.getOwnPropertyDescriptor()` 方法会返回某个对象属性的描述对象（descriptor）。ES2017 引入了 `Object.getOwnPropertyDescriptors()` 方法，返回指定对象所有自身属性（非继承属性）的描述对象。

```js
const obj = {
  foo: 123,
  get bar() {
    return "abc";
  }
};

Object.getOwnPropertyDescriptors(obj);
// {
//   foo:{
//     value: 123,
//     writable: true,
//     enumerable: true,
//     configurable: true
//   },
//   bar:{
//     get: [Function: get bar],
//     set: undefined,
//     enumerable: true,
//     configurable: true
//   }
// }
```

该方法的实现非常容易。

```js
function getOwnPropertyDescriptors(obj) {
  const result = {};
  for (let key of Reflect.ownKeys(obj)) {
    result[key] = Object.getOwnPropertyDescriptor(obj, key);
  }
  return result;
}
```

该方法的引入目的，主要是为了解决 `Object.assign()` 无法正确拷贝 get 属性和 set 属性的问题。

```js
const source = {
  set foo(value) {
    console.log(value);
  }
};

const target1 = {};
Object.assign(target1, source);

Object.getOwnPropertyDescriptor(target1, "foo");
// { value: undefined,
//   writable: true,
//   enumerable: true,
//   configurable: true }

// Object.getOwnPropertyDescriptors() + Object.defineProperties()
const source = {
  set foo(value) {
    console.log(value);
  }
};

var target = Object.defineProperties(
  {},
  Object.getOwnPropertyDescriptors(source)
);
Object.getOwnPropertyDescriptor(target, "foo");
// {
//   get: undefined,
//   set: [Function: set foo],
//   enumerable: true,
//   configurable: true
// }

const shallowMerge = (target, source) =>
  Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
```

`Object.getOwnPropertyDescriptors()` 方法的另一个用处，是配合 `Object.create()` 方法，将对象属性克隆到一个新对象。这属于浅拷贝。

```js
const clone = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
);

// 或者

const shallowClone = obj =>
  Object.create(
    Object.getPrototypeOf(obj),
    Object.getOwnPropertyDescriptors(obj)
  );
```

另外，`Object.getOwnPropertyDescriptors()` 方法可以实现一个对象继承另一个对象。以前，继承另一个对象，常常写成下面这样。

```js
const obj = {
  __proto__: prot,
  foo: 123
};
```

ES6 规定 `__proto__` 只有浏览器要部署，其他环境不用部署。如果去除 `__proto__`，上面代码就要改成下面这样。

```js
const obj = Object.create(prot);
obj.foo = 123;

// 或者

const obj = Object.assign(Object.create(prot), {
  foo: 123
});
```

有了 `Object.getOwnPropertyDescriptors()`，我们就有了另一种写法。

```js
const obj = Object.create(
  prot,
  Object.getOwnPropertyDescriptors({
    foo: 123
  })
);
```

`Object.getOwnPropertyDescriptors()` 也可以用来实现 Mixin（混入）模式。

```js
let mix = object => ({
  with: (...mixins) =>
    mixins.reduce(
      (c, mixin) => Object.create(c, Object.getOwnPropertyDescriptors(mixin)),
      object
    )
});

// multiple mixins example
let a = { a: "a" };
let b = { b: "b" };
let c = { c: "c" };
let d = mix(c).with(a, b);

d.c; // "c"
d.b; // "b"
d.a; // "a"
```

### 2.4.`__proto__` 属性，Object.setPrototypeOf()，Object.getPrototypeOf()

JavaScript 语言的对象继承是通过原型链实现的。ES6 提供了更多原型对象的操作方法。

#### 2.4.1.`__proto__` 属性

`_proto__` 属性（前后各两个下划线），用来读取或设置当前对象的 prototype 对象。目前，所有浏览器（包括 IE11）都部署了这个属性。

该属性没有写入 ES6 的正文，而是写入了附录，原因是 `__proto__` 前后的双下划线，说明它本质上是一个内部属性，而不是一个正式的对外的 API，只是由于浏览器广泛支持，才被加入了 ES6。标准明确规定，只有浏览器必须部署这个属性，其他运行环境不一定需要部署，而且新的代码最好认为这个属性是不存在的。因此，无论从语义的角度，还是从兼容性的角度，都不要使用这个属性，而是使用下面的 `Object.setPrototypeOf()`（写操作）、`Object.getPrototypeOf()`（读操作）、`Object.create()`（生成操作）代替。

实现上，`__proto__` 调用的是 `Object.prototype.__proto__`，具体实现如下。

```js
Object.defineProperty(Object.prototype, "__proto__", {
  get() {
    let _thisObj = Object(this);
    return Object.getPrototypeOf(_thisObj);
  },
  set(proto) {
    if (this === undefined || this === null) {
      throw new TypeError();
    }
    if (!isObject(this)) {
      return undefined;
    }
    if (!isObject(proto)) {
      return undefined;
    }
    let status = Reflect.setPrototypeOf(this, proto);
    if (!status) {
      throw new TypeError();
    }
  }
});

function isObject(value) {
  return Object(value) === value;
}
```

如果一个对象本身部署了 `__proto__` 属性，该属性的值就是对象的原型。

```js
Object.getPrototypeOf({ __proto__: null });
// null
```

#### 2.4.2.Object.setPrototypeOf()

Object.setPrototypeOf 方法的作用与 `__proto__` 相同，用来设置一个对象的 prototype 对象，返回参数对象本身。它是 ES6 正式推荐的设置原型对象的方法。

```js
// 格式
Object.setPrototypeOf(object, prototype);

// 用法
const o = Object.setPrototypeOf({}, null);
```

如果第一个参数不是对象，会自动转为对象。但是由于返回的还是第一个参数，所以这个操作不会产生任何效果。

```js
Object.setPrototypeOf(1, {}) === 1; // true
Object.setPrototypeOf("foo", {}) === "foo"; // true
Object.setPrototypeOf(true, {}) === true; // true
```

> 由于 undefined 和 null 无法转为对象，所以如果第一个参数是 undefined 或 null，就会报错。

#### 2.4.3.Object.getPrototypeOf()

该方法与 Object.setPrototypeOf 方法配套，用于读取一个对象的原型对象。

```js
function Rectangle() {}

const rec = new Rectangle();

Object.getPrototypeOf(rec) === Rectangle.prototype;
// true

Object.setPrototypeOf(rec, Object.prototype);
Object.getPrototypeOf(rec) === Rectangle.prototype;
// false
```

如果参数不是对象，会被自动转为对象。如果参数是 undefined 或 null，它们无法转为对象，所以会报错。

```js
Object.getPrototypeOf(1);
// Number {[[PrimitiveValue]]: 0}

Object.getPrototypeOf("foo");
// String {length: 0, [[PrimitiveValue]]: ""}

Object.getPrototypeOf(true);
// Boolean {[[PrimitiveValue]]: false}

Object.getPrototypeOf(1) === Number.prototype; // true
Object.getPrototypeOf("foo") === String.prototype; // true
Object.getPrototypeOf(true) === Boolean.prototype; // true
```

### 2.5.Object.keys()，Object.values()，Object.entries()

#### 2.5.1.Object.keys()

ES5 引入了 Object.keys 方法，返回一个成员是参数 _对象自身_ 的（不含继承的）所有 _可遍历_（enumerable）属性的 _键名数组_。

```js
var obj = { foo: "bar", baz: 42 };
Object.keys(obj);
// ["foo", "baz"]
```

ES2017 引入了跟 Object.keys 配套的 Object.values 和 Object.entries，作为遍历一个对象的补充手段，供 for...of 循环使用。

#### 2.5.2.Object.values()

Object.values 方法返回一个，成员是参数 _对象自身_ 的（不含继承的）所有 _可遍历_（enumerable）属性的 _键值数组_。

```js
const obj = { foo: "bar", baz: "O(∩_∩)O" };
Object.values(obj); // ["bar", "O(∩_∩)O"]

const obj = { 100: "a", 2: "b", 7: "c" };
Object.values(obj);
// ["b", "c", "a"]
```

Object.values 会过滤属性名为 Symbol 值的属性。

```js
Object.values({ [Symbol()]: 123, foo: "abc" });
// ['abc']
```

如果参数不是对象，Object.values 会先将其转为对象。由于数值和布尔值的包装对象，都不会为实例添加非继承的属，所以，Object.values 会返回空数组；而字符串会返回各个字符组成的一个数组。

```js
Object.values("foo");
// ['f', 'o', 'o']

Object.values(42); // []
```

#### 2.5.3.Object.entries()

`Object.entries()` 方法返回一个数组，成员是参数 _对象自身_ 的（不含继承的）所有 _可遍历_（enumerable）属性的 _键值对数组_。

```js
const obj = { foo: "bar", baz: 42 };
Object.entries(obj);
// [ ["foo", "bar"], ["baz", 42] ]
```

除了返回值不一样，该方法的行为与 Object.values 基本一致（忽略是 Symbol 值的属性名，转换费对象参数。。。）。

Object.entries 方法的另一个用处是，将 _对象转为真正的 Map 结构_。

```js
const obj = { foo: "bar", baz: 42 };
const map = new Map(Object.entries(obj));
map; // Map { foo: "bar", baz: 42 }
```

自己实现 Object.entries 方法，非常简单。

```js
// Generator函数的版本
function* entries(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

// 非Generator函数的版本
function entries(obj) {
  let arr = [];
  for (let key of Object.keys(obj)) {
    arr.push([key, obj[key]]);
  }
  return arr;
}
```

#### 2.6.Object.fromEntries()

`Object.fromEntries()` 方法是 `Object.entries()` 的逆操作，用于将一个键值对数组转为对象。

```js
Object.fromEntries([["foo", "bar"], ["baz", 42]]);
// { foo: "bar", baz: 42 }
```

该方法的主要目的，是将 *键值对的数据结构还原为对象*，因此特别适合将 Map 结构转为对象。

```js
// 例一
const entries = new Map([["foo", "bar"], ["baz", 42]]);

Object.fromEntries(entries);
// { foo: "bar", baz: 42 }

// 例二
const map = new Map().set("foo", true).set("bar", false);
Object.fromEntries(map);
// { foo: true, bar: false }
```

该方法的一个用处是配合 URLSearchParams 对象，将查询字符串转为对象。

```js
Object.fromEntries(new URLSearchParams("foo=bar&baz=qux"));
// { foo: "bar", baz: "qux" }
```
