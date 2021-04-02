<template>
	<div class="Library-List">
		<el-table :data="TabData" style="width: 100%" @selection-change="handleSelectionChange" border>

			<el-table-column type="selection" width="110" align="center">

			</el-table-column>

			<el-table-column label="商品信息" width="760">
				<template #default ="scope">
					<div class="GoodIf">
						<img :src="scope.row.img" alt="" class="GIimg">
						<div class="GIBox">
							<div class="GI-0">{{scope.row.name}}</div>
							<div class="GI-1">商品分类：{{scope.row.type}}</div>
							<div class="GI-2">
								<div class="GI-s0">来源平台：<span style="color: #F9612E;">{{scope.row.Source}}</span></div>
								<div class="GI-s1">来源ID：<span style="color: #F9612E;">{{scope.row.SorceId}}</span></div>
							</div>
						</div>
					</div>
				</template>
			</el-table-column>

			<el-table-column label="来源价格" width="150" align="center">
				<template #default ="scope">
					<div class="GoodPrice">
						<span>{{scope.row.PriceMin}}</span>~
						<span>{{scope.row.PriceMax}}</span>
					</div>
				</template>
			</el-table-column>

			<el-table-column label="总库存"  width="150" align="center">
				<template #default ="scope">
					<div class="GoodStock">
						<span>{{scope.row.TotalStock}}</span>
					</div>
				</template>
			</el-table-column>

			<el-table-column  label="采集时间/状态" width="150" show-overflow-tooltip align="center">
				<template #default ="scope">
					<div>
						<div>
							<div v-if="scope.row.collectionState == 0">采集成功</div>
							<div v-if="scope.row.collectionState == 1">正在采集</div>
							<div v-if="scope.row.collectionState == 2">采集失败<span>{{scope.row.failReason}}</span></div>
						</div>
						<div class="" v-if="scope.row.collectionState != 1">
							<div>2020.12.28  10:51:18</div>
						</div>
					</div>
				</template>
			</el-table-column>

			<el-table-column prop="collectionPeoPle" label="采集人" width="110" align="center">
				<template #default ="scope">
					<div class="GoodPeoPle">
						<span>{{scope.row.collectionPeoPle}}</span>
					</div>
				</template>
			</el-table-column>

			<el-table-column prop="collectionPeoPle" label="操作" width="150" align="center">
				<template #default="scope" align="center">
						<div v-if="scope.row.collectionState != 1" class="GoodOperation">
							<div v-if="scope.row.collectionState == 2">重试</div>
							<div v-else>编辑</div>|
							<div>删除</div>
						</div>
				</template>
			</el-table-column>

		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
			:current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="10"
			layout="total, sizes, prev, pager, next, jumper" :total="100">
		</el-pagination>
	</div>

</template>

<script>
	import {
		defineComponent
	} from 'vue'
	import $api from "@/api"

	export default defineComponent({
		name: "personalList",
		data() {
			return {
				TabData: [],
				multipleSelection: [],
			}
		},
		mounted() {
			this.getPersonLbShopListData()
		},
		methods: {

			getPersonLbShopListData() {
				var that = this
				$api.shoplistApi.getPersonLbShopListData().then((data) => {that.TabData = data})
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(val)
			},
			handleSizeChange(val) {
				console.log(val);
			},
			handleCurrentChange(val) {
				console.log(val);
			}
		},
	})
</script>

<style scoped lang="scss">
	.Library-List{
			.GoodIf{
				display: flex;
				align-items: center;
				.GIimg{
						width: 80px;
						background-color: #a6a6a6;
				}
				.GIBox{
					padding-left: 10px;
					.GI-0{
						display:-webkit-box;
						-webkit-box-orient:vertical;
						-webkit-line-clamp:2;
						overflow:hidden;
						color: #101010;
						font-size: 14px;
						line-height: 20px;
						height: 40px;
						font-family: SourceHanSansSC-regular;
					}
					.GI-1{
						color: #9d9c9c;
						font-size: 12px;
						font-family: SourceHanSansSC-regular;
					}
					.GI-2{
						display: flex;
						.GI-s0,.GI-s1{
							color: #9D9C9C;
							font-size: 12px;
							font-family: Microsoft Yahei;
						}
						.GI-s1{
							margin-left: 10px;
						}
					}
				}
			}
			.GoodPrice,.GoodStock,.GoodPeoPle{
				color: #101010;
				font-size: 14px;
				text-align: center;
				font-family: SourceHanSansSC-regular;
			}
			.GoodOperation{
				display: flex;
				justify-content: center;
				align-items: center;
				color: #F9612E;
				div{
					padding: 0 10px;
					font-size: 14px;
				}
			}
	}
</style>
