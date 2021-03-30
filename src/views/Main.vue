<template>
  <el-container style="height: 100%;">
    <el-header height="54px">
      <header-bar></header-bar>
    </el-header>
    <el-container>
      <el-aside width="240px">
        <side-menu-bar></side-menu-bar>
      </el-aside>
      <el-main>
        <transition name="el-fade-in-linear" mode="out-in">
          <breadcrumb-nav v-if="/^\/main\/.+\/.+$/.test($route.path)"></breadcrumb-nav>
        </transition>
        <div class="main-cont" :class="{'block-view': !$route.meta.noBackground}">
          <router-view v-slot="{ Component }">
            <transition name="el-fade-in-linear" mode="out-in">
              <keep-alive>
                <component :is="Component"/>
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {defineComponent} from 'vue'
import HeaderBar from "./main/components/HeaderBar"
import SideMenuBar from "./main/components/SideMenuBar"
import BreadcrumbNav from "./main/components/BreadcrumbNav"

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
      flex-grow: 1;
    }
  }
}
</style>
