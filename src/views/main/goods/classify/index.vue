<template>
  <div style="height: 100%;display: flex;flex-direction: column;">
    <table-options-header>
      <el-form :model="search.form" ref="searchForm" inline>
        <el-space size="medium">
          <el-form-item label="分类名称" prop="name" size="small" style="margin-bottom: 0;">
            <el-input v-model="search.form.name" placeholder="请输入分类名称"></el-input>
          </el-form-item>
          <el-form-item label="分类编号" prop="id" size="small" style="margin-bottom: 0;">
            <el-input v-model="search.form.id" placeholder="请输入分类编号"></el-input>
          </el-form-item>
          <el-form-item size="small" style="margin-bottom: 0;">
            <el-button class="custom" @click="search.search">查询</el-button>
            <el-button @click="search.reset">清空条件</el-button>
          </el-form-item>
        </el-space>
      </el-form>
      <template #right>
        <el-button class="custom" size="small" v-permission="[$route, 'add']" @click="tableData.add(0)">新建一级分类
        </el-button>
      </template>
    </table-options-header>
    <div style="flex-grow: 1;padding: 25px;display: flex;flex-direction: column;justify-content: space-between;">
      <el-table :data="tableData.list" stripe :tree-props="{children: 'children'}" row-key="id" default-expand-all
                :height="$getTableHeight(true, false)">
        <el-table-column prop="id" label="分类编号" width="220"></el-table-column>
        <el-table-column prop="label" label="分类名称" width="380">
          <template #default="scope">
            <span>{{ scope.row.name }}</span>
            <i class="el-icon-folder" style="padding-left: 6px;color: #F9612E;" v-if="scope.row.children"></i>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="200"></el-table-column>
        <el-table-column prop="goodsNum" label="商品数"></el-table-column>
        <el-table-column prop="status" label="状态" width="150">
          <template #default="scope">
            <span style="color: #1CB903;" v-if="scope.row.status">启用</span>
            <span style="color: #FF3A30;" v-else>已禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="updater" label="更新人"></el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template #default="scope">
            <div
                :style="{'padding-left': `${(scope.row.deep - 1) * 20}px`}">
              <el-button type="text" size="small" v-permission="[$route, 'add']" v-if="scope.row.deep !== 3"
                         @click="tableData.add(scope.row.id)">新建子分类
              </el-button>
              <el-button @click="tableData.edit(scope.row)" type="text" size="small"
                         v-permission="[$route, 'edit']">编辑
              </el-button>
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
    </div>

    <el-dialog custom-class="custom" :title="dialog.title" v-model="dialog.visible" :close-on-click-modal="false"
               destroy-on-close>
      <detail :pid="dialog.currPid" :detail="dialog.currData" :mode="dialog.mode"></detail>
    </el-dialog>
  </div>
</template>

<script>
import {defineComponent, ref, reactive, computed, provide} from 'vue'
import {useStore} from 'vuex'
import {ElMessage, ElMessageBox} from 'element-plus'
import Detail from './components/Detail'
import $api from '@/api'

export default defineComponent({
  name: "GoodsClassify",
  components: {
    Detail
  },
  setup() {
    const store = useStore()
    const searchForm = ref()
    const search = reactive({
      form: {
        name: '',
        id: ''
      },
      search() {
        tableData.getList()
      },
      reset() {
        searchForm.value.resetFields()
        tableData.getList()
      }
    })

    const dialog = reactive({
      visible: false,
      currPid: 0,
      currData: {},
      mode: 'add',
      title: computed(() => {
        const titles = {
          add: `新建${dialog.currPid ? '子' : '一级'}分类`,
          view: `分类详情`,
          edit: `编辑分类`
        }
        return titles[dialog.mode]
      }),
      open() {
        dialog.visible = true
      },
      close() {
        dialog.visible = false
      }
    })

    const tableData = reactive({
      list: computed(() => store.getters['goods/classifyTree']),
      getList: () => {
        store.dispatch('goods/loadClassifyList', search.form)
      },
      add(pid) {
        dialog.mode = 'add'
        dialog.currPid = pid
        dialog.open()
      },
      disable: (data) => {
        ElMessageBox.confirm(`禁用后，该分类下将不再支持新增商品，请谨慎禁用！`, `确认禁用分类“${data.name}”？`, {type: 'warning'}).then(async () => {
          const {code} = await $api.operationApi.special.disable({
            id: data.id
          })
          if (code === 200) {
            data.status = 0
          }
        }).catch(err => {
        })
      },
      enable: async (data) => {
        const {code} = await $api.operationApi.special.enable({
          id: data.id
        })
        if (code === 200) {
          data.status = 1
        }
      },
      edit(data) {
        dialog.mode = 'edit'
        dialog.currData = data
        dialog.open()
      },
      del: (data) => {
        if (data.goodsNum) {
          ElMessageBox.confirm(`当前分类“${data.name}”下含有商品，无法执行删除！`, `删除分类失败！`, {
            type: 'error',
            showCancelButton: false
          }).then(async () => {
          }).catch(err => {
          })
        } else {
          ElMessageBox.confirm(`删除后，用户将无法通过该分类查找商品，请谨慎删除！`, `确认删除分类“${data.name}”？`, {type: 'warning'}).then(async () => {
            const {code} = await $api.goodsApi.classify.del({
              id: data.id
            })
            if (code === 200) {
              tableData.getList()
            }
          }).catch(err => {
          })
        }
      }
    })

    provide('closeDialog', dialog.close)
    provide('getList', tableData.getList)

    return {
      searchForm,
      search,
      tableData,
      dialog
    }
  }
})
</script>

<style scoped lang="scss">
.el-table__row--level-1 {
  td:nth-child(2) {
    position: relative;

    &:before, &:after {
      content: '';
      position: absolute;
      background-color: #F9612E;
    }

    &:before {
      left: 30px;
      top: 18px;
      width: 1px;
      height: 10px;
    }

    &:after {
      left: 30px;
      top: 50%;
      width: 10px;
      height: 1px;
    }

    .cell {
      padding-left: 46px;
    }
  }
}

.el-table__row--level-2 {
  td:nth-child(2) {
    position: relative;

    &:before, &:after {
      content: '';
      position: absolute;
      background-color: #F9612E;
    }

    &:before {
      left: 70px;
      top: 18px;
      width: 1px;
      height: 10px;
    }

    &:after {
      left: 70px;
      top: 50%;
      width: 10px;
      height: 1px;
    }

    .cell {
      padding-left: 86px;
    }
  }
}
</style>