# Node 对象

## 5.ParentNode 接口

节点对象除了继承 Node 接口以外，还会继承其他接口。

如果当前节点是父节点，就会继承 `ParentNode` 接口。由于只有元素节点（element）、文档节点（document）和文档片段节点（documentFragment）拥有子节点，因此只有这三类节点会继承 `ParentNode` 接口。

### 5.1 ParentNode.children [readonly]

`children` 属性返回一个 `HTMLCollection` 实例，成员是当前节点的所有元素子节点。该属性只读。

如果没有元素类型的子节点，返回值 `HTMLCollection` 实例的 `length` 属性为 0。

```javascript
app.children
// HTMLCollection(2)
//   0: div.item.item--first
//   1: div.item.item--last

// 一般模式，没有影响
// 严格模式则会报错
// Cannot assign to read only property 'children' of object '#<HTMLDivElement>'
app.children = ''

let list = document.getElementById('list')
list.children // HTMLCollection []
```

### 5.2 ParentNode.firstElementChild/lastElementChild

`firstElementChild` 属性返回当前节点的第一个元素子节点。如果没有任何元素子节点，则返回 `null`。

`lastElementChild` 属性返回当前节点的最后一个元素子节点，如果不存在任何元素子节点，则返回 `null`。

```js
app.firstElementChild // <div...
list.firstElementChild // null
```

### 5.3 ParentNode.childElementCount

`childElementCount` 属性返回一个整数，表示当前节点的所有元素子节点的数目。如果不包含任何元素子节点，则返回 0。

```js
app.childElementCount // 2
list.childElementCount // 0
```

### 5.5 ParentNode.append/prepend()

`append` 方法为当前节点追加一个或多个子节点，位置是最后一个元素子节点的后面。该方法不仅可以添加元素子节点，还可以添加文本子节点。

重复添加的节点，只会执行最后一次添加

```javascript
let div = document.createElement('div')
let text = document.createTextNode('hh')
app.append(div, text, text, div)
app.childNodes
// NodeList(7)
//   ...
//   5: text
//   6: div
```

如果添加的节点存在，则等价于将节点从之前的位置移到新位置：

```js
let subNode = app.firstChild
let subEle = app.firstElementChild
app.append(subNode, subEle)
app.childNodes
// NodeList(5)
//   0: text
//   1: div.item.item--last
//   2: text
//   3: text
//   4: div.item.item--first
```

> 注意，该方法没有返回值。

`prepend` 方法为当前节点追加一个或多个子节点，位置是第一个元素子节点的前面。它的用法与 `append` 方法完全一致，也是没有返回值。

## 6.ChildNode 接口

如果一个节点有父节点，那么该节点就继承了 `ChildNode` 接口。

### 6.1 ChildNode.remove()

`remove` 方法用于从父节点移除当前节点。没有返回值。

```js
app.remove()
list.remove()
```

### 6.2 ChildNode.before/after()

`before` 方法用于在当前节点的前面，插入一个或多个同级节点。两者拥有相同的父节点。不仅可以插入元素节点，还可以插入文本节点。

`after` 方法用于在当前节点的后面，插入一个或多个同级节点，两者拥有相同的父节点。用法与 `before` 方法完全相同。

> 同 `append/prepend` 方法一致，添加的节点若是存在，则为移动操作。

### 6.3ChildNode.replaceWith()

`replaceWith` 方法使用参数节点，替换当前节点。参数可以是元素节点，也可以是文本节点。若节点已存在，等价于将替换节点移到当前节点位置并删除当前节点。没有返回值。
