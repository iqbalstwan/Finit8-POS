import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import History from '../views/History.vue'
import Axios from '../views/Axios.vue'
import Lifecycle from '../views/Lifecycle.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/axios',
    name: 'Axios',
    component: Axios
  },
  {
    path: '/history',
    name: 'History',
    component: History
  },
  {
    path: '/Lifecycle',
    name: 'Lifecycle',
    component: Lifecycle
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
