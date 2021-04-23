<template>
  <div class="square-goods-item">
    <el-image class="goods-cover" :src="goods.info.cover" fit="cover" lazy
              :scroll-container="scrollContainer"></el-image>
    <div class="name text-cut-2" :title="goods.name">{{ goods.info.name }}</div>
    <div class="values">
      <span class="price" :title="goods.name">￥{{ goods.minPrice }}</span>
      <span class="inventory" :title="goods.name">库存：{{ goods.stockNum }}</span>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "SquareGoodsItem",
  props: {
    // 商品数据
    goods: {
      type: Object,
      default() {
        return {}
      }
    },
    scrollContainer: {
      type: [String, HTMLElement]
    }
  }
})
</script>

<style scoped lang="scss">
.square-goods-item {
  width: 224px;
  height: 280px;
  margin: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .checkbox {
    position: absolute;
    right: 2px;
    top: 2px;
  }

  .goods-cover {
    width: 150px;
    height: 150px;
    flex-shrink: 0;
    border-radius: 4px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }

  .name {
    width: 100%;
    line-height: 20px;
    font-size: 14px;
    color: #555555;
  }

  .values {
    width: 100%;
    display: flex;
    justify-content: space-between;
    line-height: 1;
    font-size: 12px;
    color: #F9612E;
  }
}
</style>