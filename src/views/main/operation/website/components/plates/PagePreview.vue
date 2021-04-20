<template>
  <div class="preview">
    <div class="header">
      <h3>编辑页面：</h3>
      <span class="tips">下图仅供展示页面模块信息，实际效果根据配置的数据可能不同</span>
    </div>
    <div class="preview-img-wrapper">
      <div class="preview-img home-page" v-show="pageIndex === 0">
        <img src="/images/operation/website/static_top.jpg" alt="" class="static_top">
        <img src="/images/operation/website/logo.png" alt="" class="selectable position logo"
             :class="{selected: moduleIndex === 0}" title="logo"
             @click="$emit('update:moduleIndex', 0)">
        <img src="/images/operation/website/classify.png" alt="" class="selectable position classify"
             :class="{selected: moduleIndex === 1}" title="分类导航"
             @click="$emit('update:moduleIndex', 1)">
        <img src="/images/operation/website/banner.png" alt="" class="selectable position banner"
             :class="{selected: moduleIndex === 2}" title="轮播图"
             @click="$emit('update:moduleIndex', 2)">
        <div class="rearrange-area">
          <img src="/images/operation/website/floor_1.jpg" alt="" class="selectable floor_item"
               :class="{selected: moduleIndex === 3}" title="发现好货"
               @click="$emit('update:moduleIndex', 3)">
          <img src="/images/operation/website/floor_2.jpg" alt="" class="selectable floor_item"
               :class="{selected: moduleIndex === 4}" title="特色好货"
               @click="$emit('update:moduleIndex', 4)">
          <img src="/images/operation/website/floor_3.jpg" alt="" class="selectable floor_item"
               :class="{selected: moduleIndex === 5}" title="楼层（风格一）"
               @click="$emit('update:moduleIndex', 5)">
          <img src="/images/operation/website/floor_4.jpg" alt="" class="selectable floor_item"
               :class="{selected: moduleIndex === 6}" title="楼层（风格二）"
               @click="$emit('update:moduleIndex', 6)">
        </div>
        <img src="/images/operation/website/floor_5.jpg" alt="" class="selectable floor_item"
             :class="{selected: moduleIndex === 7}" title="为您推荐"
             @click="$emit('update:moduleIndex', 7)">
        <img src="/images/operation/website/footer.png" alt="" class="footer">
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
    transform: scale(0.98);
    border-color: #F9612E;
  }
  50% {
    transform: scale(1);
    border-color: #FFFFFF;
  }
  100% {
    transform: scale(0.98);
    border-color: #F9612E;
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

  .header {
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    .tips {
      font-size: 12px;
      color: #999999;
    }
  }

  .preview-img-wrapper {
    height: calc(100% - 36px);
    font-size: 0;
    border: 1px solid #EEEEEE;
    border-radius: 4px;
    overflow-y: auto;

    .preview-img {
      position: relative;

      .position {
        position: absolute;
        z-index: 1;
        background-color: rgba(255, 255, 255, 0.4);
      }

      .selectable {
        border: 1px dashed #CCCCCC;
        cursor: pointer;

        &:hover {
          border-color: #F9612E;
          background-color: rgba(255, 255, 255, 0.3);
        }

        &.selected {
          border-width: 2px;
          animation: selected-flicker 1s infinite;
        }
      }
    }

    .home-page {
      .static_top, .floor_item, .footer {
        display: block;
        width: 100%;
      }

      .logo {
        top: 0;
        left: 17.2%;
        width: 16.1%;
      }

      .classify {
        top: 3.4%;
        left: 18.5%;
        z-index: 2;
        width: 14.9%;
      }

      .banner {
        top: 5.2%;
        left: 0;
        width: 100%;
      }
    }
  }
}
</style>