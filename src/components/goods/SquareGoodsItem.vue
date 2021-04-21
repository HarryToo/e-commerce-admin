<template>
  <div class="square-goods-item" :class="{choosable}" @click="choosable && (checked = !checked)">
    <el-checkbox v-model="checked" v-if="choosable" class="checkbox" @click.stop></el-checkbox>
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
import {defineComponent, ref, toRefs, watch} from 'vue'

export default defineComponent({
  name: "SquareGoodsItem",
  props: {
    // 是否可选择
    choosable: {
      type: Boolean,
      default: false
    },
    // 是否选中
    isChecked: {
      type: Boolean,
      default: false
    },
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
  },
  emits: ['change'],
  setup(props, {emit}) {
    const {goods} = toRefs(props)
    const checked = ref(false)

    watch(checked, (value) => {
      emit('change', {goods: goods.value, checked: value})
    })

    watch(() => props.isChecked, (isChecked) => {
      if (!isChecked) {
        checked.value = isChecked
      }
    })

    return {
      checked
    }
  }
})
</script>

<style scoped lang="scss">
.square-goods-item {
  width: 224px;
  height: 300px;
  margin: 0 20px 20px 0;
  padding: 30px 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;

  &.choosable {
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.025);

      ::v-deep .el-checkbox__inner {
        border-color: #409EFF;
      }
    }
  }

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