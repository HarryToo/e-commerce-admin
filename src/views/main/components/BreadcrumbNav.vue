<template>
  <div class="breadcrumb-nav-wrapper block-view">
    <div class="breadcrumb-nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="route in historyList" :key="route.path">{{ route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
import {defineComponent, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'

export default defineComponent({
  name: "BreadcrumbNav",
  setup() {
    const route = useRoute()
    const allRoutes = useRouter().getRoutes()

    const historyList = computed(() => {
      let basePath = '/main'
      const pathSplitArr = route.path.replace(basePath + '/', '').split('/')
      const list = []
      pathSplitArr.forEach((levelPath) => {
        basePath += '/' + levelPath
        allRoutes.forEach((item) => {
          if (item.path === basePath) {
            list.push(item)
          } else if (/:.*$/.test(item.path) && !item.path.includes('/:pathMatch(.*)')) {
            // 动态路由匹配
            if (item.path.replace(/[^/]+(?!.*\/)/, '') === basePath.replace(/[^/]+(?!.*\/)/, '')) {
              list.push(item)
            }
          }
        })
      })
      return list
    })

    return {
      historyList
    }
  }
})
</script>

<style scoped lang="scss">
.breadcrumb-nav-wrapper {
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  padding: 0 10px;
  flex-shrink: 0;
  display: flex;
  align-items: center;

  .breadcrumb-nav {
    padding-left: 18px;
    border-left: 2px solid #F9612E;
  }
}
</style>