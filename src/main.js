import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import jQuery from 'jquery'
window.$ = window.jQuery = jQuery

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
// 加入藍圖
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
