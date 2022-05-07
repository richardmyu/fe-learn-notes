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
    从该索引（以 0 为基数）处开始提取原字符串中的字符。如果值为负数，会被当做 `strLength + beginIndex` 看待，这里的 `strLength` 是字符串的长度（从另一个方面看，可以认为取倒数第 `-beginIndex` 位）。
  - `endIndex`
    可选。在该索引（以 0 为基数）处结束提取字符串（此位本身不复制）。如果省略该参数，`slice` 会一直提取到字符串末尾。如果该参数为负数，则被看作是 `strLength + endIndex`。

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

- **语法**

- **参数**

- **返回值**


在字符串中从前往后搜索，判断某个字符在不在这个字符串中（只在乎第一次出现），找不到子字符串则返回 -1；

- 返回值：指定字符的索引或者 -1；
- 参数类型：字符（非字符类型被转化为字符）/数值
- 参数：
  - a. 不传参数，默认为找不到子字符串，返回 -1；
  - b. 第一个参数指定搜索的字符（包括空格和符号）；
  - c. 第二个参数，指定开始搜索的位置，默认为 0；
  - d. 若第二个参数小于 0，视为输入 0；若大于等于字符长度，视为输入 `str.length`；

#### 4.3.2.`string.lastIndexOf`

- **语法**

- **参数**

- **返回值**


在字符串中从后往前搜索，判断某个字符在不在这个字符串中（只在乎第一次匹配），找不到子字符串则返回 -1；

- 返回值：指定字符的索引或者 -1；
- 参数类型：字符（非字符类型被转化为字符）/数值
- 参数：
  - a. 不传参数，默认为找不到子字符串，返回 -1；
  - b. 第一个参数指定搜索的字符（包括空格和符号）；
  - c. 第二个参数，指定开始搜索的位置，默认为 `str.length`；
  - d. 若第二个参数小于 0，视为输入 0；若大于等于字符长度，视为输入 `str.length`；

> 对于 `indexOf` 与 `lastIndexOf`，若是查找空字符且指定了第二个参数时，则其返回值为第二个参数的值（如果没有就是 0），注意当第二个参数的值大于字符长度时，返回值为字符长度，若是负数则返回 0。

### 4.4.空格处理

#### 4.4.1.`string.trim`

- **语法**

- **参数**

- **返回值**

创建一个字符串的副本；删除前置及后缀的所有空格，然后返回结果；不修改原字符串；

- 返回值：新字符串
- 没有参数，传参不报错，但是无效

> 该方法去除的不仅是空格，还包括制表符（`\t`、`\v`）、换行符（`\n`）和回车符（`\r`）。

### 4.5.字符串大小写转换方法

1).`string.toUpperCase`
2).`string.toLowerCase`
3).`string.toLocaleLowerCase`
4).`string.toLocaleUpperCase)`

> `toUpperCase` 和 `toLowerCase` 借鉴 `Java.lang.String` 中的同名方法；
> `toLocaleLowerCase` 和 `toLocaleUpperCase` 是针对特定地区的实现；

- 返回值：新字符串
- 没有参数，传参不报错，但是无效

> 对于 `toLocaleLowerCase` 和 `toLocaleUpperCase` 传入参数为 `null` 或 `undefined` 会报错：`Uncaught TypeError: Cannot convert undefined or null to object at String.toLocaleLowerCase (native)`

### 4.6.字符串的模式匹配方法

#### 4.6.1.`string.match`

- **语法**

- **参数**

- **返回值**

找到一个或多个正则表达式的匹配结果（在字符串上调用这个方法，本质上与调用 `RegExp` 的 `exec` 方法相同）。

- 返回值：一个数组或 `null`；
- 参数类型：正则表达式/`RegExp` 对象
- 参数：只接受一个参数
  - 不传参数，匹配项返回空字符

```js
var s = "green yellow";

s.match();
//["", index: 0, input: "green yellow"]

s.match(/(en)/);
//["e", index: 2, input: "green yellow"]

/(e)/g.exec(s);
//["e", "e", index: 2, input: "green yellow"]
```

如果参数没有 “`g`” 标志，`match` 将只进行一次匹配。

如果没有匹配结果，则返回 `null`；若有匹配结果，第一项是匹配项，之后每一项保存正则表达式圆括号子表达式匹配的字符串（若有），倒数第二项是匹配项的首字符的索引；最后一项是原字符；

如果参数有 “`g`” 标志，则 `match` 进行一次全局搜索。全局匹配返回的数组和非全局匹配返回的数组内容很不一样。在全局匹配的情况下，数组元素包含 `string` 中每一个匹配子串，同时返回的数组没有 `index` 和 `input` 属性。

> 注意：对于全局匹配，`match` 不会提供有关捕获组的信息，也不会记录每个匹配的子串在 `string` 中的位置。若想在全局搜索时获取这些信息，可以使用 `RegExp.exec`。

#### 4.6.2.`string.search`

- **语法**

- **参数**

- **返回值**

根据正则表达式在 string 中寻找匹配的字符串；

- 返回值：返回字符串中第一个匹配项的索引；如果找不到匹配项，则返回 -1；
- 参数类型：正则表达式/`RegExp` 对象
- 参数：只接受一个参数

`search` 不执行全局匹配，会忽略 “`g`” 标志。也会忽略 `regexp` 的 `lastIndex` 属性，总是从开头位置开始搜索，这意味着它总是返回第一个匹配子串的位置。

### 4.7.字符串的替换

#### 4.7.1.`string.replace`

- **语法**

- **参数**

- **返回值**

替换给定正则表达式匹配的（一个或多个）子表达式；

- 返回值：新字符串，其中匹配的项（正则的最大匹配项）已替换为 replacement（可以组合）
- 参数类型：`RegExp` 对象/字符串，字符/function
- 参数：
  - a. 不传参数，则返回原字符串
  - b. 第一个参数可以是一个 `RegExp` 对象或者一个字符串（这个字符串不会被转换为正则表达式）；
  - c. 只传一个参数：若能匹配，则将匹配项替换成 `undefined`；若不能匹配，则返回原字符串
  - d. 第二个参数是替换文本，可以是一个字符串或者一个函数，用于在调用时生成对应的替换文本（如果第一个参数是字符串，只替换第一个子字符串，要想替换所有子字符串，提供一个正则表达式和全局标志）。
  - e. 如果第二个参数是字符串，那么还可以使用一些特殊的字符序列，将正则表达式操作得到的值插入到结果字符串中。

> 更具体的用法见 `RegExp` 的相关章节。

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
