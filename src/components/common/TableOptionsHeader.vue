<template>
  <div class="table-options-header">
    <div class="left">
      <slot></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
      <el-button size="small" type="primary" @click="$router.back" v-if="back">返回</el-button>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import {useRoute} from 'vue-router'

export default defineComponent({
  name: "TableOptionsHeader",
  props: {
    back: {
      type: Boolean,
      default() {
        const route = useRoute()
        return route.path.match(/\//g).length > 3
      }
    }
  }
})
</script>

<style scoped lang="scss">
.table-options-header {
  height: 80px;
  padding: 0 25px;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #EEEEEE;
  overflow: auto hidden;

  & > div {
    flex-shrink: 0;
  }
}
</style>