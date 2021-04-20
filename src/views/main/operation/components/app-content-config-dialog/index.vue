<template>
  <el-dialog v-model="dialogVisible" title="内容数据配置" width="940px" custom-class="custom"
             :close-on-click-modal="false" destroy-on-close @close="$emit('update:modelValue', false)">
    <el-tabs tab-position="left" v-model="tabIndex">
      <el-tab-pane label="跳转分类" :disabled="!usableTab.includes(0)">
        <div class="tab-pane-cont">
          <goods-classify ref="goodsClassify"></goods-classify>
        </div>
      </el-tab-pane>
      <el-tab-pane label="跳转商品" :disabled="!usableTab.includes(1)">
        <div class="tab-pane-cont">
          跳转商品
        </div>
      </el-tab-pane>
      <el-tab-pane label="跳转专题" :disabled="!usableTab.includes(2)">
        <div class="tab-pane-cont">
          跳转专题
        </div>
      </el-tab-pane>
      <el-tab-pane label="自定义链接" :disabled="!usableTab.includes(3)">
        <div class="tab-pane-cont">
          自定义链接
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="button-group">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button size="small" class="custom" @click="confirm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {defineComponent, ref, watch} from 'vue'
import GoodsClassify from './GoodsClassify'

export default defineComponent({
  name: "AppContentConfigDialog",
  components: {
    GoodsClassify
  },
  props: {
    modelValue: Boolean,
    // 可选择的tab
    usableTab: {
      type: Array,
      default() {
        return [0, 1, 2, 3]
      }
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const dialogVisible = ref(props.modelValue)
    const tabIndex = ref(props.usableTab[0].toString())
    const goodsClassify = ref()

    watch(() => props.modelValue, (visible) => {
      dialogVisible.value = visible
    })

    const cancel = () => {
      goodsClassify.value.reset()
      dialogVisible.value = false
      emit('update:modelValue', false)
    }
    const confirm = () => {
      goodsClassify.value.save()
    }

    return {
      dialogVisible,
      tabIndex,
      goodsClassify,
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