<template>
    <div class="">
      <navBar></navBar>
      <router-view></router-view>
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
