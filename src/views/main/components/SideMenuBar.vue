<template>
  <el-menu :uniqueOpened="true" :default-active="activePath" background-color="#0D0D0D" text-color="#EEEEEE"
           active-text-color="#EEEEEE" router>
    <template v-for="menu in sideMenus" :key="menu.href">
      <el-submenu v-if="menu.children" :index="menu.href">
        <template #title>
          <i class="el-icon-location"></i>
          <span>{{ menu.title }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="subMenu in menu.children" :key="subMenu.href" :index="subMenu.href">
            {{ subMenu.title }}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item v-else :index="menu.href">
        <i class="el-icon-document"></i>
        <template #title>{{ menu.title }}</template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import {defineComponent, computed} from 'vue'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'

export default defineComponent({
  name: "SideMenuBar",
  setup() {
    const route = useRoute()
    const store = useStore()

    return {
      sideMenus: computed(() => store.getters['permission/sideMenus']),
      activePath: computed(() => route.path.replace(/^(\/main\/.*\/.*)\/.*$/, '$1'))
    }
  }
})
</script>

<style scoped lang="scss">
.el-menu {
  border-right: none;

  .el-menu-item-group {
    ::v-deep .el-menu-item-group__title {
      display: none;
    }

    .el-menu-item {
      border-bottom: 1px solid #0D0D0D;
      background-color: #333333 !important;

      &:last-child {
        border-bottom: none;
      }
    }
  }

  .el-menu-item {
    &.is-active {
      background-color: #F9612E !important;
    }
  }
}
</style>