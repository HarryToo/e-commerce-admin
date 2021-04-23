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
          <breadcrumb-nav v-if="!$route.meta.noNav"></breadcrumb-nav>
        </transition>
        <div class="main-area" :class="{'block-view': !$route.meta.noBg}">
          <router-view v-slot="{ Component }">
            <transition name="el-fade-in-linear" mode="out-in">
              <keep-alive :exclude="excludeCacheComponents">
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
import {useRouter} from 'vue-router'
import HeaderBar from "./main/components/HeaderBar"
import SideMenuBar from "./main/components/SideMenuBar"
import BreadcrumbNav from "./main/components/BreadcrumbNav"

export default defineComponent({
  name: 'Main',
  components: {
    HeaderBar,
    SideMenuBar,
    BreadcrumbNav
  },
  setup() {
    const allRoutes = useRouter().getRoutes()

    // keep-alive排除对业务层面第三级及以上路由的缓存(/main/xx/xx/xx...)
    const noKeepAliveRoutes = allRoutes.filter((route) => {
      return route.path.match(/\//g).length > 3
    })
    const excludeCacheComponents = noKeepAliveRoutes.map((route) => {
      return route.components.default.name
    })

    return {
      excludeCacheComponents
    }
  }
})
</script>

<style scoped lang="scss">
.el-container {
  overflow-y: auto;

  .el-header {
    padding: 0 20px;
    background-color: #FFFFFF;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
    z-index: 999;
  }

  .el-aside {
    height: 100%;
    background-color: #0D0D0D;
    overflow-y: auto;
    user-select: none;

    &::-webkit-scrollbar {
      display: none
    }
  }

  .el-main {
    display: flex;
    flex-direction: column;

    .main-area {
      flex-grow: 1;
      overflow-y: hidden;
    }

    ::v-deep .el-loading-mask {
      z-index: 998;
    }
  }
}
</style>
