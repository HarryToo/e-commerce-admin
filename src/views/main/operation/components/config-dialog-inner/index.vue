<template>
  <div class="config-dialog-inner">
    <el-tabs tab-position="left" v-model="tabIndex">
      <el-tab-pane name="1" label="跳转分类" :disabled="!usableTab.includes(1)">
        <div class="tab-pane-cont">
          <goods-classify :classify="tabIndex === '1' && type === 1 ? data : null" ref="goodsClassifyRef"
                          @confirm="$emit('confirm', $event)"></goods-classify>
        </div>
      </el-tab-pane>
      <el-tab-pane name="2" label="跳转商品" :disabled="!usableTab.includes(2)">
        <div class="tab-pane-cont">
          <goods :goods="tabIndex === '2' && type === 2 ? data : null" ref="goodsRef"
                 @confirm="$emit('confirm', $event)"></goods>
        </div>
      </el-tab-pane>
      <el-tab-pane name="3" label="跳转专题" :disabled="!usableTab.includes(3)">
        <div class="tab-pane-cont">
          <special-subject :id="tabIndex === '3' && type === 3 ? data : ''"
                           ref="specialSubjectRef" @confirm="$emit('confirm', $event)"></special-subject>
        </div>
      </el-tab-pane>
      <el-tab-pane name="4" label="自定义链接" :disabled="!usableTab.includes(4)">
        <div class="tab-pane-cont">
          <custom-link :link="tabIndex === '4' && type === 4 ? data : ''" ref="customLinkRef"
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
import SpecialSubject from './SpecialSubject'
import CustomLink from './CustomLink'

export default defineComponent({
  name: "ConfigDialogInner",
  components: {
    GoodsClassify,
    Goods,
    SpecialSubject,
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
    // 当前值类型
    type: {
      type: [String, Number],
      default: 1
    },
    // 需要回填的数据
    data: {
      type: [Object, Array, String, Number],
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
    const specialSubjectRef = ref()
    const customLinkRef = ref()

    // 点击取消按当前已有值类型调用内部tab组件重置
    const cancel = () => {
      switch (props.type) {
        case 1:
          goodsRef.value.reset()
          specialSubjectRef.value.reset()
          customLinkRef.value.reset()
          break
        case 2:
          goodsClassifyRef.value.reset()
          specialSubjectRef.value.reset()
          customLinkRef.value.reset()
          break
        case 3:
          goodsClassifyRef.value.reset()
          goodsRef.value.reset()
          customLinkRef.value.reset()
          break
        case 4:
          goodsClassifyRef.value.reset()
          goodsRef.value.reset()
          specialSubjectRef.value.reset()
          break
      }
      // 重置当前激活展示的tab为已有的值类型
      tabIndex.value = props.type === '' ? props.usableTab[0].toString() : props.type.toString()
      closeDialog()
    }
    // 点击确定调用当前激活的类型内部tab组件保存
    const confirm = () => {
      switch (tabIndex.value) {
        case '1':
          goodsClassifyRef.value.save()
          goodsRef.value.reset()
          specialSubjectRef.value.reset()
          customLinkRef.value.reset()
          break
        case '2':
          goodsRef.value.save()
          goodsClassifyRef.value.reset()
          specialSubjectRef.value.reset()
          customLinkRef.value.reset()
          break
        case '3':
          specialSubjectRef.value.save()
          goodsClassifyRef.value.reset()
          goodsRef.value.reset()
          customLinkRef.value.reset()
          break
        case '4':
          customLinkRef.value.save()
          goodsClassifyRef.value.reset()
          goodsRef.value.reset()
          specialSubjectRef.value.reset()
          break
      }
    }

    provide('tabIndex', tabIndex)

    return {
      tabIndex,
      goodsClassifyRef,
      goodsRef,
      specialSubjectRef,
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