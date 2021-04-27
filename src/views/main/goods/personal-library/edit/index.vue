<template>
  <div class="Edit">
	  
	  <div class="Edit-cld0" :style="{height:$getTableHeight()}">
		  {{dataShow}}
		  <editList :GoodList="GoodData?GoodData:''" @changeEdit='BusEditData'></editList>
	  </div>
	  <div class="Edit-cld1">
			<editshop :GoodList="GoodData?GoodData:''" :LiveId="CgId?CgId:0" style='height: calc(100vh - 200px);'>
				<!-- <baisc slot='basicSlot'></baisc> -->
				<!-- <h1 slot='basicSlot'>12312312</h1> -->
			</editshop>
	  </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import editList from "./editList"
import editshop from "./editshop/index"

import baisc from "@/components/goods/edit/baisc.vue"
import $api from "@/api"

export default defineComponent({
  name: "edit",
  props:{
	  baisc:Object
  },
  components: {
    editList,
	editshop,
	baisc,
  },
  data(){
	  return{
		  CgId:'',
		  GoodData:[],
	  }
  },
  mounted(){
	   console.log(this.$route.query.specialId)
	   this.DataFor()
  },
  methods:{
	  BusEditData(e){
			this.CgId = Number(e)
	  },
	  DataFor(){
		  // if(typeof(this.$route.query.specialId) == 'string'){
		  //  this.DataLength = [this.$route.query.specialId]
		  // }else if(typeof(this.$route.query.specialId) == 'object'){
		  //  this.DataLength = this.$route.query.specialId
		  // }
		  var _this = this
		  if(typeof(this.$route.query.specialId) == 'string'){
			  this.DataGet(this.$route.query.specialId)
		  }else if(typeof(this.$route.query.specialId) == 'object'){
			  this.$route.query.specialId.forEach(function(item){
				_this.DataGet(item)  
			  })
		  }
	  },
	  DataGet(goodId){
		  var _this = this
		  $api.goodsApi.personLibrary.getgoodDetailData({
		  	id: goodId,
		  }).then((data) => {
			_this.GoodData.push(data.list)
		  })	
	  },
  },
  computed:{
	  dataShow(){
		  return this.GoodData;
	  },
  },
})
</script>

<style scoped lang="scss">
.Edit{
	width: 100%;
	display: flex;
	justify-content: space-evenly;
	flex-wrap: wrap;
	padding-top: 30px;
	.Edit-cld0{
		width: 24.39%;
		height: 100vh;
	}
	.Edit-cld1{
		width: 73%;
		height: calc(100vh - 230px);
	}
	.Edit-cld2{
		width: 100%;
		box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.2);
	}
}
</style>