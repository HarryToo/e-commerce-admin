<template>
  <div style="height: 100%;display: flex;justify-content: space-between;">
    <page-list v-model="pageIndex"></page-list>
    <page-preview v-model="moduleIndex" v-model:floorIndex="floorIndex"></page-preview>
    <page-setting></page-setting>
  </div>
</template>

<script>
import {defineComponent, ref, provide} from 'vue'
import PageList from './components/views/PageList'
import PagePreview from './components/views/PagePreview'
import PageSetting from './components/views/PageSetting'

export default defineComponent({
  name: "OrganizationWebsite",
  components: {
    PageList,
    PagePreview,
    PageSetting
  },
  setup() {
    // 选中的页面序号
    const pageIndex = ref(0)
    // 页面上选中的模块（0:logo,1:分类,2:banner,3:可活动楼层区域,4:推荐商品列表）
    const moduleIndex = ref(0)
    // 可活动楼层板块序号
    const floorIndex = ref(0)

    provide('pageIndex', pageIndex)
    provide('moduleIndex', moduleIndex)
    provide('floorIndex', floorIndex)

    return {
      pageIndex,
      moduleIndex,
      floorIndex
    }
  }
})
</script>

<style scoped lang="scss">

</style>