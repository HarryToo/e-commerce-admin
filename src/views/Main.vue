<template>
  <el-container style="height: 100%;">
    <el-header height="55px">
      <header-bar></header-bar>
    </el-header>
    <el-container>
      <el-aside width="240px">
        <side-menu-bar></side-menu-bar>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {defineComponent} from 'vue'
import HeaderBar from "@/components/view-part/HeaderBar";
import SideMenuBar from "@/components/view-part/SideMenuBar";

export default defineComponent({
  name: 'Main',
  components: {
    HeaderBar,
    SideMenuBar
  }
})
</script>

<style scoped lang="scss">
.el-container {
  overflow-y: auto;

  .el-header {
    padding: 0 20px;
    background-color: #FFFFFF;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.08);
  }

  .el-aside {
    height: 100%;
    background-color: #0D0D0D;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none
    }
  }
}
</style>
