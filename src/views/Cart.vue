<template>
  <div>
    <div class="container">
      <div class="row d-flex justify-content-center pt-5 mb-3">
        <div class="col-9">
          <div class="d-flex justify-content-end mb-3">
            <button class="btn btn-outline-danger btn-sm" @click="clearAll">清空購物車</button>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>刪除</th>
                <th>品名</th>
                <th>數量</th>
                <th>單位</th>
                <th>單價</th>
                <th class="text-right">小計</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cartProducts" :key="item.product.id">
                <td>
                  <button
                    type="button"
                    class="btn btn-outline-danger d-flex p-1"
                    @click="deleteCart(item)"
                  >
                    <span class="material-icons">delete_forever</span>
                  </button>
                </td>
                <td>{{ item.product.title }}</td>
                <td>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <button
                        type="button"
                        class="btn btn-outline-primary d-flex align-items-center p-0 pl-1 pr-1"
                        @click="editCart('minus',item)"
                      >
                        <span class="material-icons">remove</span>
                      </button>
                    </div>
                    <span class="p-2 pl-3 pr-3">{{ item.quantity }}</span>
                    <div class="input-group-append">
                      <button
                        type="button"
                        class="btn btn-outline-primary d-flex align-items-center p-0 pl-1 pr-1"
                        @click="editCart('plus',item)"
                      >
                        <span class="material-icons">add</span>
                      </button>
                    </div>
                  </div>
                </td>
                <td>{{ item.product.unit }}</td>
                <td>{{ item.product.price }}</td>
                <td class="text-right">{{ item.quantity*item.product.price }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td class="text-right">總計：</td>
                <td class="text-right bold" id="totalPrice"></td>
              </tr>
            </tfoot>
          </table>
          <pagination :inner-pagination="pagination" @change-page="getCart"></pagination>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-5">
          <form action class="mb-5">
            <validation-observer v-slot="{ invalid }">
              <validation-provider rules="required" v-slot="{ errors, classes }">
                <label for="name" class="mb-1 bold">收件人姓名</label>
                <input
                  v-model="form.name"
                  type="text"
                  id="name"
                  name="收件人姓名"
                  class="form-control mb-2"
                  :class="classes"
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </validation-provider>

              <validation-provider rules="required|email" v-slot="{ errors, classes }">
                <label for="email" class="mb-1 bold">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  id="email"
                  name="電子郵件"
                  class="form-control mb-2"
                  :class="classes"
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </validation-provider>

              <validation-provider rules="required|min:8" v-slot="{ errors, classes }">
                <label for="tel" class="mb-1 bold">電話</label>
                <input
                  v-model="form.tel"
                  type="tel"
                  id="tel"
                  name="電話號碼"
                  class="form-control mb-2"
                  :class="classes"
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </validation-provider>

              <validation-provider rules="required" v-slot="{ errors, classes }">
                <label for="address" class="mb-1 bold">地址</label>
                <input
                  v-model="form.address"
                  type="text"
                  id="address"
                  name="地址"
                  class="form-control mb-2"
                  :class="classes"
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </validation-provider>

              <label for="payment" class="mb-1 bold">購買方式</label>
              <select v-model="form.payment" name="付款方式" id="payment" class="form-control mb-2">
                <option value disabled selected>請選擇付款方式</option>
                <option value="WebATM">WebATM</option>
                <option value="ATM">ATM</option>
                <option value="Barcode">Barcode</option>
                <option value="Credit">Credit</option>
                <option value="ApplePay">ApplePay</option>
                <option value="GooglePay">GooglePay</option>
              </select>

              <label for="msgForSeller" class="mb-1 bold">留言給賣家</label>
              <textarea
                v-model="form.message"
                name="給賣家的話"
                id="msgForSeller"
                cols="30"
                rows="4"
                class="form-control mb-2"
              ></textarea>

              <label for="coupon" class="mb-1 bold">優惠券編號</label>
              <input
                v-model="form.coupon"
                type="text"
                id="coupon"
                name="優惠券編號"
                class="form-control mb-4"
              />

              <button
                type="button"
                :disabled="invalid"
                class="btn btn-primary w-25 align-self-end float-right mb-5"
                @click="sendOrder"
              >送出訂單</button>
            </validation-observer>
          </form>
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
      token: '',
      cartProducts: [],
      pagination: {},
      isLoading: false,
      form: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        coupon: '',
        message: ''
      }
    }
  },
  mounted () {
    this.getCart()
  },
  methods: {
    getCart (page) {
      this.isLoading = true
      const url = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/ec/shopping?page=${page}`
      this.axios
        .get(url)
        .then((res) => {
          let totalPrice = 0
          this.cartProducts = res.data.data
          this.pagination = res.data.meta.pagination
          res.data.data.forEach((item) => {
            totalPrice += item.quantity * item.product.price
          })
          document.querySelector('#totalPrice').textContent = totalPrice
          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false
          // location.reload()
        })
    },
    deleteCart (item) {
      this.isLoading = true
      const url = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/ec/shopping/${item.product.id}`
      this.axios.delete(url).then((res) => {
        this.getCart()
        this.isLoading = false
      })
    },
    clearAll () {
      this.isLoading = true
      const url = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/ec/shopping/all/product`
      this.axios.delete(url).then((res) => {
        this.getCart()
        this.isLoading = false
      })
    },
    editCart (which, item) {
      let productPlus = {}
      this.isLoading = true
      const url = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/ec/shopping`

      switch (which) {
        case 'plus':
          productPlus = {
            product: item.product.id,
            quantity: item.quantity + 1
          }
          this.axios.patch(url, productPlus).then((res) => {
            this.getCart()
            this.isLoading = false
          })
          break
        case 'minus':
          if (item.quantity !== 1) {
            const productMinus = {
              product: item.product.id,
              quantity: item.quantity - 1
            }
            this.axios.patch(url, productMinus).then((res) => {
              this.getCart()
              this.isLoading = false
            })
          } else {
            this.isLoading = false
          }
          break

        default:
          break
      }
    },
    sendOrder () {
      const url = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/ec/orders`
      this.axios.post(url, this.form).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>
