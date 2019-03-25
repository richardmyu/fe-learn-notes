function CircularLinkedList() {
  let Node = function (ele) {
    this.ele = ele;
    this.next = null;
  };
  let length = 0;
  let head = null;

  this.append = function (ele) {
    let node = new Node(ele);
    let current;

    if (head === null) {
      head = node;
    } else {
      current = head;
      while (current.next !== head) {
        current = current.next;
      }
      current.next = node;
    }
    node.next = head;
    length++;
  };

  this.insert = function (position, ele) {
    if (position >= 0 && position <= length) {
      let node = new Node(ele);
      let current = head;
      let previous;
      let index = 0;
      if (position === 0) {
        if (!head) {
          head = node;
          node.next = head;
        } else {
          node.next = current;
          while (current.next !== head) {
            current = current.next;
          }
          head = node;
          current.next = head;
        }
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;
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
        while (current.next !== head) {
          current = current.next;
        }
        head = head.next;
        current.next = head;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
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
    while (current.next !== head) {
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
  };

  this.getHead = function () {
    return head;
  };

  this.toString = function () {
    let current = head;
    let str = current.ele;
    while (current.next !== head) {
      current = current.next;
      str += ',' + current.ele;
    }
    return str.toString();
  };

  this.print = function () {
    console.log(this.toString());
  };
}

let circularLinkedList = new CircularLinkedList();

circularLinkedList.append(15);
circularLinkedList.print();//15

circularLinkedList.append(16);
circularLinkedList.print();//15,16

circularLinkedList.insert(0,14);
circularLinkedList.print();//14,15,16

circularLinkedList.insert(1,14.5);
circularLinkedList.print();//14,14.5,15,16

circularLinkedList.insert(4,17);
circularLinkedList.print();//14,14.5,15,16,17

circularLinkedList.removeAt(0);

circularLinkedList.print();//14.5,15,16,17

circularLinkedList.removeAt(1);
circularLinkedList.print();//14.5,16,17

circularLinkedList.removeAt(2);
circularLinkedList.print();//14.5,16

console.log(circularLinkedList.indexOf(14.5));//0
console.log(circularLinkedList.indexOf(16));//1