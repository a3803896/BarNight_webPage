<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide>
      <div class="bartender intro-swiper-img pl-lg-5 p-3 d-flex flex-column justify-content-between position-relative">
        <h3 class="text-white z-10 noto text-right">「沒有人的溫暖，</h3>
        <h3 class="text-white z-10 noto m-0 vertical align-self-end">
          就稱不上是酒吧。」
        </h3>
        <div class="pl-lg-5">
          <p class="text-white z-10 noto">本店監製：2019年台灣十大調酒師</p>
          <h2 class="marker text-main z-10 bold">JESSICA WANG</h2>
        </div>
        <div class="bartenderOpacity position-absolute"></div>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="position-relative">
        <img
          src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/03YyaZF34EQ11tqDXZDV5HnxhNaY8Y9oFP71PipaCrXsXFHqmHtS6xf0DMd4QyXLSffCPLMemZBkZID17tHhfGgeXJV5mUXsq4hE6XCV45kGP6PLfhkmiojS16gVUmc2.jpg"
          class="intro-swiper-img w-100 obj-cov filter-brightness" alt="背景圖片" />
        <div class="w-100 slogan position-absolute text-white text-center bold">
          <p>無論是與朋友一同飲酒歡慶</p>
          <p>或是孤身一人獨自啜飲放空</p>
          <p>在這裡，你都能找到適合的位置</p>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="position-relative">
        <img
          src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/RZMkBANRdpIz3qGF8gn3T03aOnO5LQDnuVngquUP5KI2Bl5fnxcYrxi7FojCvMtNWxIXSGwb2P52w3JsCtP0XChot3vkuSiPwmqNYc73BchYXpXCEAVl24O2HpJnffBS.jpg"
          class="intro-swiper-img w-100 obj-cov filter-grayscale obj-pos" alt="現正促銷中" />
        <div class="w-100 py-3 d-flex flex-column align-items-center onSale position-absolute text-white bold">
          <h4 class="vertical m-0">
            現正<span class="text-main">特價</span>中！
          </h4>
          <p>輸入優惠碼<span class="text-main">「9999」</span>獲得 9 折優惠</p>
        </div>
      </div>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

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
        autoplay: {
          delay: 3500,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  }
}
</script>
