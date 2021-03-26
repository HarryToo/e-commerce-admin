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
        <template v-if="/^\/main\/.+\/.+$/.test($route.path)">
          <breadcrumb-nav></breadcrumb-nav>
          <div class="main-cont">
            <router-view></router-view>
          </div>
        </template>
        <router-view v-else></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {defineComponent} from 'vue'
import HeaderBar from "@/components/view-part/HeaderBar";
import SideMenuBar from "@/components/view-part/SideMenuBar";
import BreadcrumbNav from "@/components/view-part/BreadcrumbNav";

export default defineComponent({
  name: 'Main',
  components: {
    HeaderBar,
    SideMenuBar,
    BreadcrumbNav
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

  .el-main {
    display: flex;
    flex-direction: column;

    .main-cont {
      margin-top: 10px;
      flex-grow: 1;
      padding: 30px;
      background-color: #FFFFFF;
      border-radius: 4px;
    }
  }
}
</style>
