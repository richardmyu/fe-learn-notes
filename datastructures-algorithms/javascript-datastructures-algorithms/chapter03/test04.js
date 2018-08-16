//items在Stack类中是真正的私有属性，但却是在Stack以外定义的，因此仍然会被改动。我们需要一个闭包
let Stack = (function () {
  const items = new WeakMap();

  class Stack {
    constructor() {
      items.set(this, []);
    }

    push(ele) {
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

  //调用构造函数时，会返回一个Stack类的实例
  return Stack;
})();

//虽然实现了私有属性，但扩展类无法继承私有属性
//事实上，尽管ES6引入了类的语法，我们任然不能像在其他编程语言中一样声明私有属性或方法。有很多种方法都可以达到相同的效果，但无论是语法还是性能，这些方法都会有各自的优缺点。