import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import vuex from "../store/index.js"

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import( '../views/Main.vue'),
    
    children:[
      {
        path: '/',
        name: 'Home',
        component: Home,
        beforeEnter:(to,from,next)=>{
          if(vuex.state.token=="" ){
            next("/login")
          }else {
            next()
          }
        },
      },
      {
        path: '/fen',
        name: 'fen',
        component: () => import( '../views/Fen.vue')
      },
      {
        path: '/carts',
        name: 'carts',
        component: () => import( '../views/Carts.vue')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import( '../views/My.vue')
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About.vue')
  },
  {
    path: '/indent',
    name: 'indent',
    component: () => import( '../views/Indent.vue')
  },
  {
    path: '/Address',
    name: 'Address',
    component: () => import( '../views/Address.vue')
  },
  {
    path: '/xinzeng',
    name: 'xinzeng',
    component: () => import( '../views/Xinzeng.vue')
  },
  {
    path: '/xiugai',
    name: 'xiugai',
    component: () => import( '../views/Xiugai.vue')
  },
  {
    path: '/paymoney',
    name: 'paymoney',
    component: () => import( '../views/Paymoney.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import( '../views/Search.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/Login.vue'),
    beforeEnter:(to,from,next)=>{
      if(vuex.state.token=="" ){
        next()
      }else {
        next("/")
      }
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
