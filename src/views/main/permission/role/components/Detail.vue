<template>
  <div class="info-dialog-cont">
    <h3>角色信息</h3>
    <el-form label-position="top" inline :model="basicInfo" :rules="rules">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="basicInfo.name" placeholder="请输入角色名称" style="width: 180px;"></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="basicInfo.description" placeholder="请输入角色描述" style="width: 420px;"></el-input>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <h3>功能权限</h3>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'

export default defineComponent({
  name: "RoleDetail",
  setup() {
    const basicInfo = ref({
      name: '',
      description: ''
    })
    const rules = {
      name: [{
        require: true
      }]
    }

    return {
      basicInfo,
      rules
    }
  }
})
</script>

<style scoped lang="scss">
.info-dialog-cont {

}
</style>