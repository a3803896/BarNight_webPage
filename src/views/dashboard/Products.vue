<template>
    <div>
        <div class="container">
            <div class="text-right mt-3">
                <button class="btn btn-primary" @click="openModal('new')">
                    建立新的產品
                </button>
            </div>
            <table class="table table-hover mt-4">
                <thead>
                    <tr>
                        <th width="120">
                            分類
                        </th>
                        <th>產品名稱</th>
                        <th width="120">
                            原價
                        </th>
                        <th width="120">
                            售價
                        </th>
                        <th width="100">
                            是否啟用
                        </th>
                        <th width="120">
                            編輯
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item) in products" :key="item.id">
                        <td>
                            {{ item.category }}
                        </td>
                        <td class="h5">
                            {{ item.title }}
                        </td>
                        <td class="text-left">
                            {{ item.origin_price }}
                        </td>
                        <td class="text-left text-danger h5">
                            {{ item.price }}
                        </td>
                        <td>
                            <span v-if="item.enabled" class="text-success">啟用</span>
                            <span v-else>未啟用</span>
                        </td>
                        <td>
                            <div class="btn-group">
                                <button class="btn btn-outline-primary btn-sm" @click="openModal('edit',item)">
                                    編輯
                                </button>
                                <button class="btn btn-outline-danger btn-sm" @click="openModal('delete',item)">
                                    刪除
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <pagination :inner-pagination="pagination" @change-page="getData"></pagination>
            <loading :active.sync="isLoading"></loading>
            <!-- Modal -->
            <div id="productModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-xl" role="document">
                    <div class="modal-content border-0">
                        <div class="modal-header bg-dark text-white">
                            <h5 id="exampleModalLabel" class="modal-title">
                                <span>新增產品</span>
                            </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" class="text-white">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-sm-4">
                                    <div v-for="i in 4" :key="i + 'img'" class="form-group">
                                        <label :for="'img' + i">輸入圖片網址</label>
                                        <input :id="'img' + i" v-model="tempProduct.imageUrl[i - 1]" type="text"
                                            class="form-control" placeholder="請輸入圖片連結">
                                    </div>
                                    <div class="form-group">
                                        <label for="customFile">
                                            或 上傳圖片
                                        </label>
                                        <input id="customFile" ref="file" type="file" class="form-control"
                                            @change="uploadFile">
                                    </div>
                                    <img class="img-fluid" :src="tempProduct.imageUrl[0]" alt />
                                </div>
                                <div class="col-sm-8">
                                    <div class="form-group">
                                        <label for="title">標題</label>
                                        <input id="title" type="text" class="form-control" placeholder="請輸入標題"
                                            v-model="tempProduct.title">
                                    </div>

                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="category">分類</label>
                                            <input id="category" type="text" class="form-control" placeholder="請輸入分類"
                                                v-model="tempProduct.category">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="price">單位</label>
                                            <input id="unit" type="text" class="form-control" placeholder="請輸入單位"
                                                v-model="tempProduct.unit">
                                        </div>
                                    </div>

                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="origin_price">原價</label>
                                            <input id="origin_price" type="number" class="form-control"
                                                placeholder="請輸入原價" v-model="tempProduct.origin_price">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="price">售價</label>
                                            <input id="price" type="number" class="form-control" placeholder="請輸入售價"
                                                v-model="tempProduct.price">
                                        </div>
                                    </div>
                                    <hr>

                                    <div class="form-group">
                                        <label for="description">產品描述</label>
                                        <textarea id="description" type="text" class="form-control"
                                            placeholder="請輸入產品描述" v-model="tempProduct.description">
                                        </textarea>
                                    </div>
                                    <div class="form-group">
                                        <label for="content">說明內容</label>
                                        <textarea id="description" type="text" class="form-control"
                                            placeholder="請輸入說明內容" v-model="tempProduct.content">
                                        </textarea>
                                    </div>
                                    <div class="form-group d-flex">
                                        <div class="form-check mr-5">
                                            <input id="enabled" class="form-check-input" type="checkbox"
                                                v-model="tempProduct.enabled">
                                            <label class="form-check-label" for="enabled">是否啟用</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
                                取消
                            </button>
                            <button type="button" class="btn btn-primary" @click="updateProduct">
                                確認
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="delProductModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
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
                            <strong class="text-danger" id="deleteTitle"></strong>
                            商品(刪除後將無法恢復)。
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
                                取消
                            </button>
                            <button type="button" class="btn btn-danger" @click="delProduct">
                                確認刪除
                            </button>
                        </div>
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
      isLoading: false,
      token: '',
      products: [],
      tempProduct: {
        imageUrl: []
      },
      pagination: {}
    }
  },
  created () {
    this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.getData(1)
  },
  methods: {
    getData (onePage) {
      this.isLoading = true
      const api = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/admin/ec/products?page=${onePage}`
      this.axios.defaults.headers.Authorization = `Bearer ${this.token}`
      this.axios.get(api)
        .then((res) => {
          this.products = res.data.data
          this.pagination = res.data.meta.pagination
          window.scrollTo(0, 0)
          this.isLoading = false
        //   console.log(res.data.data)
          // console.log(res.data.meta.pagination);
        })
        .catch((error) => {
          alert(error)
        })
    },
    openModal (isNew, item) {
      switch (isNew) {
        case 'new':
          this.tempProduct = {
            imageUrl: []
          }
          // eslint-disable-next-line no-undef
          $('#productModal').modal('show')
          break

        case 'edit':
          this.tempProduct = JSON.parse(JSON.stringify(item))
          // eslint-disable-next-line no-undef
          $('#productModal').modal('show')
          break

        case 'delete':
          this.tempProduct = JSON.parse(JSON.stringify(item))
          // eslint-disable-next-line no-undef
          $('#delProductModal').modal('show')
          break

        default:
          break
      }
    },
    updateProduct () {
      this.isLoading = true
      // eslint-disable-next-line no-prototype-builtins
      if (this.tempProduct.hasOwnProperty('id')) {
        const api = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`
        const data = this.tempProduct
        this.axios.patch(api, data)
          .then((res) => {
            console.log(res)
            this.getData()
            this.isLoading = false
          })
          .catch((error) => {
            alert(error)
            this.getData()
          })
      } else {
        this.isLoading = true
        const api = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/admin/ec/product`
        const data = this.tempProduct
        this.axios.post(api, data)
          .then((res) => {
            console.log(res)
            this.getData()
            this.isLoading = false
          })
          .catch((error) => {
            alert(error)
            this.getData()
          })
      }
      this.tempProduct = {
        imageUrl: []
      }
      // eslint-disable-next-line no-undef
      $('#productModal').modal('hide')
    },
    delProduct () {
      this.isLoading = true
      const api = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`
      this.axios.defaults.headers.Authorization = `Bearer ${this.token}`
      this.axios.delete(api).then(() => {
        // eslint-disable-next-line no-undef
        $('#delProductModal').modal('hide')
        this.getData(this.pagination.current_page)
        this.isLoading = false
      })
    },
    uploadFile () {
      this.isLoading = true
      const uploadingFile = document.querySelector('#customFile').files[0]
      const formData = new FormData()
      formData.append('file', uploadingFile)
      const url = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/admin/storage`
      this.axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          console.log(res)
          this.tempProduct.imageUrl.push(res.data.data.path)
          document.querySelector('#customFile').value = ''
          this.isLoading = false
        })
    }
  }
}
</script>
