//用ES6的WeakMap实现类
//WeakMap可以确保属性私有
//WeakMap可以存储键值对，键是对象，值是任意数据类型
const items = new WeakMap();

class Stack {
  constructor() {
    //以this(Stack类的自引用)为键，把代表栈的数组存入items
    items.set(this, []);
  }

  push(ele) {
    //从weakmap中取出值
    let s = items.get(this);
    s.push(ele);
  }

  pop() {
    let s = items.get(this);
    let r = s.pop();
    return r;
  }

  peek() {
    let s = items.get(this);
    return s[s.length - 1];
  }

  isEmpty() {
    let s = items.get(this);
    return s.length === 0;
  }

  size() {
    let s = items.get(this);
    return s.length;
  }

  clear() {
    items.set(this, []);
  }

  print() {
    console.log(this.toString());
  }

  toString() {
    let s = items.get(this);
    return s.toString();
  }
}

let stack = new Stack();
stack.push(2);
stack.push(3);
stack.print(); //2,3,1

