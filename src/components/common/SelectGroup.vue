<template>
  <div>
    <el-radio-group class="select-group" v-model="checkedId" v-if="singleSelected">
      <div class="select-item-wrapper" v-for="item in list" :key="item.id" @click="clickItem(item.id)">
        <el-radio class="checkbox" :label="item.id" @click.stop>&nbsp;</el-radio>
        <slot :item="item"></slot>
      </div>
    </el-radio-group>
    <el-checkbox-group class="select-group" v-model="checkedIds" v-else>
      <div class="select-item-wrapper" v-for="(item) in list" :key="item.id" @click="clickItem(item.id)">
        <el-checkbox class="checkbox" :label="item.id" @click.stop>&nbsp;</el-checkbox>
        <slot :item="item"></slot>
      </div>
    </el-checkbox-group>
  </div>
</template>

<script>
import {defineComponent, ref, watch, watchEffect} from 'vue'
import SquareGoodsItem from '@/components/goods/SquareGoodsItem'

export default defineComponent({
  name: "SelectGroup",
  components: {
    SquareGoodsItem
  },
  props: {
    // 列表数据
    list: {
      type: Array,
      default() {
        return []
      }
    },
    // 是否单选模式
    singleSelected: {
      type: Boolean,
      default: false
    },
    // 选中项
    modelValue: {
      type: Array,
      default() {
        return []
      }
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const checkedId = ref('')
    const checkedIds = ref([])

    watchEffect(() => {
      if (props.singleSelected) {
        checkedId.value = props.modelValue[0]
      } else {
        checkedIds.value = props.modelValue
      }
    })

    watch(checkedId, (value) => {
      emit('update:modelValue', [value])
    })

    watch(checkedIds, (value) => {
      emit('update:modelValue', value)
    }, {deep: true})

    const clickItem = (id) => {
      if (props.singleSelected) {
        checkedId.value = id
      } else {
        if (checkedIds.value.includes(id)) {
          checkedIds.value.splice(checkedIds.value.indexOf(id), 1)
        } else {
          checkedIds.value.push(id)
        }
      }
    }

    return {
      checkedId,
      checkedIds,
      clickItem
    }
  }
})
</script>

<style scoped lang="scss">
.select-group {
  display: flex;
  flex-wrap: wrap;

  .select-item-wrapper {
    position: relative;
    padding-top: 5px;
    cursor: pointer;
    transition: transform 0.2s;

    ::v-deep {
      .el-checkbox, .el-radio {
        position: absolute;
        top: 16px;
        right: 10px;
        z-index: 1;
        margin: 0;
      }
    }

    &:hover {
      transform: scale(1.02);

      ::v-deep {
        .el-checkbox__inner, .el-radio__inner {
          border-color: #409EFF;
        }
      }
    }
  }
}
</style>