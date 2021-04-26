<template>
  <el-upload ref="uploadRef" :action="$uploadAction" list-type="picture" class="upload-btn" :limit="maxLength"
             :show-file-list="false" :before-upload="beforeUpload" :on-success="uploadSuccess">
    <div class="image-wrapper" v-if="modelValue">
      <el-image :src="modelValue" lazy fit="contain" class="image"></el-image>
      <i class="el-icon-delete" title="删除" @click.stop="delFile"></i>
    </div>
    <div class="placeholder" v-else>
      <i class="el-icon-plus upload-icon"></i>
      <span>上传</span>
    </div>
  </el-upload>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {ElMessage} from 'element-plus'

export default defineComponent({
  name: "FileUpload",
  props: {
    modelValue: String,
    maxLength: {
      type: Number,
      default: 1
    },
    imgSize: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue', 'success'],
  setup(props, {emit}) {
    const uploadRef = ref()

    // 尺寸不匹配警告
    const beforeUpload = function (file) {
      if (/^\d+\*\d+$/.test(props.imgSize)) {
        const [width, height] = props.imgSize.split('*')
        let img = new Image()
        img.src = URL.createObjectURL(file)
        img.onload = () => {
          if (Number(width) !== img.width || Number(height) !== img.height) {
            ElMessage.warning(`注意：当前图片尺寸为 ${img.width}*${img.height}，与建议尺寸不符`)
            img = null
          }
        }
      }
    }
    // 上传成功
    const uploadSuccess = function ({code, url}, file, fileList) {
      if (code === 200) {
        console.log('图片上传返回：\n' + url)
        emit('update:modelValue', url)
        emit('success', ...arguments)
      } else {
        console.log('图片上传失败')
      }
    }
    // 删除已有
    const delFile = function () {
      uploadRef.value.clearFiles()
      emit('update:modelValue', '')
    }

    return {
      uploadRef,
      beforeUpload,
      uploadSuccess,
      delFile
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

  .image-wrapper {
    position: relative;
    width: 100px;
    height: 100px;

    .image {
      width: 100px;
      height: 100px;
    }

    .el-icon-delete {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      font-size: 22px;
      color: #FFFFFF;
      background-color: rgba(0, 0, 0, 0.4);
      opacity: 0;
      transition: 0.2s;
    }

    &:hover {
      .el-icon-delete {
        opacity: 1;
      }
    }
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
    transition: 0.2s;

    i {
      font-size: 24px;
    }

    &:hover {
      color: #F9612E;
    }
  }
}
</style>