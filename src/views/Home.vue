<template>
    <div class="">
      <navBar></navBar>
      <router-view class="mb-56"></router-view>
      <footer class="bg-dark fixed-bottom">
            <div class="container">
                <div class="d-flex align-items-center justify-content-between text-white py-3">
                    <p class="mb-0 noto">© 2020 LOGO All Rights Reserved.</p>
                    <h5 class="mb-0 noto text-main bold">開車不喝酒 安全有保障 未成年請勿飲酒</h5>
                </div>
            </div>
      </footer>
    </div>
</template>

<script>
import navBar from '../components/Nav.vue'
export default {
  components: {
    navBar
  },
  created () {
    this.$router.push('/homepage')
  },
  methods: {
  }
}
</script>

<style lang="scss">
  .mb-56 {
    margin-bottom: 56px;
  }
</style>
