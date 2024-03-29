/**
 * (最小) 优先队列
 */

let PriorityQueue = (function () {
  // 要添加元素，要先创建元素，分配优先级
  class QueueElement {
    constructor(element, priority) {
      this.element = element;
      this.priority = priority;
    }
  }

  const items = new WeakMap();

  class PriorityQueue {
    constructor() {
      items.set(this, []);
    }

    enqueue(element, priority) {
      let queueElement = new QueueElement(element, priority);
      let q = items.get(this);
      let added = false;

      for (let i = 0; i < q.length; i++) {
        if (queueElement.priority < q[i].priority) {
          q.splice(i, 0, queueElement);
          added = true;
          break;
        }
      }

      if (!added) {
        q.push(queueElement);
      }
    };

    print() {
      let q = items.get(this);
      for (let i = 0; i < q.length; i++) {
        console.log(`${q[i].element} : ${q[i].priority}`);
      }
    };

    dequeue() {
      let q = items.get(this);
      return q.shift();
    };

    front() {
      let q = items.get(this);
      return q[0];
    };

    isEmpty() {
      let q = items.get(this);
      return q.length === 0;
    };

    size() {
      let q = items.get(this);
      return q.length;
    };

    clear() {
      items.set(this, [])
    };
  }

  return PriorityQueue;
})();

let queue = new PriorityQueue();

console.log(queue.isEmpty()); // true
queue.enqueue('John', 2);
queue.enqueue('Jack', 1);
queue.enqueue('tian', 3);
queue.print();
// Jack: 1
// John: 2
// tian: 3

console.log(queue.size()); // 3
console.log(queue.isEmpty()); // false
console.log(queue.dequeue());
// QueueElement { element: 'Jack', priority: 1 }
console.log(queue.dequeue());
// QueueElement { element: 'John', priority: 2 }
queue.print(); // tian : 3
