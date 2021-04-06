<template>
  <div style="height: 100%;display: flex;flex-direction: column;">
    <div class="options-area">
      <el-button class="custom" size="small" @click="tableData.add" v-permission="[$route, 'add']">添加角色</el-button>
    </div>
    <div style="flex-grow: 1;padding: 25px;display: flex;flex-direction: column;justify-content: space-between;">
      <el-table :data="tableData.list" stripe :height="tableHeight">
        <el-table-column prop="name" label="角色名称" width="250"></el-table-column>
        <el-table-column prop="description" label="角色描述"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template #default="scope">
            <el-button @click="tableData.detail(scope.row)" type="text" size="small" v-permission="[$route, 'view']">详情
            </el-button>
            <el-button @click="tableData.edit(scope.row)" type="text" size="small" v-permission="[$route, 'edit']">编辑
            </el-button>
            <el-button @click="tableData.del(scope.row)" type="text" size="small" v-permission="[$route, 'delete']">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination small :current-page="page.index" :page-size="page.size" :page-sizes="[10, 15, 30, 50]"
                     layout="total, sizes, prev, pager, next, jumper" :total="tableData.total"
                     @size-change="page.sizeChange" @current-change="page.indexChange">
      </el-pagination>
    </div>

    <el-dialog custom-class="custom" :title="dialog.title" v-model="dialog.visible" :close-on-click-modal="false"
               destroy-on-close>
      <detail :id="dialog.currDataId" :mode="dialog.mode"></detail>
    </el-dialog>
  </div>
</template>

<script>
import {defineComponent, reactive, provide, computed} from 'vue'
import Detail from './components/Detail'
import {ElMessageBox} from 'element-plus'
import $api from '@/api'

const moduleName = '角色'

export default defineComponent({
  name: "RoleList",
  components: {
    Detail
  },
  setup() {
    const tableHeight = window.innerHeight - 353

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
      currDataId: '',
      mode: 'add',
      title: computed(() => {
        const titles = {
          add: `添加${moduleName}`,
          view: `${moduleName}详情`,
          edit: `编辑${moduleName}`
        }
        return titles[dialog.mode]
      }),
      open() {
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
        const {list, total} = await $api.permissionApi.role.getList({
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
      detail(data) {
        dialog.currDataId = data.id
        dialog.mode = 'view'
        dialog.open()
      },
      edit(data) {
        dialog.currDataId = data.id
        dialog.mode = 'edit'
        dialog.open()
      },
      del(data) {
        ElMessageBox.confirm(`确认删除${moduleName}“${data.name}”？`, {type: 'warning'}).then(async () => {
          const {code} = await $api.permissionApi.role.del({
            id: data.id
          })
          if (code === 200) {
            await tableData.getList()
          }
        }).catch((err) => {
          console.log(err);
        })
      }
    })

    tableData.getList()

    provide('closeDialog', dialog.close)

    return {
      tableHeight,
      page,
      dialog,
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