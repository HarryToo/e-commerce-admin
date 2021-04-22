<template>
  <div style="height: 100%;display: flex;flex-direction: column;">
    <table-options-header>
      <el-form :model="search.form" ref="searchForm" size="small" inline>
        <el-space size="medium">
          <el-form-item label="商品名称" prop="name" style="margin-bottom: 0;">
            <el-input v-model="search.form.name" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="classify" style="margin-bottom: 0;">
            <el-cascader v-model="search.form.classify" :options="search.options.classify" placeholder="请选择商品分类"
                         :props="{expandTrigger: 'hover', value: 'id', label: 'name'}"></el-cascader>
          </el-form-item>
          <el-form-item label="排序方式" prop="sort" style="margin-bottom: 0;">
            <el-select v-model="search.form.sort" placeholder="请选择排序方式">
              <el-option v-for="item in search.options.sort" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-bottom: 0;">
            <el-button class="custom" @click="search.search">查询</el-button>
            <el-button @click="search.reset">清空条件</el-button>
          </el-form-item>
        </el-space>
      </el-form>
      <template #right>
        <el-button class="custom" size="small" :disabled="!tableData.selectedIds.length" @click="tableData.add">添加所选
        </el-button>
      </template>
    </table-options-header>
    <div style="flex-grow: 1;padding: 25px;display: flex;flex-direction: column;justify-content: space-between;">
      <div class="goods-list" :style="{height: $getTableHeight() + 'px'}">
        <select-group v-model="tableData.selectedIds" :list="tableData.list">
          <template #default="scope">
            <square-goods-item :goods="scope.item"></square-goods-item>
          </template>
        </select-group>
      </div>
      <table-pagination-footer :page-index="page.index" :page-size="page.size" :total="tableData.total"
                               @size-change="page.sizeChange" @index-change="page.indexChange">
      </table-pagination-footer>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref, reactive, computed} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import {ElMessage} from 'element-plus'
import SelectGroup from '@/components/common/SelectGroup'
import SquareGoodsItem from '@/components/goods/SquareGoodsItem'
import $api from '@/api'

export default defineComponent({
  name: "AddGoods",
  components: {
    SelectGroup,
    SquareGoodsItem
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const searchForm = ref()

    const exportLoading = ref(false)

    const search = reactive({
      form: {
        name: '',
        classify: [''],
        sort: 1
      },
      options: {
        classify: computed(() => store.getters['goods/classifyOptionTree']),
        sort: [
          {
            value: 1,
            label: '入库时间倒序排列'
          }, {
            value: 2,
            label: '入库时间正序排列'
          }, {
            value: 3,
            label: '总库存从高到低'
          }, {
            value: 4,
            label: '总库存从低到高'
          }, {
            value: 5,
            label: '被铺货数从高到低'
          }, {
            value: 6,
            label: '被铺货数从低到高'
          }, {
            value: 7,
            label: '被采购数从高到低'
          }, {
            value: 8,
            label: '被采购数从低到高'
          }
        ]
      },
      search() {
        page.index = 1
        tableData.getList()
      },
      reset() {
        searchForm.value.resetFields()
        page.index = 1
        tableData.getList()
      }
    })

    const page = reactive({
      index: 1,
      size: 15,
      sizeChange(size) {
        page.size = size
        tableData.getList()
      },
      indexChange(index) {
        page.index = index
        tableData.getList()
      }
    })

    const tableData = reactive({
      list: [],
      total: 0,
      selectedIds: [],
      getList: async () => {
        const {list, total} = await $api.goodsApi.platformLibrary.getList({
          specialId: route.query.specialId,
          page: page.index,
          pageSize: page.size,
          name: search.form.name,
          sort: search.form.sort,
          level_1: search.form.classify[0] || '',
          level_2: search.form.classify[1] || '',
          level_3: search.form.classify[2] || ''
        })
        tableData.list = list
        tableData.total = total
      },
      add: async () => {
        const {code} = await $api.operationApi.special.add({
          id: tableData.selectedIds
        })
        if (code === 200) {
          ElMessage.success(`已添加${tableData.selectedIds.length}项商品`)
          tableData.selectedIds = []
          tableData.getList()
        }
      }
    })

    tableData.getList()

    return {
      searchForm,
      exportLoading,
      search,
      page,
      tableData
    }
  }
})
</script>

<style scoped lang="scss">
.goods-list {
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
}
</style>