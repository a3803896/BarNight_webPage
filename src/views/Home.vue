<template>
    <div class="">
      <div class="container pt-2">
        <nav class="d-flex justify-content-between border-bottom pb-3">
            <h2 class="mb-0 mr-3">前台</h2>
            <div class="">
              <router-link to="/homepage" class="btn btn-outline-primary mr-2">首頁</router-link>
              <router-link to="/products" class="btn btn-outline-primary mr-2">產品列表</router-link>
              <router-link to="/cart" class="btn btn-outline-primary mr-2">購物車</router-link>
              <router-link to="/about" class="btn btn-outline-primary mr-2">關於我們</router-link>
              <router-link to="/check" class="btn btn-outline-primary mr-2">結帳</router-link>
              <router-link to="/login" class="btn btn-outline-danger">登入後台</router-link>
            </div>
        </nav>
      </div>
      <router-view></router-view>
    </div>
</template>

<script>
export default {
  created () {
    this.$router.push('/homepage')
  }
}
</script>
