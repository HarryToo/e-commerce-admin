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
						<div class="ListD2">来源平台</div>
						<div class='ListD3'>
							<div class="ListD-s0">来源id</div>
							<img class="ListD-s1" src="../../../../../assets/logo.png" alt="">
						</div>
					</div>
				</div>
			  </el-menu-item>
			  <el-menu-item index="2">
			    <span slot="title">导航二</span>
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
.editList{
	padding-top:30px;
	padding-left: 30px;
	padding-bottom: 10px;
	.EditTitle{
		color: #101010;
		font-size: 16px;
		font-weight: 600;
		padding-bottom: 10px;
	}
	.EditBox{
		width: 380px;
		height: 655px;
		overflow-y: scroll;
		border: 1px solid #eeeeee;
	}
	.el-menu-item{
		height: 100px;
			.ListBox{
				display: flex;
				align-items: center;
				line-height: normal;
				.ListImg{
					width: 80px;
					height: 80px;
				}
				.ListDetal{
					width: 285px!important;
					padding-left: 10px;
					.ListD0{
						color: #101010;
						font-size: 14px;
					}
					.ListD1{
						color: #9d9c9c;
						font-size: 12px;
					}
					.ListD2{
						color: #9d9c9c;
						font-size: 12px;
					}
					.ListD3{
						display: flex;
						align-items: center;
						justify-content: space-between;
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