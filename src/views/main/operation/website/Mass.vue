<template>
  <div style="height: 100%;display: flex;justify-content: space-between;">
    <page-list v-model="pageIndex"></page-list>
    <page-preview v-model="moduleIndex"></page-preview>
    <page-setting></page-setting>
  </div>
</template>

<script>
import {defineComponent, ref, provide, watch} from 'vue'
import PageList from './components/plates/PageList'
import PagePreview from './components/plates/PagePreview'
import PageSetting from './components/plates/PageSetting'

export default defineComponent({
  name: "Mass",
  components: {
    PageList,
    PagePreview,
    PageSetting
  },
  setup() {
    // 选中的页面序号
    const pageIndex = ref(0)
    // 页面上选中的模块
    const moduleIndex = ref(0)

    provide('pageIndex', pageIndex)
    provide('moduleIndex', moduleIndex)

    watch(pageIndex, (index) => {
      moduleIndex.value = 0
    })

    return {
      pageIndex,
      moduleIndex
    }
  }
})
</script>

<style scoped lang="scss">

</style>