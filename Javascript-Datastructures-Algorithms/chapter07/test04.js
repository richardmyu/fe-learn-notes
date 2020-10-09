//1.分离链接
//为散列表的每一个位置创建一个链表并将元素存储在里面
//优点：最简单
//缺点：需要额外的空间

//引入LinkedList
let LinkedList = (function () {
  class Node {
    constructor(ele) {
      this.ele = ele;
      this.next = null;
    }
  }
  const length = new WeakMap();
  const head = new WeakMap();

  class LinkedList {
    constructor() {
      length.set(this, 0);
      head.set(this, null);
    }
    append(ele) {
      let node = new Node(ele);
      let current;
      if (this.getHead() === null) {
        head.set(this, node);
      } else {
        current = this.getHead();
        while (current.next) {
          current = current.next;
        }
        current.next = node;
      }
      let l = this.size();
      l++;
      length.set(this, l);
    }
    insert(position, ele) {
      if (position >= 0 && position <= this.size()) {
        let node = new Node(ele);
        let current = this.getHead();
        let prev;
        let index = 0;
        if (position === 0) {
          node.next = current;
          head.set(this, node);
        } else {
          while (index++ < position) {
            prev = current;
            current = current.next;
          }
          node.next = current;
          prev.next = node;
        }
        let l = this.size();
        l++;
        length.set(this, l);
        return true;
      } else {
        return false;
      }
    }
    removeAt(position) {
      if (position > -1 && position < this.size()) {
        let current = this.getHead();
        let prev;
        let index = 0;
        if (position === 0) {
          head.set(this,current.next);
        } else {
          while (index++ < position) {
            prev = current;
            current = current.next;
          }
          prev.next = current.next;
        }
        let l = this.size();
        l--;
        length.set(this, l);
        return current.ele;
      } else {
        return null;
      }
    }
    remove(ele) {
      let index = this.indexOf(ele);
      return this.removeAt(index);
    }
    indexOf(ele) {
      let current = this.getHead();
      let index = 0;
      while (current) {
        if (ele === current.ele) {
          return index;
        }
        index++;
        current = current.next;
      }
      return -1;
    }
    isEmpty() {
      return this.size() === 0;
    }
    size() {
      return length.get(this);
    }
    getHead() {
      return head.get(this);
    }
    toString() {
      let current = this.getHead();
      let str = '';
      while (current) {
        str += current.ele + (current.next ? ',' : '');
        current = current.next;
      }
      return str;
    }
    print() {
      console.log(this.toString());
    }
  }
  return LinkedList;
})();

function HashTableSeparateChaining() {
  let table = [];

  //为了实现分离链接，添加一个新的辅助类：ValuePair
  let ValuePair = function (key, value) {
    this.key = key;
    this.value = value;
    this.toString = function () {
      return '[' + this.key + ' - ' + this.value + ']';
    }
  };

  let loseloseHashCode = function (key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 37;
  };

  let hashCode = function (key) {
    return loseloseHashCode(key);
  };

  //重写put、get、remove
  this.put = function (key, value) {
    let position = hashCode(key);
    console.log(position + ' - ' + key);

    if (table[position] === undefined) {
      table[position] = new LinkedList();
    }
    table[position].append(new ValuePair(key, value));
  };

  this.get = function (key) {
    let position = hashCode(key);

    if (table[position] !== undefiend && !table[position].isEmpty()) {

      let current = table[position].getHead();

      do {
        if (current.element.key === key) {
          return current.element.value;
        }
        current = current.next;
      } while (current);
    }
    return undefined;
  };

  this.remove = function (key) {
    let position = hasCode(key);

    if (table[position] !== undefined) {
      let current = table[position].getHead();
      do {
        if (current.element.key === key) {
          table[position].remove(current.element);
          if (table[position].isEmpty()) {
            table[position] = undefined;
          }
          return true;
        }
        current = current.next;
      } while (current);
    }
    return false;
  };

  this.print = function () {
    for (let i = 0; i < table.length; i++) {
      if (table[i] !== undefined) {
        console.log(table[i].toString());
      }
    }
  }
};

let hash = new HashTableSeparateChaining();
hash.put('Gandalf', 'gandalf@email.com');//19 - Gandalf
hash.put('John', 'john@email.com');//29 - John
hash.put('Tyrion', 'tyrion@eamil.com');//16 - Tyrion
hash.put('Aaron', 'aaron@email.com');//16 - Aaron
hash.put('Donna', 'donna@email.com');//15 - Donna
hash.put('Ana', 'Ana@email.com');//13 - Ana
hash.put('Jonathan', 'jonathan@email.com');//5 - Jonathan
hash.put('Jamie', 'Jamie@email.com');//5 - Jamie
hash.put('Sue', 'sue@email.com');//5 - Sue
hash.put('Mindy', 'mindy@email.com');//32 - Mindy
hash.put('Paul', 'paul@email.com');//32 - Paul
hash.put('Nathan', 'nathan@email.com');//10 - Nathan

hash.print();
//[Jonathan - jonathan@email.com],[Jamie - Jamie@email.com],[Sue - sue@email.com]
// test04.js:199 [Nathan - nathan@email.com]
// test04.js:199 [Ana - Ana@email.com]
// test04.js:199 [Donna - donna@email.com]
// test04.js:199 [Tyrion - tyrion@eamil.com],[Aaron - aaron@email.com]
// test04.js:199 [Gandalf - gandalf@email.com]
// test04.js:199 [John - john@email.com]
// test04.js:199 [Mindy - mindy@email.com],[Paul - paul@email.com]