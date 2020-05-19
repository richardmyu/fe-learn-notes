# basic

### 1.['1', '2', '3'].map(parseInt) what & why ?

1.map 给 parseInt 传入的参数：item,index

2.`parseInt(string, radix)`将一个字符串 string 转换为 radix 进制的整数， radix 为介于 2-36 之间的数。

> 如果 string 不为字符串类型, 则先将 string 转化为字符串类型。string 会忽略前后的空白。依次解析字符, 如果字符不是指定基数中的字符( 例如: 2 进制中的 3、 10 进制中的 'f' )则停止解析( 首字符为'+'或'-'时除外 ), 返回已经解析好的整数；如果无法解析为整数, 则返回 NaN。

```js
let unary = fn => val => fn(val)
let parse = unary(parseInt)
console.log(['1.1', '2', '0.3'].map(parse))
```

> 出处：[第 2 题：['1', '2', '3'].map(parseInt) what & why ? #4](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/4)
>
### 2.将数组扁平化并去除其中重复数据，最终得到一个升序且不重复的数组

```js
// es6+
Array.from(new Set(arr.flat(Infinity))).sort((a, b) => { return a - b })

// es5
var ary = arr.toString().split(",").sort((a, b) => { return a - b });
ary.map((item, index) => {
  if (ary.indexOf(item) === ary.lastIndexOf(item)) {
    return Number(item)
  } else {
    ary.splice(index, 1)
    return Number(item)
  }
}).filter(item => item)
```

> [第 11 题：将数组扁平化并去除其中重复数据，最终得到一个升序且不重复的数组 #8]([第 11 题：将数组扁平化并去除其中重复数据，最终得到一个升序且不重复的数组 #8](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/8))

### 3.`Object.prototype.toString.call()` 、 `instanceof` 以及 `Array.isArray()`

**1. Object.prototype.toString.call()**

每一个继承 Object 的对象都有 `toString` 方法，如果 toString 方法没有重写的话，会返回 `[Object type]`，其中 type 为对象的类型。但当除了 Object 类型的对象外，其他类型直接使用 `toString` 方法时，会直接返回都是内容的字符串，所以我们需要使用 `call` 或者 `apply` 方法来改变 `toString` 方法的执行上下文。

```js
const an = ['Hello','An'];
an.toString(); // "Hello,An"
Object.prototype.toString.call(an); // "[object Array]"
```

这种方法对于所有基本的数据类型都能进行判断，即使是 `null` 和 `undefined` 。

```js
Object.prototype.toString.call('An') // "[object String]"
Object.prototype.toString.call(1) // "[object Number]"
Object.prototype.toString.call(Symbol(1)) // "[object Symbol]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(function(){}) // "[object Function]"
Object.prototype.toString.call({name: 'An'}) // "[object Object]"

```

`Object.prototype.toString.call()` 常用于判断浏览器内置对象时。

> [谈谈 Object.prototype.toString](https://juejin.im/post/591647550ce4630069df1c4a)

**2. instanceof**

`instanceof` 的内部机制：是通过判断对象的原型链中是不是能找到类型的 `prototype`。

使用 `instanceof` 判断一个对象是否为数组，`instanceof` 会判断这个对象的原型链上是否会找到对应的 Array 的原型，找到返回 true，否则返回 false。

```js
[]  instanceof Array; // true
```

但 instanceof 只能用来判断对象类型，原始类型不可以。并且所有对象类型 `instanceof Object` 都是 true。

```js
[]  instanceof Object; // true
```

**3. Array.isArray()**

功能：用来判断对象是否为数组

- `instanceof` 与 `isArray`

当检测 Array 实例时，`Array.isArray` 优于 `instanceof` ，因为 `Array.isArray` 可以检测出 `iframes`：

```js
var iframe = document.createElement('iframe');
document.body.appendChild(iframe);
xArray = window.frames[window.frames.length-1].Array;
var arr = new xArray(1,2,3); // [1,2,3]

// Correctly checking for Array
Array.isArray(arr);  // true
Object.prototype.toString.call(arr); // true
// Considered harmful, because doesn't work though iframes
arr instanceof Array; // false
```

- `Array.isArray()` 与 `Object.prototype.toString.call()`

`Array.isArray()` 是ES5新增的方法，当不存在 `Array.isArray()` ，可以用 `Object.prototype.toString.call()` 实现。

```js
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
```

> [第 21 题：有以下 3 个判断数组的方法，请分别介绍它们之间的区别和优劣Object.prototype.toString.call() 、 instanceof 以及 Array.isArray() #23](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/23)

### 4.关于 const 和 let 声明的变量不在 window 上

在 ES5 中，顶层对象的属性和全局变量是等价的，`var` 命令和 `function` 命令声明的全局变量，自然也是顶层对象。

```js
var a = 12;
function f(){};

console.log(window.a); // 12
console.log(window.f); // f(){}
```

但 ES6 规定，全局对象的属性和全局变量脱钩，但是为了保持兼容性，旧的不变，所以 `var` 命令和 `function` 命令声明的全局变量，依旧是顶层对象的属性，但 `let` 命令、`const` 命令、`class` 命令声明的全局变量，不属于顶层对象的属性。

```js
let aa = 1;
const bb = 2;

console.log(window.aa); // undefined
console.log(window.bb); // undefined
```

![](https://user-images.githubusercontent.com/20290821/53854366-2ec1a400-4004-11e9-8c62-5a1dd91b8a5b.png)

通过上图也可以看到，在全局作用域中，用 `let` 和 `const` 声明的全局变量并没有在全局对象中，只是一个块级作用域（Script）中。

> [第 27 题：关于 const 和 let 声明的变量不在 window 上 #30](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/30)

更多阅读：

1.[Global Environment Records](https://www.ecma-international.org/ecma-262/6.0/#sec-global-environment-records)

2.[【Note】JavaScript执行系统之静态环境 #11](https://github.com/XiaoDHuang/node_index/issues/11)

### 5.合并数组

请把俩个数组 [A1, A2, B1, B2, C1, C2, D1, D2] 和 [A, B, C, D]，合并为 [A1, A2, A, B1, B2, B, C1, C2, C, D1, D2, D]

```js
let arr1 = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"];
let arr2 = ["A", "B", "C", "D"];
console.log(
  [...arr1, ...arr2]
    .sort(
      (v2, v1) => (
        v2.codePointAt(0) - v1.codePointAt(0) ||
        v1.length - v2.length ||
        v2.codePointAt(1) - v1.codePointAt(1)
      )
    )
);
```

> [第 30 题：请把俩个数组 [A1, A2, B1, B2, C1, C2, D1, D2] 和 [A, B, C, D]，合并为 [A1, A2, A, B1, B2, B, C1, C2, C, D1, D2, D]。 #39](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/39)

### 6.改造下面的代码，使之输出0 - 9，写出你能想到的所有解法。

```js
for (var i = 0; i< 10; i++){
  setTimeout(() => {
    console.log(i);
  }, 1000)
}
```

> [第 31 题：改造下面的代码，使之输出0 - 9，写出你能想到的所有解法。 #43](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/43)

### 7.下面的代码打印什么内容，为什么？

```js
var b = 10;
(function b(){
  b = 20;
  console.log(b);
})();
```

> [第 33 题：下面的代码打印什么内容，为什么？ #48](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/48)

### 8.第 34 题：简单改造下面的代码，使之分别打印 10 和 20。

```js
var b = 10;
(function b(){
  b = 20;
  console.log(b);
})();
```

> [第 34 题：简单改造下面的代码，使之分别打印 10 和 20。 #51](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/51)

### 9.使用迭代的方式实现 flatten 函数

> [第 36 题：使用迭代的方式实现 flatten 函数 #54](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/54)

### 10.下面代码中 a 在什么情况下会打印 1？

```js
var a = ?;
if(a == 1 && a == 2 && a == 3){
  conso.log(1);
}
```

> [第 38 题：下面代码中 a 在什么情况下会打印 1？ #57](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/57)

### 11.下面代码输出什么

```js
var a = 10;
(function () {
    console.log(a)
    a = 5
    console.log(window.a)
    var a = 20;
    console.log(a)
})()
```

> [第 41 题：考察作用域的一道代码题 #61](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/61)

### 12.使用 sort() 对数组 [3, 15, 8, 29, 102, 22] 进行排序，输出结果

> [第 43 题：使用 sort() 对数组 [3, 15, 8, 29, 102, 22] 进行排序，输出结果 #66](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/66)

### 13.第 46 题：输出以下代码执行的结果并解释为什么 #76

```js
var obj = {
  '2': 3,
  '3': 4,
  'length': 2,
  'splice': Array.prototype.splice,
  'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)
```

> [输出以下代码执行的结果并解释为什么](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/76)

### 14.call 和 apply 的区别是什么，哪个性能更好一些

> [call 和 apply 的区别是什么，哪个性能更好一些](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/84)

### 15.第 50 题：实现 (5).add(3).minus(2) 功能 #88

> [第 50 题：实现 (5).add(3).minus(2) 功能 #88](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/88)

### 16.第 53 题：输出以下代码的执行结果并解释为什么 #93

```js
var a = {n: 1};
var b = a;
a.x = a = {n: 2};

console.log(a.x)
console.log(b.x)
```

> [第 53 题：输出以下代码的执行结果并解释为什么 #93](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/93)

### 17.第 55 题：某公司 1 到 12 月份的销售额存在一个对象里面 #96

如下：{1:222, 2:123, 5:888}，请把数据处理为如下结构：[222, 123, null, null, 888, null, null, null, null, null, null, null]。

> [第 55 题：某公司 1 到 12 月份的销售额存在一个对象里面 #96](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/96)

### 18.第 59 题：给定两个数组，写一个方法来计算它们的交集。 #102

> [第 59 题：给定两个数组，写一个方法来计算它们的交集。 #102](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/102)
