<template>
  <div class="general-setting">
    <el-form :model="formData" :rules="formRules" size="small">
      <el-form-item label=" " prop="autoCancelDuration">
        <span style="padding-right: 6px;">提交订单超过</span>
        <el-input v-model.number="formData.autoCancelDuration" placeholder="请填写阈值" style="width: 140px;">
          <template #suffix>分钟</template>
        </el-input>
        <span style="padding-left: 6px;">未完成支付，自动取消订单</span>
      </el-form-item>
      <el-form-item label=" " prop="autoReceiveDuration">
        <span style="padding-right: 6px;">平台发货超过</span>
        <el-input v-model.number="formData.autoReceiveDuration" placeholder="请填写阈值" style="width: 140px;">
          <template #suffix>天</template>
        </el-input>
        <span style="padding-left: 6px;">用户未确认收货时，自动确认收货</span>
      </el-form-item>
      <el-form-item label=" " prop="afterSaleDuration">
        <span style="padding-right: 6px;">订单完成超过</span>
        <el-input v-model.number="formData.afterSaleDuration" placeholder="请填写阈值" style="width: 140px;">
          <template #suffix>天</template>
        </el-input>
        <span style="padding-left: 6px;">订单不再支持售后</span>
      </el-form-item>
      <el-form-item style="margin-top: 60px;">
        <el-button class="custom" style="padding: 0 40px;" @click="saveConfigs">保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {ElMessage} from 'element-plus'
import $api from '@/api'

export default defineComponent({
  name: "OrderGeneralSetting",
  setup() {
    const formData = ref({
      autoCancelDuration: '',
      autoReceiveDuration: '',
      afterSaleDuration: ''
    })
    const formRules = {
      autoCancelDuration: [{required: true, message: '请填写阈值'}],
      autoReceiveDuration: [{required: true, message: '请填写阈值'}],
      afterSaleDuration: [{required: true, message: '请填写阈值'}]
    }

    const getConfigs = async () => {
      formData.value = await $api.orderApi.setting.getConfigs()
    }
    getConfigs()

    const saveConfigs = async () => {
      const {code} = await $api.orderApi.setting.saveConfigs(formData.value)
      if (code === 200) {
        ElMessage.success('保存成功')
      }
    }

    return {
      formData,
      formRules,
      saveConfigs
    }
  }
})
</script>

<style scoped lang="scss">
.general-setting {
  width: 520px;
  padding: 50px 25px 25px;

  span {
    color: #555555;
  }
}
</style>