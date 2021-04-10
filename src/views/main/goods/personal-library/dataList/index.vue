<template>
<Personalselection></Personalselection>
<personalList></personalList>
		
</template>

<script>
	import {defineComponent,ref} from 'vue'
	import Personalselection from "./Personalselection"
	import personalList from "./personalList"

	export default defineComponent({
		name: "PersonalCollectionLibrary",
		components: {
		  personalList,
		  Personalselection,
		},
	})
</script>

<style scoped lang="scss">
	
</style>
