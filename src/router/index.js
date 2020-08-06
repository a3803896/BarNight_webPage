import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'homepage',
        name: '前台首頁',
        component: () => import('../views/Homepage.vue')
      },
      {
        path: 'products',
        name: '前台商品列表',
        component: () => import('../views/Products.vue')
      },
      {
        // 動態路由
        path: 'product/:id',
        name: '前台單一商品列表',
        component: () => import('../views/Product.vue')
      },
      {
        path: 'cart',
        name: '前台購物車',
        component: () => import('../views/Cart.vue')
      },
      {
        path: 'about',
        name: '關於我們',
        component: () => import('../views/About.vue')
      },
      {
        path: 'check',
        name: '結帳',
        component: () => import('../views/Check.vue')
      }
    ]
  },
  {
    path: '/login',
    name: '登入',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/admin',
    name: '後臺',
    component: () => import('../views/dashboard/Dashboard.vue'),
    children: [
      {
        path: 'homepage',
        name: '後臺首頁',
        component: () => import('../views/dashboard/Homepage.vue')
      },
      {
        path: 'products',
        name: '後臺產品列表',
        component: () => import('../views/dashboard/Products.vue')
      },
      {
        path: 'coupon',
        name: '後臺優惠券列表',
        component: () => import('../views/dashboard/Coupon.vue')
      },
      {
        path: 'orders',
        name: '訂單列表',
        component: () => import('../views/dashboard/Orders.vue')
      },
      {
        path: 'order/:id',
        name: '單一訂單詳情',
        component: () => import('../views/dashboard/Order.vue')
      },
      {
        path: 'files',
        name: '圖片列表',
        component: () => import('../views/dashboard/Files.vue')
      }
    ]
  },
  {
    path: '*',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
})

export default router
