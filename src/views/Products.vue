<template>
  <div>
    <div class="products container pt-3 pb-5 pb-md-3">
      <div class="row">
        <div class="col-lg-2">
          <ul class="card-nav d-flex flex-wrap d-lg-block bg-dark list-unstyled border border-main sticky-top">
            <li><a href="#" class="text-white d-block text-center py-1 py-lg-2" @click.prevent="toggle('all')">所有產品</a>
            </li>
            <li><a href="#" class="text-white d-block text-center py-1 py-lg-2" @click.prevent="toggle('food')">餐點</a>
            </li>
            <li><a href="#" class="text-white d-block text-center py-1 py-lg-2"
                @click.prevent="toggle('cocktail')">調酒</a></li>
            <li><a href="#" class="text-white d-block text-center py-1 py-lg-2" @click.prevent="toggle('soft')">無酒精</a>
            </li>
          </ul>
        </div>
        <div class="col-lg-10">
          <div class="card-columns" id="productList">
            <div class="card mb-4" v-for="(item) in products" :key="item.id" :data-category="item.category">
              <div class="position-relative">
                <img :src="item.imageUrl[0]" class="card-img-top pointer" @click.prevent="openProduct(item)" />
                <button type="button" class="addCart position-absolute btn btn-outline-main noto rounded-pill d-flex"
                  @click="addCart(item)"><i class="material-icons">shopping_cart</i></button>
                <p class="h4 mb-0 text-white">{{ item.category }}</p>
              </div>
              <div class="card-body p-3 bg-dark">
                <a class="card-title text-main h4 bold mb-2 noto"
                  @click.prevent="openProduct(item)">{{ item.title }}</a>
                <div>
                  <span class="h5 mb-0 mr-2 text-white bold">NT${{ item.price }}元</span>
                  <strike class="text-sub bold">NT${{ item.price }}元</strike>
                </div>
              </div>
            </div>
          </div>
          <a class="scroll material-icons h1 mb-0 text-white rounded-circle d-block d-lg-none"
            href="#nav">arrow_circle_up</a>
        </div>
      </div>
      <Mypagination :inner-pagination="pagination" @change-page="getProduct"></Mypagination>
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
    getProduct (page = 1) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/products?page=${page}&orderBy=category&paged=30`
      this.axios
        .get(url)
        .then((res) => {
          this.products = res.data.data
          this.pagination = res.data.meta.pagination
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
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`
      const product = {
        product: item.id,
        quantity: '1'
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
    },
    toggle (para) {
      document.querySelectorAll('.card-columns .card').forEach((item) => {
        item.style.display = 'none'
      })
      switch (para) {
        case 'all':
          document.querySelectorAll('.card-columns .card').forEach((item) => {
            item.style.display = 'inline-block'
          })
          break
        case 'food':
          document.querySelectorAll('.card[data-category="餐點"]').forEach((item) => {
            item.style.display = 'inline-block'
          })
          break
        case 'cocktail':
          document.querySelectorAll('.card[data-category="調酒"]').forEach((item) => {
            item.style.display = 'inline-block'
          })
          break
        case 'soft':
          document.querySelectorAll('.card[data-category="無酒精"]').forEach((item) => {
            item.style.display = 'inline-block'
          })
          break
      }
    }
  }
}
</script>

<style>

</style>
