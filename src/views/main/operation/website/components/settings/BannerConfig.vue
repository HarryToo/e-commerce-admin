<template>
  <div>
    <div class="form-list" v-show="formDataList.length">
      <div class="form-item" v-for="(formData, index) in formDataList" :key="index">
        <el-form :model="formData" size="small" label-position="left" label-width="70px">
          <el-form-item label="图片上传">
            <div style="display: flex;align-items: flex-end;">
              <file-upload v-model="formData.img"></file-upload>
              <span style="margin-left: 15px;font-size: 12px;color: #F9612E;">尺寸建议：1920*490</span>
            </div>
          </el-form-item>
          <el-form-item label="链接设置">
            <el-button class="custom" @click="currOperationIndex = index;configDialogVisible = true">
              {{ formData.link.value ? `已设置${['分类', '商品', '专题', '自定义链接'][formData.link.type - 1]}` : '设置' }}
            </el-button>
          </el-form-item>
          <el-form-item label="启用时段">
            <el-date-picker v-model="formData.timePeriod" type="datetimerange" start-placeholder="生效时间"
                            end-placeholder="失效时间" style="width: 100%;">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <i class="el-icon-error" title="删除此项" v-if="formDataList.length > 1" @click="deleteItem(index)"></i>
      </div>
    </div>
    <el-button size="small" icon="el-icon-circle-plus" style="display: block;width: 100%;"
               :disabled="formDataList.length === maxLength" @click="addItem">
      {{ formDataList.length < maxLength ? `还可添加${maxLength - formDataList.length}个` : `已达到添加上限${maxLength}个` }}
    </el-button>

    <el-dialog v-model="configDialogVisible" title="内容数据配置" width="950px" custom-class="custom"
               :close-on-click-modal="false">
      <config-dialog-inner :type="formDataList[currOperationIndex].link.type"
                           :data="formDataList[currOperationIndex].link.value" @confirm="setLink"></config-dialog-inner>
    </el-dialog>
  </div>
</template>

<script>
import {defineComponent, provide, reactive, ref, watch} from 'vue'
import {useStore} from 'vuex'
import FileUpload from '@/components/common/FileUpload'
import ConfigDialogInner from '../../../components/config-dialog-inner'

const maxLength = 5

export default defineComponent({
  name: "BannerConfig",
  components: {
    FileUpload,
    ConfigDialogInner
  },
  setup() {
    const store = useStore()
    const configDialogVisible = ref(false)
    const currOperationIndex = ref(0)

    const formDataList = reactive(store.state.decoration.massWebsite.homePage.banner || [
      {
        img: '',
        timePeriod: [],
        link: {
          type: 1,
          value: ''
        }
      }
    ])

    const addItem = () => {
      formDataList.push({
        img: '',
        timePeriod: [],
        link: {
          type: 1,
          value: ''
        }
      })
    }

    const deleteItem = (index) => {
      formDataList.splice(index, 1)
    }

    const setLink = (data) => {
      console.log(data)
      formDataList[currOperationIndex.value].link = data
    }

    watch(formDataList, (dataList) => {
      store.commit('decoration/massWebsite/saveBannerConfig', dataList)
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
      setLink
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