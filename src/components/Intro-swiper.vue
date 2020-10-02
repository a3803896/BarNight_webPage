<template>
    <swiper class="swiper" :options="swiperOption">
        <swiper-slide>
            <div class="bartender intro-swiper-img pl-lg-5 p-3 d-flex flex-column justify-content-between position-relative">
                <h3 class="text-white z-10 noto text-right">「沒有人的溫暖，</h3>
                <h3 class="text-white z-10 noto m-0 vertical align-self-end">就稱不上是酒吧。」</h3>
                <div class="pl-lg-5">
                    <p class="text-white z-10 noto">本店監製：2019年台灣十大調酒師</p>
                    <h2 class="marker text-main z-10 bold">JESSICA WANG</h2>
                </div>
                <div class="bartenderOpacity position-absolute"></div>
            </div>
        </swiper-slide>
        <swiper-slide>
          <img src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/peJHmnODXcajJH9otB3HKk82YxgLTKEHNzJggW3GJF6MTj3HRShuN224FbGEZ4xGhlY6ADl8E3BJV58COtggbUe8lnfzCsariAklBESrOmKDCZ6Eg4fmpgnpXrKzE3z2.jpg" class="intro-swiper-img w-100 obj-cov filter-brightness" alt="">
        </swiper-slide>
        <swiper-slide>
          <img src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/7961hVz27y6obAHiptu1UXWMMWfQM7ERTlZ6meJtK0rXckMx0eWnXgQXjGAQUj1tnah7rlK4E7uFWk2bH7qFK4805ICAY6xHR6ENlnlE4Uh4sZ0VD98JetRnJY1UUiub.jpg" class="intro-swiper-img w-100 obj-cov filter-brightness filter-grayscale obj-pos" alt="">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import '../../node_modules/swiper/swiper-bundle.css'

export default {
  name: 'swiper-example-space-between',
  title: 'Space between slides',
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      swiperOption: {
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  }
}
</script>
