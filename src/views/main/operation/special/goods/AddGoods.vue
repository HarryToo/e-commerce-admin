<template>
  <div style="height: 100%;display: flex;flex-direction: column;">
    <table-options-header>
      <el-form :model="search.form" ref="searchForm" inline>
        <el-space size="medium">
          <el-form-item label="商品名称" prop="name" size="small" style="margin-bottom: 0;">
            <el-input v-model="search.form.name" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="classify" size="small" style="margin-bottom: 0;">
            <el-cascader v-model="search.form.classify" :options="search.options.classify" placeholder="请选择商品分类"
                         :props="{expandTrigger: 'hover'}" @change=""></el-cascader>
          </el-form-item>
          <el-form-item label="排序方式" prop="sort" size="small" style="margin-bottom: 0;">
            <el-select v-model="search.form.sort" placeholder="请选择排序方式">
              <el-option v-for="item in search.options.sort" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="small" style="margin-bottom: 0;">
            <el-button class="custom" @click="search.search">查询</el-button>
            <el-button @click="search.reset">清空条件</el-button>
          </el-form-item>
        </el-space>
      </el-form>
      <template #right>
        <el-button class="custom" size="small" :disabled="!tableData.selectionIds.length" @click="tableData.add">添加所选
        </el-button>
      </template>
    </table-options-header>
    <div style="flex-grow: 1;padding: 25px;display: flex;flex-direction: column;justify-content: space-between;">
      <div class="goods-list" :style="{height: $getTableHeight() + 'px'}">
        <square-goods-item choosable v-for="item in tableData.list" :key="item.id" :goods="item" @change="tableData.chooseChange"></square-goods-item>
      </div>
      <el-pagination small :current-page="page.index" :page-size="page.size" :page-sizes="[10, 15, 30, 50]"
                     layout="total, sizes, prev, pager, next, jumper" :total="tableData.total" class="custom"
                     @size-change="page.sizeChange" @current-change="page.indexChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref, reactive} from 'vue'
import {useRoute} from 'vue-router'
import {ElMessage} from 'element-plus'
import SquareGoodsItem from '@/components/goods/SquareGoodsItem'
import $api from '@/api'

export default defineComponent({
  name: "AddGoods",
  components: {
    SquareGoodsItem
  },
  setup() {
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
        classify: [
          {
            value: '',
            label: '全部'
          }
        ],
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
      },
      getClassifyOptions: async () => {
        const {list} = await $api.goodsApi.classify.getList()
        search.options.classify = search.options.classify.concat(list)
      }
    })

    search.getClassifyOptions()

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
      selectionIds: [],
      chooseChange({goods, checked}) {
        const id = goods.id
        if (checked) {
          tableData.selectionIds.push(id)
        } else {
          tableData.selectionIds.splice(tableData.selectionIds.indexOf(id), 1)
        }
      },
      getList: async () => {
        const {list, total} = await $api.goodsApi.platformLibrary.getList({
          specialId: route.query.specialId,
          page: page.index,
          pageSize: page.size,
          ...search.form
        })
        tableData.list = list
        tableData.total = total
      },
      add: async () => {
        const {code} = await $api.operationApi.special.add({
          id: tableData.selectionIds
        })
        if (code === 200) {
          ElMessage.success(`已添加${tableData.selectionIds.length}项商品`)
          tableData.selectionIds = []
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