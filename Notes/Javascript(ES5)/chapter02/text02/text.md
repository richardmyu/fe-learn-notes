### 4.9 Number 类型

#### 4.9.1 `isNaN()`

检测一个值不是有效数字；若是有效数字返回 false，不是有效数字返回 true；若传入非数值会自动转换为数值。对于空数组和只有一个数组成员(能转化为数值的)的数组，会返回 false。因此在使用 `isNaN` 之前，最好先判断数据类型：

```javascript
console.group("boolean");
console.log(isNaN(true)); //false
console.log(isNaN(false)); //false
console.groupEnd();

console.group("number");
console.log(isNaN(0123)); //false
console.log(isNaN(00123)); //false
console.log(isNaN(0x123)); //false
console.log(isNaN(0b111)); //false
console.log(isNaN(-123)); //false
console.log(isNaN(0.123)); //false
console.log(isNaN(0.992)); //false
console.log(isNaN(0.00000123)); //false
console.log(isNaN(0.000000123)); //false
console.log(isNaN(0.0123)); //false
console.log(isNaN(3e20)); //false
console.log(isNaN(3e-21)); //false
console.groupEnd();

console.group("null && undefined");
console.log(isNaN(null)); //false
console.log(isNaN(undefined)); //true
console.log(isNaN(NaN)); //true
console.groupEnd();

console.group("object");
console.log(isNaN({})); //true
console.log(isNaN({ name: "hhh" })); //true
console.log(isNaN({ 1: "2" })); //true
console.groupEnd();

console.group("array");
console.log(isNaN([])); //false
console.log(isNaN([1])); //false
console.log(isNaN(["1x"])); //true
console.log(isNaN([1, 2])); //true
console.log(isNaN(["1", "2"])); //true
console.groupEnd();

console.group("string");
console.log(isNaN("123")); //false
console.log(isNaN(" 123")); //false
console.log(isNaN("1 23")); //true
console.log(isNaN("123 ")); //false
console.log(isNaN("+123")); //false
console.log(isNaN("-123")); //false
console.log(isNaN("0123")); //false
console.log(isNaN("00123")); //false
console.log(isNaN("0x123")); //false
console.log(isNaN("0b111")); //false
console.log(isNaN("0.123")); //false
console.log(isNaN("0.1.23")); //true
console.log(isNaN("0.00000000000123")); //false
console.log(isNaN("0.012300000000000")); //false
console.log(isNaN("0.0123000 0000000")); //true
console.log(isNaN("3e33")); //false
console.log(isNaN("3e-33")); //false
console.log(isNaN("3ez")); //true
console.log(isNaN("")); //false
console.log(isNaN(" ")); //false
console.log(isNaN(" ")); //false
console.groupEnd();

//[].valueOf() = [] ===> [].toString() = "" ===> 0
//[1].valueOf() = [1] ===> [].toString() = "1" ===> 1

function myIsNaN(value) {
  return typeof value === "number" && isNaN(value);
  //推荐用法
  return value !== value;
}
```

`isNaN()` 也适用于对象。在基于对象调用 `isNaN()` 函数时，会首先调用对象的 `valueOf()` 方法，然后确定该方法返回的值是否可以装换为数值。如果不能，则基于这个返回值再调用 `toString()` 方法，再测试(`parseFloat()`)返回值，而这个过程也是 ECMAScript 中内置函数和操作符的一般执行流程。

> 执行 `Number()` 返回 NaN 的值在 `isNaN()` 中均会返回 flase，是否在 `isNaN()` 类型转换中默认调用 `Number()` 方法？？？

#### 4.9.2 `isFinite()`

`isFinite` 方法返回一个布尔值，表示某个值是否为正常的数值。

除了 `Infinity`、`-Infinity`、`NaN` 和 `undefined` 这几个值会返回 false，`isFinite` 对于其他的数值都会返回 true。

```javascript
console.log(isFinite(Infinity)); //false
console.log(isFinite(-Infinity)); //false
console.log(isFinite(NaN)); //false
console.log(isFinite(undefined)); //false
console.log(isFinite(null)); //true
console.log(isFinite("1.23")); //true
```

#### 4.9.3 `Number()`

强制将其他数据类型转换为 `number` 类型；如果是字符串，只有全部是数字才能转换。

`Number()` 函数转换规则：

1).`Boolean` 值，转换 0 或 1；

```javascript
Number(true); //1
Number(false); //0
```

2).数字值，简单传入传出（第一个数为 `0`，则会被认为是八进制数，忽略剩余前导 `0`，再转化为十进制输出；若前两位为`0x`，则会被认为是十六进制，转化为十进制）；

```javascript
//带前导0被当做 8 进制
Number(0123); //83
Number(00123); //83
//带前导0x被当做 16 进制
Number(0x123); //291

Number(-123); //-123
Number(0.123); //0.123
//小数点后 0 超过 5 个会自动转科学计数法
Number(0.00000123); //0.00000123
Number(0.000000123); //1.23e-7
Number(0.012300000000000000); //0.0123
//科学计数法指数不超过20就不会是科学计数法形式
Number(3e20); //300000000000000000000
Number(3e-21); //3e-21
```

3).空数组也会转换为 0；可以转化数值的单数值数组转换对应的数值；其他数组为 `NaN`；

```javascript
//空数组
Number([]); //0
//可以转化数值的单数值数组
Number([1]); //1
//其他
Number(["1x"]); //NaN
Number([1, 2]); //NaN
```

4).`null`，输出 0; `undefined`，输出 `NaN`;

```javascript
Number(null); //0
Number(undefined); //NaN
//NaN是数字类型，但不是一个数...
Number(NaN); //NaN
```

5).如果是对象。则调用对象的 `valueOf()` 方法，然后依照前面规则转换返回值。如果转换的结果是 `NaN`，则调用对象的 `toString()` 方法。

```javascript
Number({}); //NaN
Number({ name: "hhh" }); //NaN
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
//boolean
Number(true); //1
Number(false); //0

//number
//能识别八进制，十六进制和二进制
Number(0123); //83
Number(00123); //83
Number(0x123); //291
Number(0b111); //7
//负数，浮点数
Number(-123); //-123
Number(0.123); //0.123
Number(0.992); //0.992
//小数点后面的 0 超过 5 位自动转化为科学计数法
Number(0.00000123); //0.00000123
Number(0.000000123); //1.23e-7
//最后一位非 0 数后面的 0 会被忽略
Number(0.012300000000000000); //0.0123
//小数点前面的 0 超过 20 位也会自动转化为科学计数法
Number(3e20); //300000000000000000000
Number(3e-21); //3e-21

//特殊值
Number(null); //0
Number(undefined); //NaN
Number(NaN); //NaN

//对象一律 NaN
Number({}); //NaN
Number({ name: "hhh" }); //NaN
Number({ 1: "2" }); //NaN

//空数组或可转化的单元素数组之外为 NaN
Number([]); //0
Number([1]); //1
Number(["1x"]); //NaN
Number(["12"]); //12
Number([1, 2]); //NaN
Number(["1", "2"]); //NaN

//string
//中间空格不识别，前后空格会忽略
Number("123"); //123
Number(" 123"); //123
Number("1 23"); //NaN
Number("123 "); //123
//识别正负
Number("+123"); //123
Number("-123"); //-123
//不识别八进制，识别十六进制和二进制
Number("0123"); //123
Number("00123"); //123
Number("0x123"); //291
Number("0b111"); //7
//只能识别第一个小数点
Number("0.123"); //0.123
Number("0.1.23"); //NaN
//会自动进行科学计数法的转换
Number("0.00000000000123"); //1.23e-12
Number("0.012300000000000"); //0.0123
Number("3e33"); //3e+33
Number("3e-33"); //3e-33
//非数字 NaN
Number("3ez"); //NaN
//空字符串（或带空格）为 0
Number(""); //0
Number(" "); //0
```

#### 4.9.4 `parseInt()`

非强制数据类型转换

1).主要用于将字符串转为整数；

2).忽略字符串前面的空格，直至找到第一个非空格字符；

3).如果第一个字符不是数字字符或正负号(符号后面必须有数字)，则返回 `NaN`；

4).直至解析完所有数字字符或遇到非数字字符(不识别小数点)，返回转好的部分；

```javascript
//boolean
parseInt(true); //NaN
parseInt(false); //NaN

//number
//能识别八进制，十六进制和二进制
parseInt(0123); //83
parseInt(00123); //83
parseInt(0x123); //291
parseInt(0b111); //7
//负数，忽略小数点
parseInt(-123); //-123
parseInt(0.123); //0
parseInt(0.992); //0
//会自动转化为科学计数法，然后再转换字符串
parseInt(0.00000123); //0
parseInt(0.000000123); //1 ：1.23E-7 ---> 1
parseInt(0.012300000000000000); //0
parseInt(3e20); //300000000000000000000
parseInt(3e-21); //3

//特殊值均不识别
parseInt(null); //NaN
parseInt(undefined); //NaN
parseInt(NaN); //NaN

//对象一律 NaN
parseInt({}); //NaN
parseInt({ name: "hhh" }); //NaN
parseInt({ 1: "2" }); //NaN

//不识别空数组，但会将数组的第一项解析而忽略其他项
parseInt([]); //NaN
parseInt([1]); //1
parseInt(["1x"]); //1
parseInt([1, 2]); //1
parseInt(["1", "2"]); //1

//string
//中间空格不识别（返回可以转化的），前后空格会忽略
parseInt("123"); //123
parseInt(" 123"); //123
parseInt("1 23"); //1
parseInt("123 "); //123
parseInt("+123"); //123
parseInt("-123"); //-123
//不识别八进制和二进制，识别十六进制
parseInt("0123"); //123
parseInt("00123"); //123
parseInt("0x123"); //291
parseInt("0b111"); //0
//不能识别小数点
parseInt("0.123"); //0
parseInt("0.1.23"); //0
//不会自动进行科学计数法的转换
parseInt("0.00000000000123"); //0
parseInt("0.012300000000000"); //0
parseInt("3e33"); //3
parseInt("3e-33"); //3
parseInt("3ez"); //3
//不识别空字符串（或带空格）
parseInt(""); //NaN
parseInt(" "); //NaN
```

> **第一个参数若不是字符串，会自动转换为字符串再读取(`String()`)**；但这回导致一些意外：

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

5).存在第二个参数，用来指定转换时的所使用的基数（进制）；如果第二个参数不是数值，会被自动转为（`parseInt()`???）一个整数。这个整数只有在 2 到 36 之间，才能得到有意义的结果，(转化为数字后)超出这个范围，则返回 `NaN`；如果第二个参数是或者转化为 0、`NaN`、`undefined` 和 `null`，则直接忽略（或者可以说调用默认值？？？）。

```javascript
parseInt("10", 37); // NaN
parseInt("10", 1); // NaN
parseInt("10", 0); // 10
parseInt("10", null); // 10
parseInt("10", undefined); // 10
parseInt("10", 2); //2
parseInt("10", "1.9"); //NaN
//2-36 范围内非整数会忽略小数部分
parseInt("10", "2.1"); //2
parseInt("10", "3.000000007"); //3
parseInt("10", "3.007"); //3
//忽略进制标识符???
parseInt("10", "03"); //3
parseInt("10", "0x2"); //2
parseInt("10", "0x3"); //3
```

如果第一个参数字符串包含对于指定进制无意义的字符，则从最高位开始，只返回可以转换的数值。如果最高位无法转换，则直接返回 `NaN`。

```javascript
parseInt("1546", 2); // 1
parseInt("546", 2); // NaN
```

> `parseInt()`的第二个参数默认为 10；

6).对于会自动转化为科学计数法的数字，`parseInt()` 会产生一些奇怪的结果；`parseFloat()` 不会(原因在于 `parseInt()` 会先转化为科学计数法再转化为字符串，而 `parseFloat()` 先转化为字符串，再自动转化科学计数法输出)。

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

#### 4.9.5 `parseFloat()`

1).`parseFloat` 方法用于将一个字符串转为浮点数(同 `parseInt`，但多识别一个小数点)。

2).如果字符符合科学计数法，则会进行相应的转换；若有不能转换为浮点数的字符，就返回已转好的部分。

3).自动过滤前导空格；若参数不是字符串或者字符串的第一个字符不能转换为浮点数，则返回 `NaN`。

```javascript
//boolean
parseFloat(true); //NaN
parseFloat(false); //NaN

//number
//能识别八进制，十六进制和二进制
parseFloat(0123); //83
parseFloat(00123); //83
parseFloat(0x123); //291
parseFloat(0b111); //7
//负数，小数点
parseFloat(-123); //-123
parseFloat(0.123); //0.123
parseFloat(0.992); //0.992
//会先转换字符串，然后再自动转化为科学计数法
parseFloat(0.00000123); //0.00000123
parseFloat(0.000000123); //1.23e-7
parseFloat(0.012300000000000000); //0.0123
parseFloat(3e20); //300000000000000000000
parseFloat(3e-21); //3e-21

//特殊值均不识别
parseFloat(null); //NaN
parseFloat(undefined); //NaN
parseFloat(NaN); //NaN

//对象一律 NaN
parseFloat({}); //NaN
parseFloat({ name: "hhh" }); //NaN
parseFloat({ 1: "2" }); //NaN
console.groupEnd();

//不识别空数组，但会将数组的第一项解析而忽略其他项
parseFloat([]); //NaN
parseFloat([1]); //1
parseFloat(["1x"]); //1
parseFloat([1, 2]); //1
parseFloat(["1", "2"]); //1

//string
//中间空格不识别（返回可以转化的），前后空格会忽略
parseFloat("123"); //123
parseFloat(" 123"); //123
parseFloat("1 23"); //1
parseFloat("123 "); //123
parseFloat("+123"); //123
parseFloat("-123"); //-123
//不识别八进制和二进制，十六进制
parseFloat("0123"); //123
parseFloat("00123"); //123
parseFloat("0x123"); //0
parseFloat("0b111"); //0
//能识别小数点
parseFloat("0.123"); //0.123
parseFloat("0.1.23"); //0.1
//会自动进行科学计数法的转换
parseFloat("0.00000000000123"); //1.23e-12
parseFloat("0.012300000000000"); //0.0123
parseFloat("3e33"); //3e+33
parseFloat("3e-33"); //3e-33
parseFloat("3ez"); //3
//不识别空字符串（或带空格）
parseFloat(""); //NaN
parseFloat(" "); //NaN
```

#### 4.9.6 浮点运算

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
>
> 数值运算中，任何涉及 `NaN` 和 `undefined` 的运算，结果均为 `NaN`;`null` 会转换为 0 参与运算。

#### 4.9.7 数值范围

根据标准，64 位浮点数的指数部分的长度是 11 个二进制位，意味着指数部分的最大值是 2047（2 的 11 次方减 1）。也就是说，64 位浮点数的指数部分的值最大为 2047，分出一半表示负数，则 JavaScript 能够表示的数值范围为 2^1024 到 2^1023（开区间），超出这个范围的数无法表示。

如果一个数大于等于 2 的 1024 次方，那么就会发生“**正向溢出（overflow）**”，即 JavaScript 无法表示这么大的数，这时就会返回`Infinity`。

```javascript
Math.pow(2, 1023); //8.98846567431158e+307
Math.pow(2, 1024); //Infinity
```

如果一个数小于等于 2 的 -1075 次方（指数部分最小值 -1023，再加上小数部分的 52 位），那么就会发生为“**负向溢出（underflow）**”，即 JavaScript 无法表示这么小的数，这时会直接返回 0。

```javascript
Math.pow(2, -1073); //5e-323
Math.pow(2, -1074); //5e-324
Math.pow(2, -1075); //5e-324
Math.pow(2, -1076); //0
```

JavaScript 提供 `Number` 对象的 `MAX_VALUE` 和 `MIN_VALUE` 属性，返回可以表示的具体的最大值和最小值。

```javascript
Number.MAX_VALUE; // 1.7976931348623157e+308
Number.MIN_VALUE; // 5e-324
```

> 如果某次计算返回了 `Infinity` 值，那么该值将无法继续参与下一次的计算，因为 `Infinity` 值不能参与数值计算。
>
> 要想确定一个值是不是有穷的，可以使用 `isFinite()` 函数，如果该值位于最小值和最大值之间，返回 true。

#### 4.9.8 数值的表示法

JavaScript 的数值有多种表示方法，可以用字面形式直接表示，比如 35（十进制）和 `0xFF`（十六进制）。

数值也可以采用科学计数法表示。科学计数法允许字母 `e` 或 `E` 的后面，跟着一个整数，表示这个数值的指数部分。

以下两种情况，JavaScript 会自动将数值转为科学计数法表示，其他情况都采用字面形式直接表示。

（1）小数点前的数字多于 21 位

```javascript
1234567890123456789012
// 1.2345678901234568e+21

123456789012345678901
// 123456789012345680000

123456789123456789
//123456789123456780 ???
```

（2）小数点后的零多于 5 个

```javascript
// 小数点后紧跟5个以上的零，
// 就自动转为科学计数法
0.0000003; // 3e-7

// 否则，就保持原来的字面形式
0.000003; // 0.000003
```

#### 4.9.9 数值的进制

使用**字面量（literal）**直接表示一个数值时，JavaScript 对整数提供四种进制的表示方法：

---

- 十进制：没有前导 0 的数值。
- 八进制：有前缀 `0o` 或 `0O` 的数值，或者有前导 0、且只用到 0-7 的八个阿拉伯数字的数值。
- 十六进制：有前缀 `0x` 或 `0X` 的数值。
- 二进制：有前缀 `0b` 或 `0B` 的数值。

---

默认情况下，JavaScript 内部会自动将八进制、十六进制、二进制转为十进制。

如果八进制、十六进制、二进制的数值里面，出现不属于该进制的数字，就会报错。

通常来说，有前导 0 的数值会被视为八进制，但是如果前导 0 后面有数字 8 和 9，则该数值被视为十进制。

前导 0 表示八进制，处理时很容易造成混乱。ES5 的严格模式和 ES6，已经废除了这种表示法，但是浏览器为了兼容以前的代码，目前还继续支持这种表示法。

> 八进制字面量在严格模式下是无效的，会导致支持该模式的 JavaScript 引擎抛出错误。

#### 4.9.10 特殊数值

JavaScript 提供了几个特殊的数值。

1).正零和负零

前面说过，JavaScript 的 64 位浮点数之中，有一个二进制位是符号位。这意味着，任何一个数都有一个对应的负值，就连 0 也不例外。

JavaScript 内部实际上存在 2 个 0：一个是 `+0`，一个是 `-0`，区别就是 64 位浮点数表示法的符号位不同。它们是等价的。

几乎所有场合，正零和负零都会被当作正常的 0。唯一有区别的场合是，`+0`或`-0`当作分母，返回的值是不相等的。

`(1 / +0) === (1 / -0) // false`

上面的代码之所以出现这样结果，是因为除以正零得到 `+Infinity`，除以负零得到 `-Infinity`，这两者是不相等的。

2).`NaN`

`NaN`是 JavaScript 的特殊值，表示**非数字（Not a Number）**，主要出现在将字符串解析成数字出错的场合。

`5 - 'x' // NaN`

上面代码运行时，会自动将字符串 x 转为数值，但是由于 x 不是数值，所以最后得到结果为 `NaN`，表示它是“非数字”（`NaN`）。

需要注意的是，`NaN` 不是独立的数据类型，而是一个特殊数值，它的数据类型依然属于 `Number`。

`NaN` 不等于任何值，包括它本身。`NaN` 与任何数（包括它自己）的运算，得到的都是 `NaN`。

> 数组的 `indexOf` 方法内部使用的是严格相等运算符，所以该方法对 `NaN` 不成立。

3).`Infinity`

`Infinity` 表示“无穷”，用来表示两种场景。一种是一个正的数值太大，或一个负的数值太小，无法表示；另一种是非 0 数值除以 0，得到 `Infinity`。

```javascript
Math.pow(2, 1024);
// Infinity

0 / 0; // NaN
1 / 0; // Infinity
```

`Infinity` 有正负之分，`Infinity` 表示正的无穷，`-Infinity` 表示负的无穷。

`Infinity === -Infinity // false`

由于数值正向溢出、负向溢出和被 0 除，JavaScript 都不报错，而是返回 `Infinity`，所以单纯的数学运算几乎没有可能抛出错误。

`Infinity` 大于一切数值（除了 `NaN`），`-Infinity` 小于一切数值（除了 `NaN`）。

`Infinity` 的四则运算，(部分)符合无穷的数学计算规则。

```javascript
//一些特例

0 * Infinity; // NaN
0 / Infinity; // 0
Infinity / 0; // Infinity

Infinity - Infinity; // NaN
Infinity / Infinity; // NaN

null * Infinity; // NaN
null / Infinity; // 0
Infinity / null; // Infinity
```
