<template>
  <div class="wide-goods-item">
    <el-image class="goods-cover" :src="goods.cover" fit="cover" lazy :scroll-container="scrollContainer"></el-image>
    <div class="goods-texts">
      <div class="name text-cut-2" :title="goods.name">{{ goods.name }}</div>
      <div class="classify text-cut-1" :title="goods.classify">
        <span>商品分类：</span>
        <span>{{ goods.classify }}</span>
      </div>
      <div class="origins">
        <span class="origin text-cut-1">
          <span>来源平台：</span>
          <a target="_blank" :href="goods.origin.platform.href"
             :title="goods.origin.platform.name">{{ goods.origin.platform.name }}</a>
        </span>
        <span class="origin text-cut-1">
          <span>来源ID：</span>
          <a target="_blank" :href="goods.origin.id.href" :title="goods.origin.id.href">{{ goods.origin.id.name }}</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "WideGoodsItem",
  props: {
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
.wide-goods-item {
  width: 420px;
  height: 80px;
  display: flex;
  justify-content: space-between;

  .goods-cover {
    width: 80px;
    height: 100%;
    flex-shrink: 0;
    border-radius: 4px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }

  .goods-texts {
    width: 330px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .name {
      width: 100%;
      height: 34px;
      line-height: 18px;
      font-size: 14px;
      color: #555555;
    }

    .classify {
      span {
        line-height: 1;
        font-size: 12px;
        color: #999999;
      }
    }

    .origins {
      display: flex;

      .origin {
        width: 50%;
        line-height: 13px;
        font-size: 12px;
        color: #999999;

        a {
          color: #F9612E;
        }
      }
    }
  }
}
</style>