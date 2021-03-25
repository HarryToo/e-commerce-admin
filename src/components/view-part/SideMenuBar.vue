<template>
  <el-menu
      :uniqueOpened="true"
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#0D0D0D"
      text-color="#FFFFFF"
      active-text-color="#FFFFFF">
    <el-submenu index="1">
      <template #title>
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item-group>
        <template #title>分组一</template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <template #title>选项4</template>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <template #title>导航二</template>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <i class="el-icon-document"></i>
      <template #title>导航三</template>
    </el-menu-item>
  </el-menu>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "SideMenuBar",
})
</script>

<style scoped lang="scss">
.el-menu {
  border-right: none;

  .el-menu-item {
    &.is-active {
      background-color: #F9612E !important;
    }
  }
}
</style>