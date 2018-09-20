#### 11.Array类型

##### 11.1 定义

数组是按次序排列的一组值。每个值的位置都有编号（从 0 开始），整个数组用方括号表示。除了在定义时赋值，数组也可以先定义后赋值。任何类型的数据，都可以放入数组。

> 如果数组的元素还是数组，就形成了多维数组。

##### 11.2 数组的本质

本质上，数组属于一种特殊的对象。`typeof` 运算符会返回数组的类型是 `Object`。

数组的特殊性体现在，它的键名是按次序排列的一组整数（0，1，2…）。

```javascript
var arr = ['a', 'b', 'c'];

Object.keys(arr)
// ["0", "1", "2"]
```

上面代码中，`Object.keys` 方法返回数组的所有键名。可以看到数组的键名就是整数 0、1、2。

由于数组成员的键名是固定的，因此数组不用为每个元素指定键名，而对象的每个成员都必须指定键名。JavaScript 语言规定，对象的键名一律为字符串，所以，数组的键名其实也是字符串。之所以可以用数值读取，是因为非字符串的键名会被转为字符串。

> 注意，这点在赋值时也成立。如果一个值总是先转成字符串，再进行赋值。

对象有两种读取成员的方法：点结构（`object.key`）和方括号结构（`object['key']`）。但是，对于数值的键名，不能使用点结构，因为单独的数值不能作为标识符。所以，数组成员只能用方括号 `arr[n]` 表示（方括号是运算符，可以接受数值）。

##### 11.3 `length` 属性

数组的 `length` 属性，返回数组的成员数量。

JavaScript 使用一个 32 位整数，保存数组的元素个数。这意味着，数组成员最多只有 4 294 967 295 个（232 - 1）个，也就是说 `length` 属性的最大值就是 4 294 967 295。

只要是数组，就一定有 `length` 属性。该属性是一个动态的值，等于键名中的最大整数加上1。

数组的数字键不需要连续，`length` 属性的值总是比最大的那个整数键大 1。另外，这也表明数组是一种动态的数据结构，可以随时增减数组的成员。

`length` 属性是可写的。如果人为设置一个小于当前成员个数的值，该数组的成员会自动减少到 `length` 设置的值。清空数组的一个有效方法，就是将 `length` 属性设为 0。

```javascript
var arr = [ 'a', 'b', 'c' ];

arr.length = 0;
arr // []
```

如果人为设置 `length` 大于当前元素个数，则数组的成员数量会增加到这个值，新增的位置都是空位。

如果人为设置 `length` 为不合法的值，JavaScript 会报错。

```javascript
// 设置负值
[].length = -1
// RangeError: Invalid array length

// 数组元素个数大于等于2的32次方
[].length = Math.pow(2, 32)
// RangeError: Invalid array length

// 设置字符串
[].length = 'abc'
// RangeError: Invalid array length
```

值得注意的是，由于数组本质上是一种对象，所以可以为数组添加属性，但是这不影响 `length` 属性的值。

```javascript
var arr = [];
arr['a'] = 'ab';
console.log(arr.length); //0
arr[1] = 'zx';
console.log(arr.length); //2
console.log(arr); //[ <1 empty slot>, "zx" ]
console.log(arr[0]); //undefined
```

如果数组的键名是添加超出范围的数值，该键名会自动转为字符串。

```javascript
var arr = [];
arr[-1] = 'a';
arr[Math.pow(2, 32)] = 'b';

arr.length // 0
arr[-1] // "a"
arr[4294967296] // "b"
```

上面代码中，我们为数组添加了两个不合法的数字键，结果 `length` 属性没有发生变化。这些数字键都变成了字符串键名。最后两行之所以会取到值，是因为取键值时，数字键名会默认转为字符串。

##### 11.4 `in` 运算符

检查某个键名是否存在的运算符 `in`，适用于对象，也适用于数组。

```javascript
var arr = [ ,'a', 'b', 'c' ];
2 in arr  // true
'2' in arr // true
4 in arr // false
0 in arr //false
```

> 注意，如果数组的某个位置是空位，`in` 运算符返回 false。

##### 11.5 `for…in` 循环和数组的遍历

`for...in` 循环不仅可以遍历对象，也可以遍历数组，毕竟数组只是一种特殊对象。但是，`for...in` 不仅会遍历数组所有的数字键，还会遍历非数字键。所以，不推荐使用 `for...in` 遍历数组。

```javascript
var a = [1, 2, 3];
a.foo = true;

for (var key in a) {
  console.log(key);
}
// 0
// 1
// 2
// foo
```

数组的遍历可以考虑使用 `for` 循环或 `while` 循环。

```javascript
var a = [1, 2, 3];

// for循环
for(var i = 0; i < a.length; i++) {
  console.log(a[i]);
}

// while循环
var i = 0;
while (i < a.length) {
  console.log(a[i]);
  i++;
}

var l = a.length;
while (l--) {
  console.log(a[l]);
}
```

上面代码是三种遍历数组的写法。最后一种写法是逆向遍历，即从最后一个元素向第一个元素遍历。

数组的 `forEach` 方法，也可以用来遍历数组。

```javascript
var colors = ['red', 'green', 'blue'];
colors.forEach(function (color) {
  console.log(color);
});
// red
// green
// blue
```

##### 11.6 数组的空位

当数组的某个位置是空元素，即两个逗号之间没有任何值，我们称该数组存在**空位（hole）**。数组的空位不影响 `length` 属性。

需要注意的是，如果最后一个元素后面有逗号，并不会产生空位。也就是说，有没有这个逗号，结果都是一样的。

数组的空位是可以读取的，返回 `undefined`。

使用 `delete` 命令删除一个数组成员，会形成空位，并且不会影响 `length` 属性。

```javascript
var a = [1, 2, 3];
delete a[1];

a[1] // undefined
a.length // 3
```

上面代码用 `delete` 命令删除了数组的第二个元素，这个位置就形成了空位，但是对 `length` 属性没有影响。也就是说，`length` 属性不过滤空位。所以，使用 `length` 属性进行数组遍历，一定要非常小心。

数组的某个位置是空位，与某个位置是 `undefined`，是不一样的。如果是空位，使用数组的 `forEach` 等迭代方法、`for...in` 结构、以及 `Object.keys` 方法进行遍历，空位都会被跳过。(`for` 可以遍历，返回 `undefined`)

```javascript
var a = [, , ,];

a.forEach(function (x, i) {
  console.log(i + '. ' + x);
})
// 不产生任何输出

for (var i in a) {
  console.log(i);
}
// 不产生任何输出

Object.keys(a)
// []

for (let i = 0; i < a.length; i++) {
  console.log(a[i]); //undefined
}
```

如果某个位置是 `undefined`，遍历的时候就不会被跳过。

> 这就是说，空位就是数组没有这个元素，所以不会被遍历到，而 `undefined` 则表示数组有这个元素，值是 `undefined`，所以遍历不会跳过。

##### 11.7 Array.of()

作用类似 `Array`，只是解决了 `Array` 传入一个参数变成 `length` 的问题，而会将单个传入的数值当做数组的项传入

```javascript
var ary = Array(4);
var ary1 = Array.of(4);
console.log(ary);   // [empty × 4]
console.log(ary1);   //[4]
```

##### 11.8 Array.fill()

填充，一般用来初始化或者清空一个数组

```javascript
var ary = Array(4);    
console.log(ary);   //[empty × 4]
console.log(ary.fill(1));   //[1, 1, 1, 1]
console.log(ary.fill(0));   //[0, 0, 0, 0]
```

##### 11.9 类似数组的对象

如果一个对象的所有键名都是正整数或零，并且有 `length` 属性，那么这个对象就很像数组，语法上称为**类似数组的对象（array-like object）**。

```javascript
var obj = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
};

obj[0] // 'a'
obj[1] // 'b'
obj.length // 3
obj.push('d') // TypeError: obj.push is not a function
```

但是，“类似数组的对象”并不是数组，因为它们不具备数组特有的方法。对象 obj 没有数组的 `push` 方法，使用该方法就会报错。

“类似数组的对象”的根本特征，就是具有 `length` 属性。只要有 `length` 属性，就可以认为这个对象类似于数组。但是有一个问题，这种 `length` 属性不是动态值，不会随着成员的变化而变化。

```javascript
var obj = {
  length: 0
};
obj[3] = 'd';
obj.length // 0
```

典型的“类似数组的对象”是函数的 `arguments` 对象，以及大多数 DOM 元素集，还有字符串。

数组的 `Array.prototype.slice.call()` 方法可以将“类似数组的对象”变成真正的数组。

`var arr = Array.prototype.slice.call(arrayLike);`

除了转为真正的数组，“类似数组的对象”还有一个办法可以使用数组的方法，就是通过 `call()` 把数组的方法放到对象上面。

```javascript
function print(value, index) {
  console.log(index + ' : ' + value);
}

Array.prototype.forEach.call(arrayLike, print);

Array.from(arrayLike);
[...arrayLike]
```

> 注意，这种方法比直接使用数组原生的 `forEach` 要慢，所以最好还是先将“类似数组的对象”转为真正的数组，然后再直接调用数组的 `forEach` 方法。

#### 12.数据类型转换

JavaScript 是一种动态类型语言，变量没有类型限制，可以随时赋予任意值。

虽然变量的数据类型是不确定的，但是各种运算符对数据类型是有要求的。如果运算符发现，运算子的类型与预期不符，就会自动转换类型。

##### 12.1 强制转换

强制转换主要指使用 `Number`、`String` 和 `Boolean` 三个函数，手动将各种类型的值，分布转换成数字、字符串或者布尔值。

- --

`Number()`

使用 `Number` 函数，可以将任意类型的值转化成数值。

下面分成两种情况讨论，一种是参数是原始类型的值，另一种是参数是对象。

1).原始类型值

原始类型值的转换规则如下。

```javascript
// 数值：转换后还是原来的值
Number(324) // 324

// 字符串：如果可以被解析为数值，则转换为相应的数值
Number('324') // 324

// 字符串：如果不可以被解析为数值，返回 NaN
Number('324abc') // NaN

// 空字符串转为0
Number('') // 0

// 布尔值：true 转成 1，false 转成 0
Number(true) // 1
Number(false) // 0

// undefined：转成 NaN
Number(undefined) // NaN

// null：转成0
Number(null) // 0
```

`Number` 函数将字符串转为数值，要比 `parseInt` 函数严格很多。基本上，只要有一个字符无法转成数值，整个字符串就会被转为 `NaN`。

另外，`parseInt` 和 `Number` 函数都会自动过滤一个字符串前导和后缀的空格。

2).对象

简单的规则是，`Number` 方法的参数是对象时，将返回 `NaN`，除非是包含单个数值的数组。

之所以会这样，是因为 `Number` 背后的转换规则比较复杂。

第一步，调用对象自身的 `valueOf` 方法。如果返回原始类型的值，则直接对该值使用 `Number` 函数，不再进行后续步骤。

第二步，如果 `valueOf` 方法返回的还是对象，则改为调用对象自身的 `toString` 方法。如果 `toString` 方法返回原始类型的值，则对该值使用 `Number` 函数，不再进行后续步骤。

第三步，如果 `toString` 方法返回的是对象，就报错。

默认情况下，对象的 `valueOf` 方法返回对象本身，所以一般总是会调用 `toString` 方法，而 `toString` 方法返回对象的类型字符串（比如 `[object Object]`）。 

- --

`String()`

`String` 函数可以将任意类型的值转化成字符串，转换规则如下。

1).原始类型值

数值：转为相应的字符串。
字符串：转换后还是原来的值。
布尔值：true 转为字符串 "true"，false 转为字符串 "false"。
`undefined`：转为字符串 "`undefined`"。
`null`：转为字符串 "`null`"。

2).对象

`String` 方法的参数如果是对象，返回一个类型字符串；如果是数组，返回该数组的字符串形式。

```javascript
String({a: 1}) // "[object Object]"
String([1, 2, 3]) // "1,2,3"
```

`String` 方法背后的转换规则，与 `Number` 方法基本相同，只是互换了 `valueOf` 方法和 `toString` 方法的执行顺序。

先调用对象自身的 `toString` 方法。如果返回原始类型的值，则对该值使用 `String` 函数，不再进行以下步骤。

如果 `toString` 方法返回的是对象，再调用原对象的 `valueOf` 方法。如果 `valueOf` 方法返回原始类型的值，则对该值使用 `String` 函数，不再进行以下步骤。

如果 `valueOf` 方法返回的是对象，就报错。

如果 `toString` 法和 `valueOf` 方法，返回的都是对象，就会报错。

- --

`Boolean()`

`Boolean` 函数可以将任意类型的值转为布尔值。

它的转换规则相对简单：除了以下五个值的转换结果为 false，其他的值全部为 true。

- --
- `undefined`
- `null`
- `-0` 或 `+0`
- `NaN`
- `''`（空字符串）
- --

> 注意，所有对象（包括空对象）的转换结果都是 true，甚至连 false 对应的布尔对象 `new Boolean(false)` 也是 true。

所有对象的布尔值都是 true，这是因为 JavaScript 语言设计的时候，出于性能的考虑，如果对象需要计算才能得到布尔值，对于 `obj1 && obj2` 这样的场景，可能会需要较多的计算。为了保证性能，就统一规定，对象的布尔值为 true。

##### 12.2 自动转换

下面介绍自动转换，它是以强制转换为基础的。

遇到以下三种情况时，JavaScript 会自动转换数据类型，即转换是自动完成的，用户不可见。

第一种情况，不同类型的数据互相运算。

第二种情况，对非布尔值类型的数据求布尔值。

第三种情况，对非数值类型的值使用一元运算符（即 `+` 和 `-`）。

自动转换的规则是这样的：预期什么类型的值，就调用该类型的转换函数。比如，某个位置预期为字符串，就调用 `String` 函数进行转换。如果该位置即可以是字符串，也可能是数值，那么默认转为数值。

由于自动转换具有不确定性，而且不易除错，建议在预期为布尔值、数值、字符串的地方，全部使用 `Boolean`、`Number` 和 `String` 函数进行显式转换。

- --

自动转换为布尔值

JavaScript 遇到预期为布尔值的地方（比如 `if` 语句的条件部分），就会将非布尔值的参数自动转换为布尔值。系统内部会自动调用 `Boolean` 函数。

JavaScript 遇到预期为字符串的地方，就会将非字符串的值自动转为字符串。具体规则是，先将复合类型的值转为原始类型的值，再将原始类型的值转为字符串。

字符串的自动转换，主要发生在字符串的加法运算时。当一个值为字符串，另一个值为非字符串，则后者转为字符串。

- --

自动转换为数值

JavaScript 遇到预期为数值的地方，就会将参数值自动转换为数值。系统内部会自动调用 `Number` 函数。

除了加法运算符（`+`）有可能把运算子转为字符串，其他运算符都会把运算子自动转成数值。

> 注意：`null` 转为数值时为 0，而 `undefined` 转为数值时为 `NaN`。

一元运算符也会把运算子转成数值。
