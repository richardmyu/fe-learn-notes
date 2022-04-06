# String 类型

字符串就是零个或多个排在一起的字符，放在单引号或双引号之中。

## 1.`length` 属性

1).string.length

`string.length` 属性是一个只读的整数，指明指定字符串中的字符个数。字符串的 `length` 属性不会在 `for-in` 循环中枚举，也不可用通过 `delete` 操作符删除。

```js
var str = "明月几时有";
str.length; //5
// 操作 length 不起作用，但是也不报错
str.length = 2;
str.length; //5

("use strict");
var str = "明月几时有";
str.length; //5
str.length = 2;
// 但是严格模式下，会报错的
str.length;
//TypeError: Cannot assign to read only property 'length' of string '明月几时有'
```

字符串可以被视为字符数组，因此可以使用数组的方括号运算符，用来返回某个位置的字符（位置编号从 0 开始）。如果方括号中的数字超过字符串的长度，或者方括号中根本不是数字，则返回 `undefined`。

> 任何字符串的长度都可以通过访问其 `length` 属性取得。如果字符中包含双字节字符，那么 `length` 属性可能不会精确返回字符数目。

## 2. 字符字面量

`String` 类型用于表示由零个或多个 16 位 `Unicode` 字符组成的字符序列，即字符串。如果要在单引号字符串的内部，使用单引号，就必须在内部的单引号前面加上反斜杠，用来转义。

> 由于 HTML 语言的属性值使用双引号，所以很多项目约定 JavaScript 语言的字符串只使用单引号。

字符串默认只能写在一行内，分成多行将会报错。如果长字符串必须分成多行，可以在每一行的尾部使用反斜杠。但是，输出的时候还是单行，效果与写在同一行完全一样。注意，反斜杠的后面必须是换行符，而不能有其他字符（比如空格），否则会报错。

```js
var str='a
b
c';
str;
//SyntaxError: Invalid or unexpected token

var str='a \
b \
c';

str; //a b c
```

连接运算符（`+`）可以连接多个单行字符串，将长字符串拆成多行书写，输出的时候也是单行。

如果想输出多行字符串，有一种利用多行注释的变通方法。

```js
(function() {
  /*
  line 1
  line 2
  line 3
  */
}
  .toString()
  .split("\n")
  .slice(1, -1)
  .join("\n"));
//   /*
//   line 1
//   line 2
//   line 3
//   */
```

反斜杠（`\`）在字符串内有特殊含义，用来表示一些特殊字符，所以又称为转义符。

`String` 类型包含一些特殊的字符字面量，也叫**转义序列**，用于表示非打印字符或者有其他用途的字符：

| 字面量 |          含义          |
| :----: | :--------------------: |
|  `\0`  |     null(`\u0000`)     |
|  `\b`  |   后退键（`\u0008`）   |
|  `\f`  |   换页符（`\u000C`）   |
|  `\n`  |   换行符（`\u000A`）   |
|  `\r`  |   回车键（`\u000D`）   |
|  `\t`  |   制表符（`\u0009`）   |
|  `\v`  | 垂直制表符（`\u000B`） |
|  `\'`  |   单引号（`\u0027`）   |
|  `\"`  |   双引号（`\u0022`）   |
|  `\\`  |   反斜杠（`\u005C`）   |

这些字面量可以出现在字符串中的任何位置，而且也将被作为一个字符来解析。

斜杠还有三种特殊用法。

（1）`\HHH`

反斜杠后面紧跟三个八进制数（`000` 到 `377`），代表一个字符。`HHH` 对应该字符的 `Unicode` 码点，比如 `\251` 表示版权符号。显然，这种方法只能输出 256 种字符。

（2）`\xHH`

`\x` 后面紧跟两个十六进制数（`00` 到 `FF`），代表一个字符。`HH` 对应该字符的 `Unicode` 码点，比如 `\xA9` 表示版权符号。这种方法也只能输出 256 种字符。

（3）`\uXXXX`

`\u` 后面紧跟四个十六进制数（`0000` 到 `FFFF`），代表一个字符。`XXXX` 对应该字符的 `Unicode` 码点，比如 `\u00A9` 表示版权符号。

```js
"1'2"; //1'2

"\251"; //©
"\250"; //¨
"\xA9"; //©
"\u00A9"; //©
"\u1022"; //ဢ

// 如果在非特殊字符前面使用斜杠，则斜杠会被省略
"o"; //o
"a"; //a
```

## 3. 字符串的特点

ECMAScript 中的字符串是不可变的，也就是说，字符一旦创建，他们的值就不可能改变。

要改变某个变量保存的字符串，首先销毁原来的字符串，然后再引用包含新值的字符串填充该变量。这个过程是在后台发生的，而这也是在某些旧版本浏览器（低于 1.0 的 Firefox、IE6 等）中拼接字符串时速度很慢的原因。

```js
var str = "asdf";
str[0] = "b";
str; //'asdf'
```

## 4. 转换为字符串

要把一个值转换为一个字符串有两种方式。第一种是使用几乎每个值都有的 `toString` 方法，这个方法唯一要做的就是返回相应值的字符串表现。

数值、布尔值、对象和字符串值（每个字符串有 `toString` 方法，该方法返回字符串的一个副本）都有 `toString` 方法。但 `null` 和 `undefined` 没有这个方法。

多数情况下调用 `toString` 方法不必传递参数。但是，调用数值的 `toString` 方法时，可以传递一个参数：输出数值的基数。默认情况下，`toString` 方法以十进制格式返回数值的字符串表示。而通过传递基数，可以输出二进制、八进制、十六进制，甚至其他任意有效进制表示的字符串值。

在不知道转换的值是不是 `null` 和 `undefined` 的情况下，可以用转型函数 `String`，这个函数能够将任何类型的值转换为字符串。

> 要把某个值转换为字符串，可以使用加号操作符把它与一个字符串加在一起。

- **`toString`**

```js
var num = 123;

num.toString(); //123

num.toString(8); //173
num.toString(16); //7b
num.toString("16"); //7b
// 参数只能在 2 - 36 ，否则报错
// num.toString("16zx");
//RangeError: toString() radix argument must be between 2 and 36

// obj
{ name: "hh" }.toString(); //[object Object]
{ 1: 222 }.toString(); //[object Object]

// ary
[num].toString(); //123
["name"].toString(); //'name'
// 特殊
[null].toString(); //''
[undefined].toString(); //''

// boo
true.toString(); //'true'
```

`String` 函数遵循以下转换规则：

---

- 如果值有 `toString` 方法，则调用该方法并返回相应的结果；
- 如果值是 `null`，则返回 `null`；
- 如果值是 `undefined`，则返回 `undefined`；

---

```js
String({ name: "hh" }); //[object Object]
String(123); //123
String(["name"]); //'name'
// 特殊
String([null]); //''
String([undefined]); //''

String(true); //'true'
```

> 注意：
>
> 1.`String` 和 `toString` 大体行为一致；
>
> 2.`toString` 对数值类型参数，可以选择传入一个 2 - 36 之间的数作为基数，输出其对应进制数；
>
> 3.`null` 和 `undefined` 不具有 `toString` 方法，会调用 `String` 方法；

更多 demo 见 <a href="./demo/string.html" target="_blank">string.html</a>

## 5. 字符集

JavaScript 使用 Unicode 字符集。JavaScript 引擎内部，所有字符都用 Unicode 表示。

JavaScript 不仅以 Unicode 储存字符，还允许直接在程序中使用 Unicode 码点表示字符，即将字符写成 `\uxxxx` 的形式，其中 `xxxx` 代表该字符的 Unicode 码点。

解析代码的时候，JavaScript 会自动识别一个字符是字面形式表示，还是 `Unicode` 形式表示。输出给用户的时候，所有字符都会转成字面形式。

每个字符在 JavaScript 内部都是以 16 位（即 2 个字节）的 UTF-16 格式储存。也就是说，JavaScript 的单位字符长度固定为 16 位长度，即 2 个字节。

但是，UTF-16 有两种长度：对于码点在 `U+0000` 到 `U+FFFF` 之间的字符，也称为基本平面（缩写 BMP），长度为 16 位（即 2 个字节）；对于码点在 `U+10000` 到 `U+10FFFF` 之间的字符，辅助平面（缩写 SMP），长度为 32 位（即 4 个字节），而且前两个字节在 `0xD800` 到 `0xDBFF` 之间，后两个字节在 `0xDC00` 到 `0xDFFF` 之间。

JavaScript 对 `UTF-16` 的支持是不完整的，由于历史原因，只支持两字节的字符，不支持四字节的字符。这是因为 JavaScript 第一版发布的时候，Unicode 的码点只编到 `U+FFFF`，因此两字节足够表示了。后来，Unicode 纳入的字符越来越多，出现了四字节的编码。但是，JavaScript 的标准此时已经定型了，统一将字符长度限制在两字节，导致无法识别四字节的字符。

总结一下，对于码点在 `U+10000` 到 `U+10FFFF` 之间的字符，JavaScript 总是认为它们是两个字符（`length` 属性为 2）。所以处理的时候，必须把这一点考虑在内，也就是说，JavaScript 返回的字符串长度可能是不正确的。

```js
var str1 = "\u1234\u1235";
var str2 = "\u22234\u22235";
str1, str1.length; //ሴስ 2
str2, str2.length; //∣4∣5 4
```

## 6.Base64 转码

有时，文本里面包含一些不可打印的符号，比如 ASCII 码 0 到 31 的符号都无法打印出来，这时可以使用 Base64 编码，将它们转成可以打印的字符。另一个场景是，有时需要以文本格式传递二进制数据，那么也可以使用 Base64 编码。

所谓 Base64 就是一种**编码方法**，可以将任意值转成 `0～9、A～Z、a-z、+` 和 `/` 这 64 个字符组成的可打印字符。使用它的主要目的，不是为了加密，而是 **为了不出现特殊字符**，简化程序的处理。

JavaScript 原生提供两个 Base64 相关的方法。

- `btoa()`：任意值转为 Base64 编码
- `atob()`：Base64 编码转为原来的值

```js
btoa("i mess you"); //aSBtZXNzIHlvdQ==
atob("aSBtZXNzIHlvdQ=="); //i mess you
```

> 注意，这两个方法不适合非 ASCII 码的字符，会报错。

要将非 ASCII 码字符转为 Base64 编码，必须中间插入一个转码环节，再使用这两个方法。

```js
btoa(encodeURIComponent("分分合合"));
// "JUU1JTg4JTg2JUU1JTg4JTg2JUU1JTkwJTg4JUU1JTkwJTg4"

decodeURIComponent(atob("JUU1JTg4JTg2JUU1JTg4JTg2JUU1JTkwJTg4JUU1JTkwJTg4"));
// 分分合合
```
