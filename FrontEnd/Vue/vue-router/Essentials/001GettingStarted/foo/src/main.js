// @ts-nocheck
import Vue from "vue";
import App from "./App.vue";
import Router from "vue-router";

import Foo from "./components/Foo.vue";
import Bar from "./components/Bar.vue";

Vue.use(Router);

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

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
