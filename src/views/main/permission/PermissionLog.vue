<template>
  <div style="height: 100%;display: flex;flex-direction: column;">
    <div style="flex-grow: 1;padding: 25px;display: flex;flex-direction: column;justify-content: space-between;">
      <el-table :data="tableData.list" stripe :height="$getTableHeight(false)">
        <el-table-column prop="time" label="时间" width="250"></el-table-column>
        <el-table-column prop="description" label="操作描述"></el-table-column>
      </el-table>
      <el-pagination small :current-page="page.index" :page-size="page.size" :page-sizes="[10, 15, 30, 50]"
                     layout="total, sizes, prev, pager, next, jumper" :total="tableData.total" @size-change="page.sizeChange"
                     @current-change="page.indexChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {defineComponent, reactive} from 'vue'
import $api from '@/api'

export default defineComponent({
  name: "PermissionLog",
  setup() {
    const page = reactive({
      index: 1,
      size: 15,
      sizeChange(size) {
        page.size = size
        tableData.getList()
      },
      indexChange(index) {
        page.index = index
        tableData.getList()
      }
    })

    const tableData = reactive({
      list: [],
      total: 0,
      getList: async () => {
        const {list, total} = await $api.permissionApi.getLogs({
          page: page.index,
          pageSize: page.size
        })
        tableData.list = list
        tableData.total = total
      }
    })

    tableData.getList()

    return {
      page,
      tableData
    }
  }
})
</script>

<style scoped lang="scss">
.options-area {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>