<template>
  <div style="height: 100%;padding: 25px;">
    <div style="height: 100%;overflow-y: auto;">
      <div v-permission="[$route, 'edit']">
        <h3>常规配置</h3>
        <el-form v-model="config.formData" size="small" label-suffix="：" label-position="left"
                 label-width="82px"
                 style="padding-left: 30px;">
          <el-form-item label="价格设置">
            <div>
              <span class="supplement-text">货源平台商品，选择</span>
              <el-select v-model="config.formData.supplyPlatformPrice">
                <el-option :value="1" label="采集销售价"></el-option>
                <el-option :value="2" label="采集批发价"></el-option>
              </el-select>
            </div>
            <div style="margin-top: 15px;">
              <span class="supplement-text">零售平台商品，选择</span>
              <el-select v-model="config.formData.retailPlatformPrice">
                <el-option :value="1" label="采集销售价"></el-option>
                <el-option :value="2" label="采集折扣价"></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="库存设置">
            <span class="supplement-text">若来源SKU库存低于</span>
            <el-input v-model.number="config.formData.skuInventoryThreshold" placeholder="请输入阈值"
                      style="width: 200px;"></el-input>
            <span class="supplement-text">时，则将它设置为0</span>
          </el-form-item>
          <el-form-item label="跳过项">
            <el-checkbox-group v-model="config.formData.skipOptions">
              <el-checkbox :label="1">跳过已采集商品</el-checkbox>
              <el-checkbox :label="2">跳过已下架商品</el-checkbox>
              <el-checkbox :label="3">跳过不包邮商品</el-checkbox>
              <el-checkbox :label="4">跳过预售商品</el-checkbox>
              <el-checkbox :label="5">跳过0库存的SKU</el-checkbox>
            </el-checkbox-group>
            <hr style="height: 1px;margin-bottom: 14px;border: none;border-bottom: 1px dashed #EEEEEE;">
            <div>
              <span class="supplement-text">跳过总库存低于</span>
              <el-input v-model.number="config.formData.skipInventoryThreshold" placeholder="请输入阈值"
                        style="width: 200px;"></el-input>
              <span class="supplement-text">的商品</span>
            </div>
          </el-form-item>
        </el-form>
        <el-divider></el-divider>
      </div>
      <div>
        <h3>货源平台配置</h3>
        <div class="platform-list">
          <div class="platform-item" v-for="(item, index) in platform.list" :key="item.id"
               @click="platform.currUploadIndex = index">
            <el-space>
              <el-upload :action="$uploadAction" class="upload-btn" :on-success="platform.uploadSuccess">
                <el-image v-if="item.logo" :src="item.logo" lazy fit="contain" class="logo"></el-image>
                <div class="placeholder" v-else>
                  <i class="el-icon-plus upload-icon"></i>
                  <span>平台LOGO</span>
                </div>
              </el-upload>
              <el-input v-model="item.name" placeholder="请输入平台名称" size="small" style="width: 200px;"></el-input>
              <el-select v-model="item.type" placeholder="请选择平台类型" size="small">
                <el-option :value="1" label="货源平台"></el-option>
                <el-option :value="2" label="零售平台"></el-option>
              </el-select>
              <el-input v-model="item.url" clearable placeholder="请输入平台URL地址" size="small"
                        style="width: 300px;"></el-input>
              <el-button type="danger" icon="el-icon-delete" size="small" title="删除"
                         @click="platform.del(index)"></el-button>
            </el-space>
          </div>
          <el-button size="small" style="margin-top: 20px;" @click="platform.add">新增一条</el-button>
        </div>
      </div>
      <div style="margin: 60px 0 20px;">
        <el-button class="custom" size="small" @click="save">保存生效</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, reactive} from 'vue'
import {ElMessage} from 'element-plus'
import $api from "@/api"

export default defineComponent({
  name: "CollectorConfig",
  setup() {
    const config = reactive({
      formData: {
        supplyPlatformPrice: 1,
        retailPlatformPrice: 1,
        skuInventoryThreshold: '',
        skipOptions: [1, 2, 4, 5],
        skipInventoryThreshold: ''
      },
      getConfigs: async () => {
        config.formData = await $api.collectorApi.getConfigs()
      }
    })
    config.getConfigs()

    const platform = reactive({
      list: [],
      currUploadIndex: 0,
      getList: async () => {
        const {list} = await $api.collectorApi.getPlatformList()
        platform.list = list
      },
      add() {
        platform.list.push({
          logo: '',
          name: '',
          type: 1,
          url: ''
        })
      },
      del(index) {
        platform.list.splice(index, 1)
      },
      uploadSuccess({code, url}, file) {
        if (code === 200) {
          platform.list[platform.currUploadIndex].logo = url
        }
      }
    })
    platform.getList()

    const save = async () => {
      const {code} = await $api.collectorApi.save({
        configs: config.formData,
        platforms: platform.list
      })
      if (code === 200) {
        ElMessage.success('保存成功')
      }
    }

    return {
      config,
      platform,
      save
    }
  }
})
</script>

<style scoped lang="scss">
.supplement-text {
  padding: 0 5px;
  font-size: 14px;
  color: #555555;
}

.platform-list {
  padding-top: 10px;
  padding-left: 30px;

  .platform-item {
    margin-bottom: 10px;
    display: flex;
    align-items: center;

    .upload-btn {
      box-sizing: content-box;
      width: 44px;
      height: 44px;
      border-radius: 4px;
      overflow: hidden;
      border: 1px solid #EEEEEE;
      font-size: 0;

      .logo {
        width: 44px;
        height: 44px;
      }

      .placeholder {
        width: 44px;
        height: 44px;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 12px;
        color: #999999;
        background-color: #FAFAFA;

        i {
          transform: translateY(5px);
        }

        span {
          transform: scale(0.6);
        }
      }
    }
  }
}
</style>