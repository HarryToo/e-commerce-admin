<template>
  <div class="order-statistics">
    <div class="top-row">
      <div class="title">订单统计</div>
      <date-screen @date-change="dateChange"></date-screen>
    </div>
    <div id="order-statistics-chart"></div>
  </div>
</template>

<script>
import {defineComponent, ref, onMounted, watch} from 'vue'
import DateScreen from "./DateScreen"
import * as echarts from 'echarts'
import $api from "@/api"
import moment from "moment"

moment.locale('zh-cn')

export default defineComponent({
  name: "OrderStatistics",
  components: {
    DateScreen
  },
  setup() {
    let chart
    const statisticsData = ref({})

    const updateChart = (data) => {
      if (!chart) {
        return
      }
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          right: 0,
          icon: 'circle',
          itemWidth: 6,
          itemHeight: 6,
          textStyle: {
            fontSize: 14,
            color: '#555555'
          },
          data: ['正常订单', '售后订单']
        },
        grid: {
          top: 34,
          left: 0,
          right: 30,
          bottom: 0,
          containLabel: true
        },
        xAxis: {
          type: 'time',
          boundaryGap: ['2%', '2%'],
          axisLine: {
            lineStyle: {
              color: '#CCCCCC'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            margin: 12,
            fontStyle: 'italic',
            color: '#7B7B7B'
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          axisLabel: {
            color: '#7B7B7B'
          }
        },
        series: [
          {
            name: '正常订单',
            type: 'line',
            data: data.normal,
            // data: [['2021/3/30 0:00', 1], ['2021/3/30 4:00', 2], ['2021/3/30 8:00', 4], ['2021/3/30 12:00', 2], ['2021/3/30 16:00', 3], ['2021/3/30 20:00', 4], ['2021/3/30 24:00', 3]],
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              color: '#34C758'
            },
            lineStyle: {
              width: 1
            }
          },
          {
            name: '售后订单',
            type: 'line',
            data: data.afterSale,
            // data: [['2021/3/30 0:00', 0], ['2021/3/30 4:00', 1], ['2021/3/30 8:00', 3], ['2021/3/30 12:00', 3], ['2021/3/30 16:00', 2], ['2021/3/30 20:00', 3], ['2021/3/30 24:00', 4]],
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              color: '#FF9502'
            },
            lineStyle: {
              width: 1
            }
          }
        ]
      }
      chart.setOption(option)
    }

    const getStatisticsChartData = async (dateInterval) => {
      statisticsData.value = await $api.orderApi.getStatisticsChartData(dateInterval)
    }

    const dateChange = (dateInterval) => {
      getStatisticsChartData(dateInterval)
    }

    onMounted(() => {
      chart = echarts.init(document.getElementById('order-statistics-chart'))
      getStatisticsChartData({
        startDate: moment().startOf('day').toDate(),
        endDate: moment().startOf('day').toDate()
      })
    })

    watch(statisticsData, (data) => {
      updateChart(data)
    })

    return {
      dateChange
    }
  }
})
</script>

<style scoped lang="scss">
.order-statistics {
  height: 100%;
  display: flex;
  flex-direction: column;

  .top-row {
    padding-bottom: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #EEEEEE;

    .title {
      line-height: 1;
      font-weight: bold;
      font-size: 15px;
      color: #101010;
    }
  }

  #order-statistics-chart {
    margin-top: 8px;
    flex-grow: 1;
  }
}
</style>