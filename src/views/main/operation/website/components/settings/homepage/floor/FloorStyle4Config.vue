<template>
  <div>
    <el-form :model="formData" size="small" label-position="right" label-width="96px">
      <el-form-item label="楼层标题">
        <el-input v-model.lazy="formData.title" clearable placeholder="请输入楼层标题"></el-input>
      </el-form-item>
      <el-form-item label="首页入口图片">
        <div style="display: flex;align-items: flex-end;">
          <file-upload v-model="formData.homepageImage"></file-upload>
          <span style="margin-left: 15px;font-size: 12px;color: #F9612E;">尺寸建议：224*620</span>
        </div>
      </el-form-item>
      <el-form-item label="链接设置">
        <el-button class="custom" @click="imgDialogVisible = true">
          {{
            formData.homepageImageLink.value ? `已设置${['分类', '商品', '专题', '自定义链接'][formData.homepageImageLink.type - 1]}` : '未设置'
          }}
        </el-button>
      </el-form-item>
      <el-form-item label="内页banner">
        <div style="display: flex;align-items: flex-end;">
          <file-upload v-model="formData.innerPageBanner"></file-upload>
          <span style="margin-left: 15px;font-size: 12px;color: #F9612E;">尺寸建议：1920*490</span>
        </div>
      </el-form-item>
      <el-form-item label="首页商品显示">
        <el-radio-group v-model="formData.goodsPresetType">
          <el-radio :label="1">手动设置</el-radio>
          <el-radio :label="2">默认首发时间</el-radio>
          <el-radio :label="3">默认销量最高</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <transition name="el-fade-in-linear" mode="out-in">
      <div class="goods-info" v-if="formData.goodsPresetType === 1">
        <div class="goods-list" v-if="goodsList.length">
          <div class="goods-item-wrapper" v-for="(goods, index) in goodsList" :key="goods.id">
            <goods-info-item :goods="goods"></goods-info-item>
            <i class="el-icon-error" title="删除此项" @click="deleteGoods(index)"></i>
          </div>
        </div>
        <el-button size="small" icon="el-icon-circle-plus" style="display: block;width: 100%;"
                   :disabled="formData.goodsIds.length === maxLength" @click="goodsDialogVisible = true">
          {{
            formData.goodsIds.length < maxLength ? `还可添加${maxLength - formData.goodsIds.length}个` : `已达到添加上限${maxLength}个`
          }}
        </el-button>
      </div>
    </transition>

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
      <config-dialog-inner :usable-tab="[2]" @confirm="addGoods"></config-dialog-inner>
    </el-dialog>
  </div>
</template>

<script>
import {computed, defineComponent, inject, provide, ref, watch} from 'vue'
import {useStore} from 'vuex'
import {ElMessage} from "element-plus"
import FileUpload from '@/components/common/FileUpload'
import GoodsInfoItem from '../../../../../components/GoodsInfoItem'
import ConfigDialogInner from '../../../../../components/config-dialog-inner'
import $api from '@/api'

const maxLength = 8

export default defineComponent({
  name: "FloorStyle4Config",
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

    const formData = ref(store.state.decoration.massWebsite.homePage.floor[floorIndex.value])
    // 楼层类型为4但id变化则说明前后视图共享此类型组件，需要刷新数据
    const floorItemId = computed(() => store.state.decoration.massWebsite.homePage.floor[floorIndex.value].id)
    let prevId = floorItemId.value
    watch([floorIndex, floorItemId], ([newFloorIndex, newFloorItemId]) => {
      if (store.state.decoration.massWebsite.homePage.floor[newFloorIndex].type === 4 && newFloorItemId !== prevId) {
        // console.log('******** 楼层类型 4 组件刷新 ********')
        prevId = newFloorItemId
        formData.value = store.state.decoration.massWebsite.homePage.floor[newFloorIndex]
        // 批量获取已添加的商品信息（用作展示）
        if (formData.value.goodsIds.length) {
          getGoodsList(formData.value.goodsIds)
        }
      }
    })
    const goodsList = ref([])
    const getGoodsList = async (ids) => {
      const {list} = await $api.goodsApi.platformLibrary.batchGetInfo({
        ids: JSON.stringify(ids)
      })
      goodsList.value = list
    }
    // 批量获取已添加的商品信息（用作展示）
    if (formData.value.goodsIds.length) {
      getGoodsList(formData.value.goodsIds)
    }

    const setHomepageImageLink = ({type, value}) => {
      formData.value.homepageImageLink = {type, value}
    }

    const deleteGoods = (index) => {
      formData.value.goodsIds.splice(index, 1)
      goodsList.value.splice(index, 1)
    }

    const addGoods = ({value: id, goods}) => {
      if (formData.value.goodsIds.includes(id)) {
        ElMessage.warning('该商品已存在于列表，本次操作已忽略')
      } else {
        formData.value.goodsIds.push(id)
        goodsList.value.push({
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
      formData,
      goodsList,
      setHomepageImageLink,
      deleteGoods,
      addGoods
    }
  }
})
</script>

<style scoped lang="scss">
.goods-info {
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
</style>