<template>
  <div style="height: 100%;display: flex;flex-direction: column;">
    <table-options-header>
      <el-form :model="search.form" ref="searchForm" inline>
        <el-space size="medium">
          <el-form-item label="机构名称" prop="name" size="small" style="margin-bottom: 0;">
            <el-input v-model="search.form.name" placeholder="请输入机构名称"></el-input>
          </el-form-item>
          <el-form-item label="开通时间" prop="openTime" size="small" style="margin-bottom: 0;">
            <el-date-picker v-model="search.form.openTime" type="daterange" start-placeholder="开始日期"
                            end-placeholder="结束日期" style="width: 240px;"></el-date-picker>
          </el-form-item>
          <el-form-item size="small" style="margin-bottom: 0;">
            <el-button class="custom" @click="search.search">查询</el-button>
            <el-button @click="search.reset">清空条件</el-button>
          </el-form-item>
        </el-space>
      </el-form>
      <template #right>
        <el-button class="custom" size="small" @click="tableData.add" v-permission="[$route, 'add']">开通机构账号</el-button>
      </template>
    </table-options-header>
    <div style="flex-grow: 1;padding: 25px;display: flex;flex-direction: column;justify-content: space-between;">
      <el-table :data="tableData.list" stripe :height="$getTableHeight()">
        <el-table-column prop="openTime" label="开通时间" width="170"></el-table-column>
        <el-table-column prop="name" label="机构名称" width="180"></el-table-column>
        <el-table-column prop="contact" label="联系人"></el-table-column>
        <el-table-column prop="phone" label="联系电话" width="120"></el-table-column>
        <el-table-column prop="setMealId" label="所选套餐" width="100">
          <template #default="scope">
            <span>{{ setMealData.getSetMealName(scope.row.setMealId) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="account" label="登录账号" width="140"></el-table-column>
        <el-table-column prop="earningTotal" label="累计收益" width="100">
          <template #default="scope">
            <span>{{ scope.row.status === 0 || !scope.row.earningTotal ? '--' : '￥' + scope.row.earningTotal }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="seatTotal" label="总席位数">
          <template #default="scope">
            <span>{{ scope.row.status === 0 || !scope.row.seatTotal ? '--' : scope.row.seatTotal }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="studentTotal" label="学员数">
          <template #default="scope">
            <span>{{ scope.row.status === 0 || !scope.row.studentTotal ? '--' : scope.row.studentTotal }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80">
          <template #default="scope">
            <span>{{ ['待激活', '已禁用', '正常'][scope.row.status] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="openPeople" label="开通人"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template #default="scope">
            <!--            <el-button @click="tableData.detail(scope.row)" type="text" size="small" v-permission="[$route, 'view']"-->
            <!--                       v-if="scope.row.status !== 0">详情-->
            <!--            </el-button>-->
            <el-button
                @click="$router.push({path: '/main/customer/person', query: {organizationName: scope.row.name}})"
                type="text" size="small" v-permission="[$route, 'view']" v-if="scope.row.status !== 0">查看学员
            </el-button>
            <el-button @click="tableData.edit(scope.row)" type="text" size="small" v-permission="[$route, 'edit']">编辑
            </el-button>
            <el-button @click="tableData.del(scope.row)" type="text" size="small" v-permission="[$route, 'delete']"
                       v-if="scope.row.status === 0">删除
            </el-button>
            <el-button @click="tableData.enable(scope.row)" type="text" size="small" v-if="scope.row.status === 1">启用
            </el-button>
            <el-button @click="tableData.disable(scope.row)" type="text" size="small" v-if="scope.row.status === 2">禁用
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
import {defineComponent, ref, reactive, computed, provide, toRef} from 'vue'
import Detail from './components/Detail'
import {ElMessageBox} from 'element-plus'
import $api from '@/api'

export default defineComponent({
  name: "OrganizationList",
  components: {
    Detail
  },
  setup() {
    const searchForm = ref()

    const search = reactive({
      form: {
        name: '',
        openTime: []
      },
      param: computed(() => {
        return {
          name: search.form.name,
          startTime: search.form.openTime[0] || '',
          endTime: search.form.openTime[1] || ''
        }
      }),
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
          add: `开通机构账号`,
          view: `机构详情`,
          edit: `编辑机构`
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

    const setMealData = reactive({
      list: [],
      getList: async () => {
        const {list} = await $api.setMealApi.organization.getList()
        setMealData.list = list
      },
      getSetMealName(setMealId) {
        if (!setMealData.list || !setMealData.list.length) {
          return '--'
        }
        const setMeal = setMealData.list.find((item) => item.id === setMealId)
        return setMeal.name
      }
    })

    const tableData = reactive({
      list: [],
      total: 0,
      getList: async () => {
        const {list, total} = await $api.customerApi.organization.getList({
          page: page.index,
          pageSize: page.size,
          ...search.param
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
        ElMessageBox.confirm(`删除后，机构不可再执行激活，请谨慎操作！`, `确认删除机构“${data.name}”？`, {type: 'warning'}).then(async () => {
          const {code} = await $api.customerApi.organization.del({
            id: data.id
          })
          if (code === 200) {
            await tableData.getList()
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      enable: async (data) => {
        const {code} = await $api.customerApi.organization.enable({
          id: data.id
        })
        if (code === 200) {
          await tableData.getList()
        }
      },
      disable(data) {
        ElMessageBox.confirm(`禁用后，机构不可再登录，请谨慎操作！`, `确认禁用机构“${data.name}”？`, {type: 'warning'}).then(async () => {
          const {code} = await $api.customerApi.organization.disable({
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

    setMealData.getList()
    tableData.getList()

    provide('setMealList', toRef(setMealData, 'list'))
    provide('closeDialog', dialog.close)

    return {
      searchForm,
      search,
      page,
      dialog,
      setMealData,
      tableData
    }
  }
})
</script>

<style scoped lang="scss">
</style>