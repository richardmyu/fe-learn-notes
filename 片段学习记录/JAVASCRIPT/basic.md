# basic

### ['1', '2', '3'].map(parseInt) what & why ?

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
### 将数组扁平化并去除其中重复数据，最终得到一个升序且不重复的数组

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

### `Object.prototype.toString.call()` 、 `instanceof` 以及 `Array.isArray()`

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
