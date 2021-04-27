<template>
<platformListselection></platformListselection>
<platformList></platformList>
		
</template>

<script>
	import {defineComponent,ref} from 'vue'
	import platformList from "./platformList"
	import platformListselection from "./platformListselection"

	export default defineComponent({
		name: "PersonalCollectionLibrary",
		components: {
		  platformList,
		  platformListselection,
		},
	})
</script>

<style scoped lang="scss">
	
</style>
