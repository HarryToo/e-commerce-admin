<template>
  <div class="goods-info-item">
    <el-image :src="goods.cover" lazy fit="cover"></el-image>
    <div class="info">
      <div class="title text-cut-2">{{goods.name}}</div>
      <div class="data">
        <span class="price">￥{{ goods.price }}</span>
        <span class="stock">库存：{{ goods.stockNum }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "GoodsInfoItem",
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
})
</script>

<style scoped lang="scss">
.goods-info-item {
  display: flex;
  padding: 10px;

  .el-image {
    width: 90px;
    height: 90px;
    flex-shrink: 0;
    border-radius: 4px;
  }

  .info {
    height: 90px;
    margin-left: 15px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .title {
    }

    .data {
      display: flex;
      justify-content: space-between;
      font-size: 12px;

      .price {
        color: #F9612E;
      }

      .stock {
        color: #999999;
      }
    }
  }
}
</style>