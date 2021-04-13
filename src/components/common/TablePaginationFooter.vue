<template>
  <div class="table-pagination-footer">
    <div>
      <slot></slot>
    </div>
    <el-pagination small :current-page="pageIndex" :page-size="pageSize" :page-sizes="pageSizeOptions"
                   layout="total, sizes, prev, pager, next, jumper" :total="total"
                   @size-change="$emit('size-change', $event)"
                   @current-change="$emit('index-change', $event)">
    </el-pagination>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "TablePaginationFooter",
  props: {
    pageIndex: Number,
    pageSize: Number,
    pageSizeOptions: {
      type: Array,
      default() {
        return [10, 15, 30, 50]
      }
    },
    total: Number
  },
  emits: ['size-change', 'index-change']
})
</script>

<style scoped lang="scss">
.table-pagination-footer {
  height: 52px;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: flex-end;
}
</style>