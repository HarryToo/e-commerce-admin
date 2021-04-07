<template>
  <div style="height: 100%;display: flex;flex-direction: column;">
    <div class="options-area">
      <el-form :model="search.form" ref="searchForm" inline>
        <el-space size="medium">
          <el-form-item label="供应商名字" prop="name" size="small" style="margin-bottom: 0;">
            <el-input v-model="search.form.name" placeholder="请输入供应商名字"></el-input>
          </el-form-item>
          <el-form-item label="提交时间" prop="time" size="small" style="margin-bottom: 0;">
            <el-date-picker v-model="search.form.time" type="daterange" start-placeholder="开始日期"
                            end-placeholder="结束日期" style="width: 240px;"></el-date-picker>
          </el-form-item>
          <el-form-item size="small" style="margin-bottom: 0;">
            <el-button class="custom" @click="search.search">查询</el-button>
            <el-button @click="search.reset">清空条件</el-button>
          </el-form-item>
        </el-space>
      </el-form>
      <el-button class="custom" size="small" @click="tableData.add">导出表格</el-button>
    </div>
    <div style="flex-grow: 1;padding: 25px;display: flex;flex-direction: column;justify-content: space-between;">
      <el-table :data="tableData.list" stripe :height="tableHeight">
        <el-table-column prop="time" label="提交时间"></el-table-column>
        <el-table-column prop="name" label="供应商名称"></el-table-column>
        <el-table-column prop="industry" label="所属行业"></el-table-column>
        <el-table-column prop="storeType" label="网店/工厂">
          <template #default="scope">
            <span>{{ ['网店', '工厂'][scope.row.storeType] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="contact" label="联系人"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template #default="scope">
            <el-popover placement="left" title="查看备注" :width="300" trigger="click" :content="scope.row.remark"
                        v-if="scope.row.remark">
              <template #reference>
                <el-button @click="" type="text" size="small">查看备注</el-button>
              </template>
            </el-popover>
            <el-popover placement="left" title="添加备注" :width="300" trigger="click" :content="scope.row.remark" v-else>
              <template #reference>
                <el-button @click="" type="text" size="small">备注</el-button>
              </template>
              <div style="text-align: right;">
                <el-input v-model.trim="tableData.form.remark" type="textarea" placeholder="请输入备注内容"></el-input>
                <el-button class="custom" size="mini" style="margin-top: 8px;"
                           @click="tableData.commitRemark(scope.row)">提交
                </el-button>
              </div>
            </el-popover>
            <!--            <el-button @click="tableData.remark(scope.row)" type="text" size="small" v-else>备注</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination small :current-page="page.index" :page-size="page.size" :page-sizes="[10, 15, 30, 50]"
                     layout="total, sizes, prev, pager, next, jumper" :total="tableData.total"
                     @size-change="page.sizeChange"
                     @current-change="page.indexChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref, reactive, computed, provide, toRef} from 'vue'
import {ElMessageBox} from 'element-plus'
import $api from '@/api'

export default defineComponent({
  name: "SupplierList",
  setup() {
    const searchForm = ref()
    const tableHeight = window.innerHeight - 353

    const search = reactive({
      form: {
        name: '',
        time: []
      },
      param: computed(() => {
        return {
          name: search.form.name,
          startTime: search.form.time[0] || '',
          endTime: search.form.time[1] || ''
        }
      }),
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
      form: {
        remark: ''
      },
      total: 0,
      getList: async () => {
        const {list, total} = await $api.supplierApi.getList({
          page: page.index,
          pageSize: page.size,
          ...search.param
        })
        tableData.list = list
        tableData.total = total
      },
      commitRemark: async (data) => {
        const {code} = await $api.supplierApi.remark({
          id: data.id,
          remark: tableData.form.remark
        })
        if (code === 200) {
          tableData.form.remark = ''
          await tableData.getList()
        }
      }
    })
    tableData.getList()

    return {
      searchForm,
      tableHeight,
      search,
      page,
      tableData
    }
  }
})
</script>

<style scoped lang="scss">
.options-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>