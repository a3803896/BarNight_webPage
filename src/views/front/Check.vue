<template>
  <div class="container check py-3 pb-5 pb-sm-0">
    <div class="row">
      <div class="col-12">
        <table class="table table-hover table-borderless table-dark noto text-white ">
          <thead class="border-bottom">
            <tr>
              <th class="d-none d-md-block">
                下單時間
              </th>
              <th>
                購買款項
              </th>
              <th class="d-none d-md-block">
                付款方式
              </th>
              <th>
                金額
              </th>
              <th>
                狀態
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item) in paidCheckList" :key="item.id">
              <td class="d-none d-md-block">
                {{ item.created.datetime }}
              </td>
              <td>
                <ul class="discList m-0">
                  <li v-for="(product, key) in item.products" :key="key">
                    {{ product.product.title }}
                    <span class="d-none d-md-inline">：{{ product.quantity }}{{ product.product.unit }}</span>
                  </li>
                </ul>
              </td>
              <td class="d-none d-md-block">
                {{ item.payment }}
              </td>
              <td>
                {{ item.amount }}
              </td>
              <td>
                <span v-if="item.paid" class="text-main">已付款</span>
                <span v-else>未付款</span>
              </td>
              <td>
                <button type="button" class="btn btn-main rounded-0" @click="openDetail(item)">去結帳</button>
              </td>
            </tr>
          </tbody>
        </table>
        <Mypagination :inner-pagination="pagination" @change-page="getcheckList"></Mypagination>
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
      checkList: []
    }
  },
  created () {
    this.getcheckList()
  },
  computed: {
    paidCheckList () {
      return this.checkList.filter((item) => item.paid === false)
    }
  },
  methods: {
    getcheckList (onePage) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/orders`
      this.axios.get(url)
        .then((res) => {
          this.checkList = res.data.data
          this.pagination = res.data.meta.pagination
          this.isLoading = false
        })
        .catch(() => {
          $('.alert').removeClass('d-none')
          this.isLoading = false
        })
    },
    openDetail (item) {
      this.$router.push(`/check_detail/${item.id}`)
    }
  }
}
</script>
