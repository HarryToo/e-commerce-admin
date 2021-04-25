<template>
  <div class="page-edit">
    <div class="top">
      <div class="last-update-time text-cut-1">最后修改时间：2021-01-30 17:08:21</div>
      <el-button size="small" type="primary">保存</el-button>
      <el-button size="small" class="custom">发布</el-button>
    </div>
    <div class="bottom">
      <div class="bottom-content">
        <div v-show="pageIndex === 0">
          <logo-config v-show="moduleIndex === 0"></logo-config>
          <classify-config v-show="moduleIndex === 1"></classify-config>
          <banner-config v-show="moduleIndex === 2"></banner-config>
          <!--楼层区域动态组件-->
          <keep-alive>
            <component :is="floorComponent" v-show="moduleIndex === 3"></component>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent, inject} from 'vue'
import {useStore} from 'vuex'
import LogoConfig from '../settings/homepage/LogoConfig'
import ClassifyConfig from '../settings/homepage/ClassifyConfig'
import BannerConfig from '../settings/homepage/BannerConfig'
import FloorStyle1Config from '../settings/homepage/floor/FloorStyle1Config'
import FloorStyle2Config from '../settings/homepage/floor/FloorStyle2Config'
import FloorStyle3Config from '../settings/homepage/floor/FloorStyle3Config'
import FloorStyle4Config from '../settings/homepage/floor/FloorStyle4Config'

export default defineComponent({
  name: "PageSetting",
  components: {
    LogoConfig,
    ClassifyConfig,
    BannerConfig,
    FloorStyle1Config,
    FloorStyle2Config,
    FloorStyle3Config,
    FloorStyle4Config
  },
  setup() {
    const store = useStore()
    // 选中的页面序号
    const pageIndex = inject('pageIndex')
    // 页面上选中的模块（0:logo,1:分类,2:banner,3:可活动楼层区域,4:推荐商品列表）
    const moduleIndex = inject('moduleIndex')
    // 可活动楼层板块序号
    const floorIndex = inject('floorIndex')

    // 动态获取选中楼层板块类型对应的配置栏组件名
    const floorComponent = computed(() => {
      const compNameArr = ['floor-style1-config', 'floor-style2-config', 'floor-style3-config', 'floor-style4-config']
      const floorType = store.state.decoration.massWebsite.homePage.floor[floorIndex.value].type
      return compNameArr[floorType - 1]
    })

    return {
      pageIndex,
      moduleIndex,
      floorIndex,
      floorComponent
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
    }
  }
}
</style>