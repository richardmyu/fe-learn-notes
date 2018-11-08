# JavaScript笔记二

<!-- TOC -->

- [JavaScript笔记二](#javascript笔记二)
  - [四.标准库](#四标准库)
    - [1.Object对象](#1object对象)
      - [1.概述](#1概述)
        - [1.1 Object对象本身的方法](#11-object对象本身的方法)
        - [1.2 Object的实例方法](#12-object的实例方法)
      - [2.Object()](#2object)
      - [3.Object 构造函数](#3object-构造函数)
      - [4.Object 的静态方法](#4object-的静态方法)
        - [4.1 Object.keys，Object.getOwnPropertyNames](#41-objectkeysobjectgetownpropertynames)
        - [4.2 其他方法](#42-其他方法)
      - [5.Object 的实例方法](#5object-的实例方法)
        - [5.1 Object.prototype.valueOf](#51-objectprototypevalueof)
        - [5.2 Object.prototype.toString](#52-objectprototypetostring)
        - [5.3 toString](#53-tostring)
        - [5.4 Object.prototype.toLocaleString](#54-objectprototypetolocalestring)
        - [5.5 Object.prototype.hasOwnProperty](#55-objectprototypehasownproperty)
    - [2.Array对象](#2array对象)
      - [1.构造函数](#1构造函数)
      - [2.静态方法](#2静态方法)
        - [2.1 Array.isArray](#21-arrayisarray)
      - [3.实例方法](#3实例方法)
        - [3.1 转换方法](#31-转换方法)
        - [3.2 栈方法](#32-栈方法)
        - [3.3 队列方法](#33-队列方法)
        - [3.4 重排序方法](#34-重排序方法)
        - [3.5 操作方法](#35-操作方法)
        - [3.6 位置方法](#36-位置方法)
        - [3.7 迭代方法](#37-迭代方法)
        - [3.8 归并方法](#38-归并方法)
        - [3.9 ES6新方法](#39-es6新方法)
        - [3.10 链式使用](#310-链式使用)
    - [3.包装对象](#3包装对象)
      - [1.定义](#1定义)
      - [2.实例方法](#2实例方法)
        - [2.1 valueOf](#21-valueof)
        - [2.2 toString](#22-tostring)
      - [3.原始类型与实例对象的自动转换](#3原始类型与实例对象的自动转换)
      - [4.自定义方法](#4自定义方法)
      - [5.Boolean 对象](#5boolean-对象)
        - [5.1 概述](#51-概述)
        - [5.2 Boolean 函数的类型转换作用](#52-boolean-函数的类型转换作用)
    - [4.Number对象](#4number对象)
      - [4.1.概述](#41概述)
      - [4.2.属性](#42属性)
      - [4.3.实例方法](#43实例方法)
        - [4.3.1 number.toString](#431-numbertostring)
        - [4.3.2 number.toFixed](#432-numbertofixed)
        - [4.3.3 number.toExponential](#433-numbertoexponential)
        - [4.3.4 number.toPrecision](#434-numbertoprecision)
      - [4.4.自定义方法](#44自定义方法)
    - [5.String对象](#5string对象)
      - [5.1.概述](#51概述)
      - [5.2.静态方法](#52静态方法)
        - [5.2.1 String.fromCharCode](#521-stringfromcharcode)
      - [5.3.实例属性](#53实例属性)
        - [5.3.1 string.length](#531-stringlength)
      - [5.4.实例方法](#54实例方法)
        - [5.4.1 字符方法](#541-字符方法)
        - [5.4.2 字符串操作方法](#542-字符串操作方法)
        - [5.4.3 字符串位置方法](#543-字符串位置方法)
        - [5.4.4 空格处理](#544-空格处理)
        - [5.4.5 字符串大小写转换方法](#545-字符串大小写转换方法)
        - [5.4.6 字符串的模式匹配方法](#546-字符串的模式匹配方法)
        - [5.4.7 字符串的替换](#547-字符串的替换)
        - [5.4.8 字符串变数组](#548-字符串变数组)
        - [5.4.9 字符串比较](#549-字符串比较)
        - [5.4.10 ES6新方法](#5410-es6新方法)
    - [6.Math对象](#6math对象)
      - [6.1.静态属性](#61静态属性)
      - [6.2.静态方法](#62静态方法)
        - [6.2.1 Math.abs](#621-mathabs)
        - [6.2.2 Math.min 和 Math.max](#622-mathmin-和-mathmax)
        - [6.2.3 取整方法](#623-取整方法)
        - [6.2.4 Math.random](#624-mathrandom)
        - [6.2.5 Math.pow](#625-mathpow)
        - [6.2.6 Math.sqrt](#626-mathsqrt)
        - [6.2.7 Math.log](#627-mathlog)
        - [6.2.8 Math.exp](#628-mathexp)
        - [6.2.10 三角函数方法](#6210-三角函数方法)
    - [7.Date对象](#7date对象)
      - [7.1.普通函数的用法](#71普通函数的用法)
      - [7.2.构造函数的用法](#72构造函数的用法)
      - [7.3.日期的运算](#73日期的运算)
      - [7.4.静态方法](#74静态方法)
        - [7.4.1 Date.now](#741-datenow)
        - [7.4.2 Date.parse](#742-dateparse)
        - [7.4.3 Date.UTC](#743-dateutc)
      - [7.5.实例方法](#75实例方法)
      - [7.6.日期格式化方法](#76日期格式化方法)
        - [7.6.1 `toDateString()`](#761-todatestring)
        - [7.6.2 `toTimeString()`](#762-totimestring)
        - [7.6.3 `toLocaleDateString()`](#763-tolocaledatestring)
        - [7.6.4 `toLocaleTimeString()`](#764-tolocaletimestring)
        - [7.6.5 `toUTCString()`](#765-toutcstring)
      - [7.7.日期/时间组件方法](#77日期时间组件方法)
        - [7.7.1 获取当前电脑上的时间](#771-获取当前电脑上的时间)
        - [7.7.2 获取服务器的时间](#772-获取服务器的时间)
        - [7.7.3 获取/设置四位的年](#773-获取设置四位的年)
        - [7.7.4 获取月份 (0-11)](#774-获取月份-0-11)
        - [7.7.5 获取星期 0-6（星期日-星期六）](#775-获取星期-0-6星期日-星期六)
        - [7.7.6 获取日](#776-获取日)
        - [7.7.7 获取小时](#777-获取小时)
        - [7.7.8 获取分](#778-获取分)
        - [7.7.9 获取秒](#779-获取秒)
        - [7.7.10 获取毫秒](#7710-获取毫秒)
        - [7.7.11 getTime()](#7711-gettime)
      - [7.8.定时器小问题](#78定时器小问题)
        - [7.8.1 `window.setInterval()`](#781-windowsetinterval)
        - [7.8.2 `window.clearInterval()`](#782-windowclearinterval)
        - [7.8.3 `window.setTimeout()`/`window.clearTimeout()`](#783-windowsettimeoutwindowcleartimeout)
    - [8.RegExp对象](#8regexp对象)
      - [8.1.概述](#81概述)
      - [8.2.常见元字符](#82常见元字符)
      - [8.3.量词元字符](#83量词元字符)
      - [8.4.其他元字符](#84其他元字符)
      - [8.5.标志（修饰符）](#85标志修饰符)
      - [8.6.实例属性](#86实例属性)
      - [8.7.实例方法](#87实例方法)
        - [8.7.1 `regexp.exec()`](#871-regexpexec)
        - [8.7.2 `regexp.test()`](#872-regexptest)
      - [8.8.RegExp构造函数属性](#88regexp构造函数属性)
      - [8.9.模式的局限性](#89模式的局限性)
      - [8.10.正则的特性：](#810正则的特性)
        - [8.10.1 懒惰性](#8101-懒惰性)
        - [8.10.2 贪婪性](#8102-贪婪性)
      - [8.11.正则中的小括号的应用](#811正则中的小括号的应用)
        - [8.11.1 分组](#8111-分组)
        - [8.11.2 分组捕获](#8112-分组捕获)
        - [8.11.3 分组嵌套](#8113-分组嵌套)
        - [8.11.4 非捕获](#8114-非捕获)
      - [8.12.字符串方法在正则中的应用](#812字符串方法在正则中的应用)
        - [8.12.1 string.match(regexp)](#8121-stringmatchregexp)
        - [8.12.2 exec() 和 match() 的区别](#8122-exec-和-match-的区别)
        - [8.12.3 string.split()](#8123-stringsplit)
        - [8.12.4 string.search()](#8124-stringsearch)
        - [8.12.5 string.replace()](#8125-stringreplace)
        - [8.12.6 `lastIndex`](#8126-lastindex)
      - [8.13.正向预查和负向预查](#813正向预查和负向预查)
        - [8.13.1 x(?=pattern)](#8131-xpattern)
        - [8.13.2 x(?!pattern)](#8132-xpattern)
      - [8.14.运算符的优先级](#814运算符的优先级)
    - [9.属性描述对象](#9属性描述对象)
      - [9.1.概述](#91概述)
      - [9.2.Object.getOwnPropertyDescriptor()](#92objectgetownpropertydescriptor)
      - [9.3.Object.getOwnPropertyNames()](#93objectgetownpropertynames)
      - [9.4.Object.defineProperty()/Object.defineProperties()](#94objectdefinepropertyobjectdefineproperties)
      - [9.5.Object.prototype.propertyIsEnumerable()](#95objectprototypepropertyisenumerable)
      - [9.6.元属性](#96元属性)
        - [9.6.1 value](#961-value)
        - [9.6.2 writable](#962-writable)
        - [9.6.3 enumerable](#963-enumerable)
        - [9.6.4 configurable](#964-configurable)
      - [9.7.存取器](#97存取器)
      - [9.8.对象的拷贝](#98对象的拷贝)
      - [9.9.控制对象状态](#99控制对象状态)
        - [9.9.1 Object.preventExtensions()](#991-objectpreventextensions)
        - [9.9.2 Object.isExtensible()](#992-objectisextensible)
        - [9.9.3 Object.seal()](#993-objectseal)
        - [9.9.4 Object.isSealed()](#994-objectissealed)
        - [9.9.5 Object.freeze()](#995-objectfreeze)
        - [9.9.6 Object.isFrozen()](#996-objectisfrozen)
        - [9.9.7 局限性](#997-局限性)

<!-- /TOC -->

## 四.标准库

### 1.Object对象

#### 1.概述

JavaScript 的所有其他对象都继承自`Object`对象，即那些对象都是`Object`的实例。

`Object`对象的原生方法分成两类：`Object`本身的方法与`Object`的实例方法。

##### 1.1 Object对象本身的方法

所谓本身的方法就是直接定义在`Object`对象的方法(通过`Object`对象调用)。

`Object.print = function (o) { console.log(o) };`

##### 1.2 Object的实例方法

所谓**实例方法**就是定义在`Object`原型对象`Object.prototype`上的方法。它可以被`Object`实例直接使用。

```javascript
Object.prototype.print = function () {
  console.log(this);
};

var obj = new Object();
obj.print() // Object
```

#### 2.Object()

`Object`本身是一个函数，可以当作工具方法使用，将任意值转为对象。这个方法常用于保证某个值一定是对象。

如果参数为空（或者为`undefined`和`null`），`Object()`返回一个空对象。

```javascript
var obj = Object();
// 等同于
var obj = Object(undefined);
var obj = Object(null);

obj instanceof Object // true
```

`instanceof`运算符用来验证，一个对象是否为指定的构造函数的实例。`obj instanceof Object`返回true，就表示obj对象是`Object`的实例。

如果参数是原始类型的值，`Object`方法将其转为对应的包装对象的实例。

```javascript
var obj = Object(1);
obj instanceof Object // true
obj instanceof Number // true
```

如果`Object`方法的参数是一个对象(也包括`Function`)，它总是返回该对象，即不用转换。

```javascript
var arr = [];
var obj = Object(arr); // 返回原数组
obj === arr // true
```

利用这一点，可以写一个判断变量是否为对象的函数。

```javascript
function isObject(value) {
  return value === Object(value);
}

isObject([]) // true
isObject(true) // false
```

#### 3.Object 构造函数

`Object`不仅可以当作工具函数使用，还可以当作构造函数使用，即前面可以使用`new`命令。

`Object`构造函数的首要用途，是直接通过它来生成新对象。

`var obj = new Object();`

> 注意，通过`var obj = new Object()`的写法生成新对象，与字面量的写法`var obj = {}`是等价的。或者说，后者只是前者的一种简便写法。

`Object`构造函数的用法与工具方法很相似，几乎一模一样。使用时，可以接受一个参数，如果该参数是一个对象，则直接返回这个对象；如果是一个原始类型的值，则返回该值对应的包装对象。

> 虽然用法相似，但是`Object(value)`与`new Object(value)`两者的语义是不同的，`Object(value)`表示将`value`转成一个对象，`new Object(value)`则表示新生成一个对象，它的值是`value`。

#### 4.Object 的静态方法

所谓静态方法，是指部署在`Object`对象自身的方法。

##### 4.1 Object.keys，Object.getOwnPropertyNames

`Object.keys`方法和`Object.getOwnPropertyNames`方法都用来遍历对象的属性。

`Object.keys`方法的参数是一个对象，返回一个数组。该数组的成员都是该对象自身的（而不是继承的）所有属性名。

```javascript
var obj = {
  p1: 123,
  p2: 456
};

Object.keys(obj) // ["p1", "p2"]
```

`Object.getOwnPropertyNames`方法与`Object.keys`类似，也是接受一个对象作为参数，返回一个数组，包含了该对象自身的所有属性名。

```javascript
var obj = {
  p1: 123,
  p2: 456
};

Object.getOwnPropertyNames(obj) // ["p1", "p2"]
```

对于一般的对象来说，`Object.keys`和`Object.getOwnPropertyNames`返回的结果是一样的。只有涉及不可枚举属性时，才会有不一样的结果。`Object.keys`方法只返回可枚举的属性，`Object.getOwnPropertyNames`方法还返回不可枚举的属性名。

```javascript
var a = ['Hello', 'World'];

Object.keys(a) // ["0", "1"]
Object.getOwnPropertyNames(a) // ["0", "1", "length"]
```

由于 JavaScript 没有提供计算对象属性个数的方法，所以可以用这两个方法代替。

```javascript
var obj = {
  p1: 123,
  p2: 456
};

Object.keys(obj).length // 2
Object.getOwnPropertyNames(obj).length // 2
```

> 一般情况下，几乎总是使用`Object.keys`方法，遍历数组的属性。

##### 4.2 其他方法

1).对象属性模型的相关方法

[从一个程序员的角度来说](https://www.cnblogs.com/tarol/p/4670130.html)，属性分为可通过JS调用的的和不可通过JS调用的。不可调用的叫做内部属性，那么可调用的我们对应着叫外部属性。内部属性是JS解释器实现各种接口的时候使用的算法中需要调用的属性。而外部属性又分为两种，一种是数据属性，一种是访问器属性。

属性还存在其他一些状态，我们称之为元属性，无论是数据属性还是访问器属性，都存在四个元属性。

数据属性的元属性

`[[Value]]`、`[[Writable]]`、`[[Enumerable]]`、`[[Configuration]]`；

访问器属性的元属性

`[[Get]]`、`[[Set]]`、`[[Enumerable]]`、`[[Configuration]]`。

JS开放了三个接口用于设置和获取属性的特性，分别是：

- --

- `Object.defineProperty()`：通过描述对象，定义某个属性
- `Object.defineProperties()`：通过描述对象，定义多个属性
- `Object.getOwnPropertyDescriptor()`：获取某个属性的描述对象
- --

2).控制对象状态的方法

- --
- `Object.preventExtensions()`：防止对象扩展。
- `Object.isExtensible()`：判断对象是否可扩展。
- --
- `Object.seal()`：禁止对象配置。
- `Object.isSealed()`：判断一个对象是否可配置。
- --
- `Object.freeze()`：冻结一个对象。
- `Object.isFrozen()`：判断一个对象是否被冻结。
- --

3).原型链相关方法

- --
- `Object.create()`：指定原型对象和属性，返回一个新的对象
- `Object.getPrototypeOf()`：获取对象的`Prototype`对象
- --

#### 5.Object 的实例方法

除了静态方法，还有不少方法定义在`Object.prototype`对象。它们称为实例方法，所有`Object`的实例对象都继承了这些方法。

`Object`实例对象的方法，主要有以下六个。

- --
- `Object.prototype.valueOf()`：返回当前对象对应的值
- `Object.prototype.toString()`：返回当前对象对应的字符串形式
- `Object.prototype.toLocaleString()`：返回当前对象对应的本地字符串形式
- --
- `Object.prototype.hasOwnProperty()`：判断某个属性是否为当前对象自身的属性，还是继承自原型对象的属性
- `Object.prototype.isPrototypeOf()`：判断当前对象是否为另一个对象的原型
- `Object.prototype.propertyIsEnumerable()`：判断某个属性是否可枚举
- --

##### 5.1 Object.prototype.valueOf

`valueOf`方法的作用是返回一个对象的“值”，默认情况下返回对象本身。

```javascript
var obj = new Object();
obj.valueOf() === obj // true
```

`valueOf`方法的主要用途是，JavaScript 自动类型转换时会默认调用这个方法。

```javascript
var obj = new Object();
1 + obj // "1[object Object]"
```

如果自定义`valueOf`方法，就可以得到想要的结果。

```javascript
var obj = new Object();
obj.valueOf = function () {
  return 2;
};

1 + obj // 3
```

上面代码自定义了obj对象的`valueOf`方法，覆盖`Object.prototype.valueOf`。

##### 5.2 Object.prototype.toString

`toString`方法的作用是返回一个对象的字符串形式，默认情况下返回类型字符串。

```javascript
var o1 = new Object();
o1.toString() // "[object Object]"

var o2 = {a:1};
o2.toString() // "[object Object]"
```

字符串`[object Object]`本身没有太大的用处，但是通过自定义`toString`方法，可以让对象在自动类型转换时，得到想要的字符串形式。

```javascript
var obj = new Object();

obj.toString = function () {
  return 'hello';
};

obj + ' ' + 'world' // "hello world"
```

数组、字符串、函数、`Date` 对象都分别部署了自定义的`toString`方法，覆盖了`Object.prototype.toString`方法。

```javascript
[1, 2, 3].toString() // "1,2,3"

'123'.toString() // "123"

(function () {
  return 123;
}).toString()
// "function () {
//   return 123;
// }"

(new Date()).toString();
(new Date()).toLocaleString();
//Sat May 26 2018 09:46:15 GMT+0800 (中国标准时间)
//2018-5-26 09:46:15
```

##### 5.3 toString

`Object.prototype.toString`方法返回对象的类型字符串，因此可以用来判断一个值的类型。

由于实例对象可能会自定义`toString`方法，覆盖掉`Object.prototype.toString`方法，所以为了得到类型字符串，最好直接使用`Object.prototype.toString`方法。通过函数的`call`方法，可以在任意值上调用这个方法，帮助我们判断这个值的类型。

`Object.prototype.toString.call(value)`

不同数据类型的`Object.prototype.toString`方法返回值如下。

- --
- 数值：返回`[object Number]`。
- 字符串：返回`[object String]`。
- 布尔值：返回`[object Boolean]`。
- `undefined`：返回`[object Undefined]`。
- `null`：返回`[object Null]`。
- 数组：返回`[object Array]`。
- `arguments` 对象：返回`[object Arguments]`。
- 函数：返回`[object Function]`。
- `Error` 对象：返回`[object Error]`。
- `Date` 对象：返回`[object Date]`。
- `RegExp` 对象：返回`[object RegExp]`。
- 其他对象：返回`[object Object]`。
- --

这就是说，`Object.prototype.toString`可以看出一个值到底是什么类型。

利用这个特性，可以写出一个比`typeof`运算符更准确的类型判断函数。

```javascript
var type = function (o){
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
  //return s.slice(8,-1).toLowerCase();
};

type({}); // "object"
type([]); // "array"
```

在上面这个`type`函数的基础上，还可以加上专门判断某种类型数据的方法。

```javascript
var type = function (o){
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

let aryType = ['Null','Undefined','Object','Array','String','Number','Boolean','Function','RegExp'];

aryType.forEach(function (t) {
  type['is' + t] = function (o) {
    return type(o) === t.toLowerCase();
  };
});

type.isObject({}) // true
type.isNumber(NaN) // true
type.isRegExp(/abc/) // true
```

##### 5.4 Object.prototype.toLocaleString

`Object.prototype.toLocaleString`方法与`toString`的返回结果相同，也是返回一个值的字符串形式。

```javascript
var obj = {};
obj.toString(obj) // "[object Object]"
obj.toLocaleString(obj) // "[object Object]"
```

这个方法的主要作用是留出一个接口，让各种不同的对象实现自己版本的`toLocaleString`，用来返回针对某些地域的特定的值。目前，主要有三个对象自定义了`toLocaleString`方法。

- --
- `Array.prototype.toLocaleString()`
- `Number.prototype.toLocaleString()`
- `Date.prototype.toLocaleString()`
- --

举例来说，日期的实例对象的`toString`和`toLocaleString`返回值就不一样，而且`toLocaleString`的返回值跟用户设定的所在地域相关。

```javascript
var date = new Date();
date.toString();
date.toLocaleString();

//chorme
//Sat May 26 2018 09:53:22 GMT+0800 (中国标准时间)
//2018/5/26 上午9:53:22

//Firefox
//Sat May 26 2018 09:54:09 GMT+0800
//2018/5/26 上午9:54:09

//node.js
//Sat May 26 2018 09:53:12 GMT+0800 (中国标准时间)
//2018-5-26 09:53:12
```

##### 5.5 Object.prototype.hasOwnProperty

`Object.prototype.hasOwnProperty`方法接受一个字符串作为参数，返回一个布尔值，表示该实例对象自身是否具有该属性(换成定义了该属性更合适，这样很明显不包含继承属性)。

```javascript
var obj = {
  p: 123
};

obj.hasOwnProperty('p') // true
obj.hasOwnProperty('toString') // false
```

### 2.Array对象

#### 1.构造函数

`Array`是 JavaScript 的原生对象，同时也是一个构造函数，可以用它生成新的数组。

```javascript
var arr = new Array(2);
arr.length // 2
arr // [ empty x 2 ]
```

如果没有使用`new`，运行结果也是一样的。

`Array`构造函数有一个很大的缺陷，就是不同的参数，会导致它的行为不一致。

```javascript
// 无参数时，返回一个空数组
new Array() // []

// 单个正整数参数，表示返回的新数组的长度
new Array(1) // [ empty ]
new Array(2) // [ empty x 2 ]

// 非正整数的数值作为参数，会报错
new Array(3.2) // RangeError: Invalid array length
new Array(-3) // RangeError: Invalid array length

// 单个非数值（比如字符串、布尔值、对象等）作为参数，
// 则该参数是返回的新数组的成员
new Array('abc') // ['abc']
new Array([1]) // [Array[1]]

// 多参数时，所有参数都是返回的新数组的成员
new Array(1, 2) // [1, 2]
new Array('a', 'b', 'c') // ['a', 'b', 'c']
```

可以看到，`Array`作为构造函数，行为很不一致。因此，不建议使用它生成新数组，直接使用数组字面量是更好的做法。

> 注意，如果参数是一个正整数，返回数组的成员都是空位。虽然读取的时候返回`undefined`，但实际上该位置没有任何值。虽然可以取到`length`属性，但是取不到键名。

```javascript
var a = new Array(3);
var b = [undefined, undefined, undefined];

a.length // 3
b.length // 3

a[0] // undefined
b[0] // undefined

0 in a // false
0 in b // true
```

#### 2.静态方法

##### 2.1 Array.isArray

对于一个网页或者一个全局作用域而言，用`instanceof`操作符就能很好的完成：

```javascript
if (value instanceof Array) {
    //...
}
```

但`instanceof`操作符的问题在于，它假定只有一个全局执行环境。如果网页包含多个框架，那实际上就会有两个以上不同的全局执行环境，从而存在两个以上不同版本的`Array`构造函数。如果需要从一个框架向另一个框架传入一个数组，那么传入的数组与在第二个框架中原生创建的数组分别具有各自不同的构造函数。

为了解决这个问题，ECMAScript5新增了`Array.isArray()`方法。这个方法的目的是最终确定某个值是不是数组，而不论是在哪个全局作用域中创建的。

```javascript
if (Array.isArray(value)) {
    //...
}
```

`Array.isArray`方法返回一个布尔值，表示参数是否为数组。并且它可以弥补`typeof`运算符的不足。

```javascript
var arr = [1, 2, 3];

typeof arr // "object"
Array.isArray(arr) // true
```

#### 3.实例方法

|方法|作用|
|--|--|
|`valueOf()`|返回数组本身|
|`toString()`|返回数组字符形式|
|`toLocaleString()`||
|`join("分隔符")`|按照指定连接符将数组转换为字符串|
|`push(...)`|在数组最后按照书写顺序逐个添加任意多项|
|`pop()`|删除数组最后一项|
|`shift()`|删除数组的第一项|
|`unshift(...)`|在数组最前按照书写添加任意多项|
|`reverse()`||
|`sort()`||
|`concat(...)`||
|`slice(start[,end])`||
|`splice(start[,length,...])`||
|`indexOf(subStr[,start])`||
|`lastIndexOf(subStr[,start])`||
|`forEach()`||
|`map()`||
|`filter()`||
|`every()`||
|`some()`||
|`reduce()`||
|`reduceRight()`||
|`find()`||
|`findIndex()`||
|`includes()`||

##### 3.1 转换方法

1).`valueOf()`

调用该方法，返回数组本身

2).`toString()`

调用数组的该方法，返回由数组中每个值的字符串形式拼接而成的以逗号隔开的字符串。实际上，为了创建这个字符串会调用数组每一项的`toString()`方法。

```javascript
var ary=[1,2,3,4,5];
ary.toString(); //1,2,3,4,5
```

3).`toLocaleString()`

一般返回值与`toString()`和`valueOf()`相同。当调用数组的`toLocaleString()`方法时，也会创建以数组值的字符串形式，但每一项调用的是`toLocaleString()`方法，而不是`toString()`方法。

> 如果数组某一项的值是`null`或`undefined`，那么该值在`toLocaleString()`、`toString()`、`valueOf()`和`join()`方法返回的结果中以空字符串表示。

4).`join("分隔符")`

按照指定连接符将数组转换为字符串；

- --
- 不改变原数组
- 返回值：返回值是字符串
- 参数类型：字符
- 参数
  - a.只接受一个分隔数组的可选字符或字符串（多传参数不起作用）
  - b.如果不传参数或传递`undefined`，则默认是逗号；
- --

如果数组成员是`undefined`或`null`或空位，会被转成空字符串。

通过`call`方法，这个方法也可以用于字符串或类似数组的对象。

```javascript
Array.prototype.join.call('hello', '-')
// "h-e-l-l-o"

var obj = { 0: 'a', 1: 'b', length: 2 };
Array.prototype.join.call(obj, '-')
// 'a-b'
```

##### 3.2 栈方法

ECMAScript数组也提供了一种让数组的行为类似于其他结构的方法。具体来说，数组可以表现的像栈一样。栈是一种**LIFO（Last-In-First-Out）**的数据结构，而栈中项的插入（**推入**）和移除（**弹出**），只发生在一个位置--栈的顶部。

1).**`push(...)`**

在数组最后按照书写顺序逐个添加任意多项；

- --
- 改变原数组
- 返回值：返回增加后的数组长度；
- 参数类型：任意类型
- 参数：参数任意多，逗号隔开
- --

2).**`pop()`**

删除数组最后一项

- --
- 改变原数组
- 返回值：返回被删除项；
- 参数：没有参数（传递参数也不报错）
- --

> 对空数组使用`pop`方法，不会报错，而是返回`undefined`。

`push`和`pop`结合使用，就构成了“后进先出”的**栈（stack）**结构。

```javascript
var arr = [];
arr.push(1, 2);
arr.push(3);
arr.pop();
arr // [1, 2]
```

##### 3.3 队列方法

队列数据结构的访问规则是**FIFO（First-In-First-Out）**。队列在列表的末端添加项，在前端删除项。

1).**`shift()`**

删除数组的第一项

- --
- 改变原数组
- 返回值：返回被删除项；
- 参数：没有参数
- --

2).**`unshift(...)`**

在数组最前按照书写添加任意多项

- --
- 改变原数组
- 返回值：返回增加项以后的数组长度
- 参数类型：任意类型
- 参数：参数任意多，逗号隔开
- --

##### 3.4 重排序方法

1).`reverse()`

反转数组排序（较其他方法比较快）

- --
- 改变原数组
- 返回值：返回新数组;
- 参数：没有参数
- --

2).**`sort()`**

升序排列数组(默认按字典顺序)

- --
- 改变原数组；
- 返回值：返回新数组;
- 参数：不需要参数；或者可以接受一个比较函数作为参数
- --

可以接收一个比较函数，以便自定义排序：

```javascript
ary.sort(function (a, b) {
    //a 当前项  b 当前项的后一项
    return a - b;    //完全排序：从小到大；
    return b - a;    //完全排序：从大到小；
})

//比较函数
function compare(value1, value2) {
    if (value1 < value2) {
        return -1;
    } else if (value1 > value2) {
        return 1;
    } else {
        return 0;
    }
}

//对于数值类型或者valueOf()方法返回数值类型的对象类型，可以使用一个更简单的比较函数
function compare(value1, value2) {
    return value2 - value1;
}
```

##### 3.5 操作方法

1).`concat(...)`

用来拼接数组，在原数组后面添加任意多项;

- --
- 不改变原数组；
- 返回值：返回新数组;
- 参数类型：任意类型数据；
- 参数：
  - a.没有参数或者参数为0时，相当于原数组的复本
  - b.非数组参数，简单添加
- --

如果数组成员包括对象，`concat`方法返回当前数组的一个浅拷贝。所谓“**浅拷贝**”，指的是新数组拷贝的是对象的引用。

```javascript
var obj = { a: 1 };
var oldArray = [obj];

var newArray = oldArray.concat();

obj.a = 2;
newArray[0].a // 2
```

2).**`slice(startIndex[,endIndex])`**

从参数指定位置开始复制截取（包含指定项）

- --
- 不改变原数组；
- 返回值：将获取的项组成新数组返回;
- 参数类型：数值
- 参数：
  - a.没有参数或者参数为0时，相当于原数组的副本；
  - b.一个参数，从该参数指定的位置开始复制
  - c.二个参数，从第一个参数开始复制到第二个参数位置（不包含终止位）
  - d.若参数为负数(倒数计位)，则加上数组长度来进行复制
  - e.若第二个参数小于第一个参数，返回空数组
- --

`slice`方法的一个重要应用，是将类似数组的对象转为真正的数组。

```javascript
Array.prototype.slice.call({ 0: 'a', 1: 'b', length: 2 })
// ['a', 'b']

function fn(a, b, c) {
  console.log(Array.prototype.slice.call(arguments));
  return a * b + c;
}

console.log(fn(1, 2, 3));

//[ 1, 2, 3]    5
```

3).**`splice(startIndex[,length,...])`**

删除、插入、替换

- --
- 改变原数组;
- 返回值：始终返回一个数组（由删除项构成的）或者空数组（没有删除项）
- 参数：多个
  - a.第一个参数：指定删除的起始位置
  - b.第二个参数：指定删除个数
  - c.第三个参数：用来替换
  - d.其他参数：替换
- --

删除：可以删除任意项，需要2个参数：要删除的第一项的位置和要删除的项数

插入：可以在任意位置插入任意多项，需要至少3个参数：起始位置、0（删除项数）以及要插入的项（可以多个）

替换：插入且同时删除，需要至少3个参数：起始位置、要删除的项数以及要插入的任意项数（删除项数和插入项数不一定要等等）

> 如果只提供第一个参数，等同于将原数组在指定位置拆分成两个数组。

##### 3.6 位置方法

1).**`indexOf(subStr[,startIndex])`**

在数组中从头开始进行查找指定项

- --
- 不改变原数组
- 返回值：指定项第一次出现的索引，找不到就返回-1；
- 参数类型：任意类型
- 参数：
  - a.第一个参数指定查找项
  - b.第二个参数指定查找的起始位置；
- --

2).**`lastIndexOf(subStr[,startIndex])`**

作用同`indexOf()`，但从末尾开始进行查找指定项

> 这两个方法在被调用时，比较数组的每一项用的是全等操作符，也就是说数据类型必须一样。这样就不能用来搜索`NaN`。

##### 3.7 迭代方法

每一个方法都接收两个参数：第一个参数是需要运行的函数；第二个参数是可选的，调用函数时可选的`this`的值；都不改变原数组。如果数组有空位，会跳过。

传入这些方法中的函数接收三个参数：数组项的值、该项在数组中的位置和数组对象本身。

1).**`forEach()`**

`forEach`方法与`map`方法很相似，也是对数组的所有成员依次执行参数函数。但是，`forEach`方法不返回值，只用来操作数据。这就是说，如果数组遍历的目的是为了得到返回值，那么使用`map`方法，否则使用`forEach`方法。

> 注意，`forEach`方法无法中断执行，总是会将所有成员遍历完。如果希望符合某种条件时，就中断遍历，要使用`for`循环。

2).**`map()`**

将数组的所有成员依次传入参数函数，然后把每一次的执行结果组成一个新数组返回。

> 如果数组有空位，`map`方法的回调函数在这个位置不会执行，会跳过数组的空位。不会跳过`undefined`和`null`。

3).**`filter()`**

用来过滤数组成员，返回值为true的对应项构成的新数组；

4).`every()`

传入的函数对每一项都返回true，这个方法才会返回true；否则返回flase。也就是说，迭代过程中出现false就停止执行。

5).`some()`

只要传入的数组中有一项返回true，则方法返回true。也就是说，迭代过程中出现true就停止执行。

> 注意，对于空数组，`some`方法返回false，`every`方法返回true，回调函数都不会执行。

##### 3.8 归并方法

ES5新增两个归并数组的方法。这两个方法会迭代数组所有的项，然后构建一个最终返回的值。这两个方法接收两个参数：一个在每一项上调用的函数和（可选的）作为归并基础的初始值。

这两个方法不会改变原数组。它们的差别是，`reduce`是从左到右处理（从第一个成员到最后一个成员），`reduceRight`则是从右到左（从最后一个成员到第一个成员），其他完全一样。

传给`reduce()`和`reduceRight()`的函数接收4个参数：

- --
- prev: 积累变量(默认为数组的第一个成员)
- next: 当前变量(默认为数组的第二个成员)
- index 索引
- 数组对象
- --

只有前两个参数是必选的。这个函数返回的任何值都会作为第一个参数自动传给下一项。第一次迭代发生在数组的第二项，即如果要对累积变量指定初值，可以把它放在`reduce`方法和`reduceRight`方法的第二个参数。

由于这两个方法会遍历数组，所以实际上还可以用来做一些遍历相关的操作。比如，找出字符长度最长的数组成员。

```javascript
function findLongest(s) {
  return s.reduce((longest, entry) => {
    console.log('longest ' + longest, 'entry ' + entry);
    return entry.length > longest.length ? entry : longest;
  }, '');
}

console.log(findLongest(['aaa', 'bb', 'c']));

//reduce方法的第二个参数指定为'',即初始值为''
//longest  entry aaa
//longest aaa entry bb
//longest aaa entry c
// "aaa"
```

上面代码中，`reduce`的参数函数会将字符长度较长的那个数组成员，作为累积值。这导致遍历所有成员之后，累积值就是字符长度最长的那个成员。

##### 3.9 ES6新方法

1).**`find()`**

查找数组中某一项（只要`return`为true则停止查找）

- --
- 不改变原数组
- 返回值：返回查找项；找不到返回`undefined`
- 参数类型：函数
  - 第一个参数是需要运行的函数(该方法会给函数传入三个参数，同迭代方法)
- --

```javascript
let ary = [1, 2, 3, 4];
let a = ary.find((item, i, l) => {
  console.log(item, i, l);
  return item > 4;
});
console.log(a);

//1 0 [ 1, 2, 3, 4 ]
//2 1 [ 1, 2, 3, 4 ]
//3 2 [ 1, 2, 3, 4 ]
//4 3 [ 1, 2, 3, 4 ]
//undefined
```

2).**`findIndex()`**

类似`find()`方法，不同的是返回指定查找项的索引；找不到返回`undefined`。

3).`includes()`

- --
- 不改变原数组
- 返回值：找到返回true；找不到返回false
- 参数类型：任意类型
  - 第一个参数是查找项
  - 第二个参数指定开始查找的位置(也可以为负数)
- --

> 数组空项和 `NaN` 都可以查找

```javascript
let ary = [1, 2, , 3, NaN];

ary.includes(2);//true
ary.includes();//true
ary.includes(NaN);//true
console.log(ary.includes(7));//false
```

##### 3.10 链式使用

上面这些数组方法之中，有不少返回的还是数组，所以可以链式使用。

```javascript
var users = [
  {name: 'tom', email: 'tom@example.com'},
  {name: 'peter', email: 'peter@example.com'}
];

users
.map(function (user) {
  return user.email;
})
.filter(function (email) {
  return /^t/.test(email);
})
.forEach(console.log);

//tom@example.com 0 [ 'tom@example.com' ]
```

### 3.包装对象

#### 1.定义

对象是 JavaScript 语言最主要的数据类型，三种原始类型的值——数值、字符串、布尔值——在一定条件下，也会自动转为对象，也就是原始类型的“包装对象”。

所谓“**包装对象**”，就是分别与数值、字符串、布尔值相对应的`Number`、`String`、`Boolean`三个原生对象。这三个原生对象可以把原始类型的值变成（包装成）对象。

```javascript
var v1 = new Number(123);
var v2 = new String('abc');
var v3 = new Boolean(true);
```

上面代码中，基于原始类型的值，生成了三个对应的包装对象。

```javascript
typeof v1 // "object"
typeof v2 // "object"
typeof v3 // "object"

v1 === 123 // false
v2 === 'abc' // false
v3 === true // false
```

> 包装对象的最大目的，首先是使得 JavaScript 的对象涵盖所有的值，其次使得原始类型的值可以方便地调用某些方法。

`Number`、`String`和`Boolean`如果不作为构造函数调用（即调用时不加`new`），常常用于将任意类型的值转为数值、字符串和布尔值。

总结一下，这三个对象作为构造函数使用（带有`new`）时，可以将原始类型的值转为对象；作为普通函数使用时（不带有`new`），可以将任意类型的值，转为原始类型的值。

#### 2.实例方法

包装对象的实例可以使用`Object`对象提供的原生方法，主要是`valueOf`方法和`toString`方法。

##### 2.1 valueOf

`valueOf`方法返回包装对象实例对应的原始类型的值。

```javascript
new Number(123).valueOf()  // 123
new String('abc').valueOf() // "abc"
new Boolean(true).valueOf() // true
```

##### 2.2 toString

`toString`方法返回对应的字符串形式。

```javascript
new Number(123).toString() // "123"
new String('abc').toString() // "abc"
new Boolean(true).toString() // "true"
```

#### 3.原始类型与实例对象的自动转换

原始类型的值，可以自动当作对象调用，即调用各种对象的方法和参数。这时，JavaScript 引擎会自动将原始类型的值转为包装对象实例，在使用后立刻销毁实例。

比如，字符串可以调用`length`属性，返回字符串的长度。

`'abc'.length // 3`

上面代码中，abc是一个字符串，本身不是对象，不能调用`length`属性。JavaScript 引擎自动将其转为包装对象，在这个对象上调用`length`属性。调用结束后，这个临时对象就会被销毁。这就叫原始类型与实例对象的自动转换。

```javascript
var str = 'abc';
str.length // 3

// 等同于
var strObj = new String(str)
// String {
//   0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"
// }
strObj.length // 3
```

自动转换生成的包装对象是只读的，无法修改。所以，字符串无法添加新属性。

```javascript
var s = 'Hello World';
s.x = 123;
s.x // undefined
```

另一方面，调用结束后，包装对象实例会自动销毁。这意味着，下一次调用字符串的属性时，实际是调用一个新生成的对象，而不是上一次调用时生成的那个对象，所以取不到赋值在上一个对象的属性。如果要为字符串添加属性，只有在它的原型对象`String.prototype`上定义。

#### 4.自定义方法

三种包装对象除了提供很多原生的实例方法，还可以在原型上添加自定义方法和属性，供原始类型的值直接调用。

比如，我们可以新增一个double方法，使得字符串和数字翻倍。

```javascript
String.prototype.double = function () {
  return this.valueOf() + this.valueOf();
};

'abc'.double()
// abcabc

Number.prototype.double = function () {
  return this.valueOf() + this.valueOf();
};

(123).double()
// 246
```

> 注意，在数值调用方法时必须要加上圆括号，否则后面的点运算符（`.`）会被解释成小数点而出错。

但是，这种自定义方法和属性的机制，只能定义在包装对象的原型上，如果直接对原始类型的变量添加属性，则无效。

```javascript
var s = 'abc';
s.p = function () {
  return this.valueOf() + this.valueOf();
};
console.log(s.p); // undefined
```

#### 5.Boolean 对象

##### 5.1 概述

`Boolean`对象是 JavaScript 的三个包装对象之一。作为构造函数，它主要用于生成布尔值的包装对象实例。

```javascript
var b = new Boolean(true);

typeof b // "object"
b.valueOf() // true
```

##### 5.2 Boolean 函数的类型转换作用

`Boolean`对象除了可以作为构造函数，还可以单独使用，将任意值转为布尔值。这时`Boolean`就是一个单纯的工具方法。

最后，对于一些特殊值，`Boolean`对象前面加不加`new`，会得到完全相反的结果，必须小心。

### 4.Number对象

#### 4.1.概述

`Number`对象是数值对应的包装对象，可以作为构造函数使用，也可以作为工具函数使用。

作为构造函数时，它用于生成值为数值的对象。

作为工具函数时，它可以将任何类型的值转为数值。

#### 4.2.属性

`Number`对象拥有以下一些属性。

- --
- `Number.POSITIVE_INFINITY`：正的无限，指向`Infinity`。
- `Number.NEGATIVE_INFINITY`：负的无限，指向`-Infinity`。
- `Number.NaN`：表示非数值，指向`NaN`。
- `Number.MAX_VALUE`：表示最大的正数，相应的，最小的负数为`-Number.MAX_VALUE`。
- `Number.MIN_VALUE`：表示最小的正数（即最接近0的正数，在64位浮点数体系中为`5e-324`），相应的，最接近0的负数为`-Number.MIN_VALUE`。
- `Number.MAX_SAFE_INTEGER`：表示能够精确表示的最大整数，即`9007199254740991`。
- `Number.MIN_SAFE_INTEGER`：表示能够精确表示的最小整数，即`-9007199254740991`。
- --

#### 4.3.实例方法

`Number`对象有4个实例方法，都跟将数值转换成指定格式有关。

##### 4.3.1 number.toString

`Number`对象部署了自己的`toString`方法，用来将一个数值转为字符串形式。

`toString`方法可以接受一个参数，表示输出的进制。如果省略这个参数，默认将数值先转为十进制，再输出字符串；否则，就根据参数指定的进制，将一个数字转化成指定进制的字符串。

```javascript
(10).toString(2) // "1010"
(10).toString(8) // "12"
(10).toString(16) // "a"
```

只要能够让 JavaScript 引擎不混淆小数点和对象的点运算符，各种写法都能用。除了为10加上括号，还可以在10后面加两个点，JavaScript 会把第一个点理解成小数点（即10.0），把第二个点理解成调用对象属性，从而得到正确结果。

这实际上意味着，可以直接对一个小数使用`toString`方法。

```javascript
10.5.toString() // "10.5"
10.5.toString(2) // "1010.1"
10.5.toString(8) // "12.4"
10.5.toString(16) // "a.8"
```

通过方括号运算符也可以调用`toString`方法。

```javascript
10['toString'](2); // 1010
10['toString'](8); // 12
10['toString'](16); // a
parseInt(1010,2);// 10
parseInt(1010);// 1010
parseInt(012);// 10
parseInt(0xa);// 10
```

`toString`方法只能将十进制的数，转为其他进制的字符串。如果要将其他进制的数，转回十进制，需要使用`parseInt`方法。

##### 4.3.2 number.toFixed

`toFixed`方法先将一个数转为指定位数的小数，然后返回这个小数对应的字符串。

`toFixed`方法的参数为小数位数，有效范围为0到20(现在是 0 - 100)，超出这个范围将抛出 `RangeError` 错误。

```javascript
//不传参数等价于传入0
2.123456.toFixed();//2
2.423456.toFixed(0);//2

2.123.toFixed(2);//2.12
2.445.toFixed(2);//2.44
2.556.toFixed(2);//2.56
2.978.toFixed(2);//2.98

console.log(2.978.toFixed(0));//3
console.log(2.978.toFixed(-1));
//toFixed() digits argument must be between 0 and 100

console.log(2.978.toFixed(100));//2.98...
console.log(2.978.toFixed(101));
//toFixed() digits argument must be between 0 and 100
```

##### 4.3.3 number.toExponential

`toExponential`方法用于将一个数转为科学计数法形式。

`toExponential`方法的参数是小数点后有效数字的位数，范围为0到20，超出这个范围，会抛出一个 `RangeError` 错误。

##### 4.3.4 number.toPrecision

`toPrecision`方法用于将一个数转为指定位数的有效数字。

```javascript
(1234.56).toPrecision(2)//1.2e+3
(1234.56).toPrecision(4)//1235
(1234.46).toPrecision(4)//1234
```

`toPrecision`方法的参数为有效数字的位数，范围是1到21(现在是1 - 100)，超出这个范围会抛出 `RangeError` 错误。

> `toPrecision`方法用于四舍五入时不太可靠，跟浮点数不是精确储存有关。

#### 4.4.自定义方法

与其他对象一样，`Number.prototype`对象上面可以自定义方法，被`Number`的实例继承。

```javascript
Number.prototype.add = function (x) {
  return this + x;
};

8['add'](2) // 10
```

在数值上调用某个方法，数值会自动转为`Number`的实例对象，所以就可以调用add方法了。由于add方法返回的还是数值，所以可以链式运算。

### 5.String对象

#### 5.1.概述

`String`对象是 JavaScript 原生提供的三个包装对象之一，用来生成字符串对象。

字符串对象是一个类似数组的对象（很像数组，但不是数组）。

```javascript
new String('abc')
// String {0: "a", 1: "b", 2: "c", length: 3}

(new String('abc'))[1] // "b"
```

除了用作构造函数，`String`对象还可以当作工具方法使用，将任意类型的值转为字符串。

#### 5.2.静态方法

##### 5.2.1 String.fromCharCode

该方法的参数是一个或多个数值，代表 `Unicode` 码点，返回值是这些码点组成的字符串。

```javascript
String.fromCharCode() // ""
String.fromCharCode(97) // "a"
String.fromCharCode(104, 101, 108, 108, 111)
// "hello"
```

> 注意，该方法不支持 `Unicode` 码点大于`0xFFFF`的字符，即传入的参数不能大于`0xFFFF`（即十进制的 65535）。这是因为`String.fromCharCode`发现参数值大于`0xFFFF`，就会忽略多出的位。

这种现象的根本原因在于，码点大于`0xFFFF`的字符占用四个字节，而 JavaScript 默认支持两个字节的字符。这种情况下，必须把`0x20BB7`拆成两个字符表示。

```javascript
String.fromCharCode(0xD842, 0xDFB7)
// "𠮷"

String.fromCharCode(0xD842, 0xDFB7).repeat(3);
// "𠮷𠮷𠮷"
```

上面代码中，`0x20BB7`拆成两个字符`0xD842`和`0xDFB7`（即两个两字节字符，合成一个四字节字符），就能得到正确的结果。码点大于`0xFFFF`的字符的四字节表示法，由 UTF-16 编码方法决定。

#### 5.3.实例属性

##### 5.3.1 string.length

字符串实例的`length`属性返回字符串的长度。

#### 5.4.实例方法

##### 5.4.1 字符方法

访问字符串中特定的字符，这两个方法都接收一个参数，即字符索引；

1).`string.charAt(n)`

以单字符串的形式返回给定索引位置的字符；如果参数为负数，或大于等于字符串的长度，`charAt`返回空字符串。

> JavaScript没有字符数据类型。

2).`string.charCodeAt(n)`

返回字符串指定位置的 `Unicode` 码点（十进制表示），相当于`String.fromCharCode()`的逆操作。

- --
- 返回值：字符/字符编码
- 参数类型：字符索引
- 参数：只有一个参数
  - a.不传参数，`charAt()`返回首字符，`charCodeAt()`返回首字符的码点；
  - b.若传入参数是负数或大于等于字符长度，`charAt()`会返回空字符；而`charCodeAt()`会返回`NaN`。
- --

```javascript
var str='abcd';
str.charAt(0);//a
str.charCodeAt(0);//97
String.fromCharCode(str.charCodeAt(0));//a
```

> 注意，`charCodeAt`方法返回的 `Unicode` 码点不会大于65536（`0xFFFF`），也就是说，只返回两个字节的字符的码点。
> 如果遇到码点大于 65536 的字符（四个字节的字符），必需连续使用两次`charCodeAt`，不仅读入`charCodeAt(i)`，还要读入`charCodeAt(i+1)`，将两个值放在一起，才能得到准确的字符。

##### 5.4.2 字符串操作方法

1).`string.concat(value,...)`

用于将一个或多个字符串按照顺序拼接到原字符串的末尾；

- --
- 返回值：返回一个新字符串；
- 参数类型：`String`
- 参数：
  - a.可以接受任意多参数，也就是说可以拼接任意多个字符串；实际更多用"`+`"，简便易行（特别是拼接多个）；
  - b.若传入的参数不是字符串形式，则会转换为字符串参与拼接；
  - c.若写成变量的形式，会在全局查找该变量，并将该变量的值代入，若在全局找不到该变量，则会报错；
- --

2).**`string.slice(start[,end])`**

复制字符串中从索引start到索引end(包括start,不包括end)的字符

- --
- 返回值:复制出来的新字符串
- 参数类型：数值
- 参数：
  - a.不传参数表示全部查找,等价于克隆
  - b.只传一个参数的时候:从索引start一直查找到最后
  - c.第二个参数指定复制截止的位置（本身不复制）
  - d.如果第二个参数比第一个参数小，为空字符串；
  - e.如果第二个参数大于字符串的`length`的，默认是查找到最后
  - f.如果参数是负值，将传入的负值与字符串的长度相加，遵循以上规则再进行复制（也可以看做从尾部倒数开始）；
- --

3).**`string.substring(start[,end])`**

复制字符串中从索引start到索引end(包括start,不包括end)的字符

- --
- 返回值:查找出的新的字符串
- 参数类型：数值
- 参数：
  - a.不传参数表示全部查找
  - b.只传一个参数的时候:从索引n一直查找到最后
  - c.第二个参数指定复制截止的位置（本身不复制）
  - d.如果第二个参数比第一个参数小，互换位置再执行查找；
  - e.如果第二个参数超过字符长度，则默认复制到最后；
  - f.如果参数是负值，将所有负值转换为0，遵循以上规则再进行复制；
- --

4).`string.substr(start[,length])`

复制字符串中从索引n开始查找m个字符

- --
- 返回值:查找出的新的字符串
- 参数类型：数值
- 参数：
  - a.不传参数表示全部查找
  - b.如果只有一个参数:从索引n一直查找到最后；
  - c.第二个参数指定复制字符的长度
  - d.如果第二个参数超过字符长度，则默认复制到最后；
  - e.参数是负值：若第一个参数是负值，则加上字符串的长度；若第二个参数是负值，则将其变为0，返回空字符串；
- --

##### 5.4.3 字符串位置方法

> **区分大小写**

1).**`string.indexOf(substring[,start])` **

在字符串中从前往后搜索，判断某个字符在不在这个字符串中（只在乎第一次出现），找不到子字符串则返回-1；

- --
- 返回值：指定字符的索引或者-1；
- 参数类型：字符(非字符类型被转化为字符)/数值
- 参数：
  - a.不传参数，默认为找不到子字符串，返回-1；
  - b.第一个参数指定搜索的字符(包括空格和符号)；
  - c.第二个参数，指定开始搜索的位置，默认为0；
  - d.若第二个参数小于0，视为输入0；若大于等于字符长度，视为输入`str.length`；
- --

2).**`string.lastIndexOf(substring[,start])`**

在字符串中从后往前搜索，判断某个字符在不在这个字符串中（只在乎第一次匹配），找不到子字符串则返回-1；

- --
- 返回值：指定字符的索引或者-1；
- 参数类型：字符(非字符类型被转化为字符)/数值
- 参数：
  - a.不传参数，默认为找不到子字符串，返回-1；
  - b.第一个参数指定搜索的字符(包括空格和符号)；
  - c.第二个参数，指定开始搜索的位置，默认为`str.length`；
  - d.若第二个参数小于0，视为输入0；若大于等于字符长度，视为输入`str.length`；
- --

> 对于`indexOf()`与`lastIndexOf()`，若是查找空字符或空数组时，则其返回值为第二个可选参数的值（没有就是默认值），注意当第二个参数的值大于字符长度时，返回值为字符长度，若是负数则返回0。

##### 5.4.4 空格处理

1).`string.trim()`

创建一个字符串的副本；删除前置及后缀的所有空格，然后返回结果；不修改原字符串；

- --
- 返回值：新字符串
- 没有参数，传参不报错，但是无效
- --

> 该方法去除的不仅是空格，还包括制表符（`\t`、`\v`）、换行符（`\n`）和回车符（`\r`）。

##### 5.4.5 字符串大小写转换方法

1).`string.toUpperCase()`
2).`string.toLowerCase()`
3).`string.toLocaleLowerCase()`
4).`string.toLocaleUpperCase()`

> `toUpperCase()`和`toLowerCase()`借鉴`Java.lang.String`中的同名方法；
> `toLocaleLowerCase()`和`toLocaleUpperCase()`是针对特定地区的实现；

- --
- 返回值：新字符串
- 没有参数，传参不报错，但是无效
- --

> 对于`toLocaleLowerCase()`和`toLocaleUpperCase()`传入参数为`null`或`undefined`会报错：`Uncaught TypeError: Cannot convert undefined or null to object at String.toLocaleLowerCase (native)`

##### 5.4.6 字符串的模式匹配方法

1).**`string.match(str/reg)`**

找到一个或多个正则表达式的匹配结果（在字符串上调用这个方法，本质上与调用`RegExp`的`exec()`方法相同）。

- --
- 返回值：一个数组或`null`；
- 参数类型：正则表达式/`RegExp`对象
- 参数：只接受一个参数
  - 不传参数，匹配项返回空字符
- --

```javascript
var s = "green yellow";

console.log(s.match());
//["", index: 0, input: "green yellow"]

console.log(s.match(/(en)/));
//["e", index: 2, input: "green yellow"]

console.log(/(e)/g.exec(s));
//["e", "e", index: 2, input: "green yellow"]
```

如果参数没有“`g`”标志，`match()`将只进行一次匹配。

如果没有匹配结果，则返回`null`；若有匹配结果，第一项是匹配项，之后每一项保存正则表达式圆括号子表达式匹配的字符串（若有），倒数第二项是匹配项的首字符的索引；最后一项是原字符；

如果参数有“`g`”标志，则`match()`进行一次全局搜索。全局匹配返回的数组和非全局匹配返回的数组内容很不一样。在全局匹配的情况下，数组元素包含`string`中每一个匹配子串，同时返回的数组没有`index`和`input`属性。

> 注意:对于全局匹配，`match()`不会提供有关捕获组的信息，也不会记录每个匹配的子串在`string`中的位置。若想在全局搜索时获取这些信息，可以使用`RegExp.exec()`。

2).`string.search(str/reg)`

根据正则表达式在string中寻找匹配的字符串；

- --
- 返回值：返回字符串中第一个匹配项的索引；如果找不到匹配项，则返回-1；
- 参数类型：正则表达式/RegExp对象
- 参数：只接受一个参数
- --

`search()`不执行全局匹配，会忽略“`g`”标志。也会忽略`regexp`的`lastIndex`属性，总是从开头位置开始搜索，这意味着它总是返回第一个匹配子串的位置。

##### 5.4.7 字符串的替换

1).**`string.replace(regexp[,replacement])`**

替换给定正则表达式匹配的（一个或多个）子表达式；

- --
- 返回值：新字符串，其中匹配的项(正则的最大匹配项)已替换为replacement（可以组合）
- 参数类型：`RegExp`对象/字符串，字符/function
- 参数：
  - a.不传参数，则返回原字符串
  - b.第一个参数可以是一个`RegExp`对象或者一个字符串（这个字符串不会被转换为正则表达式）；
  - c.只传一个参数：若能匹配，则将匹配项替换成`undefined`；若不能匹配，则返回原字符串
  - d.第二个参数是替换文本，可以是一个字符串或者一个函数，用于在调用时生成对应的替换文本（如果第一个参数是字符串，只替换第一个子字符串，要想替换所有子字符串，提供一个正则表达式和全局标志）。
  - e.如果第二个参数是字符串，那么还可以使用一些特殊的字符序列，将正则表达式操作得到的值插入到结果字符串中。
- --

> 更具体的用法见`RegExp`的相关章节。

##### 5.4.8 字符串变数组

1).**`string.split(delimiter[,limit])`**

基于指定的分隔符将一个字符串分割成多个子字符串，并将结果放到一个数组中

- --
- 返回值：返回一个字符串组成的数组（不包含分割文本，有捕获组的正则表达式这个情况）
- 参数类型：字符串/RegExp对象,数值；
- 参数：
  - a.不传参数，则默认将变成一个字符串数组；
  - b.若分隔符不匹配，也是整体变成字符串；
  - c.若分隔符出现在开头或结尾，则返回的数组的第一项或最后一项是空字符
  - d.若分隔符是`""`或者匹配空字符的正则，会将字符串的每一项拆分成数组的一项，返回的数组具有与`string`一样长度的（只是在没有指定更小`limit`的情况下，注意这是一个特例，因为第一个字符之前后最后一个字符之后的空字符不匹配）
  - e.可以接受可选的第二个参数，用于指定返回数组的大小，确保返回的数组不会超过既定大小；没有指定，则将切分整个字符串；
  - f.如果第二个参数是包含圆括号的正则表达式，则匹配这些圆括号表达式的子串将包含在返回的数组中。
- --

```javascript
var s="s1,s2,s3";
console.log(s.split());//["s1,s2,s3"]
console.log(s.split(" "));//["s1,s2,s3"]
console.log(s.split(","));//["s1", "s2", "s3"]
console.log(s.split(/s/));//["", "1,", "2,", "3"]
console.log(s.split(""));//["s", "1", ",", "s", "2", ",", "s", "3"]
```

> 对`split()`中正则的支持因浏览器而异。尽管对于简单模式没有声明差别，但对于未发现匹配项以及带有捕获组的模式，匹配的行为就大相径庭了。差别如下：
> IE8及之前版本会忽略捕获组。ECMCA-262规定应该把捕获组的内容拼接到结果数组中。IE能正确地在结果中包含捕获组；
> Firefox3.6及之前版本在捕获组为捕获到匹配项时，会在结果中包含空字符；ECMCA-262规定没有匹配项的捕获组在结果数组中应该用`undefined`表示；

##### 5.4.9 字符串比较

1).`string.localeCompare(target)`

根据本地默认的排序比较两个字符串（逐个比较），

- --
- 返回值：
  - 如果`target`中的字符排在`string`字符串之前，则返回一个负数（大多数情况下是-1，具体值看具体情况）；
  - 如果等于，返回0；
  - 如果排在后面，则返回正数（大多数情况下是1，具体值看具体情况）；
- 参数类型：字符串
- 参数：一个
- --

方法的最大特点，就是会考虑自然语言的顺序。举例来说，正常情况下，大写的英文字母小于小写字母。因为 JavaScript 采用的是 `Unicode` 码点比较，B的码点是66，而a的码点是9。但是，`localeCompare`方法会考虑自然语言的排序情况，将B排在a的前面。

`localeCompare`还可以有第二个参数，指定所使用的语言（默认是英语），然后根据该语言的规则进行比较。

##### 5.4.10 ES6新方法

1).**`string.includes(string)`**

判断某个字符或子字符串在不在某个字符串中

- --
- 返回值:true/false, 有就是true,没有就是false;
- 参数类型：`string`（非字符类型被强制转换为字符）
- 参数：一个
  - a.输入多个参数不报错，但只有第一个参数有效；
  - b.不传参数则无法匹配，就会返回false；
- --

2).**`string.repeat(n)` ** 重复字符

将字符串重复n次

- --
- 返回值:重复后的新字符串;
- 参数类型：非负数值
- 参数：只有一个参数
  - a.若参数是小数:只取整数部分（即向下取整）
  - b.若参数是负数，则报错
- --

3).`扩展运算符（...）`

扩展运算符；在字符中的作用类似`split()`

- --
- 返回值：
  - a.单个字符串，没有中括号的情况下产生一连串的单字符串；
  - b.若有中括号，会将单字符串放进一个数组返回；用小括号包裹会报错
- --

```javascript
var str="meih";
console.log(...str);//m e i h
console.log(...str+"a");//m e i h a
console.log([...str]);//["m", "e", "i", "h"]

//可以将类数组转换为数组；
function f1(){
    console.log([...arguments]);
};
f1(1,2,3,4);//[1, 2, 3, 4]
```

### 6.Math对象

ECMAScript为数学公式和信息提供了一个公共位置，即Math对象。该对象不是构造函数，不能生成实例，所有的属性和方法都必须在Math对象上调用。

#### 6.1.静态属性

|属性|说明|
|:--:|:--:|
|Math.E|自然对数的底数|
|Math.LN10|10的自然对数|
|Math.LN2|2的自然对数|
|Math.LOG2E|以2位底e的对数|
|Math.LOG10E|以10为e底的对数|
|Math.PI|π的值|
|Math.SQRT2|(2)平方根|

> 属性都是大写并且是只读的，**存储值**

#### 6.2.静态方法

- --
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
- --

##### 6.2.1 Math.abs

返回参数的绝对值

##### 6.2.2 Math.min 和 Math.max

用于返回一组数中的最大值或最小值，可以接收任意多的数值参数。如果参数为空, `Math.min`返回`Infinity`, `Math.max`返回`-Infinity`。

```javascript
// 若要找到数组中的最大/最小值，可以使用apply()方法
//关键在于，把Math对象作为apply（）的第一个参数，正确的设置this，然后，可以将任何数组当做第二个参数；

var values = [1, 3, 2, 6, 12];
var max = Math.max.apply(Math, values);
console.log(max);//12

var min = Math.min.apply(Math, values);
console.log(min);//1
```

##### 6.2.3 取整方法

1).`Math.ceil()`  执行向上舍入
2).`Math.floor()`  执行向下舍入
3).`Math.round()`  执行标准舍入

> `Math.round()`对于`-n.5`一律取值为`-n`;

##### 6.2.4 Math.random

1).`Math.random()`，返回一个大于等于0，小于1的伪随机数。

2).`Math.random()*(m-n)+n`，获得n到m之间的伪随机数（小数）；

3).`Math.floor(Math.randow()*(max-min+1))+min;` 任意范围随机整数

##### 6.2.5 Math.pow

返回以第一个参数为底数、第二个参数为幂的指数值。

##### 6.2.6 Math.sqrt

返回参数值的平方根。如果参数是一个负值，则返回`NaN`。

##### 6.2.7 Math.log

返回以e为底的自然对数值。

如果要计算以10为底的对数，可以先用`Math.log`求出自然对数，然后除以`Math.LN10`；求以2为底的对数，可以除以`Math.LN2`。

##### 6.2.8 Math.exp

返回常数e的参数次方。

##### 6.2.10 三角函数方法

Math对象还提供一系列三角函数方法。

- --
- `Math.sin()`：返回参数的正弦（参数为弧度值）
- `Math.cos()`：返回参数的余弦（参数为弧度值）
- `Math.tan()`：返回参数的正切（参数为弧度值）
- `Math.asin()`：返回参数的反正弦（返回值为弧度值）
- `Math.acos()`：返回参数的反余弦（返回值为弧度值）
- `Math.atan()`：返回参数的反正切（返回值为弧度值）
- --

> 注意，方法都是小写；

### 7.Date对象

ECMAScript中的`Date`类型是在早期Java中的`java.util.Date`类基础上构建的。为此，`Date`类型使用自UTC（*Coordinated Universal Time*，国际协调时间）1970年1月1日午夜（零时）开始经过的毫秒数来保存日期。在使用这种数据储存格式的条件下，`Date`类型保存的日期能精确到1970年1月1日之前或之后的 100 000 000 年。

#### 7.1.普通函数的用法

`Date`对象可以作为普通函数直接调用，返回一个代表当前时间的字符串。

```javascript
Date()
// Sat May 26 2018 12:00:51 GMT+0800 (中国标准时间)
```

注意，即使带有参数，`Date`作为普通函数使用时，返回的还是当前时间。

```javascript
Date(2000, 1, 1)
// Sat May 26 2018 12:00:51 GMT+0800 (中国标准时间)
```

#### 7.2.构造函数的用法

在调用`Date`构造函数时，不传递参数，新创建的对象自动获得当前日期和时间；若想根据特定的时间或日期创建日期对象，必须传入表示该日期的毫秒数（即从1970年1月1日午夜起至该日期经过的毫秒数）。

```javascript
var now= new Date();
console.log(now);
//Sat Mar 03 2018 22:28:29 GMT+0800 (中国标准时间)
```

`Date`实例有一个独特的地方。其他对象求值的时候，都是默认调用`.valueOf()`方法，但是`Date`实例求值的时候，默认调用的是`toString()`方法。这导致对`Date`实例求值，返回的是一个字符串，代表该实例对应的时间。

关于Date构造函数的参数，有几点说明。

第一点，参数可以是负整数，代表1970年元旦之前的时间。
第二点，只要是能被`Date.parse()`方法解析的字符串，都可以当作参数。

```javascript
new Date('2013-2-15')
new Date('2013/2/15')
new Date('02/15/2013')
new Date('2013-FEB-15')
new Date('FEB, 15, 2013')
new Date('FEB 15, 2013')
new Date('Feberuary, 15, 2013')
new Date('Feberuary 15, 2013')
new Date('15 Feb 2013')
new Date('15, Feberuary, 2013')
// Fri Feb 15 2013 00:00:00 GMT+0800 (CST)
```

第三，参数为年、月、日等多个整数时，年和月是不能省略的，其他参数都可以省略的。也就是说，这时至少需要两个参数，因为如果只使用“年”这一个参数，Date会将其解释为毫秒数。

最后，各个参数的取值范围如下。

- --
- 年：使用四位数年份，比如2000。如果写成两位数或个位数，则加上1900，即10代表1910年。如果是负数，表示公元前。
- 月：0表示一月，依次类推，11表示12月。
- 日：1到31。
- 小时：0到23。
- 分钟：0到59。
- 秒：0到59
- 毫秒：0到999。
- --

> 注意，月份从0开始计算，但是，天数从1开始计算。另外，除了日期的默认值为1，小时、分钟、秒钟和毫秒的默认值都是0。

这些参数如果超出了正常范围，会被自动折算。比如，如果月设为15，就折算为下一年的4月。

> 参数还可以使用负数，表示过去的时间。

#### 7.3.日期的运算

类型自动转换时，`Date`实例如果转为数值，则等于对应的毫秒数；如果转为字符串，则等于对应的日期字符串。所以，两个日期实例对象进行减法运算时，返回的是它们间隔的毫秒数；进行加法运算时，返回的是两个字符串连接而成的新字符串。

```javascript
var d1 = new Date(2000, 2, 1);
var d2 = new Date(2000, 3, 1);

d2 - d1
// 2678400000
d2 + d1
// "Sat Apr 01 2000 00:00:00 GMT+0800 (CST)Wed Mar 01 2000 00:00:00 GMT+0800 (CST)"
```

#### 7.4.静态方法

##### 7.4.1 Date.now

`Date.now`方法返回当前时间距离时间零点（1970年1月1日 00:00:00 UTC）的毫秒数，相当于 Unix 时间戳乘以1000。

> 对于不支持`Date.now()`方法的浏览器，可以使用`+`操作符获取`Date`对象的时间戳，也可以达到同样的目的。

```javascript
var start = +new Date();
var startO = new Date();
start; //1527307494273
startO; //2018-05-26T04:04:54.273Z
```

##### 7.4.2 Date.parse

`Date.parse`方法用来解析日期字符串，返回该时间距离时间零点（1970年1月1日 00:00:00）的毫秒数。

日期字符串应该符合 RFC 2822 和 ISO 8061 这两个标准，即 `YYYY-MM-DDTHH:mm:ss.sssZ` 格式，其中最后的 `Z` 表示时区。但是，其他格式也可以被解析，请看下面的例子。

```javascript
Date.parse('Aug 9, 1995')
Date.parse('January 26, 2011 13:51:50')
Date.parse('Mon, 25 Dec 1995 13:30:00 GMT')
Date.parse('Mon, 25 Dec 1995 13:30:00 +0430')
Date.parse('2011-10-10')
Date.parse('2011-10-10T14:48:00')
```

如果解析失败，返回`NaN`。

> 注意日期对象及其在不同浏览器中的实现不同。其中一种倾向是将超出范围的值替换成当前值，以便输出。例如，在解析“January 32,2007”时，有的的浏览器会将其解释为“February 1,2007”。而Opera则倾向于插入当前月份的当前日期，返回“January 当前日期,2007”。目前，对于超出范围的均返回`Invalid Date`（2018/3/3）。

##### 7.4.3 Date.UTC

`Date.UTC`方法接受年、月、日等变量作为参数，返回该时间距离时间零点（1970年1月1日 00:00:00 UTC）的毫秒数。

```javascript
// 格式
Date.UTC(year, month[, date[, hrs[, min[, sec[, ms]]]]])

// 用法
Date.UTC(2011, 0, 1, 2, 3, 4, 567)
// 1293847384567
```

该方法的参数用法与`Date`构造函数完全一致，比如月从0开始计算，日期从1开始计算。区别在于`Date.UTC`方法的参数，会被解释为 UTC 时间（世界标准时间），`Date`构造函数的参数会被解释为当前时区的时间。

> `Date`构造函数也可以直接接受`Date.UTC()`的参数，但是其日期和时间都是基于本地时区而非GMT来创建。因此，若第一个参数是数值，`Date`构造函数就会假设该值是日期中的年份，余下参数以此类推。

#### 7.5.实例方法

与其他引用类型一样，`Date`类型也重写了`toLocaleString()`,`toString()`和`valueOf()`方法。`Date`类型的`toLocaleString()`会按照与浏览器设置的地区相适应的格式返回日期和时间。这大致意味着时间格式中包含着AM或PM，但不会包含时区信息。而`toString()`方法通常返回带有时区信息的日期和时间，其中时间一般以军用时间（0-23）表示。

```javascript
//chrome:
var day = new Date();
console.log(day.toLocaleString());
//2018/5/26 下午2:20:03
console.log(day.toString());
//Sat May 26 2018 14:20:03 GMT+0800 (中国标准时间)
console.log(day.valueOf());
//1527315603560
```

> 这两中方法在不同的浏览器上的格式可谓大相径庭。实际上，这两者的差别仅在调试代码时比较有用。

至于`Date`类型的`valueOf()`方法，不返回字符串，而是返回日期的毫秒数。因此，可以比较方便的使用比较操作符来比较日期。

```javascript
var da1=new Date(2007,0,1);
var da2=new Date(2007,1,1);
console.log(da1 < da2);//true
```

#### 7.6.日期格式化方法

##### 7.6.1 `toDateString()`

以特定于实现的格式显示周几，月，日，年

##### 7.6.2 `toTimeString()`

以特定于实现的格式显示时，分，秒，时区

##### 7.6.3 `toLocaleDateString()`

以特定于地区的格式显示周几，月，日，年

##### 7.6.4 `toLocaleTimeString()`

以特定于地区的格式显示时，分，秒

##### 7.6.5 `toUTCString()`

以特定于实现的格式显示完整的UTC日期

> 以上方法因浏览器而异。

```javascript
var yk=new Date();
console.log(yk.toDateString());//Sat Mar 03 2018
console.log(yk.toTimeString());//23:53:53 GMT+0800 (中国标准时间)
console.log(yk.toLocaleDateString());//2018/3/3
console.log(yk.toLocaleTimeString());//下午11:53:53
console.log(yk.toUTCString());//Sat, 03 Mar 2018 15:53:53 GMT
```

#### 7.7.日期/时间组件方法

> UTC日期指的是在没有时区偏差的情况下（将日期转换为GMT时间）的日期值。

##### 7.7.1 获取当前电脑上的时间

如果传递参数，会将参数转换为本地时间

```javascript
var time=new Date();
console.log(time);
//Wed Aug 30 2017 11:42:27 GMT+0800 (中国标准时间)

let time=new Date().toLocaleString();
console.log(time);//2017/11/8 上午11:17:41
```

> 获取的是当前电脑上的时间，不能作为标准；一般以获取服务器的时间作为标准时间，请求头时间；

##### 7.7.2 获取服务器的时间

```javascript
//获取服务器时间,只需获取一次

let serverTime = null;
let timer = null;

let getServerTime = () => {
  if (serverTime == null) {
    let xhr = new XMLHttpRequest();
    xhr.open("get", "data.json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 2 && xhr.status == 200) {
        serverTime = xhr.getResponseHeader("date");
        serverTime = new Date(serverTime);
      }
    };
    xhr.send(null);
    return;
  }
  serverTime = new Date(serverTime.getTime() + 1000);
  console.log(serverTime.toLocaleString());
};

// 用setTimeout代替setInterval
function fn() {
  window.clearTimeout(timer);
  timer = window.setTimeout(fn, 1000);
  return getServerTime();
}

timer = window.setTimeout(fn, 1000);
```

##### 7.7.3 获取/设置四位的年

`var year=time.getFullYear();//2018`
`var year=time.setFullYear(2007);//1172938101286`

##### 7.7.4 获取月份 (0-11)

`var month=time.getMonth();//2`
`var month=time.setMonth(x/xx);//1520093403362`

##### 7.7.5 获取星期 0-6（星期日-星期六）

`var week=time.getDay();//0`

##### 7.7.6 获取日

`var day=time.getDate();//4`
`var day=time.setDate(6);//1520266650087`

##### 7.7.7 获取小时

`var hours=time.getHours();//0`
`var hours=time.setHours(16);//1520151503999`

##### 7.7.8 获取分

`var minute=time.getMinutes();//19`
`var minute=time.setMinutes(23);//1520094216640`

##### 7.7.9 获取秒

`var second=time.getSeconds();//51`
`var second=time.setSeconds();//1520094033978`

##### 7.7.10 获取毫秒

`var millisecond=time.getMilliseconds();//687`
`var millisecond=time.setMilliseconds();//1520094130066`

##### 7.7.11 getTime()

将时间变成毫秒，与`valueOf()`方法的返回值相同

```javascript
let curTime = new Date();
console.log(curTime);
//Sun Nov 05 2017 11:24:52 GMT+0800 (中国标准时间)
console.log(curTime.getTime());
//1509852292756
console.log(new Date(curTime.getTime()));
//Sun Nov 05 2017 11:24:52 GMT+0800 (中国标准时间)
```

#### 7.8.定时器小问题

> 清除定时器，清除的是指定序号的定时器；清除定时器的原理是阻止定时器中的函数执行，而无法清除计时器本身；

##### 7.8.1 `window.setInterval()`

- 有返回值，返回值是数字，代表的第n个定时器；
- 第一个参数是要执行的函数；
- 第二个参数是执行的周期，以毫秒计；

##### 7.8.2 `window.clearInterval()`

- 参数是定时器名
- 不传递参数的时候，默认清除所有定时器；

##### 7.8.3 `window.setTimeout()`/`window.clearTimeout()`

用`setTimeout()`实现`setInterval()`效果

```javascript
var timer = null;

function fn() {
    window.clearTimeout(timer);
    timer = window.setTimeout(fn, 1000);
    /* ... */
}

timer = window.setTimeout(fn, 1000);
```

### 8.RegExp对象

#### 8.1.概述

**正则表达式（regular expression）**是一种表达文本模式（即字符串结构）的方法，有点像字符串的模板，常常用来按照“给定模式”匹配文本。JavaScript 的正则表达式体系是参照 Perl 5 建立的。

ECMAScript通过`RegExp`类型来支持正则表达式。使用下面类似Perl的语法，就可以创建一个正则表达式。

`var expression = /pattern/flags;`

其中的**模式（pattern）**部分可以是任何简单或复杂的正则表达式，可以包括字符类。限定符、分组、先前查找以及反向引用。每个正则表达式都可以带有一个或多个**标志（flags）**，用以标明正则表达式的行为。

`var reg=new RegExp('zxc','g');`

上面两种写法是等价的，它们的主要区别是，第一种方法在引擎编译代码时，就会新建正则表达式，第二种方法在运行时新建正则表达式，所以前者的效率较高。而且，前者比较便利和直观，所以实际应用中，基本上都采用字面量定义正则表达式。

`RegExp`构造函数还可以接受第二个参数，表示修饰符。

#### 8.2.常见元字符

大部分字符在正则表达式中，就是字面的含义，比如`/a/`匹配a，`/b/`匹配b。如果在正则表达式之中，某个字符只表示它字面的含义（就像前面的a和b），那么它们就叫做**字面量字符（literal characters）**。

还有一部分字符有特殊的含义，不代表字面的意思，称之为**元字符（metacharacters)**。一个元字符只能匹配一个字符。

> 什么都不写是注释，有空格也算正则；

与其它语言的正则表达式类似，模式中使用元字符都必须转义，因为这些元字符在正则表达式中都有一种或多种特殊用途：
`( [ { \ ^ $ | ) ? * + . ] }`

- 元字符表：

|字符|作用|
|:--:|--|
|`.`|匹配换行`\n`、回车`\r`、行分割符`\u2028`、段分隔符`\u2029`以外任何单字符|
|`\`|转义作用，将下一个普通字符标记为特殊值字符或将特殊字符转义成普通字符；后向引用|
|`^`|匹配字符串的起始字符；若设置了Multiline模式，也匹配`\n`或`\r`之后的字符|
|`$`|匹配字符串的终止字符；若设置了Multiline模式，也匹配`\n`或`\r`之前的字符|
|`\d`|匹配一个数字字符，等价于`[0-9]`|
|`\D`|匹配一个非数字字符，等价于`[^0-9]`|
|`\w`|匹配包括下划线的单词字符，等价于`[A-Za-z0-9_]`|
|`\W`|匹配任何非单词字符，等价于`[^A-Za-z0-9_]`|
|`\b`|匹配一个单词边界|
|`\B`|匹配一个非边界|
|`\s`|匹配空白符,包括空格、制表符等等，等价于`[\f\n\r\t\v]`|
|`\S`|匹配任何非空白符，等价于`[^\f\n\r\t\v]`|
|`\f`|匹配换页符|
|`\n`|匹配换行符|
|`\r`|匹配回车符|
|`\t`|匹配制表符|
|`\v`|匹配垂直制表符|

> 若正则表达式规定了开头和结尾，而中间又没有量词元字符，则限定了唯一的字符串；
> 通常，正则表达式遇到换行符（`\n`）就会停止匹配。

#### 8.3.量词元字符

使用时，是加在字符后面，表示前面字符出现的次数；

|字符|作用|
|:--:|--|
|`*`|匹配零次或者多次|
|`+`|匹配一次或者多次|
|`?`|匹配零次或一次|
|`{n}`|n是非负整数，匹配确定的n次|
|`{n,}`|n是非负整数，至少匹配n次|
|`{n,m}`|n,m是非负整数，n<=m,匹配至少n次，至多m次；（逗号和数字之间不能有空格）|

```javascript
//匹配电话号码
   /^1\d{10}$/

//小数
    /^-?0\.\d+$/
    /^-?\d+\.\d+$/

//匹配汉字
    /[\u4e00-\u9fa5]/
```

#### 8.4.其他元字符

|字符|名|作用|
|:--:|--|--|
|`x\|y`|选择符|匹配x或y，左右两边作为整体对待|
|`[xyz]`|字符类|字符集合，匹配包含的任意字符|
|`[^xyz]`|脱字符|负值字符集合，匹配未包含的任意字符|
|`[a-z]`|连字符|字符范围，匹配指定范围内任意字符|
|`[^a-z]`|负值字符范围，匹配任何不在指定范围的字符|

> 在中括号内，所有字符代表本身的意义，除了`^`（非）和 `-`（至）以及 `\`（转意）
> 把 `-` 放在最后面，即可表示其本身意义；
> 注意，脱字符`^`只有在字符类的第一个位置才有特殊含义，否则就是字面含义。

#### 8.5.标志（修饰符）

|字符|作用|
|:--:|--|
|`g`|表示**全局（global）**模式，即模式将被应用于所有字符串|
|`i`|表示**不区分大小写（case-insensitive）**模式，即在确定匹配项时忽略模式与字符串的大小写|
|`m`|表示**多行（multiline）**模式，即在达到一行文本末尾还会继续查找下一行中是否存在于模式匹配的项|

> 加上m修饰符以后，`^` 和 `$`还会匹配行首和行尾，即 `^` 和 `$` 会识别换行符（`\n`）。

```javascript
var re = null, i;
for (i = 0; i < 5; i++) {
    re = /cat/g;
    console.log(re.test("catcat"));
}
for (i = 0; i < 5; i++) {
    re = new RegExp("cat", "g");
    console.log(re.test("catcat"));
}
```

在第一个循环中，即使是循环体指定，但实际上只为`/cat/`创建了一个`RegExp`实例。由于实例属性不会重置，所以在循环中再次调用函数的时候会失败。这是因为第一次调用找到了匹配项，第二次匹配从上次匹配字符后面的字符开始，没有`RegExp`实例所以无法匹配。

在第二个循环中，`RegExp`构造函数在每次循环中都会创建正则表达式，因为每次迭代都会创建新的`RegExp`实例，所以每次调用都会有返回值。

ECMAScript5明确规定，使用正则表达式字面量必须像直接调用`RegExp`构造函数一样，每次都会创建新的`RegExp`实例。

#### 8.6.实例属性

正则对象的实例属性分成两类。

一类是修饰符相关，返回一个布尔值，表示对应的修饰符是否设置。

- --
- `regexp.ignoreCase`：返回一个布尔值，表示是否设置了`i`修饰符。
- `regexp.global`：返回一个布尔值，表示是否设置了`g`修饰符。
- `regexp.multiline`：返回一个布尔值，表示是否设置了`m`修饰符。
- --

> 上面三个属性都是只读的。

另一类是与修饰符无关的属性，主要是下面两个。

- --
- `regexp.lastIndex`：返回一个数值，表示下一次开始搜索的位置。该属性可读写，但是只在设置了`g`修饰符、进行连续搜索时有意义。
- `regexp.source`：返回正则表达式的字符串形式（不包括反斜杠），该属性只读。
- --

```javascript
var pattern=/\[bc\]at/gi;
console.log(pattern.global);//true
console.log(pattern.ignoreCase);//true
console.log(pattern.multiline);//false
console.log(pattern.lastIndex);//0
console.log(pattern.source);//\[bc\]at
```

> RegExp实例继承的`toLocaleString()`和`toString()`方法都会返回正则表达式的字面量，与创建方式无关。`valueOf()`方法返回正则表达式本身。

#### 8.7.实例方法

##### 8.7.1 `regexp.exec()`

该方法是专门为捕获组而设计的。接收一个参数，即要应用模式的字符串，任何返回包含第一个匹配项信息的数组；或者在没有匹配项的情况下返回`null`。

返回的数组虽然是`Array`的实例，但是包含两个额外的属性：`index`和`input`。其中`index`表示匹配项在字符串中的位置，`input`表示应用正则表达式的字符串。在数组中，第一项是与整个模式匹配的字符串，其他项是模式中捕获组匹配的字符串（若没有捕获组，则只有一项）。

对于`exec()`方法而言，即使在模式中设置了全局标志，但每次也只会返回一个匹配项（当前匹配），`lastIndex`属性值会增加。在不设置全局标志的情况下，在同一个字符串上多次调用，始终只返回第一个匹配项的信息，`lastIndex`属性值不会变化。

> IE在实现`lastIndex`属性上有偏差，即使在非全局模式下，也会变化。

```javascript
var str = "name561age21";
var reg1 = /[a-z]+/g, reg2 = /[a-z]+/, reg3 = /([a-z])+/;
console.log(reg1.exec(str));
//["name", index: 0, input: "name561age21"]

console.log(reg2.exec(str));
//["name", index: 0, input: "name561age21"]

console.log(reg3.exec(str));
//["name", "e", index: 0, input: "name561age21"]
//同一捕获组的匹配项，只返回之后一次的匹配项
```

> 正则实例对象的`lastIndex`属性不仅可读，还可写。设置了`g`修饰符的时候，只要手动设置了`lastIndex`的值，就会从指定位置开始匹配。

##### 8.7.2 `regexp.test()`

用来判断目标字符与模式是否匹配（在不需要知道其内容的情况下，该方法很便利）。接收一个字符串参数。匹配时返回true，否则返回false。

如果正则表达式带有`g`修饰符，则每一次`test`方法都从上一次结束的位置开始向后匹配。

带有`g`修饰符时，可以通过正则对象的`lastIndex`属性指定开始搜索的位置。`lastIndex`属性只对同一个正则表达式有效。

```javascript
var count = 0;
while (/a/g.test('babaa')) count++;
```

上面代码会导致无限循环，因为`while`循环的每次匹配条件都是一个新的正则表达式，导致`lastIndex`属性总是等于0。

如果正则模式是一个空字符串，则匹配所有字符串。

#### 8.8.RegExp构造函数属性

RegExp构造函数包含一些属性（这些属性在其他语言中被看成是静态属性）。这些属性都适用于作用域中的所有正则表达式，并基于所执行的最近一次正则表达式操作而变化。这些属性的另一个独特之处，就是可以通过两种方式访问它们。（Opera不支持断属性名）

|长属性名|断属性名|说明|
|:--:|:--:|--|
|`input`|`$_`|最近一次要匹配的字符串；Opera未实现|
|`lastMatch`|`$&`|最近一次的匹配项；Opera未实现|
|`lastParen`|`$+`|最近一次匹配的捕获组；Opera未实现|
|`leftContext`|`$`|`input`字符串中`lastMatch`之前的文本|
|`multiline`|`$*`|布尔值，表示是否所有表达式都使用多行模式；Opera和IE未实现|
|`rightContext`|`*'`|`input`字符串中`lastMatch`之后的文本|

```javascript
var str = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
str.exec('2018-04-26');
s1 = RegExp.$1;
s2 = RegExp.$2;
s3 = RegExp.$3;
(s1 + ":" + s2 + ":" + s3); //2018:04:26
```

> 这些断属性名不是有效的ECMAScript标识符，必须通过方括号来访问。

还有多达9个用于分别存储捕获组的构造函数属性。访问语法：`RegExp.$1、...`。在调用`exec()`和`test()`方法时，这些属性会被自动填充。

#### 8.9.模式的局限性

尽管ECMAScript中的正则表达式功能还是比较完备，但任然缺少某些语言（特别是perl）所支持的高级正则表达式特性。

不支持的特性：

- --
- 1).匹配字符串开始和结尾的`\A`和`\Z`（但支持以插入符号`^`和美元`$`符号来匹配字符串的开头和结尾）
- 2).**向后查找（lookbehind）**（但完全支持**向前查找（lookhead）**）
- 3).并集和交集类
- 4).**原子组（atomic grouping）**
- 5).`Unicode`支持（单个字符除外，如`\uFFFF`）
- 6).命名的捕获组（但支持编号的捕获组）
- 7).`s`(single，单行)和`x`(free-spacing,无间隔)匹配模式
- 8).条件匹配
- 9).正则表达式注释
- --

#### 8.10.正则的特性：

##### 8.10.1 懒惰性

始终只会将第一次匹配的内容捕获出来；
解决：加上修饰符`g`，标识全局捕获；

```javascript
var reg = /\d/g;
var str = "haxi190365";

function getExec(n) {
    var ary = [];
    var a = reg.exec(n);
    while (a) {
        ary.push(a[0]);
        a = reg.exec(n);
    }
    return ary;
}

console.log(getExec(str));
//[ "1", "9", "0", "3", "6", "5" ]
```

##### 8.10.2 贪婪性

虽然只捕获一次，但是捕获的是内容最多的那个（取符合字符最多的那一组匹配）；

解决：在量词后面加问号`？`（取符合字符最少的那一组匹配）；

```javascript
var reg = /\d+/;
var str = "2017px0914";
console.log(reg.exec(str));//[2017]

var reg = /\d+?/;
var str = "2017px0914";
console.log(reg.exec(str));//[2]
```

#### 8.11.正则中的小括号的应用

##### 8.11.1 分组

`/(\w)ff\1/.test("dffd");`

> `\1`代表第一个小分组匹配的内容（\1指代的是（\w）的内容）。正则表达式内部，还可以用`\n`引用括号匹配的内容，n是从1开始的自然数，表示对应顺序的括号，这种用法称之为**后向引用**；

##### 8.11.2 分组捕获

分组的内容会被捕获出来；

```javascript
var reg = /\w(\d)\w(\1)/;
var str = "s8s8";
console.log(reg.exec(str));
//["s8s8", "8", "8", index: 0, input: "s8s8"]
```

> 注意，使用组匹配时，不宜同时使用`g`修饰符，否则`match`方法不会捕获分组的内容。必须加`g`，这时使用正则表达式的`exec`方法，配合循环，才能读到每一轮匹配的组捕获。

##### 8.11.3 分组嵌套

由外而内依次捕获；

```javascript
var reg = /\w(\d(\w)\d)/;
var str = "z9f8";
console.log(reg.exec(str));
//["z9f8", "9f8", "f", index: 0, input: "z9f8"]
```

##### 8.11.4 非捕获

`(?:)`称为**非捕获组（Non-capturing group）**，表示不返回该组匹配的内容，即匹配的结果中不计入这个括号。

```javascript
var reg = /\w{2}(\d{4})/;
var str = "zf2017px0914";
console.log(reg.exec(str));//[zf2017]  [2017]

var reg = /\w{2}(?:\d{4})/;
var str = "zf2017px0914";
console.log(reg.exec(str));//[zf2017]
```

下面是用来分解网址的正则表达式。

```javascript
// 正常匹配
var url = /(http|ftp):\/\/([^/\r\n]+)(\/[^\r\n]*)?/;

url.exec('http://google.com/');
// ["http://google.com/", "http", "google.com", "/"]

// 非捕获组匹配
var url = /(?:http|ftp):\/\/([^/\r\n]+)(\/[^\r\n]*)?/;

url.exec('http://google.com/');
// ["http://google.com/", "google.com", "/"]
```

#### 8.12.字符串方法在正则中的应用

字符串的实例方法之中，有4种与正则表达式有关。

- --
- `string.match()`：返回一个数组，成员是所有匹配的子字符串。
- `string.search()`：按照给定的正则表达式进行搜索，返回一个整数，表示匹配开始的位置。
- `string.replace()`：按照给定的正则表达式进行替换，返回替换后的字符串。
- `string.split()`：按照给定规则进行字符串分割，返回一个数组，包含分割后的各个成员。
- --

##### 8.12.1 string.match(regexp)

正则表达式不加修饰符`g`得到的结果类似`exec()`方法；
加了`g`修饰符以后，会返回所有匹配的结果，返回值也是一个数组，数组中没有`index`和`input`；匹配失败返回`null`。

```javascript
var reg = /\d/;
var reg1 = /\d/g;
var str = "qwe1709";
console.log(str.match(reg));
//["1", index: 2, input: "qwe1709"]

console.log(str.match(reg1));
//[ "1", "7", "0", "9" ]
```

> 设置正则表达式的`lastIndex`属性，对`match`方法无效，匹配总是从字符串的第一个字符开始。

##### 8.12.2 exec() 和 match() 的区别

`exec()`和`match()`都是用正则匹配内容，但：

1).`exec()`处理分组功能更强；`match()`在没有分组的情况下，能更快捷的把多次匹配的内容保存到数组里；

2).加上全局修饰符以后，`exec()`依旧只会捕获第一次匹配的内容，而`match()`会将所有匹配的内容都输出；

3).`exec()`属于正则类的方法，`match()`属于字符串类的方法；

##### 8.12.3 string.split()

按正则匹配的内容将字符串拆分为数组。接受两个参数，第一个参数是正则表达式，表示分隔规则，第二个参数是返回数组的最大成员数。如果正则表达式带有括号，则括号匹配的部分也会作为数组成员返回。

```javascript
var str = "2017-9-14 16:38";
console.log(str.split(/[ :-]/));
//["2017", "9", "14", "16", "38"]
```

##### 8.12.4 string.search()

返回第一个满足条件的匹配结果在整个字符串中的位置。如果没有任何匹配，则返回-1。

```javascript
var str = "sdf123";
console.log(str.search(/\d/));//2
console.log(str.search(/\w/));//0
```

##### 8.12.5 string.replace()

在字符串中用一些字符替换另一些字符，或者换一个与正则表达式匹配的子串；返回值是一个字符串，是用第二个参数替换正则表达式第一次匹配或所有匹配之后得到的；正则表达式如果不加`g`修饰符，就替换第一个匹配成功的值，否则替换所有匹配成功的值。

```javascript
var str = "1,2,3,4,5,6";
console.log(str.replace(/,/g, "+"));//1+2+3+4+5+6
console.log(eval(str.replace(/,/g, "+")));//21
```

replacement中的 `$` 具有特定的含义：

|字符|意义|
|:--:|--|
|**`$1`,...,`$99`**|匹配第1~99个regexp中圆括号子表达式的文本|
|**$&**|匹配整个模式的子串|
|**$`**|匹配子串的左边文本|
|**$'**|匹配子串右边的文本|
|**$$**|美元符号|

```javascript
var s = "hello world";
console.log(s.replace(/(l)/, "$&"));//hello world
console.log(s.replace(/(l)/, "$`"));//hehelo world
console.log(s.replace(/(l)/, "$'"));//helo worldlo world
console.log(s.replace(/(l)/, "$$"));//he$lo world

var text = "cat,bat,sat,fat";
result = text.replace(/(.at)/g, "word($1)");
console.log(result);
//word(cat),word(bat),word(sat),word(fat)
```

当`replace()`方法的第二个参数是函数而不是字符串时，每次匹配都调用该函数（匹配多少次自执行多少次），将这个函数的返回的字符串当做替换文本使用；这个函数是自定义的替换规则；

并且还要给这个函数传最少三个参数：

- --
- 1).当正则没有分组的时候，传进去的第一个实参是正则捕获到的内容，第二个参数是捕获到的内容在原字符串中的索引位置，第三个参数是原字符串（输入字符串）；
- --
- 2).当正则有分组的时候，第一个参数总是正则查找到的内容，后面依次是各个子正则查找到的内容；
- --
- 3).传完查找到的内容之后，再把总正则查找到的内容在原字符串中的索引传进（就是`arguments[0]`在str中的索引位置）。最后把输入字符串（就是原字符串）传进去；
- --

```javascript
var str = "bbs456qwe789";
var reg = /(\w{2})\d+/g;
var s = str.replace(reg, function ($1) {
  console.log(arguments);
  //Arguments(4) ["bs456", "bs", 1, "bbs456qwe789"]
  //Arguments(4) ["we789", "we", 7, "bbs456qwe789"]

  //$1 当前匹配的结果
  console.log($1); // bs456   we789

  //RegExp.$1的值是最后一次匹配的结果
  console.log(RegExp.$1); // we  we
  return '[' + arguments[1] + ']';
});
console.log(s);//b[bs]q[we]
```

> 注意：
> 1.`/[^]/` 表示所有非空字符串，不是非空格；
> 2.`\1` 表示等同于第一个小组内容，这种用法称为反向引用；
> 3.`^` 在正则表达式开始部分表达开头的意思；但是在字符集中，表示非的意思；
> 4.`//` 在正则中最常用的：`reg=/^\s*$/;`

##### 8.12.6 `lastIndex`

多次查找，如何知道下一次从哪个位置开始(⊙o⊙)?这就是正则（这个属性是正则对象的）的一个很重要的属性在发挥作用：`lastIndex`;

每个正则实例都有`lastIndex`属性，他的作用是规定当前这次的匹配的开始位置；如果正则表达式没有`g`修饰符，那么`lastIndex`的值永远都是 0；

#### 8.13.正向预查和负向预查

零宽断言是一种零宽度的匹配，它匹配的内容不会保存到匹配结果中，也不会占用`index`宽度，最终匹配的结果只是一个位置。

简单的说，它用于查找在某些内容之前或之后的东西(但返回结果并不包括这些内容)

JavaScript中只支持零宽先行断言。零宽断言返回的是位置而不是字符，零宽断言匹配成功后，其余表达式会基于这个返回的位置继续判断。

##### 8.13.1 x(?=pattern)

正向预查(正向先行断言)，要匹配的字符串，必须要满足pattern条件；

##### 8.13.2 x(?!pattern)

负向预查(负向先行断言)，要匹配的字符串，必须不满足pattern条件；

```javascript
var reg1 = /zhufeng(?!js)/;
var reg2 = /zhufeng(?=js)/;
var str = "zhufengjs";
console.log(reg1.exec(str));//null
console.log(reg2.exec(str));
//["zhufeng", index: 0, input: "zhufengjs"]
```

> 注意：括号里的内容只是条件，并不参与真正的捕获，只是检查后面的字符是否符合条件；

#### 8.14.运算符的优先级

相同优先级的从左到右进行运算，不同优先级的运算先高后低。

![Alt text](./运算符优先级.png)

### 9.属性描述对象

#### 9.1.概述

JavaScript 提供了一个内部数据结构，用来描述对象的属性，控制它的行为，比如该属性是否可写、可遍历等等。这个内部数据结构称为**属性描述对象（attributes object）**。每个属性都有自己对应的属性描述对象，保存该属性的一些元信息。

下面是属性描述对象的一个例子。

```javascript
{
  value: 123,
  writable: false,
  enumerable: true,
  configurable: false,
  get: undefined,
  set: undefined
}
```

属性描述对象提供6个元属性。

1).`value`

`value`是该属性的属性值，默认为`undefined`。

2).`writable`

`writable`是一个布尔值，表示属性值是否可改变（即是否可写），默认为true。

3).`enumerable`

`enumerable`是一个布尔值，表示该属性是否可遍历，默认为true。如果设为false，会使得某些操作（比如`for...in`循环、`Object.keys()`）跳过该属性。

4).`configurable`

`configurable`是一个布尔值，表示可配置性，默认为true。如果设为false，将阻止某些操作改写该属性，比如无法删除该属性，也不得改变该属性的属性描述对象（value属性除外）。也就是说，**`configurable`属性控制了属性描述对象的可写性**。

5).`get`

`get`是一个函数，表示该属性的**取值函数（getter）**，默认为`undefined`。

6).`set`

`set`是一个函数，表示该属性的**存值函数（setter）**，默认为`undefined`。

#### 9.2.Object.getOwnPropertyDescriptor()

`Object.getOwnPropertyDescriptor`方法可以获取属性描述对象。它的第一个参数是一个对象，第二个参数是一个字符串，对应该对象的某个属性名。

```javascript
var obj = { p: 'a' };
Object.getOwnPropertyDescriptor(obj, 'p');

// Object { value: "a",
//   writable: true,
//   enumerable: true,
//   configurable: true
// }

Object.getOwnPropertyDescriptor(obj, 'toString')
// undefined
```

> 注意，`Object.getOwnPropertyDescriptor`方法只能用于对象自身的属性，不能用于继承的属性。

#### 9.3.Object.getOwnPropertyNames()

`Object.getOwnPropertyNames`方法返回一个数组，成员是参数对象自身的全部属性的属性名，不管该属性是否可遍历。

```javascript
var obj = Object.defineProperties({}, {
  p1: { value: 1, enumerable: true },
  p2: { value: 2, enumerable: false }
});

Object.getOwnPropertyNames(obj)
// ["p1", "p2"]
```

这跟`Object.keys`的行为不同，`Object.keys`只返回对象自身的可遍历属性的全部属性名。

```javascript
Object.keys([]) // []
Object.getOwnPropertyNames([]) // [ 'length' ]

Object.keys(Object.prototype) // []
Object.getOwnPropertyNames(Object.prototype)
//['hasOwnProperty',
// 'valueOf',
// 'constructor',
// 'toLocaleString',
// 'isPrototypeOf',
// 'propertyIsEnumerable',
// 'toString']
```

#### 9.4.Object.defineProperty()/Object.defineProperties()

`Object.defineProperty`方法允许通过属性描述对象，定义或修改一个属性，然后返回修改后的对象，它的用法如下：

`Object.defineProperty`方法接受三个参数，依次如下。

- --
- a.object: 属性所在的对象
- b.propertyName: 属性名（它应该是一个字符串）
- c.attributesObject: 属性描述对象
- --

举例来说，定义`obj.p`可以写成下面这样。

```javascript
var obj = Object.defineProperty({}, 'p', {
  value: 123,
  writable: false,
  enumerable: true,
  configurable: false
});

obj.p // 123

obj.p = 246;
obj.p // 123
```

上面代码中，`Object.defineProperty`方法定义了`obj.p`属性。由于属性描述对象的`writable`属性为false，所以`obj.p`属性不可写。

> 注意，这里的`Object.defineProperty`方法的第一个参数是`{}`（一个新建的空对象），p属性直接定义在这个空对象上面，然后返回这个对象，这是`Object.defineProperty`的常见写法。

如果属性已经存在，`Object.defineProperty`方法相当于更新该属性的属性描述对象。

如果一次性定义或修改多个属性，可以使用`Object.defineProperties`方法。

```javascript
var obj = Object.defineProperties({}, {
  p1: { value: 123, enumerable: true },
  p2: { value: 'abc', enumerable: true },
  p3: {
    get: function () { return this.p1 + this.p2 },
    enumerable:true,
    configurable:true
  }
});

obj.p1 // 123
obj.p2 // "abc"
obj.p3 // "123abc"
```

上面代码中，`Object.defineProperties`同时定义了obj对象的三个属性。其中，p3属性定义了取值函数`get`，即每次读取该属性，都会调用这个取值函数。

> 注意，一旦定义了取值函数`get`（或存值函数`set`），就不能将`writable`属性设为true，或者同时定义`value`属性，否则会报错。

```javascript
var obj = {};

Object.defineProperty(obj, 'p', {
  value: 123,
  get: function() { return 456; }
});
// TypeError: Invalid property.
// A property cannot both have accessors and be writable or have a value

Object.defineProperty(obj, 'p', {
  writable: true,
  get: function() { return 456; }
});
// TypeError: Invalid property descriptor.
// Cannot both specify accessors and a value or writable attribute
```

`Object.defineProperty()`和`Object.defineProperties()`的第三个参数，是一个属性对象。它的`writable`、`configurable`、`enumerable`这三个属性的默认值都为false。

```javascript
var obj = {};
Object.defineProperty(obj, 'foo', {});
Object.getOwnPropertyDescriptor(obj, 'foo');

// {
//   value: undefined,
//   writable: false,
//   enumerable: false,
//   configurable: falsee
// }
```

#### 9.5.Object.prototype.propertyIsEnumerable()

实例对象的`propertyIsEnumerable`方法返回一个布尔值，用来判断某个属性是否可遍历。

```javascript
var obj = {};
obj.p = 123;

obj.propertyIsEnumerable('p') // true
obj.propertyIsEnumerable('toString') // false
```

上面代码中，`obj.p`是可遍历的，而继承自原型对象的`obj.toString`属性是不可遍历的。

#### 9.6.元属性

属性描述对象的各个属性称为“**元属性**”，因为它们可以看作是控制属性的属性。

##### 9.6.1 value

`value`属性是目标属性的值。

```javascript
var obj = {};
obj.p = 123;

Object.getOwnPropertyDescriptor(obj, 'p').value
// 123

Object.defineProperty(obj, 'p', { value: 246 });
obj.p // 246
```

##### 9.6.2 writable

`writable`属性是一个布尔值，决定了目标属性的值是否可以被改变。

```javascript
var obj = {};

Object.defineProperty(obj, 'a', {
  value: 37,
  writable: false
});

obj.a // 37
obj.a = 25;
obj.a // 37
```

注意，正常模式下，对`writable`为false的属性赋值不会报错，只会默默失败。但是，严格模式下会报错，即使对a属性重新赋予一个同样的值。

```javascript
'use strict';
var obj = {};

Object.defineProperty(obj, 'a', {
  value: 37,
  writable: false
});

obj.a = 37;
// Uncaught TypeError: Cannot assign to read only property 'a' of object
```

如果原型对象的某个属性的`writable`为false，那么子对象将无法自定义这个属性。

```javascript
var proto = Object.defineProperty({}, 'foo', {
  value: 'a',
  writable: false
});

var obj = Object.create(proto);

obj.foo = 'b';
obj.foo // 'a'
```

上面代码中，proto是原型对象，它的foo属性不可写。obj对象继承proto，也不可以再自定义这个属性了。如果是严格模式，这样做还会抛出一个错误。

但是，有一个规避方法，就是通过覆盖属性描述对象，绕过这个限制。原因是这种情况下，原型链会被完全忽视。

```javascript
var proto = Object.defineProperty({}, 'foo', {
  value: 'a',
  writable: false
});

var obj = Object.create(proto);
Object.defineProperty(obj, 'foo', {
  value: 'b'
});

obj.foo // "b"
```

##### 9.6.3 enumerable

`enumerable`（可遍历性）返回一个布尔值，表示目标属性是否可遍历。

JavaScript 的早期版本，`for...in`循环是基于`in`运算符的。我们知道，`in`运算符不管某个属性是对象自身的还是继承的，都会返回true。

```javascript
var obj = {};
'toString' in obj // true
```

这显然不太合理，后来就引入了“可遍历性”这个概念。只有可遍历的属性，才会被`for...in`循环遍历，同时还规定`toString`这一类实例对象继承的原生属性，都是不可遍历的，这样就保证了`for...in`循环的可用性。

具体来说，如果一个属性的`enumerable`为false，下面三个操作不会取到该属性。

- --
- `for..in`循环
- `Object.keys`方法
- `JSON.stringify`方法
- --

因此，`enumerable`可以用来设置“秘密”属性。

```javascript
var obj = {};

Object.defineProperty(obj, 'x', {
  value: 123,
  enumerable: false
});

obj.x // 123

let count = 0;
for (var key in obj) {
  count++;
  console.log('key ' + '[' + key + ']');
}

console.log(count); // 0
// 没有可遍历属性时，基本就是没有执行

Object.keys(obj)  // []
JSON.stringify(obj) // "{}"
```

上面代码中，obj.x属性的`enumerable`为false，所以一般的遍历操作都无法获取该属性，使得它有点像“秘密”属性，但不是真正的私有属性，还是可以直接获取它的值。

> 注意，获取可遍历属性中，`for...in`循环包括继承的属性，`Object.keys`方法不包括继承的属性。如果需要获取对象自身的所有属性，不管是否可遍历，可以使用`Object.getOwnPropertyNames`方法。

另外，`JSON.stringify`方法会排除`enumerable`为false的属性，有时可以利用这一点。如果对象的 `JSON` 格式输出要排除某些属性，就可以把这些属性的`enumerable`设为false。

##### 9.6.4 configurable

`configurable`(可配置性）返回一个布尔值，决定了是否可以修改属性描述对象。也就是说，`configurable`为false时，`writable`、`enumerable`和`configurable`都不能被修改了。

```javascript
var obj = Object.defineProperty({}, 'p', {
  value: 1,
  writable: false,
  enumerable: false,
  configurable: false
});

Object.defineProperty(obj, 'p', {value: 2})
// TypeError: Cannot redefine property: p

Object.defineProperty(obj, 'p', {writable: true})
// TypeError: Cannot redefine property: p

Object.defineProperty(obj, 'p', {enumerable: true})
// TypeError: Cannot redefine property: p

Object.defineProperty(obj, 'p', {configurable: true})
// TypeError: Cannot redefine property: p
```

注意，`writable`只有在false改为true会报错，true改为false是允许的。

```javascript
var obj = Object.defineProperty({}, 'p', {
  writable: true,
  configurable: false
});

Object.defineProperty(obj, 'p', {writable: false})
// 修改成功
```

至于`value`，只要`writable`和`configurable`有一个为true，就允许改动。

```javascript
var o1 = Object.defineProperty({}, 'p', {
  value: 1,
  writable: true,
  configurable: false
});

Object.defineProperty(o1, 'p', {value: 2})
// 修改成功

var o2 = Object.defineProperty({}, 'p', {
  value: 1,
  writable: false,
  configurable: true
});

Object.defineProperty(o2, 'p', {value: 2})
// 修改成功
```

另外，`configurable`为false时，直接目标属性赋值，不报错，但不会成功。如果是严格模式，还会报错。

```javascript
var obj = Object.defineProperty({}, 'p', {
  value: 1,
  configurable: false
});

obj.p = 2;
obj.p // 1
```

可配置性决定了目标属性是否可以被删除（`delete`）。

```javascript
var obj = Object.defineProperties({}, {
  p1: { value: 1, configurable: true },
  p2: { value: 2, configurable: false }
});

delete obj.p1 // true
delete obj.p2 // false

obj.p1 // undefined
obj.p2 // 2
```

#### 9.7.存取器

除了直接定义以外，属性还可以用**存取器（accessor）**定义。其中，存值函数称为`setter`，使用属性描述对象的`set`属性；取值函数称为`getter`，使用属性描述对象的`get`属性。

一旦对目标属性定义了存取器，那么存取的时候，都将执行对应的函数。利用这个功能，可以实现许多高级特性，比如某个属性禁止赋值。

```javascript
var obj = Object.defineProperty({}, 'p', {
  get: function () {
    return 'getter';
  },
  set: function (value) {
    console.log('setter: ' + value);
  }
});

obj.p; // "getter"
obj.p = 123; // "setter: 123"
```

JavaScript 还提供了存取器的另一种写法。

```javascript
var obj = {
  get p() {
    return 'getter';
  },
  set p(value) {
    console.log('setter: ' + value);
  }
};
```

上面的写法与定义属性描述对象是等价的，而且使用更广泛。

> 注意，取值函数`get`不能接受参数，存值函数`set`只能接受一个参数（即属性的值）。

存取器往往用于，属性的值依赖对象内部数据的场合。

```javascript
var obj = {
  $n: 5,
  get next() {
    return this.$n;
  },
  set next(n) {
    if (n >= this.$n) {
      this.$n = n;
    }
    else {
      throw new Error('新的值必须大于当前值');
    }
  }
};

obj.next // 5

obj.next = 10;
obj.next // 10

obj.next = 5;
// Uncaught Error: 新的值必须大于当前值
```

#### 9.8.对象的拷贝

有时，我们需要将一个对象的所有属性，拷贝到另一个对象，可以用下面的方法实现。

```javascript
var extend = function (to, from) {
  for (var property in from) {
    to[property] = from[property];
  }
  return to;
}

extend({}, {
  a: 1
})
// {a: 1}
```

上面这个方法的问题在于，如果遇到存取器定义的属性，会只拷贝值。

```javascript
extend({}, {
  get a() { return 1 }
})
// {a: 1}
```

为了解决这个问题，我们可以通过`Object.defineProperty`方法来拷贝属性。

```javascript
var extend = function (to, from) {
  for (var property in from) {
    if (!from.hasOwnProperty(property)) continue;
    //将私有属性 “定义” to对象上
    Object.defineProperty(
      to,
      property,
      Object.getOwnPropertyDescriptor(from, property)
    );
  }

  return to;
}

//Object.keys
var extend = function (to, from) {
    Object.keys(from).forEach((item) => {
      Object.defineProperty(
        to,
        item,
        Object.getOwnPropertyDescriptor(from, item)
      );
    })

    return to;
  }

extend({}, { get a(){ return 1 } })
// { get a(){ return 1 } })
```

> 注意，`hasOwnProperty`那一行用来过滤掉继承的属性，否则会报错，因为`Object.getOwnPropertyDescriptor`读不到继承属性的属性描述对象。

#### 9.9.控制对象状态

有时需要冻结对象的读写状态，防止对象被改变。JavaScript 提供了三种冻结方法，最弱的一种是`Object.preventExtensions`，其次是`Object.seal`，最强的是`Object.freeze`。

##### 9.9.1 Object.preventExtensions()

`Object.preventExtensions`方法可以使得一个对象无法再添加新的属性。

```javascript
var obj = new Object();
Object.preventExtensions(obj);

Object.defineProperty(obj, 'p', {
  value: 'hello'
});
// TypeError: Cannot define property:p, object is not extensible.

//不报错但无效；严格模式报错
obj.p = 1;
obj.p // undefined
```

##### 9.9.2 Object.isExtensible()

`Object.isExtensible`方法用于检查一个对象是否使用了`Object.preventExtensions`方法。也就是说，检查是否可以为一个对象添加属性。

```javascript
var obj = new Object();

Object.isExtensible(obj) // true
Object.preventExtensions(obj);
Object.isExtensible(obj) // false
```

##### 9.9.3 Object.seal()

`Object.seal`方法使得一个对象既无法添加新属性，也无法删除旧属性。

```javascript
var obj = { p: 'hello' };
Object.seal(obj);

delete obj.p;
obj.p // "hello"

obj.x = 'world';
obj.x // undefined
```

`Object.seal`实质是把属性描述对象的`configurable`属性设为false，因此属性描述对象不再能改变了。

```javascript
var obj = {
  p: 'a'
};

// seal方法之前
Object.getOwnPropertyDescriptor(obj, 'p')
// Object {
//   value: "a",
//   writable: true,
//   enumerable: true,
//   configurable: true
// }

Object.seal(obj);

// seal方法之后
Object.getOwnPropertyDescriptor(obj, 'p')
// Object {
//   value: "a",
//   writable: true,
//   enumerable: true,
//   configurable: false
// }

Object.defineProperty(obj, 'p', {
  enumerable: false
})
// TypeError: Cannot redefine property: p
```

上面代码中，使用`Object.seal`方法之后，属性描述对象的`configurable`属性就变成了false，然后改变`enumerable`属性就会报错(将`writable`属性改为false不会报错)。

`Object.seal`只是禁止新增或删除属性，并不影响修改某个属性的值。是因为此时`p`属性的可写性由`writable`决定。

```javascript
var obj = { p: 'a' };
Object.seal(obj);
obj.p = 'b';
obj.p // 'b'
```

##### 9.9.4 Object.isSealed()

`Object.isSealed`方法用于检查一个对象是否使用了`Object.seal`方法。

```javascript
var obj = { p: 'a' };

Object.seal(obj);
Object.isSealed(obj) // true
```

这时，`Object.isExtensible`方法也返回false。

```javascript
var obj = { p: 'a' };

Object.seal(obj);
Object.isExtensible(obj)； // false
```

##### 9.9.5 Object.freeze()

`Object.freeze`方法可以使得一个对象无法添加新属性、无法删除旧属性、也无法改变属性的值，使得这个对象实际上变成了常量。

```javascript
var obj = {
  p: 'hello'
};

Object.freeze(obj);

//这些操作并不报错，只是默默地失败。如果在严格模式下，则会报错
obj.p = 'world';
obj.p // "hello"

obj.t = 'hello';
obj.t // undefined

delete obj.p // false
obj.p // "hello"
```

##### 9.9.6 Object.isFrozen()

`Object.isFrozen`方法用于检查一个对象是否使用了`Object.freeze`方法。

```javascript
var obj = {
  p: 'hello'
};

Object.freeze(obj);
Object.isFrozen(obj) // true
```

> 使用`Object.freeze`方法以后，`Object.isSealed`将会返回true，`Object.isExtensible`返回false。

`Object.isFrozen`的一个用途是，确认某个对象没有被冻结后，再对它的属性赋值。

```javascript
var obj = {
  p: 'hello'
};

Object.freeze(obj);

if (!Object.isFrozen(obj)) {
  obj.p = 'world';
}
```

##### 9.9.7 局限性

上面的三个方法锁定对象的可写性有一个漏洞：可以通过改变原型对象，来为对象增加属性。

```javascript
var obj = new Object();
Object.preventExtensions(obj);

var proto = Object.getPrototypeOf(obj);
proto.t = 'hello';
obj.t
// hello
```

一种解决方案是，把obj的原型也冻结住。

```javascript
var obj = new Object();
Object.preventExtensions(obj);

var proto = Object.getPrototypeOf(obj);
Object.preventExtensions(proto);

proto.t = 'hello';
obj.t // undefined
```

另外一个局限是，如果属性值是对象，上面这些方法只能冻结属性指向的对象，而不能冻结对象本身的内容。

```javascript
var obj = {
  foo: 1,
  bar: ['a', 'b']
};
Object.freeze(obj);

obj.bar.push('c');
obj.bar // ["a", "b", "c"]
```