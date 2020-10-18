<template>
  <div>
    <NavBar></NavBar>
    <router-view class="mb-56"></router-view>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import NavBar from '../components/layout/Nav.vue'
import MyFooter from '../components/layout/Footer.vue'
export default {
  components: {
    NavBar, MyFooter
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
