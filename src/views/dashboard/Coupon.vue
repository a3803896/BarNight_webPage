<template>
  <div class="container">
        <div class="d-flex justify-content-end pt-3">
          <button class="btn btn-primary" @click="openCouponModal('new')">
            建立新的優惠券
          </button>
        </div>
        <table class="table table-hover mt-4">
                <thead>
                    <tr>
                        <th>
                            優惠券標題
                        </th>
                        <th>
                            優惠券序號
                        </th>
                        <th>
                            折扣百分比
                        </th>
                        <th>
                            到期日
                        </th>
                        <th>
                            是否啟用
                        </th>
                        <th>
                            編輯
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item) in coupons" :key="item.id">
                        <td>
                            {{ item.title }}
                        </td>
                        <td class="h5">
                            {{ item.code }}
                        </td>
                        <td class="text-left">
                            {{ item.percent }}
                        </td>
                        <td class="text-left text-danger h5">
                            {{ item.deadline.datetime }}
                        </td>
                        <td>
                            <span v-if="item.enabled" class="text-success">啟用</span>
                            <span v-else>未啟用</span>
                        </td>
                        <td>
                            <div class="btn-group">
                                <button class="btn btn-outline-primary btn-sm" @click="openCouponModal('edit',item)">
                                    編輯
                                </button>
                                <button class="btn btn-outline-danger btn-sm" @click="openCouponModal('delete',item)">
                                    刪除
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <pagination :inner-pagination="pagination" @change-page="getCoupon"></pagination>
            <loading :active.sync="isLoading"></loading>

        <!-- modal -->
        <div id="couponModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
          <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content border-0">
              <div class="modal-header">
                <h2 class="">新增優惠券</h2>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form class="">
                <label for="couponName">優惠券名稱</label>
                <input type="text" id="couponName" name="優惠券名稱" class="form-control mb-3" placeholder="輸入名稱" v-model="templateCoupon.title">

                <label for="couponCode">優惠券序號</label>
                <input type="text" id="couponCode" name="優惠券序號" class="form-control mb-3" placeholder="輸入序號" v-model="templateCoupon.code">

                <label for="percentOff">折扣百分比</label>
                <input type="number" id="percentOff" name="折扣百分比" class="form-control mb-3" placeholder="輸入整數" v-model="templateCoupon.percent">

                <label for="endDate">到期日</label>
                <input type="date" id="endDate" name="到期日" class="form-control mb-3" v-model="endDate">
                <label for="endTime">到期時間</label>
                <input type="time" id="endTime" step="1" name="到期日" class="form-control mb-3" v-model="endTime">

                <input type="checkbox" id="isOpen" name="是否啟用" class="mr-2 mb-3" v-model="templateCoupon.enabled">
                <label for="isOpen">是否啟用</label>
                <br>
              </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-success" @click="sendCoupon">送出</button>
              </div>
            </div>
          </div>
        </div>

        <div id="delCouponModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content border-0">
                        <div class="modal-header bg-danger text-white">
                            <h5 id="exampleModalLabel" class="modal-title">
                                <span>刪除產品</span>
                            </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            是否刪除
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
                                取消
                            </button>
                            <button type="button" class="btn btn-danger" @click="deleteCoupon">
                                確認刪除
                            </button>
                        </div>
                    </div>
                </div>
            </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      coupons: [],
      pagination: {},
      token: '',
      endDate: '',
      endTime: '',
      templateCoupon: {},
      isLoading: false
    }
  },
  created () {
    this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.getCoupon()
  },
  methods: {
    getCoupon (page) {
      this.isLoading = true
      const url = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/admin/ec/coupons?page=${page}`
      this.axios.defaults.headers.Authorization = `Bearer ${this.token}`
      this.axios.get(url)
        .then((res) => {
          this.coupons = res.data.data
          this.pagination = res.data.meta.pagination
          console.log(this.coupons, this.pagination)
          this.isLoading = false
        })
    },
    sendCoupon () {
      this.isLoading = true
      if (Object.prototype.hasOwnProperty.call(this.templateCoupon, 'id')) {
        const url = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.templateCoupon.id}`
        this.axios.patch(url, this.templateCoupon)
          .then((res) => {
            // eslint-disable-next-line no-undef
            $('#couponModal').modal('hide')
            this.getCoupon()
          })
      } else {
        const url = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/admin/ec/coupon`
        this.templateCoupon.deadline_at = this.endDate + ' ' + this.endTime
        this.axios.post(url, this.templateCoupon)
          .then((res) => {
            // eslint-disable-next-line no-undef
            $('#couponModal').modal('hide')
            this.getCoupon()
          })
          .catch((err) => {
            alert(err)
            // eslint-disable-next-line no-undef
            $('#couponModal').modal('hide')
            this.isLoading = false
          })
      }
    },
    deleteCoupon () {
      this.isLoading = true
      const url = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.templateCoupon.id}`
      this.axios.delete(url)
        .then((res) => {
          // eslint-disable-next-line no-undef
          $('#delCouponModal').modal('hide')
          this.getCoupon()
        })
    },
    openCouponModal (isNew, item) {
      switch (isNew) {
        case 'new':
          this.templateCoupon = {}
          // eslint-disable-next-line no-undef
          $('#couponModal').modal('show')
          break

        case 'edit':
          this.templateCoupon = JSON.parse(JSON.stringify(item))
          // eslint-disable-next-line no-case-declarations
          const timeArr = this.templateCoupon.deadline.datetime.split(' ')
          this.endDate = timeArr[0] // 日期
          this.endTime = timeArr[1] // 時間
          // eslint-disable-next-line no-undef
          $('#couponModal').modal('show')
          break

        case 'delete':
          this.templateCoupon = JSON.parse(JSON.stringify(item))
          // eslint-disable-next-line no-undef
          $('#delCouponModal').modal('show')
          break

        default:
          break
      }
    }
  }
}
</script>
