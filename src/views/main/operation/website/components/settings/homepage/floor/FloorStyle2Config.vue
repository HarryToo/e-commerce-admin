<template>
  <div>
    <el-form :model="formData" size="small" label-position="right" label-width="96px">
      <el-form-item label="楼层标题">
        <el-input v-model="formData.title" placeholder="请输入楼层标题"></el-input>
      </el-form-item>
      <div class="plate-list">
        <div class="plate-item" v-for="(plate, plateIndex) in formData.plates" :key="plateIndex">
          <h4>{{ ['左', '右'][plateIndex] }}侧板块配置</h4>
          <div class="plate-header">
            <el-form-item label="首页入口图片">
              <div style="display: flex;align-items: flex-end;">
                <file-upload v-model="plate.homepageImage"></file-upload>
                <span style="margin-left: 15px;font-size: 12px;color: #F9612E;">尺寸建议：590*160</span>
              </div>
            </el-form-item>
            <el-form-item label="链接设置">
              <el-button class="custom" @click="imgDialogVisible = true">
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
          <div class="goods-list">
            <div class="goods-item" v-for="(goods, goodsIndex) in plate.goodsList" :key="goodsIndex">
              <el-form-item label="首页商品显示">
                <div style="display: flex;align-items: flex-end;">
                  <file-upload v-model="goods.image"></file-upload>
                  <span style="margin-left: 15px;font-size: 12px;color: #F9612E;">尺寸建议：150*150</span>
                </div>
              </el-form-item>
              <el-form-item label="链接设置">
                <el-button class="custom" @click="goodsDialogVisible = true">
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
      <config-dialog-inner :type="formData.homepageImageLink.type"
                           :data="formData.homepageImageLink.value"
                           @confirm="setHomepageImageLink"></config-dialog-inner>
    </el-dialog>
    <!--商品配置弹窗-->
    <el-dialog v-model="goodsDialogVisible" title="内容数据配置" width="950px" custom-class="custom"
               :close-on-click-modal="false">
      <config-dialog-inner :usable-tab="[2]" @confirm=""></config-dialog-inner>
    </el-dialog>
  </div>
</template>

<script>
import {computed, defineComponent, inject, provide, ref, watch} from 'vue'
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
    const currOperationIndex = ref(0)

    const formData = computed(() => store.state.decoration.massWebsite.homePage.floor[floorIndex.value])
    const setHomepageImageLink = ({type, value}) => {
      formData.value.homepageImageLink = {type, value}
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
      currOperationIndex,
      formData,
      setHomepageImageLink
    }
  }
})
</script>

<style scoped lang="scss">
.plate-list {
  .plate-item {
    h4 {
      height: 30px;
      padding: 0 15px;
      line-height: 30px;
      color: #FFFFFF;
      background-color: #F9612E;
    }

    .plate-header {
    }

    .goods-list {
      .goods-item {
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