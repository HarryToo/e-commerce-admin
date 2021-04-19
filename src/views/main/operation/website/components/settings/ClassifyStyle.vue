<template>
  <el-carousel height="195px" indicator-position="none" :autoplay="false">
    <el-carousel-item v-for="(subOptions, index) in styleOptions" :key="index">
      <div class="style-list">
        <div class="style-item" v-for="option in subOptions" :key="option.id"
             :class="{active: selectedId === option.id}" @click="selectedId = option.id">
          <i class="el-icon-check"></i>
          <el-image :src="option.img" fit="contain" class="style-img"></el-image>
          <div class="style-name text-cut-1" :title="option.name">{{ option.name }}</div>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import {defineComponent, ref} from 'vue'

export default defineComponent({
  name: "ClassifyStyleSetting",
  setup() {
    const styleOptions = [
      [
        {
          id: 1,
          img: 'http://dummyimage.com/150x170/EEEEEE',
          name: '样式1：xxxx'
        },
        {
          id: 2,
          img: 'http://dummyimage.com/150x170/EEEEEE',
          name: '样式2：xxxx'
        },
        {
          id: 3,
          img: 'http://dummyimage.com/150x170/EEEEEE',
          name: '样式3：xxxx'
        }
      ],
      [
        {
          id: 4,
          img: 'http://dummyimage.com/150x170/EEEEEE',
          name: '样式4：xxxx'
        },
        {
          id: 5,
          img: 'http://dummyimage.com/150x170/EEEEEE',
          name: '样式5：xxxx'
        }
      ]
    ]

    const selectedId = ref(1)

    return {
      styleOptions,
      selectedId
    }
  }
})
</script>

<style scoped lang="scss">
.style-list {
  height: 100%;
  padding: 0 10px;
  display: flex;
  background-color: #FFFFFF;

  .style-item {
    position: relative;
    width: calc((100% - 40px) / 3);
    height: 100%;
    margin-right: 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    .el-icon-check {
      display: none;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      color: #FFFFFF;
      background-color: #F9612E;
      border-radius: 0 4px;
    }

    .style-img {
      width: 100%;
      height: 170px;
      border-radius: 4px;
      border: 1px solid transparent;
    }

    .style-name {
      width: 100%;
      text-align: center;
      font-size: 12px;
      color: #999999;
    }

    &.active {
      .el-icon-check {
        display: block;
      }

      .style-img {
        border-color: #F9612E;
      }
    }
  }
}

::v-deep {
  .el-carousel__arrow--left {
    left: 0;
    width: 25px;
    height: 25px;
  }

  .el-carousel__arrow--right {
    right: 0;
    width: 25px;
    height: 25px;
  }
}
</style>