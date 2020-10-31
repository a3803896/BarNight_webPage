import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import swiper, { Navigation, Pagination, Autoplay } from 'swiper'
import ProductSwiper from './components/Swiper.vue'
import Introswiper from './components/Intro-swiper.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import jQuery from 'jquery'
import { ValidationProvider, ValidationObserver, configure, extend, localize } from 'vee-validate'
import { email, min, integer, numeric } from 'vee-validate/dist/rules'
import '../node_modules/swiper/swiper-bundle.css'

import zhTW from 'vee-validate/dist/locale/zh_TW.json'
import Mypagination from '../src/components/Mypagination.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
window.$ = window.jQuery = jQuery
Vue.prototype.$bus = new Vue()
// ..
AOS.init()

// 元件
Vue.component('Loading', Loading)
Vue.component('Mypagination', Mypagination)
Vue.component('ProductSwiper', ProductSwiper)
Vue.component('intro-swiper', Introswiper)

// 驗證元件
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
const config = {
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
}
extend('required', {
  validate (value) {
    return {
      required: true,
      valid: ['', null, undefined].indexOf(value) === -1
    }
  },
  computesRequired: true
})
extend('email', email)
extend('min', min)
extend('integer', integer)
extend('numeric', numeric)
configure(config)
localize('zhTW', zhTW)
// 加入藍圖
swiper.use([Navigation, Pagination, Autoplay])
Vue.use(VueAxios, axios)
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
