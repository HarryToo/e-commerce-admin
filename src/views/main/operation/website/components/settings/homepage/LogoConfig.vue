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
import {defineComponent, ref, watch} from 'vue'
import {useStore} from 'vuex'
import FileUpload from '@/components/common/FileUpload'

export default defineComponent({
  name: "LogoContentConfig",
  components: {
    FileUpload
  },
  setup() {
    const store = useStore()
    const formData = ref({
      type: 1,
      logoUrl: ''
    })
    if (store.state.decoration.massWebsite.homePage.logo) {
      formData.value.logoUrl = store.state.decoration.massWebsite.homePage.logo
    } else {
      formData.value.type = 2
    }

    watch(formData, (data) => {
      const logo = data.type === 1 ? data.logoUrl : ''
      store.commit('decoration/massWebsite/saveLogoConfig', logo)
    }, {deep: true})

    return {
      formData
    }
  }
})
</script>

<style scoped lang="scss">
</style>