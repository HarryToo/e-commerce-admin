<template>
  <div>
    <div>
      <el-form :model="formData" size="small" label-position="right" label-width="68px">
        <el-form-item label="专场顶图">
          <div style="display: flex;align-items: flex-end;">
            <file-upload v-model="formData.bannerImg" img-size="1920*490"></file-upload>
            <span style="margin-left: 15px;font-size: 12px;color: #F9612E;">尺寸建议：1920*490</span>
          </div>
        </el-form-item>
        <div class="group-list" id="mass-web-special-channel-group-list">
          <div class="group-item" v-for="(group, groupIndex) in formData.goodsGroups" :key="groupIndex">
            <el-affix target="#mass-web-special-channel-group-list" :offset="262">
              <div class="group-title">
                <h4>{{ group.title || '未命名板块' + (groupIndex + 1) }}</h4>
                <i class="el-icon-error" :title="`删除板块${groupIndex + 1}`"
                   @click="deleteGroup(groupIndex)"></i>
              </div>
            </el-affix>
            <div class="group-header">
              <el-form-item label="板块标题">
                <el-input v-model.lazy="group.title" clearable placeholder="请输入分组标题"></el-input>
              </el-form-item>
            </div>
            <div class="goods-info">
              <div class="goods-list" v-if="goodsLists[groupIndex].length">
                <div class="goods-item-wrapper" v-for="(goods, goodsIndex) in goodsLists[groupIndex]" :key="goods.id">
                  <goods-info-item :goods="goods"></goods-info-item>
                  <i class="el-icon-error" title="删除此项" @click="deleteGoods(groupIndex, goodsIndex)"></i>
                </div>
              </div>
              <el-button size="small" icon="el-icon-circle-plus" style="display: block;width: 100%;"
                         @click="currOperationGroupIndex = groupIndex;dialogVisible = true">添加商品（板块{{ groupIndex + 1 }}）
              </el-button>
            </div>
          </div>
        </div>
        <el-button size="small" icon="el-icon-circle-plus" class="custom" style="display: block;width: 100%;"
                   @click="addGroup">添加板块
        </el-button>
      </el-form>
    </div>

    <!--商品配置弹窗-->
    <el-dialog v-model="dialogVisible" title="内容数据配置" width="950px" custom-class="custom"
               :close-on-click-modal="false">
      <config-dialog-inner :usable-tab="[2]" @confirm="addGoods"></config-dialog-inner>
    </el-dialog>
  </div>
</template>

<script>
import {defineComponent, provide, ref, watch} from 'vue'
import {useStore} from 'vuex'
import {ElMessage, ElMessageBox} from "element-plus"
import FileUpload from '@/components/common/FileUpload'
import GoodsInfoItem from '../../../../components/GoodsInfoItem'
import ConfigDialogInner from '../../../../components/config-dialog-inner'
import $api from '@/api'

export default defineComponent({
  name: "SpecialChannelConfig",
  components: {
    FileUpload,
    GoodsInfoItem,
    ConfigDialogInner
  },
  setup() {
    const store = useStore()
    // 商品配置弹窗控制
    const dialogVisible = ref(false)
    // 当前操作的商品组index
    const currOperationGroupIndex = ref(0)
    // 当前操作的商品index
    const currOperationGoodsIndex = ref(0)

    const formData = ref(store.state.decoration.massWebsite.specialChannel)
    const goodsLists = ref([[], []])
    const getGoodsLists = async (ids, groupIndex) => {
      if (ids && ids.length) {
        const {list} = await $api.goodsApi.platformLibrary.batchGetInfo({
          ids: JSON.stringify(ids)
        })
        goodsLists.value[groupIndex] = list
      } else {
        goodsLists.value[groupIndex] = []
      }
    }
    // 批量获取已添加的商品信息（用作展示）
    formData.value.goodsGroups.forEach((group, groupIndex) => {
      getGoodsLists(group.goodsIds, groupIndex)
    })

    const deleteGroup = (groupIndex) => {
      ElMessageBox.confirm(`此操作将永久删除此板块及相应配置数据, 是否继续?`, {type: 'warning'}).then(() => {
        formData.value.goodsGroups.splice(groupIndex, 1)
      }).catch(() => {
      })
    }

    const deleteGoods = (groupIndex, index) => {
      formData.value.goodsGroups[groupIndex].goodsIds.splice(index, 1)
      goodsLists.value[groupIndex].splice(index, 1)
    }

    const addGroup = () => {
      formData.value.goodsGroups.push({
        title: '',
        goodsIds: []
      })
    }

    const addGoods = ({value: id, goods}) => {
      if (formData.value.goodsGroups[currOperationGroupIndex.value].goodsIds.includes(id)) {
        ElMessage.warning('该商品已存在于列表，本次操作已忽略')
      } else {
        formData.value.goodsGroups[currOperationGroupIndex.value].goodsIds.push(id)
        goodsLists.value[currOperationGroupIndex.value].push({
          id: goods.id,
          cover: goods.info.cover,
          name: goods.info.name,
          price: goods.minPrice,
          stockNum: goods.stockNum
        })
      }
    }

    watch(() => formData.value.goodsGroups.length, (length) => {
      formData.value.goodsGroups.forEach((group, groupIndex) => {
        getGoodsLists(group.goodsIds, groupIndex)
      })
    }, {deep: true})

    watch(formData, (data) => {
      store.commit('decoration/massWebsite/saveSpecialChannelConfig', data)
    }, {deep: true})

    const closeDialog = () => {
      dialogVisible.value = false
    }
    provide('closeDialog', closeDialog)

    return {
      dialogVisible,
      currOperationGroupIndex,
      currOperationGoodsIndex,
      formData,
      goodsLists,
      deleteGroup,
      deleteGoods,
      addGroup,
      addGoods
    }
  }
})
</script>

<style scoped lang="scss">
.group-list {
  .group-item {
    .group-title {
      display: flex;
      justify-content: space-between;
      padding-bottom: 14px;
      background: #FFFFFF;
      border-bottom: 1px solid #EEEEEE;

      h4 {
        font-size: 15px;
        color: #F9612E;
        user-select: none;
      }
    }

    .group-header {
      padding-top: 20px;
      overflow: hidden;
    }

    .el-icon-error {
      margin-left: 10px;
      font-size: 20px;
      cursor: pointer;

      &:hover {
        color: #F56C6C;
      }
    }

    .goods-info {
      margin-bottom: 20px;

      .goods-list {
        margin-bottom: 20px;
        border: 1px solid #EEEEEE;
        border-radius: 4px;

        .goods-item-wrapper {
          display: flex;
          align-items: self-start;
          border-bottom: 1px dashed #EEEEEE;

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
        }
      }
    }
  }
}
</style>