<template>
  <div class="detail-dialog-cont">
    <el-form ref="detailForm" size="small" label-position="top" :model="detail" :rules="rules">
      <h3>用户信息</h3>
      <el-row :gutter="30">
        <el-col :span="24">
          <el-form-item label="机构名称" prop="name" required>
            <el-input v-model="detail.name" placeholder="请输入机构名称" :disabled="mode === 'view'"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="10">
          <el-form-item label="联系人" prop="contact" required>
            <el-input v-model="detail.contact" placeholder="请输入联系人" :disabled="mode === 'view'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="联系电话" prop="phone" required>
            <el-input v-model="detail.phone" placeholder="请输入联系电话" :disabled="mode === 'view'"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="10">
          <el-form-item label="登录账号" prop="account" required>
            <el-input v-model="detail.account" :maxlength="15" placeholder="请设置登录账号"
                      :disabled="mode === 'view'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14" v-if="mode !== 'view'">
          <el-form-item label="登录密码" prop="password" required>
            <el-input type="password" :maxlength="12" v-model="detail.password"
                      :placeholder="`请${mode === 'add' ? '设置' : '重设'}登录密码`" :disabled="mode === 'view'"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="10">
          <el-form-item label="所选套餐" prop="setMealId" required>
            <el-select v-model="detail.setMealId" placeholder="请选择套餐" :disabled="mode === 'view'">
              <el-option v-for="item in setMealList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="开通人" prop="openPeople" required>
            <el-input v-model="detail.openPeople" :maxlength="15" placeholder="请输入开通人"
                      :disabled="mode === 'view'"></el-input>
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
    const detailForm = ref()
    const rules = {
      name: [{required: true, message: '请输入机构名称'}],
      contact: [{required: true, message: '请输入联系人'}],
      phone: [{required: true, message: '请输入联系电话'}, {pattern: /^1\d{10}$/, message: '请输入正确的联系电话'}],
      account: [{required: true, message: '请设置登录账号'}, {pattern: /^[a-zA-Z0-9]{1,15}$/, message: '只能为15位以内的字母、数字组合'}],
      password: [{required: true, message: '请设置登录密码'}, {pattern: /^[a-zA-Z0-9]{6,12}$/, message: '只能为6-12位的字母、数字组合'}],
      setMealId: [{required: true, message: '请选择套餐'}],
      openPeople: [{required: true, message: '请输入开通人'}]
    }

    const detail = ref({
      name: '',
      contact: '',
      phone: '',
      account: '',
      password: '',
      setMealId: '',
      openPeople: ''
    })

    const setMealList = inject('setMealList')

    // 获取详情（注意原则上后台不返回md5后的password）
    const getDetail = async () => {
      detail.value = await $api.customerApi.organization.getDetail({
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
        const {code} = await $api.customerApi.organization[mode.value](param)
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
      setMealList,
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