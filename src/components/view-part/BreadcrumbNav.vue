<template>
  <div class="breadcrumb-nav-wrapper">
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
      let list = []
      route.matched.forEach((matchedItem) => {
        if (/^\/main\/.+\/.+$/.test(matchedItem.path)) {
          const parent = allRoutes.filter((item) => item.path === matchedItem.path.replace(/^(\/main\/.+)\/.+$/, '$1'))
          list = list.concat(parent)
          list.push(matchedItem)
        }
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
  height: 58px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  background-color: #FFFFFF;
  border-radius: 4px;

  .breadcrumb-nav {
    padding-left: 18px;
    border-left: 2px solid #F9612E;
  }
}
</style>