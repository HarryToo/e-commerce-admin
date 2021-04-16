<template>
  <div class="detail-dialog-cont">
    <el-form ref="detailForm" size="small" label-position="top" :model="detail" :rules="rules">
      <h3>用户信息</h3>
      <el-row :gutter="30">
        <el-col :span="8">
          <el-form-item label="用户名称" prop="name" required>
            <el-input v-model="detail.name" placeholder="请输入用户名称" :disabled="mode === 'view'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="所属部门" prop="department" required>
            <el-select v-model="detail.department" placeholder="请选择所属部门" :disabled="mode === 'view'">
              <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="8">
          <el-form-item label="所属角色" prop="role" required>
            <el-select v-model="detail.role" placeholder="请选择所属角色" :disabled="mode === 'view'">
              <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="用户描述">
            <el-input v-model="detail.description" placeholder="请输入用户描述" :disabled="mode === 'view'"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="8">
          <el-form-item label="登录账号" prop="account" required>
            <el-input v-model="detail.account" :maxlength="15" placeholder="请设置登录账号"
                      :disabled="mode === 'view'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16" v-if="mode !== 'view'">
          <el-form-item label="登录密码" prop="password" required>
            <el-input type="password" :maxlength="12" v-model="detail.password"
                      :placeholder="`请${mode === 'add' ? '设置' : '重设'}登录密码`" :disabled="mode === 'view'"></el-input>
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
import md5 from 'md5'

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
      name: [{required: true, message: '请输入用户名称'}],
      department: [{required: true, message: '请选择所属部门'}],
      role: [{required: true, message: '请选择所属角色'}],
      account: [{required: true, message: '请设置登录账号'}, {pattern: /^[a-zA-Z0-9]{1,15}$/, message: '只能为15位以内的字母、数字组合'}],
      password: [{required: true, message: '请设置登录密码'}, {pattern: /^[a-zA-Z0-9]{6,12}$/, message: '只能为6-12位的字母、数字组合'}]
    }

    const detail = ref({
      name: '',
      department: '',
      role: '',
      description: '',
      account: '',
      password: ''
    })

    const departmentList = inject('departmentList')
    const roleList = inject('roleList')

    // 获取详情（注意原则上后台不返回md5后的password）
    const getDetail = async () => {
      detail.value = await $api.permissionApi.user.getDetail({
        id: id.value
      })
    }

    onMounted(async () => {
      if (id.value) {
        await getDetail()
        detailForm.value && detailForm.value.clearValidate()
      }
    })

    // 添加/编辑
    const submit = async () => {
      if (await detailForm.value.validate()) {
        let param = {
          ...detail.value,
          password: md5(detail.value.password)
        }
        if (mode.value === 'edit') {
          param.id = id.value
        }
        const {code} = await $api.permissionApi.user[mode.value](param)
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
      departmentList,
      roleList,
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