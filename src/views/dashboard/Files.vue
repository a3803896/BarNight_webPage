<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="d-flex justify-content-lg-between flex-wrap">
                    <div v-for="item in files" :key="item.id" class="card align-self-end mb-3" style="width: 32%;">
                        <img :src="item.path" class="card-img-top">
                        <div class="card-body d-flex justify-content-lg-between">
                            <button type="button" class="btn btn-outline-danger" @click.prevent="openFile('delete',item)">刪除</button>
                            <button type="button" class="btn btn-info w-75" @click.prevent="openFile('open',item)">查看</button>
                        </div>
                    </div>
                </div>
                <pagination :inner-pagination="pagination" @change-page="getFiles"></pagination>
                <loading :active.sync="isLoading"></loading>
                <!-- modal -->
                <div class="modal fade" id="fileModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-xl pb-5">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">圖片</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body d-flex justify-content-center">
                        <img :src="imgPath" alt="">
                      </div>
                    </div>
                  </div>
              </div>

              <div id="delFileModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
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
                            是否刪除此圖片？
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
                                取消
                            </button>
                            <button type="button" class="btn btn-danger" @click="delFile">
                                確認刪除
                            </button>
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
      pagination: {},
      files: [],
      imgPath: '',
      imgId: '',
      isLoading: false
    }
  },
  created () {
    this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.getFiles()
  },
  methods: {
    getFiles (page) {
      this.isLoading = true
      const url = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/admin/storage?page=${page}`
      this.axios.defaults.headers.Authorization = `Bearer ${this.token}`
      this.axios.get(url)
        .then((res) => {
          this.files = res.data.data
          this.pagination = res.data.meta.pagination
          this.isLoading = false
        })
    },
    openFile (which, item) {
      switch (which) {
        case 'open':
          this.imgPath = item.path
          $('#fileModal').modal('show')
          break

        case 'delete':
          this.imgId = item.id
          $('#delFileModal').modal('show')
          break

        default:
          break
      }
    },
    delFile () {
      this.isLoading = true
      const url = `https://course-ec-api.hexschool.io/api/${process.env.VUE_APP_UUID}/admin/storage/${this.imgId}`
      this.axios.delete(url)
        .then((res) => {
          console.log(res)
          this.getFiles()
          $('#delFileModal').modal('hide')
        })
    }
  }
}
</script>
