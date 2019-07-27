import Vue from 'vue'
import vueRouter from 'vue-router'
Vue.use(vueRouter)
const router = new vueRouter({
  routes: [
    {
      path: '/',
      name: '首页'
    },
    {
      path: '/learncom',
      name: 'learnCom',
      component: () => import('../components/learnCom.vue')
    },
    {
      path: '/learnnocom',
      name: 'learnNoCom',
      component: () => import('../components/learnNoCom.vue')
    },
    {
      path: '/propcom',
      name: 'propCom',
      component: () => import('../components/PropCom.vue')
    },
    {
      path: '/propstreamcom',
      name: 'propStreamCom',
      component: () => import('../components/PropStreamCom.vue')
    },
    {
      path: '/propsingle',
      name: 'propSingle',
      component: () => import('../components/propSingle.vue')
    }
  ]
})
console.log(router);

export default router
