//1.用ES6的限定作用域Symbol实现类
let _items = Symbol();

class Stack {
  constructor() {
    this[_items] = [];
  }

  push(ele) {
    this[_items].push(ele);
  }

  //pop
  pop(ele) {
    return this[_items].pop();
  }

  //peek
  peek() {
    return this[_items][this[_items].length - 1];
  }

  //isEmpty
  isEmpty() {
    return this[_items].length === 0;
  }

  //size
  size() {
    return this[_items].length;
  }

  //clear
  clear() {
    this[_items] = [];
  }

  //print
  print() {
    console.log(this.toString());
  }

  //toString()
  toString() {
    return this[_items].toString();
  }
}

console.log(_items);//Symbol()
//这种方法创建了一个假的私有属性，因为ES6新增的Object.getOwnPropertySymbols方法能够取到类声明里面的所有symbols属性

//下面是一个破坏Stack类的例子
let stack = new Stack();
stack.push(2);
stack.push(3);
console.dir(stack); //Stack {Symbol(): Array(2)}
let objectSymbols = Object.getOwnPropertySymbols(stack);
console.log(objectSymbols.length); //1
console.log(objectSymbols); //[Symbol()]
console.log(objectSymbols[0]); //Symbol()
console.log(stack[objectSymbols[0]]); // [2, 3]
stack[objectSymbols[0]].push(1);
stack.print(); //2,3,1
