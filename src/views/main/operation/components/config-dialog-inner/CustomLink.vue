<template>
  <el-input v-model.trim="customLink" clearable placeholder="请输入链接URL地址" size="small"></el-input>
</template>

<script>
import {defineComponent, inject, onMounted, ref} from 'vue'
import {ElMessage} from "element-plus"
import {reg} from "@/utils/tool"

export default defineComponent({
  name: "CustomLink",
  props: {
    // 需要回填的数据（自定义链接地址）
    link: {
      type: String,
      default: ''
    }
  },
  emits: ['confirm'],
  setup(props, {emit}) {
    const customLink = ref(props.link || '')
    const closeDialog = inject('closeDialog')

    const reset = () => {
      customLink.value = props.link
    }

    const save = () => {
      if (customLink.value) {
        if (reg.checkUrl(customLink.value)) {
          emit('confirm', {
            type: 4,
            value: customLink.value
          })
          closeDialog()
        } else {
          ElMessage.error('请输入正确的链接URL地址（注意包含http或https）')
        }
      } else {
        ElMessage.error('请输入链接URL地址')
      }
    }

    return {
      customLink,
      reset,
      save
    }
  }
})
</script>

<style scoped lang="scss">

</style>