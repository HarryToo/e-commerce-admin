<template>
  <div style="height: 100%;">
    <table-options-header class="block-view" style="border-bottom: none;">
      <div>
        <span style="font-size: 16px;">订单号：</span>
        <span>{{ detail.orderNum }}</span>
      </div>
      <template #right>
        <el-button @click="dialog.expressInfo.open" size="small" type="success" v-if="detail.status === 2">确认发货
        </el-button>
        <el-button @click="dialog.deliveryInfo.open" size="small" class="custom" v-if="detail.status === 2">修改收货信息
        </el-button>
        <el-button @click="dialog.logisticsInfo.open" size="small" class="custom"
                   v-if="detail.status === 3 || detail.status === 5">物流跟踪
        </el-button>
        <el-button @click="cancelOrder" size="small" type="danger" v-if="detail.status === 1 || detail.status === 2">
          取消订单
        </el-button>
        <el-button @click="deleteOrder" size="small" type="danger" v-if="detail.status === 4">删除订单</el-button>
      </template>
    </table-options-header>
    <div class="detail-cont" :style="{height: $getTableHeight(true, false) + 35 + 'px'}">
      <div class="block-view padding status-info">
        <div class="left">
          <div class="name">{{ ['待付款', '待发货', '待收货', '已取消', '已完成'][detail.status - 1] }}</div>
          <transition-group name="el-zoom-in-bottom" mode="out-in">
            <div class="time" v-if="detail.status === 1 && payCountDown">{{ payCountDown }}</div>
            <div class="cancel-reason" v-if="detail.status === 4 && detail.cancelReason">
              <span style="color: #555555;">取消原因：</span>
              <span>{{ detail.cancelReason }}</span>
            </div>
          </transition-group>
        </div>
        <div class="right">
          <el-steps :active="progressStatus" align-center>
            <el-step title="提交订单" :description="detail.orderTime"></el-step>
            <el-step title="付款成功" :description="detail.payTime"></el-step>
            <el-step title="商品发货" :description="detail.deliverGoodsTime"></el-step>
            <el-step title="确认收货" :description="detail.takeTime"></el-step>
            <el-step title="完成" :description="detail.completeTime"></el-step>
          </el-steps>
        </div>
      </div>
      <div class="block-view padding delivery-info" v-if="detail.deliveryInfo">
        <div class="column">
          <h3>收货信息：</h3>
          <ul>
            <li>收货人：{{ detail.deliveryInfo.name }}</li>
            <li>联系电话：{{ detail.deliveryInfo.phone }}</li>
            <li>
              <span>收货地址：</span>
              <span>{{ detail.deliveryInfo.provinces }}</span>
              <span>{{ detail.deliveryInfo.city }}</span>
              <span>{{ detail.deliveryInfo.area }}</span>
              <span>{{ detail.deliveryInfo.address }}</span>
            </li>
          </ul>
        </div>
        <div class="column">
          <h3>付款信息：</h3>
          <ul>
            <li>商品总额：￥{{ (detail.goodsPrice * detail.goodsNum).toFixed(2) }}</li>
            <li>运费金额：￥{{ detail.freightMoney }}</li>
            <li>应支付金额：￥{{ (detail.goodsPrice * detail.goodsNum + detail.freightMoney).toFixed(2) }}</li>
          </ul>
        </div>
      </div>
      <div class="block-view padding goods-info">
        <h3>商品信息：</h3>
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
          <el-table-column prop="shopNum" label="合计金额">
            <template #default="scope">
              <span>￥{{ (scope.row.goodsPrice * scope.row.goodsNum).toFixed(2) }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block-view padding operation-logs">
        <h3>操作记录：</h3>
        <el-table :data="detail.operationLogs" stripe>
          <el-table-column prop="status" label="订单状态">
            <template #default="scope">
              <span>{{ ['待付款', '待发货', '待收货', '已取消', '已完成'][scope.row.status - 1] }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="操作内容"></el-table-column>
          <el-table-column prop="content" label="操作人">
            <template #default="scope">
              <div>{{ scope.row.operatorRole }}</div>
              <div>{{ scope.row.operatorName }}/{{ scope.row.operatorPhone }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="time" label="操作时间"></el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog v-model="dialog.deliveryInfo.visible" width="500px" title="修改收货信息" :close-on-click-modal="false"
               destroy-on-close custom-class="custom">
      <delivery-info :info="detail"></delivery-info>
    </el-dialog>
    <el-dialog v-model="dialog.expressInfo.visible" width="500px" title="确认发货" :close-on-click-modal="false"
               custom-class="custom">
      <express-info :info="detail"></express-info>
    </el-dialog>
    <el-dialog v-model="dialog.logisticsInfo.visible" width="800px" title="物流跟踪" :close-on-click-modal="false"
               destroy-on-close custom-class="custom">
      <logistics-info :orderId="$route.params.orderId"></logistics-info>
    </el-dialog>
  </div>
</template>

<script>
import {computed, defineComponent, ref, onUnmounted, reactive, provide} from 'vue'
import {useRoute} from 'vue-router'
import {ElMessage, ElMessageBox} from "element-plus"
import WideGoodsItem from '@/components/goods/WideGoodsItem'
import DeliveryInfo from "./components/DeliveryInfo"
import ExpressInfo from "./components/ExpressInfo"
import LogisticsInfo from "./components/LogisticsInfo"
import $api from '@/api'
import moment from 'moment'

let timer

export default defineComponent({
  name: "DropShippingOrderDetail",
  components: {
    WideGoodsItem,
    DeliveryInfo,
    ExpressInfo,
    LogisticsInfo
  },
  setup() {
    const route = useRoute()
    const detail = ref({})
    const payCountDown = ref(0)

    const dialog = reactive({
      // 修改收货信息弹窗
      deliveryInfo: {
        visible: false,
        open() {
          dialog.deliveryInfo.visible = true
        },
        close() {
          dialog.deliveryInfo.visible = false
        }
      },
      // 发货弹窗
      expressInfo: {
        visible: false,
        open() {
          dialog.expressInfo.visible = true
        },
        close() {
          dialog.expressInfo.visible = false
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
          goodsNum: detail.value.goodsNum
        }]
      }
      return []
    })
    // 时间线状态值（主要处理status为4时的取消状态展示）
    const progressStatus = computed(() => {
      if (detail.value.orderTime) {
        const status = detail.value.status
        if (status === 4) {
          return detail.value.payTime ? 2 : 1
        }
        return status
      }
      return 0
    })

    // 待付款状态倒计时
    const startPayCountDown = (endTime) => {
      stopPayCountDown()
      timer = setInterval(() => {
        const t1 = moment()
        const t2 = moment(endTime)
        const diff = t2.diff(t1)
        const hours = moment.duration(diff).hours()
        const minutes = moment.duration(diff).minutes()
        const seconds = moment.duration(diff).seconds()
        payCountDown.value = hours + ' : ' + minutes + ' : ' + seconds
        if (hours === 0 && minutes === 0 && seconds === 0) {
          stopPayCountDown()
          // 时间到后会自动取消订单，刷新订单状态
          getDetail()
        }
      }, 1000)
    }
    const stopPayCountDown = () => {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
    }
    onUnmounted(stopPayCountDown)

    const getDetail = async () => {
      detail.value = await $api.orderApi.dropShipping.getDetail({
        orderId: route.params.orderId
      })
      if (detail.value.status === 1) {
        startPayCountDown(detail.value.payEndTime * 1000)
      }
    }
    getDetail()

    const cancelOrder = () => {
      ElMessageBox.prompt('请在此写明取消原因', '取消订单', {
        inputType: 'textarea',
        inputValidator(value) {
          if (!value || !value.trim()) {
            return '请输入取消原因'
          }
        }
      }).then(async ({value}) => {
        const {code} = await $api.orderApi.dropShipping.cancelOrder({
          id: route.params.orderId,
          reason: value.trim()
        })
        if (code === 200) {
          ElMessage.success('已取消该订单')
          getDetail()
          window.dispatchEvent(new Event('back_refresh'))
        }
      }).catch(err => {
      })
    }

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
    provide('closeExpressInfoDialog', dialog.expressInfo.close)
    provide('refreshData', getDetail)

    return {
      detail,
      dialog,
      goodsInfoTableList,
      progressStatus,
      payCountDown,
      cancelOrder,
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

      .time, .cancel-reason {
        margin-top: 12px;
        font-size: 16px;
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

              .el-step__icon-inner {
                display: none;
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

  .delivery-info {
    display: flex;

    .column {
      width: 50%;

      &:first-child {
        border-right: 1px solid #DDDDDD;
      }

      &:last-child {
        padding-left: 25px;
      }

      ul {
        margin-top: 30px;
        padding-left: 30px;
        list-style: none;

        li {
          margin: 10px 0;
          color: #666666;
        }
      }
    }
  }

  .goods-info {
  }
}
</style>