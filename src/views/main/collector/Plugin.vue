<template>
  <div
      style="height: 100%;padding: 25px;display: flex;flex-direction: column;justify-content: center;align-items: center;">
    <div style="width: 550px;">
      <div class="download">
        <i class="el-icon-download icon"></i>
        <el-button class="custom" @click="downloadPlugin">下载采集插件</el-button>
      </div>
      <div class="tips">
        <div class="title">插件采集操作流程：</div>
        <ol>
          <li>点击下载采集插件并安装</li>
          <li>在已安装插件的浏览器中打开要采集的货源平台</li>
          <li>选择要采集的商品，支持多选后批量采集</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "CollectorPlugin",
  setup() {
    const downloadPlugin = () => {

    }

    return {
      downloadPlugin
    }
  }
})
</script>

<style scoped lang="scss">
.download {
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #FAFAFA;
  border: 1px solid #EEEEEE;
  border-radius: 4px;

  .icon {
    margin-bottom: 50px;
    font-size: 100px;
    color: #409EFF;
  }
}

.tips {
  margin-top: 50px;
  font-size: 14px;
  color: #555555;

  .title {
    line-height: 28px;
    font-weight: bold;
  }

  ol {
    line-height: 24px;
    list-style-position: inside;
  }
}
</style>