# Math 对象

ECMAScript 为数学公式和信息提供了一个公共位置，即 `Math` 对象。该对象不是构造函数，不能生成实例，所有的属性和方法都必须在 `Math` 对象上调用。

## 1.静态属性

|    属性     |        说明         |
| :---------: | :-----------------: |
|   Math.E    |       常数 e        |
|  Math.LN10  |    10 的自然对数    |
|  Math.LN2   |    2 的自然对数     |
| Math.LOG2E  | 以 2 位底 e 的对数  |
| Math.LOG10E | 以 10 为 e 底的对数 |
|   Math.PI   |       π 的值        |
| Math.SQRT2  |      (2)平方根      |

> 属性都是大写并且是只读的，**存储值**

## 2.静态方法

---

- `Math.abs()`：绝对值
- `Math.ceil()`：向上取整
- `Math.floor()`：向下取整
- `Math.max()`：最大值
- `Math.min()`：最小值
- `Math.pow()`：指数运算
- `Math.sqrt()`：平方根
- `Math.log()`：自然对数
- `Math.exp()`：自然指数
- `Math.round()`：四舍五入
- `Math.randow()`：随机数

---

### 2.1.`Math.abs`

返回参数的绝对值

### 2.2.`Math.min` 和 `Math.max`

用于返回一组数中的最大值或最小值，可以接收任意多的数值参数。如果参数为空, `Math.min` 返回 `Infinity`, `Math.max` 返回 `-Infinity`。

```javascript
// 若要找到数组中的最大/最小值，可以使用 apply() 方法
//关键在于，把 Math 对象作为 apply() 的第一个参数，正确的设置 this，然后，可以将任何数组当做第二个参数；

var values = [1, 3, 2, 6, 12];
var max = Math.max.apply(Math, values);
console.log(max); //12

var min = Math.min.apply(Math, values);
console.log(min); //1
```

### 2.3.取整方法

1).`Math.ceil()` 执行向上舍入
2).`Math.floor()` 执行向下舍入
3).`Math.round()` 执行标准舍入

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

### 2.10.三角函数方法

Math 对象还提供一系列三角函数方法。

---

- `Math.sin()`：返回参数的正弦（参数为弧度值）
- `Math.cos()`：返回参数的余弦（参数为弧度值）
- `Math.tan()`：返回参数的正切（参数为弧度值）
- `Math.asin()`：返回参数的反正弦（返回值为弧度值）
- `Math.acos()`：返回参数的反余弦（返回值为弧度值）
- `Math.atan()`：返回参数的反正切（返回值为弧度值）

---

> 注意，方法都是小写；
