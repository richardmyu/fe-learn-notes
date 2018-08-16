/*
* 双向链表
* 与普通链表不同，双向链表，一个链指向前一个元素，一个链指向后一个元素
* */

function DoublyLinkedList() {
  let Node = function (ele) {
    this.ele = ele;
    this.next = null;
    this.prev = null;
  };
  let length = 0;
  //tail:最后一项的引用
  let tail = null;
  let head = null;

  // head ---- prev -- current -- next ---- tail

  this.append = function (ele) {
    let node = new Node(ele);
    let current;
    if (head === null) {
      head = node;
      tail = node;
    } else {
      //双向指定
      tail.next = node;
      node.prev = tail;
      //更新tail
      tail = node;
    }
    length++;
  };

  this.insert = function (position, ele) {
    if (position >= 0 && position <= length) {
      let node = new Node(ele);
      let current = head;
      let previous;
      let index = 0;

      if (position === 0) {
        //空
        if (!current) {
          head = node;
          tail = node;
        } else {
          //非空
          node.next = current;
          current.prev = node;
          //head指向node
          head = node;
        }
      } else if (position === length) {
        current = tail;
        current.next = node;
        node.prev = current;
        tail = node;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;
        current.prev = node;
        node.prev = previous;
      }
      length++;
      return true;
    } else {
      return false;
    }
  };

  this.removeAt = function (position) {
    if (position > -1 && position < length) {
      let current = head;
      let previous;
      let index = 0;

      if (position === 0) {
        head = current.next;
        if (length === 1) {
          tail = null;
        } else {
          head.prev = null;
        }
      } else if (position === length - 1) {
        current = tail;
        tail = current.prev;
        tail.next = null;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }

        previous.next = current.next;
        current.next.prev = previous;
      }
      length--;
      return current.ele;
    } else {
      return null;
    }
  };

  this.remove = function (ele) {
    let index = this.indexOf(ele);
    return this.removeAt(index);
  };

  this.indexOf = function (ele) {
    let current = head;
    let index = -1;
    if (ele === current.ele) {
      return 0;
    }
    index++;
    while (current.next) {
      if (ele === current.ele) {
        return index;
      }
      current = current.next;
      index++;
    }
    if (ele === current.ele) {
      return index;
    }
    return -1;
  };

  this.isEmpty = function () {
    return length === 0;
  };

  this.size = function () {
    return length;
  }

  this.toString = function () {
    let current = head;
    let str = current ? current.ele : '';
    while (current && current.next) {
      current = current.next;
      str += ',' + current.ele;
    }
    return str;
  };

  this.inverseToString = function () {
    let current = tail;
    let str = current ? current.ele : '';
    while (current && current.prev) {
      current = current.prev;
      str += ',' + current.ele;
    }
    return str;
  };

  this.print = function () {
    console.log(this.toString());
  };

  this.printInverse = function () {
    console.log(this.inverseToString());
  };

  this.getHead = function () {
    return head;
  };

  this.getTail = function () {
    return tail;
  }
}

let list = new DoublyLinkedList();

list.append(15);
list.print();
list.printInverse();

list.append(16);
list.print();
list.printInverse();

list.append(17);
list.print();
list.printInverse();

list.insert(0,13);
list.print();
list.printInverse();

list.insert(4,18);
list.print();
list.printInverse();

list.insert(1,14);
list.print();
list.printInverse();

list.removeAt(0);
list.print();
list.printInverse();

list.removeAt(list.size()-1);
list.print();
list.printInverse();

list.removeAt(1);
list.print();
list.printInverse();

list.remove(16);
list.print();
list.printInverse();

list.remove(14);
list.print();
list.printInverse();

list.remove(17);
list.print();
list.printInverse();