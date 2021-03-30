<template>
  <router-view v-slot="{ Component }">
    <transition name="el-fade-in-linear" mode="out-in">
      <component :is="Component"/>
    </transition>
  </router-view>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style lang="scss">
*:not([class^=el-]) {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-size: 14px;
  overflow: hidden;

  #app {
    width: 100vw;
    height: 100vh;
    background-color: #F5F5F5;

    //圆角白底
    .block-view {
      background-color: #FFFFFF;
      border-radius: 4px;
    }
  }
}

.text-cut-1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.text-cut-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.text-cut-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

//.el-date-editor .el-range-separator
</style>
