<template>
  <div class="container">
    <div class="d-flex justify-content-end pt-3">
      <button type="button" class="btn btn-primary" @click="openCouponModal('new')">
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
            價格*百分比
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
              <button type="button" class="btn btn-outline-primary btn-sm" @click="openCouponModal('edit',item)">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm" @click="openCouponModal('delete',item)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Mypagination :inner-pagination="pagination" @change-page="getCoupon"></Mypagination>
    <loading :active.sync="isLoading"></loading>

    <!-- modal -->
    <div id="couponModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content border-0">
          <div class="modal-header">
            <h2>新增優惠券</h2>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <validation-observer v-slot="{ invalid }">
              <form>
                <validation-provider rules="required" v-slot="{ errors, classes }">
                  <label for="couponName">優惠券名稱</label>
                  <input type="text" id="couponName" name="優惠券名稱" class="form-control mb-2" :class="classes"
                    placeholder="輸入名稱" v-model="templateCoupon.title">
                  <span class="invalid-feedback mb-2">{{ errors[0] }}</span>
                </validation-provider>

                <validation-provider rules="required" v-slot="{ errors, classes }">
                  <label for="couponCode">優惠券序號</label>
                  <input type="text" id="couponCode" name="優惠券序號" class="form-control mb-2" :class="classes"
                    placeholder="輸入序號" v-model="templateCoupon.code">
                  <span class="invalid-feedback mb-2">{{ errors[0] }}</span>
                </validation-provider>

                <validation-provider rules="required|integer" v-slot="{ errors, classes }">
                  <label for="percentOff">折扣百分比</label>
                  <input type="number" id="percentOff" name="折扣百分比" class="form-control mb-2" :class="classes"
                    placeholder="輸入整數" v-model="templateCoupon.percent">
                  <span class="invalid-feedback mb-2">{{ errors[0] }}</span>
                </validation-provider>

                <validation-provider rules="required" v-slot="{ errors, classes }">
                  <label for="endDate">到期日</label>
                  <input type="date" id="endDate" name="到期日" class="form-control mb-2" :class="classes"
                    v-model="endDate">
                  <span class="invalid-feedback mb-2">{{ errors[0] }}</span>
                </validation-provider>

                <validation-provider rules="required" v-slot="{ errors, classes }">
                  <label for="endTime">到期時間</label>
                  <input type="time" id="endTime" step="1" name="到期日" class="form-control mb-2" :class="classes"
                    v-model="endTime">
                  <span class="invalid-feedback mb-2">{{ errors[0] }}</span>
                </validation-provider>

                <input type="checkbox" id="isOpen" name="是否啟用" class="mr-2 mb-2" v-model="templateCoupon.enabled">
                <label for="isOpen">是否啟用</label>
                <br>
                <div class="d-flex justify-content-end">
                  <button type="button" class="btn btn-success" :disabled="invalid" @click="sendCoupon">送出</button>
                </div>
              </form>
            </validation-observer>
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
/* global $ */
export default {
  data () {
    return {
      coupons: [],
      isNew: false,
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
    getCoupon (page = 1) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupons?page=${page}`
      this.axios.get(url)
        .then((res) => {
          this.coupons = res.data.data
          this.pagination = res.data.meta.pagination
          this.isLoading = false
        })
        .catch(() => {
          $('.alert').removeClass('d-none')
        })
    },
    sendCoupon () {
      let api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupon`
      this.templateCoupon.deadline_at = this.endDate + ' ' + this.endTime
      let httpMethod = 'post'
      if (!this.isNew) {
        api = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.templateCoupon.id}`
        httpMethod = 'patch'
      }
      this.axios[httpMethod](api, this.templateCoupon).then(() => {
        $('#couponModal').modal('hide')
        this.isLoading = false
        this.getCoupon()
      }).catch(() => {
        this.isLoading = false
        $('.alert').removeClass('d-none')
        $('#couponModal').modal('hide')
      })
    },
    deleteCoupon () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.templateCoupon.id}`
      this.axios.delete(url)
        .then((res) => {
          $('#delCouponModal').modal('hide')
          this.getCoupon()
        })
        .catch(() => {
          $('.alert').removeClass('d-none')
          $('#couponModal').modal('hide')
          this.isLoading = false
        })
    },
    openCouponModal (isNew, item) {
      switch (isNew) {
        case 'new':
          this.isNew = true
          this.templateCoupon = {}
          $('#couponModal').modal('show')
          break

        case 'edit':
          this.isNew = false
          this.templateCoupon = JSON.parse(JSON.stringify(item))
          // eslint-disable-next-line no-case-declarations
          const timeArr = this.templateCoupon.deadline.datetime.split(' ')
          this.endDate = timeArr[0] // 日期
          this.endTime = timeArr[1] // 時間
          $('#couponModal').modal('show')
          break

        case 'delete':
          this.templateCoupon = JSON.parse(JSON.stringify(item))
          $('#delCouponModal').modal('show')
          break

        default:
          break
      }
    }
  }
}
</script>
