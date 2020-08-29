<template>
  <div>
    <div class="products container">
      <div class="card-columns" id="productList">
        <div class="card mb-4" v-for="(item) in products" :key="item.id">
          <div class=" position-relative">
              <img :src="item.imageUrl[0]" class="card-img-top pointer" @click.prevent="openProduct(item)"/>
              <button type="button" class="addCart position-absolute btn btn-outline-main noto rounded-pill d-flex" @click="addCart(item)"><i class="material-icons">shopping_cart</i></button>
          </div>
          <div class="card-body p-3 bg-dark">
              <a class="card-title text-main h4 bold mb-2 noto" @click.prevent="openProduct(item)">{{ item.title }}</a>
              <!-- <p class="card-text mb-3">{{ item.content }}</p> -->
              <div class="">
                  <span class="h5 mb-0 mr-2 text-white bold">NT${{ item.price }}元</span>
                  <strike class="text-sub bold">NT${{ item.price }}元</strike>
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
