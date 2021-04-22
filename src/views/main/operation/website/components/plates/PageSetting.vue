<template>
  <div class="page-edit">
    <div class="top">
      <div class="last-update-time text-cut-1">最后修改时间：2021-01-30 17:08:21</div>
      <el-button size="small" type="primary">保存</el-button>
      <el-button size="small" class="custom">发布</el-button>
    </div>
    <div class="bottom">
      <div class="bottom-content">
        <div class="tabs-content-item">
          <logo-config v-show="pageIndex === 0 && moduleIndex === 0"></logo-config>
          <classify-config v-show="pageIndex === 0 && moduleIndex === 1"></classify-config>
          <banner-config v-show="pageIndex === 0 && moduleIndex === 2"></banner-config>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, inject} from 'vue'
import LogoConfig from '../settings/LogoConfig'
import ClassifyConfig from '../settings/ClassifyConfig'
import BannerConfig from '../settings/BannerConfig'

export default defineComponent({
  name: "PageSetting",
  components: {
    LogoConfig,
    ClassifyConfig,
    BannerConfig
  },
  setup() {
    const pageIndex = inject('pageIndex')
    const moduleIndex = inject('moduleIndex')

    return {
      pageIndex,
      moduleIndex
    }
  }
})
</script>

<style scoped lang="scss">
.page-edit {
  width: calc((100% - 20px - 765px) * 0.6666);

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
    padding: 20px;
    background-color: #FFFFFF;
    border-radius: 4px;

    .bottom-content {
      height: 100%;
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