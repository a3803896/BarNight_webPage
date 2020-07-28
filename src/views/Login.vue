<template>
    <div>
        <div class="container">
            <div class="row d-flex justify-content-center">
                <div class="col-3 pt-5">
                    <form class="loginForm mt-5">
                        <h2 class="text-center text-info noto bold mb-3">請先登入</h2>
                        <input type="email" name="" class="w-100 mb-3 p-1" placeholder="電子郵件" v-model="user.email">
                        <input type="password" name="" class="w-100 mb-4 p-1" placeholder="密碼" v-model="user.password">
                        <button class="btn btn-info active w-100 noto fz-2 mb-2" type="submit" @click.prevent="signin">
                            登入
                        </button>
                    </form>
                </div>
            </div>
        </div>
        <loading :active.sync="isLoading"></loading>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      user: {
        email: '',
        password: ''
      },
      token: ''
    }
  },
  methods: {
    signin () {
      this.isLoading = true
      const api = 'https://course-ec-api.hexschool.io/api/auth/login'
      this.axios.post(api, this.user)
        .then((res) => {
          const token = res.data.token
          const expired = res.data.expired
          document.cookie = `token=${token}; expires=${new Date(expired * 1000)}; path=/`
          this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
          this.axios.defaults.headers.Authorization = `Bearer ${this.token}`
          // ↑將 Token 加入到 Headers 內
          //   window.location = 'products.html'
          this.$router.push('/admin/homepage')
        }).catch((error) => {
          console.log(error)
          location.reload()
        })
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap');
.noto{
    font-family: 'Noto Sans TC', sans-serif;
}
</style>
