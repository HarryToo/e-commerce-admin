<template>
	<div class="editList">
		<div class="EditTitle">选择商品:</div>
		<div class="EditBox">
			<el-menu default-active="2" class="el-menu-vertical-demo" >
			  <el-menu-item index="1">
			    <div class="ListBox">
					<img src="../../../../../assets/logo.png" alt="" class="ListImg">
					<div class="ListDetal">
						<div class="ListD0">这个是神什么名字</div>
						<div class="ListD1">来源分类：电动车/配件/交通工具>电动车整车>电动...</div>
						<div class="ListD2">来源平台：<span style='color: #F9612E;'>京东</span></div>
						<div class='ListD3'>
							<div class="ListD-s0">来源id:<span style='color: #F9612E;'>174654354354</span></div>
							<img class="ListD-s1" src="../../../../../assets/logo.png" alt="">
						</div>
					</div>
				</div>
			  </el-menu-item>
			  <el-menu-item index="2">
			    <div class="ListBox">
			    	<img src="../../../../../assets/logo.png" alt="" class="ListImg">
			    	<div class="ListDetal">
			    		<div class="ListD0">这个是神什么名字</div>
			    		<div class="ListD1">来源分类：电动车/配件/交通工具>电动车整车>电动...</div>
			    		<div class="ListD2">来源平台：<span style='color: #F9612E;'>京东</span></div>
			    		<div class='ListD3'>
			    			<div class="ListD-s0">来源id:<span style='color: #F9612E;'>174654354354</span></div>
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

export default defineComponent({
  name: "UserList"
})
</script>

<style scoped lang="scss">
.el-menu-item *{
	vertical-align:baseline;
}
.el-menu-item{
	white-space:normal!important;
}
.is-active {
	background-color: rgba(249, 97, 46, 0.1);
}
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
</style>