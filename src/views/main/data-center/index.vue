<template>
  <div>
    <column-statistics :data="overviewData.classified_statistic"></column-statistics>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import ColumnStatistics from "./components/ColumnStatistics";
import $api from "@/api";

export default defineComponent({
  name: "DataCenter",
  components: {
    ColumnStatistics
  },
  setup() {
    const overviewData = ref({})
    const getOverviewData = async () => {
      overviewData.value = await $api.commonApi.getOverviewData()
    }
    getOverviewData()
    // const myChart = echarts.init(document.getElementById('test'));
    //
    // // 指定图表的配置项和数据
    // const option = {
    //   title: {
    //     text: 'ECharts 入门示例'
    //   },
    //   tooltip: {},
    //   legend: {
    //     data: ['销量']
    //   },
    //   xAxis: {
    //     data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    //   },
    //   yAxis: {},
    //   series: [{
    //     name: '销量',
    //     type: 'bar',
    //     data: [5, 20, 36, 10, 10, 20]
    //   }]
    // };
    //
    // // 使用刚指定的配置项和数据显示图表。
    // myChart.setOption(option);
    return {
      overviewData,
      getOverviewData
    }
  }
})
</script>

<style scoped lang="scss">

</style>