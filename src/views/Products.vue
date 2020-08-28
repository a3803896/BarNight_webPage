<template>
  <div>
    <div class="products container">
      <div class="card-columns" id="productList">
        <div class="card mb-4" v-for="(item) in products" :key="item.id">
          <img :src="item.imageUrl[0]" class="card-img-top pointer" @click.prevent="openProduct(item)"/>
          <div class="card-body p-3">
            <a class="card-title text-main h3 bold mb-3" @click.prevent="openProduct(item)">{{ item.title }}</a>
            <p class="card-text mb-3">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-center">
                <h5 class="text-right text-main bold">
              <span class="text-white bold">總價：</span>
              {{ item.price }}元
            </h5>
                <button type="button" class="btn btn-outline-main noto rounded-pill d-flex" @click="addCart(item)"><i class="material-icons">shopping_cart</i></button>
            </div>
          </div>
          <!-- <div class="card-footer d-flex justify-content-between">
            <button type="button" class="btn btn-outline-info w-50">查看詳情</button>
          </div> -->
        </div>
      </div>
      <pagination :inner-pagination="pagination" @change-page="getProduct"></pagination>
    </div>
    <loading :active.sync="isLoading"></loading>
  </div>
</template>

<script>
export default {
  data () {
    return {
      token: '',
      products: [],
      pagination: {},
      isLoading: false
    }
  },
  mounted () {
    this.getProduct(1)
  },
  methods: {
    getProduct (page) {
      this.isLoading = true
      const url = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/ec/products?page=${page}`
      this.axios
        .get(url)
        .then((res) => {
          this.products = res.data.data
          this.pagination = res.data.meta.pagination
          window.scrollTo(0, 0)
          this.isLoading = false
        })
        .catch(() => {
          this.$router.push('/homepage')
        })
    },
    openProduct (item) {
      this.$router.push(`/product/${item.id}`)
    },
    addCart (item) {
      this.isLoading = true
      const url = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/ec/shopping`
      const product = {
        product: item.id,
        quantity: '1'
      }
      this.axios.post(url, product)
        .then(res => {
          console.log(res)
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

<style>

</style>
