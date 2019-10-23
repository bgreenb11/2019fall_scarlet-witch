import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/devices',
      name: 'devices',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "devices" */ './views/Devices.vue')
    },
    {
      path: '/non-auto-light-task',
      name: 'nal',
      component: () => import( /* webpackChunkName: "nal" */ './components/forms/NonAutoLightTask.vue')
    },
    {
      path: '/device',
      name: 'device',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "device" */ './views/Device.vue')
    }
  ]
})