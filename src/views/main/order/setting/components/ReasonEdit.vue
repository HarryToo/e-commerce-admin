<template>
  <div class="detail-dialog-cont">
    <el-form :model="formData" ref="form" :rules="rules" size="small" label-suffix="：" label-position="right"
             label-width="110px">
      <el-form-item label="退换货原因" prop="reason">
        <el-input v-model.trim="formData.reason" placeholder="请输入分类名称"></el-input>
      </el-form-item>
      <el-form-item label="备注信息" prop="remark">
        <el-input v-model.trim="formData.remark" placeholder="请输入备注信息，尽量使用简洁的语言"></el-input>
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
import {ElMessage} from "element-plus"
import $api from '@/api'

export default defineComponent({
  name: "ReturnReasonEdit",
  props: {
    // 模式：add新增/edit编辑
    mode: {
      type: String,
      default: 'add'
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
    const closeDialog = inject('closeDialog')
    const getList = inject('getList')
    const {mode, detail} = toRefs(props)

    const form = ref()
    const formData = reactive({
      reason: '',
      remark: '',
      status: 1
    })
    const rules = {
      reason: [{required: true, message: '请输入退换货原因'}],
      remark: [{required: true, message: '请输入备注信息'}],
      status: [{required: true, message: '请选择启用状态'}]
    }

    if (mode.value === 'edit') {
      formData.reason = detail.value.reason
      formData.remark = detail.value.remark
      formData.status = detail.value.status
    }

    // 添加/编辑
    const submit = async () => {
      if (await form.value.validate()) {
        const param = formData
        if (mode.value === 'edit') {
          param.id = detail.value.id
        }
        const {code} = await $api.orderApi.returnReason[mode.value](param)
        if (code === 200) {
          ElMessage.success('保存成功')
          closeDialog()
          getList()
        }
      }
    }

    return {
      form,
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