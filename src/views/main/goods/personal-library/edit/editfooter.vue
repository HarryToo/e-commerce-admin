<template>
	<div class="btmBotton">
		  <el-button>取消</el-button>
		  <el-button>预览</el-button>
		  <el-button>保存</el-button>
		  <el-button>发布</el-button>
	</div>
</template>

<script>
	import {defineComponent,ref} from 'vue'

	export default defineComponent({
		name: "editfooter",
	})
</script>

<style scoped lang="scss">
	.btmBotton{
		height: 100px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>