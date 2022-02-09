# Boolean 对象

## 1.概述

`Boolean` 对象是 JavaScript 的三个包装对象之一。作为构造函数，它主要用于生成布尔值的包装对象实例。

```javascript
var b = new Boolean(true);

typeof b; // "object"
b.valueOf(); // true
```

## 2.`Boolean` 函数的类型转换作用

`Boolean` 对象除了可以作为构造函数，还可以单独使用，将任意值转为布尔值。这时 `Boolean` 就是一个单纯的工具方法。

最后，对于一些特殊值，`Boolean` 对象前面加不加 `new`，会得到完全相反的结果，必须小心。
