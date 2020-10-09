// @ts-nocheck
import Vue from "vue";
import App from "./App.vue";
import Router from "vue-router";
import Foo from "./components/Foo.vue";
import Bar from "./components/Bar.vue";

// 局部注册
// const Bar11 = {
//   render() {
//     return "<div>Bar11</div>";
//   }
// };
// const Foo11 = {
//   render() {
//     return "<div>Foo11</div>";
//   }
// };

// Vue.extend()
const Bar11 = Vue.extend({
  render() {
    return "<div>Bar11</div>";
  }
});
const Foo11 = Vue.extend({
  render() {
    return "<div>Foo11</div>";
  }
});

// Vue.component("foo11", {
//   render() {
//     return "<div>foo11</div>";
//   }
// });
// Vue.component("bar11", {
//   render() {
//     return "<div>bar11</div>";
//   }
// });

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/foo",
      component: Foo
    },
    {
      path: "/foo11",
      component: Foo11
    },
    {
      path: "/bar",
      component: Bar
    },
    {
      path: "/bar11",
      component: Bar11
    }
  ]
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
