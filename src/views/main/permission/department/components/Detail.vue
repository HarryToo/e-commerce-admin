<template>
  <div class="detail-dialog-cont">
    <el-form ref="detailForm" size="small" label-position="top" :model="detail" :rules="rules">
      <h3>部门信息</h3>
      <el-row :gutter="30">
        <el-col :span="8">
          <el-form-item label="部门名称" prop="name" required>
            <el-input v-model="detail.name" placeholder="请输入部门名称" :disabled="mode === 'view'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="部门描述">
            <el-input v-model="detail.description" placeholder="请输入部门描述" :disabled="mode === 'view'"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div style="margin-top: 60px;text-align: right;" v-if="mode !== 'view'">
        <el-button type="info" size="small" @click="closeDialog">取消</el-button>
        <el-button class="custom" size="small" @click="submit">确定</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import {defineComponent, ref, inject, toRefs, onMounted} from 'vue'
import $api from '@/api'

export default defineComponent({
  name: "RoleDetail",
  props: {
    // 模式：add添加/view查看/edit编辑
    mode: {
      type: String,
      default: 'add'
    },
    // 当条数据id
    id: {
      type: [Number, String],
      default: ''
    }
  },
  setup(props) {
    const {mode, id} = toRefs(props)
    const closeDialog = inject('closeDialog')
    const getList = inject('getList')
    const detailForm = ref()
    const rules = {
      name: [{
        required: true,
        message: '请输入部门名称'
      }]
    }

    const detail = ref({
      name: '',
      description: ''
    })

    // 获取详情
    const getDetail = async () => {
      detail.value = await $api.permissionApi.department.getDetail({
        id: id.value
      })
    }

    onMounted(() => {
      if (id.value) {
        getDetail()
      }
    })

    // 添加/编辑
    const submit = async () => {
      if (await detailForm.value.validate()) {
        let param = detail.value
        if (mode.value === 'edit') {
          param.id = id.value
        }
        const {code} = await $api.permissionApi.department[mode.value](param)
        if (code === 200) {
          closeDialog()
          getList()
        }
      }
    }

    return {
      mode,
      detailForm,
      rules,
      detail,
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