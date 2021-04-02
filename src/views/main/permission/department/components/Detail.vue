<template>
  <div class="detail-dialog-cont">
    <el-form ref="detailForm" label-position="top" inline :model="detail" :rules="rules">
      <h3>部门信息</h3>
      <el-form-item label="部门名称" prop="name" required style="margin-bottom: 8px;">
        <el-input v-model="detail.name" placeholder="请输入部门名称" style="width: 180px;"
                  :disabled="mode === 'view'"></el-input>
      </el-form-item>
      <el-form-item label="部门描述" style="margin-bottom: 8px;">
        <el-input v-model="detail.description" placeholder="请输入部门描述" style="width: 420px;"
                  :disabled="mode === 'view'"></el-input>
      </el-form-item>
      <template v-if="mode !== 'view'">
        <el-divider></el-divider>
        <el-button type="info" @click="closeDialog">取消</el-button>
        <el-button class="custom" @click="submit">确定</el-button>
      </template>
    </el-form>
  </div>
</template>

<script>
import {defineComponent, ref, inject, toRefs, onMounted} from 'vue'
import $api from '@/api'

export default defineComponent({
  name: "RoleDetail",
  props: {
    // 模式：add编辑/view查看/edit编辑
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

    const checkChange = (node, isChecked, haveCheckedSubNode) => {
      console.log(node, isChecked, haveCheckedSubNode);
    }

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
        }
      }
    }

    return {
      mode,
      detailForm,
      rules,
      detail,
      checkChange,
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