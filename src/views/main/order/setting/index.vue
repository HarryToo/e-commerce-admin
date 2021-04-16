<template>
  <div class="set-meal-wrapper">
    <el-tabs type="border-card" model-value="1">
      <el-tab-pane label="常规设置">
        <div class="tab-column-cont">
          <general></general>
        </div>
      </el-tab-pane>
      <el-tab-pane label="退换货原因设置">
        <div class="tab-column-cont">
          <reason></reason>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import General from './components/General'
import Reason from './components/Reason'

export default defineComponent({
  name: "OrderSetting",
  components: {
    General,
    Reason
  }
})
</script>

<style scoped lang="scss">
.set-meal-wrapper {
  height: 100%;
  border-radius: 4px;
  overflow: hidden;

  ::v-deep .el-tabs--border-card {
    border: none;
    box-shadow: none;

    .el-tabs__header {
      background-color: #EEEEEE;
      border: none;

      .el-tabs__item {
        border: none;
        border-top: 2px solid transparent;

        &:hover {
          color: #F9612E;
        }

        &.is-active {
          color: #F9612E;
          border-color: #F9612E;
        }
      }
    }

    .el-tabs__content {
      padding: 0;
    }
  }
}
</style>