# Number 对象

## 1.概述

`Number` 对象是数值对应的包装对象，可以作为构造函数使用，也可以作为工具函数使用。

- 作为构造函数时，它用于生成值为数值的 *对象*。
- 作为工具函数时，它可以将任何类型的值转为 *数值*。

## 2.属性

`Number` 对象拥有以下一些属性。

- `Number.POSITIVE_INFINITY`：正的无限，指向 `Infinity`。
>
- `Number.NEGATIVE_INFINITY`：负的无限，指向 `-Infinity`。
>
- `Number.NaN`：表示非数值，指向 `NaN`。
>
- `Number.MAX_VALUE`：表示最大的正数，相应的，最小的负数为 `-Number.MAX_VALUE`。
>
- `Number.MIN_VALUE`：表示最小的正数（即最接近 0 的正数，在 64 位浮点数体系中为 `5e-324`），相应的，最接近 0 的负数为 `-Number.MIN_VALUE`。
>
- `Number.MAX_SAFE_INTEGER`：表示能够精确表示的最大整数，即 `9007199254740991`。
>
- `Number.MIN_SAFE_INTEGER`：表示能够精确表示的最小整数，即 `-9007199254740991`。

## 3.实例方法

`Number` 对象有 4 个实例方法，都跟将数值转换成指定格式有关。

### 3.1.`number.toString`

`Number` 对象部署了自己的 `toString` 方法，用来将一个数值转为字符串形式。

`toString` 方法可以接受一个参数，表示输出的进制。如果省略这个参数，默认将数值先转为十进制，再输出字符串；否则，就根据参数指定的进制，将一个数字转化成指定进制的字符串。

```js
(10).toString(2); // "1010"

(10).toString(8); // "12"

(10).toString(16); // "a"
```

只要能够让 JavaScript 引擎不混淆小数点和对象的点运算符，各种写法都能用。除了为 10 加上括号，还可以在 10 后面加两个点，JavaScript 会把第一个点理解成小数点（即 10.0），把第二个点理解成调用对象属性，从而得到正确结果。

这实际上意味着，可以直接对一个小数使用 `toString` 方法。

```js
(10.5).toString(); // "10.5"
(10.5).toString(2); // "1010.1"
(10.5).toString(8); // "12.4"
(10.5).toString(16); // "a.8"
```

通过方括号运算符也可以调用 `toString` 方法。

```js
(10)["toString"](2); // 1010
(10)["toString"](8); // 12
(10)["toString"](16); // a
parseInt(1010, 2); // 10
parseInt(1010); // 1010
parseInt(012); // 10
parseInt(0xa); // 10
```

`toString` 方法只能将十进制的数，转为其他进制的字符串。如果要将其他进制的数，转回十进制，需要使用 `parseInt` 方法。

### 3.2.`number.toFixed`

`toFixed` 方法先将一个数转为指定位数的小数，然后返回这个小数对应的字符串。

`toFixed` 方法的参数为小数位数，有效范围为 0 到 20（现在是 0 - 100)，超出这个范围将抛出 `RangeError` 错误。

```js
// 不传参数等价于传入 0
(2.123456).toFixed(); // 2
(2.423456).toFixed(0); // 2

(2.123).toFixed(2); // 2.12
(2.445).toFixed(2); // 2.44
(2.556).toFixed(2); // 2.56
(2.978).toFixed(2); // 2.98

(2.978).toFixed(0); // 3
(2.978).toFixed(-1);
// toFixed() digits argument must be between 0 and 100

(2.978).toFixed(100); // 2.98...
(2.978).toFixed(101);
// toFixed() digits argument must be between 0 and 100
```

### 3.3.`number.toExponential`

`toExponential` 方法用于将一个数转为科学计数法形式。

`toExponential` 方法的参数是小数点后有效数字的位数，范围为 0 到 20，超出这个范围，会抛出一个 `RangeError` 错误。

```js
(2445).toExponential(2); //"2.45e+3"
(2.445).toExponential(2); //"2.44e+0"
```

### 3.4.`number.toPrecision`

`toPrecision` 方法用于将一个数转为指定位数的有效数字。

```js
(1234.56).toPrecision(2); //1.2e+3
(1234.56).toPrecision(4); //1235
(1234.46).toPrecision(4); //1234
```

`toPrecision` 方法的参数为有效数字的位数，范围是 1 到 21（现在是 1 - 100)，超出这个范围会抛出 `RangeError` 错误。

> 以上三个方法用于四舍五入时都不太可靠，跟浮点数不是精确储存有关。

## 4.自定义方法

与其他对象一样，`Number.prototype` 美女对象上面可以自定义方法，被 `Number` 的实例继承。

```js
Number.prototype.add = function(x) {
  return this + x;
};

(8)["add"](2); // 10
```

在数值上调用某个方法，数值会自动转为`Number`的实例对象，所以就可以调用 add 方法了。由于 add 方法返回的还是数值，所以可以链式运算。
