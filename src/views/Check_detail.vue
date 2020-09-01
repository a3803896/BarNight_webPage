<template>
    <div>
        <div class="container checkDetail">
            <div class="row">
                <div class="col-12">
                    <div class="d-flex justify-content-between align-items-end border-bottom pb-3 pt-1 text-white noto">
                        <h3 class="d-none d-lg-block bold mb-0">訂單詳情</h3>
                        <div class="d-flex flex-column flex-lg-row">
                            <p class="">訂單編號：{{ createdTime.timestamp }}</p>
                            <p class="ml-0 ml-lg-5">訂單時間：{{ createdTime.datetime }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center pt-3">
                <div class="col-12 col-lg-8">
                    <table class="table table-hover table-borderless table-dark noto">
                        <thead class="border-bottom">
                            <tr>
                                <th>商品</th>
                                <th class="text-center">價格</th>
                                <th class="text-center">數量</th>
                                <th class="text-center">小計</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item) in order.products" :key="item.product.content">
                                <td class="">
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
                        <tfoot class="border-top">
                            <tr>
                                <td class="text-main">
                                    總計：
                                </td>
                                <td colspan="2"></td>
                                <td>
                                    <p class="noto text-main text-center">{{ order.amount }}</p>
                                </td>
                            </tr>
                        </tfoot>
                    </table>

                </div>
                <div class="col-12 col-lg-4 text-white noto">
                    <div class="">
                        <div class="">
                            <p class="mb-2">訂購人姓名：{{ orderUser.name }}</p>
                            <p class="mb-2">訂購人地址：{{ orderUser.address }}</p>
                            <p class="mb-2">訂購人電話：{{ orderUser.tel }}</p>
                            <p class="mb-2">訂購人電郵：{{ orderUser.email }}</p>
                            <p class="mb-2">付款方式：{{ order.payment }}</p>
                            <p class="mb-2" v-if="order.paid">付款狀態：已付款</p>
                            <p class="mb-2" v-else>付款狀態：未付款</p>
                            <p class="mb-2">優惠券：
                                <span v-if="coupon">{{ coupon.title }} {{ coupon.percent }}%OFF</span>
                                <span v-else>無</span>
                            </p>
                            <p class="mb-2" v-show="order.paid">付款時間：{{ order.paid_at }}({{ order.paid_diff }})</p>
                            <p class="mb-2">訂單備註：{{ order.message }}</p>
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
    this.getCheckDetail()
  },
  methods: {
    getCheckDetail () {
      this.isLoading = true
      //   const url = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${this.$route.params.id}`
      const url = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/ec/orders/${this.$route.params.id}`
      this.axios.defaults.headers.Authorization = `Bearer ${this.token}`
      this.axios.get(url)
        .then((res) => {
          this.order = res.data.data
          this.createdTime = res.data.data.created
          this.orderUser = res.data.data.user
          this.coupon = res.data.data.coupon
          this.isLoading = false
        })
    }
    // orderPaid () {
    //   this.isLoading = true
    //   const url = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${this.$route.params.id}/paid`
    //   this.axios.patch(url)
    //     .then((res) => {
    //       this.getCheckDetail()
    //     })
    // },
    // orderUnpaid () {
    //   this.isLoading = true
    //   const url = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${this.$route.params.id}/unpaid`
    //   this.axios.patch(url)
    //     .then((res) => {
    //       this.getCheckDetail()
    //     })
    // }
  }
}
</script>

<style lang="scss">
    .orderImg{
        width: 180px;
        height: 160px;
        object-fit: cover;
    }
</style>
