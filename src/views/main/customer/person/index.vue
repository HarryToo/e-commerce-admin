<template>
  <div style="height: 100%;display: flex;flex-direction: column;">
    <table-options-header>
      <el-form :model="search.form" ref="searchForm" inline label-position="top">
        <el-space size="medium">
          <el-form-item label="客户来源" prop="source" size="small" style="margin-bottom: 0;width: 180px;">
            <el-input v-model="search.form.source" placeholder="请输入机构名称"></el-input>
          </el-form-item>
          <el-form-item label="客户账号" prop="account" size="small" style="margin-bottom: 0;width: 180px;">
            <el-input v-model="search.form.account" placeholder="请输入客户账号"></el-input>
          </el-form-item>
          <el-form-item label="当前套餐" prop="setMealId" size="small" style="margin-bottom: 0;width: 160px;">
            <el-select v-model="search.form.setMealId" placeholder="请选择当前套餐">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="item in setMealData.list" :key="item.id" :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="status" size="small" style="margin-bottom: 0;width: 160px;">
            <el-select v-model="search.form.status" placeholder="请选择当前套餐">
              <el-option label="全部" value=""></el-option>
              <el-option label="正常" :value="1"></el-option>
              <el-option label="已冻结" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="入驻时间" prop="joinTime" size="small" style="margin-bottom: 0;">
            <el-date-picker v-model="search.form.joinTime" :disabled-date="search.disabledDate" type="daterange"
                            start-placeholder="开始日期" end-placeholder="结束日期" style="width: 220px;"></el-date-picker>
          </el-form-item>
          <el-form-item size="small" style="margin-bottom: 0;margin-top: 30px;">
            <el-button class="custom" @click="search.search">查询</el-button>
            <el-button @click="search.reset">清空条件</el-button>
          </el-form-item>
        </el-space>
      </el-form>
    </table-options-header>
    <div style="flex-grow: 1;padding: 25px;display: flex;flex-direction: column;justify-content: space-between;">
      <el-table :data="tableData.list" stripe :height="$getTableHeight()">
        <el-table-column prop="joinTime" label="入驻时间" width="170"></el-table-column>
        <el-table-column prop="account" label="客户账号"></el-table-column>
        <el-table-column prop="setMealId" label="当前套餐" width="110">
          <template #default="scope">
            <span>{{ setMealData.getSetMealName(scope.row.setMealId) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="contact" label="套餐有效时间" width="120">
          <template #default="scope">
            <span>{{ scope.row.setMealStartDate + ' ~ ' + scope.row.setMealEndDate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="source" label="客户来源"></el-table-column>
        <el-table-column prop="phone" label="授权店铺数量" width="120">
          <template #default="scope">
            <div>shoppe：{{ scope.row.storeNum.shoppe }}</div>
            <div>拼多多：{{ scope.row.storeNum.shoppe }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="account" label="商品铺货数" width="120">
          <template #default="scope">
            <div>shoppe：{{ scope.row.goodsNum.shoppe }}</div>
            <div>拼多多：{{ scope.row.goodsNum.shoppe }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="purchaseTotal" label="累计采购数" width="90"></el-table-column>
        <el-table-column prop="seatTotal" label="附加服务" width="150">
          <template #default="scope">
            <div>图片翻译：{{ scope.row.additionalService.picTranslate }}</div>
            <div>文字翻译：{{ scope.row.additionalService.textTranslate }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="studentTotal" label="累计收益" width="160">
          <template #default="scope">
            <div>订单：￥{{ scope.row.earningTotal.order }}</div>
            <div>采购：￥{{ scope.row.earningTotal.purchase }}</div>
            <div>盈利：￥{{ scope.row.earningTotal.profit }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80">
          <template #default="scope">
            <span>{{ ['已冻结', '正常'][scope.row.status] }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="60">
          <template #default="scope">
            <el-button @click="tableData.enable(scope.row)" type="text" size="small" v-if="scope.row.status === 0">启用
            </el-button>
            <el-button @click="tableData.disable(scope.row)" type="text" size="small" v-if="scope.row.status === 1">冻结
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <table-pagination-footer :page-index="page.index" :page-size="page.size" :total="tableData.total"
                               @size-change="page.sizeChange" @index-change="page.indexChange">
      </table-pagination-footer>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref, reactive, computed, onMounted, onActivated} from 'vue'
import {useRoute} from 'vue-router'
import {ElMessageBox, ElMessage} from 'element-plus'
import $api from '@/api'

export default defineComponent({
  name: "PersonList",
  setup() {
    const route = useRoute()

    const searchForm = ref()

    const search = reactive({
      form: {
        source: '',
        account: '',
        setMealId: '',
        status: '',
        joinTime: []
      },
      param: computed(() => {
        return {
          source: search.form.source,
          account: search.form.account,
          setMealId: search.form.setMealId,
          status: search.form.status,
          startTime: search.form.joinTime[0] || '',
          endTime: search.form.joinTime[1] || ''
        }
      }),
      disabledDate(time) {
        return time.getTime() > Date.now() - 8.64e6
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

    const setMealData = reactive({
      list: [],
      getList: async () => {
        const {list} = await $api.setMealApi.personal.getList()
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
        const {list, total} = await $api.customerApi.person.getList({
          page: page.index,
          pageSize: page.size,
          ...search.param
        })
        tableData.list = list
        tableData.total = total
      },
      enable: async (data) => {
        const {code} = await $api.customerApi.person.enable({
          id: data.id
        })
        if (code === 200) {
          await tableData.getList()
        }
      },
      disable(data) {
        ElMessageBox.confirm(`冻结后，个人不可再登录，请谨慎操作！`, `确认冻结个人“${data.account}”？`, {type: 'warning'}).then(async () => {
          const {code} = await $api.customerApi.person.disable({
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

    onMounted(() => {
      if (!route.query.organizationName) {
        tableData.getList()
      }
    })

    onActivated(() => {
      if (route.query.organizationName && search.form.source !== route.query.organizationName) {
        search.form.source = route.query.organizationName
        search.search()
      }
      if (!route.query.organizationName && search.form.source) {
        ElMessage.info(`当前查找客户来源为“${search.form.source}”数据`)
      }
    })

    return {
      searchForm,
      search,
      page,
      setMealData,
      tableData
    }
  }
})
</script>

<style scoped lang="scss">
::v-deep .table-options-header .el-form--label-top .el-form-item__label {
  padding-bottom: 0;
}
</style>