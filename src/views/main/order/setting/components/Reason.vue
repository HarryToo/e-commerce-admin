<template>
  <div>
    <table-options-header style="height: 65px;">
      <template #right>
        <el-button class="custom" size="small" @click="dialog.open('add')">新增</el-button>
      </template>
    </table-options-header>
    <div style="padding: 0 25px 25px;">
      <el-table :data="tableData.list" stripe :height="$getTableHeight()">
        <el-table-column label="退换货原因" prop="reason" width="350"></el-table-column>
        <el-table-column label="备注信息" prop="remark"></el-table-column>
        <el-table-column label="状态/更新时间" prop="status" align="center" width="210">
          <template #default="scope">
            <div style="color: #3CC327;" v-if="scope.row.status === 1">启用</div>
            <div style="color: #FF3A30;" v-else>禁用</div>
            <div>{{ scope.row.updateTime }}</div>
          </template>
        </el-table-column>
        <el-table-column label="更新人" prop="updater" width="150"></el-table-column>
        <el-table-column label="操作" width="170">
          <template #default="scope">
            <el-button @click="dialog.open('edit', scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="tableData.disable(scope.row)" type="text" size="small" v-if="scope.row.status === 1">禁用
            </el-button>
            <el-button @click="tableData.enable(scope.row)" type="text" size="small" v-else>启用</el-button>
            <el-button @click="tableData.del(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <table-pagination-footer :page-index="page.index" :page-size="page.size" :total="tableData.total"
                               @size-change="page.sizeChange" @index-change="page.indexChange">
      </table-pagination-footer>
    </div>

    <el-dialog v-model="dialog.visible" :title="dialog.title" width="500px" custom-class="custom"
               :close-on-click-modal="false" destroy-on-close>
      <reason-edit :mode="dialog.mode" :detail="dialog.currData"></reason-edit>
    </el-dialog>
  </div>
</template>

<script>
import {defineComponent, reactive, computed, provide} from 'vue'
import {ElMessage, ElMessageBox} from "element-plus"
import ReasonEdit from './ReasonEdit'
import $api from '@/api'

export default defineComponent({
  name: "ReturnReasonSetting",
  components: {
    ReasonEdit
  },
  setup() {
    const page = reactive({
      index: 1,
      size: 10,
      sizeChange(size) {
        page.size = size
        tableData.getList()
      },
      indexChange(index) {
        page.index = index
        tableData.getList()
      }
    })

    const dialog = reactive({
      visible: false,
      currData: {},
      mode: 'add',
      title: computed(() => {
        const titles = {
          add: `新增退换货原因`,
          edit: `编辑退换货原因`
        }
        return titles[dialog.mode]
      }),
      open(mode, data) {
        dialog.mode = mode
        dialog.currData = data || {}
        dialog.visible = true
      },
      close() {
        dialog.visible = false
      }
    })

    const tableData = reactive({
      list: [],
      total: 0,
      getList: async () => {
        const {list, total} = await $api.orderApi.returnReason.getList({
          page: page.index,
          pageSize: page.size
        })
        tableData.list = list
        tableData.total = total
      },
      add() {
        dialog.currDataId = ''
        dialog.mode = 'add'
        dialog.open()
      },
      edit(data) {
        dialog.currDataId = data.id
        dialog.mode = 'edit'
        dialog.open()
      },
      del(data) {
        ElMessageBox.confirm(`删除后，客户退换货将无法选择此项，请谨慎操作！`, `确认删除退换货原因“${data.reason}”？`, {type: 'warning'}).then(async () => {
          const {code} = await $api.orderApi.returnReason.del({
            id: data.id
          })
          if (code === 200) {
            ElMessage.success('已删除')
            await tableData.getList()
          }
        }).catch((err) => {
        })
      },
      enable: async (data) => {
        const {code} = await $api.orderApi.returnReason.enable({
          id: data.id
        })
        if (code === 200) {
          ElMessage.success('已启用')
          data.status = 1
        }
      },
      disable(data) {
        ElMessageBox.confirm(`禁用后，客户退换货将无法选择此项，请谨慎操作！`, `确认禁用退换货原因“${data.reason}”？`, {type: 'warning'}).then(async () => {
          const {code} = await $api.orderApi.returnReason.disable({
            id: data.id
          })
          if (code === 200) {
            ElMessage.success('已禁用')
            data.status = 0
          }
        }).catch((err) => {
        })
      }
    })

    tableData.getList()

    provide('closeDialog', dialog.close)
    provide('getList', tableData.getList)

    return {
      page,
      dialog,
      tableData
    }
  }
})
</script>

<style scoped lang="scss">

</style>