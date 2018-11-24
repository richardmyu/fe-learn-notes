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

#### 8.14.正则中的运算符优先级

相同优先级的从左到右进行运算，不同优先级的运算先高后低。

|运算符|描述|
|--|--|
|`\`|转义符|
|`(),(?:),(?=),[]`|圆括号和方括号|
|`*,+,?,{n},{n,},{n,m}`|限定符|
|`^,$,\任何元字符、任何字符`|定位点和序列（即：位置和顺序）|
|`|`|替换，“或”操作|

> 字符具有高于替换运算符的优先级，使得'm|food' 匹配 'm' 或 'food'。若要匹配 'mood' 或 'food'，请使用括号创建子表达式，从而产生 '(m|f)ood'。

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
