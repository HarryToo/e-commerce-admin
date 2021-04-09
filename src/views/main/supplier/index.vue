<template>
  <div style="height: 100%;display: flex;flex-direction: column;">
    <table-options-header>
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
      <template #right>
        <el-button class="custom" size="small" :loading="exportLoading" @click="exportTable">导出表格</el-button>
      </template>
    </table-options-header>
    <div style="flex-grow: 1;padding: 25px;display: flex;flex-direction: column;justify-content: space-between;">
      <el-table :data="tableData.list" stripe :height="$getTableHeight()">
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
                <el-button type="text" size="small">查看备注</el-button>
              </template>
            </el-popover>
            <el-popover placement="left" title="添加备注" :width="300" trigger="click"
                        v-else>
              <template #reference>
                <el-button type="text" size="small" v-permission="[$route, 'edit']">备注</el-button>
              </template>
              <div style="text-align: right;">
                <el-input v-model.trim="tableData.form.remark" type="textarea" placeholder="请输入备注内容"
                          @keyup.enter="tableData.commitRemark(scope.row)"></el-input>
                <el-button class="custom" size="mini" style="margin-top: 10px;"
                           @click="tableData.commitRemark(scope.row)">提交
                </el-button>
              </div>
            </el-popover>
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
import {defineComponent, ref, reactive, computed} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import $api from '@/api'
import {exportExcel} from '@/utils/tool'

export default defineComponent({
  name: "SupplierList",
  setup() {
    const searchForm = ref()

    const exportLoading = ref(false)

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
      total: 0,
      form: {
        remark: ''
      },
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
          data.remark = tableData.form.remark
          tableData.form.remark = ''
        }
      }
    })

    tableData.getList()

    const exportTable = () => {
      try {
        let msg = '此操作会导出当前表所有数据，为避免数据量过大时导出异常，请尽量先筛选出必要的数据，确认继续导出？'
        if (search.param.name || (search.param.startTime && search.param.endTime)) {
          msg = '当前有查找条件，此操作会导出符合条件的所有数据，确认继续导出？'
        }
        ElMessageBox.confirm(msg, '友情提示', {type: 'info'}).then(async () => {
          exportLoading.value = true
          const {list} = await $api.supplierApi.getList({
            page: 1,
            pageSize: 100,
            ...search.param
          })
          let aoa = [['提交时间', '供应商名称', '所属行业', '网店/工厂', '联系人', '联系电话', '备注']]
          const dataList = list.map((item) => {
            const storeType = ['网店', '工厂'][item.storeType]
            return [new Date(item.time), item.name, item.industry, storeType, item.contact, item.phone, item.remark]
          })
          aoa = aoa.concat(dataList)
          let fileName = '供应商'
          if (search.param.name) {
            fileName += `【${search.param.name}】`
          }
          if (search.param.startTime && search.param.endTime) {
            fileName += `(${search.param.startTime.toLocaleDateString()}至${search.param.endTime.toLocaleDateString()})`
          } else {
            fileName += '_' + new Date().toLocaleDateString()
          }
          exportExcel(aoa, fileName)
          ElMessage.success('导出成功')
          exportLoading.value = false
        }).catch(err => {
          exportLoading.value = false
        })
      } catch (err) {
        ElMessage.error(`导出失败：${err.message}`)
      }
    }

    return {
      searchForm,
      exportLoading,
      search,
      page,
      tableData,
      exportTable
    }
  }
})
</script>

<style scoped lang="scss">
</style>