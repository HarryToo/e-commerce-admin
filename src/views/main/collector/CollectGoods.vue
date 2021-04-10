<template>
  <div style="padding: 25px;">
    <el-form ref="collectForm" :model="formData" label-position="top" :rules="rules">
      <el-form-item label="货品链接" prop="url">
        <el-input type="textarea" :autosize="{minRows: 10, maxRows: 20}" resize="none" v-model="formData.url"
                  placeholder="请输入货品链接地址，多条链接地址请逐条换行"></el-input>
      </el-form-item>
      <el-form-item label="货源平台">
        <div class="platform-list">
          <el-space wrap>
            <el-avatar v-for="item in platformList" :key="item.id" :src="item.logo" size="medium" fit="cover"
                       :title="item.name" class="platform-item" @click="openPlatformUrl(item.url)"></el-avatar>
          </el-space>
        </div>
      </el-form-item>
      <el-form-item style="margin-top: 60px;">
        <el-button class="custom" @click="startCollect">开始采集</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {defineComponent, ref, reactive} from 'vue'
import {useRouter} from 'vue-router'
import {ElMessageBox} from 'element-plus'
import $api from '@/api'

export default defineComponent({
  name: "CollectGoods",
  setup() {
    const router = useRouter()

    const collectForm = ref()
    const rules = {
      url: [
        {required: true, message: '请输入货品链接地址'},
        {pattern: /^((http|https):\/\/\S+(\n|\r)?)+$/, message: '请输入正确的网址，逐条换行'}
      ]
    }
    const formData = reactive({
      url: ''
    })

    const platformList = ref([])

    const getPlatformList = async () => {
      const {list} = await $api.collectorApi.getPlatformList()
      platformList.value = list
    }
    getPlatformList()

    const startCollect = async () => {
      if (await collectForm.value.validate()) {
        const {code} = await $api.collectorApi.collectViaGoods({
          url: formData.url
        })
        if (code === 200) {
          ElMessageBox.confirm('你可以前往个人采集库查看或继续采集', '正在执行采集...', {
            type: 'success',
            confirmButtonText: '前往查看',
            cancelButtonText: '继续采集'
          }).then(() => {
            router.push('/main')
          }).catch(() => {
          })
        }
      }
    }

    const openPlatformUrl = (url) => {
      window.open(url)
    }

    return {
      collectForm,
      rules,
      formData,
      platformList,
      startCollect,
      openPlatformUrl
    }
  }
})
</script>

<style scoped lang="scss">
.platform-list {
  display: flex;
  list-style: none;

  ::v-deep .el-space__item {
    line-height: 25px;
    padding-bottom: 0 !important;
  }

  .platform-item {
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      transform: scale(1.06);
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }
  }
}
</style>