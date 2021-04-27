<template>
  <div class="preview">
    <div class="header">
      <h3>编辑页面：</h3>
      <span class="tips">下图仅供展示页面及模块信息，实际效果根据配置的数据可能不同</span>
    </div>
    <div class="preview-img-wrapper">
      <!--首页-->
      <div class="preview-img home-page" v-show="pageIndex === 0">
        <img src="/images/operation/website/static_top.jpg" alt="" class="static">
        <img src="/images/operation/website/logo.png" alt="" class="selectable position logo"
             :class="{selected: modelValue === 0}" title="logo"
             @click="$emit('update:modelValue', 0)">
        <img src="/images/operation/website/classify.png" alt="" class="selectable position classify"
             :class="{selected: modelValue === 1}" title="分类导航"
             @click="$emit('update:modelValue', 1)">
        <img src="/images/operation/website/banner.png" alt="" class="selectable position banner"
             :class="{selected: modelValue === 2}" title="轮播图"
             @click="$emit('update:modelValue', 2)">
        <!--可活动楼层区域-->
        <div class="rearrange-list">
          <div class="rearrange-item" v-for="(item, index) in floorList" :key="item.id">
            <img :src="floorTypes[item.type - 1].previewImg" alt="" class="selectable floor_item"
                 :class="{selected: modelValue === 3 && floorIndex === index}"
                 :title="floorTypes[item.type - 1].title"
                 @click="$emit('update:modelValue', 3);$emit('update:floorIndex', index)">
            <div class="operate-group">
              <!--4种楼层类型均可排序-->
              <i class="el-icon-top" title="上移一层" v-if="index > 0" @click="moveUpFloorLevel(index)"></i>
              <!--可新增楼层类型为3/4板块-->
              <i class="el-icon-plus" :title="`新增“${floorTypes[item.type - 1].title}”板块`"
                 v-if="item.type === 3 || item.type === 4" @click="addFloorItem(index, item.type)"></i>
              <!--可删除楼层类型为3/4板块（单此类型板块数须大于1）-->
              <i class="el-icon-close" title="删除此板块"
                 v-if="(item.type === 3 || item.type === 4) && deletableFloorNums[item.type - 1] > 1"
                 @click="delFloorItem(index)"></i>
            </div>
          </div>
        </div>
        <img src="/images/operation/website/floor_5.jpg" alt="" class="selectable floor_item"
             :class="{selected: modelValue === 4}" title="为您推荐" @click="$emit('update:modelValue', 4)">
        <img src="/images/operation/website/footer.png" alt="" class="static">
      </div>
      <!--专场频道-->
      <div class="preview-img" v-show="pageIndex === 1">
        <img src="/images/operation/website/static_top.jpg" alt="" class="static">
      </div>
      <!--排行榜单-->
      <div class="preview-img" v-show="pageIndex === 2">
        <img src="/images/operation/website/banner.png" alt="" class="static">
      </div>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent, inject, ref, watch} from 'vue'
import {useStore} from 'vuex'
import {ElMessage, ElMessageBox} from "element-plus"

// 可活动楼层区域类型
const floorTypes = [
  {
    type: 1,
    previewImg: '/images/operation/website/floor_1.jpg',
    title: '发现好货'
  },
  {
    type: 2,
    previewImg: '/images/operation/website/floor_2.jpg',
    title: '特色货源'
  },
  {
    type: 3,
    previewImg: '/images/operation/website/floor_3.jpg',
    title: '楼层（风格一）'
  },
  {
    type: 4,
    previewImg: '/images/operation/website/floor_4.jpg',
    title: '楼层（风格二）'
  }
]

export default defineComponent({
  name: "PagePreview",
  props: {
    // 页面上选中的模块（0:logo,1:分类,2:banner,3:可活动楼层区域,4:底部商品列表）
    modelValue: {
      type: Number,
      default: 0
    },
    // 可活动楼层区域板块序号
    floorIndex: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:modelValue', 'update:floorIndex'],
  setup(props, {emit}) {
    const store = useStore()
    // 选中的页面序号
    const pageIndex = inject('pageIndex')
    // 页面上选中的模块（0:logo,1:分类,2:banner,3:可活动楼层区域,4:底部商品列表）
    const moduleIndex = ref(0)

    // 可活动楼层区域数据
    const floorList = computed(() => store.state.decoration.organizationWebsite.homepage.floor)
    // 统计各楼层类型板块的总数
    const deletableFloorNums = computed(() => store.getters['decoration/organizationWebsite/floorNumsGroupByType'])

    // 上移一层
    const moveUpFloorLevel = (index) => {
      store.commit('decoration/organizationWebsite/moveUpFloorLevel', index)
      // 若移动的是当前选中的板块
      if (props.floorIndex === index) {
        emit('update:floorIndex', index - 1)
      }
      // 若移动的是当前选中的板块的下面一个
      if (props.floorIndex === index - 1) {
        emit('update:floorIndex', index)
      }
      ElMessage.success('移动成功')
    }
    // 新增楼层板块（往下）
    const addFloorItem = (index, type) => {
      store.commit('decoration/organizationWebsite/addFloorItem', {index, type})
      // 若当前选中的板块在所增加板块下方
      if (props.floorIndex > index) {
        emit('update:floorIndex', props.floorIndex + 1)
      }
      ElMessageBox.confirm('新增成功，是否立即配置新板块的数据?', {type: 'success'}).then(() => {
        if (moduleIndex.value !== 3) {
          emit('update:modelValue', 3)
        }
        emit('update:floorIndex', index + 1)
      }).catch(() => {
      })
    }
    // 删除楼层板块
    const delFloorItem = (index) => {
      ElMessageBox.confirm('此操作将永久删除该板块及相应配置数据, 是否继续?', {type: 'warning'}).then(() => {
        store.commit('decoration/organizationWebsite/delFloorItem', index)
        // 若当前选中的板块在所删除板块下方
        if (props.floorIndex > index) {
          emit('update:floorIndex', props.floorIndex - 1)
        }
        ElMessage.success('删除成功')
      }).catch(() => {
      })
    }

    // 变动保存
    watch(floorList, (list) => {
      store.commit('decoration/organizationWebsite/saveFloorConfig', list)
    }, {deep: true})

    return {
      pageIndex,
      moduleIndex,
      floorList,
      floorTypes,
      deletableFloorNums,
      moveUpFloorLevel,
      addFloorItem,
      delFloorItem
    }
  }
})
</script>

<style>
/*选中框闪烁*/
@keyframes selected-flicker {
  0% {
    transform: scale(0.98);
    border-color: #F9612E;
  }
  50% {
    transform: scale(1);
    border-color: #FFFFFF;
  }
  100% {
    transform: scale(0.98);
    border-color: #F9612E;
  }
}
</style>
<style scoped lang="scss">
.preview {
  // 预览布局样式依赖此固定宽度
  width: 765px;
  height: 100%;
  margin-right: 10px;
  padding: 16px 20px 20px;
  background-color: #FFFFFF;
  border-radius: 4px;

  .header {
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    .tips {
      font-size: 12px;
      color: #999999;
    }
  }

  .preview-img-wrapper {
    height: calc(100% - 36px);
    font-size: 0;
    border: 1px solid #EEEEEE;
    border-radius: 4px;
    overflow-y: auto;

    .preview-img {
      position: relative;

      .static {
        display: block;
        width: 100%;
      }

      .position {
        position: absolute;
        z-index: 1;
        background-color: rgba(255, 255, 255, 0.4);
      }

      .selectable {
        border: 1px dashed #CCCCCC;
        cursor: pointer;
        transition: 0.2s;

        &:hover {
          border-color: #F9612E;
          background-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }

        &.selected {
          border-width: 2px;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          animation: selected-flicker 1s infinite;
        }
      }
    }

    .home-page {
      .floor_item {
        display: block;
        width: 100%;
      }

      .logo {
        top: 0;
        left: 17.2%;
        width: 116px;
      }

      .classify {
        top: 44px;
        left: 134px;
        z-index: 2;
        width: 106px;
      }

      .banner {
        top: 66px;
        left: 0;
        width: 100%;
      }

      .rearrange-list {
        .rearrange-item {
          position: relative;

          .operate-group {
            position: absolute;
            top: 50%;
            right: 20px;
            z-index: 1;
            transform: translateY(-50%);
            cursor: pointer;
            opacity: 0.2;
            transition: 0.2s;

            i {
              display: block;
              width: 20px;
              height: 20px;
              text-align: center;
              line-height: 20px;
              margin: 10px 0;
              font-size: 12px;
              color: #FFFFFF;
              background-color: #333333;
              border-radius: 50%;

              &:hover {
                background-color: #F9612E;
              }
            }
          }

          &:hover {
            .operate-group {
              opacity: 1;
            }
          }
        }
      }
    }
  }
}
</style>