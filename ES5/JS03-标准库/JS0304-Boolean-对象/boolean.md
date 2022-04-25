# Boolean 对象

## 1.概述

`Boolean` 对象是 JavaScript 的三个包装对象之一。作为构造函数，它主要用于生成布尔值的包装对象实例。

```js
const flag = new Boolean();
console.log(flag);
// Boolean
//   [[Prototype]]: Boolean
//   [[PrimitiveValue]]: false

var bZero = new Boolean(0); // false
typeof bZero; // 'object'

var bObjProto = new Boolean({}); // true
typeof bObjProto; // 'object'
```

> 不要在应该使用基本类型布尔值的地方使用 `Boolean` 对象。

## 2.实例方法

### 2.1.`boolean.toString()`

返回指定的布尔对象的字符串形式。

```js
const flag = new Boolean(true);
console.log(flag.toString()); // 'true'

const bZero = new Boolean(0);
console.log(bZero.toString()); // 'false'
```

`Boolean` 对象覆盖了 `Object` 对象的  `toString` 方法，并没有继承 `Object.prototype.toString()`。对于布尔对象，`toString` 方法返回该对象的字符串形式。

当一个 `Boolean` 对象作为文本值或进行字符串连接时，JavaScript 会自动调用其 `toString` 方法。

对于 `Boolean` 对象或值，内置的 `toString` 方法返回字符串 `"true"` 或 `"false"`，具体返回哪个取决于布尔对象的值。

### 2.2.`boolean.valueOf()`

返回一个 `Boolean` 对象或 `Boolean` 字面量的原始值作为布尔数据类型。

> 该方法通常在 JavaScript 内部调用，而不是在代码中显式调用。

```js
const flag = new Boolean(true);
console.log(flag.valueOf()); // true

const bZero = new Boolean(0);
console.log(bZero.valueOf()); // false
```

## 3.`Boolean()`

`Boolean` 对象除了可以作为构造函数，还可以单独使用，强制将其他类型数据转换为布尔型，对 `0`、`NaN`、`null`、`undefined`、`""`、`false` （空字符串不是空格字符串）这 6 个为 `false`，其余为 `true`；

```js
var bZero = Boolean(0);
console.log(bZero); // false
typeof bZero; // 'boolean'
```

> 在流控制语句中，自动执行相应的 `Boolean` 转换。
> 注意：使用 `new Boolean()`，是构造函数的用法，起到包装的作用，产生的布尔值是对象类型；而使用 `Boolean()` 则只是强制将其他数据类型转化为布尔类型，故而产生的值是布尔类型。
