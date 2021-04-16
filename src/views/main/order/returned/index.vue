<template>
  <div style="height: 100%;display: flex;flex-direction: column;">
    <table-options-header>
      <el-form :model="search.form" ref="searchForm" inline size="small">
        <el-space size="medium">
          <el-form-item label="退货单号" prop="orderNum" style="margin-bottom: 0;">
            <el-input v-model="search.form.orderNum" placeholder="请输入退货单号" style="width: 160px;"></el-input>
          </el-form-item>
          <el-form-item label="商品名称" prop="goodsName" style="margin-bottom: 0;">
            <el-input v-model="search.form.goodsName" placeholder="请输入商品名称" style="width: 160px;"></el-input>
          </el-form-item>
          <el-form-item label="申请时间" prop="applyTime" style="margin-bottom: 0;">
            <el-date-picker v-model="search.form.applyTime" :disabled-date="search.disabledDate" type="daterange"
                            start-placeholder="开始日期" end-placeholder="结束日期" style="width: 220px;"></el-date-picker>
          </el-form-item>
          <el-form-item style="margin-bottom: 0;">
            <el-button class="custom" @click="search.search">查询</el-button>
            <el-button @click="search.reset">清空条件</el-button>
          </el-form-item>
        </el-space>
      </el-form>
      <template #right>
        <div>
          <el-radio-group v-model="search.form.status" size="small" fill="#F9612E" @change="search.search">
            <el-radio-button label="">全部</el-radio-button>
            <el-radio-button :label="1">待审核</el-radio-button>
            <el-radio-button :label="2">待收货</el-radio-button>
            <el-radio-button :label="3">待退款</el-radio-button>
            <el-radio-button :label="4">拒绝退货</el-radio-button>
            <el-radio-button :label="5">已完成</el-radio-button>
          </el-radio-group>
        </div>
      </template>
    </table-options-header>
    <div style="padding: 25px;">
      <el-table :data="tableData.list" stripe :height="$getTableHeight()" @selection-change="tableData.selectionChange">
        <el-table-column type="selection" width="50" v-permission="[$route, 'delete']"
                         v-if="[2, 3, 4].includes(search.form.status)"></el-table-column>
        <el-table-column prop="returnedNum" label="退货单号" width="150"></el-table-column>
        <el-table-column prop="info" label="商品信息" width="480">
          <template #default="scope">
            <wide-goods-item :goods="scope.row.goodsInfo"></wide-goods-item>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价/数量" width="180">
          <template #default="scope">
            <span>￥{{ scope.row.price }}/{{ scope.row.orderSize }}件</span>
          </template>
        </el-table-column>
        <el-table-column prop="actuallyMoney" label="实付金额" width="140">
          <template #default="scope">
            <span>￥{{ scope.row.actuallyMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="money" label="退款金额" width="140">
          <template #default="scope">
            <span>￥{{ scope.row.refundMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="deliveryInfo" label="退货原因" width="120">
          <template #default="scope">
            <span style="color: #FF3A30;">{{ scope.row.reason }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="addTime" label="状态/申请时间" width="200" align="center">
          <template #default="scope">
            <div style="color: #FF3A30;" v-if="scope.row.status === 1">待审核</div>
            <div style="color: #3CC327;" v-if="scope.row.status === 2">待收货</div>
            <div style="color: #0367D9;" v-if="scope.row.status === 3">待退款</div>
            <div style="color: #BBBBBB;" v-if="scope.row.status === 4">拒绝退货</div>
            <div style="color: #BBBBBB;" v-if="scope.row.status === 5">已完成</div>
            <div>{{ scope.row.applyTime }}</div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="170">
          <template #default="scope">
            <el-button @click="$router.push('/main/order/returned/detail/' + scope.row.id)" type="text"
                       size="small">{{ scope.row.status === 1 ? '审核' : '查看' }}
            </el-button>
            <el-button @click="tableData.received(scope.row)" type="text" size="small"
                       v-if="scope.row.status === 2">确认收货
            </el-button>
            <el-button @click="tableData.refund(scope.row)" type="text" size="small"
                       v-if="scope.row.status === 3">确认退款
            </el-button>
            <el-button @click="tableData.deleteOrder(scope.row)" type="text" size="small" v-if="scope.row.status === 4">
              删除订单
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <table-pagination-footer :page-index="page.index" :page-size="page.size" :total="tableData.total"
                               @size-change="page.sizeChange" @index-change="page.indexChange">
        <el-button type="danger" size="small" :disabled="!tableData.selectionIds.length" v-if="search.form.status === 4"
                   @click="tableData.batchDeleteOrder">批量删除
        </el-button>
        <el-button type="success" size="small" :disabled="!tableData.selectionIds.length"
                   v-if="search.form.status === 2" @click="tableData.batchReceived">批量收货
        </el-button>
        <el-button class="custom" size="small" :disabled="!tableData.selectionIds.length"
                   v-if="search.form.status === 3" @click="tableData.batchRefund">批量退款
        </el-button>
        <span class="tips" v-if="search.form.status !== 4 && search.form.status !== 2 && search.form.status !== 3">提示：通过订单状态筛选订单后有相应的批量操作功能</span>
      </table-pagination-footer>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref, reactive, computed, onActivated} from 'vue'
import {ElMessage, ElMessageBox} from "element-plus"
import WideGoodsItem from "@/components/goods/WideGoodsItem"
import $api from '@/api'

export default defineComponent({
  name: "ReturnedOrder",
  components: {
    WideGoodsItem
  },
  setup() {
    const searchForm = ref()
    const search = reactive({
      form: {
        orderNum: '',
        goodsName: '',
        applyTime: [],
        status: ''
      },
      params: computed(() => {
        const form = search.form
        return {
          orderNum: form.orderNum,
          goodsName: form.goodsName,
          startTime: form.applyTime[0] || '',
          endTime: form.applyTime[1] || '',
          status: form.status
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
      index: 0,
      size: 10,
      sizeChange(size) {
        console.log(size)
        page.size = size
        tableData.getList()
      },
      indexChange(index) {
        console.log(index)
        page.index = index
        tableData.getList()
      }
    })

    const tableData = reactive({
      list: [],
      total: 0,
      selectionIds: [],
      selectionList: computed(() => {
        return tableData.list.filter((item) => tableData.selectionIds.includes(item.id))
      }),
      selectionChange(selection) {
        tableData.selectionIds = selection.map((item) => item.id)
      },
      getList: async () => {
        const {list, total} = await $api.orderApi.returned.getList({
          pageIndex: page.index,
          pageSize: page.size,
          ...search.params
        })
        tableData.list = list
        tableData.total = total
      },
      // 删除订单
      deleteHandler: async (ids) => {
        const {code} = await $api.orderApi.dropShipping.deleteOrder({
          id: ids
        })
        if (code === 200) {
          ElMessage.success(`已删除${ids.length > 1 ? '所选' : '该'}退货订单`)
          tableData.getList()
        }
      },
      deleteOrder: (data) => {
        ElMessageBox.confirm(`删除后，将无法恢复该订单，请谨慎删除！`, `确认删除订单号为“${data.orderNum}”订单？`, {type: 'warning'}).then(() => {
          tableData.deleteHandler([data.id])
        }).catch(err => {
        })
      },
      batchDeleteOrder() {
        ElMessageBox.confirm(`删除后，将无法恢复所选订单记录，请谨慎删除！`, `确认删除所选订单？`, {type: 'warning'}).then(() => {
          tableData.deleteHandler(tableData.selectionIds)
        }).catch(err => {
        })
      },
      // 确认收货
      receivedHandler: async (ids) => {
        const {code} = await $api.orderApi.returned.received({
          id: ids
        })
        if (code === 200) {
          ElMessage.success(`已确认收货${ids.length > 1 ? '所选' : '该'}退货订单`)
          tableData.getList()
        }
      },
      received(data) {
        ElMessageBox.confirm(`确认后，不可更改，请注意核对订单及检查商品！`, `确认已收到该商品吗？`, {type: 'warning'}).then(() => {
          tableData.receivedHandler([data.id])
        }).catch(err => {
        })
      },
      batchReceived() {
        ElMessageBox.confirm(`确认后，不可更改，请注意核对所选订单及检查商品！`, `确认已收到所选商品吗？`, {type: 'warning'}).then(() => {
          tableData.receivedHandler(tableData.selectionIds)
        }).catch(err => {
        })
      },
      // 确认退款
      refundHandler: async (ids) => {
        const {code} = await $api.orderApi.returned.refund({
          id: ids
        })
        if (code === 200) {
          ElMessage.success(`已确认退款${ids.length > 1 ? '所选' : '该'}退货订单`)
          tableData.getList()
        }
      },
      refund(data) {
        ElMessageBox.confirm(`确认后，系统将执行自动退款，请谨慎核对！`, `确认要执行该笔退款吗？`, {type: 'warning'}).then(() => {
          tableData.refundHandler([data.id])
        }).catch(err => {
        })
      },
      batchRefund() {
        ElMessageBox.confirm(`确认后，系统将执行自动退款，请谨慎核对！`, `确认要执行所选订单退款吗？`, {type: 'warning'}).then(() => {
          tableData.refundHandler(tableData.selectionIds)
        }).catch(err => {
        })
      }
    })

    onActivated(tableData.getList)

    return {
      searchForm,
      search,
      page,
      tableData
    }
  }
})
</script>

<style scoped lang="scss">
.tips {
  font-size: 12px;
  color: #999999;
}
</style>