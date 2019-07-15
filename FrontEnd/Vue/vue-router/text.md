# vue-router

## 起步

使用 Vue.js ，我们已经可以通过组合组件来组成应用程序，当你要把 Vue Router 添加进来，我们需要做的是，将组件 (components) 映射到路由 (routes)，然后告诉 Vue Router 在哪里渲染它们。<a href="./Essentials/001GettingStarted/index.html">demo</a>

使用 router-link 组件来导航，通过传入 `to` 属性指定链接。`<router-link>` 默认会被渲染成一个 `<a>` 标签。使用 router-view 作路由出口。

要注意，当 `<router-link>` 对应的路由匹配成功，将自动设置 class 属性值 `.router-link-active`。
