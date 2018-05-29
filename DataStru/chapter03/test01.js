//Stack LIFO
//栈也用在编程语言的编译器和内存中保存变量、方法调用等。

//创建一个类来表示栈
function Stack() {
  //各种属性和方法的声明
  //创建一种数据结构来保存栈里的元素，选择数组
  let items = [];

//声明栈的方法
  //push(ele): 添加一个或几个新元素到栈顶
  //pop(): 移除栈顶的元素，同时返回被移除的元素
  //peek(): 返回栈顶的元素，不对栈顶做任何修改
  //isEmpty(): 如果栈里没有任何元素就返回true，否则返回false
  //clear(): 移除栈里的所有的元素
  //size(): 返回栈里的元素个数，这个方法和数组的length属性类似

  //push
  this.push = function (ele) {
    items.push(ele);
  };

  //pop
  this.pop = function (ele) {
    return items.pop();
  };

  //peek
  this.peek = function () {
    return items[items.length - 1];
  };

  //isEmpty
  this.isEmpty = function () {
    return items.length === 0;
  };

  //size
  this.size = function () {
    return items.length;
  };

  //clear
  this.clear = function () {
    items = [];
  };

  //print
  this.print = function () {
    console.log(items.toString());
  }
}


//使用Stack
let stack = new Stack();
console.log(stack.isEmpty()); //true
stack.push(3);
stack.push(5);
console.log(stack.peek()); //5

stack.push(11);
console.log(stack.size()); //3
console.log(stack.isEmpty()); //false

stack.push(12);
stack.pop();
stack.pop();
console.log(stack.size()); //2
stack.print(); //3,5


//ES6语法声明Stack

class Stack{
  constructor(){
    this.items=[];
  }
  push(ele){
    this.items.push(ele);
  }
}

/*
* 尽管代码看起来更简洁、更漂亮，变量却是公共的。ES6的类是基于原型的。虽然基于原型的类比基于函数的类更节省内存，也更适合创建多个实例，却不能够声明私有属性（变量）或方法。而且我们更希望stack类的用户只能访问暴露给类的方法。
*
* */


