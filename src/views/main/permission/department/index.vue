<template>
  <div style="height: 100%;display: flex;flex-direction: column;">
    <div class="options-area">
      <el-button class="custom" size="small" @click="add" v-permission="[$route, 'add']">添加部门</el-button>
    </div>
    <div style="flex-grow: 1;padding: 25px;display: flex;flex-direction: column;justify-content: space-between;">
      <el-table :data="dataList" stripe style="width: 100%">
        <el-table-column prop="name" label="部门名称" width="250"></el-table-column>
        <el-table-column prop="description" label="部门描述"></el-table-column>
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

const moduleName = '部门'

export default defineComponent({
  name: "DepartmentList",
  components: {
    Detail
  },
  setup() {
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

    const getRoleList = async () => {
      const {list, total} = await $api.permissionApi.department.getList({
        page: page.value,
        pageSize: pageSize.value
      })
      dataList.value = list
      dataTotal.value = total
    }
    getRoleList()

    const openDialog = () => {
      dialogVisible.value = true
    }

    const closeDialog = () => {
      dialogVisible.value = false
    }

    const sizeChange = (size) => {
      pageSize.value = size
      getRoleList()
    }

    const pageChange = (index) => {
      page.value = index
      getRoleList()
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
        const {code} = await $api.permissionApi.department.del({
          id: data.id
        })
        if (code === 200) {
          await getRoleList()
        }
      }).catch((err) => {
        console.log(err);
      })
    }

    provide('closeDialog', closeDialog)

    return {
      dialogVisible,
      currDataId,
      dialogMode,
      dialogTitle,
      page,
      pageSize,
      dataTotal,
      dataList,
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
  justify-content: flex-end;
  align-items: center;
}
</style>