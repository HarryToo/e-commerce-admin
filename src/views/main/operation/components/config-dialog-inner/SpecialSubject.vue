<template>
  <div class="special-subject-selector">
    <div class="search-header">
      <el-form :model="search.form" ref="searchRef" size="mini" inline>
        <el-form-item prop="name" style="margin-bottom: 0;">
          <el-input v-model="search.form.name" placeholder="请输入专题名称"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 0;">
          <el-button class="custom" @click="search.search">查询</el-button>
          <el-button @click="search.reset">清空条件</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="special-subject-list">
      <el-radio-group v-model="tableData.selectedId" style="display: block;">
        <el-table :data="tableData.list" stripe height="395" @current-change="tableData.selectedRowChange">
          <el-table-column label="专题名称" prop="name"></el-table-column>
          <el-table-column label="商品数" prop="goodsNum"></el-table-column>
          <el-table-column label="更新时间" prop="updateTime"></el-table-column>
          <el-table-column width="60" align="center">
            <template #default="scope">
              <el-radio :label="scope.row.id">&nbsp;</el-radio>
            </template>
          </el-table-column>
        </el-table>
      </el-radio-group>
    </div>
    <div class="pagination-footer">
      <el-pagination :current-page="page.index" :page-size="10" small layout="total, prev, pager, next, jumper"
                     :total="tableData.total" @current-change="page.indexChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {defineComponent, inject, reactive, ref, watch} from 'vue'
import {ElMessage} from 'element-plus'
import $api from '@/api'

export default defineComponent({
  name: "SpecialSubjectSelector",
  props: {
    // 需要回填的数据（专题id）
    id: {
      type: [String, Number],
      default: ''
    }
  },
  emits: ['confirm'],
  setup(props, {emit}) {
    const closeDialog = inject('closeDialog')

    const searchRef = ref()
    const search = reactive({
      form: {
        name: ''
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
      selectedId: props.id || '',
      selectedRowChange(data) {
        tableData.selectedId = data.id
      },
      getList: async () => {
        const {list, total} = await $api.operationApi.special.getList({
          page: page.index,
          pageSize: page.size,
          name: search.form.name
        })
        tableData.list = list
        tableData.total = total
      }
    })
    tableData.getList()

    watch(() => props.id, (id) => {
      tableData.selectedId = id || ''
    })

    const reset = () => {
      tableData.selectedId = props.id || ''
    }

    const save = () => {
      if (tableData.selectedId) {
        emit('confirm', {
          type: 3,
          value: tableData.selectedId
        })
        closeDialog()
      } else {
        ElMessage.error('请选择专题')
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
.special-subject-selector {
  height: 100%;
  padding-bottom: 10px;

  .search-header {
    padding-bottom: 10px;
    border-bottom: 1px solid #EEEEEE;
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