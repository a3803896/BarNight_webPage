<template>
  <div class="cart pb-3">
    <div class="container">
      <form class="pt-3 pb-3 pt-lg-4 pb-lg-4">
        <validation-observer v-slot="{ invalid }">
          <div class="d-flex justify-content-end">
              <button class="btn btn-outline-sub noto bold btn-sm rounded-0 mb-3" @click.prevent="clearAll">清空購物車</button>
          </div>
          <div class="row justify-content-center text-white pt-lg-4 pb-lg-4 flex-column-reverse align-items-center flex-lg-row mb-3">
            <div class="col-12 col-md-8 col-lg-4">
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
                  <textarea v-model="form.message" name="給賣家的話" id="msgForSeller" rows="2" class="form-control"></textarea>
            </div>
            <div class="col-12 col-md-8 col-lg-8">
              <div class="cartCard d-flex mb-3" v-for="item in cartProducts" :key="item.product.id">
                <img :src="item.product.imageUrl[0]" alt="" class="w-25">
                <div class="w-75 bg-gray p-2 p-lg-3 text-black noto bold d-flex flex-column justify-content-between">
                    <div>
                      <h5 class="d-flex justify-content-between align-items-center mb-lg-1">
                      {{ item.product.title }}
                      <i class="pointer material-icons" @click.prevent="deleteCart(item)">clear</i>
                      </h5>
                      <p class="text-sub">NT${{ item.product.price }}</p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <button
                            type="button"
                            class="btn d-flex align-items-center p-0 pl-1 pr-1"
                            @click.prevent="editCart('minus',item)"
                          >
                            <span class="material-icons">remove</span>
                          </button>
                        </div>
                        <span class="p-2 pl-3 pr-3">{{ item.quantity }}</span>
                        <div class="input-group-append">
                          <button
                            type="button"
                            class="btn d-flex align-items-center p-0 pl-1 pr-1"
                            @click.prevent="editCart('plus',item)"
                          >
                            <span class="material-icons">add</span>
                          </button>
                        </div>
                      </div>
                      <h5 class="bold">NT${{ item.quantity*item.product.price }}</h5>
                    </div>
                </div>
              </div>
              <h2 class="noto text-right text-main bold">Total：NT$<span id="totalPrice"></span></h2>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button type="button" :disabled="invalid" class="btn btn-main rounded-0" @click.prevent="sendOrder">
              送出訂單
            </button>
          </div>
        </validation-observer>
      </form>
      <pagination :inner-pagination="pagination" @change-page="getCart"></pagination>
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
      this.isLoading = true
      const url = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/ec/orders`
      this.axios.post(url, this.form).then((res) => {
        this.getCart()
        this.form = {
          name: '',
          email: '',
          tel: '',
          address: '',
          payment: '',
          message: ''
        }
      })
    }
  }
}
</script>
