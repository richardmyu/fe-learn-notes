const Stack = (function () {
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
      return s.pop();
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

  return Stack;
})();

module.exports = Stack;
