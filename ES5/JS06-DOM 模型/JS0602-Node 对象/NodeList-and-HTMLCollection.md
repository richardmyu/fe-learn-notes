# Node 对象

## 3.NodeList 接口

节点都是单个对象，有时需要一种数据结构，能够容纳多个节点。DOM 提供两种节点集合，用于容纳多个节点：`NodeList` 和 `HTMLCollection`。

这两种集合都属于接口规范。许多 DOM 属性和方法，返回的结果是 `NodeList` 实例或 `HTMLCollection` 实例。

### 3.1.概述

`NodeList` 实例是一个类似数组的对象，它的成员是节点对象。通过以下方法可以得到 `NodeList` 实例。

- `Node.childNodes`
- `querySelectorAll`，`getElementByName`等节点搜索方法

> 注意：`querySelectorAll` 返回的是 `NodeList`，而 `getElement` 系列返回的是 `HTMLCollection`。

```js
var app = document.querySelectorAll('.item');
app; //NodeList(2)

var appGet = document.getElementsByClassName('item');
appGet; //HTMLCollection(2)
```

`NodeList` 实例很像数组，可以使用 `length` 属性和 `forEach` 方法（为什么呢个使用 `forEach`)。但是，它不是数组，不能使用 `pop` 或 `push` 之类数组特有的方法。还可以使用 `Array.from` 将其转换为实际数组。

```js
var app = document.getElementById('app');
var children = app.childNodes;

Array.isArray(children); // false
children.length; // 5

children.forEach(item => {
  console.log(item.nodeName);
});
// #text
// DIV
// #text
// DIV
// #text

Array.isArray(Array.from(children)); // true
```

除了使用 `forEach` 方法遍历 `NodeList` 实例，还可以使用 `for` 循环。

```js
var children = app.childNodes;

for (var i = 0; i < children.length; i++) {
  var item = children[i];
}
```

注意，`NodeList` 实例可能是动态集合，也可能是静态集合。所谓动态集合就是，DOM 删除或新增一个相关节点，都会立刻反映在 `NodeList` 实例。目前，只有 `Node.childNodes` 返回的是一个动态集合，其他的 `NodeList` 都是静态集合。

```js
var app = document.getElementById('app');
var children = app.childNodes;
var items = document.querySelectorAll('.item');
children.length; // 5
items.length; //2

var div = document.createElement('div');
div.className = 'item';
app.appendChild(div);
children.length; //6
items.length; //2
```

### 3.2.`NodeList.prototype.length`

`length` 属性返回 `NodeList` 实例包含的节点数量。

### 3.3.`NodeList.prototype.forEach`

`forEach` 方法用于遍历 `NodeList` 的所有成员。它接受一个回调函数作为参数，每一轮遍历就执行一次这个回调函数，用法与数组实例的 `forEach` 方法完全一致。

```js
var children = app.childNodes;

children.forEach(function f(item, i, list) {
  // ...
}, this);
```

> `forEach` 方法的第二个参数，用于绑定回调函数内部的 `this`，该参数可省略。

### 3.4.`NodeList.prototype.item`

`item` 方法接受一个整数值作为参数，表示成员的位置，返回该位置上的成员。

```js
var children = app.childNodes;
children.length; // 5
children[0] === children.item(0); // true

// 注意这个差别
children[5]; // undefined
children.item(5); // null

children.item();
// Failed to execute 'item' on 'NodeList': 1 argument required, but only 0 present.
```

如果参数值大于实际长度，或者索引不合法（比如负数），`item` 方法返回 `null`。如果省略参数，`item` 方法会报错。

所有类似数组的对象，都可以使用方括号运算符取出成员。一般情况下，都是使用方括号运算符，而不使用 `item` 方法。

### 3.5.`NodeList.prototype.keys/values/entries`

这三个方法都返回一个 ES6 的遍历器对象，可以通过 `for...of` 循环遍历获取每一个成员的信息。区别在于，`keys()` 返回键名的遍历器，`values()` 返回键值的遍历器，`entries()` 返回的遍历器同时包含键名和键值的数组。

```js
var app = document.getElementById('app');
var child = app.childNodes;
for (var key of child.keys()) {
  console.log(key);
}
// 0
// 1
// ...

for (var val of child.values()) {
  console.log(val);
}
// #text
// <div class="item item--first">1234</div>
// ...

for (var item of child.entries()) {
  console.log(item);
}
// [0, text]
// [1, div.item.item--first]
// ...
```

## 4.HTMLCollection 接口

### 4.1 概述

`HTMLCollection` 也是一个节点对象的集合，但只能包含元素节点（element），不能包含其他类型的节点。它的返回值是一个类似数组的对象，但是与 `NodeList` 接口不同，`HTMLCollection` 没有 `forEach` 方法，只能使用 `for` 循环遍历。

返回 `HTMLCollection` 实例的，主要是一些 `Document` 对象的集合属性，比如 `document.links`、`docuement.forms`、`document.images` 等。还有 `getElement` 系列获取元素的方法（`getElementById` 和 `getElementsByName` 是个例外）。

```js
var getClass = app.getElementsByClassName('item');
var getTag = app.getElementsByTagName('div');
document.links; // HTMLCollection []
document.forms; // HTMLCollection []
document.images; // HTMLCollection []
getClass; // HTMLCollection [2]
getTag; // HTMLCollection [2]
```

`HTMLCollection` 实例都是动态集合，节点的变化会实时反映在集合中。

```js
var div = document.createElement('div');
div.className = 'item';
app.appendChild(div);
getClass; // HTMLCollection [3]
getTag; // HTMLCollection [3]
```

如果元素节点有 `id` 或 `name` 属性，那么 `HTMLCollection` 实例上面，可以使用 `id` 属性或 `name` 属性引用该节点元素。如果没有对应的节点，则返回 `null`。

```js
var imgs = document.getElementById('img');
document.images.img === imgs; // true

var linkA = document.getElementById('lin');
document.links.lin === linkA; // true

var tests = document.getElementsByClassName('test');
tests.img === imgs;
tests.lin === linkA;
```

### 4.2.`HTMLCollection.prototype.length`

`length` 属性返回 `HTMLCollection` 实例包含的成员数量。

### 4.3.`HTMLCollection.prototype.item`

`item` 方法接受一个整数值作为参数（参数若传入浮点数，则会忽略小数部分），表示成员的位置，返回该位置上的成员。如果参数值超出成员数量或者不合法（比如小于 0），那么 `item` 方法返回 `null`。不传参数则会报错。

```js
var imgs = document.images;
imgs.item(0); // <img...
imgs.item(1); // null
imgs.item(-1); // null
imgs.item(0.1); // <img...
imgs.item(0.9); // <img...
imgs.item(1.9); // null
imgs.item();
//Failed to execute 'item' on 'HTMLCollection': 1 argument required, but only 0 present.
```

> 由于方括号运算符也具有同样作用，而且使用更方便，所以一般情况下，总是使用方括号运算符。

### 4.4.`HTMLCollection.prototype.namedItem`

`namedItem` 方法的参数是一个字符串，表示 `id` 属性或 `name` 属性的值，返回对应的元素节点。如果没有对应的节点，则返回 `null`。

```js
var imgs = document.getElementById('img');
document.images.namedItem('img') === imgs; // true
document.images.namedItem('lin'); // null
```
