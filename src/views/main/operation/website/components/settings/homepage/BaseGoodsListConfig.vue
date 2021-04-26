<template>
  <div>
    <el-form :model="formData" size="small" label-position="right" label-width="96px">
      <el-form-item label="楼层标题">
        <el-input v-model.lazy="formData.title" clearable placeholder="请输入楼层标题"></el-input>
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
        <div class="goods-list" @scroll="scrollLoadMore">
          <div class="goods-item-wrapper" v-for="(goods, index) in goodsList" :key="goods.id">
            <goods-info-item :goods="goods"></goods-info-item>
            <i class="el-icon-error" title="删除此项" @click="deleteGoods(index)"></i>
          </div>
          <div class="load-tips">{{ goodsList.length < formData.goodsIds.length ? '加载中...' : '全部加载完毕' }}</div>
        </div>
        <el-button size="small" icon="el-icon-circle-plus" style="display: block;width: 100%;"
                   :disabled="formData.goodsIds.length === maxLength" @click="dialogVisible = true">
          {{
            formData.goodsIds.length < maxLength ? `还可添加${maxLength - formData.goodsIds.length}个` : `已达到添加上限${maxLength}个`
          }}
        </el-button>
      </div>
    </transition>

    <!--商品配置弹窗-->
    <el-dialog v-model="dialogVisible" title="内容数据配置" width="950px" custom-class="custom"
               :close-on-click-modal="false">
      <config-dialog-inner :usable-tab="[2]" @confirm="addGoods"></config-dialog-inner>
    </el-dialog>
  </div>
</template>

<script>
import {computed, defineComponent, onMounted, onUnmounted, provide, ref, watch} from 'vue'
import {useStore} from 'vuex'
import {ElMessage} from "element-plus"
import FileUpload from '@/components/common/FileUpload'
import GoodsInfoItem from '../../../../components/GoodsInfoItem'
import ConfigDialogInner from '../../../../components/config-dialog-inner'
import $api from '@/api'

const maxLength = 500

// 将一维数组拆分为指定长度二维数组
function group(array, subGroupLength) {
  let index = 0;
  let newArray = [];
  while (index < array.length) {
    newArray.push(array.slice(index, index += subGroupLength));
  }
  return newArray;
}

export default defineComponent({
  name: "BaseGoodsListConfig",
  components: {
    FileUpload,
    GoodsInfoItem,
    ConfigDialogInner
  },
  setup() {
    const store = useStore()
    // 商品配置弹窗控制
    const dialogVisible = ref(false)

    const formData = computed(() => store.state.decoration.massWebsite.homePage.baseGoodsList)
    const goodsList = ref([])
    // 将id以10个一页分组
    const idGroups = group(formData.value.goodsIds, 10)
    let pageIndex = 1
    // 批量获取已添加的商品信息（用作展示）
    const getGoodsList = async (ids) => {
      const {list} = await $api.goodsApi.platformLibrary.batchGetInfo({
        ids: JSON.stringify(ids)
      })
      goodsList.value = [...goodsList.value, ...list]
    }
    getGoodsList(idGroups[0])

    // 滚动触底加载
    const scrollLoadMore = (event) => {
      if (goodsList.value.length < formData.value.goodsIds.length) {
        if (event.target.scrollTop + event.target.clientHeight === event.target.scrollHeight) {
          getGoodsList(idGroups[pageIndex++])
        }
      }
    }

    const deleteGoods = (index) => {
      formData.value.goodsIds.splice(index, 1)
      goodsList.value.splice(index, 1)
      console.log(formData.value.goodsIds)
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

    watch(formData, (data) => {
      store.commit('decoration/massWebsite/saveBaseGoodsListConfig', data)
    }, {deep: true})

    const closeDialog = () => {
      dialogVisible.value = false
    }
    provide('closeDialog', closeDialog)

    return {
      maxLength,
      dialogVisible,
      formData,
      goodsList,
      pageIndex,
      scrollLoadMore,
      deleteGoods,
      addGoods
    }
  }
})
</script>

<style scoped lang="scss">
.goods-info {
  .goods-list {
    height: calc(100vh - 456px);
    margin-bottom: 20px;
    border: 1px solid #EEEEEE;
    border-radius: 4px;
    overflow-y: auto;

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

    .load-tips {
      text-align: center;
      line-height: 34px;
      font-size: 12px;
      color: #999999;
    }
  }
}
</style>