<template>
  <div class="detail-dialog-cont">
    <el-form ref="detailForm" label-position="top" inline :model="detail" :rules="rules">
      <h3>角色信息</h3>
      <el-form-item label="角色名称" prop="name" required style="margin-bottom: 8px;">
        <el-input v-model="detail.name" placeholder="请输入角色名称" style="width: 180px;"
                  :disabled="mode === 'view'"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" style="margin-bottom: 8px;">
        <el-input v-model="detail.description" placeholder="请输入角色描述" style="width: 420px;"
                  :disabled="mode === 'view'"></el-input>
      </el-form-item>
      <el-divider></el-divider>
      <h3>功能权限</h3>
      <el-tree :data="controllablePermission" :show-checkbox="mode !== 'view'" accordion
               @check-change="checkChange"></el-tree>
      <el-divider></el-divider>
      <h3>个人采集库数据可见范围</h3>
      <el-radio-group v-model="detail.range" :disabled="mode === 'view'">
        <el-radio :label="1">部门数据</el-radio>
        <el-radio :label="2">小组数据</el-radio>
        <el-radio :label="3">个人数据</el-radio>
      </el-radio-group>
      <template v-if="mode !== 'view'">
        <el-divider></el-divider>
        <el-button type="info" @click="closeDialog">取消</el-button>
        <el-button class="custom" @click="submit">确定</el-button>
      </template>
    </el-form>
  </div>
</template>

<script>
import {defineComponent, ref, inject, toRefs, watchEffect, nextTick} from 'vue'
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
        message: '请输入角色名称'
      }]
    }

    const controllablePermission = ref([])

    const detail = ref({
      name: '',
      description: '',
      permission: [],
      range: 1
    })

    // 添加角色时可以分配的权限
    const getControllablePermission = async () => {
      controllablePermission.value = await $api.permissionApi.role.getControllablePermission()
    }
    getControllablePermission()

    const checkChange = (node, isChecked, haveCheckedSubNode) => {
      console.log(node, isChecked, haveCheckedSubNode);
    }

    // 添加/编辑
    const submit = async () => {
      if (await detailForm.value.validate()) {
        let handlerName = 'addRole', param = detail.value
        if (mode.value === 'edit') {
          handlerName = 'editRole'
          param.id = id.value
        }
        const {code} = await $api.permissionApi.role[handlerName](param)
        if (code === 200) {
          detailForm.value.resetFields()
          closeDialog()
        }
      }
    }

    watchEffect(async () => {
      if (mode.value === 'add') {
        console.log('重置表单');
        detailForm.value && detailForm.value.resetFields()
      }
      if (id.value) {
        detail.value = await $api.permissionApi.role.getDetail({
          id: id.value
        })
      }
    })

    return {
      mode,
      detailForm,
      rules,
      detail,
      controllablePermission,
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