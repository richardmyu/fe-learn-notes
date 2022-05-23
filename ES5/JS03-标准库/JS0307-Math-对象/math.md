# Math 对象

ECMAScript 为数学公式和信息提供了一个公共位置，即 `Math` 对象。与其他全局对象不同的是，*该对象不是构造函数，不能生成实例*，`Math` 的所有属性与方法都是静态的，所有的属性和方法都必须在 `Math` 对象上调用。

> `Math` 用于 `Number` 类型。它不支持 `BigInt`。

## 1.静态属性

|      属性      |        说明         |
| :------------: | :-----------------: |
|    `Math.E`    |       常数 e        |
|   `Math.LN2`   |    2 的自然对数     |
|  `Math.LN10`   |    10 的自然对数    |
|  `Math.LOG2E`  | 以 2 位底 e 的对数  |
| `Math.LOG10E`  | 以 10 为 e 底的对数 |
|   `Math.PI`    |       π 的值        |
| `Math.SQRT1_2` |     1/2 平方根      |
|  `Math.SQRT2`  |      2 平方根       |

> 属性都是大写并且是只读的，**存储值**。

```js
Math.E; // 2.718281828459045
Math.LN2; // 0.6931471805599453
Math.LN10; // 2.302585092994046
Math.LOG2E; // 1.4426950408889634
Math.LOG10E; // 0.4342944819032518
Math.PI; // 3.141592653589793
Math.SQRT1_2; // 0.7071067811865476
Math.SQRT2; // 1.4142135623730951
```

## 2.静态方法

> 注意，方法都是小写；
> **备注**：需要注意的是，很多 `Math` 函数都有一个精度，而且这个精度在不同实现中也是不相同的。这意味着不同的浏览器会给出不同的结果，甚至，在不同的系统或架构下，相同的 JS 引擎也会给出不同的结果！
> **备注**：需要注意的是，三角函数 `sin()`、`cos()`、`tan()`、`asin()`、`acos()`、`atan()` 和 `atan2()` 返回的值是弧度而非角度。若要转换，弧度除以 `(Math.PI / 180)` 即可转换为角度，同理，角度乘以这个数则能转换为弧度。

### 2.1.取值

#### 2.1.1.`Math.abs`

- **语法**

```js
Math.abs(x);
```

- **参数**
  - 一个数值；
  - 传入一个非数字形式的字符串或者 `undefined/empty` 变量，将返回 `NaN`；
  - 传入 `null` 将返回 `0`；

- **实例**

```js
Math.abs(); // NaN

Math.abs(-2); // 2
Math.abs(null); // 0
Math.abs(undefined); // NaN

Math.abs(''); // 0
Math.abs('-1'); // 1
Math.abs('string'); // NaN

Math.abs(true); // 1

Math.abs([]); // 0
Math.abs([2]); // 2
Math.abs([1,2]); // NaN

Math.abs({}); // NaN
```

#### 2.1.2.`Math.max` 和 `Math.min`

用于返回一组数中的最大值或最小值。

- **语法**

```js
Math.max(value1[,value2, ...]);
Math.min(value1[,value2, ...]);
```

- **参数**
  - `value1, value2, ...`
    - 一组数值;
    - 如果给定的参数中至少有一个参数无法被转换成数字，则会返回 `NaN`；
    - 如果没有参数，则结果为 `-Infinity` 或 `Infinity`。

- **示例**

```js
// 若要找到数组中的最大/最小值，可以使用 apply() 方法
//关键在于，把 Math 对象作为 apply() 的第一个参数，正确的设置 this，然后，可以将任何数组当做第二个参数；

var ary = [1, 3, 2, 6, 12], max, min;
max = Math.max.apply(Math, ary);
// or
// max = Math.max(...ary);
console.log(max); // 12

min = Math.min.apply(Math, ary);
// or
// min = Math.min(...ary);
console.log(min); // 1
```

#### 2.1.3.取整

`Math.ceil()` 函数返回大于或等于一个给定数字的最小整数。

`Math.floor()` 返回小于或等于一个给定数字的最大整数。

`Math.round()` 函数返回一个数字四舍五入后最接近的整数。

`Math.trunc()` 方法会将数字的小数部分去掉，只保留整数部分。

| 方法名         | 功能         |
| -------------- | ------------ |
| `Math.ceil()`  | 执行向上舍入 |
| `Math.floor()` | 执行向下舍入 |
| `Math.round()` | 执行标准舍入 |
| `Math.trunc()` | 只保留整数   |

- **对于 `Math.round()`**：
  - 如果参数的小数部分大于 0.5，则舍入到相邻的绝对值更大的整数；
  - 如果参数的小数部分小于 0.5，则舍入到相邻的绝对值更小的整数；
  - 如果参数的小数部分恰好等于 0.5，则舍入到相邻的在正无穷（+∞）方向上的整数。

> 注意，与很多其他语言中的 `round()` 函数不同，`Math.round()` 并不总是舍入到远离 0 的方向（尤其是在负数的小数部分恰好等于 0.5 的情况下）。

- **语法**

```js
Math.ceil(x);
Math.floor(x);
Math.round(x);
Math.trunc(x);
```

- **实例**

```js
Math.ceil(); // NaN
Math.floor(); // NaN
Math.round(); // NaN
Math.trunc(); // NaN

Math.ceil(''); // 0
Math.floor(''); // 0
Math.round(''); // 0
Math.trunc(''); // 0

Math.ceil('3.14'); // 4
Math.floor('3.14'); // 3
Math.round('3.14'); // 3
Math.trunc('3.14'); // 3

Math.ceil([]); // 0
Math.floor([]); // 0
Math.round([]); // 0
Math.trunc([]); // 0

Math.ceil([3.1415]); // 4
Math.floor([3.1415]); // 3
Math.round([3.1415]); // 3
Math.trunc([3.1415]); // 3

Math.ceil({}); // 0
Math.floor({}); // 0
Math.round({}); // 0
Math.trunc({}); // 0

Math.ceil(null); // 0
Math.floor(null); // 0
Math.round(null); // 0
Math.trunc(null); // 0

Math.ceil(undefined); // 0
Math.floor(undefined); // 0
Math.round(undefined); // 0
Math.trunc(undefined); // 0

Math.ceil(NaN); // 0
Math.floor(NaN); // 0
Math.round(NaN); // 0
Math.trunc(NaN); // 0

Math.ceil(1.3); // 2
Math.floor(1.3); // 1
Math.round(1.3); // 1
Math.trunc(1.3); // 1

Math.ceil(1.5); // 2
Math.floor(1.5); // 1
Math.round(1.5); // 2
Math.trunc(1.5); // 1

Math.ceil(1.7); // 2
Math.floor(1.7); // 1
Math.round(1.7); // 2
Math.trunc(1.7); // 1

Math.ceil(-1.3); // -1
Math.floor(-1.3); // -2
Math.round(-1.3); // -1
Math.trunc(-1.3); // -1

Math.ceil(-1.5); // -1
Math.floor(-1.5); // -2
Math.round(-1.5); // -1
Math.trunc(-1.5); // -1

Math.ceil(-1.7); // -1
Math.floor(-1.7); // -2
Math.round(-1.7); // -2
Math.trunc(-1.7); // -1
```

#### 2.1.4.浮点数

`Math.fround()` 可以将任意的数字转换为离它最近的单精度浮点数形式的数字。

JavaScript 内部使用 64 位的双浮点数字，支持很高的精度。但是，有时你需要用 32 位浮点数字，比如你从一个  `Float32Array` 读取值时。这时会产生混乱：检查一个 64 位浮点数和一个 32 位浮点数是否相等会失败，即使二个数字几乎一模一样。

要解决这个问题，可以使用 `Math.fround()` 来将 64 位的浮点数转换为 32 位浮点数。在内部，JavaScript 继续把这个数字作为 64 位浮点数看待，仅仅是在尾数部分的第 23 位执行了“舍入到偶数”的操作，并将后续的尾数位设置为 0。如果数字超出 32 位浮点数的范围，则返回 `Infinity` 或 `-Infinity`。

- **语法**

```js
Math.fround(doubleFloat)
```

- **参数**
  - `doubleFloat`
    - 一个 `Number`。
    - 若参数为非数字类型，则会被转投成数字。无法转换时，设置成 `NaN`。

- **返回值**
  - 指定数字最接近的 32 位单精度浮点数表示。

- **实例**

```js
// 数字 1.5 可以在二进制数字系统中精确表示，32 位和 64 位的值相同
Math.fround(1.5); // 1.5
Math.fround(1.5) === 1.5; // true

// 数字 1.337 却无法在二进制数字系统中精确表示，所以 32 位和 64 位的值是不同的
Math.fround(1.337); // 1.3370000123977661
Math.fround(1.337) === 1.337; // false

// 2^150 超出32位浮点，所以返回 Infinity
2 ** 150; // 1.42724769270596e+45
Math.fround(2 ** 150); // Infinity

// 如果参数无法转换成数字，或者为 NaN （NaN）
// Math.fround() 会返回 NaN
Math.fround('abc'); // NaN
Math.fround(NaN); // NaN

// 在某些精度不高的场合下，
// 可以通过将二个浮点数转换成32位浮点数进行比较，
// 以解决64位浮点数比较结果不正确的问题
0.1 + 0.2 == 0.3; // false

function equal(v1, v2) {
    return Math.fround(v1) == Math.fround(v2);
}

equal(0.1 + 0.2, 0.3); //true
```

- **Polyfill**

```js
// 下面的函数可以模拟这个 API
// 前提是浏览器必须已经支持 Float32Array
Math.fround = Math.fround || (function (array) {
  return function(x) {
    return array[0] = x, array[0];
  };
})(new Float32Array(1));
```

### 2.4.`Math.random`

返回一个浮点数，伪随机数在范围从 0 到 1（不包括 1）。

> 值域：[0, 1)。
> **备注**：`Math.random()` 不能提供像密码一样安全的随机数字。不要使用它们来处理有关安全的事情。使用 [Web Crypto API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Crypto_API) 来代替，和更精确的 [`window.crypto.getRandomValues()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Crypto/getRandomValues) 方法。

- **语法**

```js
Math.random()
```

- **示例**

注意，由于 JavaScript 中的数字是 IEEE 754 浮点数字，具有 **最近舍入**（ round-to-nearest-even）的行为，因此以下函数的范围 (不包括 `Math.random()` 本身) 并不准确。如果选择了非常大的边界 (`2^53` 或更高)，在极罕见的情况下会计算通常-排除（usually-excluded）的上界。（注：round-to-nearest-even 采用最近舍入的去偶数舍入的方式，对 .5 的舍入上，采用取偶数的方式）

```js
// 得到一个大于等于 0，小于 1 之间的随机数
function getRandom() {
  return Math.random();
}

// 得到一个两数之间的随机数
// 这个值不小于 min（有可能等于），并且小于（不等于）max。
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
// 这个值不小于 min （如果 min 不是整数，则不小于 min 的向上取整数），且小于（不等于）max。
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // 不含最大值，含最小值
}

// 得到一个两数之间的随机整数，包括两个数在内
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // 含最大值，含最小值
}
```

### 2.5.幂积

#### 2.5.1.`Math.pow`

返回基数（base）的指数（exponent）次幂，即 `base^exponent`。

- **语法**

```js
Math.pow(base, exponent)
```

- **参数**
  - `base`
    - 基数
  - `exponent`
    - 指数

- **实例**

```js
Math.pow(2, 10); // 1024
Math.pow(2, -10); // 0.0009765625

Math.pow(2, '10'); // 1024
Math.pow(2, null); // 1
Math.pow(2, []); // 1
```

#### 2.5.2.`Math.exp`

返回 `e^x`，`x` 表示参数，`e` 是欧拉常数（Euler's constant），自然对数的底数。

- **语法**

```js
Math.exp(x)
```

- **参数**
  - x
    - 一个数值；

- **示例**

```js
Math.exp(-1); // 0.36787944117144233
Math.exp(0);  // 1
Math.exp(1);  // 2.718281828459045
```

#### 2.5.3.`Math.expm1`

返回 `e^x - 1`。

- **语法**

```js
Math.expm1(x)
```

- **参数**
  - x
    - 一个数值；

- **示例**

```js
Math.expm1(1)     // 1.7182818284590453
Math.expm1(-38)   // -1
Math.expm1("-38") // -1
Math.expm1("foo") // NaN
```

### 2.6.开方

#### 2.6.1.`Math.sqrt`

返回一个数的平方根。

- **语法**

```js
Math.sqrt(x)
```

- **参数**
  - x
    - 一个数值；
    - 如果参数为负值，则返回 `NaN`；

- **示例**

```js
Math.sqrt(9); // 3
Math.sqrt(2); // 1.414213562373095

Math.sqrt(1);  // 1
Math.sqrt(0);  // 0
Math.sqrt(-1); // NaN
Math.sqrt(-0); // -0
```

#### 2.6.2.`Math.cbrt`

返回一个数的立方根。

- **语法**

```js
Math.cbrt(x)
```

- **参数**
  - x
    - 一个数值；

- **示例**

```js
Math.cbrt(NaN); // NaN
Math.cbrt(-1); // -1
Math.cbrt(-0); // -0
Math.cbrt(-Infinity); // -Infinity
Math.cbrt(0); // 0
Math.cbrt(1); // 1
Math.cbrt(Infinity); // Infinity
Math.cbrt(null); // 0
Math.cbrt(2);  // 1.2599210498948734
```

### 2.7.对数

### 2.7.1.`Math.log`

返回一个数的自然对数。

- **语法**

```js
Math.log(x)
```

- **参数**
  - x
    - 一个数值；
    - 如果参数为负值，则返回 `NaN`；

- **示例**

```js
Math.log(-1); // NaN, out of range
Math.log(0); // -Infinity
Math.log(1); // 0
Math.log(10); // 2.302585092994046
```

### 2.7.2.`Math.log2`

返回一个数字以 2 为底的对数。

- **语法**

```js
Math.log2(x)
```

- **参数**
  - x
    - 一个数值；
    - 如果参数为负值，则返回 `NaN`；

- **示例**

```js
Math.log2(2)     // 1
Math.log2(1024)  // 10
Math.log2(1)     // 0
Math.log2(0)     // -Infinity
Math.log2(-2)    // NaN
Math.log2("1024")// 10
Math.log2("foo") // NaN
```

### 2.7.3.`Math.log10`

返回一个数字以 10 为底的对数。

- **语法**

```js
Math.log10(x)
```

- **参数**
  - x
    - 一个数值；
    - 如果参数为负值，则返回 `NaN`；

- **示例**

```js
Math.log10(10)   // 1
Math.log10(100)  // 2
Math.log10("100")// 2
Math.log10(1)    // 0
Math.log10(0)    // -Infinity
Math.log10(-2)   // NaN
Math.log10("foo")// NaN
```

### 2.7.4.`Math.log1p`

返回一个数字加 1 后的自然对数 (底为 E), 即 `log(x+1)`。

- **语法**

```js
Math.log1p(x)
```

- **参数**
  - x
    - 一个数值；
    - 如果参数的值小于 -1，则返回 `NaN`；

- **示例**

```js
Math.log1p(Math.E-1)  // 1
Math.log1p(0)         // 0
Math.log1p("0")       // 0
Math.log1p(-1)        // -Infinity
Math.log1p(-2)        // NaN
Math.log1p("foo")     // NaN
```

### 2.8.三角函数

Math 对象还提供一系列三角函数方法。

- **语法**

```js

```

- **参数**

- **示例**

- `Math.sin()`：返回参数的正弦（参数为弧度值）
- `Math.cos()`：返回参数的余弦（参数为弧度值）
- `Math.tan()`：返回参数的正切（参数为弧度值）
- `Math.asin()`：返回参数的反正弦（返回值为弧度值）
- `Math.acos()`：返回参数的反余弦（返回值为弧度值）
- `Math.atan()`：返回参数的反正切（返回值为弧度值）

### 2.9.双曲函数
