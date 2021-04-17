<template>
  <div style="height: 100%;display: flex;justify-content: space-between;">
    <page-list v-model="pageIndex"></page-list>
    <page-preview :page-index="pageIndex" v-model:module-index="moduleIndex"></page-preview>
    <page-setting :page-index="pageIndex" :module-index="moduleIndex"></page-setting>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
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

    return {
      pageIndex,
      moduleIndex
    }
  }
})
</script>

<style scoped lang="scss">

</style>