<template>
  <div style="height: 100%;display: flex;flex-direction: column;">
    <table-options-header>
      <template #right>
        <el-button class="custom" size="small" @click="tableData.add" v-permission="[$route, 'add']">添加角色</el-button>
      </template>
    </table-options-header>
    <div style="flex-grow: 1;padding: 25px;display: flex;flex-direction: column;justify-content: space-between;">
      <el-table :data="tableData.list" stripe :height="$getTableHeight()">
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
      <table-pagination-footer :page-index="page.index" :page-size="page.size" :total="tableData.total"
                               @size-change="page.sizeChange" @index-change="page.indexChange">
      </table-pagination-footer>
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

export default defineComponent({
  name: "RoleList",
  components: {
    Detail
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
      currDataId: '',
      mode: 'add',
      title: computed(() => {
        const titles = {
          add: `添加角色`,
          view: `角色详情`,
          edit: `编辑角色`
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
        ElMessageBox.confirm(`确认删除角色“${data.name}”？`, {type: 'warning'}).then(async () => {
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