<template>
  <div class="goods-selector">
    <div class="search-header">
      <el-form :model="search.form" ref="searchRef" size="mini" inline>
        <el-form-item prop="classify" style="margin-bottom: 0;">
          <el-cascader v-model="search.form.classify" :options="search.options.classify" placeholder="请选择商品分类"
                       :props="{expandTrigger: 'hover', value: 'id', label: 'name'}"></el-cascader>
        </el-form-item>
        <el-form-item prop="name" style="margin-bottom: 0;">
          <el-input v-model="search.form.name" placeholder="请输入商品ID/名称"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 0;">
          <el-button class="custom" @click="search.search">查询</el-button>
          <el-button @click="search.reset">清空条件</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="goods-list">
      <select-group v-model="tableData.selectedIds" :list="tableData.list" single-selected>
        <template #default="scope">
          <square-goods-item :goods="scope.item"></square-goods-item>
        </template>
      </select-group>
    </div>
    <div class="pagination-footer">
      <el-pagination :current-page="page.index" :page-size="10" small layout="total, prev, pager, next, jumper"
                     :total="tableData.total" @current-change="page.indexChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent, inject, reactive, ref, watch} from 'vue'
import {useStore} from 'vuex'
import {ElLoading, ElMessage} from 'element-plus'
import $api from '@/api'
import SelectGroup from '@/components/common/SelectGroup'
import SquareGoodsItem from '@/components/goods/SquareGoodsItem'

export default defineComponent({
  name: "GoodsSelector",
  components: {
    SelectGroup,
    SquareGoodsItem
  },
  props: {
    // 需要回填的数据（商品数据）
    goodsId: {
      type: [String, Number],
      default: ''
    }
  },
  emits: ['confirm'],
  setup(props, {emit}) {
    const closeDialog = inject('closeDialog')

    const store = useStore()
    const searchRef = ref()
    const search = reactive({
      form: {
        classify: [''],
        name: ''
      },
      options: {
        classify: computed(() => store.getters['goods/classifyOptionTree'])
      },
      search() {
        page.index = 1
        tableData.getList()
      },
      reset() {
        searchRef.value.resetFields()
        page.index = 1
        tableData.getList()
      }
    })

    const page = reactive({
      index: 1,
      size: 10,
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
      selectedIds: props.goodsId ? [props.goodsId] : [],
      selectedGoods: computed(() => tableData.list.find(item => item.id === tableData.selectedIds[0])),
      getList: async () => {
        const {list, total} = await $api.goodsApi.platformLibrary.getList({
          page: page.index,
          pageSize: page.size,
          name: search.form.name,
          level_1: search.form.classify[0] || '',
          level_2: search.form.classify[1] || '',
          level_3: search.form.classify[2] || '',
          dialogLoading: true
        })
        tableData.list = list
        tableData.total = total
      }
    })
    tableData.getList()

    watch(() => props.goodsId, (goodsId) => {
      tableData.selectedIds = goodsId ? [goodsId] : []
    })

    const reset = () => {
      tableData.selectedIds = props.goodsId ? [props.goodsId] : []
    }

    const save = () => {
      if (tableData.selectedIds.length) {
        emit('confirm', {
          type: 2,
          value: tableData.selectedIds[0],
          // 抛出选择的商品（只用于选择后回显）
          goods: tableData.selectedGoods
        })
        closeDialog()
      } else {
        ElMessage.error('请选择商品')
      }
    }

    return {
      searchRef,
      search,
      page,
      tableData,
      reset,
      save
    }
  }
})
</script>

<style scoped lang="scss">
.goods-selector {
  height: 100%;
  padding-bottom: 10px;

  .search-header {
    padding-bottom: 10px;
    border-bottom: 1px solid #EEEEEE;
  }

  .goods-list {
    height: calc(100% - 29px - 26px - 20px);
    overflow-y: auto;
  }

  .pagination-footer {
    padding-top: 10px;
    border-top: 1px solid #EEEEEE;

    .el-pagination {
      margin-top: 0;
    }
  }
}
</style>