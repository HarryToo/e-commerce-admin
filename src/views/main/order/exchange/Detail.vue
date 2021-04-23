<template>
  <div style="height: 100%;">
    <table-options-header class="block-view" style="border-bottom: none;">
      <div>
        <span style="font-size: 16px;">订单号：</span>
        <span>{{ detail.orderNum }}</span>
      </div>
      <template #right>
        <el-button @click="dialog.deliveryInfo.open" size="small" class="custom" v-if="detail.status === 1 ">同意换货
        </el-button>
        <el-button @click="refusalExchange" size="small" type="danger" v-if="detail.status === 1 ">拒绝换货</el-button>
        <el-button @click="received" size="small" type="success" v-if="detail.status === 2">确认收货</el-button>
        <el-button @click="dialog.expressInfo.open" size="small" class="custom" v-if="detail.status === 3">确认发货
        </el-button>
      </template>
    </table-options-header>
    <div class="detail-cont" :style="{height: $getTableHeight(true, false) + 35 + 'px'}">
      <div class="block-view padding status-info">
        <div class="left">
          <div class="name">{{ ['待审核', '待收货', '待发新货', '待用户收货', '拒绝换货', '已完成'][detail.status - 1] }}</div>
        </div>
        <div class="right">
          <el-steps :active="progressStatus" align-center>
            <el-step title="提交申请" :description="detail.applyTime"></el-step>
            <el-step title="审核" status="wait" :description="detail.reviewTime" v-if="detail.status === 1"></el-step>
            <el-step title="审核" :status="detail.status === 5 ? 'error' :  'finish'"
                     :description="detail.reviewTime" v-else></el-step>
            <el-step title="确认收货" :description="detail.receiptTime"></el-step>
            <el-step title="确认发货" :description="detail.deliveryTime"></el-step>
            <el-step title="完成" :description="detail.completeTime"></el-step>
          </el-steps>
        </div>
      </div>
      <div class="block-view padding goods-info">
        <h3>换货商品：</h3>
        <el-table :data="goodsInfoTableList" stripe>
          <el-table-column prop="skuNum" label="SKU编号"></el-table-column>
          <el-table-column prop="goodsInfo" label="商品信息" width="560">
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
        </el-table>
        <div class="returned-reason">
          <div class="row">
            <span class="label">换货原因：</span>
            <div class="content">{{ detail.returnedReason }}</div>
          </div>
          <div class="row">
            <span class="label">换货描述：</span>
            <div class="content">{{ detail.returnedDecs }}</div>
          </div>
          <div class="row">
            <span class="label">换货图片：</span>
            <div class="content">
              <el-image v-for="item in detail.returnedImages" :src="item" filt="cover"
                        :preview-src-list="detail.returnedImages" hide-on-click-modal
                        style="width: 120px;height: 120px;margin-right: 10px;border-radius: 4px;"></el-image>
            </div>
          </div>
        </div>
      </div>
      <div class="block-view padding returned-info">
        <h3>换货单信息：</h3>
        <table>
          <tr>
            <td>换货单号/订单号</td>
            <td>{{ detail.returnedNum }}/{{ detail.orderNum }}</td>
          </tr>
          <template v-if="detail.deliveryInfo">
            <tr>
              <td>发新货联系人</td>
              <td>{{ detail.deliveryInfo.name }}</td>
            </tr>
            <tr>
              <td>发新货联系电话</td>
              <td>{{ detail.deliveryInfo.phone }}</td>
            </tr>
            <tr>
              <td>发新货收货地址</td>
              <td>
                <span>{{ detail.deliveryInfo.provinces }}</span>
                <span>{{ detail.deliveryInfo.city }}</span>
                <span>{{ detail.deliveryInfo.area }}</span>
                <span>{{ detail.deliveryInfo.address }}</span>
              </td>
            </tr>
          </template>
          <template v-if="detail.status !== 1 && detail.status !== 5">
            <tr>
              <td>发新货物流单号</td>
              <td>
                <span style="padding-right: 10px;">{{ detail.logisticsName }}：{{ detail.logisticsNumber }}</span>
                <el-button size="mini" class="custom" @click="dialog.logisticsInfo.open">查看物流</el-button>
              </td>
            </tr>
            <template v-if="detail.returnDeliveryInfo">
              <tr>
                <td>返回商品收货人姓名</td>
                <td>{{ detail.returnDeliveryInfo.name }}</td>
              </tr>
              <tr>
                <td>返回商品收货人手机号</td>
                <td>{{ detail.returnDeliveryInfo.phone }}</td>
              </tr>
              <tr>
                <td>返回商品收货地址</td>
                <td>{{ detail.returnDeliveryInfo.provinces }}{{
                    detail.returnDeliveryInfo.city
                  }}{{ detail.returnDeliveryInfo.area }}
                </td>
              </tr>
              <tr>
                <td>返回商品详细地址</td>
                <td>{{ detail.returnDeliveryInfo.address }}</td>
              </tr>
            </template>
            <tr v-if="detail.status === 4">
              <td>返回商品物流单号</td>
              <td>
                <span style="padding-right: 10px;">{{ detail.returnLogisticsName }}：{{
                    detail.returnLogisticsNumber
                  }}</span>
                <el-button size="mini" class="custom" @click="dialog.returnLogisticsInfo.open">查看物流</el-button>
              </td>
            </tr>
          </template>
          <tr v-if="detail.status !== 1">
            <td>备注信息</td>
            <td :class="{highlight: detail.status === 5}">{{ detail.remark || '—' }}</td>
          </tr>
        </table>
      </div>
    </div>

    <el-dialog v-model="dialog.deliveryInfo.visible" width="550px" title="填写换货单信息" :close-on-click-modal="false"
               destroy-on-close custom-class="custom">
      <delivery-info :info="detail"></delivery-info>
    </el-dialog>
    <el-dialog v-model="dialog.expressInfo.visible" width="500px" title="确认发货" :close-on-click-modal="false"
               custom-class="custom">
      <express-info :info="detail"></express-info>
    </el-dialog>
    <el-dialog v-model="dialog.logisticsInfo.visible" width="800px" title="物流跟踪" :close-on-click-modal="false"
               destroy-on-close custom-class="custom">
      <logistics-info :number="detail.logisticsNumber" :code="detail.logisticsCode"
                      :phone="detail.deliveryInfo.phone"></logistics-info>
    </el-dialog>
    <el-dialog v-model="dialog.returnLogisticsInfo.visible" width="800px" title="物流跟踪" :close-on-click-modal="false"
               destroy-on-close custom-class="custom">
      <logistics-info :number="detail.returnLogisticsNumber" :code="detail.returnLogisticsCode"
                      :phone="detail.returnDeliveryInfo.phone"></logistics-info>
    </el-dialog>
  </div>
</template>

<script>
import {computed, defineComponent, ref, reactive, provide} from 'vue'
import {useRoute} from 'vue-router'
import {ElMessage, ElMessageBox} from "element-plus"
import WideGoodsItem from '@/components/goods/WideGoodsItem'
import LogisticsInfo from "@/components/LogisticsInfo"
import DeliveryInfo from "./components/DeliveryInfo"
import ExpressInfo from "./components/ExpressInfo"
import $api from '@/api'

export default defineComponent({
  name: "ExchangeOrderDetail",
  components: {
    WideGoodsItem,
    LogisticsInfo,
    DeliveryInfo,
    ExpressInfo
  },
  setup() {
    const route = useRoute()
    const detail = ref({})

    const dialog = reactive({
      // 换货单信息填写弹窗
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
        open(data) {
          dialog.expressInfo.visible = true
        },
        close() {
          dialog.expressInfo.visible = false
        }
      },
      //  发新货物流信息弹窗
      logisticsInfo: {
        visible: false,
        open() {
          dialog.logisticsInfo.visible = true
        },
        close() {
          dialog.logisticsInfo.visible = false
        }
      },
      // 返回商品物流信息弹窗
      returnLogisticsInfo: {
        visible: false,
        open() {
          dialog.returnLogisticsInfo.visible = true
        },
        close() {
          dialog.returnLogisticsInfo.visible = false
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
          actualMoney: detail.value.actualMoney
        }]
      }
      return []
    })
    // 时间线状态值（主要处理status为4时的拒绝换货状态展示）
    const progressStatus = computed(() => {
      if (detail.value.applyTime) {
        const status = detail.value.status
        if (status === 5) {
          return 1
        }
        return status
      }
      return 0
    })

    const getDetail = async () => {
      detail.value = await $api.orderApi.exchange.getDetail({
        orderId: route.params.orderId
      })
    }
    getDetail()

    // 拒绝换货
    const refusalExchange = () => {
      ElMessageBox.prompt('请填写拒绝原因', '拒绝换货', {
        inputType: 'textarea',
        inputValidator(value) {
          if (!value || !value.trim()) {
            return '请填写拒绝原因'
          }
        }
      }).then(async ({value}) => {
        const {code} = await $api.orderApi.exchange.review({
          id: route.params.orderId,
          type: 2,
          remark: value.trim()
        })
        if (code === 200) {
          ElMessage.success('已拒绝换货')
          getDetail()
        }
      }).catch(err => {
      })
    }

    // 确认收货
    const received = () => {
      ElMessageBox.confirm(`确认后，不可更改，请注意核对订单及检查商品！`, `确认已收到该商品吗？`, {type: 'warning'}).then(async () => {
        const {code} = await $api.orderApi.exchange.received({
          id: route.params.orderId
        })
        if (code === 200) {
          ElMessage.success(`已确认收货`)
          getDetail()
        }
      }).catch(err => {
      })
    }

    // 删除订单
    const deleteOrder = async () => {
      const {code} = await $api.orderApi.exchange.deleteOrder({
        id: route.params.orderId
      })
      if (code === 200) {
        ElMessage.success(`已删除${ids.length > 1 ? '所选' : '该'}订单`)
        getDetail()
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
      refusalExchange,
      received,
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