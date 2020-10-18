<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide v-for="(item) in filterProducts" :key="item.id">
      <img :src="item.imageUrl[0]" class="swiper-img mb-2" />
      <router-link to="/products" class="text-black h5 bold mb-1">{{ item.title }}</router-link>
      <p class="bold text-black">NT$ {{ item.price }}</p>
    </swiper-slide>
    <!-- <div class="swiper-pagination" slot="pagination"></div> -->
  </swiper>
</template>

<script>
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
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/products?page=${page}&orderBy=category&paged=30`
      this.axios
        .get(url)
        .then((res) => {
          this.products = res.data.data
        })
        .catch(() => {
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
