# String 类型

String 类型用于表示由零或多个 16 位 Unicode 字符组成的字符序列，即字符串。字符串可以由双引号（`"`）或单引号（`'`）表示，因此下面两种字符串的写法都是有效的：

```js
var firstName = "Nicholas";
var lastName = 'Zakas';
```

与 PHP 中的双引号和单引号会影响对字符串的解释方式不同，ECMAScript 中的这两种语法形式没有什么区别。用双引号表示的字符串和用单引号表示的字符串完全相同。不过，以双引号开头的字符串也必须以双引号结尾，而以单引号开头的字符串必须以单引号结尾。

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

str; // a b c
```

连接运算符（`+`）可以连接多个单行字符串，将长字符串拆成多行书写，输出的时候也是单行。

如果想输出多行字符串，有一种利用多行注释的变通方法。

```js
(function() {
  /*
  * line 1
  * line 2
  * line 3
  */
}
  .toString()
  .split("\n")
  .slice(1, -1)
  .join("\n"));

// /*
// * line 1
// * line 2
// * line 3
// */
```

反斜杠（`\`）在字符串内有特殊含义，用来表示一些特殊字符，所以又称为 **转义符**。

## 1.字符字面量

`String` 类型包含一些特殊的字符字面量，也叫 **转义序列**，用于表示非打印字符或者有其他用途的字符：

|  字面量  |                                               含义                                               |
| :------: | :----------------------------------------------------------------------------------------------: |
|   `\0`   |                                         `null`(`\u0000`)                                         |
|   `\b`   |                                        后退键（`\u0008`）                                        |
|   `\f`   |                                        换页符（`\u000C`）                                        |
|   `\n`   |                                        换行符（`\u000A`）                                        |
|   `\r`   |                                        回车键（`\u000D`）                                        |
|   `\t`   |                                        制表符（`\u0009`）                                        |
|   `\v`   |                                      垂直制表符（`\u000B`）                                      |
|   `\'`   |                                        单引号（`\u0027`）                                        |
|   `\"`   |                                        双引号（`\u0022`）                                        |
|   `\\`   |                                        反斜杠（`\u005C`）                                        |
|  `\xnn`  |           以十六进制代码 `nn` 表示的一个字符（其中 n 为 0～F）。例如，`\x41` 表示 "A"            |
| `\unnnn` | 以十六进制代码 `nnnn` 表示的一个 Unicode 字符（其中 n 为 0～F）。例如，`\u03a3` 表示希腊字符 `Σ` |

这些字面量可以出现在字符串中的任何位置，而且也将被作为一个字符来解析。

斜杠还有三种特殊用法。

1. `\HHH`

反斜杠后面紧跟三个八进制数（`000` 到 `377`），代表一个字符。`HHH` 对应该字符的 `Unicode` 码点，比如 `\251` 表示版权符号。显然，这种方法只能输出 256 种字符。

2. `\xHH`

`\x` 后面紧跟两个十六进制数（`00` 到 `FF`），代表一个字符。`HH` 对应该字符的 `Unicode` 码点，比如 `\xA9` 表示版权符号。这种方法也只能输出 256 种字符。

3. `\uXXXX`

`\u` 后面紧跟四个十六进制数（`0000` 到 `FFFF`），代表一个字符。`XXXX` 对应该字符的 `Unicode` 码点，比如 `\u00A9` 表示版权符号。

```js
"\251"; // ©
"\250"; // ¨
"\xA9"; // ©
"\xA1"; // ¡
"\u00A9"; // ©
"\u1022"; // ဢ

// 如果在非特殊字符前面使用斜杠，则斜杠会被省略
"\o"; // o
"\a"; // a

// 也会出错
"\x";
// Uncaught SyntaxError: Invalid hexadecimal escape sequence

"\u";
// Uncaught SyntaxError: Invalid Unicode escape sequence
```

## 2.字符串的特点

ECMAScript 中的字符串是 *不可变* 的，也就是说，字符一旦创建，他们的值就不可能改变。

要改变某个变量保存的字符串，首先销毁原来的字符串，然后再引用包含新值的字符串填充该变量。这个过程是在后台发生的，而这也是在某些旧版本浏览器（低于 1.0 的 Firefox、IE6 等）中拼接字符串时速度很慢的原因。

```js
var str = "asdf";
str += "bcd";
str; //'asdfbcd'
```

## 3.转换为字符串

要把一个值转换为一个字符串有两种方式。第一种是使用几乎每个值都有的 `toString` 方法，这个方法唯一要做的就是返回相应值的字符串表现。

数值、布尔值、对象和字符串值（每个字符串有 `toString` 方法，该方法返回字符串的一个副本）都有 `toString` 方法。但 `null` 和 `undefined` 没有这个方法。

多数情况下调用 `toString` 方法不必传递参数。但是，调用数值的 `toString` 方法时，可以传递一个参数：输出数值的基数。默认情况下，`toString` 方法以十进制格式返回数值的字符串表示。而通过传递基数，可以输出二进制、八进制、十六进制，甚至其他任意有效进制表示的字符串值。

在不知道转换的值是不是 `null` 和 `undefined` 的情况下，可以用转型函数 `String`，这个函数能够将任何类型的值转换为字符串。

> 要把某个值转换为字符串，可以使用加号操作符把它与一个字符串加在一起。

### 3.1.`toString`

```js
var num = 123;
num.toString(); // 123

// 参数只能在 2 - 36 ，否则报错
num.toString(8); // 173
num.toString(16); // 7b
num.toString("16"); // 7b
num.toString("16zx");
// RangeError: toString() radix argument must be between 2 and 36

// obj
var obj = { name: "hh" };
var objN = { 1: 1};
obj.toString(); // [object Object]
objN.toString(); // [object Object]

// ary
[123].toString(); // 123
["name"].toString(); // 'name'

// 特殊
[null].toString(); // ''
null.toString();
// Uncaught TypeError: Cannot read properties of null (reading 'toString')

[undefined].toString(); // ''
undefined.toString();
// Uncaught TypeError: Cannot read properties of undefined (reading 'toString')

// boo
true.toString(); // 'true'
```

### 3.2.`String`

`String` 函数遵循以下转换规则：

- 如果值有 `toString` 方法，则调用该方法并返回相应的结果；
- 如果值是 `null`，则返回 `'null'`；
- 如果值是 `undefined`，则返回 `'undefined'`；

```js
String({ name: "hh" }); // [object Object]
String(123); // 123
String(["name"]); // 'name'

// 特殊
String([null]); // ''
String(null); // 'null'
String([undefined]); // ''
String(undefined); // 'undefined'

String(true); // 'true'
```

> 注意：
>
> 1.`String` 和 `toString` 大体行为一致；
>
> 2.`toString` 对数值类型参数，可以选择传入一个 2 - 36 之间的数作为基数，输出其对应进制数；
>
> 3.`null` 和 `undefined` 不具有 `toString` 方法，可以使用 `String` 方法；
