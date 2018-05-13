import Vue from 'vue'
import Router from 'vue-router'
import api from '@/api/api'
import store from '@/vuex/store'
import * as types from '@/vuex/types'

const Home = r => require.ensure([], () => r(require('@/views/home/home')), 'home')
const Seller = r => require.ensure([], () => r(require('@/views/seller/home/home')), 'seller')
const Details = r => require.ensure([], () => r(require('@/views/details/details')), 'details')
const Product = r => require.ensure([], () => r(require('@/views/product/product')), 'product')
const Login = r => require.ensure([], () => r(require('@/views/login/login')), 'login')
const Register = r => require.ensure([], () => r(require('@/views/register/register')), 'register')
const Cart = r => require.ensure([], () => r(require('@/views/cart/cart')), 'cart')
const ComfirmOrder = r => require.ensure([], () => r(require('@/views/order/comfirmOrder')), 'comfirmOrder')
const Center = r => require.ensure([], () => r(require('@/views/center/center')), 'center')
const MyOrder = r => require.ensure([], () => r(require('@/views/center/myOrder')), 'myOrder')
const Collect = r => require.ensure([], () => r(require('@/views/center/collect')), 'collect')
const OrderInfo = r => require.ensure([], () => r(require('@/views/order/orderInfo')), 'orderInfo')
const Error = r => require.ensure([], () => r(require('@/views/error/error')), 'error')

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      alias:'/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/seller',
      name: 'Seller',
      component: Seller
    },
    {
      path: '/details/:id',
      name: 'Details',
      component: Details
    },
    {
      path: '/product',
      name: 'Product',
      component: Product
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        requireAuth: true
      },
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/comfirmOrder',
      name: 'ComfirmOrder',
      component: ComfirmOrder
    },
    {
      path: '/orderInfo/:id',
      name: 'OrderInfo',
      component: OrderInfo
    },
    {
      path: '/center',
      name: 'Center',
      component: Center,
      redirect:'/center/myOrder',
      children: [
        {
          path: 'myOrder',
          name: 'Myorder',
          component: MyOrder
        },
        {
          path: 'personalInfo',
          name: 'PersonalInfo',
          component: MyOrder
        },
        {
          path: 'collect',
          name: 'Collect',
          component: Collect
        }
      ]
    },
    {
      path: '*',
      name: 'Error',
      component: Error 
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.getters.getToken) {
      to.path === '/login' ? next({ path: '/', query: { redirect: to.fullPath }}) : next()
    }
    else {
      to.path !== '/login' ? next({ path: '/login', query: { redirect: to.fullPath }}) : next()
    }
  }
  else {
    next();
  }
})

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  api.setHeader(window.localStorage.getItem('token'))
  store.commit(types.SET_TOKEN, window.localStorage.getItem('token'))
}

export default router
