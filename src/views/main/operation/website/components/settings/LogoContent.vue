<template>
  <el-form size="small">
    <el-form-item label="设置方式">
      <el-radio v-model="formData.type" :label="1">固定logo</el-radio>
      <el-radio v-model="formData.type" :label="2">自动获取</el-radio>
    </el-form-item>
    <el-form-item label="上传logo" v-show="formData.type === 1">
      <file-upload v-model="formData.logoUrl"></file-upload>
    </el-form-item>
  </el-form>
</template>

<script>
import {defineComponent, ref} from 'vue'
import FileUpload from '@/components/common/FileUpload'

export default defineComponent({
  name: "LogoContentSetting",
  components: {
    FileUpload
  },
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