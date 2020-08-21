<template>
    <div class="">
      <navBar></navBar>
      <router-view></router-view>
      <div class="bg-black">
            <div class="container">
                <div class="d-flex align-items-center justify-content-between text-white py-4">
                    <div class="">
                      <h5 class="mb-0 noto text-main bold">開車不喝酒 安全有保障 未成年請勿飲酒</h5>
                      <p class="mb-0 noto">© 2020 LOGO All Rights Reserved.</p>
                    </div>
                    <ul class="d-flex list-unstyled mb-0 h4">
                        <li><a href="#" class="text-white mx-3"><i class="fab fa-facebook"></i></a></li>
                        <li><a href="#" class="text-white mx-3"><i class="fab fa-instagram"></i></a></li>
                        <li><a href="#" class="text-white ml-3"><i class="fab fa-line"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
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
