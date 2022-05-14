# String 对象

## 1.概述

`String` 对象是 JavaScript 原生提供的三个包装对象之一，用来生成字符串对象。

字符串对象是一个类似数组的对象（很像数组，但不是数组）。

```js
new String("abc");
// String {0: "a", 1: "b", 2: "c", length: 3}

new String("abc")[1]; // "b"
```

除了用作构造函数，`String` 对象还可以当作工具方法使用，将任意类型的值转为字符串。

```js
// 将任意类型数据转换位字符串
String(123); //'123'
String([1, 2]); //'1,2'
String({ a: 1, b: 2 }); //[object Object]
String(NaN); //'NaN'
String(null); //'null'
String(undefined); //'undefined'

// 只有第一个参数有效
String(1, 2); //'1'
```

## 2.静态方法

### 2.1.`String.fromCharCode`

该方法的参数是一个或多个数值，代表 Unicode 码点，返回值是这些码点组成的字符串。

- **语法**

`String.fromCharCode(num1[, ...[, numN]])`

- **参数**
  - 该方法不支持 Unicode 码点大于 `0xFFFF` 的字符，即传入的参数不能大于 `0xFFFF`（即十进制的 65535），大于 `0xFFFF` 的数字将被截断，不进行有效性检查。

> 这种现象的根本原因在于，码点大于 `0xFFFF` 的字符占用四个字节，而 JavaScript 默认支持两个字节的字符。这种情况下，必须把大于 `0xFFFF` 的字符，例如 `0x20BB7` 拆成两个字符来表示。

- **返回值**
  - 一个长度为 N 的字符串，由 N 个指定的 Unicode 码点组成。注意，该方法返回一个字符串，而不是一个 `String` 对象。

- **实例**

```js
String.fromCharCode(); // ""
String.fromCharCode(97); // "a"
String.fromCharCode(104, 101, 108, 108, 111); // "hello"
String.fromCharCode(189, 43, 190, 61); // ½+¾=

//  码点大于 `0xFFFF` 的字符
String.fromCharCode(0xd842, 0xdfb7);
// "𠮷"

String.fromCharCode(0xd842, 0xdfb7).repeat(3);
// "𠮷𠮷𠮷"
```

#### 2.1.1.补充字符

在 UTF-16 中，绝大部分常用的字符可以用一个 16 位的值表示（即一个代码单元）。然而，有一类字符叫 Base Multilingual Plane (BMP)，是所有可寻址的 Unicode 码点的 1/17th。剩下的码点，从范围 `65536` (`0x010000`) 到 `1114111` (`0x10FFFF`) 被称之为 **补充字符**。在 UTF-16 中，补充字符也叫 **代理**（surrogates），用两个 16 位代码单元表示，它是有目的被保留下来的。两个代理形成一个有效组合，也叫 **代理对**，可以用来表示一个补充字符。

因为 `fromCharCode` 只作用于 16 位的值 (跟 `\u` 转义序列一样)，为了返回一个补充字符，一个代理对是必须的。例如，`String.fromCharCode(0xD83C, 0xDF03)` 和 `\uD83C\uDF03` 返回码点 `U+1F303` "Night with Stars"。

```js
String.fromCharCode(0xD83C, 0xDF03) === '\uD83C\uDF03' // true
```

## 3.实例属性

### 3.1.`string.length`

`string.length` 属性是一个只读的整数，指明指定字符串中的字符个数。字符串的 `length` 属性不会在 `for-in` 循环中枚举，也不可用通过 `delete` 操作符删除。

```js
var str = "明月几时有";
str.length; // 5
// 操作 length 不起作用，但是也不报错
str.length = 2;
str.length; // 5

// 但是严格模式下，会报错的
("use strict");
var str = "明月几时有";
str.length; //5
str.length = 2;
str.length;
//TypeError: Cannot assign to read only property 'length' of string '明月几时有'
```

字符串可以被视为字符数组，因此可以使用数组的方括号运算符，用来返回某个位置的字符（位置编号从 0 开始）。如果方括号中的数字超过字符串的长度，或者方括号中根本不是数字，则返回 `undefined`。

> 任何字符串的长度都可以通过访问其 `length` 属性取得。如果字符中包含双字节字符，那么 `length` 属性可能不会精确返回字符数目。

## 4.实例方法

### 4.1.字符方法

访问字符串中特定的字符，这两个方法都接收一个参数，即字符索引；

#### 4.1.1.`string.charAt`

返回给定索引位置的字符。

> JavaScript 没有字符数据类型。

- **语法**

```js
string.charAt(index)
```

- **参数**

  - `index`：一个介于 0 和字符串长度减 1 之间的整数(0 ~ `str.length` - 1)。
    - 如果没有提供索引，默认将使用 0；
    - 如果指定的 `index` 值超出了该范围，则返回一个空字符串；

- **示例**

修复 `charAt` 以支持非基本多文种平面（BMP）字符：

```js
function fixedCharAt (str, idx) {
  var ret = '';
  str += '';
  var end = str.length;

  var surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  while ((surrogatePairs.exec(str)) != null) {
    var li = surrogatePairs.lastIndex;
    if (li - 2 < idx) {
      idx++;
    } else {
      break;
    }
  }

  if (idx >= end || idx < 0) {
    return '';
  }

  ret += str.charAt(idx);

  if (/[\uD800-\uDBFF]/.test(ret) && /[\uDC00-\uDFFF]/.test(str.charAt(idx+1))) {
    // Go one further, since one of the "characters" is part of a surrogate pair
    ret += str.charAt(idx+1);
  }
  return ret;
}
```

#### 4.1.2.`string.charCodeAt`

`charCodeAt` 方法返回 0 到 65535 之间的整数，表示给定索引处的 UTF-16 代码单元。

UTF-16 编码单元匹配能用一个 UTF-16 编码单元表示的 Unicode 码点。如果遇到码点大于 65536 的字符（四个字节的字符），必需连续使用两次 `charCodeAt`，不仅读入 `charCodeAt(i)`，还要读入 `charCodeAt(i+1)`，将两个值放在一起，才能得到准确的字符，或者改为获取 `codePointAt(i)` 的值。

- **语法**

```js
string.charCodeAt(index)
```

- **参数**

  - `index`：一个大于等于 0，小于字符串长度的整数。如果不是一个数值，则默认为 0。
    - 不传参数，返回首字符的码点；
    - 如果指定的 `index` 值超出了该范围，则会返回 `NaN`。

- **实例**

```js
"ABC".charCodeAt(0); // 65
"ABC".charCodeAt(1); // 66
"ABC".charCodeAt(2); // 67
"ABC".charCodeAt(3); // NaN
```

- **示例**

使用 `charCodeAt` 修复字符串中出现的未知的非基本多语言范围（非 BMP，non-Basic-Multilingual-Plane）字符：

```js
// 这段代码可以被用在 for 循环和其他类似语句中
// 当在指定引索之前不确定是否有非 BMP 字符存在时
function fixedCharCodeAt (str, idx) {
    // ex. fixedCharCodeAt ('\uD800\uDC00', 0); // 65536
    // ex. fixedCharCodeAt ('\uD800\uDC00', 1); // false
    idx = idx || 0;
    var code = str.charCodeAt(idx);
    var hi, low;

    // High surrogate (could change last hex to 0xDB7F to treat high
    // private surrogates as single characters)
    if (0xD800 <= code && code <= 0xDBFF) {
        hi = code;
        low = str.charCodeAt(idx+1);
        if (isNaN(low)) {
            throw 'High surrogate not followed by low surrogate in fixedCharCodeAt()';
        }
        return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
    }
    if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
        // We return false to allow loops to skip this iteration since should have
        // already handled high surrogate above in the previous iteration
        return false;
        /*hi = str.charCodeAt(idx-1);
        low = code;
        return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;*/
    }
    return code;
}
```

使用 `charCodeAt` 修复字符串中出现的已知的非BMP字符：

```js
function knownCharCodeAt (str, idx) {
    str += '';
    var code,
        end = str.length;

    var surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    while ((surrogatePairs.exec(str)) != null) {
        var li = surrogatePairs.lastIndex;
        if (li - 2 < idx) {
            idx++;
        }
        else {
            break;
        }
    }

    if (idx >= end || idx < 0) {
        return NaN;
    }

    code = str.charCodeAt(idx);

    var hi, low;
    if (0xD800 <= code && code <= 0xDBFF) {
        hi = code;
        low = str.charCodeAt(idx+1);
        // Go one further, since one of the "characters" is part of a surrogate pair
        return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
    }
    return code;
}
```

### 4.2.字符串操作方法

#### 4.2.1.`string.concat`

将一个或多个字符串与原字符串连接合并（从原字符串的后面拼接），形成一个新的字符串并返回；*`concat` 方法并不影响原字符串*。

- **语法**

```js
string.concat(value, ...)
```

- **参数**
  - 可以接受任意多参数，也就是说可以拼接任意多个字符串；
  - 若传入的参数不是字符串形式，则会自动转换为字符串；

> `concat` 可以用来拼接任意多个字符串，但实际上更多用"`+/+=`"。

- **实例**

```js
var str = "hi";
str.concat(); // 'hi'
str.concat(', '); // 'hi, '
str.concat(', ', 'i am'); // 'hi, i am'
str.concat(', ', 'i am', ' jack'); // 'hi, i am jack'
```

#### 4.2.2.`string.slice`

提取某个字符串的一部分，并返回一个新的字符串，*且不会改动原字符串*。

- **语法**

```js
string.slice(beginIndex[, endIndex])
```

- **参数**
  - `beginIndex`
    - 从该索引（以 0 为基数）处开始提取原字符串中的字符。
    - 如果值为负数，会被当做 `strLength + beginIndex` 看待，这里的 `strLength` 是字符串的长度（从另一个方面看，可以认为取倒数第 `-beginIndex` 位）。
  - `endIndex`
    - 可选。在该索引（以 0 为基数）处结束提取字符串（此位本身不复制）。
    - 如果省略该参数，`slice` 会一直提取到字符串末尾。
    - 如果该参数为负数，则被看作是 `strLength + endIndex`。

- **实例**

```js
var str = "hello world!";
str.slice(); // 'hello world!'
str.slice(6); // 'world!'
str.slice(-6); // 'world!'
str.slice(6, 8); // 'wo'
str.slice(6, -4); // 'wo'
str.slice(6, -10); // ''
```

#### 4.2.3.`string.substring`

返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集。

- **语法**

```js
string.substring(indexStart[, indexEnd])
```

- **参数**

- `indexStart`
  - 需要截取的第一个字符的索引，该索引位置的字符作为返回的字符串的首字母。
- `indexEnd`
  - 可选。一个 0 到字符串长度之间的整数，以该数字为索引的字符不包含在截取的字符串内。
  - 如果 `indexStart` 等于 `indexEnd`，`substring` 返回一个空字符串。
  - 如果省略 `indexEnd`，`substring` 提取字符一直到字符串末尾。
  - 如果任一参数小于 0 或为 `NaN`，则被当作 0。
  - 如果任一参数大于 `stringName.length`，则被当作 `stringName.length`。
  - 如果 `indexStart` 大于 `indexEnd`，则 `substring` 的执行效果等价于调换两个参数。

- **实例**

```js
var str = "hello world!";

str.substring(); // 'hello world!'
str.substring(6); // 'world!'
str.substring(6, 8); // 'wo'
str.substring(2, 2); // ''
str.substring(-2, 2); // 'he'
str.substring(6, 12); // 'world!'
str.substring(3, 0); // 'hel'
```

#### 4.2.4.`string.substr`

> 警告：尽管 `String.prototype.substr` 没有严格被废弃 (as in "removed from the Web standards"), 但它被认作是遗留的函数并且可以的话应该避免使用。它并非 JavaScript 核心语言的一部分，未来将可能会被移除掉。如果可以的话，使用 `substring` 替代它.

返回一个字符串中从指定位置开始到指定字符数的字符。

- **语法**

```js
string.substr(start[, length])
```

- **参数**
  - `start`
    - 开始提取字符的位置。如果忽略 `start` 或 `start` 为 0，则提取字符一直到字符串末尾。
    - 如果 `start` 为正值，且大于或等于字符串的长度，则 `substr` 返回一个空字符串。
    - 如果 `start` 为负值，则 `substr` 把它作为从字符串末尾开始的一个字符索引。
    - 如果 `start` 为负值且 `abs(start)` 大于字符串的长度，则 `substr` 使用 0 作为开始提取的索引。
  - `length`
    - 可选。提取的字符数。
    - 如果忽略 `length`，则 `substr` 提取字符，直到字符串末尾。
    - 如果 `length` 为 0 或负值，则 `substr` 返回一个空字符串。

- **实例**

```js
var str = "hello world!";
str.substr(); // 'hello world!'
str.substr(6); // 'world!'
str.substr(12); // ''
str.substr(-6); //  'world!'
str.substr(-13); // 'hello world!'
str.substr(6, 2); // 'wo'
str.substr(6, -4); // ''
```

### 4.3.字符串位置方法

> **区分大小写**

#### 4.3.1.`string.indexOf`

返回调用它的 `String` 对象中 *第一次出现* 的指定值的索引，从指定位置进行搜索。如果未找到该值，则返回 -1。

- **语法**

```js
string.indexOf(searchValue [, fromIndex])
```

- **参数**
  - `searchValue`
    - 要被查找的字符串值。如果没有提供确切地提供字符串，`searchValue` 会被 [强制设置为 `"undefined"`](https://tc39.es/ecma262/#sec-tostring)， 然后在当前字符串中查找这个值。
    - 如果忽略该参数，则返回 -1。
    - 若被查找的字符串 `searchValue` 是一个空字符串，将会产生“奇怪”的结果：
      - 如果 `fromIndex` 值为空，或者 `fromIndex` 值小于被查找的字符串的长度且大于 0，则返回值和 `fromIndex` 值一样；
      - 如果 `fromIndex` 值为负数，则返回 0；
      - 如果 `fromIndex` 值大于等于字符串的长度，将会直接返回字符串的长度；
  - `fromIndex` (可选)
    - 数字表示开始查找的位置。可以是任意整数，默认值为 0。如果 `fromIndex` 的值小于 0，或者大于等于 `str.length`，那么查找分别从 0 和 `str.length` 开始。

- **实例**

```js
var str = "hello world!";
str.indexOf(); // -1
str.indexOf(6); // -1
str.indexOf(undefined); // -1
str.indexOf(null); // -1
str.indexOf('l'); // 2
str.indexOf('l', -1); // 2
str.indexOf('l', 5); // 9
str.indexOf('l', 12); // -1

// 特别的
'undefined'.indexOf(); // 0
'undefined'.indexOf(undefined); // 0

// 更特别的
str.indexOf(''); // 0
str.indexOf('', 2); // 2
str.indexOf('', -3); // 0
str.indexOf('', 9); // 9
str.indexOf('', 13); // 12
str.indexOf('', undefined); // 0
```

#### 4.3.2.`string.lastIndexOf`

返回调用 `String` 对象的指定值 *最后一次出现* 的索引，在一个字符串中的指定位置 `fromIndex` 处从后向前搜索。如果没找到这个特定值则返回-1 。

- **语法**

```js
string.lastIndexOf(searchValue[, fromIndex])
```

- **参数**
  - `searchValue`
    - 一个字符串，表示被查找的值。
    - 如果 `searchValue` 是空字符串，则返回 `fromIndex`。
    - 如果忽略该参数，则返回 -1。
  - `fromIndex` (可选)
    - 待匹配字符串 `searchValue` 的开头一位字符从 `str` 的第 `fromIndex` 位开始向左回向查找。`fromIndex` 默认值是 `+Infinity`。
    - 如果 `fromIndex >= str.length`，则会搜索整个字符串。
    - 如果 `fromIndex < 0`，则等同于 `fromIndex === 0`。

- **实例**

```js
var str = "hello world!";

str.lastIndexOf(); // -1
str.lastIndexOf(6); // -1
str.lastIndexOf(undefined); // -1
str.lastIndexOf(null); // -1
str.lastIndexOf('l'); // 9
str.lastIndexOf('l', -1); // -1
str.lastIndexOf('l', 5); // 3
str.lastIndexOf('l', 12); // 9

// 特别的
'undefined'.lastIndexOf(); // 0
'undefined'.lastIndexOf(undefined); // 0

// 更特别的
str.lastIndexOf(''); // 12
str.lastIndexOf('', 2); // 2
str.lastIndexOf('', -3); // 0
str.lastIndexOf('', 9); // 9
str.lastIndexOf('', 14); // 12
str.lastIndexOf('', undefined); //12
```

> 注意：`str.indexOf` 和 `str.lastIndexOf` 对于 `searchValue` 为空字符串的时候，大体相同，唯有没有 `fromIndex` 时，`str.indexOf` 返回 0，而 `str.lastIndexOf` 返回 `str.length`，需留意：前者 `fromIndex` 默认值为 0，而后者 `fromIndex` 默认值为 `+Infinity`。

### 4.4.空格处理

#### 4.4.1.`string.trim`

从一个字符串的两端删除空白字符，并不影响原字符串本身。在这个上下文中的空白字符是所有的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR 等）。

- **语法**

```js
string.trim()
```

- **实例**

```js
'[' + ' hi'.trim() + ']'; // '[hi]'
'[' + ' hi '.trim() + ']'; // '[hi]'
'[' + 'hi '.trim() + ']'; // '[hi]'
'[' + '\nhi'.trim() + ']'; // '[hi]'
'[' + '\rhi'.trim() + ']'; // '[hi]'
'[' + '\t\v\rhi'.trim() + ']'; // '[hi]'
```

- **兼容**

```js
// 如果 trim 不存在，可以在所有代码前执行下面代码
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}
```

#### 4.4.2.`string.trimStart`

移除原字符串左端的连续空白符并返回一个新字符串，并不会直接修改原字符串本身。`trimLeft` 是此方法的别名。

> 为了与 `String.prototype.padStart` 等函数保持一致，标准方法名称为 `trimStart`。 但是，出于 Web 兼容性原因，`trimLeft` 仍然是 `trimStart` 的别名。在某些引擎中，这意味着：
> `String.prototype.trimLeft.name === "trimStart";`

- **语法**

```js
str.trimStart();
// or
str.trimLeft();
```

- **实例**

```js
'[' + ' hi'.trimStart() + ']'; // '[hi]'
'[' + ' hi '.trimStart() + ']'; // '[hi ]'
'[' + '\n\vhi'.trimStart() + ']'; // '[hi']
```

- **Polyfill**

```js
// https://github.com/FabioVergani/js-Polyfill_String-trimStart

(function (w) {
  var String = w.String, Proto = String.prototype;

  (function (o, p) {
    if (p in o ? o[p] ? false : true : true) {
      var r = /^\s+/;
      o[p] = o.trimLeft || function () {
        return this.replace(r, '')
      }
    }
  })(Proto, 'trimStart');

})(window);


/*
// ES6:
(w => {
  const String = w.String, Proto = String.prototype;

  ((o, p) => {
    if (p in o ? o[p] ? false : true : true) {
      const r = /^\s+/;
      o[p] = o.trimLeft || function () {
        return this.replace(r, '')
      }
    }
  })(Proto, 'trimStart');

})(window);
*/
```

#### 4.4.3.`string.trimEnd`

移除原字符串右端的连续空白符并返回一个新字符串，并不会直接修改原字符串本身。`trimRight` 是此方法的别名。

- **语法**

```js
str.trimEnd();
// or
str.trimRight();
```

- **实例**

```js
'[' + 'hi '.trimEnd() + ']'; // '[hi']
'[' + ' hi '.trimEnd() + ']'; // '[ hi]'
'[' + 'hi\n\v'.trimEnd() + ']'; // '[hi]'
```

### 4.5.字符串大小写转换方法

#### 4.5.1.`string.toUpperCase` 和 `string.toLowerCase`

将调用该方法的字符串转为大写或小写形式并返回（如果调用该方法的值不是字符串类型会被强制转换）。

> `toUpperCase` 和 `toLowerCase` 借鉴 `Java.lang.String` 中的同名方法。

- **语法**

```js
string.toUpperCase()

string.toLowerCase()
```

- **TypeError**

在 `null` 或 `undefined` 类型上调用：

```js
null.toUpperCase();
// TypeError: Cannot read properties of null(reading 'toUpperCase')
```

- **实例**

```js
'alphabet'.toUpperCase(); // 'ALPHABET'
'ALPHABET'.toLowerCase(); // 'alphabet'
```

#### 4.5.2.`string.toLocaleLowerCase` 和 `string.toLocaleUpperCase)`

根据任何指定区域语言环境设置的大小写映射，返回调用字符串被转换为大写或小写的格式。

> `toLocaleLowerCase` 和 `toLocaleUpperCase` 是针对特定地区的实现；

- **语法**

```js
string.toLocaleUpperCase()
string.toLocaleUpperCase(locale)
string.toLocaleUpperCase([locale, locale, ...])

string.toLocaleLowerCase()
string.toLocaleLowerCase(locale)
string.toLocaleLowerCase([locale, locale, ...])
```

- **参数**
  - `locale` (可选)
    - 参数 `locale` 指明要转换成大写或小写格式的特定语言区域。如果以一个数组 Array 形式给出多个 `locales`, 最合适的地区将被选出来应用。默认的 `locale` 是主机环境的当前区域(locale)设置。

- **Exceptions**
  - `RangeError`：
  - `RangeError`：

```js
'\u0130'.toLocaleLowerCase('en-US'); // i
'\u0130'.toLocaleLowerCase('en-USB');
// RangeError: Incorrect locale information provided

'\u0130'.toLocaleLowerCase([250]);
// TypeError: Language ID should be string or object
```

- **实例**

```js
'Gesäß'.toLocaleUpperCase(); // 'GESÄSS'
'i\u0307'.toLocaleUpperCase('lt-LT'); // 'I'

'\u0130'.toLocaleLowerCase('tr') === 'i';    // true
'\u0130'.toLocaleLowerCase('en-US') === 'i'; // false
```

### 4.6.字符串的模式匹配方法

#### 4.6.1.`string.match`

找到一个或多个正则表达式的匹配结果（在字符串上调用这个方法，本质上与调用 `RegExp` 的 `exec` 方法相同）。

- **语法**

```js
string.match(regexp)
```

- **参数**
  - `regexp`
    - 一个正则表达式对象。
    - 如果传入一个非正则表达式对象，则会隐式地使用 `new RegExp(obj)` 将其转换为一个 `RegExp`。
    - 如果你没有给出任何参数并直接使用 `match()` 方法 ，你将会得到一 个包含空字符串的 `Array ：[""]`。

- **返回值**
  - 如果使用 `g` 标志，则将返回与完整正则表达式匹配的所有结果，但不会返回捕获组；
  - 如果未使用 `g` 标志，则仅返回第一个完整匹配及其相关的捕获组（Array）。在这种情况下，返回的项目将具有如下所述的其他属性：
    - `groups`: 一个捕获组数组 或 `undefined`（如果没有定义命名捕获组）；
    - `index`: 匹配的结果的开始位置；
    - `input`: 搜索的字符串；
    - 如果未找到匹配则为 `null`。

- **实例**

如果参数没有 “`g`” 标志，`match` 将只进行一次匹配。

- 如果没有匹配结果，则返回 `null`；
- 若有匹配结果，第一项是匹配项，之后每一项保存正则表达式圆括号子表达式匹配的字符串（若有），倒数第二项是匹配项的首字符的索引；最后一项是原字符；

如果参数有 “`g`” 标志，则 `match` 进行一次全局搜索。全局匹配返回的数组和非全局匹配返回的数组内容很不一样。在全局匹配的情况下，数组元素包含 `string` 中每一个匹配子串，同时返回的数组没有 `index` 和 `input` 属性。

```js
var str = " hello world! ";

str.match();
// [ '', index: 0, input: ' hello world! ', groups: undefined ]

str.match('a'); // null

str.match('l');
// [ 'l', index: 3, input: ' hello world! ', groups: undefined ]

str.match(/l/g);
// [ 'l', 'l', 'l' ]

/l/g.exec(str);
// [ 'l', index: 3, input: ' hello world! ', groups: undefined ]
```

> 注意：对于全局匹配，`match` 不会提供有关捕获组的信息，也不会记录每个匹配的子串在 `string` 中的位置。若想在全局搜索时获取这些信息，可以使用 `RegExp.exec`。

#### 4.6.2.`string.search`

执行正则表达式和 `String` 对象之间的一个搜索匹配。

> 当你想要知道字符串中是否存在某个模式（pattern）时可使用 `search`，类似于正则表达式的 `test` 方法。当要了解更多匹配信息时，可使用 `match`（但会更慢一些），该方法类似于正则表达式的 `exec` 方法。

- **语法**

```js
string.search(regexp)
```

- **参数**
  - `regexp`
    - 一个正则表达式（regular expression）对象。如果传入一个非正则表达式对象 `regexp`，则会使用 `new RegExp(regexp)` 隐式地将其转换为正则表达式对象。

- **返回值**
  - 如果匹配成功，则返回正则表达式在字符串中首次匹配项的索引;
  - 否则，返回 -1。

- **实例**

`search` 不执行全局匹配，会忽略 “`g`” 标志。也会忽略 `regexp` 的 `lastIndex` 属性，总是从开头位置开始搜索，这意味着它总是返回第一个匹配子串的位置。

```js
var str = " hello world! ";

str.search(); // 0
str.search('a'); // -1
str.search('l'); // 3
str.search(/l/g); // 3
```

### 4.7.字符串的替换

#### 4.7.1.`string.replace`

返回一个由替换值（replacement）替换部分或所有的模式（pattern）匹配项后的新字符串。

- **语法**

```js
string.replace(regexp|substr, newSubStr|function)
```

- **参数**
  - `regexp` (pattern)
    - 一个 `RegExp` 对象或者其字面量。该正则所匹配的内容会被第二个参数的返回值替换掉。
  - `substr` (pattern)
    - 一个将被 `newSubStr` 替换的字符串。其被视为一整个字符串，而不是一个正则表达式。仅第一个匹配项会被替换。
  - `newSubStr` (replacement)
    - 用于替换掉第一个参数在原字符串中的匹配部分的字符串。该字符串中可以内插一些特殊的变量名。
  - `function` (replacement)
    - 一个用来创建新子字符串的函数，该函数的返回值将替换掉第一个参数匹配到的结果。

- **返回值**
  - 一个部分或全部匹配由替代模式所取代的新的字符串。

- **使用字符串作为参数**

替换字符串可以插入下面的特殊变量名：

| 变量名          | 代表的值                                                                                                                                                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$$`            | 插入一个 "`$`"                                                                                                                                                                                                                |
| `$&`            | 插入匹配的子串                                                                                                                                                                                                                |
| <code>$`</code> | 插入当前匹配的子串左边的内容                                                                                                                                                                                                  |
| `$'`            | 插入当前匹配的子串右边的内容                                                                                                                                                                                                  |
| `$n`            | 假如第一个参数是 RegExp 对象，并且 n 是个小于 100 的非负整数，那么插入第 n 个括号匹配的字符串。提示：索引是从 1 开始。如果不存在第 n 个分组，那么将会把匹配到到内容替换为字面量。比如不存在第3个分组，就会用“$3”替换匹配到的内容 |
| `$<Name>`       | 这里 Name 是一个分组名称。如果在正则表达式中并不存在分组（或者没有匹配），这个变量将被处理为空字符串。只有在支持命名分组捕获的浏览器中才能使用。                                                                              |

```js
var str = "hello world";

//
str.replace(/(l)/, $&); // error
str.replace(/(l)/, "$&"); // hello world
str.replace(/(l)/, "$`"); // hehelo world
str.replace(/(l)/, "$'"); // helo worldlo world
str.replace(/(l)/, "$$"); // he$lo world

str.replace(/(l)/, "$1"); // hello world
str.replace(/(l)/, "$2"); // he$2lo world

// 命名分组捕获
str.replace(/(?<subStr>l)/, "$<subStr>"); // hello world
```

- **指定一个函数作为参数**

可以指定一个函数作为第二个参数。在这种情况下，当匹配执行后，该函数就会执行。函数的返回值作为替换字符串。 (注意：上面提到的特殊替换参数在这里不能被使用。) 另外要注意的是，如果第一个参数是正则表达式，并且其为全局匹配模式，那么这个方法将被多次调用，每次匹配都会被调用。

下面是该函数的参数：

| 变量名              | 代表的值                                                                                                                                                                                                   |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `match`             | 匹配的子串。（对应于上述的`$&`。）                                                                                                                                                                         |
| `p1`,`p2`, ...      | 假如 `replace` 方法的第一个参数是一个 RegExp 对象，则代表第 n 个括号匹配的字符串。（对应于上述的 `$1`，`$2` 等。）例如，如果是用 `/(\a+)(\b+)/` 这个来匹配，`p1` 就是匹配的 `\a+`，`p2` 就是匹配的 `\b+`。 |
| `offset`            | 匹配到的子字符串在原字符串中的偏移量。（比如，如果原字符串是 `'abcd'`，匹配到的子字符串是 `'bc'`，那么这个参数将会是 1）                                                                                   |
| `string`            | 被匹配的原字符串                                                                                                                                                                                           |
| `NamedCaptureGroup` | 命名捕获组匹配的对象                                                                                                                                                                                       |

(精确的参数个数依赖于 `replace` 的第一个参数是否是一个正则表达式（RegExp）对象，以及这个正则表达式中指定了多少个括号子串，如果这个正则表达式里使用了命名捕获， 还会添加一个命名捕获的对象)

并且还要给这个函数传最少三个参数：

- 1). 当正则没有分组的时候，传进去的第一个实参是正则捕获到的内容，第二个参数是捕获到的内容在原字符串中的索引位置，第三个参数是原字符串（输入字符串）；
>
- 2). 当正则有分组的时候，第一个参数总是正则查找到的内容，后面依次是各个子正则查找到的内容；
>
- 3). 传完查找到的内容之后，再把总正则查找到的内容在原字符串中的索引传进（就是 `arguments[0]` 在 str 中的索引位置）。最后把输入字符串（就是原字符串）传进去；

```js
var str = "bbs456qwe789";
var reg = /(\w{2})\d+/g;
var s = str.replace(reg, function($1) {
  console.log(arguments);
  //Arguments(4) ["bs456", "bs", 1, "bbs456qwe789"]
  //Arguments(4) ["we789", "we", 7, "bbs456qwe789"]

  //$1 当前匹配的结果
  console.log($1); // bs456   we789

  //RegExp.$1 的值是最后一次匹配的结果
  console.log(RegExp.$1); // we  we
  return "[" + arguments[1] + "]";
});
console.log(s); //b[bs]q[we]
```

### 4.8.字符串变数组

#### 4.8.1.`string.split`

- **语法**

- **参数**

- **返回值**

基于指定的分隔符将一个字符串分割成多个子字符串，并将结果放到一个数组中

- 返回值：返回一个字符串组成的数组（不包含分割文本，有捕获组的正则表达式这个情况）
- 参数类型：字符串/`RegExp` 对象，数值；
- 参数：
  - a. 不传参数，则默认将变成一个字符串数组；
  - b. 若分隔符不匹配，也是整体变成字符串；
  - c. 若分隔符出现在开头或结尾，则返回的数组的第一项或最后一项是空字符
  - d. 若分隔符是 `""` 或者匹配空字符的正则，会将字符串的每一项拆分成数组的一项，返回的数组具有与 `string` 一样长度的（只是在没有指定更小 `limit` 的情况下，注意这是一个特例，因为第一个字符之前后最后一个字符之后的空字符不匹配）
  - e. 可以接受可选的第二个参数，用于指定返回数组的大小，确保返回的数组不会超过既定大小；没有指定，则将切分整个字符串；
  - f. 如果第二个参数是包含圆括号的正则表达式，则匹配这些圆括号表达式的子串将包含在返回的数组中。

```js
var s = "s1,s2,s3";
s.split(); //["s1,s2,s3"]
s.split(" "); //["s1,s2,s3"]
s.split(","); //["s1", "s2", "s3"]
s.split(/s/); //["", "1,", "2,", "3"]
s.split(""); //["s", "1", ",", "s", "2", ",", "s", "3"]

s.split("", 2); //["s", "1"]
```

> 对 `split` 中正则的支持因浏览器而异。尽管对于简单模式没有声明差别，但对于未发现匹配项以及带有捕获组的模式，匹配的行为就大相径庭了。差别如下：
> IE8 及之前版本会忽略捕获组。ECMCA-262 规定应该把捕获组的内容拼接到结果数组中。IE 能正确地在结果中包含捕获组；
> Firefox3.6 及之前版本在捕获组为捕获到匹配项时，会在结果中包含空字符；ECMCA-262 规定没有匹配项的捕获组在结果数组中应该用 `undefined` 表示；

### 4.9.字符串比较

#### 4.9.1.`string.localeCompare`

- **语法**

- **参数**

- **返回值**

根据本地默认的排序比较两个字符串（逐个比较），

- 返回值：
  - 如果 `target` 中的字符排在 `string` 字符串之前，则返回一个负数（大多数情况下是 -1，具体值看具体情况）；
  - 如果等于，返回 0；
  - 如果排在后面，则返回正数（大多数情况下是 1，具体值看具体情况）；
- 参数类型：字符串
- 参数：一个

方法的最大特点，就是会考虑自然语言的顺序。举例来说，正常情况下，大写的英文字母小于小写字母。因为 JavaScript 采用的是 `Unicode` 码点比较，B 的码点是 66，而 a 的码点是 9。但是，`localeCompare` 方法会考虑自然语言的排序情况，将 B 排在 a 的前面。

`localeCompare` 还可以有第二个参数，指定所使用的语言（默认是英语），然后根据该语言的规则进行比较。

---

参考：

1.[JS 正则中的命名捕获分组](https://www.cnblogs.com/ziyunfei/p/6761413.html)
