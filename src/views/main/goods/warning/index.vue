<template>
  <div style="height: 100%;display: flex;flex-direction: column;">
    <table-options-header>
      <el-button class="custom" size="small" @click="dialog.visible = true">预警设置</el-button>
      <template #right>
        <el-button type="danger" size="small" :disabled="!tableData.selectionIds.length"
                   v-permission="[$route, 'delete']" @click="tableData.batchDelete">批量删除
        </el-button>
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
        <el-table-column prop="minPrice" label="销售价格" width="220">
          <template #default="scope">
            <span>￥{{ scope.row.minPrice }}~{{ scope.row.maxPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="stockNum" label="总库存" width="120"></el-table-column>
        <el-table-column prop="shopNum" label="预警原因">
          <template #default="scope">
            <span style="color: #FF3A30">{{ scope.row.warningReason }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="addTime" label="状态/入库时间" width="200" align="center">
          <template #default="scope">
            <div style="color: #1CB903;" v-if="scope.row.status">上架中</div>
            <div style="color: #FF3A30;" v-else>已下架</div>
            <div>{{ scope.row.addTime }}</div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="170">
          <template #default="scope">
            <el-button @click="" type="text" size="small">查看</el-button>
            <el-button @click="" type="text" size="small">编辑</el-button>
            <el-button @click="tableData.putaway(scope.row)" type="text" size="small">上架</el-button>
            <el-button @click="tableData.del(scope.row)" type="text" size="small" v-permission="[$route, 'delete']">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination small :current-page="page.index" :page-size="page.size" :page-sizes="[10, 15, 30, 50]"
                     layout="total, sizes, prev, pager, next, jumper" :total="tableData.total" class="custom"
                     @size-change="page.sizeChange" @current-change="page.indexChange">
      </el-pagination>
    </div>

    <el-dialog title="预警设置" width="500px" v-model="dialog.visible" custom-class="custom" :close-on-click-modal="false">
      <setting></setting>
    </el-dialog>
  </div>
</template>

<script>
import {defineComponent, reactive, provide} from 'vue'
import {ElMessageBox} from 'element-plus'
import WideGoodsItem from '@/components/goods/WideGoodsItem'
import Setting from './components/Setting'
import $api from '@/api'

const moduleName = '商品'

export default defineComponent({
  name: "GoodsWarning",
  components: {
    WideGoodsItem,
    Setting
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
      close() {
        dialog.visible = false
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
        const {list, total} = await $api.goodsApi.warning.getList({
          page: page.index,
          pageSize: page.size
        })
        tableData.list = list
        tableData.total = total
      },
      putaway: async (ids) => {
        const {code} = await $api.operationApi.special.removeGoods({
          id: ids
        })
        if (code === 200) {
          tableData.getList()
        }
      },
      delHandler: async (ids) => {
        // const {code} = await $api.operationApi.special.removeGoods({
        //   id: ids
        // })
        // if (code === 200) {
        //   tableData.getList()
        // }
      },
      del: (data) => {
        ElMessageBox.confirm(`删除后，将无法恢复该${moduleName}，请谨慎删除！`, `确认删除编号“${data.number}”${moduleName}？`, {type: 'warning'}).then(() => {
          tableData.delHandler([data.id])
        }).catch(err => {
        })
      },
      batchDelete() {
        ElMessageBox.confirm(`删除后，将无法恢复所选${moduleName}记录，请谨慎删除！`, `确认删除所选${moduleName}？`, {type: 'warning'}).then(() => {
          tableData.delHandler(tableData.selectionIds)
        }).catch(err => {
        })
      }
    })

    tableData.getList()

    provide('closeDialog', dialog.close)

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