<template>
  <div>
    <div class="form-list" v-show="formDataList.length">
      <div class="form-item" v-for="(formData, index) in formDataList" :key="index">
        <el-form :model="formData" size="small" label-position="left" label-width="68px">
          <el-form-item label="图片上传">
            <div style="display: flex;align-items: flex-end;">
              <file-upload v-model="formData.img" img-size="1920*490"></file-upload>
              <span style="margin-left: 15px;font-size: 12px;color: #F9612E;">尺寸建议：1920*490</span>
            </div>
          </el-form-item>
          <el-form-item label="链接设置">
            <el-button class="custom" @click="currOperationIndex = index;configDialogVisible = true">
              {{ formData.link.value ? `已设置${['分类', '商品', '专题', '自定义链接'][formData.link.type - 1]}` : '未设置' }}
            </el-button>
          </el-form-item>
          <el-form-item label="启用时段">
            <div style="display: flex;justify-content: space-between;align-items: center;">
              <el-date-picker v-model="formData.timePeriod" type="datetimerange" start-placeholder="生效时间"
                              end-placeholder="失效时间" style="width: calc(100% - 22px);">
              </el-date-picker>
              <el-tooltip class="item" effect="light" content="留空表示不限制" placement="top-start">
                <i class="el-icon-info" style="color: #999999;"></i>
              </el-tooltip>
            </div>
          </el-form-item>
        </el-form>
        <div class="operating-area">
          <i class="el-icon-top" title="上移一层" v-if="index > 0" @click="moveUpItem(index)"></i>
          <i class="el-icon-close" title="删除此项" v-if="formDataList.length > 1" @click="deleteItem(index)"></i>
        </div>
      </div>
    </div>
    <el-button size="small" icon="el-icon-circle-plus" class="custom" style="display: block;width: 100%;"
               :disabled="formDataList.length === maxLength" @click="addItem">
      {{ formDataList.length < maxLength ? `还可添加${maxLength - formDataList.length}` : `已达到添加上限${maxLength}` }}张轮播图
    </el-button>

    <el-dialog v-model="configDialogVisible" title="内容数据配置" width="950px" custom-class="custom"
               :close-on-click-modal="false">
      <config-dialog-inner :type="formDataList[currOperationIndex].link.type"
                           :data="formDataList[currOperationIndex].link.value" @confirm="setLink"></config-dialog-inner>
    </el-dialog>
  </div>
</template>

<script>
import {computed, defineComponent, provide, ref, watch} from 'vue'
import {useStore} from 'vuex'
import {ElMessage} from 'element-plus'
import FileUpload from '@/components/common/FileUpload'
import ConfigDialogInner from '../../../../../components/config-dialog-inner'

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

    const formDataList = computed(() => store.state.decoration.massWebsite.homepage.banner)

    const addItem = () => {
      formDataList.value.push({
        img: '',
        timePeriod: [],
        link: {
          type: 1,
          value: ''
        }
      })
    }

    const moveUpItem = (index) => {
      const delArr = formDataList.value.splice(index, 1)
      formDataList.value.splice(index - 1, 0, delArr[0])
      ElMessage.success('移动成功')
    }

    const deleteItem = (index) => {
      formDataList.value.splice(index, 1)
    }

    const setLink = ({type, value}) => {
      formDataList.value[currOperationIndex.value].link = {type, value}
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
      moveUpItem,
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
    position: relative;
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

    .operating-area {
      position: absolute;
      top: 20px;
      right: 10px;

      i {
        display: block;
        width: 17px;
        height: 17px;
        text-align: center;
        line-height: 17px;
        margin-bottom: 10px;
        font-size: 12px;
        color: #FFFFFF;
        background-color: #333333;
        border-radius: 50%;
        cursor: pointer;

        &:hover {
          background-color: #F9612E;

          &.el-icon-close {
            background-color: #F56C6C;
          }
        }
      }
    }

    &:first-child {
      .operating-area {
        top: 0;
      }
    }
  }
}
</style>