<template>
  <div style="height: 100%;display: flex;flex-direction: column;">
    <div class="options-area">
      <el-button class="custom" size="small" @click="addDialogVisible = true">添加角色</el-button>
    </div>
    <div style="flex-grow: 1;padding: 25px;display: flex;flex-direction: column;justify-content: space-between;">
      <el-table :data="dataList" stripe style="width: 100%">
        <el-table-column prop="name" label="角色名称" width="250"></el-table-column>
        <el-table-column prop="description" label="角色描述"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template #default="scope">
            <el-button type="text" size="small">编辑</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination small :current-page="page" :page-size="10" layout="total, prev, pager, next, jumper"
                     :total="dataTotal" @current-change="pageChange">
      </el-pagination>
    </div>

    <el-dialog custom-class="custom" title="添加角色" v-model="addDialogVisible" :close-on-click-modal="false">
      <detail></detail>
    </el-dialog>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import Detail from './components/Detail'
import $api from '@/api'

export default defineComponent({
  name: "RoleList",
  components: {
    Detail
  },
  setup() {
    const addDialogVisible = ref(true)

    const page = ref(1)
    const dataList = ref([])
    const dataTotal = ref(0)

    const getRoleList = async () => {
      const {list, total} = await $api.permissionApi.getRoleList({
        page: page.value,
        pageSize: 10
      })
      dataList.value = list
      dataTotal.value = total
    }
    getRoleList()

    const pageChange = (index) => {
      page.value = index
      getRoleList()
    }

    return {
      addDialogVisible,
      page,
      dataTotal,
      dataList,
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