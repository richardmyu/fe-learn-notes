# 队列

**队列** 是遵循 FIFO (First In First Out) 原则的一组有序的项。队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾。

计算机程序中，常见的例子是打印队列，消息队列。

```js
// 创建一个类来表示队列
function Queue() {
  // 构建数据结构
  let items = [];

  // enqueue 向队列尾部添加一个或多个新的项
  this.enqueue = function (ele) {
    items.push(ele);
  }

  // dequeue 移除队列第一项，并返回被移除项
  this.dequeue = function () {
    return items.shift();
  }

  // front 返回队列第一项
  this.front = function () {
    return items[0];
  }

  // isEmpty
  this.isEmpty = function () {
    return items.length === 0;
  }

  // clear
  this.clear = function () {
    items = [];
  }

  // size
  this.size = function () {
    return items.length;
  }

  // print
  this.print = function () {
    console.log(items.toString());
  }
}
```
