<template>
    <div>
        <div class="container">
            <div class="d-flex justify-content-between align-items-end pb-2 pt-1 mb-2">
                <h3 class="bold mb-0">訂單詳情</h3>
                <div class="d-flex">
                    <p class="">訂單編號：{{ order.created.timestamp }}</p>
                    <p class="ml-5">訂單時間：{{ order.created.datetime }}</p>
                </div>
            </div>
            <h5>商品清單</h5>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>商品</th>
                        <th class="text-center">價格</th>
                        <th class="text-center">數量</th>
                        <th class="text-center">小計</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item) in order.products" :key="item.product.content">
                        <td class="d-flex align-items-center">
                            <img :src="item.product.imageUrl[0]" alt="" class="orderImg mr-5">
                            <p>{{ item.product.title }}</p>
                        </td>
                        <td class="align-middle text-center">
                            {{ item.product.price }}
                        </td>
                        <td class="align-middle text-center">
                            {{ item.quantity }}
                        </td>
                        <td class="align-middle text-center">
                            {{ item.product.price*item.quantity }}
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
        <loading :active.sync="isLoading"></loading>
    </div>
</template>

<script>
export default {
  data () {
    return {
      order: {},
      token: '',
      isLoading: false
    }
  },
  created () {
    this.isLoading = true
    this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
    const url = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${this.$route.params.id}`
    this.axios.defaults.headers.Authorization = `Bearer ${this.token}`
    this.axios.get(url)
      .then((res) => {
        this.order = res.data.data
        this.isLoading = false
      })
  },
  methods: {
  }
}
</script>

<style lang="scss">
    .orderImg{
        width: 180px;
        height: 120px;
        object-fit: cover;
    }
</style>
