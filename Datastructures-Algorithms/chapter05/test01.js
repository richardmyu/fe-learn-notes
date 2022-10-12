// 创建链表
function LinkedList() {

  // Node 辅助类，表示要加入的项
  let Node = function (ele) {
    // ele : 存储值
    this.ele = ele;

    // next : 指针
    this.next = null;
  };

  // 私有变量 length、head
  let length = 0;

  // 将第一个节点的引用存入 head
  let head = null;

  // 向列表末尾添加一个新项
  this.append = function (ele) {
    let node = new Node(ele);
    let current;
    if (head === null) {
      // 如果链表为空，则将 head 指向 node
      head = node;
    } else {
      // 链表不为空，即向列表添加元素
      // 拿到第一个元素的引用
      // 此时 current 为第一个元素
      current = head;

      // 根据第一个元素的 next
      // 循环找到最后一个元素
      while (current.next) {
        // current.next 为 null，则到了最后一个元素
        // 因为最后一个元素的下一个节点始终是 null
        // 所以最后一个元素的指针也是指向 null
        // 将最后一项的引用存入 current, 作为循环增量
        current = current.next;
      }

      // 将最后一项的 next 赋为 node，建立连接
      current.next = node;
    }
    // 更新列表的长度
    length++;
  };

  // 向列表的特定位置插入一个新的项
  this.insert = function (position, ele) {
    // 检查越界值
    if (position >= 0 && position <= length) {
      let node = new Node(ele);
      let current = head;
      let previous;
      let index = 0;

      if (position === 0) {
        // 添加在首位，将第一项的引用给新的第一项
        node.next = current;

        // 将 head 指向新项
        head = node;
      } else {
        // 循环，拿到待插入位置的一个引用
        while (index++ < position) {

          // 将前一项放入 previous
          previous = current;

          // 占据待插入位置的元素--即当前元素
          current = current.next;
        }

        // 将占据插入项位置的元素的指针赋给插入项
        node.next = current;

        // 将前一项指向插入项
        previous.next = node;
      }
      length++;
      return true;
    } else {
      return false;
    }
  };

  // 从列表特定位置移除一个项（根据指针）
  this.removeAt = function (position) {

    // 检查越界值（确定位置是有效的，否则返回 null)
    if (position > -1 && position < length) {
      let current = head;
      let previous;
      let index = 0;

      if (position === 0) {
        // 移除第一项
        head = current.next;
      } else {
        // 移除非第一项，拿到指向删除项的指针
        while (index++ < position) {
          // 将删除项的前一项的引用赋给 previous
          previous = current;

          // 当前元素的引用
          current = current.next;
        }

        // current.next 删除项的指针
        // previous.next 删除项的前一项的指针
        // 所谓删除就是，丢掉指向该项的指针，并拿到该项的指针
        previous.next = current.next;
      }
      length--;
      return current.ele;
    } else {
      return null;
    }
  };

  // 从列表移除一项（根据元素）
  this.remove = function (ele) {
    let index = this.indexOf(ele);
    return this.removeAt(index);
  };

  // 返回元素索引，找不到返回-1
  this.indexOf = function (ele) {
    let current = head;
    let index = 0;
    while (current) {
      if (ele === current.ele) {
        return index;
      }
      index++;
      current = current.next;
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

  // 覆盖继承的 toString，只输出元素的值
  this.toString = function () {
    let current = head;
    let str = '';
    while (current) {
      str += current.ele + (current.next ? ',' : '');
      current = current.next;
    }
    return str;
  };

  this.print = function () {
    console.log(this.toString());
  };
}


let list = new LinkedList();
list.append(15);
list.append(14);
list.append(13);
list.append(12);
list.append(11);
list.print(); // 15,14,13,12,11
console.log(list.indexOf(15)); // 0
console.log(list.indexOf(11)); // 4
list.insert(0, 16);
list.print(); // 16,15,14,13,12,11
list.insert(1, 17);
list.print(); // 16,17,15,14,13,12,11
list.remove(16);
list.remove(11);
list.print(); // 17,15,14,13,12
list.remove(18);
list.print(); // 17,15,13,14
