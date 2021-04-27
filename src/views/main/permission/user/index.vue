<template>
  <div style="height: 100%;display: flex;flex-direction: column;">
    <table-options-header>
      <el-form :model="search.form" ref="searchForm" inline>
        <el-space size="medium">
          <el-form-item label="用户名称" prop="name" size="small" style="margin-bottom: 0;">
            <el-input v-model="search.form.name" placeholder="请输入用户名称"></el-input>
          </el-form-item>
          <el-form-item label="所属部门" prop="department" size="small" style="margin-bottom: 0;">
            <el-select v-model="search.form.department" placeholder="请选择所属部门">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="item in departmentData.list" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属角色" prop="role" size="small" style="margin-bottom: 0;">
            <el-select v-model="search.form.role" placeholder="请选择所属角色">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="item in roleData.list" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="small" style="margin-bottom: 0;">
            <el-button class="custom" @click="search.search">查询</el-button>
            <el-button @click="search.reset">清空条件</el-button>
          </el-form-item>
        </el-space>
      </el-form>
      <template #right>
        <el-button class="custom" size="small" @click="tableData.add" v-permission="[$route, 'add']">添加用户</el-button>
      </template>
    </table-options-header>
    <div style="flex-grow: 1;padding: 25px;display: flex;flex-direction: column;justify-content: space-between;">
      <el-table :data="tableData.list" stripe :height="$getTableHeight()">
        <el-table-column prop="name" label="用户名称" width="200"></el-table-column>
        <el-table-column prop="department" label="所属部门" width="200"></el-table-column>
        <el-table-column prop="role" label="所属角色" width="200"></el-table-column>
        <el-table-column prop="description" label="用户描述"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template #default="scope">
            <!--            <el-button @click="detail(scope.row)" type="text" size="small" v-permission="[$route, 'views']">详情-->
            <!--            </el-button>-->
            <el-button @click="tableData.edit(scope.row)" type="text" size="small" v-permission="[$route, 'edit']">编辑</el-button>
            <el-button @click="tableData.del(scope.row)" type="text" size="small" v-permission="[$route, 'delete']">删除</el-button>
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
import {defineComponent, ref, reactive, provide, computed, toRef} from 'vue'
import Detail from './components/Detail'
import {ElMessageBox} from 'element-plus'
import $api from '@/api'

export default defineComponent({
  name: "UserList",
  components: {
    Detail
  },
  setup() {
    const searchForm = ref()

    const search = reactive({
      form: {
        name: '',
        department: '',
        role: ''
      },
      search() {
        page.index = 1
        tableData.getList()
      },
      reset() {
        searchForm.value.resetFields()
        page.index = 1
        tableData.getList()
      }
    })

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
          add: `开通用户账号`,
          view: `用户详情`,
          edit: `编辑用户`
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

    const departmentData = reactive({
      list: [],
      getList: async () => {
        const {list} = await $api.permissionApi.department.getList({
          page: 1,
          pageSize: 10
        })
        departmentData.list = list
      }
    })

    const roleData = reactive({
      list: [],
      getList: async () => {
        const {list} = await $api.permissionApi.role.getList({
          page: 1,
          pageSize: 10
        })
        roleData.list = list
      }
    })

    const tableData = reactive({
      list: [],
      total: 0,
      getList: async () => {
        const {list, total} = await $api.permissionApi.user.getList({
          page: page.index,
          pageSize: page.size,
          ...search.form
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
        ElMessageBox.confirm(`删除后，用户不可再执行激活，请谨慎操作！`, `确认删除用户“${data.name}”？`, {type: 'warning'}).then(async () => {
          const {code} = await $api.permissionApi.user.del({
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

    departmentData.getList()
    roleData.getList()
    tableData.getList()

    provide('departmentList', toRef(departmentData, 'list'))
    provide('roleList', toRef(roleData, 'list'))
    provide('closeDialog', dialog.close)
    provide('getList', tableData.getList)

    return {
      searchForm,
      search,
      page,
      dialog,
      departmentData,
      roleData,
      tableData
    }
  }
})
</script>

<style scoped lang="scss">
</style>