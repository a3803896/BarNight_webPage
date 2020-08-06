<template>
    <div class="">
      <div class="container pt-2">
        <nav class="d-flex justify-content-center justify-content-lg-between align-items-center pb-2">
            <h2 class="h3 mb-0">前台</h2>
            <ul class="navList list-unstyled d-flex m-0 align-items-center">
              <li><router-link to="/homepage" class="link text-info mr-3 noto">首頁</router-link></li>
              <li><router-link to="/products" class="link text-info mr-3 noto">產品列表</router-link></li>
              <li><router-link to="/cart" class="link text-info mr-3 noto">購物車</router-link></li>
              <li><router-link to="/about" class="link text-info mr-3 noto">關於我們</router-link></li>
              <li><router-link to="/check" class="link text-info mr-3 noto">結帳</router-link></li>
              <li><router-link to="/login" class="link text-danger noto">登入後台</router-link></li>
            </ul>
        </nav>
      </div>
      <router-view></router-view>
    </div>
</template>

<script>
/* global $ */
export default {
  created () {
    this.$router.push('/homepage')
  },
  methods: {
    toogleClass () {
      console.log(321)
      $('.navList').toggleClass('show')
    }
  }
}
</script>
