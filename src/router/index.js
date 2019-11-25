import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Recommend from '../views/Recommend.vue'
import Mypage from '../views/Mypage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/Recommend',
    name: 'Recommend',
    component: Recommend
  },
  {
    path: '/Mypage',
    name: 'Mypage',
    component: Mypage
  },
]

const router = new VueRouter({
  routes
})

export default router
