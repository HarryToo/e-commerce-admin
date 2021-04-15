<template>
  <div style="height: 100%;">
    <table-options-header class="block-view" style="border-bottom: none;">
      <div>
        <span style="font-size: 16px;">订单号：</span>
        <span>{{ detail.orderNum }}</span>
      </div>
      <template #right>
        <el-button @click="dialog.deliveryInfo.open" size="small" class="custom" v-if="detail.status === 1 ">同意退货
        </el-button>
        <el-button @click="refusalReturn" size="small" type="danger" v-if="detail.status === 1 ">拒绝退货</el-button>
        <el-button @click="received" size="small" type="success" v-if="detail.status === 2">确认收货</el-button>
        <el-button @click="refund" size="small" class="custom" v-if="detail.status === 3">确认退款</el-button>
      </template>
    </table-options-header>
    <div class="detail-cont" :style="{height: $getTableHeight(true, false) + 35 + 'px'}">
      <div class="block-view padding status-info">
        <div class="left">
          <div class="name">{{ ['待审核', '待收货', '待退款', '拒绝退货', '已完成'][detail.status - 1] }}</div>
        </div>
        <div class="right">
          <el-steps :active="progressStatus" align-center>
            <el-step title="提交申请" :description="detail.applyTime"></el-step>
            <el-step title="审核" :status="detail.status === 4 ? 'error' :  'finish'"
                     :description="detail.reviewTime"></el-step>
            <el-step title="确认收货" :description="detail.receiptTime"></el-step>
            <el-step title="确认退款" :description="detail.refundTime"></el-step>
            <el-step title="完成" :description="detail.completeTime"></el-step>
          </el-steps>
        </div>
      </div>
      <div class="block-view padding goods-info">
        <h3>退货商品：</h3>
        <el-table :data="goodsInfoTableList" stripe>
          <el-table-column prop="skuNum" label="SKU编号"></el-table-column>
          <el-table-column prop="goodsInfo" label="商品信息" width="500">
            <template #default="scope">
              <wide-goods-item :goods="scope.row.goodsInfo"></wide-goods-item>
            </template>
          </el-table-column>
          <el-table-column prop="goodsPrice" label="单价">
            <template #default="scope">
              <span>￥{{ scope.row.goodsPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="goodsNum" label="数量">
            <template #default="scope">
              <span>{{ scope.row.goodsNum }}件</span>
            </template>
          </el-table-column>
          <el-table-column prop="shopNum" label="实付金额">
            <template #default="scope">
              <span>￥{{ scope.row.actualMoney }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="shopNum" label="应退金额">
            <template #default="scope">
              <span>￥{{ scope.row.refundableMoney }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="returned-reason">
          <div class="row">
            <span class="label">退货原因：</span>
            <div class="content">{{ detail.returnedReason }}</div>
          </div>
          <div class="row">
            <span class="label">退货描述：</span>
            <div class="content">{{ detail.returnedDecs }}</div>
          </div>
          <div class="row">
            <span class="label">退货图片：</span>
            <div class="content">
              <el-image v-for="item in detail.returnedImages" :src="item" filt="cover"
                        :preview-src-list="detail.returnedImages" hide-on-click-modal
                        style="width: 120px;height: 120px;margin-right: 10px;border-radius: 4px;"></el-image>
            </div>
          </div>
        </div>
      </div>
      <div class="block-view padding returned-info">
        <h3>退货单信息：</h3>
        <table>
          <tr>
            <td>退货单号/订单号</td>
            <td>{{ detail.returnedNum }}/{{ detail.orderNum }}</td>
          </tr>
          <tr>
            <td>商品金额</td>
            <td>￥{{ detail.goodsMoney }}</td>
          </tr>
          <tr>
            <td>运费金额</td>
            <td>￥{{ detail.freightMoney }}</td>
          </tr>
          <template v-if="detail.status !== 1 && detail.status !== 4">
            <tr>
              <td>是否退运费</td>
              <td>{{ detail.isReturnFreightMoney ? '退运费' : '不退运费' }}</td>
            </tr>
            <tr>
              <td>退款金额</td>
              <td>￥{{ detail.refundMoney }}</td>
            </tr>
            <tr>
              <td>退款方式</td>
              <td>{{ detail.refundType }}</td>
            </tr>
            <tr>
              <td>退货物流单号</td>
              <td>
                <span style="padding-right: 10px;">{{ detail.logisticsName }}：{{ detail.logisticsNumber }}</span>
                <el-button size="mini" class="custom" @click="">查看物流</el-button>
              </td>
            </tr>
            <template v-if="detail.deliveryInfo">
              <tr>
                <td>收货人姓名</td>
                <td>{{ detail.deliveryInfo.name }}</td>
              </tr>
              <tr>
                <td>收货人手机号</td>
                <td>{{ detail.deliveryInfo.phone }}</td>
              </tr>
              <tr>
                <td>收货地址</td>
                <td>{{ detail.deliveryInfo.provinces }}{{ detail.deliveryInfo.city }}{{ detail.deliveryInfo.area }}</td>
              </tr>
              <tr>
                <td>详细地址</td>
                <td>{{ detail.deliveryInfo.address }}</td>
              </tr>
            </template>
          </template>
          <tr v-if="detail.status !== 1">
            <td>备注信息</td>
            <td :class="{highlight: detail.status === 4}">{{ detail.remark || '—' }}</td>
          </tr>
        </table>
      </div>
    </div>

    <el-dialog v-model="dialog.deliveryInfo.visible" width="550px" title="填写退货单信息" :close-on-click-modal="false"
               destroy-on-close custom-class="custom">
      <delivery-info :info="detail"></delivery-info>
    </el-dialog>
    <el-dialog v-model="dialog.logisticsInfo.visible" width="800px" title="物流跟踪" :close-on-click-modal="false"
               destroy-on-close custom-class="custom">
      <logistics-info :orderId="$route.params.orderId"></logistics-info>
    </el-dialog>
  </div>
</template>

<script>
import {computed, defineComponent, ref, reactive, provide} from 'vue'
import {useRoute} from 'vue-router'
import {ElMessage, ElMessageBox} from "element-plus"
import WideGoodsItem from '@/components/goods/WideGoodsItem'
import DeliveryInfo from "./components/DeliveryInfo"
import LogisticsInfo from "./components/LogisticsInfo"
import $api from '@/api'

export default defineComponent({
  name: "ExchangeOrderDetail",
  components: {
    WideGoodsItem,
    DeliveryInfo,
    LogisticsInfo
  },
  setup() {
    const route = useRoute()
    const detail = ref({})

    const dialog = reactive({
      // 退货单信息填写弹窗
      deliveryInfo: {
        visible: false,
        open() {
          dialog.deliveryInfo.visible = true
        },
        close() {
          dialog.deliveryInfo.visible = false
        }
      },
      // 物流信息弹窗
      logisticsInfo: {
        visible: false,
        open() {
          dialog.logisticsInfo.visible = true
        },
        close() {
          dialog.logisticsInfo.visible = false
        }
      }
    })

    // 商品信息表格数据
    const goodsInfoTableList = computed(() => {
      if (detail.value.goodsInfo) {
        return [{
          skuNum: detail.value.skuNum,
          goodsInfo: detail.value.goodsInfo,
          goodsPrice: detail.value.goodsPrice,
          goodsNum: detail.value.goodsNum,
          actualMoney: detail.value.actualMoney,
          refundableMoney: detail.value.refundableMoney
        }]
      }
      return []
    })
    // 时间线状态值（主要处理status为4时的拒绝退货状态展示）
    const progressStatus = computed(() => {
      if (detail.value.applyTime) {
        const status = detail.value.status
        if (status === 4) {
          return 1
        }
        return status
      }
      return 0
    })

    const getDetail = async () => {
      detail.value = await $api.orderApi.returned.getDetail({
        orderId: route.params.orderId
      })
    }
    getDetail()

    // 拒绝退货
    const refusalReturn = () => {
      ElMessageBox.prompt('请填写拒绝原因', '拒绝退货', {
        inputType: 'textarea',
        inputValidator(value) {
          if (!value || !value.trim()) {
            return '请填写拒绝原因'
          }
        }
      }).then(async ({value}) => {
        const {code} = await $api.orderApi.returned.review({
          id: route.params.orderId,
          type: 2,
          remark: value.trim()
        })
        if (code === 200) {
          ElMessage.success('已拒绝退货')
          getDetail()
          window.dispatchEvent(new Event('back_refresh'))
        }
      }).catch(err => {
      })
    }

    // 确认收货
    const received = () => {
      ElMessageBox.confirm(`确认后，不可更改，请注意核对订单及检查商品！`, `确认已收到该商品吗？`, {type: 'warning'}).then(async () => {
        const {code} = await $api.orderApi.returned.received({
          id: route.params.orderId
        })
        if (code === 200) {
          ElMessage.success(`已确认收货`)
          getDetail()
          window.dispatchEvent(new Event('back_refresh'))
        }
      }).catch(err => {
      })
    }

    // 确认退款
    const refund = () => {
      ElMessageBox.confirm(`确认后，系统将执行自动退款，请谨慎核对！`, `确认要执行该笔退款吗？`, {type: 'warning'}).then(async () => {
        const {code} = await $api.orderApi.returned.refund({
          id: route.params.orderId
        })
        if (code === 200) {
          ElMessage.success(`已确认退款`)
          getDetail()
          window.dispatchEvent(new Event('back_refresh'))
        }
      }).catch(err => {
      })
    }

    // 删除订单
    const deleteOrder = async () => {
      const {code} = await $api.orderApi.dropShipping.deleteOrder({
        id: route.params.orderId
      })
      if (code === 200) {
        ElMessage.success(`已删除${ids.length > 1 ? '所选' : '该'}订单`)
        getDetail()
        window.dispatchEvent(new Event('back_refresh'))
      }
    }

    provide('closeDeliveryInfoDialog', dialog.deliveryInfo.close)
    provide('refreshData', getDetail)

    return {
      detail,
      dialog,
      goodsInfoTableList,
      progressStatus,
      refusalReturn,
      received,
      refund,
      deleteOrder
    }
  }
})
</script>

<style scoped lang="scss">

.detail-cont {
  margin-top: 10px;
  overflow-y: auto;

  .block-view {
    margin-top: 10px;

    &:first-of-type {
      margin-top: 0;
    }
  }

  .padding {
    padding: 25px;
  }

  .status-info {
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;

    .left {
      height: 100%;
      padding: 0 140px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #FF3A30;
      border-right: 1px solid #DDDDDD;

      .name {
        font-weight: bold;
        font-size: 26px;
      }
    }

    .right {
      flex-grow: 1;

      ::v-deep .el-steps {

        .el-step {
          .el-step__head {
            .el-step__line {
              top: 6px;
              background-color: transparent;
              border-bottom: 1px dashed #CCCCCC;
            }

            .el-step__icon {
              width: 15px;
              height: 15px;
              border: 1px solid #CCCCCC;
              position: relative;

              .el-step__icon-inner {
                display: none;
              }

              .el-icon-close {
                display: block;
                position: absolute;
                top: -1px;
              }
            }

            &.is-finish {
              .el-step__line {
                border-color: #F9612E;
              }

              .el-step__icon {
                border-color: #F9612E;
              }
            }
          }

          .el-step__main {
            .el-step__title {
              font-size: 14px;
              color: #333333;

              &.is-process {
                font-weight: normal;
              }
            }

            .el-step__description {
              line-height: 16px;
              font-size: 12px;
              color: #999999;
            }
          }
        }
      }
    }
  }

  .goods-info {
    .returned-reason {
      margin-top: 28px;

      .row {
        margin-top: 20px;

        &:first-child {
          margin-top: 0;
        }

        .label {
          color: #666666;
        }

        .content {
          display: inline-block;
          vertical-align: top;
          color: #FF3A30;
        }
      }
    }
  }

  .returned-info {
    table, tr, td {
      border: 1px solid #EEEEEE;
      border-collapse: collapse;
    }

    table {
      width: 100%;
    }

    tr {
      td {
        padding: 18px 10px;
        color: #666666;

        &.highlight {
          color: #FF3A30;
        }

        &:first-child {
          width: 200px;
          color: #333333;
          background-color: #F8F8F8;
        }
      }
    }
  }
}
</style>