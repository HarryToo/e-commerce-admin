<template>
	<div class="editList">
		<div class="EditTitle">选择商品:</div>
		<div class="EditBox">
			<el-menu default-active="0" class="el-menu-vertical-demo" >
			  <el-menu-item  v-for="(val,idx) in EditData" :index="idx">
			    <div class="ListBox">
					<img :src="val.img" alt="" class="ListImg">
					<div class="ListDetal">
						<div class="ListD0">{{val.name}}</div>
						<div class="ListD1">来源分类：{{val.type}}</div>
						<div class="ListD2">来源平台：<span style='color: #F9612E;'>{{val.Source}}</span></div>
						<div class='ListD3'>
							<div class="ListD-s0">来源id:<span style='color: #F9612E;'>{{val.SorceId}}</span></div>
							<img class="ListD-s1" src="../../../../../assets/logo.png" alt="">
						</div>
					</div>
				</div>
			  </el-menu-item>
			</el-menu>  
		</div>
	</div>
</template>

<script>
import {defineComponent} from 'vue'
import $api from '@/api'
export default defineComponent({
  name: "UserList",
  data(){	
	  return{
		  EditData:[],
		  EditId:this.$route.query.specialId,
	  }
  },
  mounted(){
	  this.getEditData()
  },
  methods:{
	 getEditData(){
		var that = this
		$api.shopListApi.getPersonLbShopListData().then((data) => {
			data.forEach(function(item){
				that.EditId.forEach(function(itemId){
					if(itemId == item.id){
						that.EditData.push(item)
					}
				})
			})
		})
		setTimeout(()=>{
			console.log(this.EditData)
		},1200)
	 },
  },
})
</script>

<style scoped lang="scss">
.editList{
	padding-bottom: 10px;
	
	.EditTitle{
		color: #101010;
		font-size: 16px;
		font-weight: 600;
		padding-bottom: 10px;
	}
	.EditBox{
		width: 100%;
		height: 655px;
		overflow-y: scroll;
		border: 1px solid #eeeeee;
		.el-menu-item *{
			vertical-align:baseline;
		}
		.el-menu-item{
			white-space:normal!important;
		}
		.is-active {
			background-color: rgba(249, 97, 46, 0.1);
		}
		.el-menu-item:hover{
			background-color: rgba(249, 97, 46, 0.1);
		}
		.el-menu-item{
			height: 100px;
				.ListBox{
					display: flex;
					align-items: center;
					line-height: 1rem;
					border-bottom: 1px solid #eeeeee;
					height: 100%;
					.ListImg{
						width: 80px;
						height: 80px;
						background-color: #A4DA89;
					}
					.ListDetal{
						width: 250px!important;
						padding-left: 10px;
						.ListD0{
							color: #101010;
							font-size: 14px;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;
						}
						.ListD1{
							color: #9d9c9c;
							font-size: 12px;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;
							margin-top: 5px;
						}
						.ListD2{
							line-height: 18px;
							color: #9d9c9c;
							font-size: 12px;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;
							margin-top: 5px;
						}
						.ListD3{
							display: flex;
							align-items: center;
							justify-content: space-between;
							margin-top: 5px;
							.ListD-s0{
								color: #9d9c9c;
								font-size: 12px;
							}
							.ListD-s1{
								width: 18px;
							}
						}
					}
				}
		}
		
	}
	.EditBox::-webkit-scrollbar{
	  width:10px;
	}
	.EditBox::-webkit-scrollbar-track{
	  background: #efefef;
	  border-radius:2px;
	}
	.EditBox::-webkit-scrollbar-thumb{
	  background: #cecece;
	  border-radius:10px;
	}
	.EditBox::-webkit-scrollbar-thumb:hover{
	  background: #ff632f;
	}
	.EditBox::-webkit-scrollbar-corner{
	  background: #9a8a37;
	}

}
</style>