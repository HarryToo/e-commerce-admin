<template>
  <div style="height: 100%;display: flex;flex-direction: column;">
    <div style="flex-grow: 1;padding: 25px;display: flex;flex-direction: column;justify-content: space-between;">
      <el-table :data="dataList" stripe>
        <el-table-column prop="time" label="时间" width="250"></el-table-column>
        <el-table-column prop="description" label="操作描述"></el-table-column>
      </el-table>
      <el-pagination small :current-page="page" :page-size="pageSize" :page-sizes="[10, 15, 30, 50]"
                     layout="total, sizes, prev, pager, next, jumper" :total="dataTotal" @size-change="sizeChange"
                     @current-change="pageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import $api from '@/api'

export default defineComponent({
  name: "PermissionLog",
  setup() {
    const page = ref(1)
    const pageSize = ref(15)
    const dataList = ref([])
    const dataTotal = ref(0)

    const sizeChange = (size) => {
      pageSize.value = size
      getLogList()
    }

    const pageChange = (index) => {
      page.value = index
      getLogList()
    }

    const getLogList = async () => {
      const {list, total} = await $api.permissionApi.getLogs({
        page: page.value,
        pageSize: pageSize.value
      })
      dataList.value = list
      dataTotal.value = total
    }
    getLogList()

    return {
      page,
      pageSize,
      dataTotal,
      dataList,
      sizeChange,
      pageChange
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