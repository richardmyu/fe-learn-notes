## 起步

**要点 1**：什么叫路由

指根据 URL 分配到对应的处理程序。

路由的概念来源于服务端，在服务端中路由描述的是 URL 与处理函数之间的映射关系。

在 Web 前端单页应用 SPA(Single Page Application)中，路由描述的是 URL 与 UI 之间的映射关系，这种映射是单向的，即 URL 变化引起 UI 更新（无需刷新页面）。

**拓展 1**：如何实现前端路由？

要实现前端路由，需要解决两个核心问题：

- 如何改变 URL 却不引起页面刷新？
- 如何检测 URL 变化了？

下面分别使用 `hash` 和 `history` 两种实现方式回答上面的两个核心问题。

- `hash` 实现
  >
  1. `hash` 是 URL 中 `hash` (`#`) 及后面的那部分，常用作锚点在页面内进行导航，改变 URL 中的 `hash` 部分不会引起页面刷新；
  >
  2. 通过 `hashchange` 事件监听 URL 的变化，改变 URL 的方式只有这几种：
    >
    - 通过浏览器前进后退改变 URL；
    >
    - 通过标签改变 URL；
    >
    - 通过 `window.location` 改变URL；

> 这几种情况改变 URL 都会触发 `hashchange` 事件；

- `history` 实现
  >
  1. `history` 提供了 `pushState` 和 `replaceState` 两个方法，这两个方法改变 URL 的 `path` 部分不会引起页面刷新；
  >
  2. `history` 提供类似 `hashchange` 事件的 `popstate` 事件，但 `popstate` 事件有些不同：通过浏览器前进后退改变 URL 时会触发 `popstate` 事件，通过 `pushState/replaceState` 或标签改变 URL 不会触发 `popstate` 事件。好在我们可以拦截 `pushState/replaceState` 的调用和标签的点击事件来检测 URL 变化，所以监听 URL 变化可以实现，只是没有 `hashchange` 那么方便。

> 需要注意的是调用 `history.pushState()` 或 `history.replaceState()` 不会触发 `popstate` 事件。只有在做出浏览器动作时，才会触发该事件，如用户点击浏览器的回退按钮（或者在 Javascript 代码中调用 `history.back()`）。
> 不同的浏览器在加载页面时处理 `popstate` 事件的形式存在差异。页面加载时 Chrome 和 Safari 通常会触发(emit )`popstate` 事件，但 Firefox 则不会。

---

- `hash` 路由实现: 兼容性比较好，url 比较丑陋，不能使用浏览器栈操作前进后退；
- `history` 路由实现: 比较直观，需要服务器端配合，用户体验好，响应快，不需要每次发送服务器请求，通过操作浏览器历史栈完成页面跳转，低版本浏览器不支持 H5 特性，建议使用 `hash`；


URL 上的 `hash` 本意是用来作锚点的，方便用户在一个很长的文档里进行上下的导航，用来做 SPA 的路由控制并非它的本意。然而，`hash` 满足这么一种特性：改变 URL 的同时，不刷新页面，再加上浏览器也提供 `onhashchange` 这样的事件监听，因此，`hash` 能用来做路由控制。

**要点 2**：`$router`/`$route`

> 通过注入路由器，我们可以在任何组件内通过 `this.$router` 访问【路由器】，也可以通过 `this.$route` 访问【当前路由】。

```js
// 全局路由
$router:  VueRouter
  afterHooks: []
  app: Vue {_uid: 0, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: Vue, …}
  apps: [Vue]
  beforeHooks: []
  fallback: false
  history: HashHistory {router: VueRouter, base: "", current: {…},   pending: null, ready: true, …}
  matcher: {match: ƒ, addRoutes: ƒ}
  mode: "hash"
  options: {routes: Array(2)}
  resolveHooks: []
  currentRoute: (...)
  __proto__: Object
    addRoutes: ƒ addRoutes(routes)
    afterEach: ƒ afterEach(fn)
    back: ƒ back()
    beforeEach: ƒ beforeEach(fn)
    beforeResolve: ƒ beforeResolve(fn)
    forward: ƒ forward()
    getMatchedComponents: ƒ getMatchedComponents(to)
    go: ƒ go(n)
    init: ƒ init(app /* Vue component instance */)
    match: ƒ match(raw, current, redirectedFrom)
    onError: ƒ onError(errorCb)
    onReady: ƒ onReady(cb, errorCb)
    push: ƒ push(location, onComplete, onAbort)
    replace: ƒ replace(location, onComplete, onAbort)
    resolve: ƒ resolve( to, current, append )
    constructor: ƒ VueRouter(options)
    currentRoute: (...)
    get currentRoute: ƒ ()
    __proto__: Object

// 当前路由
$route:
  fullPath: "/bar"
  hash: ""
  matched: [{…}]
  meta: {}
  name: undefined
  params: {}
  path: "/bar"
  query: {}
  __proto__: Object
```

- `$router`：表示全局路由器对象，项目中通过 `router` 路由参数注入路由之后，在任何一个页面都可以通过此方法获取到路由器对象，并调用其 `push`, `go` 等方法；
- `$route`：一个路由对象 (route object) ，表示当前激活的路由的状态信息，包含了当前 URL 解析得到的信息，还有 URL 匹配到的路由记录 (route records)。

> 路由对象是不可变 (immutable) 的，每次成功的导航后都会产生一个新的对象。

[Web 前端路由原理解析和实现](https://zhuanlan.zhihu.com/p/88895539)
