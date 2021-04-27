<template>
  <div>
    <div class="form-list" v-show="formDataList.length">
      <div class="form-item" v-for="(formData, index) in formDataList" :key="index">
        <el-form :model="formData" size="small" label-position="left" label-width="68px">
          <el-form-item label="分类名称">
            <el-input v-model.trim="formData.name" clearable placeholder="请输入分类名称"></el-input>
          </el-form-item>
          <el-form-item label="分类设置">
            <el-button class="custom" @click="currOperationIndex = index;configDialogVisible = true">
              {{ formData.classify.ids.length ? '已设置' : '未设置' }}
            </el-button>
          </el-form-item>
        </el-form>
        <i class="el-icon-error" title="删除此项" v-if="formDataList.length > 1" @click="deleteItem(index)"></i>
      </div>
    </div>
    <el-button size="small" icon="el-icon-circle-plus" class="custom" style="display: block;width: 100%;"
               :disabled="formDataList.length === maxLength" @click="addItem">
      {{ formDataList.length < maxLength ? `还可添加${maxLength - formDataList.length}` : `已达到添加上限${maxLength}` }}个分类
    </el-button>

    <el-dialog v-model="configDialogVisible" title="内容数据配置" width="950px" custom-class="custom"
               :close-on-click-modal="false">
      <config-dialog-inner :usable-tab="[1]" :data="formDataList[currOperationIndex].classify"
                           @confirm="setClassify"></config-dialog-inner>
    </el-dialog>
  </div>
</template>

<script>
import {computed, defineComponent, provide, ref, watch} from 'vue'
import {useStore} from 'vuex'
import ConfigDialogInner from '../../../../../components/config-dialog-inner'

const maxLength = 12

export default defineComponent({
  name: "ClassifyConfig",
  components: {
    ConfigDialogInner
  },
  setup() {
    const store = useStore()
    const configDialogVisible = ref(false)
    const currOperationIndex = ref(0)

    const formDataList = computed(() => store.state.decoration.organizationWebsite.homepage.classify)

    const addItem = () => {
      formDataList.value.push({
        name: '',
        classify: {
          ids: [],
          tree: []
        }
      })
    }

    const deleteItem = (index) => {
      formDataList.value.splice(index, 1)
    }

    const setClassify = ({value}) => {
      formDataList.value[currOperationIndex.value].classify = value
    }

    watch(formDataList, (dataList) => {
      store.commit('decoration/organizationWebsite/saveClassifyConfig', dataList)
    }, {deep: true})

    const closeDialog = () => {
      configDialogVisible.value = false
    }

    provide('closeDialog', closeDialog)

    return {
      maxLength,
      configDialogVisible,
      formDataList,
      currOperationIndex,
      addItem,
      deleteItem,
      setClassify
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