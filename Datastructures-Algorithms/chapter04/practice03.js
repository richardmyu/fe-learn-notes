/**
 * 循环队列 -- 击鼓传花
 */

const Queue = require('./queue.js');

function hotPotato(nameList, num) {
  let queue = new Queue();

  for (let i = 0; i < nameList.length; i++) {
    queue.enqueue(nameList[i]);
  }

  let eliminated = '';

  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue());
    }

    eliminated = queue.dequeue();
    console.log(eliminated + ' 在击鼓传花中被淘汰。');
  }
  return queue.dequeue();
}

let names = ['john', 'jack', 'camila', 'ingrid', 'carl'];
let winner = hotPotato(names, 9);
console.log('赢家是: ' + winner);
