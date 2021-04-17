<template>
  <div style="height: 100%;">
    <div class="tabs-header">
      <div class="tabs-header-item" :class="{active: tabIndex === 0}" @click="tabIndex = 0">大众版</div>
      <div class="tabs-header-item" :class="{active: tabIndex === 1}" @click="tabIndex = 1">机构版</div>
    </div>
    <div class="tabs-content">
      <mass v-show="tabIndex === 0"></mass>
      <div class="tabs-content-item" v-show="tabIndex === 1">
        456789
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue'
import Mass from './Mass'

export default defineComponent({
  name: "WebSitDecoration",
  components: {
    Mass
  },
  setup() {
    const tabIndex = ref(0)

    return {
      tabIndex
    }
  }
})
</script>

<style scoped lang="scss">
.tabs-header {
  display: flex;
  border-radius: 4px;
  overflow: hidden;

  .tabs-header-item {
    width: 50%;
    height: 50px;
    text-align: center;
    line-height: 48px;
    cursor: pointer;
    background-color: #EEEEEE;
    border-top: 2px solid transparent;
    user-select: none;
    transition: 0.2s;

    &:hover {
      color: #F9612E;
    }

    &.active {
      color: #F9612E;
      border-color: #F9612E;
      background-color: #FFFFFF;
    }
  }
}

.tabs-content {
  height: calc(100% - 50px - 10px);
  margin-top: 10px;
}
</style>