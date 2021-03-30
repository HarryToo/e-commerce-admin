<template>
  <div class="customer-statistics">
    <div class="top-row">
      <div class="title">用户统计</div>
      <date-screen @date-change="dateChange"></date-screen>
    </div>
    <div id="customer-statistics-chart"></div>
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
  name: "CustomerStatistics",
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
          data: ['正式学员', '试用学员']
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
          boundaryGap: ['1%', '1%'],
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
            name: '正式学员',
            type: 'bar',
            data: data.official,
            // data: [['2021/3/30 0:00', 1], ['2021/3/30 4:00', 2], ['2021/3/30 8:00', 4], ['2021/3/30 12:00', 2], ['2021/3/30 16:00', 3], ['2021/3/30 20:00', 4], ['2021/3/30 24:00', 3]],
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              color: '#34C758'
            },
            barMaxWidth: 30
          },
          {
            name: '试用学员',
            type: 'bar',
            data: data.trial,
            // data: [['2021/3/30 0:00', 0], ['2021/3/30 4:00', 1], ['2021/3/30 8:00', 3], ['2021/3/30 12:00', 3], ['2021/3/30 16:00', 2], ['2021/3/30 20:00', 3], ['2021/3/30 24:00', 4]],
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              color: '#FF9502'
            },
            barMaxWidth: 30
          }
        ]
      }
      chart.setOption(option)
    }

    const getStatisticsChartData = async (dateInterval) => {
      statisticsData.value = await $api.customerApi.getStatisticsChartData(dateInterval)
    }

    const dateChange = (dateInterval) => {
      getStatisticsChartData(dateInterval)
    }

    onMounted(() => {
      chart = echarts.init(document.getElementById('customer-statistics-chart'))
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
.customer-statistics {
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

  #customer-statistics-chart {
    margin-top: 8px;
    flex-grow: 1;
  }
}
</style>