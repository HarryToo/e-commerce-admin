<template>
  <div class="Edit">
	  <div class="Edit-cld0">
		  <editList></editList>
	  </div>
	  <div class="Edit-cld1">
		  <editshop></editshop>
	  </div>
	  <div class="Edit-cld2">
		  <editfooter></editfooter>
	  </div>
	  
  </div>

</template>

<script>
import {defineComponent} from 'vue'
import editList from "./editList"
import editshop from "./editshop"
import editfooter from "./editfooter"

export default defineComponent({
  name: "edit",
  components: {
    editList,
	editshop,
	editfooter,
  },
})
</script>

<style scoped lang="scss">
.Edit{
	width: 100%;
	display: flex;
	justify-content: space-evenly;
	flex-wrap: wrap;
	.Edit-cld0{
		width: 24.39%;
	}
	.Edit-cld1{
		width: 70%;
	}
	.Edit-cld2{
		width: 100%;
		box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.2);
	}
}
</style>