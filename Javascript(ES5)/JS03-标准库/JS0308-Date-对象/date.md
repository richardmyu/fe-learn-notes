# Date 对象

ECMAScript 中的 `Date` 类型是在早期 Java 中的 `java.util.Date` 类基础上构建的。为此，`Date` 类型使用自 UTC（_Coordinated Universal Time_，国际协调时间）1970 年 1 月 1 日午夜（零时）开始经过的毫秒数来保存日期。在使用这种数据储存格式的条件下，`Date` 类型保存的日期能精确到 1970 年 1 月 1 日之前或之后的 100 000 000 年。

- **UTC**

协调世界时（英语：Coordinated Universal Time，法语：Temps Universel Coordonné，简称 UTC）是最主要的世界时间标准，其以原子时秒长为基础，在时刻上尽量接近于格林尼治标准时间。

UTC 基于国际原子时，并通过不规则的加入闰秒来抵消地球自转变慢的影响。闰秒在必要的时候会被插入到 UTC 中，以保证协调世界时（UTC）与世界时（UT1）相差不超过 0.9 秒。

- **GMT**

格林威治平时（英语：Greenwich Mean Time，GMT）是指位于英国伦敦郊区的皇家格林威治天文台当地的平太阳时，因为本初子午线被定义为通过那里的经线。

由于地球每天的自转是有些不规则的，而且正在缓慢减速，因此格林威治平时基于天文观测本身的缺陷，已经被原子钟报时的协调世界时（UTC）所取代。

- **Unix 时间戳**

Unix 时间戳(Unix timestamp)，或称 Unix 时间(Unix time)、POSIX 时间(POSIX time)，是一种时间表示方式，定义为从格林威治时间 1970 年 01 月 01 日 00 时 00 分 00 秒起至现在的总秒数，不考虑闰秒。Unix 时间戳不仅被使用在 Unix 系统、类 Unix 系统中，也在许多其他操作系统中被广泛采用。

目前相当一部分操作系统使用 32 位二进制数字表示时间。此类系统的 Unix 时间戳最多可以使用到格林威治时间 2038 年 01 月 19 日 03 时 14 分 07 秒（二进制：01111111 11111111 11111111 11111111）。其后一秒，二进制数字会变为 10000000 00000000 00000000 00000000，发生溢出错误，造成系统将时间误解为 1901 年 12 月 13 日 20 时 45 分 52 秒。这很可能会引起软件故障，甚至是系统瘫痪。

目前的解決方案是把系统由 32 位元转为 64 位元系统。使用 64 位二进制数字表示时间的系统（最多可以使用到格林威治时间 292,277,026,596 年 12 月 04 日 15 时 30 分 08 秒）则基本不会遇到这类溢出问题。

- **CST**

中国标准时，是中国大陆的标准时间，比世界协调时快八小时（即 UTC+8），与香港、澳门、台北、吉隆坡、新加坡等地的标准时间相同。

## 1.普通函数的用法

`Date` 对象可以作为普通函数直接调用，返回一个代表当前时间的字符串。

```javascript
Date();
// Sat May 26 2018 12:00:51 GMT+0800 (中国标准时间)
```

注意，即使带有参数，`Date` 作为普通函数使用时，返回的还是当前时间。

```javascript
Date(2000, 1, 1);
// Sat May 26 2018 12:00:51 GMT+0800 (中国标准时间)
```

## 2.构造函数的用法

在调用 `Date` 构造函数时，不传递参数，新创建的对象自动获得当前日期和时间；若想根据特定的时间或日期创建日期对象，必须传入表示该日期的毫秒数（即从 1970 年 1 月 1 日午夜起至该日期经过的毫秒数）。

```javascript
var now = new Date();
console.log(now);
//Sat Mar 03 2018 22:28:29 GMT+0800 (中国标准时间)
```

`Date` 实例有一个独特的地方。其他对象求值的时候，都是默认调用 `.valueOf()` 方法，但是 `Date` 实例求值的时候，默认调用的是 `toString()` 方法。这导致对 `Date` 实例求值，返回的是一个字符串，代表该实例对应的时间。

关于 Date 构造函数的参数，有几点说明。

第一点，参数可以是负整数，代表 1970 年元旦之前的时间。
第二点，只要是能被 `Date.parse()` 方法解析的字符串，都可以当作参数。

```javascript
new Date("2013-2-15");
new Date("2013/2/15");
new Date("02/15/2013");
new Date("2013-FEB-15");
new Date("FEB, 15, 2013");
new Date("FEB 15, 2013");
new Date("Feberuary, 15, 2013");
new Date("Feberuary 15, 2013");
new Date("15 Feb 2013");
new Date("15, Feberuary, 2013");
// Fri Feb 15 2013 00:00:00 GMT+0800 (CST)
```

第三，参数为年、月、日等多个整数时，年和月是不能省略的，其他参数都可以省略的。也就是说，这时至少需要两个参数，因为如果只使用“年”这一个参数，Date 会将其解释为毫秒数。

最后，各个参数的取值范围如下。

---

- 年：使用四位数年份，比如 2000。如果写成两位数或个位数，则加上 1900，即 10 代表 1910 年。如果是负数，表示公元前。
- 月：0 表示一月，依次类推，11 表示 12 月。
- 日：1 到 31。
- 小时：0 到 23。
- 分钟：0 到 59。
- 秒：0 到 59
- 毫秒：0 到 999。

---

> 注意，月份从 0 开始计算，但是，天数从 1 开始计算。另外，除了日期的默认值为 1，小时、分钟、秒钟和毫秒的默认值都是 0。

这些参数如果超出了正常范围，会被自动折算。比如，如果月设为 15，就折算为下一年的 4 月。

> 参数还可以使用负数，表示过去的时间。

## 3.日期的运算

类型自动转换时，`Date` 实例如果转为数值，则等于对应的毫秒数；如果转为字符串，则等于对应的日期字符串。所以，两个日期实例对象进行减法运算时，返回的是它们间隔的毫秒数；进行加法运算时，返回的是两个字符串连接而成的新字符串。

```javascript
var d1 = new Date(2000, 2, 1);
var d2 = new Date(2000, 3, 1);

d2 - d1;
// 2678400000
d2 + d1;
// "Sat Apr 01 2000 00:00:00 GMT+0800 (CST)Wed Mar 01 2000 00:00:00 GMT+0800 (CST)"
```

## 4.静态方法

### 4.1.`Date.now`

`Date.now` 方法返回当前时间距离时间零点（1970 年 1 月 1 日 00:00:00 UTC）的毫秒数，相当于 Unix 时间戳乘以 1000。

> 对于不支持 `Date.now()` 方法的浏览器，可以使用 `+` 操作符获取 `Date` 对象的时间戳，也可以达到同样的目的。

```javascript
var start = +new Date();
var startO = Date.now();
start; //1527307494273
startO; //1527307494273
```

### 4.2.`Date.parse`

`Date.parse` 方法用来解析日期字符串，返回该时间距离时间零点（1970 年 1 月 1 日 00:00:00）的毫秒数。

日期字符串应该符合 RFC 2822 和 ISO 8061 这两个标准，即 `YYYY-MM-DDTHH:mm:ss.sssZ` 格式，其中最后的 `Z` 表示时区。但是，其他格式也可以被解析，请看下面的例子。

```javascript
Date.parse("Aug 9, 1995");
Date.parse("January 26, 2011 13:51:50");
Date.parse("Mon, 25 Dec 1995 13:30:00 GMT");
Date.parse("Mon, 25 Dec 1995 13:30:00 +0430");
Date.parse("2011-10-10");
Date.parse("2011-10-10T14:48:00");
```

如果解析失败，返回 `NaN`。

> 注意日期对象及其在不同浏览器中的实现不同。其中一种倾向是将超出范围的值替换成当前值，以便输出。例如，在解析“January 32,2007”时，有的的浏览器会将其解释为“February 1,2007”。而 Opera 则倾向于插入当前月份的当前日期，返回“January 当前日期,2007”。目前，对于超出范围的均返回 `Invalid Date`（2018/3/3）。

### 4.3.`Date.UTC`

`Date.UTC` 方法接受年、月、日等变量作为参数，返回该时间距离时间零点（1970 年 1 月 1 日 00:00:00 UTC）的毫秒数。

```javascript
// 格式
Date.UTC(year, month[, date[, hrs[, min[, sec[, ms]]]]])

// 用法
Date.UTC(2011, 0, 1, 2, 3, 4, 567)
// 1293847384567
```

该方法的参数用法与 `Date` 构造函数完全一致，比如月从 0 开始计算，日期从 1 开始计算。区别在于 `Date.UTC` 方法的参数，会被解释为 UTC 时间（世界标准时间），`Date` 构造函数的参数会被解释为当前时区的时间。

> `Date` 构造函数也可以直接接受 `Date.UTC()` 的参数，但是其日期和时间都是基于本地时区而非 GMT 来创建。因此，若第一个参数是数值，`Date` 构造函数就会假设该值是日期中的年份，余下参数以此类推。

## 5.实例方法

与其他引用类型一样，`Date` 类型也重写了 `toLocaleString()`,`toString()` 和 `valueOf()` 方法。`Date` 类型的 `toLocaleString()` 会按照与浏览器设置的地区相适应的格式返回日期和时间。这大致意味着时间格式中包含着 AM 或 PM，但不会包含时区信息。而 `toString()` 方法通常返回带有时区信息的日期和时间，其中时间一般以军用时间（0-23）表示。

```javascript
//chrome:
var day = new Date();

day.toLocaleString();
//2018/5/26 下午2:20:03

day.toString();
//Sat May 26 2018 14:20:03 GMT+0800 (中国标准时间)

day.valueOf();
//1527315603560
```

> 这两中方法在不同的浏览器上的格式可谓大相径庭。实际上，这两者的差别仅在调试代码时比较有用。

至于 `Date` 类型的 `valueOf()` 方法，不返回字符串，而是返回日期的毫秒数。因此，可以比较方便的使用比较操作符来比较日期。

```javascript
var da1 = new Date(2007, 0, 1);
var da2 = new Date(2007, 1, 1);
da1 < da2; //true
```

## 6.日期格式化方法

### 6.1 `toDateString()`

以特定于实现的格式显示周几，月，日，年

### 6.2 `toTimeString()`

以特定于实现的格式显示时，分，秒，时区

### 6.3 `toLocaleDateString()`

以特定于地区的格式显示周几，月，日，年

### 6.4 `toLocaleTimeString()`

以特定于地区的格式显示时，分，秒

### 6.5 `toUTCString()`

以特定于实现的格式显示完整的 UTC 日期

> 以上方法因浏览器而异。

```javascript
var yk = new Date();
yk.toDateString(); //Sat Mar 03 2018
yk.toTimeString(); //23:53:53 GMT+0800 (中国标准时间)

yk.toLocaleDateString(); //2018/3/3
yk.toLocaleTimeString(); //下午11:53:53

yk.toUTCString(); //Sat, 03 Mar 2018 15:53:53 GMT
```

## 7.日期/时间组件方法

### 7.1.获取当前电脑上的时间

如果传递参数，会将参数转换为本地时间

```javascript
var time = new Date();
time;
//Wed Aug 30 2017 11:42:27 GMT+0800 (中国标准时间)

let time = new Date().toLocaleString();
time; //2017/11/8 上午11:17:41
```

> 获取的是当前电脑上的时间，不能作为标准；一般以获取服务器的时间作为标准时间，请求头时间；

### 7.2.获取服务器的时间

```javascript
//获取服务器时间,只需获取一次

let serverTime = null;
let timer = null;

let getServerTime = () => {
  if (serverTime == null) {
    let xhr = new XMLHttpRequest();
    xhr.open("get", "/");
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 2 && xhr.status == 200) {
        serverTime = xhr.getResponseHeader("date");
        serverTime = new Date(serverTime);
      }
    };
    xhr.send(null);
    return;
  }
  serverTime = new Date(serverTime.getTime() + 1000);
  console.log(serverTime.toTimeString().slice(0, 9));
};

// 用 setTimeout 代替 setInterval
function fn() {
  window.clearTimeout(timer);
  timer = window.setTimeout(fn, 1000);
  return getServerTime();
}

timer = window.setTimeout(fn, 1000);
```

### 7.3.获取/设置四位的年

```js
var year = time.getFullYear(); //2018
var year = time.setFullYear(2007); //1172938101286
```

### 7.4.获取月份 (0-11)

```js
var month = time.getMonth(); //2

var month = time.setMonth(x / xx); //1520093403362
```

### 7.5.获取星期 0-6（星期日-星期六）

`var week = time.getDay();//0`

### 7.6.获取日

```js
var day = time.getDate(); //4

var day = time.setDate(6); //1520266650087
```

### 7.7.获取小时

```js
var hours = time.getHours(); //0

var hours = time.setHours(16); //1520151503999
```

### 7.8.获取分

```js
var minute = time.getMinutes(); //19

var minute = time.setMinutes(23); //1520094216640
```

### 7.9.获取秒

```js
var second = time.getSeconds(); //51

var second = time.setSeconds(); //1520094033978
```

### 7.10.获取毫秒

```js
var millisecond = time.getMilliseconds(); //687

var millisecond = time.setMilliseconds(); //1520094130066
```

### 7.11.`getTime()`

将时间变成毫秒，与 `valueOf()` 方法的返回值相同

```javascript
let curTime = new Date();

curTime;
//Sun Nov 05 2017 11:24:52 GMT+0800 (中国标准时间)

curTime.getTime();
//1509852292756

new Date(curTime.getTime());
//Sun Nov 05 2017 11:24:52 GMT+0800 (中国标准时间)
```

## 8.定时器小问题

> 清除定时器，清除的是指定序号的定时器；清除定时器的原理是阻止定时器中的函数执行，而无法清除计时器本身；

### 8.1 `window.setInterval()`

- 有返回值，返回值是数字，代表的第 n 个定时器；
- 第一个参数是要执行的函数；
- 第二个参数是执行的周期，以毫秒计；

### 8.2 `window.clearInterval()`

- 参数是定时器名
- 不传递参数的时候，默认清除所有定时器；

### 8.3 `window.setTimeout()` & `window.clearTimeout()`

用 `setTimeout()` 实现 `setInterval()` 效果

```javascript
var timer = null;

function fn() {
  window.clearTimeout(timer);
  timer = window.setTimeout(fn, 1000);
  /* ... */
}

timer = window.setTimeout(fn, 1000);
```
