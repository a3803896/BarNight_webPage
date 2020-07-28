<template>
  <div>
    <div class="container">
      <div class="d-flex justify-content-between flex-wrap" id="productList">
        <div class="card mb-3" style="width:32%" v-for="(item) in products" :key="item.id">
          <img :src="item.imageUrl[0]" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title">{{ item.title }}</h5>
            <p class="card-text">{{ item.content }}</p>
            <h5 class="text-right text-danger mb-0">
              <span class="text-dark bold">總價：</span>
              {{ item.price }}元
            </h5>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <button type="button" class="btn btn-info w-100" @click.prevent="openProduct(item)">查看詳情</button>
            <!-- <button type="button" class="btn btn-primary w-100">加入購物車</button> -->
          </div>
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
    }
  }
}
</script>

<style>
.card img {
  width: 100%;
  height: 229px;
  object-fit: cover;
}
</style>
