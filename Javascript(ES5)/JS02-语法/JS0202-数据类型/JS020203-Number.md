### 4.5 Number 类型

#### 4.5.1 isNaN

检测一个值不是有效数字；若是有效数字返回 false，不是有效数字返回 true。

- **必要性**

与 JavaScript 中其他的值不同，`NaN` 不能通过相等操作符（`==` 和 `===`）来判断 ，因为 `NaN == NaN` 和 `NaN === NaN` 都会返回 false。 因此，`isNaN` 就很有必要了。

> 事实上，在 `==/!=` 和 `===/!==` 运算中，`NaN` 和任何“数”都不等，包括自身。

- **产生**

当算术运算返回一个未定义的或无法表示的值时，`NaN` 就产生了。但是，`NaN` 并不一定用于表示某些值超出表示范围的情况。将某些不能强制转换为数值的非数值转换为数值的时候，也会得到 `NaN`。

- **怪异行为**

如果 `isNaN` 函数的参数不是 Number 类型， `isNaN` 函数会首先尝试将这个参数转换为数值，然后才会对转换后的结果是否是 `NaN` 进行判断。因此，对于能被强制转换为有效的非 `NaN` 数值来说（空字符串和布尔值分别会被强制转换为数值 0 和 1），返回 false 值也许会让人感觉莫名其妙。

比如说，空字符串就明显“不是数值（not a number）”。这种怪异行为起源于："不是数值（not a number）"在基于 IEEE-754 数值的浮点计算体制中代表了一种特定的含义。`isNaN` 函数其实等同于回答了这样一个问题：被测试的值在被强制转换成数值时会不会返回 IEEE-754​ 中所谓的“不是数值（not a number）”。

下一个版本的 ECMAScript (ES2015) 包含 `Number.isNaN()` 函数。通过 `Number.isNaN(x)` 来检测变量 `x` 是否是一个 `NaN` 将会是一种可靠的做法。然而，在缺少 `Number.isNaN` 函数的情况下, 通过表达式 `(x != x)` 来检测变量 `x` 是否是 `NaN` 会更加可靠。

> 可以利用这个特殊行为来检测函数的参数是可运算的。
> 注意 `isNaN` 是挂载在 window 下的，注意区分 `isNaN` 和 `Number.isNaN`

```javascript
// boolean
isNaN(true); //false

// number
isNaN(0123); //false
isNaN(0x123); //false
isNaN(-123); //false
isNaN(0.123); //false

//null && undefined
isNaN(null); //false
isNaN(undefined); //true
isNaN(NaN); //true

//object
isNaN({}); //true
isNaN({ name: "hhh" }); //true
isNaN({ 1: "2" }); //true

//array
isNaN([]); //false
isNaN([1]); //false
isNaN(["1x"]); //true
isNaN([1, 2]); //true

//string
isNaN("123"); //false
isNaN("+123"); //false
isNaN(""); //false

// 一个 isNaN 的 polyfill 可以理解为（这个 polyfill 利用了 NaN 自身永不相等于自身这一特征）
function myIsNaN(value) {
  return typeof value === "number" && isNaN(value);
  //推荐用法
  var n = Number(value);
  return value !== value;
}
```

更多 demo 见 <a href="./demo/number01.html" target="_blank">number01.html</a>

`isNaN` 也适用于对象。在基于对象调用 `isNaN` 函数时，会首先调用对象的 `valueOf` 方法，然后确定该方法返回的值是否可以装换为数值。如果不能，则基于这个返回值再调用 `toString` 方法，再测试(`parseFloat`)返回值，而这个过程也是 ECMAScript 中内置函数和操作符的一般执行流程。

> 根据测试结果来看，在 `isNaN` 类型转换中默认调用 `Number()` 方法

- **`Number.isNaN()`**

确定传递的值是否为 `NaN` 和其类型是 Number。它是原始的全局 `isNaN()` 的更强大的版本。

和全局函数 `isNaN()` 相比，该方法不会强制将参数转换成数字，只有在参数是真正的数字类型，且值为 `NaN` 的时候才会返回 true。

#### 4.5.2 isFinite

`isFinite` 方法返回一个布尔值，表示某个值是否为正常的数值。

除了 `Infinity`、`-Infinity`、`NaN` 和 `undefined` 这几个值会返回 false，`isFinite` 对于其他的**数值**都会返回 true。

```javascript
isFinite(Infinity); //false
isFinite(-Infinity); //false
isFinite(NaN); //false
isFinite(undefined); //false
isFinite(null); //true
isFinite(123); //true
isFinite("1.23"); //true
isFinite({}); //false
```

自然类似 `isNaN`,`isFinite` 的非数值参数也会调用 `Number()` 方法进行转换，同样也是全局方法。更强大的方法是 `Number.isFinite`。

- **`Number.isFinite`**

和全局的 `isFinite()` 函数相比，这个方法不会强制将一个非数值的参数转换成数值，这就意味着，只有数值类型的值，且是有穷的（finite），才返回 true。

```js
Number.isFinite(null); //false
Number.isFinite(123); //true
Number.isFinite("1.23"); //false
```

更多 demo 见 <a href="./demo/number02.html" target="_blank">number02.html</a>

#### 4.5.3 Number

强制将其他数据类型转换为 `number` 类型；如果是字符串，只有全部是数字才能转换。

`Number` 函数转换规则：

1).`Boolean` 值，转换 0 或 1；

```javascript
Number(true); //1
Number(false); //0
```

2).数字值，简单传入传出（第一个数为 `0`，则会被认为是八进制数，忽略剩余前导 `0`，再转化为十进制输出；若前两位为 `0x`，则会被认为是十六进制，转化为十进制）；

```javascript
Number(-Infinity); //-Infinity
Number(NaN); //NaN
Number(132); //132

// 小数点后的 0 超过 5 位，自动转化为科学计数法
Number(0.000000132); //1.32e-7

// 小数点前的 0 超过 20 位，自动转化为科学计数法
Number(3000000000000000000000); //3e+21

// 多个前导 0 会被当做八进制数解析
Number(0011); //9

// 二进制
Number(0b11); //3
// 八进制
Number(011); //9
// 十六进制
Number(0x456); //1110
```

> 注意：

> 1.小数点后的 0 超过 5 位，自动转化为科学计数法；

> 2.小数点前的 0 超过 20 位，自动转化为科学计数法；

> 3.多个前导 0 会被当做八进制数解析；

> 4.`0.012` 等价 `.012`； 5.`Infinity` 和 `-Infinity` 返回自身；

3).空数组也会转换为 0；可以转化数值的单数值数组转换对应的数值；其他数组为 `NaN`；

```javascript
Number([]); //0
Number([1, 2]); //NaN
// 特例： [null/undefined].toString() == ""
Number([null]); //0
Number([undefined]); //0
```

> 单数组如果是字符串，则参考字符串类型转换规则

4).`null`，输出 0; `undefined`，输出 `NaN`;

```javascript
Number(null); //0
Number(undefined); //NaN
```

5).如果是对象。则调用对象的 `valueOf` 方法，然后依照前面规则转换返回值。如果转换的结果是 `NaN`，则调用对象的 `toString` 方法。

```javascript
Number({}); //NaN
Number({ name: "hhh" }); //NaN
```

6).如果是字符串：

---

从第一个非 0 数字或者 `+/-` 开始解析，直到结束（末尾空格忽略），如果中途出现任何非数字字符或者一个以上的小数点则解析失败，返回 `NaN`。（特殊情况：如果第一个字符为 0，后一位字符为 b 或 x，则当做二进制或十六进制解析，并将结果转换为十进制输出；同样， 2e+21 之类的会当做科学计数法进行解析）

---

```javascript
Number(""); //0
Number(" 123"); //123
Number("1 23"); //NaN
Number("1.2.3"); //NaN

// 二进制
Number("0b11"); //3
// 八进制 不识别
Number("011"); //11
// 十六进制
Number("0x11"); //17
// 科学计数法类似数值
Number("0.00000013"); //1.3e-7
Number("2000000000000000000000"); //2e+21
console.groupEnd();
```

> 字符串中的前导 0 会被忽略

更多 demo 见 <a href="./demo/number03.html" target="_blank">number03.html</a>

#### 4.5.4 parseInt

> [如何实现一个parseInt](https://www.lagou.com/lgeduarticle/111969.html)
> [parseInt (string , radix)](http://ecma-international.org/ecma-262/5.1/#sec-15.1.2.2)

非强制数据类型转换

1).主要用于将**字符串**转为整数；

2).忽略字符串前面的空格，直至找到第一个非空格字符（前导 0 一般会被忽略，除非构成进制标记）；

3).如果第一个字符不是数字字符或正负号(符号后面必须有数字)，则返回 `NaN`；

4).直至解析完所有数字字符或遇到非数字字符(不识别小数点，但能识别进制标记，也会自动转化科学计数法)，返回已转为数字的部分；

对于非字符类型参数，优先调用 `toString()`，没有 `toString()` 方法则调用 `String()` 方法转化为字符串。

```javascript
// boolean
parseInt(true); //NaN
parseInt(false); //NaN

// number
parseInt(-Infinity); //NaN
parseInt(NaN); //NaN

// 小数
parseInt(0.132); //0
parseInt(0.00000132); //0
parseInt(300000000000000000000); //300000000000000000000
// 这里会先转为 3e+21, 再解析 --》 3
parseInt(3000000000000000000000); //3
// 多个前导 0
parseInt(0011); //9
// 二进制
parseInt(0b11); //3
// 八进制
parseInt(011); //9
// 十六进制
parseInt(0x456); //1110

// null undefined
parseInt(undefined); //NaN
parseInt(null); //NaN

// str
parseInt(""); //NaN
parseInt(" "); //NaN
parseInt(" 123"); //123
parseInt("1 23"); //1
// 二进制
parseInt("0b11"); //0
// 八进制
parseInt("011"); //11
// 十六进制
parseInt("0x11"); //17
//
parseInt("0.0000013"); //0
parseInt("2000000000000000000000"); //2e+21
parseInt("2e+21"); //2

// obj
parseInt({}); //NaN
parseInt({ 1: 2 }); //NaN

// ary
parseInt([]); //NaN
parseInt([1, 2]); //1
```

5).存在第二个参数，用来指定转换时的所使用的基数（进制）；如果第二个参数不是数值，会被自动转为（调用 `parseInt()`）一个整数。这个整数只有在 2 到 36 之间，才能得到有意义的结果，(转化为数字后)超出这个范围，则返回 `NaN`；

> 特殊值：如果第二个参数是或者转化为 0、`NaN`、`undefined` 和 `null`，则直接忽略。
> `parseInt` 的第二个参数默认为 10，即不指定第二个参数的情况下，默认都转十进制输出；

```javascript
parseInt("10", 1); //NaN
parseInt("10", 2); //2
parseInt("10", 36); //36
parseInt("10", 37); //NaN

parseInt("10", 0); //10
parseInt("10", ""); //10
parseInt("10", NaN); //10
parseInt("10", null); //10
parseInt("10", undefined); //10
parseInt("10", true); //NaN
```

第一个参数若不是字符串，会自动转换为字符串再读取(`String`)；但这回导致一些意外：

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
parseInt("9", 2);
```

如果第一个参数字符串包含对于指定进制无意义的字符，则从最高位开始，只返回可以转换的数值。如果最高位无法转换，则直接返回 `NaN`。

```javascript
parseInt("1546", 2); // 1
parseInt("546", 2); // NaN
```

6).对于会自动转化为科学计数法的数值类型参数，`parseInt` 会产生一些奇怪的结果，而`parseFloat` 不会(原因在于 `parseInt` 会先转化为科学计数法再转化为字符串，最后解析输出；而 `parseFloat` 先转化为字符串，再解析，最后自动转化科学计数法输出)。

```javascript
parseInt(0.0000008); //8
// ↓
parseInt(8e-7); //8
// ↓
parseInt("8e-7"); //8

parseFloat(0.0000008); //8e-7
// ↓
parseFloat("0.0000008"); //8e-7
// ↓
parseFloat(8e-7); //8e-7
```

更多 demo 见 <a href="./demo/number04.html" target="_blank">number04.html</a>

#### 4.5.5 parseFloat

1).`parseFloat` 方法用于将一个字符串转为浮点数(同 `parseInt`，但多识别一个小数点)。

2).如果字符符合科学计数法，则会进行相应的转换；若有不能转换为浮点数的字符，就返回已转好的部分。

3).自动过滤前导空格；若参数不是字符串或者字符串的第一个字符不能转换为浮点数，则返回 `NaN`。

```javascript
// boolean
parseFloat(true); //NaN

// number
parseFloat(-Infinity); //-Infinity
parseFloat(NaN); //NaN
parseFloat(132); //132
// 小数
parseFloat(0.000000132); //1.32e-7
parseFloat(3000000000000000000000); //3e+21
// 多个前导 0
parseFloat(0011); //9
// 二进制
parseFloat(0b11); //3
// 八进制
parseFloat(011); //9
// 十六进制
parseFloat(0x456); //1110

// null undefined
parseFloat(undefined); //NaN
parseFloat(null); //NaN

// str
parseFloat(""); //NaN
parseFloat(" 123"); //123
parseFloat("1 23"); //1
parseFloat("1.23"); //1.23
// 二进制
parseFloat("0b11"); //0
// 八进制
parseFloat("011"); //11
// 十六进制
parseFloat("0x11"); //0
//
parseFloat("0.00000013"); //1.3e-7
parseFloat("2000000000000000000000"); //2e+21
parseFloat("2e+21"); //2e+21
// obj
parseFloat({}); //NaN
// ary
parseFloat([]); //NaN
parseFloat([1]); //1
parseFloat(["1", "2"]); //1
```

> 注意：

> 1.`parseFloat` 能有效识别 `Infinity/-Infinity`，而 `parseInt` 则不能；

> 2.参数为字符串类型时，`parseFloat` 不会识别进制，而 `parseInt` 则会区分二进制和十六进制；

> 3.两者在数值类型参数时，能区分各种进制（关于八进制后面有详述）

更多 demo 见 <a href="./demo/number05.html" target="_blank">number05.html</a>

#### 4.5.6 浮点运算

JavaScript 内部，所有数字都是以 64 位浮点数形式储存，即使整数也是如此。所以，1 与 1.0 是相同的，是同一个数。

`1 === 1.0 // true`

这就是说，JavaScript 语言的底层根本没有整数，所有数字都是小数（64 位浮点数，也就是标准的 double 双精度浮点数）。这样的存储结构优点是可以归一化处理整数和小数，节省存储空间。

根据国际标准 IEEE 754，JavaScript 浮点数的 64 个二进制位，从最左边开始，是这样组成的。

---

- 第 1 位：符号位，0 表示正数，1 表示负数
- 第 2 位到第 12 位（共 11 位）：指数部分
- 第 13 位到第 64 位（共 52 位）：小数部分（即有效数字）

---

符号位决定了一个数的正负，指数部分决定了数值的大小，小数部分决定了数值的精度。

容易造成混淆的是，某些运算只有整数才能完成，此时 JavaScript 会自动把 64 位浮点数，转成 32 位整数，然后再进行运算。由于**浮点数不是精确的值**，所以涉及小数的比较和运算要特别小心。

```javascript
0.1 + 0.2 === 0.3
// false

0.1 + 0.2 =
//0.300 000 000 000 000 04

0.3 / 0.1
//2.999 999 999 999 999 6

(0.3 - 0.2) === (0.2 - 0.1)
// false

// 解析 0.1 + 0.2 = 0.3000 0000 0000 0000 4
// 首先：十进制的 0.1 0.2  转换为二进制
0.1 -> 0.0001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 ...(1001 循环)
0.1 -> 0.0001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 101
0.2 -> 0.0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 ...(0011 循环)
0.2 -> 0.0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 0011 01

// 其次：
0.1 + 0.2 -> 0.0100 1100 1100 1100 1100 1100 1100 1100 1100 1100 1100 1100 1100 111

// 再其次：转换十进制
0.0100 1100 1100 1100 1100 1100 1100 1100 1100 1100 1100 1100 1100 111
->
0.3000 0000 0000 0000 4

// 1 - 0.9 = 0.0999 9999 9999 9999 8
// 1 -> 1
// 0.9 -> 0.1110 0110 0110 0110 0110 0110 0110 0110 0110 0110 0110 0110 0110 1
// 1 - 0.9 -> 0.0001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1001 1
// -> 0.0999 9999 9999 9999 8
```

对于那些极大或极小的数值，可以用 `e` 表示法表示浮点数值。默认情况下，ECMAScript 会将那些小数点后面带有 6 个 0 以上的浮点数值转换为以 `e` 表示的数值，小数点前有 20 个 0 以上的浮点数也转换。浮点数值最高精确度是 17 位小数，但在进行算数计算时精确度远远不如整数。因此，永远不要测试某个特定的浮点数值。

> 关于浮点数值计算产生舍入误差的问题，这是基于 IEEE754 数值的浮点数值计算的通病。
> 数值运算中，任何涉及 `NaN` 和 `undefined` 的运算，结果均为 `NaN`；`null` 会转换为 0 参与运算。

- **如何解决浮点误差**

将小数放大成整数，再进行运算。

#### 4.5.7 数值范围

JavaScript 不区分整数值和浮点数值，所有数字均用浮点数值表示。JavaScript 采用 IEEE 754 标准定义的 64 位浮点格式表示数字，这意味着它能表示的最大数是 `±1.7976931348623157 * 10^308`，最小值是 `±5*10^-324`。

按照 JavaScript 中的数字格式，能够表示的整数范围是 `-2^53` ~ `2^53`，包含边界。如果超过范围，则无法保证地位数字的精度。然而需要注意的是，JavaScript 实际的操作是基于 32 位整数。

指数部分一共有 11 个二进制位，因此大小范围就是 0 到 2047。IEEE 754 规定，如果指数部分的值在 0 到 2047 之间（不含两个端点），那么有效数字的第一位默认总是 1，不保存在 64 位浮点数之中。也就是说，有效数字这时总是 1.xx...xx 的形式，其中 xx..xx 的部分保存在 64 位浮点数之中，最长可能为 52 位。因此，JavaScript 提供的有效数字最长为 53 个二进制位。

精度最多只能到 53 个二进制位，这意味着，绝对值小于等于 2 的 53 次方的整数，即 -2^53 到 2^53，都可以精确表示。

也就是说在(-2^53, 2^53)范围内，双精度数表示和整数是一对一的，反过来说，在这个范围以内，所有的整数都有唯一的浮点数表示，这叫做安全整数。

而超过这个范围，会有两个或更多整数的双精度表示是相同的；反过来说，超过这个范围，有的整数是无法精确表示的，只能 round 到与它相近的浮点数（说到底就是科学计数法）表示，这种情况下叫做不安全整数。

```js
Math.pow(2, 53); //9007199254740992
Math.pow(2, 53) + 1; //9007199254740992
Math.pow(2, 53) + 2; //9007199254740994
Math.pow(2, 53) + 3; //9007199254740996
```

如果一个数大于等于 2 的 1024 次方，那么就会发生“**正向溢出（overflow）**”，即 JavaScript 无法表示这么大的数，这时就会返回 `Infinity`。

```javascript
Math.pow(2, 1023); //8.98846567431158e+307
Math.pow(2, 1024); //Infinity/1.7976931348623157e+308
Math.pow(2, -1074); //5e-324
Math.pow(2, -1075); //0
```

如果一个数小于等于 2 的 -1075 次方（指数部分最小值 -1023，再加上小数部分的 52 位），那么就会发生为“**负向溢出（underflow）**”，即 JavaScript 无法表示这么小的数，这时会直接返回 0。

```javascript
Math.pow(2, -1074); //5e-324
Math.pow(2, -1075); //0（chrome）/5e-324（ff）
```

JavaScript 提供 `Number` 对象的 `MAX_VALUE` 和 `MIN_VALUE` 属性，返回可以表示的具体的最大值和最小值。

```javascript
// 最大值
Number.MAX_VALUE; // 1.7976931348623157e+308
// 最小值
Number.MIN_VALUE; // 5e-324
// 最大安全数
Number.MAX_SAFE_INTEGER; //9007199254740991
// 最小安全数
Number.MIN_SAFE_INTEGER; //-9007199254740991
// 正无穷
Number.POSITIVE_INFINITY; //Infinity
// 负无穷
Number.NEGATIVE_INFINITY; //-Infinity
// 误差范围
Number.EPSILON; //2.220446049250313e-16
```

> 如果某次计算返回了 `Infinity` 值，那么该值将无法继续参与下一次的计算，因为 `Infinity` 值不能参与数值计算。
> 要想确定一个值是不是有穷的，可以使用 `isFinite` 函数，如果该值位于最小值和最大值之间，返回 true。

#### 4.5.8 数值的表示法

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

#### 4.5.9 数值的进制

使用**字面量（literal）**直接表示一个数值时，JavaScript 对整数提供四种进制的表示方法：

---

- 十进制：没有前导 0 的数值。
- 八进制：见下面详述。
- 十六进制：有前缀 `0x` 或 `0X` 的数值。
- 二进制：有前缀 `0b` 或 `0B` 的数值。

---

默认情况下，JavaScript 内部会自动将八进制、十六进制、二进制转为十进制。如果八进制、十六进制、二进制的数值里面，出现不属于该进制的数字，就会报错（错误类型：`SyntaxError: Invalid or unexpected token`）。

- **八进制**

通常来说，有前导 0 的数值会被视为八进制，但是前导 0 表示八进制，处理时很容易造成混乱。ES5 的严格模式和 ES6，已经废除了这种表示法，但是浏览器为了兼容以前的代码，目前还继续支持这种表示法。ES6 新增八进制数字的字面量：`0o77`，以 `0o` 标记八进制。

```js
011; //9
08; //8
00011; //9
0o11; //9

("use strict");
011;
//SyntaxError: Octal literals are not allowed in strict mode.
```

> 通常来说，有前导 0 的数值会被视为八进制，但是如果前导 0 后面有数字 8 和 9，则该数值被视为十进制。
> 八进制字面量在严格模式下是无效的，会导致支持该模式的 JavaScript 引擎抛出错误。

#### 4.5.10 特殊数值

JavaScript 提供了几个特殊的数值。

1).正零和负零

前面说过，JavaScript 的 64 位浮点数之中，有一个二进制位是符号位。这意味着，任何一个数都有一个对应的负值，就连 0 也不例外。

JavaScript 内部实际上存在 2 个 0：一个是 `+0`，一个是 `-0`，区别就是 64 位浮点数表示法的符号位不同。它们是等价的。

几乎所有场合，正零和负零都会被当作正常的 0。唯一有区别的场合是，`+0` 或 `-0` 当作分母，返回的值是不相等的。

```js
-0 === +0; //true

1 / +0 === 1 / -0; // false
```

上面的代码之所以出现这样结果，是因为除以正零得到 `+Infinity`，除以负零得到 `-Infinity`，这两者是不相等的。

2).`NaN`

`NaN` 是 JavaScript 的特殊值，表示**非数字（Not a Number）**，主要出现在将字符串解析成数字出错的场合。

```js
5 - "x"; // NaN

typeof NaN; //'number'

[NaN].indexOf(NaN); //-1
```

上面代码运行时，会自动将字符串 `x` 转为数值，但是由于 `x` 不是数值，所以最后得到结果为 `NaN`，表示它是“非数字”（`NaN`）。

需要注意的是，`NaN` 不是独立的数据类型，而是一个特殊数值，它的数据类型依然属于 `Number`。

`NaN` 不等于任何值，包括它本身。`NaN` 与任何数（包括它自己）的运算，得到的都是 `NaN`。

> 数组的 `indexOf` 方法内部使用的是严格相等运算符，所以该方法对 `NaN` 不成立。

3).`Infinity`

`Infinity` 表示“无穷”，用来表示两种场景。一种是一个正的数值太大，或一个负的数值太小，无法表示；另一种是非 0 数值除以 0，得到 `Infinity`。

```javascript
// 1
Math.pow(2, 1024); // Infinity

// 2
1 / 0; // Infinity
```

`Infinity` 有正负之分，`Infinity` 表示正的无穷，`-Infinity` 表示负的无穷。

```js
Infinity === -Infinity; // false

-1 / 0; //-Infinity
```

由于数值正向溢出、负向溢出和被 0 除，JavaScript 都不报错，而是返回 `Infinity`，所以单纯的数学运算几乎没有可能抛出错误。

`Infinity` 大于一切数值（除了 `NaN`），`-Infinity` 小于一切数值（除了 `NaN`）。

> `Infinity` 与 `NaN` 比较，总是返回 false。

- **运算规则**

  1.`Infinity` 的四则运算，(部分)符合无穷的数学计算规则。

  2.`Infinity` 与 `null` 计算时，`null` 会转成 0，等同于与 0 的计算。

  3.`Infinity` 与 `undefined` 计算，返回的都是 `NaN`。

```javascript
//一些特例
0 * Infinity; // NaN
0 / Infinity; // 0
Infinity / 0; // Infinity

Infinity - Infinity; // NaN
Infinity / Infinity; // NaN
```

更多 demo 见 <a href="./demo/Infinity.html" target="_blank">Infinity.html</a>

参考：

[JavaScript 浮点数陷阱及解法](https://github.com/camsong/blog/issues/9)

[JS 中浮点数精度问题](https://juejin.im/post/5aa1395c6fb9a028df223516)

[细说 JavaScript 七种数据类型](https://www.cnblogs.com/onepixel/p/5140944.html)
