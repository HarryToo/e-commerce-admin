<template>
	<div class="Library-List">
		<el-table :data="TabData.list" style="width: 100%" @selection-change="selectAll" stripe ref="multipleTable"  :height="$getTableHeight()">

			<el-table-column type="selection" width="50" align="center">

			</el-table-column>

			<el-table-column label="商品编号" prop="info.origin.id.name" width="110" >
			
			</el-table-column>
	
			<el-table-column label="商品信息"  width="480">
				<template #default="scope">
					<wide-goods-item :goods="scope.row.info"></wide-goods-item>
				</template>
			</el-table-column>

			<el-table-column label="来源价格" width="250" align="center">
				<template #default="scope">
					<div class="GoodPrice">
						<span>￥{{scope.row.minPrice}}</span>~
						<span>￥{{scope.row.maxPrice}}</span>
					</div>
				</template>
			</el-table-column>

			<el-table-column label="总库存" width="150" align="center">
				<template #default="scope">
					<div class="GoodStock">
						<span>{{scope.row.stockNum}}</span>
					</div>
				</template>
			</el-table-column>

			<el-table-column label="采集时间/状态" width="180" show-overflow-tooltip align="center">
				<template #default="scope">
					<div class="GoodState">
						<div>
							<div v-if="scope.row.status == 0" style="color:#1CB903;">采集成功</div>
							<div v-if="scope.row.status == 1" style="color:#1679FB;">正在采集</div>
							<div v-if="scope.row.status == 2" style="color:#FF3A30;">
								采集失败<span>:{{scope.row.status}}</span></div>
						</div>
						<div class="" v-if="scope.row.status != 1">
							<div>2020.12.28 10:51:18</div>
						</div>
					</div>
				</template>
			</el-table-column>

			<el-table-column prop="PeoPle" label="采集人" width="110" align="center">
				<template #default="scope">
					<div class="GoodPeoPle">
						<span>{{scope.row.PeoPle}}</span>
					</div>
				</template>
			</el-table-column>

			<el-table-column fixed="right" prop="collectionPeoPle" label="操作" width="150" align="center">
				<template #default="scope" align="center">
					<div v-if="scope.row.status != 1" class="GoodOperation">
						<div v-if="scope.row.status == 2" @click='RetryShop(scope.$index)'>重试</div>
						<div v-else @click="$router.push({path: '/main/goodsList/PersonalCollectionLibrary/edit', query: {specialId: [scope.row.id],Cpage:page.currentPage,Spage:page.PageSize}})"  v-permission="[$route, 'edit']">
							编辑
						</div>|
						<div @click='DeleteShop(scope.$index)'>删除</div>
					</div>
				</template>
			</el-table-column>

		</el-table>
		<div class="footerBox">
			<div class="footerBtm" v-show="selectId">
				<el-button @click='BatchRetryShop()' :disabled="!selectId[0]">批量重试</el-button>
				<el-button @click='BatchDeleteShop()' :disabled="!selectId[0]">批量删除</el-button>
				<el-button @click="$router.push({path: '/main/goodsList/PersonalCollectionLibrary/edit',query: {specialId:selectId,Cpage:page.currentPage,Spage:page.PageSize}})"
				:disabled="!selectId[0]">批量编辑</el-button>
			</div>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.currentPage"
				:page-sizes="page.PageSizeS" :page-size="page.PageSize" layout="total, sizes, prev, pager, next, jumper" 
				:total="TabData.total">
			</el-pagination>
		</div>
	</div>

</template>

<script>
	import {
		defineComponent
	} from 'vue'
	import WideGoodsItem from "@/components/goods/WideGoodsItem.vue"
	import $api from "@/api"

	export default defineComponent({
		name: "personalList",
		components: {
		  // edit,
		  WideGoodsItem,
		},
		data() {
			return {
				TabData: [],
				multipleSelection: [],
				selectId:[],
				page:{
					PageSizeS:[10,20,30],
					currentPage:1,
					PageSize:10,
				},
			}
		},
		mounted() {
			
			this.getPersonLbShopListData()
		},
		methods: {


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
							// that.$message({
							//           message: '只能重试采集失败商品',
							//           type: 'warning'
							//         });
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
				$api.goodsApi.personLibrary.getPersonLbShopListData({
				  page: that.page.currentPage,
				  pageSize: that.page.PageSize,
				}).then((data) => {
					that.TabData = data;
					console.log(that.TabData)
				})
			},
			selectAll(val) {
				this.multipleSelection = val 
				var that = this
				that.selectId = [];
				val.forEach(function(itemI, indexI) {							
					that.selectId.push(itemI.id)
				})
			},
			handleSizeChange(val) {
				this.page.PageSize = val
				this.getPersonLbShopListData()
			},
			handleCurrentChange(val) {
				this.page.currentPage = val
				this.getPersonLbShopListData()
			}
		},
	})
</script>

<style scoped lang="scss">
	.Library-List {
		.GoodPrice,
		.GoodStock,
		.GoodPeoPle {
			color: #555555;
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
				cursor: pointer;
				a{
					text-decoration: none;
					color: #F9612E;
				}
			}
		}

		.GoodState {
			font-size: 14px;
			font-family: SourceHanSansSC-regular;
		}
		.footerBox{
			display: flex;
			justify-content: space-between;
			.footerBtm{
				margin-top: 30px;
			}
		}
	}	
</style>
