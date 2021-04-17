<template>
  <el-form size="small">
    <el-form-item label="设置方式">
      <el-radio v-model="formData.type" :label="1">固定logo</el-radio>
      <el-radio v-model="formData.type" :label="2">自动获取</el-radio>
    </el-form-item>
  </el-form>
</template>

<script>
import {defineComponent, ref} from 'vue'

export default defineComponent({
  name: "LogoSetting",
  setup() {
    const formData = ref({
      type: 1,
      logoUrl: ''
    })

    return {
      formData
    }
  }
})
</script>

<style scoped lang="scss">

</style>