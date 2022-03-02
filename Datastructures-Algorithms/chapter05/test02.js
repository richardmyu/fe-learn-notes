//ES6
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
          head.set(this, current.next);
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

let list = new LinkedList();
list.append(15);
list.print();//15
console.log(list.indexOf(15));//0
list.append(10);
list.print();//15,10
console.log(list.indexOf(10));
list.append(13);//1
list.print();//15,10,13
console.log(list.indexOf(13));//2
console.log(list.indexOf(10));//1
list.append(11);
list.append(12);
list.print();//15,10,13,11,12
console.log(list.removeAt(1));//10
list.print();//15,13,11,12
console.log(list.removeAt(3));//12
list.print();//15,13,11
list.append(14);
list.print();//15,13,11,14
list.insert(0, 16);
list.print();//16,15,13,11,14
list.insert(1, 17);
list.print();//16,17,15,13,11,14
list.insert(list.size(), 18);
list.print();//16,17,15,13,11,14,18
list.remove(16);
list.print();//17,15,13,11,14,18
list.remove(11);
list.print();//17,15,13,14,18
list.remove(18);
list.print();//17,15,13,14
