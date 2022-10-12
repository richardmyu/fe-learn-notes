# 关于 `this`

`this` 关键字是 JavaScript 中最复杂的机制之一。它是一个很特别的关键字，被 *自动定义在所有函数的作用域中*。

## 1.为什么要用 `this`

```js
function identify() {
  return this.name.toUpperCase();
}

function speak() {
  const greeting = "Hello, I'm " + identify.call(this);
  console.log(greeting);
}

const me = {
  name: "Kyle"
};

const you = {
  name: "Reader"
};

identify.call(me); // KYLE
identify.call(you); // READER

speak.call(me); // Hello, I'm KYLE
speak.call(you); // Hello, I'm READER
```

这段代码可以在不同的上下文对象（`me` 和 `you`）中重复使用函数 `identify` 和 `speak`，不用针对每个对象编写不同版本的函数。

如果不使用 `this` ，那就需要给 `identify` 和 `speak` 显式传入一个上下文对象。

```js
function identify(context) {
  return context.name.toUpperCase();
}

function speak(context) {
  const greeting = "Hello, I'm " + identify(context);
  console.log(greeting);
}

identify(you); // READER
speak(me); //Hello, I'm KYLE
```

然而，*`this` 提供了一种更优雅的方式来隐式“传递”一个对象引用，因此可以将 API 设计得更加简洁并且易于复用*。

> 随着模式越来越复杂，显式传递上下文对象会让代码变得越来越混乱，使用 `this` 则不会这样。

## 2.误解

太拘泥于 “`this`” 的字面意思就会产生一些误解。有两种常见的对于 `this` 的解释，但是它们都是错误的。

### 2.1.指向自身

人们很容易把 `this` 理解成指向函数自身，这个推断从英语的语法角度来说是说得通的。

```js
function foo(num) {
  console.log("foo: " + num);

  // 记录 foo 被调用的次数
  this.count++;
}

foo.count = 0;

const i;

for (i = 0; i < 10; i++) {
  if (i > 5) {
    foo(i);
  }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// foo 被调用了多少次？
console.log(foo.count); // 0
```

显然从字面意思来理解 `this` 是错误的。如果要从函数对象内部引用它自身，那只使用 `this` 是不够的。一般来说你需要通过一个指向函数对象的词法标识符（变量）来引用它。

> 有一种传统的但是现在已经被弃用和批判的用法，是使用 `arguments.callee` 来引用当前正在运行的函数对象。这是唯一一种可以从匿名函数对象内部引用自身的方法。然而，更好的方式是避免使用匿名函数，至少在需要自引用时使用具名函数（表达式）。`arguments.callee` 已经被弃用，不应该再使用它。

### 2.2.函数作用域

第二种常见的误解是，`this` 指向函数的作用域。这个问题有点复杂，因为在某种情况下它是正确的，但是在其他情况下它却是错误的。

需要明确的是，`this` 在任何情况下都不指向函数的词法作用域。在 JavaScript 内部，作用域确实和对象类似，可见的标识符都是它的属性。但是作用域“对象”无法通过 JavaScript 代码访问，它存在于 *JavaScript 引擎* 内部。

> 每当你想要把 `this` 和词法作用域的查找混合使用时，一定要提醒自己，这是无法实现的（使用 `this` 不可能在词法作用域中查到什么。）。

## 3.`this` 到底是什么

*`this` 是在运行时进行绑定的*，并不是在编写时绑定，它的上下文取决于函数调用时的各种条件。`this` 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。

当一个函数被调用时，会创建一个【活动记录】（有时候也称为 **执行上下文**）。这个记录会包含函数在哪里被调用（调用栈）、函数的调用方式、传入的参数等信息。`this` 就是这个记录的一个属性，会在函数执行的过程中用到。
