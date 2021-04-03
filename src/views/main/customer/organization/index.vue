<template>
  <div style="height: 100%;display: flex;flex-direction: column;">
    <div class="options-area">
      <el-form :model="searchParam" ref="searchForm" inline>
        <el-space size="medium">
          <el-form-item label="用户名称" prop="name" size="small" style="margin-bottom: 0;">
            <el-input v-model="searchParam.name" placeholder="请输入用户名称"></el-input>
          </el-form-item>
          <el-form-item label="所属部门" prop="department" size="small" style="margin-bottom: 0;">
            <el-select v-model="searchParam.department" placeholder="请选择所属部门">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属角色" prop="role" size="small" style="margin-bottom: 0;">
            <el-select v-model="searchParam.role" placeholder="请选择所属角色">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="small" style="margin-bottom: 0;">
            <el-button class="custom" @click="search">查询</el-button>
            <el-button @click="resetSearch">清空条件</el-button>
          </el-form-item>
        </el-space>
      </el-form>
      <el-button class="custom" size="small" @click="add" v-permission="[$route, 'add']">添加用户</el-button>
    </div>
    <div style="flex-grow: 1;padding: 25px;display: flex;flex-direction: column;justify-content: space-between;">
      <el-table :data="dataList" stripe style="width: 100%">
        <el-table-column prop="name" label="用户名称" width="200"></el-table-column>
        <el-table-column prop="department" label="所属部门" width="200"></el-table-column>
        <el-table-column prop="role" label="所属角色" width="200"></el-table-column>
        <el-table-column prop="description" label="用户描述"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template #default="scope">
            <!--            <el-button @click="detail(scope.row)" type="text" size="small" v-permission="[$route, 'view']">详情-->
            <!--            </el-button>-->
            <el-button @click="edit(scope.row)" type="text" size="small" v-permission="[$route, 'edit']">编辑</el-button>
            <el-button @click="del(scope.row)" type="text" size="small" v-permission="[$route, 'delete']">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination small :current-page="page" :page-size="pageSize" :page-sizes="[10, 15, 30, 50]"
                     layout="total, sizes, prev, pager, next, jumper" :total="dataTotal" @size-change="sizeChange"
                     @current-change="pageChange">
      </el-pagination>
    </div>

    <el-dialog custom-class="custom" :title="dialogTitle" v-model="dialogVisible" :close-on-click-modal="false"
               destroy-on-close>
      <detail :id="currDataId" :mode="dialogMode"></detail>
    </el-dialog>
  </div>
</template>

<script>
import {defineComponent, ref, provide, computed} from 'vue'
import Detail from './components/Detail'
import {ElMessageBox} from 'element-plus'
import $api from '@/api'

const moduleName = '用户'

export default defineComponent({
  name: "OrganizationList",
  components: {
    Detail
  },
  setup() {
    const searchForm = ref()
    const searchParam = ref({
      name: '',
      department: '',
      role: ''
    })
    const departmentList = ref([])
    const roleList = ref([])

    const dialogVisible = ref(false)
    const currDataId = ref(false)
    const dialogMode = ref('add')

    const page = ref(1)
    const pageSize = ref(10)
    const dataList = ref([])
    const dataTotal = ref(0)

    const dialogTitle = computed(() => {
      const titles = {
        add: `添加${moduleName}`,
        view: `${moduleName}详情`,
        edit: `编辑${moduleName}`
      }
      return titles[dialogMode.value]
    })

    // 获取部门列表
    const getDepartmentList = async () => {
      const {list} = await $api.permissionApi.department.getList({
        page: 1,
        pageSize: 10
      })
      departmentList.value = list
    }
    getDepartmentList()

    // 获取角色列表
    const getRoleList = async () => {
      const {list} = await $api.permissionApi.role.getList({
        page: 1,
        pageSize: 10
      })
      roleList.value = list
    }
    getRoleList()

    provide('departmentList', departmentList)
    provide('roleList', roleList)

    const getUserList = async () => {
      const {list, total} = await $api.permissionApi.user.getList({
        page: page.value,
        pageSize: pageSize.value,
        ...searchParam.value
      })
      dataList.value = list
      dataTotal.value = total
    }
    getUserList()

    const search = () => {
      page.value = 1
      getUserList()
    }

    const resetSearch = () => {
      searchForm.value.resetFields()
      page.value = 1
      getUserList()
    }

    const openDialog = () => {
      dialogVisible.value = true
    }

    const closeDialog = () => {
      dialogVisible.value = false
    }

    const sizeChange = (size) => {
      pageSize.value = size
      getUserList()
    }

    const pageChange = (index) => {
      page.value = index
      getUserList()
    }

    const add = () => {
      currDataId.value = ''
      dialogMode.value = 'add'
      openDialog()
    }

    const detail = (data) => {
      currDataId.value = data.id
      dialogMode.value = 'view'
      openDialog()
    }

    const edit = (data) => {
      currDataId.value = data.id
      dialogMode.value = 'edit'
      openDialog()
    }

    const del = (data) => {
      ElMessageBox.confirm(`确认删除${moduleName}“${data.name}”？`, {type: 'warning'}).then(async () => {
        const {code} = await $api.permissionApi.user.del({
          id: data.id
        })
        if (code === 200) {
          await getUserList()
        }
      }).catch((err) => {
        console.log(err);
      })
    }

    provide('closeDialog', closeDialog)

    return {
      searchForm,
      searchParam,
      departmentList,
      roleList,
      dialogVisible,
      currDataId,
      dialogMode,
      dialogTitle,
      page,
      pageSize,
      dataTotal,
      dataList,
      search,
      resetSearch,
      sizeChange,
      pageChange,
      detail,
      add,
      edit,
      del
    }
  }
})
</script>

<style scoped lang="scss">
.options-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>