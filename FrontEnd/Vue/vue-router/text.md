# vue-router

## 起步

使用 Vue.js ，我们已经可以通过组合组件来组成应用程序，当你要把 Vue Router 添加进来，我们需要做的是，将组件 (components) 映射到路由 (routes)，然后告诉 Vue Router 在哪里渲染它们。<a href="./Essentials/001GettingStarted/index.html">demo</a>

使用 router-link 组件来导航，通过传入 `to` 属性指定链接。`<router-link>` 默认会被渲染成一个 `<a>` 标签。使用 router-view 作路由出口。

要注意，当 `<router-link>` 对应的路由匹配成功，将自动设置 class 属性值 `.router-link-active`。

**小结**

1.路由注册

```js
// 001 引入(定义)组件
import Foo from "./components/Foo.vue";
import Bar from "./components/Bar.vue";
// #or
const Foo = { template: "<div>foo</div>" };
const Bar = { template: "<div>bar</div>" };

// 002 引入 vue-router 并注册
import Router from "vue-router";
Vue.use(Router);

// 003 定义路由实例
const router = new Router({
  routes: [
    {
      path: "/foo",
      component: Foo
    },
    {
      path: "/bar",
      component: Bar
    }
  ]
});

// 004 注入根实例
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
```

2.路由调用

```js
// 001 定义路由
<router-link to="/foo">go to foo</router-link>
<router-link to="/bar">go to bar</router-link>

// 002 定义路由出口
<router-view></router-view>
```
