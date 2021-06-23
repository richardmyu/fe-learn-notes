# Vue

> 配合 [官方文档](https://cn.vuejs.org/v2/guide/) 食用 :yum::yum: 更好。

## 基础

### 安装

**编译器（Compiler）**

用来将模板字符串编译成为 JavaScript 渲染函数。

**运行时（Runtime）**

用来创建 Vue 实例、渲染并处理虚拟 DOM 等的代码。基本上就是除去编译器的其它一切。

> Runtime 描述了 软件/指令 在你的程序运行的时候是如何执行的, 尤其是你没有明确地写出来, 却对于正确执行代码是必须的那些指令。
> Runtime 是一个通用术语, 指代任何你的代码所运行的库, 框架或平台。

**内容安全策略( CSP )**

内容安全策略 (CSP) 是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站脚本 (XSS) 和数据注入攻击等。无论是数据盗取、网站内容污染还是散发恶意软件，这些攻击都是主要的手段。

> CSP 通过指定有效域——即浏览器认可的可执行脚本的有效来源——使服务器管理者有能力减少或消除 XSS 攻击所依赖的载体。一个 CSP 兼容的浏览器将会仅执行从白名单域获取到的脚本文件，忽略所有的其他脚本 (包括内联脚本和 HTML 的事件处理属性)。作为一种终极防护形式，始终不允许执行脚本的站点可以选择全面禁止脚本执行。
> 使用 `Content-Security-Policy` HTTP 头部来指定策略。

### 介绍

> Vue 的核心库只关注视图层。DOM 状态仅仅是数据状态的一个映射。

**渐进式框架（progressive framework）**

可以有选择的只使用其提供的部分功能；也可以用来完成一个完整的工程。

**自底向上逐层应用（from the ground up to be incrementally adoptable）**

框架做分层设计，每层都可选，不同层可以灵活接入其他方案。

![https://richyu.gitee.io/img_bed/doc/vue/intro_001.jpg](https://richyu.gitee.io/img_bed/doc/vue/intro_001.jpg)

[Vue2.0 中，“渐进式框架”和“自底向上增量开发的设计”这两个概念是什么？](https://www.zhihu.com/question/51907207)

**渲染**

- 独立构建：包含模板编译器，渲染过程：HTML字符串 → `render` 函数 → VNode → 真实 DOM 节点
- 运行时构建：不包含模板编译器，渲染过程：`render` 函数 → VNode → 真实 DOM 节点

提供了三种渲染模式，自定义 `render` 函数、`template`、`el` 均可以渲染页面，也就是对应我们使用 Vue 时，三种写法：

```js
// template 写法
let app = new Vue({
    template: `<div>{{ msg }}</div>`,
    data () {
        return {
            msg: ''
        }
    }
})

// el 写法
let app = new Vue({
    el: '#app',
    data () {
        return {
            msg: 'Hello Vue!'
        }
    }
})

// 自定义 render 函数
Vue.component('anchored-heading', {
    render: function (createElement) {
        return createElement (
            'h' + this.level,
            this.$slots.default
        )
    },
    props: {
        level: {
            type: Number,
            required: true
        }
    }
})
```

这三种渲染模式最终都是要得到 `render` 函数。只不过用户自定义的 `render` 函数省去了程序分析的过程，等同于处理过的 `render` 函数，而普通的 `template` 或者 `el` 只是字符串，需要解析成 AST，再将 AST 转化为 `render` 函数。

[Vue render函数](https://www.jianshu.com/p/7508d2a114d3)

**（vue）响应式**

Vue 最独特的特性之一，是其非侵入性的响应式系统。数据模型仅仅是普通的 JavaScript 对象。而当你修改它们时，视图会进行更新。



### vue 实例

**MVVM 模型**

MVVM 就是在前端页面上，应用了扩展的 MVC 模式，我们关心 Model 的变化，MVVM 框架自动把 Model 的变化映射到 DOM 结构上，这样，用户看到的页面内容就会随着 Model 的变化而更新。

[MVVM](https://www.liaoxuefeng.com/wiki/1022910821149312/1108898947791072)
[MVC，MVP 和 MVVM 的图示](http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html)

没有完全遵循 MVVM 模型：

1. Vue 允许通过指令、`$refs` 等直接操作 DOM，而不是完全通过 MVVM 模式要求的 ViewModel 自动映射 View。
2. Vue 的实例是一个 ViewModel，简单场景下直接吞并了 Model 的存在。在全局状态的场景下，Vuex 可以视为半个 Model。没有 Model 的 MVVM，是不完整的。

### 模板语法

**Mustache**

Mustache 是一种无逻辑的模板语法。 它可以用于 HTML、配置文件、源代码 - 任何东西。 它的工作原理是使用散列或对象中提供的值扩展模板中的标签。

我们称之为“无逻辑”，因为没有 `if` 语句、`else` 子句或 `for` 循环。 相反，只有标签。 一些标签替换为一个值，一些什么都没有，而另一些则替换为一系列值。

[mustache](https://mustache.github.io/mustache.5.html)

> [`{{ a++ }}` infinite update loop](https://github.com/richardmyu/frame-demo/blob/main/vue-family/vue/01essentials/004template-syntax/index-bug.html)

**指令**

带有特定前缀（`v-`）的特殊 `attribute`，会在渲染的 DOM 上应用特殊的响应式行为。

### 计算属性和侦听器

> 计算属性是基于它们的响应式依赖进行缓存的。

**响应式依赖**

以响应式数据（`vm.data.xx`）作为依赖。

> 当需要在数据变化时执行 异步 或 开销较大 的操作时，侦听器是最有用的。

### Class 与 Style 绑定

### 条件渲染

**key**

> Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。

提供了一种方式来表达“两个元素是完全独立的，不要复用它们”。

**template**

`v-show` 不支持 `<template>` 元素。默认情况下，`<template>` 是隐藏的，实际是默认其 `display` 属性为 `none`。

[HTML5 `<template>` 标签元素简介](https://www.zhangxinxu.com/wordpress/2014/07/hello-html5-template-tag/)

**v-if vs v-show**

当 `v-if` 指令对应的 `value` 为 `false` 的时候会预先创建一个注释节点在该位置，然后在 `value` 发生变化时，命中派发更新的逻辑，对新旧组件树进行 patch，从而完成使用 `v-if` 指令元素的动态显示隐藏。

```
         value=false       --------------
      -------------------->| 创建注释节点 |
      |                    --------------
      |
--------  value=true       -----------------
| v-if |------------------>| 触发派发更新逻辑 |
--------                   -----------------
                                  ⬇
                           ----------------------------
                           |patch　新旧组件　VNode tree |
                           ----------------------------
                                  ⬇
                           ----------------------------
                           | 更新 v-if 注释节点为真实元素 |
                           ----------------------------
```

```
           value=false       --------------------------
      ---------------------->| 设置元素 display 为 none |
      |                      --------------------------
      |
----------  value=true       ------------------------------------
| v-show |------------------>| 设置元素 display 为本身的 display 值 |
----------                   ------------------------------------
                                  ⬇                                 ----------------------------
                                  ⬇                         |------>| 注册 postRenderEffect 事件 |
                                  ⬇                         |       ----------------------------
                             ----------------------------   |
                             |        patchElement      |---|
                             ----------------------------   |       -----------------------------------------------
                                  ⬇                         |------>| postRenderEffect 事件进队 pendingPostFlushCbs |
                                  ⬇                                 -----------------------------------------------
                                  ⬇
                                  ⬇
                             ----------------------------
                             | 在 flushPostCbs           |           -------------------------------
                             | 执行 postRenderEffect 事件 |---------->| 执行 vShow 定义的 update hook |
                             ----------------------------            -------------------------------
                                                                                ⬇
                                                                     ----------------------------
                                                                     | 改变元素的 CSS display 属性 |
                                                                     ----------------------------
```

区别

- 手段：`v-if` 是动态的向 DOM 树内添加或者删除 DOM 元素；`v-show` 是通过设置 DOM 元素的 `display` 样式属性控制显隐；
- 编译过程：`v-if` 切换有一个 **局部编译/卸载** 的过程，切换过程中合适地 销毁和重建 内部的事件监听和子组件；`v-show` 只是简单的基于 css 切换；
- 编译条件：`v-if` 是 **惰性** 的，如果初始条件为假，则什么也不做；只有在条件第一次变为真时才开始局部编译（编译被缓存？编译被缓存后，然后再切换的时候进行局部卸载); `v-show` 是在任何条件下（首次条件是否为真）都被编译，然后被缓存，而且 DOM 元素保留；
- 性能消耗：`v-if` 有更高的切换消耗；`v-show` 有更高的初始渲染消耗；
- 使用场景：`v-if` 适合运行条件很少改变；`v-show` 适合频繁切换。

[Vue 3 中 v-if 和 v-show 指令实现的原理（源码分析）](https://segmentfault.com/a/1190000039005215)
[VUE中的v-if与v-show](https://www.cnblogs.com/wmhuang/p/5420344.html)
