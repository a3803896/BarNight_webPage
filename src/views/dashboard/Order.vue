<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-between align-items-end pb-2 pt-1 mb-2">
            <h3 class="bold mb-0">訂單詳情</h3>
            <div class="d-flex">
              <p class="">訂單編號：{{ createdTime.timestamp }}</p>
              <p class="ml-5">訂單時間：{{ createdTime.datetime }}</p>
            </div>
          </div>
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
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td class="text-center bold">總計：</td>
                <td class="text-center bold">{{ order.amount }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-12">
          <div class="d-flex">
            <div class="mr-5">
              <p class="mb-2">訂購人姓名：{{ orderUser.name }}</p>
              <p class="mb-2">訂購人地址：{{ orderUser.address }}</p>
              <p class="mb-2">訂購人電話：{{ orderUser.tel }}</p>
              <p class="mb-2">訂購人電郵：{{ orderUser.email }}</p>
              <p class="">訂單備註：{{ order.message }}</p>
            </div>
            <div class="ml-5">
              <p class="mb-2">優惠券：<span v-if="coupon">{{ coupon.title }} {{ coupon.percent }}%OFF</span>
                <span v-else>無</span>
              </p>
              <p class="mb-2">付款方式：{{ order.payment }}</p>
              <p class="mb-2" v-if="order.paid">付款狀態：已付款</p>
              <p class="mb-2" v-else>付款狀態：未付款</p>
              <p class="mb-2">付款時間：{{ order.paid_at }}({{ order.paid_diff }})</p>
              <button type="button" class="btn btn-outline-danger" @click="orderUnpaid"
                v-if="order.paid">此筆訂單未付款</button>
              <button type="button" class="btn btn-outline-info mr-2" @click="orderPaid" v-else>此筆訂單已付款</button>
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
      order: {},
      createdTime: {},
      coupon: {},
      orderUser: {},
      token: '',
      isLoading: false
    }
  },
  created () {
    this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.getOrder()
  },
  methods: {
    getOrder () {
      this.isLoading = true
      const url = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${this.$route.params.id}`
      this.axios.defaults.headers.Authorization = `Bearer ${this.token}`
      this.axios.get(url)
        .then((res) => {
          this.order = res.data.data
          this.createdTime = res.data.data.created
          this.orderUser = res.data.data.user
          this.coupon = res.data.data.coupon
          this.isLoading = false
        })
    },
    orderPaid () {
      this.isLoading = true
      const url = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${this.$route.params.id}/paid`
      this.axios.patch(url)
        .then((res) => {
          this.getOrder()
        })
    },
    orderUnpaid () {
      this.isLoading = true
      const url = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${this.$route.params.id}/unpaid`
      this.axios.patch(url)
        .then((res) => {
          this.getOrder()
        })
    }
  }
}
</script>

<style lang="scss">
  .orderImg {
    width: 180px;
    height: 120px;
    object-fit: cover;
  }
</style>
