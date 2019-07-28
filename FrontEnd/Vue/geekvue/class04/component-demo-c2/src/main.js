import Vue from 'vue'
import antd from 'ant-design-vue'
import ref from 'vue-ref'
import App from './App'
import router from './router/index'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false
Vue.use(antd)
Vue.use(ref, { name: 'ant-ref' })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
