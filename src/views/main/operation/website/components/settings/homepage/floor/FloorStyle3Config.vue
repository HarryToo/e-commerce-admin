<template>
  <div>
    <div>
      <el-form :model="formData" size="small" label-position="right" label-width="96px">
        <el-form-item label="楼层标题">
          <el-input v-model.lazy="formData.title" placeholder="请输入楼层标题"></el-input>
        </el-form-item>
        <div class="plate-list">
          <div class="plate-item" v-for="(plate, plateIndex) in formData.plates" :key="plateIndex">
            <el-affix target=".plate-list" :offset="262">
              <h4>{{ ['上', '下'][plateIndex] }}半部分配置</h4>
            </el-affix>
            <div class="plate-header">
              <el-form-item label="首页入口图片">
                <div style="display: flex;align-items: flex-end;">
                  <file-upload v-model="plate.homepageImage"></file-upload>
                  <span style="margin-left: 15px;font-size: 12px;color: #F9612E;">尺寸建议：224*300</span>
                </div>
              </el-form-item>
              <el-form-item label="链接设置">
                <el-button class="custom" @click="currOperationPlateIndex = plateIndex;imgDialogVisible = true">
                  {{
                    plate.homepageImageLink.value ? `已设置${['分类', '商品', '专题', '自定义链接'][plate.homepageImageLink.type - 1]}` : '未设置'
                  }}
                </el-button>
              </el-form-item>
              <el-form-item label="内页banner">
                <div style="display: flex;align-items: flex-end;">
                  <file-upload v-model="plate.innerPageBanner"></file-upload>
                  <span style="margin-left: 15px;font-size: 12px;color: #F9612E;">尺寸建议：1920*490</span>
                </div>
              </el-form-item>
            </div>
            <el-form-item label="首页商品显示">
              <el-radio-group v-model="plate.goodsPresetType">
                <el-radio :label="1">手动设置</el-radio>
                <el-radio :label="2">默认首发时间</el-radio>
                <el-radio :label="3">默认销量最高</el-radio>
              </el-radio-group>
            </el-form-item>
            <transition name="el-fade-in-linear" mode="out-in">
              <div class="goods-info" v-if="plate.goodsPresetType === 1">
                <div class="goods-list" v-if="goodsLists[plateIndex].length">
                  <div class="goods-item-wrapper" v-for="(goods, goodsIndex) in goodsLists[plateIndex]" :key="goods.id">
                    <goods-info-item :goods="goods"></goods-info-item>
                    <i class="el-icon-error" title="删除此项" @click="deleteGoods(plateIndex, goodsIndex)"></i>
                  </div>
                </div>
                <el-button size="small" icon="el-icon-circle-plus" style="display: block;width: 100%;"
                           :disabled="plate.goodsIds.length === maxLength"
                           @click="currOperationPlateIndex = plateIndex;goodsDialogVisible = true">
                  {{
                    plate.goodsIds.length < maxLength ? `还可添加${maxLength - plate.goodsIds.length}个` : `已达到添加上限${maxLength}个`
                  }}
                </el-button>
              </div>
            </transition>
          </div>
        </div>
      </el-form>
    </div>

    <!--首页入口图片链接配置弹窗-->
    <el-dialog v-model="imgDialogVisible" title="内容数据配置" width="950px" custom-class="custom"
               :close-on-click-modal="false">
      <config-dialog-inner :type="formData.plates[currOperationPlateIndex].homepageImageLink.type"
                           :data="formData.plates[currOperationPlateIndex].homepageImageLink.value"
                           @confirm="setHomepageImageLink"></config-dialog-inner>
    </el-dialog>
    <!--商品配置弹窗-->
    <el-dialog v-model="goodsDialogVisible" title="内容数据配置" width="950px" custom-class="custom"
               :close-on-click-modal="false">
      <config-dialog-inner :usable-tab="[2]" @confirm="addGoods"></config-dialog-inner>
    </el-dialog>
  </div>
</template>

<script>
import {defineComponent, inject, provide, ref, watch} from 'vue'
import {useStore} from 'vuex'
import {ElMessage} from "element-plus"
import FileUpload from '@/components/common/FileUpload'
import GoodsInfoItem from '../../../../../components/GoodsInfoItem'
import ConfigDialogInner from '../../../../../components/config-dialog-inner'
import $api from '@/api'

const maxLength = 4

export default defineComponent({
  name: "FloorStyle3Config",
  components: {
    FileUpload,
    GoodsInfoItem,
    ConfigDialogInner
  },
  setup() {
    const store = useStore()
    // 可活动楼层板块序号
    const floorIndex = inject('floorIndex')
    // 首页入口图片链接配置弹窗控制
    const imgDialogVisible = ref(false)
    // 商品配置弹窗控制
    const goodsDialogVisible = ref(false)
    // 当前操作的板块（上/下）index
    const currOperationPlateIndex = ref(0)
    // 当前操作的首页商品显示index
    const currOperationGoodsIndex = ref(0)

    const formData = ref(store.state.decoration.massWebsite.homePage.floor[floorIndex.value])
    watch(floorIndex, (index) => {
      if (store.state.decoration.massWebsite.homePage.floor[index].type === 3) {
        formData.value = store.state.decoration.massWebsite.homePage.floor[index]
      }
    })
    const goodsLists = ref([[], []])
    const getGoodsLists = async (ids, plateIndex) => {
      const {list} = await $api.goodsApi.platformLibrary.batchGetInfo({
        ids: JSON.stringify(ids)
      })
      goodsLists.value[plateIndex] = list
    }
    // 批量获取已添加的商品信息（用作展示）
    formData.value.plates.forEach((plate, plateIndex) => {
      if (plate.goodsIds.length) {
        getGoodsLists(plate.goodsIds, plateIndex)
      }
    })

    const setHomepageImageLink = ({type, value}) => {
      formData.value.plates[currOperationPlateIndex.value].homepageImageLink = {type, value}
    }

    const deleteGoods = (plateIndex, index) => {
      formData.value.plates[plateIndex].goodsIds.splice(index, 1)
      goodsLists.value[plateIndex].splice(index, 1)
    }

    const addGoods = ({value: id, goods}) => {
      if (formData.value.plates[currOperationPlateIndex.value].goodsIds.includes(id)) {
        ElMessage.warning('该商品已存在于列表，本次操作已忽略')
      } else {
        formData.value.plates[currOperationPlateIndex.value].goodsIds.push(id)
        goodsLists.value[currOperationPlateIndex.value].push({
          id: goods.id,
          cover: goods.info.cover,
          name: goods.info.name,
          price: goods.minPrice,
          stockNum: goods.stockNum
        })
      }
    }

    watch(formData, (dataList) => {
      store.commit('decoration/massWebsite/saveFloorConfig', {
        index: floorIndex.value,
        data: formData.value
      })
    }, {deep: true})

    const closeDialog = () => {
      imgDialogVisible.value = false
      goodsDialogVisible.value = false
    }
    provide('closeDialog', closeDialog)

    return {
      maxLength,
      imgDialogVisible,
      goodsDialogVisible,
      currOperationPlateIndex,
      currOperationGoodsIndex,
      formData,
      goodsLists,
      setHomepageImageLink,
      deleteGoods,
      addGoods
    }
  }
})
</script>

<style scoped lang="scss">
.plate-list {
  .plate-item {
    h4 {
      padding: 0 10px 14px;
      font-size: 15px;
      color: #F9612E;
      background: #FFFFFF;
      user-select: none;
      border-bottom: 1px solid #EEEEEE;
    }

    .plate-header {
      padding-top: 20px;
      overflow: hidden;
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
    }
  }
}
</style>