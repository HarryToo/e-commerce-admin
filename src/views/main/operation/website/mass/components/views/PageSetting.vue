<template>
  <div class="page-edit">
    <div class="top">
      <div class="last-update-time text-cut-1">最近保存时间：{{ $store.state.decoration.massWebsite.updateTime || '无' }}</div>
      <el-button size="small" type="primary" @click="saveConfigs">保存</el-button>
      <el-button size="small" class="custom" @click="publishConfigs">发布</el-button>
    </div>
    <div class="bottom">
      <div class="bottom-content">
        <!--首页-->
        <div v-show="pageIndex === 0">
          <logo-config v-show="moduleIndex === 0"></logo-config>
          <classify-config v-show="moduleIndex === 1"></classify-config>
          <banner-config v-show="moduleIndex === 2"></banner-config>
          <!--楼层区域动态组件-->
          <keep-alive>
            <component :is="floorComponent" v-show="moduleIndex === 3"></component>
          </keep-alive>
          <base-goods-list-config v-show="moduleIndex === 4"></base-goods-list-config>
        </div>
        <!--专场频道-->
        <special-channel-config v-show="pageIndex === 1"></special-channel-config>
        <!--排行榜单-->
        <leader-board-config v-show="pageIndex === 2"></leader-board-config>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent, inject} from 'vue'
import {useStore} from 'vuex'
import {ElMessage, ElMessageBox} from 'element-plus'
// 首页部分
import LogoConfig from '../settings/homepage/LogoConfig'
import ClassifyConfig from '../settings/homepage/ClassifyConfig'
import BannerConfig from '../settings/homepage/BannerConfig'
import FloorStyle1Config from '../settings/homepage/floor/FloorStyle1Config'
import FloorStyle2Config from '../settings/homepage/floor/FloorStyle2Config'
import FloorStyle3Config from '../settings/homepage/floor/FloorStyle3Config'
import FloorStyle4Config from '../settings/homepage/floor/FloorStyle4Config'
import BaseGoodsListConfig from '../settings/homepage/BaseGoodsListConfig'
// 专场频道
import SpecialChannelConfig from '../settings/SpecialChannelConfig'
// 排行榜单
import LeaderBoardConfig from '../settings/LeaderBoardConfig'

export default defineComponent({
  name: "PageSetting",
  components: {
    LogoConfig,
    ClassifyConfig,
    BannerConfig,
    FloorStyle1Config,
    FloorStyle2Config,
    FloorStyle3Config,
    FloorStyle4Config,
    BaseGoodsListConfig,
    SpecialChannelConfig,
    LeaderBoardConfig
  },
  setup() {
    const store = useStore()
    // 选中的页面序号
    const pageIndex = inject('pageIndex')
    // 页面上选中的模块（0:logo,1:分类,2:banner,3:可活动楼层区域,4:底部商品列表）
    const moduleIndex = inject('moduleIndex')
    // 可活动楼层板块序号
    const floorIndex = inject('floorIndex')

    // 动态获取选中楼层板块类型对应的配置栏组件名
    const floorComponent = computed(() => {
      const compNameArr = ['floor-style1-config', 'floor-style2-config', 'floor-style3-config', 'floor-style4-config']
      const floorType = store.state.decoration.massWebsite.homepage.floor[floorIndex.value].type
      return compNameArr[floorType - 1]
    })

    // 保存配置
    const saveConfigs = () => {
      ElMessageBox.confirm('请确保必要的配置完整且正确，确认保存？', '保存网站装修（大众版）配置', {type: 'info'}).then(async () => {
        const {code} = await store.dispatch('decoration/massWebsite/saveAllConfigs')
        if (code === 200) {
          ElMessage.success('网站装修（大众版）配置保存成功')
        }
      }).catch(() => {
      })
    }
    // 发布配置
    const publishConfigs = async () => {
      ElMessageBox.confirm('此操作将正式启用当前配置，请确保必要的配置完整且正确，确认发布？', '发布网站装修（大众版）配置', {type: 'warning'}).then(async () => {
        const {code} = await store.dispatch('decoration/massWebsite/publishAllConfigs')
        if (code === 200) {
          ElMessage.success('网站装修（大众版）配置发布成功')
        }
      }).catch(() => {
      })
    }

    return {
      pageIndex,
      moduleIndex,
      floorIndex,
      floorComponent,
      saveConfigs,
      publishConfigs
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