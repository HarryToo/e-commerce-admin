<template>
  <el-form ref="form" :model="formData" :rules="formRules" size="small" label-position="left" label-width="90px"
           label-suffix=":">
    <el-form-item label="快递公司" prop="companyCode">
      <el-select v-model="formData.companyCode" placeholder="请选择快递公司">
        <el-option v-for="item in courierCompanyList" :key="item.id" :label="item.name" :value="item.code">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="快递单号" prop="number">
      <el-input v-model="formData.number" placeholder="请输入快递单号"></el-input>
    </el-form-item>
    <div class="delivery-info">
      <div>订单号：{{ info.orderNum }}</div>
      <div>收货人：{{ info.deliveryInfo.name }}</div>
      <div>订单号：{{ info.deliveryInfo.phone }}</div>
      <div>
        <span>收货地址：</span>
        <span>{{ info.deliveryInfo.provinces }}</span>
        <span>{{ info.deliveryInfo.city }}</span>
        <span>{{ info.deliveryInfo.area }}</span>
        <span>{{ info.deliveryInfo.address }}</span>
      </div>
    </div>
    <el-form-item align="right" style="margin-bottom: 0;">
      <el-button class="custom" @click="saveInfo">确定发货</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {defineComponent, ref, inject, reactive, toRefs, computed} from 'vue'
import $api from '@/api'
import {ElMessage} from "element-plus";

export default defineComponent({
  name: "ExpressInfo",
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  setup(props) {
    const {info} = toRefs(props)
    const closeDialog = inject('closeExpressInfoDialog')
    const getList = inject('getList')

    // 快递公司列表
    const courierCompanyList = ref([])
    const getCourierCompanyList = async () => {
      const {list} = await $api.commonApi.getCourierCompanyList()
      courierCompanyList.value = list
    }
    getCourierCompanyList()

    const form = ref()
    const formData = reactive({
      companyCode: '',
      number: ''
    })
    const formRules = {
      companyCode: [{required: true, message: '请选择快递公司'}],
      number: [{required: true, message: '请输入快递单号'}]
    }

    const resultData = computed(() => {
      return {
        orderId: info.value.id,
        companyName: courierCompanyList.value.find((item) => item.code === formData.companyCode).name,
        ...formData
      }
    })

    const saveInfo = async () => {
      if (await form.value.validate()) {
        const {code} = await $api.orderApi.dropShipping.editDeliveryInfo(resultData.value)
        form.value.resetFields()
        if (code === 200) {
          ElMessage.success('发货成功')
          closeDialog()
          getList()
        }
      }
    }

    return {
      courierCompanyList,
      form,
      formData,
      formRules,
      saveInfo
    }
  }
})
</script>

<style scoped lang="scss">
.delivery-info {
  margin: 30px 0;
  line-height: 28px;
  font-size: 14px;
  color: #666666;
}
</style>