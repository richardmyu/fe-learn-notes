//从十进制到二进制
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

  return Stack;
})();

function divideBy2(decNumber) {
  var remStack = new Stack();
  var rem;
  var binaryString = '';
  while (decNumber > 0) {
    rem = Math.floor(decNumber % 2);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / 2);
  }
  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString();
  }
  return binaryString;
}

console.log(divideBy2(233));//11101001
console.log(divideBy2(10));//1010
console.log(divideBy2(1000));//1111101000

//任意进制(16进制以内)
function baseConverter(decNumber, base) {
  var remStack = new Stack();
  var rem;
  var baseString = '';
  var digits = '0123456789ABCDEF';
  while (decNumber > 0) {
    rem = Math.floor(decNumber % base);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / base);
  }
  while (!remStack.isEmpty()) {
    baseString += digits[remStack.pop()];
  }
  return baseString;
}

console.log(baseConverter(100345, 2));//11000011111111001
console.log(baseConverter(100345, 8));//303771
console.log(baseConverter(100345, 16));//187F9