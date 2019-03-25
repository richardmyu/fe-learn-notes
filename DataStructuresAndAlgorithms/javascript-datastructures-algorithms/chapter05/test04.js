let DoublyLinkedList = (function () {
  class Node {
    constructor(ele) {
      this.ele = ele;
      this.prev = null;
      this.next = null;
    }
  }

  const length = new WeakMap();
  const head = new WeakMap();
  const tail = new WeakMap();

  class DoublyLinkedList {
    constructor() {
      length.set(this, 0);
      head.set(this, null);
      tail.set(this, null);
    }

    append(ele) {
      let node = new Node(ele);
      let current;
      let _tail;
      if (this.getHead() === null) {
        head.set(this, node);
        tail.set(this, node);
      } else {
        _tail = this.getTail();
        _tail.next = node;
        node.prev = _tail;
        tail.set(this, node);
      }
      let l = this.size();
      l++;
      length.set(this, l);
    }

    insert(position, ele) {
      if (position >= 0 && position <= this.size()) {
        let node = new Node(ele);
        let current = this.getHead();
        let previous;
        let index = 0;

        if (position === 0) {
          if (!this.getHead()) {
            head.set(this, node);
            tail.set(this, node);
          } else {
            node.next = current;
            current.prev = node;
            head.set(this, node);
          }
        } else if (position === this.size()) {
          current = tail;
          current.naxt = node;
          node.prev = current;
          tail.set(this, node);
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
        let l = this.size();
        l++;
        length.set(this, l);
        return true;
      } else {
        return false;
      }
    }

    removeAt(position, ele) {
      if (position > -1 && position < this.size()) {
        let _head = this.getHead();
        let _tail = this.getTail();
        let current = _head;
        let previous;
        let index = 0;
        if (position === 0) {
          _head = current.next;
          if (this.size() === 1) {
            _tail = null;
          } else {
            _head.prev = null;
          }
        } else if (position === this.size() - 1) {
          current = _tail;
          _tail = current.prev;
          _tail.next = null;
        } else {
          while (index++ < position) {
            previous = current;
            current = current.next;
          }
          previous.next = current.next;
          current.next.prev = previous;
        }
        head.set(this, _head);
        tail.set(this, _tail);
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
    }

    isEmpty() {
      return this.size() === 0;
    }

    size() {
      return length.get(this);
    }

    toString() {
      let current = this.getHead();
      let str = current ? current.ele : '';
      while (current && current.next) {
        current = current.next;
        str += ',' + current.ele;
      }
      return str;
    }

    inverseToString() {
      let current = this.getTail();
      let str = current ? current.ele : '';
      while (current && current.prev) {
        current = current.prev;
        str += ',' + current.ele;
      }
      return str;
    }

    print() {
      console.log(this.toString());
    }

    printInverse() {
      console.log(this.inverseToString());
    }

    getHead() {
      return head.get(this);
    }

    getTail() {
      return tail.get(this);
    }
  }

  return DoublyLinkedList;
})();

let list = new DoublyLinkedList();

list.append(15);
list.print();//15
list.printInverse();//15

list.append(16);
list.print();//15,16
list.printInverse();//16,15

list.append(17);
list.print();//15,16,17
list.printInverse();//17,16,15

list.insert(0, 13);
list.print();//13,15,16,17
list.printInverse();//17,16,15,13

list.insert(4, 18);
list.print();//13,15,16,17
list.printInverse();//18,

list.insert(1, 14);
list.print();
list.printInverse();

list.removeAt(0);
list.print();
list.printInverse();

list.removeAt(list.size() - 1);
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

