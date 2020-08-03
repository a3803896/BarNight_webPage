<template>
  <div>後台訂單列表</div>
</template>

<script>
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
    }
  }
}
</script>
