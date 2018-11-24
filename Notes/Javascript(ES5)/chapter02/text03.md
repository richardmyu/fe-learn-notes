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
