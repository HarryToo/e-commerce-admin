<template>
  <router-view v-slot="{ Component }">
    <transition name="el-fade-in-linear" mode="out-in">
      <keep-alive>
        <component :is="Component"/>
      </keep-alive>
    </transition>
  </router-view>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style lang="scss">
$orange: #F9612E;
$activeOrange: #F13B02;

*:not([class^=el-]), body.el-popup-parent--hidden {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-size: 14px;
  color: #333333;
  overflow: hidden;

  #app {
    width: 100vw;
    height: 100vh;
    background-color: #F5F5F5;

    //圆角白底
    .block-view {
      background-color: #FFFFFF;
      border-radius: 4px;
    }
  }
}

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

/*定义滚动条轨道*/
::-webkit-scrollbar-track {
}

/*定义滑块*/
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(249, 97, 46, 0.15);

  &:hover {
    background-color: rgba(249, 97, 46, 0.4);
  }
}

.text-cut-1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.text-cut-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.text-cut-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

h3 {
  margin-bottom: 15px !important;
  font-size: 16px;
  color: #101010;
}

// 自定义按钮颜色
.el-button.custom, .el-button.custom.is-disabled, .el-button.custom:focus {
  color: #FFFFFF;
  background-color: $orange;
  border: none;

  &:hover {
    color: #FFFFFF;
    background-color: $orange;
    opacity: 0.8;
  }

  &:active {
    color: #FFFFFF;
    background-color: $activeOrange;
  }

  &.is-disabled {
    opacity: 0.4;

    &:active {
      background-color: $orange;
    }
  }
}

// 自定义表格操作菜单文字颜色
.el-table .el-button--text, .el-table .el-button--text:focus {
  color: $orange;

  &:hover {
    color: $orange;
    opacity: 0.8;
  }

  &:active {
    color: $activeOrange;
  }
}

// 表格分页器居右
.el-pagination {
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
}

//自定义dialog样式
.el-dialog.custom {
  border-radius: 8px;

  .el-dialog__header {
    padding: 10px 20px;
    border-radius: 8px 8px 0 0;
    background-color: #EEEEEE;

    .el-dialog__title {
      font-size: 14px;
      color: #101010;
    }

    .el-dialog__headerbtn {
      top: 14px;
      font-size: 18px;
      color: #101010;
    }
  }
}
</style>
