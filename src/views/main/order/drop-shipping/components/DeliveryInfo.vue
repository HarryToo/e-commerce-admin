<template>
  <el-form ref="form" :model="formData" :rules="formRules" size="small" label-position="left" label-width="90px"
           label-suffix=":">
    <el-form-item label="收货人" prop="name">
      <el-input v-model="formData.name" placeholder="请输入收货人姓名"></el-input>
    </el-form-item>
    <el-form-item label="联系电话" prop="phone">
      <el-input v-model="formData.phone" placeholder="请输入联系电话"></el-input>
    </el-form-item>
    <el-form-item label="收货地址">
      <el-cascader :options="regionData" v-model="formData.area"
                   :props="{expandTrigger: 'hover', value: 'label'}"></el-cascader>
    </el-form-item>
    <el-form-item label="详细地址" prop="address">
      <el-input v-model="formData.address" type="textarea" :rows="5" placeholder="请输入详细地址"></el-input>
    </el-form-item>
    <el-form-item align="right" style="margin-bottom: 0;">
      <el-button class="custom" @click="saveInfo">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {defineComponent, ref, reactive, inject, computed} from 'vue'
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
    const {info} = props
    const deliveryInfo = info.deliveryInfo
    const closeDialog = inject('closeDeliveryInfoDialog')
    const getList = inject('getList')

    const form = ref()
    const formData = reactive({
      name: deliveryInfo.name,
      phone: deliveryInfo.phone,
      area: [deliveryInfo.provinces, deliveryInfo.city, deliveryInfo.area],
      address: deliveryInfo.address
    })
    const formRules = {
      name: [{required: true, message: '请输入收货人姓名'}],
      phone: [
        {required: true, message: '请输入联系电话'},
        {pattern: reg.phone, message: '请输入正确的联系电话'}
      ],
      address: [{required: true, message: '请输入详细地址'}]
    }

    const resultData = computed(() => {
      return {
        orderId: info.id,
        name: formData.name,
        phone: formData.phone,
        provinces: formData.area[0],
        city: formData.area[1],
        area: formData.area[2],
        address: formData.address
      }
    })

    const saveInfo = async () => {
      if (await form.value.validate()) {
        const {code} = await $api.orderApi.dropShipping.editDeliveryInfo(resultData.value)
        if (code === 200) {
          ElMessage.success('修改成功')
          closeDialog()
          getList()
        }
      }
    }

    return {
      regionData,
      form,
      formData,
      formRules,
      saveInfo
    }
  }
})
</script>

<style scoped lang="scss">

</style>