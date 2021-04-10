<template>

	<div class="personallistBox">
		<dataList></dataList>
		<!-- <edit></edit>	 -->
	</div>


</template>

<script>
	import {defineComponent,ref} from 'vue'
	import dataList from "./dataList/index"
	import personalList from "./dataList/personalList"
	import edit from "./edit/index"
	import $api from "@/api"

	export default defineComponent({
		name: "PersonalCollectionLibrary",
		components: {
		  dataList,
		  edit,
		},
	})
</script>

<style scoped lang="scss">
	
</style>
