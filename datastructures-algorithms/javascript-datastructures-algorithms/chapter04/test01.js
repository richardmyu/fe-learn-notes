//Queue FIFO

//创建一个类来表示队列
function Queue() {
  //构建数据结构
  let items = [];

  //enqueue(ele): 向队列尾部添加一个或多个新的项
  this.enqueue = function (ele) {
    items.push(ele);
  }

  //dequeue(): 移除队列第一项，并返回被移除项
  this.dequeue = function () {
    return items.shift();
  }

  //front(): 返回队列第一项

  this.front = function () {
    return items[0];
  }

  //isEmpty():

  this.isEmpty = function () {
    return items.length === 0;
  }

  //clear
  this.clear = function () {
    items = [];
  }

  //size():
  this.size = function () {
    return items.length;
  }

  //print()
  this.print = function () {
    console.log(items.toString());
  }
}

let queue = new Queue();
console.log(queue.isEmpty());//true

queue.enqueue('John');
queue.enqueue('Jack');
queue.enqueue('tian');
queue.print();//John,Jack,tian
console.log(queue.size());//3
console.log(queue.isEmpty());//false
console.log(queue.dequeue());//John
console.log(queue.dequeue());//Jack
queue.print();//tian


















