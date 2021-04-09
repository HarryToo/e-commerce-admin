<template>
  <div class="date-screen">
    <el-radio-group v-model="screen" fill="#0BB976" size="small">
      <el-radio-button v-for="(item, index) in screenOptions" :key="item.name" :label="index">
        {{ item.name }}
      </el-radio-button>
    </el-radio-group>
    <el-date-picker v-model="dateInterval" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"
                    size="small" style="width: 240px;margin-left: 10px;">
    </el-date-picker>
  </div>
</template>

<script>
import {defineComponent, ref, watch} from 'vue'
import moment from "moment"

moment.locale('zh-cn')

export default defineComponent({
  name: "DateScreen",
  emits: [
    'dateChange'
  ],
  setup(props, context) {
    const screenOptions = [
      {
        name: '今日',
        value: [
          moment().startOf('day').toDate(),
          moment().startOf('day').toDate()
        ]
      },
      {
        name: '昨日',
        value: [
          moment().startOf('day').subtract(1, 'days').toDate(),
          moment().startOf('day').subtract(1, 'days').toDate()
        ]
      },
      {
        name: '最近7日',
        value: [
          moment().startOf('day').subtract(6, 'days').toDate(),
          moment().startOf('day').toDate()
        ]
      }
    ]
    const screen = ref(0)
    const dateInterval = ref(screenOptions[0].value)

    watch(screen, (index) => {
      if (index >= 0) {
        dateInterval.value = screenOptions[index].value
      }
    })
    watch(dateInterval, (val, oldVal) => {
      if (val.toString() !== oldVal.toString()) {
        context.emit('dateChange', {
          startDate: val[0],
          endDate: val[1]
        })
        screen.value = screenOptions.findIndex((item) => item.value.toString() === val.toString())
      }
    })

    return {
      screenOptions,
      screen,
      dateInterval
    }
  }
})
</script>

<style scoped lang="scss">
.date-screen {
  display: flex;
  align-items: center;

  ::v-deep .el-radio-button__inner:hover {
    color: #0BB976;
  }
}
</style>