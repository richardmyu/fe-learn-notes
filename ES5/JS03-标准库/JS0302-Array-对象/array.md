# Array 对象

## 1. 构造函数

`Array` 是 JavaScript 的原生对象，同时也是一个构造函数，可以用它生成新的数组。

```js
var arr = new Array(2);
arr.length; // 2
arr; // [ empty x 2 ]
```

如果没有使用 `new`，运行结果也是一样的。

`Array` 构造函数有一个很大的缺陷，就是不同的参数，会导致它的行为不一致。

```js
// 无参数时，返回一个空数组
new Array(); // []

// 单个正整数参数，表示返回的新数组的长度
new Array(1); // [ empty ]
new Array(2); // [ empty x 2 ]

// 非正整数的数值作为参数，会报错
new Array(3.2); // RangeError: Invalid array length
new Array(-3); // RangeError: Invalid array length

// 单个非数值（比如字符串、布尔值、对象等）作为参数，
// 则该参数是返回的新数组的成员
new Array("abc"); // ['abc']
new Array([1]); // [Array[1]]

// 多参数时，所有参数都是返回的新数组的成员
new Array(1, 2); // [1, 2]
new Array("a", "b", "c"); // ['a', 'b', 'c']
```

可以看到，`Array` 作为构造函数，行为很不一致。因此，不建议使用它生成新数组，直接使用数组字面量是更好的做法。

> 注意，如果参数是一个正整数，返回数组的成员都是空位。虽然读取的时候返回 `undefined`，但实际上该位置没有任何值。虽然可以取到 `length` 属性，但是取不到键名。

```js
var a = new Array(3);
var b = [undefined, undefined, undefined];

a.length; // 3
b.length; // 3

a[0]; // undefined
b[0]; // undefined

0 in a; // false
0 in b; // true
```

## 2. 静态方法

### 2.1.`Array.isArray`

对于一个网页或者一个全局作用域而言，用 `instanceof` 操作符就能很好的完成：

```js
if (value instanceof Array) {
  //...
}
```

但 `instanceof` 操作符的问题在于，它假定只有一个全局执行环境。如果网页包含多个框架，那实际上就会有两个以上不同的全局执行环境，从而存在两个以上不同版本的 `Array` 构造函数。如果需要从一个框架向另一个框架传入一个数组，那么传入的数组与在第二个框架中原生创建的数组分别具有各自不同的构造函数。

为了解决这个问题，ECMAScript5 新增了 `Array.isArray()` 方法。这个方法的目的是最终确定某个值是不是数组，而不论是在哪个全局作用域中创建的。

```js
if (Array.isArray(value)) {
  //...
}
```

`Array.isArray` 方法返回一个布尔值，表示参数是否为数组。并且它可以弥补 `typeof` 运算符的不足。

```js
var arr = [1, 2, 3];

typeof arr; // "object"
Array.isArray(arr); // true
```

## 3. 实例方法

### 3.1. 转换方法

> 注意：如果数组某一项的值是 `null` 或 `undefined`，那么该值在 `toString()`、`toLocaleString()`、`valueOf()` 和 `join()` 方法返回的结果中以空字符串表示。

1).`valueOf()`

调用该方法，返回数组本身

2).`toString()`

调用数组的该方法，返回由数组中每个值的字符串形式拼接而成的以逗号隔开的字符串。实际上，为了创建这个字符串会调用数组每一项的 `toString()` 方法。

```js
var ary = [1, 2, 3, 4, 5];
ary.toString(); //1,2,3,4,5
```

3).`toLocaleString()`

一般返回值与 `toString()` 和 `valueOf()` 相同。当调用数组的 `toLocaleString()` 方法时，也会创建以数组值的字符串形式，但每一项调用的是 `toLocaleString()` 方法，而不是 `toString()` 方法。

4).`join("分隔符")`

按照指定连接符将数组转换为字符串；

---

- 不改变原数组
- 返回值：返回值是字符串
- 参数类型：字符
- 参数
  - a. 只接受一个分隔数组的可选字符或字符串（多传参数不起作用）
  - b. 如果不传参数或传递 `undefined`，则默认是逗号；

---

如果数组成员是 `undefined` 或 `null` 或空位，会被转成空字符串。

通过 `call` 方法，这个方法也可以用于字符串或类似数组的对象。

```js
Array.prototype.join.call("hello");
// "h,e,l,l,o"

var obj = { 0: "a", 1: "b", length: 2 };
Array.prototype.join.call(obj, "-");
// 'a-b'
```

### 3.2. 栈方法

ECMAScript 数组也提供了一种让数组的行为类似于其他结构的方法。具体来说，数组可以表现的像栈一样。栈是一种** LIFO（Last-In-First-Out）**的数据结构，而栈中项的插入（**推入**）和移除（**弹出**），只发生在一个位置--栈的顶部。

1).**`push(...)`**

在数组最后按照书写顺序逐个添加任意多项；

---

- 改变原数组
- 返回值：返回增加后的数组长度；
- 参数类型：任意类型
- 参数：参数任意多，逗号隔开

---

2).**`pop()`**

删除数组最后一项

---

- 改变原数组
- 返回值：返回被删除项；
- 参数：没有参数（传递参数也不报错）

---

> 对空数组使用 `pop` 方法，不会报错，而是返回 `undefined`。

`push` 和 `pop` 结合使用，就构成了“后进先出”的**栈（stack）**结构。

```js
var arr = [];
arr.push(1, 2);
arr.push(3);
arr.pop();
arr; // [1, 2]
```

### 3.3. 队列方法

队列数据结构的访问规则是** FIFO（First-In-First-Out）**。队列在列表的末端添加项，在前端删除项。

1).**`shift()`**

删除数组的第一项

---

- 改变原数组
- 返回值：返回被删除项；
- 参数：没有参数

---

> 同样，对空数组使用 `shift` 方法，不会报错，而是返回 `undefined`。

2).**`unshift(...)`**

在数组最前按照书写添加任意多项

---

- 改变原数组
- 返回值：返回增加项以后的数组长度
- 参数类型：任意类型
- 参数：参数任意多，逗号隔开

---

### 3.4. 重排序方法

1).`reverse()`

反转数组排序（较其他方法比较快）

---

- 改变原数组
- 返回值：返回新数组；
- 参数：没有参数

---

2).**`sort()`**

升序排列数组（默认按字典顺序）

---

- 改变原数组；
- 返回值：返回新数组；
- 参数：不需要参数；或者可以接受一个比较函数作为参数

> 没有参数的排序是字母表排序。

---

可以接收一个比较函数，以便自定义排序：

```js
[1, 3, 2].sort(); //[1, 2, 3]
["a", "c", "b"].sort(); //["a", "b", "c"]

ary.sort(function(a, b) {
  //a 当前项  b 当前项的后一项
  return a - b; //完全排序：从小到大；
  return b - a; //完全排序：从大到小；
});

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

//对于数值类型或者 valueOf() 方法返回数值类型的对象类型，可以使用一个更简单的比较函数
function compare(value1, value2) {
  return value2 - value1;
}
```

### 3.5. 操作方法

1).`concat(...)`

用来拼接数组，在原数组后面添加任意多项；

---

- 不改变原数组；
- 返回值：返回新数组；
- 参数类型：任意类型数据；
- 参数：
  - a. 没有参数或者参数为 0 时，相当于原数组的复本
  - b. 非数组参数，简单添加

---

如果数组成员包括对象，`concat` 方法返回当前数组的一个浅拷贝。所谓“**浅拷贝**”，指的是新数组拷贝的是对象的引用。

```js
var obj = { a: 1 };
var oldArray = [obj];

var newArray = oldArray.concat();

obj.a = 2;
newArray[0].a; // 2
```

2).**`slice(startIndex[,endIndex])`**

从参数指定位置开始复制截取（包含指定项）

---

- 不改变原数组；
- 返回值：将获取的项组成新数组返回；
- 参数类型：数值
- 参数：
  - a. 没有参数或者参数为 0 时，相当于原数组的副本；
  - b. 一个参数，从该参数指定的位置开始复制
  - c. 二个参数，从第一个参数开始复制到第二个参数位置（不包含终止位）
  - d. 若参数为负数（倒数计位），则加上数组长度来进行复制
  - e. 若第二个参数小于第一个参数，返回空数组

---

`slice` 方法的一个重要应用，是将类似数组的对象转为真正的数组。

```js
Array.prototype.slice.call({ 0: "a", 1: "b", length: 2 });
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

---

- 改变原数组；
- 返回值：始终返回一个数组（由删除项构成的）或者空数组（没有删除项）
- 参数：多个
  - a. 第一个参数：指定删除的起始位置
  - b. 第二个参数：指定删除个数
  - c. 第三个参数：用来替换
  - d. 其他参数：替换

---

删除：可以删除任意项，需要 2 个参数：要删除的第一项的位置和要删除的项数

插入：可以在任意位置插入任意多项，需要至少 3 个参数：起始位置、0（删除项数）以及要插入的项（可以多个）

替换：插入且同时删除，需要至少 3 个参数：起始位置、要删除的项数以及要插入的任意项数（删除项数和插入项数不一定要等等）

> 如果只提供第一个参数，等同于将原数组在指定位置拆分成两个数组。

### 3.6. 位置方法

1).**`indexOf(subStr[,startIndex])`**

在数组中从头开始进行查找指定项

---

- 不改变原数组
- 返回值：指定项第一次出现的索引，找不到就返回 -1；
- 参数类型：任意类型
- 参数：
  - a. 第一个参数指定查找项
  - b. 第二个参数指定查找的起始位置；

---

2).**`lastIndexOf(subStr[,startIndex])`**

作用同 `indexOf()`，但从末尾开始进行查找指定项

> 这两个方法在被调用时，比较数组的每一项用的是全等操作符，也就是说数据类型必须一样。这样就不能用来搜索 `NaN`。

### 3.7. 迭代方法

每一个方法都接收两个参数：第一个参数是需要运行的函数；第二个参数是可选的，调用函数时可选的 `this` 的值；都不改变原数组。如果数组有空位，会跳过。

传入这些方法中的函数接收三个参数：数组项的值、该项在数组中的位置和数组对象本身。

1).**`forEach()`**

`forEach` 方法与 `map` 方法很相似，也是对数组的所有成员依次执行参数函数。但是，`forEach` 方法不返回值，只用来操作数据。这就是说，如果数组遍历的目的是为了得到返回值，那么使用 `map` 方法，否则使用 `forEach` 方法。`forEach` 方法无法中断执行，总是会将所有成员遍历完。如果希望符合某种条件时，就中断遍历，要使用 `for` 循环。

如果要提前终止，必须把 `forEach` 放到一个 `try` 块中，并能抛出一个异常。

```js
function foreach(a, f, t) {
  try {
    a.forEach(f, t);
  } catch (e) {
    if (e === foreach.break) {
      return;
    } else {
      throw e;
    }
  }
}
foreach.break = new Error("StopIterrator");
```

> 重点：1. 没有返回值；2. 全体遍历，不会中断；

2).**`map()`**

将数组的所有成员依次传入参数函数，然后把每一次的执行结果组成一个新数组返回。如果数组有空位，`map` 方法的回调函数在这个位置不会执行，会跳过数组的空位。不会跳过 `undefined` 和 `null`。

> 重点：1. 有返回值；2. 全体遍历，不会中断；

3).**`filter()`**

用来过滤数组成员，将所有返回值为 true 的对应项构成的新数组；

> 重点：1. 有返回值；2.> 全体遍历，不会中断；

4).`every()`

传入的函数对每一项都返回 true，这个方法才会返回 true；否则返回 flase。也就是说，迭代过程中出现 false 就停止执行。

5).`some()`

只要传入的数组中有一项返回 true，则方法返回 true。也就是说，迭代过程中出现 true 就停止执行。

> 注意，对于空数组，`some` 方法返回 false，`every` 方法返回 true，回调函数都不会执行。

### 3.8. 归并方法

ES5 新增两个归并数组的方法。这两个方法会迭代数组所有的项，然后构建一个最终返回的值。这两个方法接收两个参数：一个在每一项上调用的函数和（可选的）作为归并基础的初始值。

这两个方法不会改变原数组。它们的差别是，`reduce` 是从左到右处理（从第一个成员到最后一个成员），`reduceRight` 则是从右到左（从最后一个成员到第一个成员），其他完全一样。

传给 `reduce()` 和 `reduceRight()` 的函数接收 4 个参数：

---

- prev: 积累变量（默认为数组的第一个成员）
- next: 当前变量（默认为数组的第二个成员）
- index 索引
- 数组对象

---

只有前两个参数是必选的。**这个函数返回的任何值都会作为第一个参数自动传给下一项**。第一次迭代发生在数组的第二项，即如果要对累积变量指定初值，可以把它放在 `reduce` 方法和 `reduceRight` 方法的第二个参数。

由于这两个方法会遍历数组，所以实际上还可以用来做一些遍历相关的操作。比如，找出字符长度最长的数组成员。

```js
function findLongest(s) {
  return s.reduce((longest, entry) => {
    console.log("longest " + longest, "entry " + entry);
    return entry.length > longest.length ? entry : longest;
  }, "");
}

console.log(findLongest(["aaa", "bb", "c"]));

//reduce 方法的第二个参数指定为'', 即初始值为''
//longest  entry aaa
//longest aaa entry bb
//longest aaa entry c
// "aaa"
```

上面代码中，`reduce` 的参数函数会将字符长度较长的那个数组成员，作为累积值。这导致遍历所有成员之后，累积值就是字符长度最长的那个成员。

### 3.9.ES6 新方法

1).**`find()`**

查找数组中某一项（只要 `return` 为 true 则停止查找）

---

- 不改变原数组
- 返回值：返回查找项；找不到返回 `undefined`
- 参数类型：函数
  - 第一个参数是需要运行的函数（该方法会给函数传入三个参数，同迭代方法）

---

```js
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

类似 `find()` 方法，不同的是返回指定查找项的索引；找不到返回 `undefined`。

3).`includes()`

---

- 不改变原数组
- 返回值：找到返回 true；找不到返回 false
- 参数类型：任意类型
  - 第一个参数是查找项
  - 第二个参数指定开始查找的位置（也可以为负数）

---

> 数组空项和 `NaN` 都可以查找

```js
let ary = [1, 2, , 3, NaN];

ary.includes(2); //true
ary.includes(); //true
ary.includes(NaN); //true
console.log(ary.includes(7)); //false
```

### 3.10. 链式使用

上面这些数组方法之中，有不少返回的还是数组，所以可以链式使用。

```js
var users = [
  { name: "tom", email: "tom@example.com" },
  { name: "peter", email: "peter@example.com" }
];

users
  .map(function(user) {
    return user.email;
  })
  .filter(function(email) {
    return /^t/.test(email);
  })
  .forEach(console.log(email));

//tom@example.com 0 [ 'tom@example.com' ]
```
