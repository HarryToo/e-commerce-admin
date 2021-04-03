<template>
  <router-view v-slot="{ Component }">
    <transition name="el-fade-in-linear" mode="out-in">
      <component :is="Component"/>
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
$activeOrange: #FF3E00;

*:not([class^=el-]), body.el-popup-parent--hidden {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-size: 14px;
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
.el-button.custom, .el-button.custom:focus {
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
