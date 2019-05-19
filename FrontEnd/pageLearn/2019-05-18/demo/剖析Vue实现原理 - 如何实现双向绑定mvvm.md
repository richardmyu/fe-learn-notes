# 剖析 Vue 实现原理 - 如何实现双向绑定 mvvm

## 几种实现双向绑定的做法

目前几种主流的 mvc(vm) 框架都实现了单向数据绑定，而我所理解的双向数据绑定无非就是在单向绑定的基础上给可输入元素（input、textare 等）添加了 change(input) 事件，来动态修改 model 和 view，并没有多高深。所以无需太过介怀是实现的单向或双向绑定。

实现数据绑定的做法有大致如下几种：

- 发布-订阅模式（backbone.js）

- 脏值检查（angular.js）

- 数据劫持（vue.js）

**发布-订阅模式**: 一般通过 sub, pub 的方式实现数据和视图的绑定监听，更新数据方式通常做法是 `vm.set('property', value)`，这里有篇文章讲的比较详细，有兴趣可点[这里](http://www.html-js.com/article/Study-of-twoway-data-binding-JavaScript-talk-about-JavaScript-every-day)

这种方式现在毕竟太 low 了，我们更希望通过 `vm.property = value` 这种方式更新数据，同时自动更新视图，于是有了下面两种方式

**脏值检查**: angular.js 是通过脏值检测的方式比对数据是否有变更，来决定是否更新视图，最简单的方式就是通过 `setInterval()` 定时轮询检测数据变动，当然 Google 不会这么 low，angular 只有在指定的事件触发时进入脏值检测，大致如下：

- DOM 事件，譬如用户输入文本，点击按钮等。( ng-click )
- XHR 响应事件 ( `$http` )
- 浏览器 Location 变更事件 ( `$location` )
- Timer 事件( `$timeout` , `$interval` )
- 执行 `$digest()` 或 `$apply()`

**数据劫持**: vue.js 则是采用数据劫持结合发布者-订阅者模式的方式，通过 `Object.defineProperty()` 来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

## 思路整理

已经了解到 vue 是通过数据劫持的方式来做数据绑定的，其中最核心的方法便是通过 `Object.defineProperty()` 来实现对属性的劫持，达到监听数据变动的目的，无疑这个方法是本文中最重要、最基础的内容之一，如果不熟悉 defineProperty，猛戳 [这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)。整理了一下，要实现 mvvm 的双向绑定，就必须要实现以下几点：

- 1、实现一个数据监听器 Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者

- 2、实现一个指令解析器 Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数

- 3、实现一个 Watcher，作为连接 Observer 和 Compile 的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图

- 4、mvvm 入口函数，整合以上三者

![流程图](https://github.com/DMQ/mvvm/raw/master/img/2.png)

### 1.实现 Observer

我们知道可以利用 `Obeject.defineProperty()` 来监听属性变动 那么将需要 observe 的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter 和 getter 这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化。相关代码可以是这样：

```js
var data = { name: "kindeng" };
observe(data);
data.name = "dmq"; // 哈哈哈，监听到值变化了 kindeng --> dmq

function observe(data) {
  if (!data || typeof data !== "object") {
    return;
  }
  // 取出所有属性遍历
  Object.keys(data).forEach(function(key) {
    defineReactive(data, key, data[key]);
  });
}

function defineReactive(data, key, val) {
  observe(val); // 监听子属性
  Object.defineProperty(data, key, {
    enumerable: true, // 可枚举
    configurable: false, // 不能再 define
    get: function() {
      return val;
    },
    set: function(newVal) {
      console.log("哈哈哈，监听到值变化了 ", val, " --> ", newVal);
      val = newVal;
    }
  });
}
```
