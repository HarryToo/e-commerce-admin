<template>
  <div style="height: 100%;display: flex;flex-direction: column;">
    <table-options-header>
      <el-form :model="search.form" ref="searchForm" inline>
        <el-space size="medium">
          <el-form-item label="商品名称" prop="name" size="small" style="margin-bottom: 0;">
            <el-input v-model="search.form.name" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item size="small" style="margin-bottom: 0;">
            <el-button class="custom" @click="search.search">查询</el-button>
            <el-button @click="search.reset">清空条件</el-button>
          </el-form-item>
        </el-space>
      </el-form>
      <template #right>
        <el-button type="danger" size="small" :disabled="!tableData.selectionIds.length"
                   v-permission="[$route, 'delete']" @click="tableData.batchRemove">批量移除
        </el-button>
        <el-button class="custom" size="small" v-permission="[$route, 'add']">添加商品</el-button>
      </template>
    </table-options-header>
    <div style="flex-grow: 1;padding: 25px;display: flex;flex-direction: column;justify-content: space-between;">
      <el-table :data="tableData.list" stripe :height="$getTableHeight()" @selection-change="tableData.selectionChange">
        <el-table-column type="selection" width="50" v-permission="[$route, 'delete']"></el-table-column>
        <el-table-column prop="number" label="商品编号" width="150"></el-table-column>
        <el-table-column prop="info" label="商品信息" width="480">
          <template #default="scope">
            <wide-goods-item :goods="scope.row.info"></wide-goods-item>
          </template>
        </el-table-column>
        <el-table-column prop="minPrice" label="销售价格" width="250">
          <template #default="scope">
            <span>￥{{ scope.row.minPrice }}~{{ scope.row.maxPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="stockNum" label="总库存"></el-table-column>
        <el-table-column prop="shopNum" label="被铺货数/被采购数">
          <template #default="scope">
            <span>{{ scope.row.shopNum }}/{{ scope.row.purchaseNum }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <span style="color: #1CB903;" v-if="scope.row.status">上架中</span>
            <span style="color: #FF3A30;" v-else>已下架</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template #default="scope">
            <el-button @click="" type="text" size="small">查看</el-button>
            <el-button @click="tableData.remove(scope.row)" type="text" size="small" v-permission="[$route, 'delete']">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination small :current-page="page.index" :page-size="page.size" :page-sizes="[10, 15, 30, 50]"
                     layout="total, sizes, prev, pager, next, jumper" :total="tableData.total" class="custom"
                     @size-change="page.sizeChange" @current-change="page.indexChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref, reactive} from 'vue'
import {useRoute} from 'vue-router'
import {ElMessage, ElMessageBox} from 'element-plus'
import WideGoodsItem from '@/components/goods/WideGoodsItem'
import $api from '@/api'
import TableOptionsHeader from "@/components/common/TableOptionsHeader";

const moduleName = '商品'

export default defineComponent({
  name: "SpecialGoodsList",
  components: {
    TableOptionsHeader,
    WideGoodsItem
  },
  setup() {
    const route = useRoute()
    const searchForm = ref()

    const exportLoading = ref(false)

    const search = reactive({
      form: {
        name: ''
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

    const tableData = reactive({
      list: [],
      total: 0,
      selectionIds: [],
      selectionChange(selection) {
        tableData.selectionIds = selection.map((item) => item.id)
      },
      getList: async () => {
        const {list, total} = await $api.operationApi.special.getGoodsList({
          specialId: route.query.specialId,
          page: page.index,
          pageSize: page.size,
          ...search.form
        })
        tableData.list = list
        tableData.total = total
      },
      add: async (data) => {
        if (!tableData.form.name) {
          return ElMessage.error(`请输入${data ? '子专题' : '专题'}名称`)
        }
        const param = {
          name: tableData.form.name
        }
        if (data) {
          param.id = data.id
        }
        const {code} = await $api.operationApi.special.add(param)
        if (code === 200) {
          tableData.form.name = ''
          tableData.getList()
        }
      },
      removeHandler: async (ids) => {
        const {code} = await $api.operationApi.special.removeGoods({
          id: ids
        })
        if (code === 200) {
          tableData.getList()
        }
      },
      remove: (data) => {
        ElMessageBox.confirm(`移除后，当前专题库将不再显示该${moduleName}，请谨慎操作！`, `确认移除编号“${data.number}”${moduleName}？`, {type: 'warning'}).then(() => {
          tableData.removeHandler([data.id])
        }).catch(err => {
        })
      },
      batchRemove() {
        ElMessageBox.confirm(`移除后，当前专题库将不再显示所选${moduleName}，请谨慎操作！`, `确认移除所选${moduleName}？`, {type: 'warning'}).then(() => {
          tableData.removeHandler(tableData.selectionIds)
        }).catch(err => {
        })
      }
    })

    tableData.getList()

    return {
      searchForm,
      exportLoading,
      search,
      page,
      tableData
    }
  }
})
</script>

<style scoped lang="scss">
</style>