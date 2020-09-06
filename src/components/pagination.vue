<template>
    <div>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
            <li class="page-item" :class="{'disabled': innerPagination.current_page == 1}">
                <a class="page-link rounded-0" href="#" aria-label="Previous" @click.prevent="changePage(innerPagination.current_page - 1)">
                <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li v-for="item in innerPagination.total_pages"
                :key="item" class="page-item"
                :class="{'active': item === innerPagination.current_page}">
                <a class="page-link" href="#" @click.prevent="changePage(item)">{{ item }}</a>
            </li>
            <li
                class="page-item" :class="{'disabled': innerPagination.current_page === innerPagination.total_pages}">
                <a class="page-link rounded-0" href="#" aria-label="Next" @click.prevent="changePage(innerPagination.current_page + 1)">
                <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: ['innerPagination'],
  methods: {
    changePage (onePage) {
      this.$emit('change-page', onePage)
    }
  }
}
</script>
