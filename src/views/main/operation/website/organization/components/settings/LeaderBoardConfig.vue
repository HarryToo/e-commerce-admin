<template>
  <div class="form-list" id="organization-web-leader-board-group-list">
    <div v-for="(formData, index) in formDataList" :key="index">
      <el-affix target="#organization-web-leader-board-group-list" :offset="262">
        <div class="group-title">
          <h4>{{ formData.title || '未命名排行榜' + (index + 1) }}</h4>
          <i class="el-icon-error" :title="`删除排行榜${index + 1}`"
             @click="deleteGroup(index)"></i>
        </div>
      </el-affix>
      <el-form :model="formData" size="small" label-position="right" label-width="82px">
        <el-form-item label="排行榜名称">
          <el-input v-model.lazy="formData.title" clearable placeholder="请输入排行榜名称"></el-input>
        </el-form-item>
        <el-form-item label="排序方式">
          <el-radio-group v-model="formData.sortBy">
            <el-radio :label="1">入库时间（倒序）</el-radio>
            <el-radio :label="2">采购量</el-radio>
            <el-radio :label="3">铺货量</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input v-model.number.lazy="formData.maxLength" clearable placeholder="请输入商品数量"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-button size="small" icon="el-icon-circle-plus" class="custom" :disabled="formDataList.length === 3"
               style="display: block;width: 100%;" @click="addGroup">添加排行榜
    </el-button>
  </div>
</template>

<script>
import {defineComponent, ref, watch} from 'vue'
import {useStore} from 'vuex'
import {ElMessageBox} from "element-plus"
import FileUpload from '@/components/common/FileUpload'
import GoodsInfoItem from '../../../../components/GoodsInfoItem'
import ConfigDialogInner from '../../../../components/config-dialog-inner'

export default defineComponent({
  name: "LeaderBoardConfig",
  components: {
    FileUpload,
    GoodsInfoItem,
    ConfigDialogInner
  },
  setup() {
    const store = useStore()
    const formDataList = ref(store.state.decoration.organizationWebsite.leaderboard)

    const deleteGroup = (index) => {
      ElMessageBox.confirm(`此操作将永久删除此排行榜及相应配置数据, 是否继续?`, {type: 'warning'}).then(() => {
        formDataList.value.splice(index, 1)
      }).catch(() => {
      })
    }

    const addGroup = () => {
      formDataList.value.push({
        title: '',
        // 排序方式：1.以入库时间（倒序）排序, 2.以采购量排序, 3.以铺货量排序
        sortBy: 1,
        maxLength: 50
      })
    }

    watch(formDataList, (list) => {
      store.commit('decoration/organizationWebsite/saveLeaderBoardConfig', list)
    }, {deep: true})

    return {
      formDataList,
      deleteGroup,
      addGroup
    }
  }
})
</script>

<style scoped lang="scss">
.form-list {
  .group-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 14px;
    background: #FFFFFF;
    border-bottom: 1px solid #EEEEEE;

    h4 {
      font-size: 15px;
      color: #F9612E;
      user-select: none;
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