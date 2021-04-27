<template>

	<div class="personallistBox">
		<dataList></dataList>
	</div>


</template>

<script>
	import {defineComponent,ref} from 'vue'
	import dataList from "./dataList/index"
	import edit from "./edit/index"
	import $api from "@/api"

	export default defineComponent({
		name: "PlatformGoodLibrary",
		components: {
		  dataList,
		  edit,
		},
	})
</script>

<style scoped lang="scss">
	
</style>
