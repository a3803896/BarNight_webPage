<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide class="swiperAlert d-none">
      <div class="alert alert-danger rounded-0 alert-dismissible fade show" role="alert">
        糟了！網站似乎有些狀況！
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </swiper-slide>
    <swiper-slide v-for="(item) in filterProducts" :key="item.id">
      <img :src="item.imageUrl[0]" class="swiper-img mb-2" :alt="item.title" />
      <router-link to="/products" class="text-black h5 bold mb-1">{{ item.title }}</router-link>
      <p class="bold text-black">NT$ {{ item.price }}</p>
    </swiper-slide>
    <!-- <div class="swiper-pagination" slot="pagination"></div> -->
  </swiper>
</template>

<script>
/* global $ */
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

export default {
  name: 'swiper-example-multiple-slides-per-biew',
  title: 'Multiple slides per view',
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      products: [],
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        breakpoints: {
          1024: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          }
        }
      }
    }
  },
  methods: {
    getProduct (page = 1) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/products`
      this.axios
        .get(url)
        .then((res) => {
          this.products = res.data.data
        })
        .catch(() => {
          $('.swiperAlert').removeClass('d-none')
          this.$router.push('/homepage')
        })
    }
  },
  computed: {
    filterProducts: function () {
      return this.products.filter(function (item) {
        return item.category === '調酒'
      })
    }
  },
  mounted () {
    this.getProduct(1)
  }
}
</script>

<style lang="scss">

</style>
