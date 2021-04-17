<template>
  <div class="preview">
    <div class="header">
      <h3>编辑页面：</h3>
      <span class="tips">下图仅供展示页面模块信息，实际效果根据配置的样式和数据可能不同</span>
    </div>
    <div class="img-wrapper">
      <div class="home-page" v-show="pageIndex === 0">
        <el-image src="/images/operation/website/home_page.jpg" fit="contain"></el-image>
        <div class="select-area logo" :class="{selected: moduleIndex === 0}" title="LOGO"
             @click="$emit('update:moduleIndex', 0)"></div>
        <div class="select-area classify" :class="{selected: moduleIndex === 1}" title="分类导航"
             @click="$emit('update:moduleIndex', 1)"></div>
        <div class="select-area banner" :class="{selected: moduleIndex === 2}" title="轮播图"
             @click="$emit('update:moduleIndex', 2)"></div>
        <div class="select-area floor" :class="{selected: moduleIndex === 3}" title="楼层区域"
             @click="$emit('update:moduleIndex', 3)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "PagePreview",
  props: {
    // 选中的页面序号
    pageIndex: {
      type: Number,
      default: 0
    },
    // 页面上选中的模块
    moduleIndex: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:moduleIndex'],
  setup() {

  }
})
</script>

<style>
/*选中框闪烁*/
@keyframes selected-flicker {
  0% {
    border-color: #F9612E;
    background-color: rgba(249, 97, 46, 0.3);
  }
  50% {
    border-color: #FFFFFF;
    background-color: rgba(249, 97, 46, 0);
  }
  100% {
    border-color: #F9612E;
    background-color: rgba(249, 97, 46, 0.3);
  }
}
</style>
<style scoped lang="scss">
.preview {
  width: calc((100% - 20px) * 0.5);
  height: 100%;
  margin-right: 10px;
  padding: 16px 20px 20px;
  background-color: #FFFFFF;
  border-radius: 4px;
  overflow-y: auto;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    .tips {
      font-size: 12px;
      color: #999999;
    }
  }

  .img-wrapper {
    position: relative;
    font-size: 0;
    border: 1px solid #EEEEEE;
    border-radius: 4px;
    overflow: hidden;

    .select-area {
      position: absolute;
      border: 1px dashed #CCCCCC;
      cursor: pointer;
      z-index: 1;

      &:hover {
        z-index: 3;
        border-color: #F9612E;
        background-color: rgba(255, 255, 255, 0.3);
      }

      &.selected {
        z-index: 2;
        border-width: 2px;
        animation: selected-flicker 1s infinite;
      }

      &.logo {
        top: 0.38%;
        left: 18%;
        width: 15.8%;
        height: 1.7%;
      }

      &.classify {
        top: 2.2%;
        left: 18%;
        width: 15%;
        height: 10%;
      }

      &.banner {
        top: 3.16%;
        left: 0%;
        width: 100%;
        height: 8.95%;
      }

      &.floor {
        top: 12.3%;
        left: 18%;
        width: 64.1%;
        height: 85.2%;
      }
    }
  }
}
</style>