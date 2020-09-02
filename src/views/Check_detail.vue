<template>
    <div>
        <div class="container checkDetail pb-4">
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
                                <td class="d-flex align-items-center">
                                    <img :src="item.product.imageUrl[0]" alt="" class="checkImg d-none d-md-block mr-2">
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
                                <td colspan="3">
                                    <h5 class="text-right noto text-main">總計：</h5>
                                </td>
                                <td>
                                    <h5 class="noto text-main text-center">{{ order.amount }}</h5>
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
                            <p class="mb-2">訂單備註：{{ order.message }}</p>
                            <p class="mb-2" v-show="order.paid">付款時間：{{ order.paid_diff }}</p>
                            <button type="button" class="btn btn-outline-main d-flex" v-if="order.paid" disabled>
                                已付款
                                <span class="material-icons ml-1">
                                thumb_up
                                </span>
                            </button>
                            <button type="button" class="btn btn-main mr-2 mb-2 rounded-0
                            " v-else data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">去付款</button>
                            <div class="collapse" id="collapseExample">
                                <div class="bg-white p-3 text-black rounded">
                                    <validation-observer v-slot="{ invalid }">
                                        <form>
                                            <label>信用卡資訊</label>
                                            <validation-provider rules="required|numeric|min:16" v-slot="{ errors, classes }">
                                                <input type="tel" class="form-control mb-2" :class="classes" placeholder="信用卡號" name="信用卡號" v-model="form.number" maxlength="16">
                                                <span class="invalid-feedback mb-2">{{ errors[0] }}</span>
                                            </validation-provider>

                                            <validation-provider rules="required" v-slot="{ errors, classes }">
                                                <input type="text" class="form-control mb-2" :class="classes" placeholder="持卡人姓名" name="持卡人姓名" v-model="form.name">
                                                <span class="invalid-feedback mb-2">{{ errors[0] }}</span>
                                            </validation-provider>
                                            <div class="form-row mb-2">
                                                <div class="col">
                                                    <validation-provider rules="required|numeric|min:4" v-slot="{ errors, classes }">
                                                        <input type="tel" class="form-control mb-2" :class="classes" placeholder="到期日( MM / YY )" name="到期日" v-model="form.dueDate" maxlength="4">
                                                        <span class="invalid-feedback mb-2">{{ errors[0] }}</span>
                                                    </validation-provider>
                                                </div>
                                                <div class="col">
                                                    <validation-provider rules="required|numeric|min:3" v-slot="{ errors, classes }">
                                                        <input type="tel" class="form-control mb-2" :class="classes" placeholder="驗證碼" name="驗證碼"
                                                        v-model="form.validate" maxlength="3">
                                                        <span class="invalid-feedback mb-2">{{ errors[0] }}</span>
                                                    </validation-provider>
                                                </div>
                                            </div>
                                            <button type="button" class="btn btn-main w-100 rounded-0" @click.prevent="checkout" :disabled="invalid">結帳</button>
                                        </form>
                                    </validation-observer>
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
export default {
  data () {
    return {
      order: {},
      createdTime: {},
      coupon: {},
      orderUser: {},
      token: '',
      isLoading: false,
      form: {}
    }
  },
  created () {
    this.getCheckDetail()
  },
  methods: {
    getCheckDetail () {
      this.isLoading = true
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
    },
    checkout () {
      this.isLoading = true
      const url = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/ec/orders/${this.$route.params.id}/paying`
      this.axios.post(url)
        .then(() => {
          this.$router.push('/done')
        })
        // .catch(() => {
        //   this.getCheckDetail()
        // })
    }
  }
}
</script>

<style lang="scss">
    .checkImg{
        width: 70px;
        height: 70px;
        object-fit: cover;
    }
</style>
