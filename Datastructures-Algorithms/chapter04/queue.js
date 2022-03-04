const Queue = (function () {
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

    size() {
      let q = items.get(this);
      return q.length;
    }

    clear() {
      items.set(this, []);
    }

    print() {
      console.log(this.toString());
    }

    toString() {
      let q = items.get(this);
      return q.toString();
    }
  }

  return Queue;
})();

module.exports = Queue;
