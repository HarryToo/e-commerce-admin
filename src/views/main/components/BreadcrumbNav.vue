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
      const pathSplitArr = route.fullPath.replace(basePath + '/', '').split('/')
      const list = []
      const queryReg = /\?.*$/
      pathSplitArr.forEach((levelPath) => {
        basePath += '/' + levelPath
        allRoutes.forEach((item) => {
          if (item.path === basePath.replace(queryReg, '')) {
            list.push(item)
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