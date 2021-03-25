<template>
  <router-view></router-view>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  overflow: hidden;

  #app {
    width: 100vw;
    height: 100vh;
    background-color: #F5F5F5;
  }
}
</style>
