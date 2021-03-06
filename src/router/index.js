import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: 'homepage',
        name: '前台首頁',
        component: () => import('../views/front/Homepage.vue')
      },
      {
        path: 'products',
        name: '前台商品列表',
        component: () => import('../views/front/Products.vue')
      },
      {
        // 動態路由
        path: 'product/:id',
        name: '前台單一商品列表',
        component: () => import('../views/front/Product.vue')
      },
      {
        path: 'cart',
        name: '前台購物車',
        component: () => import('../views/front/Cart.vue')
      },
      {
        path: 'about',
        name: '關於我們',
        component: () => import('../views/front/About.vue')
      },
      {
        path: 'check',
        name: '結帳',
        component: () => import('../views/front/Check.vue')
      },
      {
        path: 'check_detail/:id',
        name: '單一訂單詳情',
        component: () => import('../views/front/Check_detail.vue')
      },
      {
        path: 'done',
        name: '單一訂單詳情',
        component: () => import('../views/front/Done.vue')
      }
    ]
  },
  {
    path: '/login',
    name: '登入',
    component: () => import('../views/front/Login.vue')
  },
  {
    path: '/admin',
    name: '後臺',
    component: () => import('../views/Dashboard.vue'),
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
    redirect: 'homepage'
  }
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  }
})

export default router
