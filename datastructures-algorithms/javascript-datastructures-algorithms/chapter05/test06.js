let CircularLinkedList = (function () {
  class Node {
    constructor(ele) {
      this.ele = ele;
      this.next = null;
    }
  }

  const length = new WeakMap();
  const head = new WeakMap();

  class CircularLinkedList {
    constructor() {
      length.set(this, 0);
      head.set(this, null);
    }

    append = function (ele) {
      let node = new Node(ele);
      let current;

      if (this.getHead() === null) {
        head.set(this, node);
      } else {
        current = this.getHead();
        while (current.next !== this.getHead()) {
          current = current.next;
        }
        current.next = node;
      }
      node.next = this.getHead();
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
            node.next = this.getHead();
          } else {
            node.next = this.getHead();
            while (current.next !== this.getHead()) {
              current = current.next;
            }
            head.set(this, node);
            current.next = this.getHead();
          }
        } else {
          while (index++ < position) {
            previous = current;
            current = current.next;
          }
          node.next = current;
          previous.next = node;
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
        let previous;
        let index = 0;

        if (position === 0) {
          while (current.next !== this.getHead()) {
            current = current.next;
          }
          head.set(this, this.getHead().next);
          current.next = this.getHead();
        } else {
          while (index++ < position) {
            previous = current;
            current = current.next;
          }
          previous.next = current.next;
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
      let index = -1;
      if (ele === current.ele) {
        return 0;
      }
      index++;
      while (current.next !== this.getHead()) {
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
      return length.set(this);
    }

    getHead() {
      return head.get(this);
    }

    toString() {
      let current = this.getHead();
      let str = current.next;
      while (current.next !== this.getHead()) {
        current = current.next;
        str += ',' + current.ele;
      }
      return str.toString();
    }

    print() {
      console.log(this.toString());
    }
  }

  return CircularLinkedList;
})();

let circularLinkedList = new CircularLinkedList();

circularLinkedList.append(15);
circularLinkedList.print();//15

circularLinkedList.append(16);
circularLinkedList.print();//15,16

circularLinkedList.insert(0, 14);
circularLinkedList.print();//14,15,16

circularLinkedList.insert(1, 14.5);
circularLinkedList.print();//14,14.5,15,16

circularLinkedList.insert(4, 17);
circularLinkedList.print();//14,14.5,15,16,17

circularLinkedList.removeAt(0);

circularLinkedList.print();//14.5,15,16,17

circularLinkedList.removeAt(1);
circularLinkedList.print();//14.5,16,17

circularLinkedList.removeAt(2);
circularLinkedList.print();//14.5,16

console.log(circularLinkedList.indexOf(14.5));//0
console.log(circularLinkedList.indexOf(16));//1