<template>
  <el-form ref="form" :model="formData" :rules="formRules" size="small" label-position="left" label-width="110px"
           label-suffix=":">
    <el-form-item label="是否退运费" prop="isReturnFreightMoney">
      <el-radio-group v-model="formData.isReturnFreightMoney">
        <el-radio :label="0">不退运费</el-radio>
        <el-radio :label="1">退运费</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="退款金额">
      <span>￥{{ refundMoney }}</span>
    </el-form-item>
    <el-form-item label="收货人" prop="name">
      <el-input v-model="formData.name" placeholder="请输入收货人姓名"></el-input>
    </el-form-item>
    <el-form-item label="联系电话" prop="phone">
      <el-input v-model="formData.phone" placeholder="请输入联系电话"></el-input>
    </el-form-item>
    <el-form-item label="收货地址" prop="area">
      <el-cascader :options="regionData" v-model="formData.area" placeholder="请选择省/市/区"
                   :props="{expandTrigger: 'hover', value: 'label'}"></el-cascader>
    </el-form-item>
    <el-form-item label="详细地址" prop="address">
      <el-input v-model="formData.address" type="textarea" :rows="4" placeholder="请输入详细地址"></el-input>
    </el-form-item>
    <el-form-item label="备注信息" prop="remark">
      <el-input v-model="formData.remark" type="textarea" :rows="4" placeholder="请输入备注信息"></el-input>
    </el-form-item>
    <el-form-item align="right" style="margin-bottom: 0;">
      <el-button class="custom" @click="submit">同意退货</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {defineComponent, ref, reactive, inject, computed, toRefs} from 'vue'
import {ElMessage} from "element-plus"
import {regionData} from 'element-china-area-data'
import {reg} from '@/utils/tool'
import $api from '@/api'

export default defineComponent({
  name: "DeliveryInfo",
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
    const closeDialog = inject('closeDeliveryInfoDialog')
    const refreshData = inject('refreshData')

    const form = ref()
    // 退款金额
    const refundMoney = computed(() => {
      return formData.isReturnFreightMoney ? info.value.goodsMoney + info.value.freightMoney : info.value.goodsMoney
    })
    const formData = reactive({
      isReturnFreightMoney: 0,
      name: '',
      phone: '',
      area: '',
      address: '',
      remark: ''
    })
    const formRules = {
      isReturnFreightMoney: [{required: true, message: '请选择是否退运费'}],
      name: [{required: true, message: '请输入收货人姓名'}],
      phone: [
        {required: true, message: '请输入联系电话'},
        {pattern: reg.phone, message: '请输入正确的联系电话'}
      ],
      area: [{required: true, message: '请选择收货地址'}],
      address: [{required: true, message: '请输入详细地址'}]
    }

    const resultData = computed(() => {
      return {
        orderId: info.id,
        type: 1,
        isReturnFreightMoney: formData.isReturnFreightMoney,
        name: formData.name,
        phone: formData.phone,
        provinces: formData.area[0],
        city: formData.area[1],
        area: formData.area[2],
        address: formData.address,
        remark: formData.remark
      }
    })

    const submit = async () => {
      if (await form.value.validate()) {
        const {code} = await $api.orderApi.returned.review(resultData.value)
        if (code === 200) {
          ElMessage.success('已同意退货')
          closeDialog()
          refreshData()
          window.dispatchEvent(new Event('back_refresh'))
        }
      }
    }

    return {
      regionData,
      form,
      refundMoney,
      formData,
      formRules,
      submit
    }
  }
})
</script>

<style scoped lang="scss">

</style>