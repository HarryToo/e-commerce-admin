<template>
  <div class="detail-dialog-cont">
    <el-form :model="formData" ref="detailForm" :rules="rules" size="small" label-position="left" label-width="84px">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model.trim="formData.name" placeholder="请输入分类名称"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div style="margin-top: 60px;text-align: right;" v-if="mode !== 'view'">
      <el-button type="info" size="small" @click="closeDialog">取消</el-button>
      <el-button class="custom" size="small" @click="submit">确定</el-button>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref, inject, toRefs, reactive} from 'vue'
import $api from '@/api'

export default defineComponent({
  name: "GoodsClassifyDetail",
  props: {
    // 模式：add新增/view查看/edit编辑
    mode: {
      type: String,
      default: 'add'
    },
    // 添加到的父级id
    pid: {
      type: [String, Number],
      default: 0
    },
    // 当条数据
    detail: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  setup(props) {
    const detailForm = ref()
    const formData = reactive({
      name: '',
      status: 1
    })
    const rules = {
      name: [{required: true, message: '请输入分类名称'}]
    }
    const {mode, pid, detail} = toRefs(props)
    if (mode.value === 'edit') {
      formData.name = detail.value.name
      formData.status = detail.value.status
    }

    const closeDialog = inject('closeDialog')
    const getList = inject('getList')

    // 添加/编辑
    const submit = async () => {
      if (await detailForm.value.validate()) {
        let param = formData
        if (mode.value === 'add') {
          param.pid = pid.value
        }
        if (mode.value === 'edit') {
          param.id = detail.value.id
        }
        const {code} = await $api.goodsApi.classify[mode.value](param)
        if (code === 200) {
          closeDialog()
          getList()
        }
      }
    }

    return {
      detailForm,
      formData,
      rules,
      closeDialog,
      submit
    }
  }
})
</script>

<style scoped lang="scss">
.detail-dialog-cont {

}
</style>