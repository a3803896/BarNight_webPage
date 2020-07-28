<template>
    <div class="">
      <div class="container pt-2">
          <nav class="d-flex justify-content-between border-bottom pb-3">
              <h2 class="mb-0 mr-3">後台</h2>
              <div class="">
                <router-link to="/admin/homepage" class="btn btn-outline-primary mr-2">後臺首頁</router-link>
                <router-link to="/admin/products" class="btn btn-outline-primary mr-2">管理產品列表</router-link>
                <router-link to="/admin/coupon" class="btn btn-outline-primary mr-2">管理優惠券</router-link>
                <a href="#" @click.prevent="signout" class="btn btn-outline-danger">回到前台</a>
            </div>
          </nav>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  data () {
    return {
      token: ''
    }
  },
  created () {
    this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
    // 登入驗證
    const url = 'https://course-ec-api.hexschool.io/api/auth/check'
    this.axios.post(url, {
      api_token: this.token
    }).then((res) => {
    })
      .catch(() => {
        alert('請先登入')
        this.$router.push('/homepage')
      })
  },
  methods: {
    signout () {
      document.cookie = 'token=; expires=; path=/'
      this.$router.push('/homepage')
    }
  }
}
</script>
