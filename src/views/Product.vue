<template>
  <div class="product py-3 pb-5 py-md-4">
    <div class="container">
      <div class="row flex-nowrap flex-column flex-lg-row">
        <div class="col-lg-8">
          <div>
            <img :src="product.imageUrl" alt="" class="mb-3 mb-lg-0">
          </div>
        </div>
        <div class="col-lg-5 details d-flex align-items-center">
          <div class="d-flex flex-column rounded bg-white p-3 p-md-32 w-100">
            <h2 class="mb-3 noto">{{ product.title }}</h2>
            <p class="h5 noto bold mb-3">「{{ product.description }}」</p>
            <strike class="text-right text-sub noto">原價：{{ product.origin_price }}</strike>
            <span class="text-right h4 noto text-danger mb-4">價格：{{ product.price }}元</span>
            <div class="d-flex justify-content-between">
              <input type="number" min="1"
                class="w-30 noto text-center bg-gray border-0 p-2 pl-2 pr-2 pl-lg-3 pr-lg-3 mr-1" id="numberArr"
                v-model="productNum" value="1">
              <button type="button" class="btn btn-main w-70 noto" @click="addCart">加入購物車</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading :active.sync="isLoading"></loading>
  </div>
</template>

<script>
export default {
  data () {
    return {
      product: {},
      productNum: 1,
      isLoading: false
    }
  },
  created () {
    const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/product/${this.$route.params.id}`
    this.axios.get(url)
      .then((res) => {
        this.product = res.data.data
      })
      .catch(() => {
        this.isLoading = false
      })
  },
  methods: {
    addCart () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`
      const product = {
        product: this.$route.params.id,
        quantity: this.productNum
      }
      this.axios.post(url, product)
        .then(() => {
          this.$bus.$emit('get-cart')
          this.isLoading = false
        })
        .catch(() => {
          alert('購物車內已有此商品')
          this.isLoading = false
        })
    }
  }
}
</script>
