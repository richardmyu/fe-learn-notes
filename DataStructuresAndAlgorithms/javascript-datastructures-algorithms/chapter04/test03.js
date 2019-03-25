//最小优先队列
function PriorityQueue() {
  let items = [];

  function QueueElement(element, priority) {
    this.element = element;
    this.priority = priority;
  }

  this.enqueue = function (element, priority) {
    let queueElement = new QueueElement(element, priority);
    let added = false;
    for (let i = 0; i < items.length; i++) {

      if (queueElement.priority < items[i].priority) {
        items.splice(i, 0, queueElement);
        added = true;
        break;
      }
      /*else {
        items.push(queueElement);
      }*/
    }
    if (!added) {
      items.push(queueElement);
    }
  };
  this.print = function () {
    for (let i = 0; i < items.length; i++) {
      console.log(`${items[i].element} : ${items[i],priority}`);
    }
  };
  this.dequeue = function () {
    return items.shift();
  };
  this.front = function () {
    return items[0];
  };
  this.isEmpty = function () {
    return items.length === 0;
  };
  this.size = function () {
    return items.length;
  };
  this.clear = function () {
    items = [];
  };
  this.print = function () {
    for (let i = 0; i < items.length; i++) {
      console.log(`${items[i].element} : ${items[i].priority}`);
    }
  };
}

let queue = new PriorityQueue();
console.log(queue.isEmpty());//true
queue.enqueue('John', 2);
queue.enqueue('Jack', 1);
queue.enqueue('tian', 3);
queue.print();//John,Jack,tian
console.log(queue.size());//3
console.log(queue.isEmpty());//false
console.log(queue.dequeue());//John
console.log(queue.dequeue());//Jack
queue.print();//tian