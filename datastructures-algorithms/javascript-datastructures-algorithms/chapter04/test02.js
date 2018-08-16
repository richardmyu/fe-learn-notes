//ES6语法实现
let Queue = (function () {
  const items = new WeakMap();

  class Queue {
    constructor() {
      items.set(this, []);
    }

    enqueue(ele) {
      let q = items.get(this);
      q.push(ele);
    }

    dequeue() {
      let q = items.get(this);
      return q.shift();
    }

    front() {
      let q = items.get(this);
      return q[0];
    }

    isEmpty() {
      let q = items.get(this);
      return q.length === 0;
    }

    clear() {
      items.set(this, []);
    }

    size() {
      let q = items.get(this);
      return q.length;
    }

    print() {
      let q = items.get(this);
      console.log(q.toString());
    }
  }

  return Queue;
})();

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