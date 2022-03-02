//击鼓传花 -- 循环队列
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

function hotPotato(nameList, num) {
  let queue = new Queue();
  for (let i = 0; i < nameList.length; i++) {
    queue.enqueue(nameList[i]);
  }
  let eliminated = '';
  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue());
      // queue.print();
    }
    eliminated = queue.dequeue();
    console.log(eliminated + '在击鼓传花中被淘汰。');
  }
  return queue.dequeue();
}

let names = ['john', 'jack', 'camila', 'ingrid', 'carl'];
let winner = hotPotato(names, 9);
console.log('The winner is: ' + winner);
