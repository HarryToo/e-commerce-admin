<template>
  <div class="column-statistics">
    <div class="column">
      <img src="/favicon.ico" alt="预警商品数" class="icon">
      <div class="cont">
        <div class="name text-cut-1">预警商品数</div>
        <div class="value text-cut-1">{{ numberFormat(overviewData.warning_goods_num) }}件</div>
      </div>
    </div>
    <div class="column">
      <img src="/favicon.ico" alt="平台总上架商品数" class="icon">
      <div class="cont">
        <div class="name text-cut-1">平台总上架商品数</div>
        <div class="value text-cut-1">{{ numberFormat(overviewData.sale_goods_num) }}件</div>
      </div>
    </div>
    <div class="column">
      <img src="/favicon.ico" alt="总订单数" class="icon">
      <div class="cont">
        <div class="name text-cut-1">总订单数</div>
        <div class="value text-cut-1">{{ numberFormat(overviewData.order_num) }}单</div>
      </div>
    </div>
    <div class="column">
      <img src="/favicon.ico" alt="总机构数" class="icon">
      <div class="cont">
        <div class="name text-cut-1">总机构数</div>
        <div class="value text-cut-1">{{ numberFormat(overviewData.organization_num) }}个</div>
      </div>
    </div>
    <div class="column">
      <img src="/favicon.ico" alt="总正式学员数" class="icon">
      <div class="cont">
        <div class="name text-cut-1">总正式学员数</div>
        <div class="value text-cut-1">{{ numberFormat(overviewData.student_num) }}个</div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import $api from "@/api"

export default defineComponent({
  name: "ColumnStatistics",
  setup() {
    const overviewData = ref({})

    // 数值逗号分隔
    const numberFormat = (num) => {
      if (!num) {
        return ''
      }
      const arr = num.toString().split('').reverse()
      let result = []
      for (let i = 0; i < arr.length; i++) {
        result.push(arr[i])
        if ((i + 1) % 3 === 0 && i !== arr.length - 1) {
          result.push(',')
        }
      }
      return result.reverse().join('')
    }

    const getOverviewData = async () => {
      overviewData.value = await $api.commonApi.getOverviewData()
    }
    getOverviewData()

    return {
      numberFormat,
      overviewData
    }
  }
})
</script>

<style scoped lang="scss">
.column-statistics {
  width: 100%;
  display: flex;
  align-items: center;

  .column {
    width: 20%;
    padding: 0 40px;
    display: flex;
    border-right: 1px solid #CCCCCC;

    &:last-child {
      border-right: none;
    }

    .icon {
      width: 50px;
      height: 50px;
      flex-shrink: 0;
    }

    .cont {
      height: 50px;
      margin-left: 24px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;

      .name {
        flex-shrink: 0;
        line-height: 1;
        font-size: 18px;
        color: #AEAEB2;
      }

      .value {
        flex-shrink: 0;
        line-height: 1;
        font-weight: bold;
        font-size: 20px;
        color: #101010;
      }
    }
  }
}
</style>