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
