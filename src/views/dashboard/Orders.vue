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
                  <li v-for="(product, key) in item.products" :key="key">
                    {{ product.product.title }} ：{{ product.quantity }}
                    {{ product.product.unit }}
                  </li>
                </ul>
              </td>
              <td>
                {{ item.payment }}
              </td>
              <td>
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
        <Mypagination :inner-pagination="pagination" @change-page="getOrders"></Mypagination>
        <loading :active.sync="isLoading"></loading>
      </div>
    </div>

  </div>
</template>

<script>
/* global $ */
export default {
  data () {
    return {
      isLoading: false,
      pagination: {},
      orders: []
    }
  },
  created () {
    this.getOrders()
  },
  methods: {
    getOrders (onePage) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/orders?page=${onePage}`
      this.axios.get(url)
        .then((res) => {
          this.orders = res.data.data
          this.pagination = res.data.meta.pagination
          this.isLoading = false
        })
        .catch(() => {
          $('.alert').removeClass('d-none')
          this.isLoading = false
        })
    },
    openDetail (item) {
      this.$router.push(`/admin/order/${item.id}`)
    }
  }
}
</script>
