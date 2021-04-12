<template>
  <div class="warning-setting">
    <el-form :model="formData" size="small" label-position="left" label-width="100px" label-suffix=":">
      <el-form-item label="扫描时间">
        <span style="padding-right: 5px;">每日</span>
        <el-time-picker v-model="formData.time" placeholder="请选择扫描时间"></el-time-picker>
        <span style="padding-left: 5px;">执行扫描</span>
      </el-form-item>
      <el-form-item label="选择预警项">
        <el-checkbox-group v-model="formData.options">
          <el-checkbox :label="1" style="display: block;">链接失效</el-checkbox>
          <el-checkbox :label="2" style="display: block;">价格变化</el-checkbox>
          <el-checkbox :label="3" style="display: block;">
            <span style="padding-right: 5px;">库存小于</span>
            <el-input v-model.number="formData.minInventory" placeholder="请输入阈值" style="width: 150px;"></el-input>
            <span style="padding-left: 5px;">的</span>
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item align="right" style="margin-top: 60px;margin-bottom: 0;">
        <el-button class="custom" style="padding: 0 20px;">应用</el-button>
        <div class="tips">满足预警项的商品会在预警列表展示</div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import moment from "moment"
import $api from '@/api'

export default defineComponent({
  name: "WarningSetting",
  setup() {
    const formData = ref({
      time: moment().startOf('day').toDate(),
      options: [],
      minInventory: ''
    })

    const getSettings = async () => {
      formData.value = await $api.goodsApi.warning.getSettings()
    }
    getSettings()

    return {
      formData
    }
  }
})
</script>

<style scoped lang="scss">
.warning-setting {
  .tips {
    margin-top: 10px;
    line-height: 1;
    font-size: 14px;
    color: #999999;
  }
}
</style>