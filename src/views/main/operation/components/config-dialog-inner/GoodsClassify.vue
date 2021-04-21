<template>
  <el-tree ref="tree" :data="classifyOptions" show-checkbox node-key="id" default-expand-all
           :props="{children: 'children', label: 'name'}">
  </el-tree>
</template>

<script>
import {defineComponent, computed, ref, inject, onMounted} from 'vue'
import {useStore} from 'vuex'
import {ElMessage} from "element-plus"

// 数组转树形
function arr2Tree(list, pid = 0) {
  if (!list || !list.length) {
    return []
  }
  const result = []
  for (const node of list) {
    if (node.pid === pid) {
      const children = arr2Tree(list.filter(v => v.pid !== pid), node.id)
      if (children.length) {
        result.push({...node, children})
      } else {
        result.push({...node})
      }
    }
  }
  return result
}

export default defineComponent({
  name: "GoodsClassifyTreeSelector",
  props: {
    // 需要回填的数据
    data: {
      type: Object,
      default() {
        return null
      }
    }
  },
  emits: ['confirm'],
  setup(props, {emit}) {
    const store = useStore()
    const tree = ref()
    const tabIndex = inject('tabIndex')
    const closeDialog = inject('closeDialog')
    const classifyOptions = computed(() => store.getters['goods/classifyTree'])

    const reset = () => {
      if (props.data && props.data.ids.length) {
        tree.value.setCheckedKeys(props.data.ids)
      } else {
        tree.value.setCheckedKeys([])
      }
    }

    onMounted(reset)

    const save = () => {
      const checkedIds = tree.value.getCheckedKeys()
      const checkedNodes = tree.value.getCheckedNodes()
      const halfCheckedNodes = tree.value.getHalfCheckedNodes()
      const checkedTree = arr2Tree([...checkedNodes, ...halfCheckedNodes])
      if (tabIndex.value === '1') {
        if (checkedIds.length && checkedTree.length) {
          emit('confirm', {
            type: 1,
            value: {
              ids: checkedIds,
              tree: checkedTree
            }
          })
          closeDialog()
        } else {
          ElMessage.error('请选择分类')
        }
      }
    }

    return {
      tree,
      classifyOptions,
      reset,
      save
    }
  }
})
</script>

<style scoped lang="scss">

</style>