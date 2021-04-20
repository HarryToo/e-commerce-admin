<template>
  <el-tree ref="tree" :data="classifyOptions" show-checkbox node-key="id" default-expand-all
           :props="{children: 'children', label: 'name'}">
  </el-tree>
</template>

<script>
import {defineComponent, computed, ref} from 'vue'
import {useStore} from 'vuex'

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
  setup() {
    const store = useStore()
    const tree = ref()

    const classifyOptions = computed(() => store.getters['goods/classifyTree'])

    const reset = () => {
      tree.value.setCheckedKeys([])
    }

    const save = () => {
      const checkedNodes = tree.value.getCheckedNodes()
      const halfCheckedNodes = tree.value.getHalfCheckedNodes()
      const checkedTree = arr2Tree([...checkedNodes, ...halfCheckedNodes])
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