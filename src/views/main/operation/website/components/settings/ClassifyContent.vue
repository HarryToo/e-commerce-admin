<template>
  <div>
    <div class="form-list" v-show="formDataList.length">
      <div class="form-item" v-for="(formData, index) in formDataList" :key="index">
        <el-form :model="formData" size="small" label-position="left" label-width="70px">
          <el-form-item label="分类名称">
            <el-input v-model.trim="formData.name" clearable placeholder="请输入分类名称"></el-input>
          </el-form-item>
          <el-form-item label="分类设置">
            <el-button class="custom" @click="configDialogVisible = true">设置</el-button>
          </el-form-item>
        </el-form>
        <i class="el-icon-error" title="删除此项" @click="deleteItem(index)"></i>
      </div>
    </div>
    <el-button size="small" icon="el-icon-circle-plus" style="display: block;width: 100%;"
               :disabled="formDataList.length === maxLength" @click="addItem">
      {{ formDataList.length < maxLength ? `还可添加${maxLength - formDataList.length}个` : '已达到添加上限12个' }}
    </el-button>

    <app-content-config-dialog v-model="configDialogVisible" :usable-tab="[0]"></app-content-config-dialog>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import AppContentConfigDialog from '../../../components/app-content-config-dialog'

const maxLength = 12

export default defineComponent({
  name: "ClassifyContentSetting",
  components: {
    AppContentConfigDialog
  },
  setup() {
    const configDialogVisible = ref(false)

    const formDataList = ref([
      {
        name: '',
        classify: []
      }
    ])

    const addItem = () => {
      formDataList.value.push({
        name: '',
        classify: []
      })
    }

    const deleteItem = (index) => {
      formDataList.value.splice(index, 1)
    }

    return {
      maxLength,
      configDialogVisible,
      formDataList,
      addItem,
      deleteItem
    }
  }
})
</script>

<style scoped lang="scss">
.form-list {
  margin-bottom: 20px;

  .form-item {
    display: flex;
    align-items: flex-start;
    padding: 18px 10px 0;
    border-bottom: 1px dashed #EEEEEE;
    overflow: hidden;

    &:nth-child(even) {
      background-color: #F8F8F8;
    }

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      border-bottom: none;
    }

    .el-form {
      flex-grow: 1;
      flex-shrink: 0;
    }

    .el-icon-error {
      margin-left: 10px;
      font-size: 20px;
      cursor: pointer;

      &:hover {
        color: #F56C6C;
      }
    }
  }
}
</style>