<template>
  <el-upload :action="$uploadAction" class="upload-btn" :show-file-list="false" :on-success="uploadSuccess">
    <el-image v-if="modelValue" :src="modelValue" lazy fit="contain" class="image"></el-image>
    <div class="placeholder" v-else>
      <i class="el-icon-plus upload-icon"></i>
      <span>上传</span>
    </div>
  </el-upload>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "FileUpload",
  props: {
    modelValue: String
  },
  emits: ['update:modelValue', 'success'],
  setup(props, {emit}) {
    const uploadSuccess = function ({code, url}, file, fileList) {
      if (code === 200) {
        console.log('图片上传返回：\n' + url)
        emit('update:modelValue', url)
        emit('success', ...arguments)
      } else {
        console.log('图片上传失败')
      }
    }

    return {
      uploadSuccess
    }
  }
})
</script>

<style scoped lang="scss">
.upload-btn {
  width: 100px;
  height: 100px;
  border: 1px solid #EEEEEE;
  border-radius: 4px;
  overflow: hidden;

  .image {
    width: 100px;
    height: 100px;
  }

  .placeholder {
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 14px;
    color: #999999;
    background-color: #F8F8F8;

    i {
      font-size: 24px;
    }
  }
}
</style>