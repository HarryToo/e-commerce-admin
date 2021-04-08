<template>
  <div style="height: 100%;display: flex;flex-direction: column;">
    <div class="options-area">
      <el-form :model="search.form" ref="searchForm" inline>
        <el-space size="medium">
          <el-form-item label="专题名称" prop="name" size="small" style="margin-bottom: 0;">
            <el-input v-model="search.form.name" placeholder="请输入专题名称"></el-input>
          </el-form-item>
          <el-form-item size="small" style="margin-bottom: 0;">
            <el-button class="custom" @click="search.search">查询</el-button>
            <el-button @click="search.reset">清空条件</el-button>
          </el-form-item>
        </el-space>
      </el-form>
      <el-popover placement="left" title="创建专题" :width="300" trigger="click">
        <template #reference>
          <el-button class="custom" size="small" v-permission="[$route, 'add']">创建专题</el-button>
        </template>
        <div style="text-align: right;">
          <el-input v-model.trim="tableData.form.name" placeholder="请输入专题名称"
                    @keyup.enter="tableData.add"></el-input>
          <el-button class="custom" size="mini" style="margin-top: 10px;" @click="tableData.add">创建
          </el-button>
        </div>
      </el-popover>
    </div>
    <div style="flex-grow: 1;padding: 25px;display: flex;flex-direction: column;justify-content: space-between;">
      <el-table :data="tableData.list" stripe :tree-props="{children: 'children'}" row-key="id" default-expand-all :height="tableHeight">
        <el-table-column prop="name" label="专题名称" width="400">
          <template #default="scope">
            <span>{{ scope.row.name }}</span>
            <i class="el-icon-folder" style="padding-left: 6px;color: #F9612E;" v-if="scope.row.children"></i>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="250"></el-table-column>
        <el-table-column prop="goodsNum" label="商品数" width="180"></el-table-column>
        <el-table-column prop="status" label="状态" width="150">
          <template #default="scope">
            <span style="color: #1CB903;" v-if="scope.row.status">启用</span>
            <span style="color: #FF3A30;" v-else>已禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="updater" label="更新人"></el-table-column>
        <el-table-column fixed="right" label="操作" width="280">
          <template #default="scope">
            <div :style="{'padding-left': scope.row.pid ? '40px' : '0'}">
              <el-popover placement="left" title="新建子专题" :width="300" trigger="click" v-if="!scope.row.pid">
                <template #reference>
                  <el-button type="text" size="small" v-permission="[$route, 'add']">新建子专题</el-button>
                </template>
                <div style="text-align: right;">
                  <el-input v-model.trim="tableData.form.name" placeholder="请输入子专题名称"
                            @keyup.enter="tableData.add(scope.row)"></el-input>
                  <el-button class="custom" size="mini" style="margin-top: 10px;"
                             @click="tableData.add(scope.row)">创建
                  </el-button>
                </div>
              </el-popover>
              <el-button
                  @click="$router.push({path: '/main/operation/special/goods', query: {specialId: scope.row.id}})"
                  type="text" size="small" v-permission="[$route, 'edit']" v-if="!scope.row.children">
                管理商品
              </el-button>
              <el-popover placement="left" title="编辑专题" :width="300" trigger="click">
                <template #reference>
                  <el-button @click="tableData.form.name = scope.row.name" type="text" size="small"
                             v-permission="[$route, 'edit']">编辑
                  </el-button>
                </template>
                <div style="text-align: right;">
                  <el-input v-model.trim="tableData.form.name" placeholder="请输入专题名称"
                            @keyup.enter="tableData.edit(scope.row)"></el-input>
                  <el-button class="custom" size="mini" style="margin-top: 10px;"
                             @click="tableData.edit(scope.row)">提交
                  </el-button>
                </div>
              </el-popover>
              <el-button @click="tableData.disable(scope.row)" type="text" size="small" v-permission="[$route, 'edit']"
                         v-if="scope.row.status">禁用
              </el-button>
              <el-button @click="tableData.enable(scope.row)" type="text" size="small" v-permission="[$route, 'edit']"
                         v-else>启用
              </el-button>
              <el-button @click="tableData.del(scope.row)" type="text" size="small" v-permission="[$route, 'delete']">
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination small :current-page="page.index" :page-size="page.size" :page-sizes="[10, 15, 30, 50]"
                     layout="total, sizes, prev, pager, next, jumper" :total="tableData.total"
                     @size-change="page.sizeChange" @current-change="page.indexChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref, reactive} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import $api from '@/api'

const moduleName = '专题'

export default defineComponent({
  name: "SpecialList",
  setup() {
    const searchForm = ref()
    const tableHeight = window.innerHeight - 351

    const exportLoading = ref(false)

    const search = reactive({
      form: {
        name: ''
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
        name: ''
      },
      getList: async () => {
        const {list, total} = await $api.operationApi.special.getList({
          page: page.index,
          pageSize: page.size,
          ...search.form
        })
        tableData.list = list
        tableData.total = total
      },
      add: (data) => {
        if (!data.children && data.goodsNum) {
          // 一级专题下创建子专题，当有商品时提醒
          ElMessageBox.confirm(`${moduleName}“${data.name}”当前为一级${moduleName}，此操作将移除其所有已添加商品，是否继续？`, {type: 'warning'}).then(() => {
            tableData.addHandler(data)
          }).catch(err => {
            tableData.form.name = ''
          })
        } else {
          tableData.addHandler(data)
        }
      },
      addHandler: async (data) => {
        if (!tableData.form.name) {
          return ElMessage.error(`请输入${data ? '子专题' : '专题'}名称`)
        }
        const param = {
          name: tableData.form.name
        }
        if (data) {
          param.id = data.id
        }
        const {code} = await $api.operationApi.special.add(param)
        if (code === 200) {
          tableData.form.name = ''
          tableData.getList()
        }
      },
      del: (data) => {
        let msg = '删除后，不可恢复，请谨慎操作！'
        if (data.children) {
          msg = `此操作将一并删除其下所有子${moduleName}数据，` + msg
        }
        ElMessageBox.confirm(msg, `确认删除${moduleName}“${data.name}”？`, {type: 'warning'}).then(async () => {
          const {code} = await $api.operationApi.special.del({
            id: data.id
          })
          if (code === 200) {
            tableData.getList()
          }
        }).catch(err => {
        })
      },
      disable: (data) => {
        ElMessageBox.confirm(`确认禁用${moduleName}“${data.name}”？`, {type: 'warning'}).then(async () => {
          const {code} = await $api.operationApi.special.disable({
            id: data.id
          })
          if (code === 200) {
            data.states = 0
          }
        }).catch(err => {
        })
      },
      enable: async (data) => {
        const {code} = await $api.operationApi.special.enable({
          id: data.id
        })
        if (code === 200) {
          data.states = 1
        }
      },
      edit: async (data) => {
        if (!tableData.form.name) {
          return ElMessage.error('请输入专题名称')
        }
        const {code} = await $api.operationApi.special.edit({
          id: data.id,
          name: tableData.form.name
        })
        if (code === 200) {
          data.name = tableData.form.name
          tableData.form.name = ''
        }
      }
    })

    tableData.getList()

    return {
      searchForm,
      tableHeight,
      exportLoading,
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

.el-table__row--level-1 {
  .el-table_1_column_1 {
    position: relative;

    &:before, &:after {
      content: '';
      position: absolute;
      background-color: #F9612E;
    }

    &:before {
      left: 50px;
      top: 18px;
      width: 1px;
      height: 10px;
    }

    &:after {
      left: 50px;
      top: 50%;
      width: 10px;
      height: 1px;
    }

    .cell {
      padding-left: 30px;
    }
  }
}
</style>