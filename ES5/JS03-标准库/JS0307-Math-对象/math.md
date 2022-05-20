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

| 方法名        | 功能     |
| ------------- | -------- |
| `Math.abs`    | 绝对值   |
| `Math.ceil`   | 向上取整 |
| `Math.floor`  | 向下取整 |
| `Math.max`    | 最大值   |
| `Math.min`    | 最小值   |
| `Math.pow`    | 指数运算 |
| `Math.sqrt`   | 平方根   |
| `Math.log`    | 自然对数 |
| `Math.exp`    | 自然指数 |
| `Math.round`  | 四舍五入 |
| `Math.randow` | 随机数   |

> **备注**：需要注意的是，很多 `Math` 函数都有一个精度，而且这个精度在不同实现中也是不相同的。这意味着不同的浏览器会给出不同的结果，甚至，在不同的系统或架构下，相同的 JS 引擎也会给出不同的结果！
> **备注**：需要注意的是，三角函数 `sin()`、`cos()`、`tan()`、`asin()`、`acos()`、`atan()` 和 `atan2()` 返回的值是弧度而非角度。若要转换，弧度除以 `(Math.PI / 180)` 即可转换为角度，同理，角度乘以这个数则能转换为弧度。

### 2.1.`Math.abs`

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

### 2.2.`Math.max` 和 `Math.min`

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

### 2.3.取整方法

| 方法名         | 功能         |
| -------------- | ------------ |
| `Math.ceil()`  | 执行向上舍入 |
| `Math.floor()` | 执行向下舍入 |
| `Math.round()` | 执行标准舍入 |

- **语法**

```js
Math.ceil(x);
Math.floor(x);
Math.round(x);
```

- **参数**

- **实例**

> `Math.round()` 对于 `-n.5` 一律取值为 `-n`;

### 2.4.`Math.random`

1).`Math.random()`，返回一个大于等于 0，小于 1 的伪随机数。

2).`Math.random()*(m-n)+n`，获得 n 到 m 之间的伪随机数（小数）；

3).`Math.floor(Math.randow()*(max-min+1))+min;` 任意范围随机整数

### 2.5.`Math.pow`

返回以第一个参数为底数、第二个参数为幂的指数值。

### 2.6.`Math.sqrt`

返回参数值的平方根。如果参数是一个负值，则返回 `NaN`。

### 2.7.`Math.log`

返回以 e 为底的自然对数值。

如果要计算以 10 为底的对数，可以先用 `Math.log` 求出自然对数，然后除以 `Math.LN10`；求以 2 为底的对数，可以除以 `Math.LN2`。

### 2.8.`Math.exp`

返回常数 e 的参数次方。

### 2.10. 三角函数方法

Math 对象还提供一系列三角函数方法。

- `Math.sin()`：返回参数的正弦（参数为弧度值）
- `Math.cos()`：返回参数的余弦（参数为弧度值）
- `Math.tan()`：返回参数的正切（参数为弧度值）
- `Math.asin()`：返回参数的反正弦（返回值为弧度值）
- `Math.acos()`：返回参数的反余弦（返回值为弧度值）
- `Math.atan()`：返回参数的反正切（返回值为弧度值）

> 注意，方法都是小写；
