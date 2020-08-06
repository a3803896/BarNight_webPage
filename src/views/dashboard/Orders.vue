<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <table class="table table-hover mt-4">
                <thead>
                    <tr>
                        <th>
                            下單時間
                        </th>
                        <th>
                          購買款項
                        </th>
                        <th>
                            付款方式
                        </th>
                        <th>
                            應付金額
                        </th>
                        <th>
                            是否付款
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item) in orders" :key="item.id">
                        <td>
                            {{ item.created.datetime }}
                        </td>
                        <td>
                          <ul class="list-unstyled">
                            <li
                              v-for="(product, key) in item.products"
                              :key="key"
                            >
                              {{ product.product.title }} ：{{ product.quantity }}
                              {{ product.product.unit }}
                            </li>
                          </ul>
                        </td>
                        <td class="">
                            {{ item.payment }}
                        </td>
                        <td class="">
                            {{ item.amount }}
                        </td>
                        <td>
                            <span v-if="item.paid" class="text-success">已付款</span>
                            <span v-else>未付款</span>
                        </td>
                        <td>
                            <button type="button" class="btn btn-primary" @click="openDetail(item)">詳情</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- Modal -->
            <div class="modal fade" id="orderDetail" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">

                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                  </div>
                </div>
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
      token: '',
      orders: []
    }
  },
  created () {
    this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.getOrders()
  },
  methods: {
    getOrders () {
      const url = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/admin/ec/orders`
      this.axios.defaults.headers.Authorization = `Bearer ${this.token}`
      this.axios.get(url)
        .then((res) => {
          this.orders = res.data.data
        })
    },
    openDetail (item) {
      console.log(item)
      $('#orderDetail').modal('show')
    }
  }
}
</script>
