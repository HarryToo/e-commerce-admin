<template>
  <div style="height: 100%;display: flex;flex-direction: column;">
    <table-options-header>
      <el-form :model="search.form" ref="searchForm" size="small">
        <el-space size="medium">
          <el-form-item label="订单号" prop="orderNum">
            <el-input v-model="search.form.orderNum" placeholder="请输入订单号" style="width: 160px;"></el-input>
          </el-form-item>
          <el-form-item label="商品名称" prop="goodsName">
            <el-input v-model="search.form.goodsName" placeholder="请输入商品名称" style="width: 160px;"></el-input>
          </el-form-item>
          <el-form-item label="收件人姓名" prop="recipientsName">
            <el-input v-model="search.form.recipientsName" placeholder="请输入收件人姓名" style="width: 160px;"></el-input>
          </el-form-item>
          <el-form-item label="收件人电话" prop="recipientPhone">
            <el-input v-model="search.form.recipientPhone" placeholder="请输入收件人电话" style="width: 160px;"></el-input>
          </el-form-item>
          <el-form-item label="下单时间" prop="placeOrderTime">
            <el-date-picker v-model="search.form.placeOrderTime" :disabled-date="search.disabledDate" type="daterange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期" style="width: 220px;"></el-date-picker>
          </el-form-item>
          <el-form-item style="margin-top: 30px;">
            <el-button class="custom" @click="search.search">查询</el-button>
            <el-button @click="search.reset">清空条件</el-button>
          </el-form-item>
        </el-space>
      </el-form>
      <template #right>
        <div style="margin-top: 30px;">
          <el-radio-group v-model="search.form.status" size="small" fill="#F9612E" @change="search.search">
            <el-radio-button label="">全部</el-radio-button>
            <el-radio-button :label="1">待付款</el-radio-button>
            <el-radio-button :label="2">待发货</el-radio-button>
            <el-radio-button :label="3">待收货</el-radio-button>
            <el-radio-button :label="4">已取消</el-radio-button>
            <el-radio-button :label="5">已完成</el-radio-button>
          </el-radio-group>
        </div>
      </template>
    </table-options-header>
    <div style="padding: 25px;">
      <el-table :data="tableData.list" stripe :height="$getTableHeight()" @selection-change="tableData.selectionChange">
        <el-table-column type="selection" width="50" v-permission="[$route, 'delete']"></el-table-column>
        <el-table-column prop="orderNum" label="订单号" width="150"></el-table-column>
        <el-table-column prop="info" label="商品信息" width="480">
          <template #default="scope">
            <wide-goods-item :goods="scope.row.goodsInfo"></wide-goods-item>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价/采购数量" width="160">
          <template #default="scope">
            <span>￥{{ scope.row.price }}/{{ scope.row.orderSize }}件</span>
          </template>
        </el-table-column>
        <el-table-column prop="money" label="订单金额" width="120">
          <template #default="scope">
            <span>￥{{ scope.row.money }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="deliveryInfo" label="收货信息" width="260">
          <template #default="scope">
            <div>{{ scope.row.deliveryInfo.name }}/{{ scope.row.deliveryInfo.phone }}</div>
            <div>
              <span>{{ scope.row.deliveryInfo.provinces }}</span>
              <span>{{ scope.row.deliveryInfo.city }}</span>
              <span>{{ scope.row.deliveryInfo.area }}</span>
              <span>{{ scope.row.deliveryInfo.address }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="addTime" label="状态/下单时间" width="200" align="center">
          <template #default="scope">
            <div style="color: #FF3A30;" v-if="scope.row.status === 1">待付款</div>
            <div style="color: #3CC327;" v-if="scope.row.status === 2">待发货</div>
            <div style="color: #0367D9;" v-if="scope.row.status === 3">待收货</div>
            <div style="color: #BBBBBB;" v-if="scope.row.status === 4">已取消</div>
            <div style="color: #BBBBBB;" v-if="scope.row.status === 5">已完成</div>
            <div>{{ scope.row.placeOrderTime }}</div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="170" align="center">
          <template #default="scope">
            <el-button @click="$router.push('/main/order/dropShipping/detail/' + scope.row.id)" type="text" size="small">查看</el-button>
            <el-button @click="dialog.expressInfo.open(scope.row)" type="text" size="small"
                       v-if="scope.row.status === 2">确认发货
            </el-button>
            <el-button @click="dialog.deliveryInfo.open(scope.row)" type="text" size="small"
                       v-if="scope.row.status === 2">修改收货信息
            </el-button>
            <el-button @click="tableData.cancelOrder(scope.row)" type="text" size="small"
                       v-if="scope.row.status === 1 || scope.row.status === 2">取消订单
            </el-button>
            <el-button @click="" type="text" size="small" v-if="scope.row.status === 3 || scope.row.status === 5">物流跟踪
            </el-button>
            <el-button @click="tableData.deleteOrder(scope.row)" type="text" size="small" v-if="scope.row.status === 4">
              删除订单
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <table-pagination-footer :page-index="page.index" :page-size="page.size" :total="tableData.total"
                               @size-change="page.sizeChange" @index-change="page.indexChange">
        <el-button type="danger" size="small" :disabled="!tableData.selectionIds.length"
                   v-if="search.form.status === 4" @click="tableData.batchDeleteOrder">批量删除
        </el-button>
        <el-button class="custom" size="small" :disabled="!tableData.selectionIds.length"
                   v-if="search.form.status === 2"
                   @click="$router.push({name: 'BatchDeliver', params: { list: JSON.stringify(tableData.selectionList) }})">
          批量发货
        </el-button>
        <span class="tips" v-if="search.form.status !== 4 && search.form.status !== 2">提示：通过订单状态筛选订单后有相应的批量操作功能</span>
      </table-pagination-footer>
    </div>

    <el-dialog v-model="dialog.deliveryInfo.visible" width="500px" title="修改收货信息" :close-on-click-modal="false"
               destroy-on-close custom-class="custom">
      <delivery-info :info="dialog.deliveryInfo.currInfo"></delivery-info>
    </el-dialog>
    <el-dialog v-model="dialog.expressInfo.visible" width="500px" title="确认发货" :close-on-click-modal="false"
               custom-class="custom">
      <express-info :info="dialog.expressInfo.currInfo"></express-info>
    </el-dialog>
  </div>
</template>

<script>
import {defineComponent, ref, reactive, computed, provide, onActivated} from 'vue'
import {ElMessage, ElMessageBox} from "element-plus"
import WideGoodsItem from "@/components/goods/WideGoodsItem"
import DeliveryInfo from "./components/DeliveryInfo"
import ExpressInfo from "./components/ExpressInfo"
import $api from '@/api'

export default defineComponent({
  name: "DropShippingOrder",
  components: {
    WideGoodsItem,
    DeliveryInfo,
    ExpressInfo
  },
  setup() {
    const searchForm = ref()
    const search = reactive({
      form: {
        orderNum: '',
        goodsName: '',
        recipientsName: '',
        recipientPhone: '',
        placeOrderTime: [],
        status: ''
      },
      params: computed(() => {
        const form = search.form
        return {
          orderNum: form.orderNum,
          goodsName: form.goodsName,
          recipientsName: form.recipientsName,
          recipientPhone: form.recipientPhone,
          startTime: form.placeOrderTime[0] || '',
          endTime: form.placeOrderTime[1] || '',
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

    const dialog = reactive({
      // 修改收货信息弹窗
      deliveryInfo: {
        visible: false,
        currInfo: {},
        open(data) {
          dialog.deliveryInfo.currInfo = data
          dialog.deliveryInfo.visible = true
        },
        close() {
          dialog.deliveryInfo.visible = false
        }
      },
      // 发货弹窗
      expressInfo: {
        visible: false,
        currInfo: {},
        open(data) {
          dialog.expressInfo.currInfo = data
          dialog.expressInfo.visible = true
        },
        close() {
          dialog.expressInfo.visible = false
        }
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
        const {list, total} = await $api.orderApi.dropShipping.getList({
          pageIndex: page.index,
          pageSize: page.size,
          ...search.params
        })
        tableData.list = list
        tableData.total = total
      },
      deleteHandler: async (ids) => {
        const {code} = await $api.orderApi.dropShipping.deleteOrder({
          id: ids
        })
        if (code === 200) {
          ElMessage.success(`已删除${ids.length > 1 ? '所选' : '该'}订单`)
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
      cancelOrder(data) {
        ElMessageBox.prompt('请在此写明取消原因', '取消订单', {
          inputType: 'textarea'
        }).then(async ({value}) => {
          const {code} = await $api.orderApi.dropShipping.cancelOrder({
            id: data.id,
            reason: value.trim()
          })
          if (code === 200) {
            ElMessage.success('已取消该订单')
            data.status = 4
          }
        }).catch(err => {
        })
      }
    })

    tableData.getList()
    window.addEventListener('back_refresh', tableData.getList)

    provide('closeDeliveryInfoDialog', dialog.deliveryInfo.close)
    provide('closeExpressInfoDialog', dialog.expressInfo.close)
    provide('getList', tableData.getList)

    return {
      searchForm,
      search,
      page,
      dialog,
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