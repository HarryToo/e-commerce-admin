<template>
  <div style="height: 100%;padding: 25px;">
    <el-table :data="formData" stripe :height="$getTableHeight(false)">
      <el-table-column label="订单号" prop="orderNum" width="200"></el-table-column>
      <el-table-column label="收货人" prop="name" width="150"></el-table-column>
      <el-table-column label="联系电话" prop="phone"></el-table-column>
      <el-table-column label="收货地址" prop="address" width="350">
        <template #default="scope">
          <span>{{ scope.row.provinces }}</span>
          <span>{{ scope.row.city }}</span>
          <span>{{ scope.row.area }}</span>
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="快递公司" prop="name">
        <template #default="scope">
          <el-select v-model="scope.row.companyCode" placeholder="请选择快递公司" size="small">
            <el-option v-for="item in courierCompanyList" :key="item.id" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="快递单号" prop="name">
        <template #default="scope">
          <el-input v-model="scope.row.number" clearable placeholder="请输入快递单号" size="small"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <table-pagination-footer :pager="false">
      <el-button size="small" @click="$router.back">取消</el-button>
      <el-button class="custom" size="small" @click="batchDeliverGoods">确定发货</el-button>
    </table-pagination-footer>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {ElMessage} from "element-plus"
import $api from '@/api'

export default defineComponent({
  name: "BatchDeliver",
  setup() {
    const route = useRoute()
    const router = useRouter()
    if (route.params.list && route.params.type) {
      // 快递公司列表
      const courierCompanyList = ref([])
      const getCourierCompanyList = async () => {
        const {list} = await $api.commonApi.getCourierCompanyList()
        courierCompanyList.value = list
      }
      getCourierCompanyList()

      const list = JSON.parse(route.params.list)
      const formData = list.map((item) => {
        return {
          id: item.id,
          orderNum: item.orderNum,
          ...item.deliveryInfo,
          companyCode: '',
          number: ''
        }
      })

      const batchDeliverGoods = async () => {
        // 检查填写
        let errFlag = false
        formData.forEach((item, index) => {
          if (!item.companyCode || !item.number) {
            if (!errFlag) {
              errFlag = true
              ElMessage.error(`第${index + 1}行信息填写不完整，请检查`)
            }
          }
        })
        if (!errFlag) {
          const params = formData.map((item) => {
            return {
              orderId: item.id,
              companyCode: item.companyCode,
              companyName: courierCompanyList.value.find((companyItem) => companyItem.code === item.companyCode).name,
              number: item.number
            }
          })
          // 根据路由参数type判断此次批量发货的订单类型：1.代发下单，2.换货订单
          const type = route.params.type - 1
          const apiModules = ['dropShipping', 'exchange']
          const {code} = await $api.orderApi[apiModules[type]].batchDeliverGoods(params)
          if (code === 200) {
            ElMessage.success('发货成功')
            router.back()
          }
        }
      }

      return {
        courierCompanyList,
        formData,
        batchDeliverGoods
      }
    } else {
      router.back()
    }
  }
})
</script>

<style scoped lang="scss">

</style>