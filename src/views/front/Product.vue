<template>
  <div class="product py-3 pb-5 py-md-4">
    <div class="container">
      <div class="row flex-nowrap flex-column flex-lg-row">
        <div class="col-lg-8">
          <div>
            <img :src="product.imageUrl[0]" :alt="product.title" class="mb-3 mb-lg-0">
          </div>
        </div>
        <div class="col-lg-5 details d-flex align-items-center">
          <div class="d-flex flex-column rounded bg-white p-3 p-md-32 w-100">
            <h2 class="mb-3 noto">{{ product.title }}</h2>
            <p class="h5 noto mb-3">「{{ product.description }}」</p>
            <strike class="text-right text-sub noto">原價：{{ product.origin_price }}</strike>
            <span class="text-right h4 noto text-danger mb-4">價格：{{ product.price }}元</span>
            <div class="d-flex justify-content-between">
              <input type="number" min="1"
                class="w-30 noto text-center bg-gray border-0 p-2 px-lg-3 mr-1" id="numberArr" v-model.lazy="productNum">
              <button type="button" class="btn btn-main w-70 noto" @click="addCart">加入購物車</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row py-5">
        <div class="col-12">
          <h5 class="text-white mb-3">看看類似的商品：</h5>
          <div class="d-flex flex-wrap justify-content-between">
            <div class="card mb-4" v-for="(item) in filterProduct" :key="item.id" :data-category="item.category">
              <div class="position-relative">
                <img :src="item.imageUrl[0]" class="card-img-top pointer" @click.prevent="openProduct(item)" :alt="item.title" />
                <button type="button" class="addCart position-absolute btn btn-outline-main noto rounded-pill d-flex"
                  @click="addCart(item)"><i class="material-icons">shopping_cart</i></button>
              </div>
              <div class="card-body p-3 bg-dark">
                <a class="card-title text-main h4 bold mb-2 noto" @click.prevent="openProduct(item)">{{ item.title }}</a>
                <div>
                  <span class="h5 mb-0 mr-2 text-white bold">NT${{ item.price }}元</span>
                  <strike class="text-sub bold">NT${{ item.price }}元</strike>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading :active.sync="isLoading"></loading>
  </div>
</template>

<script>
/* global $ */
export default {
  data () {
    return {
      products: [],
      product: {
        imageUrl: []
      },
      productNum: 1,
      isLoading: false
    }
  },
  mounted () {
    this.getproduct()
  },
  watch: {
    productNum: function () {
      if (this.productNum <= 0) {
        this.productNum = 1
      }
    }
  },
  computed: {
    filterProduct () {
      return this.products.filter((item) => item.category === this.product.category)
    }
  },
  methods: {
    getproduct () {
      this.isLoading = true
      this.axios.all([
        this.axios.get(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/product/${this.$route.params.id}`),
        this.axios.get(`${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/products`)
      ])
        .then(this.axios.spread((resSingle, resAll) => {
          this.product = resSingle.data.data
          this.products = resAll.data.data
          this.isLoading = false
        }))
        .catch(() => {
          $('.alert').removeClass('d-none')
          this.isLoading = false
        })
    },
    addCart (item) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`
      const product = {
        product: item.id || this.$route.params.id,
        quantity: this.productNum || 1
      }
      this.axios.post(url, product)
        .then(() => {
          this.$bus.$emit('get-cart')
          this.isLoading = false
        })
        .catch(() => {
          $('.alert').removeClass('d-none')
          this.isLoading = false
        })
    },
    openProduct (item) {
      this.$router.push(`/product/${item.id}`)
      this.getproduct()
    }
  }
}
</script>
