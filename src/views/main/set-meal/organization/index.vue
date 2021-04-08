<template>
  <div class="set-meal-wrapper">
    <el-tabs type="border-card">
      <el-tab-pane v-for="item in setMealList" :key="item.id">
        <template #label>
          <span>
            <span style="padding-right: 6px;">{{ item.name }}</span>
            <i class="el-icon-edit-outline"></i>
          </span>
        </template>
        <div class="tab-column-cont">
          <h3>套餐信息</h3>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import $api from '@/api'

export default defineComponent({
  name: "OrganizationSetMeal",
  setup() {
    let setMealList = ref([])
    const getSetMealList = async () => {
      const {list} = await $api.setMealApi.organization.getList()
      setMealList.value = list
    }
    getSetMealList()

    return {
      setMealList
    }
  }
})
</script>

<style scoped lang="scss">
.set-meal-wrapper {
  height: 100%;
  border-radius: 4px;
  overflow: hidden;

  ::v-deep .el-tabs--border-card {
    border: none;
    box-shadow: none;

    .el-tabs__header {
      background-color: #EEEEEE;
      border: none;

      .el-tabs__item {
        border: none;
        border-top: 2px solid transparent;

        &:hover {
          color: #F9612E;
        }

        &.is-active {
          color: #F9612E;
          border-color: #F9612E;
        }
      }
    }

    .el-tabs__content {
      padding: 25px;
    }
  }

  .tab-column-cont {
    padding: 20px 0;
  }
}
</style>