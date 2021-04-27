<template>
	<div class="editshop">
		<div class="editshopBox">
			<el-tabs v-model="activeName">
				<el-tab-pane label="基本信息">
					<div class="BasicIf">
						<div class='BasicIf-r0'>基本信息</div>
							<div class="BasicIf-ls">
								<div class="BasicIf-lstitle" style="line-height: 40px;"><span>*</span>商品分类：</div>
								<div class="BasicIf-lscontent" >
									<div class="PreviewContent">{{previewData.gc_name}}</div>
								</div>
							</div>
						<div class="BasicIf-ls">
							<div class="BasicIf-lstitle"><span>*</span>商品品牌：</div>
							<div class="BasicIf-lscontent BasicIf-brand">
								<div class="PreviewContent">{{previewData.brand_name}}</div>
							</div>
						</div>
						<div class="BasicIf-ls">
							<div class="BasicIf-lstitle">
								<span>*</span>商品标题：
							</div>
							<div class="BasicIf-lscontent">
								<div class="PreviewContent">{{previewData.goods_name}}</div>
							</div>
						</div>
						<div class="BasicIf-ls centerF">
							<div class="BasicIf-lstitle">
								<span>*</span>文案描述：
							</div>
							<div class="BasicIf-lscontent">
								<div class="PreviewContent">{{previewData.goods_describe}}</div>
							</div>
						</div>
						<div class="BasicIf-ls centerF">
							<div class="BasicIf-lstitle">
								<span>*</span>图片描述：
							</div>
							<div class="BasicIf-lscontent">
								<div v-for="(val,idx) in previewData.goods_describe_image" class="Basic_Img">
									<img :src="val" alt="" :idx='idx'>
								</div>
							</div>
						</div>
					
					</div>	
				</el-tab-pane>
				<el-tab-pane label="SKU属性">
					<div class="sku">
						<div class="sku-r0">SKU属性</div>
						<div class="sku-r1">
							<div class="sku-r1-w1">
								<div class="sku-r1-w0"><span>*</span>商品类型：</div>								
									<div class="PreviewContent">
										<span v-if='previewData.type_id == 1'>单SKU商品</span>
										<span  v-else-if='previewData.type_id == 2'>多SKU商品</span>
									</div>
							</div>
						</div>
						<div class="sku-r2" v-for="(val,idx) in previewData.spec" v-show='previewData.type_id == 2'>
							<div class="sku-r2-w0"><span>*</span>SKU属性：</div>
							<div class="sku-r2-w1">
								<div class="sku-r2-w1-box PreviewContent">
									<div class="sku-r2-w1-r1">{{val.name}}</div>
									<div class="sku-r2-w1-r2">
										<span>属性值</span>
									</div>
									<div class="sku-r2-w1-list">
										
										<div class="list-group-item" v-for='(element,idx) in val.data'
										 style="border: 1px solid #F9612E;margin-right: 1rem;padding: 4px 10px;border-radius: 3px;margin-bottom: 10px;">
											<div>{{ element.text }} {{element.id}}</div>
										</div>
									</div>			
								</div>
							</div>
						</div>
						
						<div class="sku-r2" v-show='previewData.type_id == 1'>
							<div class="sku-r2-w0"><span>*</span>SKU属性：</div>
							<div class="sku-r2-w1">
								<div class="sku-r2-w1-box PreviewContent">
									<div class="sku-r2-w1-r1">{{previewData.spec[0].name}}</div>
									<div class="sku-r2-w1-r2">
										<span>属性值</span>
									</div>
									<div class="sku-r2-w1-list">
										<div class="list-group-item" v-for='(element,idx) in previewData.spec[0].data' 
										style="border: 1px solid #F9612E;margin-right: 1rem;padding: 4px 10px;border-radius: 3px;margin-bottom: 10px;">
											<div>{{ element.text }} {{element.id}}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
	
					</div>
					
				</el-tab-pane>
				<el-tab-pane label="库存价格">
						<div class="stockPrice">
							<div class="stPrice-top">
								<div class="stPrice-toptitle">库存价格</div>
							</div>
							<div class="stPriceBox">


									<el-table :data="previewData.goods_specification" style="width: 100%">
										<el-table-column prop="specification_name" label="规格" width="250" align="center">
										</el-table-column>
										<el-table-column prop="sku_num" label="SKU编号" width="250" align="center">
										</el-table-column>
										<el-table-column prop="source_price" label="来源价" align="center">
										</el-table-column>
										<el-table-column prop="market_price" label="销售价" align="center">
										</el-table-column>
										<el-table-column prop="inventory" label="库存" align="center">
										</el-table-column>
									</el-table>
						
							</div>
						</div>
		
				</el-tab-pane>
				<el-tab-pane label="商品主图">
			<div class="shopImg">
				<div class="shopImg-r0">商品主图:</div>
				<div class="shopImg-r1">
					<div class="shopImg-r1-w0">商品图片</div>
					<div class="shopImg-r1-w1">
						<div class="shopImg-r1-w1-r2">
							<div class="ShopListImg" v-for='(val,idx) in previewData.goods_image'>
								<img :src="val.img" alt="">
							</div>
						</div>
					</div>
				</div>
			
				<div class="shopImg-r1">
					<div class="shopImg-r1-w0">SKU图片:</div>
					<div class="shopImg-r1-w1">
						<div class="shopImg-r1-w1-r2">
							<div class="shopImg-r1-w1-r2">
								<div class="ShopListImg" v-for='(val,idx) in previewData.goods_sku_image'>
									<img :src="val.img" alt="">
								</div>
							</div>						
						</div>
					</div>
				</div>
			
			</div>
			
				</el-tab-pane>
				<el-tab-pane label="物流信息">
					<div class="logistics">
						<div class='logistics-r0'>物流信息</div>
						<div class='logistics-r1'>
							<div class="logistics-r1-w0"><span>*</span>是否包邮</div>
							<div class="logistics-r1-w1">
								<div class="PreviewContent">
									<span v-if='previewData.is_postage == 1'>包邮</span>
									<span  v-else-if='previewData.is_postage == 2'>不包邮</span>
								</div>
							</div>
						</div>
						<div class='logistics-r2'>
							<div class="logistics-r2-w0"><span>*</span>包裹重量</div>
							<div class="logistics-r2-w1">
								<div class="PreviewContent">
									{{previewData.parcel_weight}}KG
								</div>
							</div>
						</div>
						<div class='logistics-r3'>
							<div class="logistics-r3-w0"><span>*</span>包裹尺寸</div>
							<div class="logistics-r3-w1">
								<div class="PreviewContent">
									长 : {{previewData.parcel_length}}CM
								</div>
								<div class="PreviewContent">
									宽 : {{previewData.parcel_width}}CM
								</div>
								<div class="PreviewContent">
									高 : {{previewData.parcel_high}}CM
								</div>
							</div>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="来源链接">
					<div class="Source">
						<div class="Source-r0">来源链接</div>
						<div class="Source-r1">
							<div class="Source-r1-c0"><span>*</span>来源URL：</div>
							<div class="Source-r1-c1">
								<div class="PreviewContent">{{previewData.source_id_url}}</div>
							</div>
							<div class="Source-r1-c2">
								<el-button type="danger">复制</el-button>
							</div>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
			
	</div>
</template>

<script>
	import {
		defineComponent,
		ref
	} from 'vue';
	export default defineComponent({
		props:{
			previewData:[Object,Array],
			},
		name: "preview",
		data() {
			return {
				activeName:'0',
			};
		},
		mounted() {
	
		},
		methods: {

		},
		computed:{
			PreviewD(){
				console.log(this.previewData)
				return this.previewData
			},
		},
	})
</script>

<style scoped lang="scss">
	.PreviewContent{
		color: #F9612E;
	}
	.editshop {
		height: calc(100vh - 300px)!important;
		.editshopTitle {
			color: #101010;
			font-size: 16px;
			font-weight: 600;
			padding-bottom: 10px;
			
		}
		::v-deep .el-tabs__header{
			margin: 0 0 3px!important;
		}
		::v-deep .el-tabs__content{
			padding-top: 1rem;
		}
		.BasicIf {
			padding-left: 20px;
		
			padding-right: 56px;
		.Basic_Img{
			width: 100%;
			
			text-align: center;
			img{
				width: 100%;
			}
		}
			.BasicIf-r0 {
				color: #101010;
				font-size: 18px;
				font-weight: 600;
			}
		
			.centerF {
				align-items: flex-start !important;
			}
		
			.BasicIf-row {
				margin-top: 20px;
				display: flex;
				width: 100%;
		
				justify-content: space-between;
			}
		
			.BasicIf-ls {
				padding-left: 20px;
				display: flex;
				align-items: center;
				margin-bottom: 20px;
		
				.BasicIf-brand {
					.el-input {
						width: 350px;
					}
				}
			}
		
			.BasicIf-lstitle {
				display: flex;
				align-items: center;
				line-height: 40px;
				color: #606266;
		
				span {
					color: #FF3A30;
				}
			}
		
			.BasicIf-lscontent {
				margin-left: 5px;
				color: #afafaf;
				width: calc(100% - 115px);
				.el-input {
					width: 100%;
				}
		
				.el-button {
					background-color: #fff;
					color: #F9612E;
					border-color: #F9612E;
					width: 120px;
				}
			}
		}
		.sku {
			padding-left: 20px;
			padding-right: 56px;
		
			.sku-r0 {
				color: #101010;
				font-size: 18px;
				font-weight: 600;
			}
		
			.sku-r1 {
				padding-top: 20px;
				padding-left: 20px;
				height: 30px;
				padding-right: 30px;
				display: flex;
				justify-content: space-between;
				align-items: center;
		
				.sku-r1-w0 {
					width: 85px;
					color: #101010;
					font-size: 14px;
		
					span {
						color: #f9612e;
		
					}
				}
		
				.sku-r1-w1 {
					display: flex;
		
					::v-deep .el-radio__inner:hover {
						border-color: #f9612e;
					}
		
					::v-deep .el-radio__input.is-checked .el-radio__inner {
						background-color: #f9612e;
						border-color: #f9612e;
					}
		
					::v-deep .el-radio__input.is-checked+.el-radio__label {
						color: #f9612e;
					}
				}
			}
		
			.sku-r2 {
				padding-top: 20px;
				padding-left: 20px;
				display: flex;
				align-items: flex-start;
		
				.sku-r2-w0 {
					width: 85px;
					color: #101010;
					font-size: 14px;
					line-height: 40px;
		
					span {
						color: #f9612e;
					}
				}
		
				.sku-r2-w1 {
					width: calc(100% - 115px);
		
					.sku-r2-w1-box {
						margin-bottom: 20px;
		
						.sku-r2-w1-r1 {
							// height: 40px;
							// line-height: 40px;
							// padding-left: 10px;
							// font-size: 14px;
						}
		
						.sku-r2-w1-r2 {
							border-radius: 4px 4px 0 0;
							display: flex;
							justify-content: space-between;
							align-items: center;
							background-color: #eeeeee;
							margin-top: 10px;
							padding: 0 10px;
							height: 40px;
							line-height: 40px;
		
							span:nth-child(1) {
								font-size: 14px;
								color: #101010;
							}
		
							span:nth-child(2) {
								font-size: 12px;
								color: #999999;
							}
						}
		
						.sku-r2-w1-list {
							padding: 10px;
							border-radius: 0 0 4px 4px;
							flex-wrap: wrap;
							border: 1px solid #eeeeee;
							display: flex;
							.list-group {
								display: flex;
								align-items: center;
								flex-wrap: wrap;
		
								.dragging {
									transform: scale(1.1);
								}
		
								.list-group-item {
									height: 30px;
									display: flex;
									align-items: center;
									border: 1px solid #F9612E!important;
									display: flex;
									margin-bottom: 10px;
									border-radius: 5px;
								}
							}
		
							.sku-r2-w1-add {
								background-color: rgba(249, 97, 46, 0.4);
								color: #F9612E;
								font-size: 12px;
								border: 1px solid #F9612E;
								height: 30px;
								line-height: 28px;
								padding: 0 30px;
								border-radius: 4px;
								margin-left: 10px;
								margin-bottom: 10px;
							}
		
						}
					}
				}
			}
		}
		
		.shopImg {
			padding-left: 20px;
			padding-right: 56px;
		
			.shopImg-r0 {
				color: #101010;
				font-size: 18px;
				font-weight: 600;
			}
		
			.shopImg-r1 {
				padding-top: 20px;
				padding-left: 20px;
				display: flex;
				align-items: flex-start;
		
				.shopImg-r1-w0 {
					line-height: 40px;
					width: 85px;
		
					span {
						color: #FF3A30;
					}
				}
		
				.shopImg-r1-w1 {
					.shopImg-r1-w1-r0 {
						.el-button {
							background-color: #fff;
							color: #F9612E;
							border-color: #F9612E;
						}
		
						.el-button:nth-child(2) {
							margin-left: 30px;
						}
		
						.el-checkbox {
							margin-left: 30px;
						}
		
					}
		
					.shopImg-r1-w1-r1 {
						color: #999999;
						font-size: 14px;
						margin-top: 15px;
					}
		
					.shopImg-r1-w1-r2 {
		
						// display: flex;
						// flex-wrap: wrap;
						.dragBox {
							// display: flex;
							// flex-wrap: wrap;
						}
		
						.ShopListImg {
							float: left;
							margin-top: 11px;
							position: relative;
							margin-right: 11px;
							border-radius: 5px;
							border: 1px solid #F9612E;
		
							.sortable-ghost {
								transform: scale(1.2);
							}
		
							.chosenClass {
								transform: scale(1.2);
							}
		
							.Add-ShopListImg {
								// dis
							}
		
							.el-checkbox {
								position: absolute;
								top: 0;
								right: 0;
							}
		
							.ShopListFt {
								overflow: hidden;
								display: flex;
								justify-content: center;
								font-size: 12px;
								color: #101010;
								align-items: center;
								height: 32px;
								background-color: #EEEEEE;
								border-radius: 0 0 5px 5px;
								cursor: pointer;
								-webkit-user-select: none;
								-moz-user-select: none;
								-o-user-select: none;
								-ms-user-select: none;
								user-select: none;
		
								div:nth-child(1) {
									border-right: 1px solid #CCCCCC;
		
								}
		
								div {
									width: 50%;
									color: #101010 10000%;
									text-align: center;
									font-size: 12px;
									// cursor: pointer;
									// -webkit-user-select:none;
									// -moz-user-select:none;
									// -o-user-select:none;
									// -ms-user-select:none;
									// user-select:none;
								}
							}
		
							img {
								display: block;
								width: 138px;
								background-color: #F9612E;
							}
						}
		
					}
		
					::v-deep .el-checkbox__input.is-checked .el-checkbox__inner,
					.el-checkbox__input.is-indeterminate .el-checkbox__inner {
						border-color: #F9612E;
						background-color: #F9612E;
					}
		
					::v-deep .el-checkbox__input.is-focus .el-checkbox__inner {
						border-color: #F9612E;
					}
		
					::v-deep .el-checkbox__inner:hover {
						border-color: red;
					}
		
					::v-deep .el-checkbox__input.is-checked+.el-checkbox__label {
						color: #F9612E;
					}
				}
			}
		
		}
		.stockPrice {
			padding-left: 20px;
			padding-right: 56px;
		
			.stPrice-top {
				display: flex;
				justify-content: space-between;
		
				.stPrice-toptitle {
					font-size: 18px;
					color: #101010;
					font-weight: 600;
				}
		
				.stPrice-topbtn {
					.el-button {
						height: 30px;
						line-height: 30px;
						min-height: 30px;
						color: #F9612E;
						background-color: #fff;
						border-color: #F9612E;
						padding: 0 12px
					}
				}
			}
		
			.stPriceBox {
				margin-top: 13px;
				display: flex;
				align-items: flex-start;
		
				.stPriceBoxTitle {
					width: 100px;
					padding-left: 20px;
					line-height: 48px;
		
					span {
						color: #FF3A30;
					}
				}
		
				.stPriceBoxls {
					width: calc(100% - 115px);
				}
			}
		}
		
		.logistics {
			padding-left: 20px;
			padding-right: 56px;
		
			.logistics-r0 {
				color: #101010;
				font-size: 18px;
				font-weight: 600;
			}
		
			.logistics-r1 {
				display: flex;
				align-items: center;
				margin-top: 20px;
				padding-left: 20px;
		
				.logistics-r1-w0 {
		
					width: 85px;
					font-size: 14px;
					color: #101010;
		
					span {
						color: #FF3A30;
					}
				}
		
				.logistics-r1-w1 {
					::v-deep .el-radio__inner:hover {
		
						border-color: #f9612e;
		
					}
		
					::v-deep .el-radio__input.is-checked .el-radio__inner {
		
						background-color: #f9612e;
		
						border-color: #f9612e;
		
					}
		
					::v-deep .el-radio__input.is-checked+.el-radio__label {
		
						color: #f9612e;
		
					}
				}
			}
		
			.logistics-r2 {
				display: flex;
				align-items: center;
				margin-top: 20px;
				padding-left: 20px;
		
				.logistics-r2-w0 {
		
					width: 85px;
					font-size: 14px;
					color: #101010;
		
					span {
						color: #FF3A30;
					}
				}
		
				.logistics-r2-w1 {
					.el-input {
						width: 300px;
		
						::v-deep .el-icon-date:before {
							content: 'KG' !important;
						}
					}
				}
		
			}
		
			.logistics-r3 {
				display: flex;
				align-items: center;
				margin-top: 20px;
				padding-left: 20px;
		
				.logistics-r3-w0 {
		
					width: 85px;
					font-size: 14px;
					color: #101010;
		
					span {
						color: #FF3A30;
					}
				}
		
				.logistics-r3-w1 {
					display: flex;
					justify-content: center;
					div{
						margin-right: 2rem;
					}
					
				}
			}
		}
		
		.editshopBox {
			::v-deep .el-tabs__content {
				height: calc(100vh - 400px);
				overflow-y: scroll;
			}

			::v-deep .el-tabs__content::-webkit-scrollbar {
				width: 10px;
			}

			::v-deep .el-tabs__content::-webkit-scrollbar-track {
				background: #efefef;
				border-radius: 2px;
			}

			::v-deep .el-tabs__content::-webkit-scrollbar-thumb {
				background: #cecece;
				border-radius: 10px;
			}

			::v-deep .el-tabs__content::-webkit-scrollbar-thumb:hover {
				background: #ff632f;
			}

			::v-deep .el-tabs__content::-webkit-scrollbar-corner {
				background: #9a8a37;
			}

			::v-deep .el-tabs__nav-wrap {
				padding-left: 1rem;
				background-color: #EEEEEE;
				color: #101010;
				font-size: 14px;
			}

			::v-deep .el-tabs__item:hover {
				color: #F9612E;
			}

			::v-deep .el-tabs__item {
				line-height: 55px;
				height: 55px;
			}

			::v-deep .el-tabs__item.is-active {
				color: #F9612E;
			}

			::v-deep .el-tabs__nav-wrap::after {
				height: 0rem;
			}

			::v-deep .el-tabs__active-bar {
				height: 0px;
			}

			
			.Source {
				padding-left: 20px;
				padding-right: 56px;

				.Source-r0 {
					color: #101010;
					font-size: 18px;
					font-weight: 600;
				}

				.Source-r1 {
					display: flex;
					align-items: center;
					margin-top: 20px;
					padding-left: 20px;

					.Source-r1-c0 {

						width: 85px;
						font-size: 14px;
						color: #101010;

						span {
							color: #FF3A30;
						}
					}

					.Source-r1-c1 {
						width: calc(100% - 115px);
					}

					.Source-r1-c2 {
						margin-left: 6px;

						.el-button {
							width: 80px;
							color: #fff;
							background-color: #F9612E;
							border-color: #F9612E;
						}
					}
				}
			}
		}
		::v-deep .el-dialog {
			margin: 0 auto;
			margin-top: 18rem;
		}
	}
</style>
