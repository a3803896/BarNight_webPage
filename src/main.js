import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import jQuery from 'jquery'
import { ValidationProvider, ValidationObserver, configure, extend, localize } from 'vee-validate'
import { email, min, integer, numeric } from 'vee-validate/dist/rules'
// eslint-disable-next-line camelcase
import zh_TW from 'vee-validate/dist/locale/zh_TW.json'
window.$ = window.jQuery = jQuery
Vue.prototype.$bus = new Vue()

// 元件
Vue.component('Loading', Loading)
Vue.component('pagination', {
  template: `<nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" :class="{'disabled': innerPagination.current_page == 1}">
            <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePage(innerPagination.current_page - 1)">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li v-for="item in innerPagination.total_pages" 
              :key="item" class="page-item" 
              :class="{'active': item === innerPagination.current_page}">
            <a class="page-link" href="#" @click.prevent="changePage(item)">{{ item }}</a>
          </li>
          <li
            class="page-item" :class="{'disabled': innerPagination.current_page === innerPagination.total_pages}">
            <a class="page-link" href="#" aria-label="Next" @click.prevent="changePage(innerPagination.current_page + 1)">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
        </nav>`,
  data () {
    return {}
  },
  props: ['innerPagination'],
  methods: {
    changePage (onePage) {
      this.$emit('change-page', onePage)
    }
  }
})
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
localize('zh_TW', zh_TW)
// 加入藍圖
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
