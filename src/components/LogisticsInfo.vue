<template>
  <div class="logistics-info">
    <div class="title">
      <div>承运公司：{{ logisticsInfo.companyName }}</div>
      <div style="margin-top: 10px;">物流单号：{{ logisticsInfo.number }}</div>
    </div>
    <el-timeline>
      <el-timeline-item v-for="item in logisticsInfo.list" :key="item.time" :timestamp="item.time">
        {{ item.content }}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import $api from '@/api'

export default defineComponent({
  name: "LogisticsInfo",
  props: {
    // 物流单号
    number: {
      type: [String, Number],
      required: true
    },
    // 物流公司代码
    code: {
      type: [String, Number],
      required: true
    },
    // 收货人手机号
    phone: {
      type: [String, Number],
      required: true
    }
  },
  setup(props) {
    const logisticsInfo = ref({})
    const getLogisticsInfo = async () => {
      logisticsInfo.value = await $api.commonApi.getLogisticsInfo(props)
    }
    getLogisticsInfo()

    return {
      logisticsInfo
    }
  }
})
</script>

<style scoped lang="scss">
.logistics-info {
  .title {
    margin-bottom: 40px;
  }
}
</style>