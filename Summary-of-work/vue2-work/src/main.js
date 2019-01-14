// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "element-ui/lib/theme-chalk/index.css";

import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from "axios";
Vue.prototype.$axios = axios;
import ElementUI from "element-ui";
Vue.use(ElementUI, {
  size: "small",
  zIndex: 3000
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
