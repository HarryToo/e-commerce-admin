<template>
	<div class="Library-List">
		<el-table :data="TabData" style="width: 100%" @selection-change="selectAll" border ref="multipleTable">

			<el-table-column type="selection" width="110" align="center">

			</el-table-column>

			<el-table-column label="商品信息" width="760">
				<template #default="scope">
					<div class="GoodIf">
						<img :src="scope.row.img" alt="" class="GIimg">
						<div class="GIBox">
							<div class="GI-0">{{scope.row.name}}</div>
							<div class="GI-1">商品分类：{{scope.row.type}}</div>
							<div class="GI-2">
								<div class="GI-s0">来源平台：<a :href="scope.row.SorceLink" style="color: #F9612E;"
										target="_blank">{{scope.row.Source}}</a></div>
								<div class="GI-s1">来源ID：<a :href="scope.row.ShopSorceLink" style="color: #F9612E;"
										target="_blank">{{scope.row.SorceId}}</a></div>
							</div>
						</div>
					</div>
				</template>
			</el-table-column>

			<el-table-column label="来源价格" width="150" align="center">
				<template #default="scope">
					<div class="GoodPrice">
						<span>{{scope.row.PriceMin}}</span>~
						<span>{{scope.row.PriceMax}}</span>
					</div>
				</template>
			</el-table-column>

			<el-table-column label="总库存" width="150" align="center">
				<template #default="scope">
					<div class="GoodStock">
						<span>{{scope.row.TotalStock}}</span>
					</div>
				</template>
			</el-table-column>

			<el-table-column label="采集时间/状态" width="180" show-overflow-tooltip align="center">
				<template #default="scope">
					<div class="GoodState">
						<div>
							<div v-if="scope.row.collectionState == 0" style="color:#1CB903;">采集成功</div>
							<div v-if="scope.row.collectionState == 1" style="color:#1679FB;">正在采集</div>
							<div v-if="scope.row.collectionState == 2" style="color:#FF3A30;">
								采集失败<span>:{{scope.row.failReason}}</span></div>
						</div>
						<div class="" v-if="scope.row.collectionState != 1">
							<div>2020.12.28 10:51:18</div>
						</div>
					</div>
				</template>
			</el-table-column>

			<el-table-column prop="collectionPeoPle" label="采集人" width="110" align="center">
				<template #default="scope">
					<div class="GoodPeoPle">
						<span>{{scope.row.collectionPeoPle}}</span>
					</div>
				</template>
			</el-table-column>

			<el-table-column prop="collectionPeoPle" label="操作" width="150" align="center">
				<template #default="scope" align="center">
					<div v-if="scope.row.collectionState != 1" class="GoodOperation">
						<div v-if="scope.row.collectionState == 2" @click='RetryShop(scope.$index)'>重试</div>
						<div v-else @click='EditShow = true'>编辑</div>|
						<div @click='DeleteShop(scope.$index)'>删除</div>
					</div>
				</template>
			</el-table-column>

		</el-table>
		<el-button @click='BatchRetryShop()'>批量重试</el-button>
		<el-button @click='BatchDeleteShop()'>批量删除</el-button>
		<el-button>批量编辑</el-button>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
			:page-sizes="[2, 4, 6, 8]" :page-size="2" layout="total, sizes, prev, pager, next, jumper"
			:total="TabData.length">
		</el-pagination>
		
		
		<el-dialog  v-model="EditShow" width='85.5%' top="5rem" :modal='true'>
		  <edit></edit>
		</el-dialog>
	</div>

</template>

<script>
	import {
		defineComponent
	} from 'vue'
	import edit from "../edit/index"
	import $api from "@/api"

	export default defineComponent({
		name: "personalList",
		components: {
		  edit,
		},
		data() {
			return {
				EditShow:false,//编辑列表
				TabData: [],
				multipleSelection: [],
			}
		},
		mounted() {
			this.getPersonLbShopListData()
		},
		methods: {
			secg(a, b) {
				console.log(a)
				console.log(b)
			},
			//批量删除
			BatchDeleteShop() {
				var that = this
				var arr = [];
				var data = this.multipleSelection;
				
				this.$confirm('删除后，将无法恢复该商品记录，请谨慎删除！', '确认要删除这件商品吗？', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					data.forEach(function(item, index) {
					
						if(item.collectionState == 1){
							that.$message({
							          message: '无法删除正在采集数据',
							          type: 'warning'
							        });
							 return false
						}
						that.TabData.forEach(function(itemI, indexI) {							
							if (item.id === itemI.id) {
								that.TabData.splice(indexI, 1)		
							}
					
						})
					
					})
					// this.$message({
					//           message: '删除成功',
					//           type: 'success'
					//         });
				})
				console.log(data)
			},


			BatchRetryShop(){	
				var that = this
				var arr = [];
				var data = this.multipleSelection;
				
				this.$confirm('重试，将重新采集该商品', '是否批量重试？', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					data.forEach(function(item, index) {
					
						if(item.collectionState != 2){
							that.$message({
							          message: '只能重试采集失败商品',
							          type: 'warning'
							        });
							 return false
						}
						that.TabData.forEach(function(itemI, indexI) {							
							if (item.id === itemI.id) {
								that.TabData[indexI].collectionState = '0'
							}
					
						})
					
					})
					// this.$message({
					//           message: '删除成功',
					//           type: 'success'
					//         });
				})
				console.log(data)
			},
			//删除当前商品
			DeleteShop(index) {
				this.$confirm('删除后，将无法恢复该商品记录，请谨慎删除！', '确认要删除这件商品吗？', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.TabData.splice(index, 1);
				})
			},
			RetryShop(index) {
				this.$confirm('重试，将重新采集该商品', '是否重试', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.TabData[index].collectionState = '0';
					this.$message({
					          message: '正在采集',
					          type: 'success'
					        });
				})
			},
			getPersonLbShopListData() {
				var that = this
				$api.shoplistApi.getPersonLbShopListData().then((data) => {
					that.TabData = data;
				})
			},
			selectAll(val) {
				this.multipleSelection = val;
				console.log(val)
			},
			handleSizeChange(val) {
				console.log(val+'handleSizeChange');
			},
			handleCurrentChange(val) {
				console.log(val);
			}
		},
	})
</script>

<style scoped lang="scss">
	.Library-List {
		.GoodIf {
			display: flex;
			align-items: center;

			.GIimg {
				width: 80px;
				background-color: #a6a6a6;
			}

			.GIBox {
				padding-left: 10px;

				.GI-0 {
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					color: #101010;
					font-size: 14px;
					line-height: 20px;
					height: 40px;
					font-family: SourceHanSansSC-regular;
				}

				.GI-1 {
					color: #9d9c9c;
					font-size: 12px;
					font-family: SourceHanSansSC-regular;
				}

				.GI-2 {
					display: flex;

					.GI-s0,
					.GI-s1 {
						color: #9D9C9C;
						font-size: 12px;
						font-family: Microsoft Yahei;
					}

					.GI-s1 {
						margin-left: 10px;
					}
				}
			}
		}

		.GoodPrice,
		.GoodStock,
		.GoodPeoPle {
			color: #101010;
			font-size: 14px;
			text-align: center;
			font-family: SourceHanSansSC-regular;
		}

		.GoodOperation {
			display: flex;
			justify-content: center;
			align-items: center;
			color: #F9612E;

			div {
				padding: 0 10px;
				font-size: 14px;
			}

			div {
				cursor: pointer;
			}
		}

		.GoodState {
			font-size: 14px;
			font-family: SourceHanSansSC-regular;
		}
	}
	.el-dialog{
		margin: 0 auto;
		margin-left: 260px;
	}

</style>
