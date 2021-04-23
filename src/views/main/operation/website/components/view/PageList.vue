<template>
  <div class="page-list">
    <h3>选择页面：</h3>
    <el-button v-for="(item, index) in pages" :key="item" size="small" :class="{custom: index === modelValue}"
               :type="index === modelValue ? 'primary' : 'info'" @click="$emit('update:modelValue', index)">{{ item }}
    </el-button>
  </div>
</template>

<script>
import {defineComponent, ref, inject} from 'vue'

export default defineComponent({
  name: "PageList",
  props: {
    // 选中的页面编号
    modelValue: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:modelValue'],
  setup() {
    const pages = ref(['首页', '专场频道', '排行榜单'])

    return {
      pages
    }
  }
})
</script>

<style scoped lang="scss">
.page-list {
  width: calc((100% - 20px - 765px) * 0.3333);
  height: 100%;
  margin-right: 10px;
  padding: 16px 20px 20px;
  background-color: #FFFFFF;
  border-radius: 4px;
  overflow-y: auto;

  .el-button {
    display: block;
    width: 100%;
    margin-left: 0;
    margin-bottom: 20px;
  }
}
</style>