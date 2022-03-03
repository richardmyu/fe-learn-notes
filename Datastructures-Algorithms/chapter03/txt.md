# 栈

**栈** 是一种遵从 **后进先出**（LIFO）原则的有序集合。新添加的或待删除的元素都保存在栈的同一端，称作栈顶，另一端就叫栈底。

栈被用在编程语言的编译器和内存中保存变量、方法调用等。

```js
//创建一个类来表示栈
function Stack() {
  //创建一种数据结构来保存栈里的元素，选择数组
  let items = [];

  //push 添加一个或几个新元素到栈顶
  this.push = function (ele) {
    items.push(ele);
  };

  //pop 移除栈顶的元素，同时返回被移除的元素
  this.pop = function (ele) {
    return items.pop();
  };

  //peek 返回栈顶的元素，不对栈顶做任何修改
  this.peek = function () {
    return items[items.length - 1];
  };

  //isEmpty 如果栈里没有任何元素就返回 true，否则返回 false
  this.isEmpty = function () {
    return items.length === 0;
  };

  //size 返回栈里的元素个数，这个方法和数组的 length 属性类似
  this.size = function () {
    return items.length;
  };

  //clear 移除栈里的所有的元素
  this.clear = function () {
    items = [];
  };

  //print 打印栈里的所有元素
  this.print = function () {
    console.log(items.toString());
  }
}
```
