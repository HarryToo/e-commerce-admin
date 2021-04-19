<template>
  <div class="page-edit">
    <div class="top">
      <div class="last-update-time text-cut-1">最后修改时间：2021-01-30 17:08:21</div>
      <el-button size="small" type="primary">保存</el-button>
      <el-button size="small" class="custom">发布</el-button>
    </div>
    <div class="bottom">
      <div class="tabs-header">
        <div class="tabs-header-item" :class="{active: tabIndex === 0}" @click="tabIndex = 0">内容</div>
        <div class="tabs-header-item" :class="{active: tabIndex === 1}" @click="tabIndex = 1">样式</div>
      </div>
      <div class="tabs-content">
        <div class="tabs-content-item" v-show="tabIndex === 0">
          <logo-content v-show="pageIndex === 0 && moduleIndex === 0"></logo-content>
          <classify-content v-show="pageIndex === 0 && moduleIndex === 1"></classify-content>
        </div>
        <div class="tabs-content-item" v-show="tabIndex === 1">
          <classify-style v-show="pageIndex === 0 && moduleIndex === 1"></classify-style>
          <span class="tips" v-show="pageIndex === 0 && moduleIndex !== 1">暂无法设置此模块样式</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import LogoContent from '../settings/LogoContent'
import ClassifyContent from '../settings/ClassifyContent'
import ClassifyStyle from '../settings/ClassifyStyle'

export default defineComponent({
  name: "PageSetting",
  components: {
    LogoContent,
    ClassifyContent,
    ClassifyStyle
  },
  props: {
    // 选中的页面序号
    pageIndex: {
      type: Number,
      default: 0
    },
    // 页面上选中的模块
    moduleIndex: {
      type: Number,
      default: 0
    }
  },
  setup() {
    const tabIndex = ref(0)

    return {
      tabIndex
    }
  }
})
</script>

<style scoped lang="scss">
.page-edit {
  width: calc((100% - 20px) * 0.35);

  .top {
    height: 38px;
    display: flex;

    .last-update-time {
      flex-grow: 1;
      height: 38px;
      line-height: 38px;
      margin-right: 10px;
      padding: 0 20px;
      color: #666666;
      background-color: #FFFFFF;
      border-radius: 4px;
    }

    .el-button {
      padding: 0 30px;
    }
  }

  .bottom {
    height: calc(100% - 38px - 10px);
    margin-top: 10px;
    background-color: #FFFFFF;
    border-radius: 4px;

    .tabs-header {
      height: 44px;
      padding: 0 16%;
      display: flex;
      justify-content: space-around;
      border-bottom: 1px solid #EEEEEE;
      user-select: none;

      .tabs-header-item {
        height: 43px;
        line-height: 41px;
        padding: 0 6px;
        border-bottom: 2px solid transparent;
        cursor: pointer;
        transition: 0.2s;

        &:hover {
          color: #F9612E;
        }

        &.active {
          color: #F9612E;
          border-color: #F9612E;
        }
      }
    }

    .tabs-content {
      height: calc(100% - 44px);
      padding: 16px 20px 20px;
      overflow-y: auto;

      .tabs-content-item {
        .tips {
          color: #999999;
        }
      }
    }
  }
}
</style>