<template>
  <div class="order-proportion">
    <div class="top-row">
      <div class="title">订单比例</div>
    </div>
    <div id="order-proportion-chart"></div>
  </div>
</template>

<script>
import {defineComponent, ref, onMounted, watch} from 'vue'
import $api from '@/api'
import * as echarts from "echarts";

export default defineComponent({
  name: "OrderProportion",
  setup() {
    let chart
    const proportionData = ref({})

    const updateChart = (data) => {
      if (!chart) {
        return
      }
      const option = {
        title: {
          text: '总订单',
          subtext: (data.normal + data.back + data.exchange).toString(),
          textAlign: 'center',
          left: '21%',
          top: '38%',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 15,
            color: '#AEAEB2'
          },
          subtextStyle: {
            fontSize: 19,
            color: '#101010'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          right: 0,
          top: 'middle',
          icon: 'circle',
          itemWidth: 9,
          itemHeight: 9,
          itemGap: 16,
          textStyle: {
            fontSize: 14,
            color: '#555555'
          },
          orient: 'vertical',
          formatter(name) {
            let data = option.series[0].data;
            let total = 0;
            let tarValue;
            for (let i = 0; i < data.length; i++) {
              total += data[i].value;
              if (data[i].name === name) {
                tarValue = data[i].value;
              }
            }
            let v = tarValue;
            let p = Math.round(((tarValue / total) * 100));
            return `${name}：${p}% （${v}单）`;
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '60%'],
            center: ['20%', '50%'],
            left: '3%',
            top: 'middle',
            width: '100%',
            height: '100%',
            label: {
              show: false
            },
            data: [
              {
                value: data.normal,
                name: '正常订单',
                itemStyle: {
                  color: '#1890FF'
                }
              },
              {
                value: data.back,
                name: '退货订单',
                itemStyle: {
                  color: '#FF2D55'
                }
              },
              {
                value: data.exchange,
                name: '换货订单',
                itemStyle: {
                  color: '#DEDEDE'
                }
              }
            ]
          }
        ]
      }
      chart.setOption(option)
    }

    const getProportionChartData = async () => {
      proportionData.value = await $api.orderApi.getProportionChartData()
    }

    onMounted(() => {
      chart = echarts.init(document.getElementById('order-proportion-chart'))
      getProportionChartData()
    })

    watch(proportionData, (data) => {
      updateChart(data)
    })

    return {
      proportionData
    }
  }
})
</script>

<style scoped lang="scss">
.order-proportion {
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

  #order-proportion-chart {
    flex-grow: 1;
  }
}
</style>