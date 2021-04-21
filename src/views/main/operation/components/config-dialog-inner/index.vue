<template>
  <div class="config-dialog-inner">
    <el-tabs tab-position="left" v-model="tabIndex">
      <el-tab-pane name="1" label="跳转分类" :disabled="!usableTab.includes(1)">
        <div class="tab-pane-cont">
          <goods-classify :data="tabIndex === '1' && typeof data === 'object' ? data : null" ref="goodsClassifyRef"
                          @confirm="$emit('confirm', $event)"></goods-classify>
        </div>
      </el-tab-pane>
      <el-tab-pane name="2" label="跳转商品" :disabled="!usableTab.includes(2)">
        <div class="tab-pane-cont">
          <goods :data="tabIndex === '2' && typeof data === 'object' ? data : null" ref="goodsRef"
                 @confirm="$emit('confirm', $event)"></goods>
        </div>
      </el-tab-pane>
      <el-tab-pane name="3" label="跳转专题" :disabled="!usableTab.includes(3)">
        <div class="tab-pane-cont">
          跳转专题
        </div>
      </el-tab-pane>
      <el-tab-pane name="4" label="自定义链接" :disabled="!usableTab.includes(4)">
        <div class="tab-pane-cont">
          <custom-link :data="tabIndex === '4' && typeof data === 'string' ? data : ''" ref="customLinkRef"
                       @confirm="$emit('confirm', $event)"></custom-link>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="button-group">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button size="small" class="custom" @click="confirm">确定</el-button>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref, provide, inject} from 'vue'
import GoodsClassify from './GoodsClassify'
import Goods from './Goods'
import CustomLink from './CustomLink'

export default defineComponent({
  name: "ConfigDialogInner",
  components: {
    GoodsClassify,
    Goods,
    CustomLink
  },
  props: {
    // 可选择的tab
    usableTab: {
      type: Array,
      default() {
        return [1, 2, 3, 4]
      }
    },
    // 激活展示的tab标识（值类型）
    type: {
      type: [String, Number],
      default: ''
    },
    // 需要回填的数据
    data: {
      type: [Object, Array, String],
      default() {
        return null
      }
    }
  },
  emits: ['update:modelValue', 'confirm'],
  setup(props, {emit}) {
    const closeDialog = inject('closeDialog')
    // tabIndex没传的情况下，默认为可选择的tab中第一个
    const tabIndex = ref(props.type === '' ? props.usableTab[0].toString() : props.type.toString())
    const goodsClassifyRef = ref()
    const goodsRef = ref()
    const customLinkRef = ref()

    const cancel = () => {
      goodsClassifyRef.value.reset()
      goodsRef.value.reset()
      customLinkRef.value.reset()
      closeDialog()
    }
    const confirm = () => {
      goodsClassifyRef.value.save()
      goodsRef.value.save()
      customLinkRef.value.save()
    }

    provide('tabIndex', tabIndex)

    return {
      tabIndex,
      goodsClassifyRef,
      goodsRef,
      customLinkRef,
      cancel,
      confirm
    }
  }
})
</script>

<style scoped lang="scss">
$tabs-height: 480px;

.el-tabs {
  height: $tabs-height;

  ::v-deep {
    .el-tabs__header {
      .el-tabs__active-bar {
        background-color: #F9612E;
      }

      .el-tabs__item {
        &:hover, &.is-active {
          color: #F9612E;
        }

        &.is-disabled {
          color: #C0C4CC;
          cursor: not-allowed;
        }
      }
    }
  }
}

.tab-pane-cont {
  height: $tabs-height;
  padding-left: 6px;
  overflow-y: auto;
}

.button-group {
  padding-top: 25px;
  text-align: right;
  border-top: 2px solid #EEEEEE;

  .el-button {
    padding: 0 20px;
  }
}
</style>