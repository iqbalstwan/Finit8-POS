import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import History from '../views/History.vue'
import Axios from '../views/Axios.vue'
import Lifecycle from '../views/Lifecycle.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'

import store from '../store/index'
import Product from '../views/mainTest/Product.vue'
import Setting from '../views/Setting.vue'
import Admin from '../views/Admin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },

  {
    path: '/axios',
    name: 'Axios',
    component: Axios
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    meta: { requiresAuth: true }
  },
  {
    path: '/Lifecycle',
    name: 'Lifecycle',
    component: Lifecycle
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    meta: { requiresPublic: true }
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register,
    meta: { requiresPublic: true }
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,
    meta: { requiresAuth: true }
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLogin) {
      next({ path: '/login' })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresPublic)) {
    if (store.getters.isLogin) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
