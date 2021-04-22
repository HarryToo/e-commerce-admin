<template>
  <div class="preview">
    <div class="header">
      <h3>编辑页面：</h3>
      <span class="tips">下图仅供展示页面模块信息，实际效果根据配置的数据可能不同</span>
    </div>
    <div class="preview-img-wrapper">
      <div class="preview-img home-page" v-show="pageIndex === 0">
        <img src="/images/operation/website/static_top.jpg" alt="" class="static_top">
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
          <div class="rearrange-item" v-for="(item, index) in floorList" :key="index">
            <img :src="floorTypes[item.type - 1].previewImg" alt="" class="selectable floor_item"
                 :class="{selected: modelValue === 3}" :title="floorTypes[item.type - 1].title"
                 @click="$emit('update:modelValue', 3)">
            <div class="operate-group">
              <!--4中楼层类型均可排序-->
              <i class="el-icon-top" title="上移一层" v-if="index > 0" @click="moveUpFloorLevel(index)"></i>
              <!--可新增楼层类型为3/4板块-->
              <i class="el-icon-plus" :title="`新增“${floorTypes[item.type - 1].title}”板块`"
                 v-if="item.type === 3 || item.type === 4" @click="addFloorItem(index, item.type)"></i>
              <!--可删除楼层类型为3/4板块（单此类型板块数须大于1）-->
              <i class="el-icon-close" title="删除此板块"
                 v-if="(item.type === 3 || item.type === 4) && deletableFloorNums[item.type - 1] > 1"
                 @click="delFloorItem(index, item.type)"></i>
            </div>
          </div>
        </div>
        <img src="/images/operation/website/floor_5.jpg" alt="" class="selectable floor_item"
             :class="{selected: modelValue === 7}" title="为您推荐"
             @click="$emit('update:modelValue', 7)">
        <img src="/images/operation/website/footer.png" alt="" class="footer">
      </div>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent, inject, ref} from 'vue'
import {useStore} from 'vuex'
import massWebsite from "@/store/modules/decoration/massWebsite";

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
    // 页面上选中的模块编号
    modelValue: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:modelValue'],
  setup() {
    const store = useStore()
    const pageIndex = inject('pageIndex')
    const moduleIndex = ref(0)
    // 可活动楼层区域数据
    const floorList = ref(store.state.decoration.massWebsite.homePage.floor || [
      {
        type: 1,
        cover: {
          img: '',
          url: ''
        },
        goodsIds: []
      },
      {
        type: 2,
        cover: {
          img: '',
          url: ''
        },
        goodsIds: []
      },
      {
        type: 3,
        cover: {
          img: '',
          url: ''
        },
        goodsIds: []
      },
      {
        type: 4,
        cover: {
          img: '',
          url: ''
        },
        goodsIds: []
      }
    ])

    // 统计各楼层类型板块的总数
    const deletableFloorNums = computed(() => {
      const initialNums = floorList.value.map(() => 0)
      return floorList.value.reduce((totals, item) => {
        totals[item.type - 1]++
        return totals
      }, initialNums)
    })

    // 上移一层
    const moveUpFloorLevel = (index) => {
      if (index > 0) {
        const delArr = floorList.value.splice(index, 1)
        floorList.value.splice(index - 1, 0, delArr[0])
      }
    }
    // 新增楼层板块
    const addFloorItem = (index, type) => {
      floorList.value.splice(index + 1, 0, floorTypes[type - 1])
    }
    // 删除楼层板块
    const delFloorItem = (index, type) => {
      const currFloorTypeNum = floorList.value
      floorList.value.splice(index, 1)
    }

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

      .position {
        position: absolute;
        z-index: 1;
        background-color: rgba(255, 255, 255, 0.4);
      }

      .selectable {
        border: 1px dashed #CCCCCC;
        cursor: pointer;

        &:hover {
          border-color: #F9612E;
          background-color: rgba(255, 255, 255, 0.3);
        }

        &.selected {
          border-width: 2px;
          animation: selected-flicker 1s infinite;
        }
      }
    }

    .home-page {
      .static_top, .floor_item, .footer {
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