<template>
	<div class="Library-List">
		<el-table :data="TabData.list" style="width: 100%" @selection-change="selectAll" stripe ref="multipleTable"  :height="$getTableHeight()">

			<el-table-column type="selection" width="50" align="center">

			</el-table-column>

			<el-table-column label="商品编号" prop="info.origin.id.name" width="110" >
			
			</el-table-column>
	
			<el-table-column label="商品信息"  width="520">
				<template #default="scope">
					<wide-goods-item :goods="scope.row.info"></wide-goods-item>
				</template>
			</el-table-column>

			<el-table-column label="销售价格" width="250" align="center">
				<template #default="scope">
					<div class="GoodPrice">
						<span>￥{{scope.row.minPrice}}</span>~
						<span>￥{{scope.row.maxPrice}}</span>
					</div>
				</template>
			</el-table-column>

			<el-table-column label="总库存" width="250" align="center">
				<template #default="scope">
					<div class="GoodStock">
						<span>{{scope.row.stockNum}}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="被铺货数/被采购数" width="250" align="center">
				<template #default="scope">
					<div class="GoodStock">
						<span>{{scope.row.Distribution}}</span>/
						<span>{{scope.row.purchase}}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="入库时间/状态&nbsp;" width="250" show-overflow-tooltip align="center">
				<template #default="scope">
					<div class="GoodState">
						<div>
							<div v-if="scope.row.status == 0" style="color:#1CB903;">上架中</div>
							<div v-if="scope.row.status == 1" style="color:#FF3A30;">已下架</div>
							<!-- <div v-if="scope.row.status == 2" style="color:#FF3A30;">
								采集失败<span> : {{scope.row.stateReason}}</span></div> -->
						</div>
						<div class="">
							<div>{{scope.row.Ptime}}</div>
						</div>
					</div>
				</template>
			</el-table-column>

			<el-table-column prop="PeoPle" label="入库人" width="250" align="center">
				<template #default="scope">
					<div class="GoodPeoPle">
						<span>{{scope.row.PeoPle}}</span>
					</div>
				</template>
			</el-table-column>

			<el-table-column fixed="right" prop="collectionPeoPle" label="操作" width="250" align="center">
				<template #default="scope" align="center">
					<div class="GoodOperation">
						<div @click='showDetail(scope.$index)'>查看</div>|
						<div @click="$router.push({path: '/main/goodsList/PlatformGoodLibrary/edit', query: {specialId: [scope.row.id],Cpage:page.currentPage,Spage:page.PageSize}})">
							编辑
						</div>|
						<div v-if="scope.row.status == 0" @click='Putdown(scope.$index)'>下架</div>
						<div v-else @click='PutOn(scope.$index)'>上架</div>|
						<div v-if="scope.row.status == 1" @click='DeleteShop(scope.$index)'>删除</div>
					</div>
				</template>
			</el-table-column>

		</el-table>
		<div class="footerBox">
			<div class="footerBtm" v-show="selectId" style="padding-left: 10px;">
				<el-button @click='BatchPutOn()' :disabled="!selectId[0]" type="danger" size="small">批量上架</el-button>
				<el-button @click='BatchPutdown()' :disabled="!selectId[0]" type="danger" size="small">批量下架</el-button>
				<el-button @click='BatchDeleteShop()' :disabled="!selectId[0]" type="danger" size="small">批量删除</el-button>
			</div>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.currentPage"
				:page-sizes="page.PageSizeS" :page-size="page.PageSize" layout="total, sizes, prev, pager, next, jumper" 
				:total="TabData.total">
			</el-pagination>
		</div>
		<el-dialog
		  title="预览"
		  v-model="PreviewShow"
		  top='5vh'
		  center>
		  <preview  
		  :previewData='editData?editData:[]'
		  >
		  </preview>
		  <template #footer>
		    <span class="dialog-footer">
		      <el-button type="primary" @click="PreviewShow = false">确 定</el-button>
		    </span>
		  </template>
		
		</el-dialog>
	</div>
</template>

<script>
	import {
		defineComponent
	} from 'vue'
	import WideGoodsItem from "@/components/goods/WideGoodsItem.vue"
	import preview from "@/components/goods/edit/preview"
	import $api from "@/api"

	export default defineComponent({
		name: "platformList",
		components: {
		  // edit,
		  WideGoodsItem,
		  preview,
		},
		data() {
			return {
				editData:'',
				PreviewShow:false,
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
			//查看
			showDetail(sl_id){
				var _this = this
				$api.goodsApi.personLibrary.getgoodDetailData({
					id: sl_id,
				}).then((data) => {
					_this.editData = data.list
					_this.PreviewShow = true;
				})	
			},
			//批量删除
			BatchDeleteShop() {
				var that = this
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
						that.TabData.list.forEach(function(itemI, indexI) {							
							if (item.id === itemI.id) {
								that.TabData.list.splice(indexI, 1)		
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
			//批量上架
			BatchPutOn(){	
				var that = this

				var data = this.multipleSelection;
				this.$confirm('是否批量上架', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					data.forEach(function(item, index) {
						if(item.status != '1'){
							 return false
						}
						that.TabData.list.forEach(function(itemI, indexI) {							
							if (item.id === itemI.id) {
								that.TabData.list[indexI].status = '0'
							}
					
						})
					
					})
				})
			},
			//批量下架
			BatchPutdown(){
				var that = this
			
				var data = this.multipleSelection;
				this.$confirm('是否批量下架', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					data.forEach(function(item, index) {
						if(item.status != '0'){
							 return false
						}
						that.TabData.list.forEach(function(itemI, indexI) {							
							if (item.id === itemI.id) {
								that.TabData.list[indexI].status = '1'
							}
					
						})
					
					})
				})
			},
			//上架
			PutOn(idx){
				this.$confirm('是否上架', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.TabData.list[idx].status = '0';
				})
			},
			//下架
			Putdown(idx){
				this.$confirm('是否下架', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.TabData.list[idx].status = '1';
				})
			},
			//删除当前商品
			DeleteShop(index) {
				
				this.$confirm('删除后，将无法恢复该商品记录，请谨慎删除！', '确认要删除这件商品吗？', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					console.log(this.TabData)
					this.TabData.list.splice(index, 1);
				})
			},
			getPersonLbShopListData() {
				var that = this
				$api.goodsApi.personLibrary.getplatformShopListData({
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
				.el-button{
					// background-color: #F9612E;
				}
			}
		}
	}	
</style>
