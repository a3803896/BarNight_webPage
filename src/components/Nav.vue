<template>
    <div class="navBar position-relative">
        <div class="container">
          <nav class="d-flex justify-content-center justify-content-lg-between align-items-center pt-2 pb-2">
              <i class="material-icons menuIcon d-block d-lg-none text-white" @click="showList">menu</i>
              <h1 class="d-flex align-items-center"><router-link to="/homepage" class="text-main marker">Bar Night</router-link></h1>
              <ul class="navList list-unstyled d-flex flex-column flex-lg-row m-0 align-items-center">
                <li><router-link to="/about" class="link noto">關於我們</router-link></li>
                <li><router-link to="/products" class="link noto">產品列表</router-link></li>
                <li><router-link to="/cart" class="link noto">購物車</router-link></li>
                <li><router-link to="/check" class="link noto">結帳</router-link></li>
                <!-- <li><router-link to="/login" class="text-danger noto">登入後台</router-link></li> -->
              </ul>
          </nav>
        </div>
      </div>
</template>

<script>
/* global $ */
export default {
  methods: {
    showList () {
      $('.navList').toggleClass('showList')
    }
  }
}
</script>
