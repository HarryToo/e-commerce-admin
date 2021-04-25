<template>
  <div>
    <el-form :model="formData" size="small" label-position="right" label-width="96px">
      <el-form-item label="楼层标题">
        <el-input v-model.lazy="formData.title" clearable placeholder="请输入楼层标题"></el-input>
      </el-form-item>
      <div class="plate-list">
        <div class="plate-item" v-for="(plate, plateIndex) in formData.plates" :key="plateIndex">
          <el-affix target=".plate-list" :offset="262">
            <h4>{{ ['左', '右'][plateIndex] }}侧板块配置</h4>
          </el-affix>
          <div class="plate-header">
            <el-form-item label="首页入口图片">
              <div style="display: flex;align-items: flex-end;">
                <file-upload v-model="plate.homepageImage"></file-upload>
                <span style="margin-left: 15px;font-size: 12px;color: #F9612E;">尺寸建议：590*160</span>
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
          <el-divider>首页商品显示</el-divider>
          <div class="goods-list">
            <div class="goods-item" v-for="(goods, goodsIndex) in plate.goodsList" :key="goodsIndex">
              <el-form-item label="商品图片">
                <div style="display: flex;align-items: flex-end;">
                  <file-upload v-model="goods.image"></file-upload>
                  <span style="margin-left: 15px;font-size: 12px;color: #F9612E;">尺寸建议：150*150</span>
                </div>
              </el-form-item>
              <el-form-item label="链接设置">
                <el-button class="custom"
                           @click="currOperationPlateIndex = plateIndex;currOperationGoodsIndex = goodsIndex;goodsDialogVisible = true">
                  {{
                    goods.link.value ? `已设置${['分类', '商品', '专题', '自定义链接'][goods.link.type - 1]}` : '未设置'
                  }}
                </el-button>
              </el-form-item>
              <el-form-item label="内页banner">
                <div style="display: flex;align-items: flex-end;">
                  <file-upload v-model="goods.innerPageBanner"></file-upload>
                  <span style="margin-left: 15px;font-size: 12px;color: #F9612E;">尺寸建议：1920*490</span>
                </div>
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
    </el-form>

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
      <config-dialog-inner :type="formData.plates[currOperationPlateIndex].goodsList[currOperationGoodsIndex].link.type"
                           :data="formData.plates[currOperationPlateIndex].goodsList[currOperationGoodsIndex].link.value"
                           @confirm="setGoodsImageLink"></config-dialog-inner>
    </el-dialog>
  </div>
</template>

<script>
import {defineComponent, inject, provide, ref, watch} from 'vue'
import {useStore} from 'vuex'
import FileUpload from '@/components/common/FileUpload'
import GoodsInfoItem from '../../../../../components/GoodsInfoItem'
import ConfigDialogInner from '../../../../../components/config-dialog-inner'

const maxLength = 10

export default defineComponent({
  name: "FloorStyle2Config",
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
    // 当前操作的板块（左/右）index
    const currOperationPlateIndex = ref(0)
    // 当前操作的首页商品显示index
    const currOperationGoodsIndex = ref(0)

    const formData = ref(store.state.decoration.massWebsite.homePage.floor[floorIndex.value])
    watch(floorIndex, (newFloorIndex) => {
      if (store.state.decoration.massWebsite.homePage.floor[newFloorIndex].type === 2) {
        formData.value = store.state.decoration.massWebsite.homePage.floor[newFloorIndex]
      }
    })
    // 设置首页入口图片链接
    const setHomepageImageLink = ({type, value}) => {
      formData.value.plates[currOperationPlateIndex.value].homepageImageLink = {type, value}
    }
    // 设置首页商品图片链接
    const setGoodsImageLink = ({type, value}) => {
      formData.value.plates[currOperationPlateIndex.value].goodsList[currOperationGoodsIndex.value].link = {type, value}
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
      setHomepageImageLink,
      setGoodsImageLink
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

    .goods-list {
      padding-top: 10px;

      .goods-item {
        padding-top: 20px;
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
      }
    }
  }
}
</style>