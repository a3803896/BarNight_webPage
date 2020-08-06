<template>
    <div>
        <div class="container">
            <div class="card mt-5" style="width: 300px;">
                <img :src="product.imageUrl" alt="" class="card-img-top">
                <div class="card-body">
                    <h2>{{ product.title }}</h2>
                    <p>商品內容：{{ product.description }}</p>
                    <p>價格：{{ product.price }}元</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      product: {}
    }
  },
  created () {
    const url = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/ec/product/${this.$route.params.id}`
    this.axios.get(url)
      .then((res) => {
        this.product = res.data.data
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>
