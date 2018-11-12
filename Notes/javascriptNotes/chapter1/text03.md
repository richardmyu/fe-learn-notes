##### 8.3 `Number()`

强制将其他数据类型转换为 `number` 类型；如果是字符串，只有全部是数字才能转换。

`Number()` 函数转换规则：

1).`Boolean` 值，转换 0 或 1；

```javascript
console.log(Number(true)); //1
console.log(Number(false)); //0
```

2).数字值，简单传入传出（第一个数为 `0`，则会被认为是八进制数，忽略剩余前导 `0`，再转化为十进制输出；若前两位为`0x`，则会被认为是十六进制，转化为十进制）；

```javascript
//带前导0被当做 8 进制
console.log(Number(0123)); //83
console.log(Number(00123)); //83
//带前导0x被当做 16 进制
console.log(Number(0x123)); //291

console.log(Number(-123)); //-123
console.log(Number(0.123)); //0.123
//小数点后 0 超过 5 个会自动转科学计数法
console.log(Number(0.00000123)); //0.00000123
console.log(Number(0.000000123)); //1.23e-7
console.log(Number(0.012300000000000000)); //0.0123
//科学计数法指数不超过20就不会是科学计数法形式
console.log(Number(3e20)); //300000000000000000000
console.log(Number(3e-21)); //3e-21
```

3).空数组也会转换为 0；可以转化数值的单数值数组转换对应的数值；其他数组为 `NaN`；

```javascript
//空数组
console.log(Number([])); //0
//可以转化数值的单数值数组
console.log(Number([1])); //1
//其他
console.log(Number(["1x"])); //NaN
console.log(Number([1, 2])); //NaN
```

4).`null`，输出 0; `undefined`，输出 `NaN`;

```javascript
console.log(Number(null)); //0
console.log(Number(undefined)); //NaN
//NaN是数字类型，但不是一个数...
console.log(Number(NaN)); //NaN
```

5).如果是对象。则调用对象的 `valueOf()` 方法，然后依照前面规则转换返回值。如果转换的结果是 `NaN`，则调用对象的 `toString()` 方法。

```javascript
console.log(Number({})); //NaN
console.log(Number({ name: "hhh" })); //NaN
```

6).如果是字符串：

---

- a.只包含数字（包括正负两种情况），转换十进制（忽略前导 0）;
- b.带浮点格式，转换对应浮点数值（忽略前导 0）;
- c.若有上述之外其他字符，输出 `NaN`;
- d.注意：空字符串或者内有任意空格，转换为 0;
- e.空格只在首/尾位忽略，中间位置作为非法字符;

---

```javascript
console.group("boolean");
console.log(Number(true)); //1
console.log(Number(false)); //0
console.groupEnd();

console.group("number");
console.log(Number(0123)); //83
console.log(Number(00123)); //83
console.log(Number(0x123)); //291
console.log(Number(0b111)); //7
console.log(Number(-123)); //-123
console.log(Number(0.123)); //0.123
console.log(Number(0.992)); //0.992
console.log(Number(0.00000123)); //0.00000123
console.log(Number(0.000000123)); //1.23e-7
console.log(Number(0.012300000000000000)); //0.0123
console.log(Number(3e20)); //300000000000000000000
console.log(Number(3e-21)); //3e-21
console.groupEnd();

console.group("null && undefined");
console.log(Number(null)); //0
console.log(Number(undefined)); //NaN
console.log(Number(NaN)); //NaN
console.groupEnd();

console.group("object");
console.log(Number({})); //NaN
console.log(Number({ name: "hhh" })); //NaN
console.log(Number({ 1: "2" })); //NaN
console.groupEnd();

console.group("array");
console.log(Number([])); //0
console.log(Number([1])); //1
console.log(Number(["1x"])); //1
console.log(Number([1, 2])); //1
console.log(Number(["1", "2"])); //1
console.groupEnd();

console.group("string");
console.log(Number("123")); //123
console.log(Number(" 123")); //123
console.log(Number("1 23")); //NaN
console.log(Number("123 ")); //123
console.log(Number("+123")); //123
console.log(Number("-123")); //-123
console.log(Number("0123")); //123
console.log(Number("00123")); //123
console.log(Number("0x123")); //291
console.log(Number("0b111")); //7
console.log(Number("0.123")); //0.123
console.log(Number("0.1.23")); //NaN
console.log(Number("0.00000000000123")); //1.23e-12
console.log(Number("0.012300000000000")); //0.0123
console.log(Number("0.0123000 0000000")); //NaN
console.log(Number("3e33")); //3e+33
console.log(Number("3e-33")); //3e-33
console.log(Number("3ez")); //NaN
console.log(Number("")); //0
console.log(Number(" ")); //0
console.log(Number(" ")); //0
console.groupEnd();
```

##### 8.4 `parseInt()`

非强制数据类型转换

1).主要用于将字符串转为整数；

2).忽略字符串前面的空格，直至找到第一个非空格字符；

3).如果第一个字符不是数字字符或正负号(符号后面必须有数字)，则返回 `NaN`；

4).直至解析完所有数字字符或遇到非数字字符(不识别小数点)，返回转好的部分；

```javascript
//console.group("boolean");
console.log(parseInt(true)); //NaN
console.log(parseInt(false)); //NaN
console.groupEnd();

//console.group("number");
console.log(parseInt(0123)); //83
console.log(parseInt(00123)); //83
console.log(parseInt(0x123)); //291
console.log(parseInt(0b111)); //7
console.log(parseInt(-123)); //-123
console.log(parseInt(0.123)); //0
console.log(parseInt(0.992)); //0
console.log(parseInt(0.00000123)); //0
console.log(parseInt(0.000000123)); //1
console.log(parseInt(0.012300000000000000)); //0
console.log(parseInt(3e20)); //300000000000000000000
console.log(parseInt(3e-21)); //3
console.groupEnd();

//console.group("null && undefined");
console.log(parseInt(null)); //NaN
console.log(parseInt(undefined)); //NaN
console.log(parseInt(NaN)); //NaN
console.groupEnd();

//console.group("object");
console.log(parseInt({})); //NaN
console.log(parseInt({ name: "hhh" })); //NaN
console.log(parseInt({ 1: "2" })); //NaN
console.groupEnd();

//console.group("array");
console.log(parseInt([])); //NaN
console.log(parseInt([1])); //1
console.log(parseInt(["1x"])); //1
console.log(parseInt([1, 2])); //1
console.log(parseInt(["1", "2"])); //1
console.groupEnd();

//console.group("string");
console.log(parseInt("123")); //123
console.log(parseInt(" 123")); //123
console.log(parseInt("1 23")); //1
console.log(parseInt("123 ")); //123
console.log(parseInt("+123")); //123
console.log(parseInt("-123")); //-123
console.log(parseInt("0123")); //123
console.log(parseInt("00123")); //123
console.log(parseInt("0x123")); //291
console.log(parseInt("0b111")); //0
console.log(parseInt("0.123")); //0
console.log(parseInt("0.1.23")); //0
console.log(parseInt("0.00000000000123")); //0
console.log(parseInt("0.012300000000000")); //0
console.log(parseInt("0.0123000 0000000")); //0
console.log(parseInt("3e33")); //3
console.log(parseInt("3e-33")); //3
console.log(parseInt("3ez")); //3
console.log(parseInt("")); //NaN
console.log(parseInt(" ")); //NaN
console.log(parseInt(" ")); //NaN
console.groupEnd();
```

> 第一个参数若不是字符串，会自动转换为字符串再读取(`String()`)；但这回导致一些意外：

```javascript
parseInt(0x11, 36); // 43
parseInt(0x11, 2); // 1

// 等同于
parseInt(String(0x11), 36);
parseInt(String(0x11), 2);

// 等同于
parseInt("17", 36);
parseInt("17", 2);
```

这种处理方式，对于八进制的前缀 0，尤其需要注意。

```javascript
parseInt(011, 2); // NaN

// 等同于
parseInt(String(011), 2);

// 等同于
parseInt(String(9), 2);
```

> JavaScript 不再允许将带有前缀 0 的数字视为八进制数，而是要求忽略这个 0。但是，为了保证兼容性，大部分浏览器并没有部署这一条规定。

5).存在第二个参数，用来指定转换时的所使用的基数（进制）；如果第二个参数不是数值，会被自动转为一个整数。这个整数只有在 2 到 36 之间，才能得到有意义的结果，超出这个范围，则返回 `NaN`。如果第二个参数是 0、`undefined` 和 `null`，则直接忽略。

```javascript
parseInt("10", 37); // NaN
parseInt("10", 1); // NaN
parseInt("10", 0); // 10
parseInt("10", null); // 10
parseInt("10", undefined); // 10
```

如果字符串包含对于指定进制无意义的字符，则从最高位开始，只返回可以转换的数值。如果最高位无法转换，则直接返回 `NaN`。

```javascript
parseInt("1546", 2); // 1
parseInt("546", 2); // NaN
```

> `parseInt()`的第二个参数默认为 10；

6).对于会自动转化为科学计数法的数字，`parseInt()` 会产生一些奇怪的结果；`parseFloat()`不会。

```javascript
parseInt(1000000000000000000000.5); // 1
// 等同于
parseInt("1e+21"); // 1

parseInt(0.0000008); // 8
// 等同于
parseInt("8e-7"); // 8

parseFloat(1000000000000000000000.5); //1e+21
// 等同于
parseFloat("1e+21"); //1e+21

parseFloat(0.0000008); //8e-7
// 等同于
parseFloat("8e-7"); //8e-7
```

##### 8.5 `parseFloat()`

1).`parseFloat` 方法用于将一个字符串转为浮点数(同 `parseInt`，但多识别一个小数点)。

2).如果字符符合科学计数法，则会进行相应的转换；若有不能转换为浮点数的字符，就返回已转好的部分。

3).自动过滤前导空格；若参数不是字符串或者字符串的第一个字符不能转换为浮点数，则返回 `NaN`。

```javascript
console.group("boolean");
console.log(parseFloat(true)); //NaN
console.log(parseFloat(false)); //NaN
console.groupEnd();

console.group("number");
console.log(parseFloat(0123)); //83
console.log(parseFloat(00123)); //83
console.log(parseFloat(0x123)); //291
console.log(parseFloat(0b111)); //7
console.log(parseFloat(-123)); //-123
console.log(parseFloat(0.123)); //0.123
console.log(parseFloat(0.992)); //0.992
console.log(parseFloat(0.00000123)); //0.00000123
console.log(parseFloat(0.000000123)); //1.23e-7
console.log(parseFloat(0.012300000000000000)); //0.0123
console.log(parseFloat(3e20)); //300000000000000000000
console.log(parseFloat(3e-21)); //3e-21
console.groupEnd();

console.group("null && undefined");
console.log(parseFloat(null)); //NaN
console.log(parseFloat(undefined)); //NaN
console.log(parseFloat(NaN)); //NaN
console.groupEnd();

console.group("object");
console.log(parseFloat({})); //NaN
console.log(parseFloat({ name: "hhh" })); //NaN
console.log(parseFloat({ 1: "2" })); //NaN
console.groupEnd();

console.group("array");
console.log(parseFloat([])); //NaN
console.log(parseFloat([1])); //1
console.log(parseFloat(["1x"])); //1
console.log(parseFloat([1, 2])); //1
console.log(parseFloat(["1", "2"])); //1
console.groupEnd();

console.group("string");
console.log(parseFloat("123")); //123
console.log(parseFloat(" 123")); //123
console.log(parseFloat("1 23")); //1
console.log(parseFloat("123 ")); //123
console.log(parseFloat("+123")); //123
console.log(parseFloat("-123")); //-123
console.log(parseFloat("0123")); //123
console.log(parseFloat("00123")); //123
console.log(parseFloat("0x123")); //0
console.log(parseFloat("0b111")); //0
console.log(parseFloat("0.123")); //0.123
console.log(parseFloat("0.1.23")); //0.1
console.log(parseFloat("0.00000000000123")); //1.23e-12
console.log(parseFloat("0.012300000000000")); //0.0123
console.log(parseFloat("0.0123000 0000000")); //0.0123
console.log(parseFloat("3e33")); //3e+33
console.log(parseFloat("3e-33")); //3e-33
console.log(parseFloat("3ez")); //3
console.log(parseFloat("")); //NaN
console.log(parseFloat(" ")); //NaN
console.log(parseFloat(" ")); //NaN
console.groupEnd();
```

##### 8.6 浮点运算

JavaScript 内部，所有数字都是以 64 位浮点数形式储存，即使整数也是如此。所以，1 与 1.0 是相同的，是同一个数。

`1 === 1.0 // true`

这就是说，JavaScript 语言的底层根本没有整数，所有数字都是小数（64 位浮点数）。容易造成混淆的是，某些运算只有整数才能完成，此时 JavaScript 会自动把 64 位浮点数，转成 32 位整数，然后再进行运算。

根据国际标准 IEEE 754，JavaScript 浮点数的 64 个二进制位，从最左边开始，是这样组成的。

---

- 第 1 位：符号位，0 表示正数，1 表示负数
- 第 2 位到第 12 位（共 11 位）：指数部分
- 第 13 位到第 64 位（共 52 位）：小数部分（即有效数字）

---

符号位决定了一个数的正负，指数部分决定了数值的大小，小数部分决定了数值的精度。

由于浮点数不是精确的值，所以涉及小数的比较和运算要特别小心。

```javascript
0.1 + 0.2 === 0.3
// false

0.1+0.2=
//0.300 000 000 000 000 04

0.3 / 0.1
//2.999 999 999 999 999 6

(0.3 - 0.2) === (0.2 - 0.1)
// false
```

对于那些极大或极小的数值，可以用 `e` 表示法表示浮点数值。默认情况下，ECMAScript 会将那些小数点后面带有 6 个 0 以上的浮点数值转换为以 `e` 表示的数值。浮点数值最高精确度是 17 位小数，但在进行算数计算时精确度远远不如整数。因此，永远不要测试某个特定的浮点数值。

> 关于浮点数值计算产生舍入误差的问题，这是基于 IEEE754 数值的浮点数值计算的通病。
> 数值运算中，任何涉及 `NaN` 和 `undefined` 的运算，结果均为 `NaN`;`null` 会转换为 0 参与运算。

##### 8.7 数值范围

根据标准，64 位浮点数的指数部分的长度是 11 个二进制位，意味着指数部分的最大值是 2047（2 的 11 次方减 1）。也就是说，64 位浮点数的指数部分的值最大为 2047，分出一半表示负数，则 JavaScript 能够表示的数值范围为 21024 到 2-1023（开区间），超出这个范围的数无法表示。

如果一个数大于等于 2 的 1024 次方，那么就会发生“**正向溢出（overflow）**”，即 JavaScript 无法表示这么大的数，这时就会返回`Infinity`。

```javascript
FireFox;
Math.pow(2, 1023); //8.98846567431158e+307
Math.pow(2, 1024); //Infinity
```

如果一个数小于等于 2 的 -1075 次方（指数部分最小值 -1023，再加上小数部分的 52 位），那么就会发生为“**负向溢出（underflow）**”，即 JavaScript 无法表示这么小的数，这时会直接返回 0。

```javascript
FireFox;
Math.pow(2, -1074); //5e-324  //chorme  5e-324
Math.pow(2, -1075); //5e-324  //chorme  0
Math.pow(2, -1076); //0
```

JavaScript 提供 `Number` 对象的 `MAX_VALUE` 和 `MIN_VALUE` 属性，返回可以表示的具体的最大值和最小值。

```javascript
Number.MAX_VALUE; // 1.7976931348623157e+308
Number.MIN_VALUE; // 5e-324
```

> 如果某次计算返回了 `Infinity` 值，那么该值将无法继续参与下一次的计算，因为 `Infinity` 值不能参与数值计算。
> 要想确定一个值是不是有穷的，可以使用 `isFinite()` 函数，如果该值位于最小值和最大值之间，返回 true。

##### 8.8 数值的表示法

JavaScript 的数值有多种表示方法，可以用字面形式直接表示，比如 35（十进制）和 `0xFF`（十六进制）。

数值也可以采用科学计数法表示。科学计数法允许字母 `e` 或 `E` 的后面，跟着一个整数，表示这个数值的指数部分。

以下两种情况，JavaScript 会自动将数值转为科学计数法表示，其他情况都采用字面形式直接表示。

（1）小数点前的数字多于 21 位

```javascript
1234567890123456789012;
// 1.2345678901234568e+21

123456789012345678901;
// 123456789012345680000
```

（2）小数点后的零多于 5 个

```javascript
// 小数点后紧跟5个以上的零，
// 就自动转为科学计数法
0.0000003; // 3e-7

// 否则，就保持原来的字面形式
0.000003; // 0.000003
```

##### 8.9 数值的进制

使用**字面量（literal）**直接表示一个数值时，JavaScript 对整数提供四种进制的表示方法：

---

- 十进制：没有前导 0 的数值。
- 八进制：有前缀`0o`或`0O`的数值，或者有前导 0、且只用到 0-7 的八个阿拉伯数字的数值。
- 十六进制：有前缀`0x`或`0X`的数值。
- 二进制：有前缀`0b`或`0B`的数值。

---

默认情况下，JavaScript 内部会自动将八进制、十六进制、二进制转为十进制。

如果八进制、十六进制、二进制的数值里面，出现不属于该进制的数字，就会报错。

通常来说，有前导 0 的数值会被视为八进制，但是如果前导 0 后面有数字 8 和 9，则该数值被视为十进制。

前导 0 表示八进制，处理时很容易造成混乱。ES5 的严格模式和 ES6，已经废除了这种表示法，但是浏览器为了兼容以前的代码，目前还继续支持这种表示法。

> 八进制字面量在严格模式下是无效的，会导致支持该模式的 JavaScript 引擎抛出错误。
