<template>
	<div class="editshop" :id='AliveData'>
		<div class="editshopTitle">编辑商品</div>
		<div class="editshopBox">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="基本信息">
					<baisc 
					:gc_name_val='editData?editData.gc_name_val:[]'
					:brand_name='editData?editData.brand_name:""'
					:goods_name='editData?editData.goods_name:""'
					:goods_describe='editData?editData.goods_describe:""'
					:goods_describe_image='editData?editData.goods_describe_image:[]'
					@ModBsc = 'modifyEdit'
					></baisc>
					<!-- <slot name='basicSlot'></slot> -->
				</el-tab-pane>
				<el-tab-pane label="SKU属性">
					<sku 
					:type_id='editData?editData.type_id:""'
					:spec='editData?editData.spec:""'
					@ModSKU = 'modifyEdit'
					></sku>
				</el-tab-pane>
				<el-tab-pane label="库存价格">
					<price 
					:goods_specification='editData?editData.goods_specification:[]'
					></price>
				</el-tab-pane>
				<el-tab-pane label="商品主图">
					<ShopImgSlot 
					:goods_sku_image='editData?editData.goods_sku_image:[]'
					:goods_image='editData?editData.goods_image:[]'
					@ModShopImg = 'modifyEdit'
					></ShopImgSlot>	
				</el-tab-pane>
				<el-tab-pane label="物流信息">
					<logistics 
					:parcel_weight='editData?editData.parcel_weight:""'
					:parcel_length='editData?editData.parcel_length:""'
					:parcel_width='editData?editData.parcel_width:""'
					:parcel_high='editData?editData.parcel_high:""'
					:is_postage='editData?editData.is_postage:1'
					@ModLogistics='modifyEdit'
					></logistics>
				</el-tab-pane>
				<el-tab-pane label="来源链接">
					<div class="Source">
						<div class="Source-r0">来源链接</div>
						<div class="Source-r1">
							<div class="Source-r1-c0"><span>*</span>来源URL：</div>
							<div class="Source-r1-c1">
								<el-input v-model="SourceLink" placeholder="请输入内容" @input='ModSourcelink($event)'></el-input>
							</div>
							<div class="Source-r1-c2">
								<el-button type="danger">复制</el-button>
							</div>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	<div class="btmBotton">
		  <el-button type="primary">取消</el-button>
		  <el-button type="danger" @click='PreviewShow = true'>预览</el-button>
		  <el-button type="danger">保存</el-button>
		  <el-button type="danger">发布</el-button>
	</div>
	
	<el-dialog
	  title="预览"
	  v-model="PreviewShow"
	  top='5vh'
	  center>
	  <preview  :previewData='editData?editData:[]'
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
		defineComponent,
		ref
	} from 'vue'
	import draggable from "vuedraggable";
	import $api from "@/api"
	import baisc from "@/components/goods/edit/baisc"
	import sku from "@/components/goods/edit/sku"
	import ShopImgSlot from "@/components/goods/edit/shopimg"
	import price from "@/components/goods/edit/price"
	import logistics from "@/components/goods/edit/logistics"
	import preview from "@/components/goods/edit/preview"
	export default defineComponent({
		props:{
			GoodList:Object,
			LiveId:{
				type:[Number],
				default:0,
			},
			},
		name: "UserList",
		components: {	
			draggable,
			baisc,
			sku,
			ShopImgSlot,
			price,
			logistics,
			preview,
		},

		data() {
			return {
				editData:[],
				activeName: '0',
				PreviewShow:false,
				SourceLink: 'https://element-plus.org/#/zh-CN/component/input',
			};
		},
		mounted() {
	
		},
		methods: {
			handleClick(e){
				console.log(e)
			},
			ModSourcelink(e){
				this.editData.source_id_url  = e
			},
			modifyEdit(value){
				console.log(value)
				this.editData[value.val] = value.e
			},
		},
		computed:{
			AliveData(){
				var _this = this
				if(this.GoodList!=''){
					this.GoodList.forEach(function(item){
						if(item.id == _this.LiveId){
							_this.editData = item
							_this.SourceLink = item.source_id_url
						}
					})
				}				
			},
		},
	})
</script>

<style scoped lang="scss">
	.editshop {
		height: calc(100vh - 230px);
		.editshopTitle {
			color: #101010;
			font-size: 16px;
			font-weight: 600;
			padding-bottom: 10px;
			
		}
		::v-deep .el-tabs__header{
			margin: 0 0 3px!important;
		}
		.editshopBox {
			::v-deep .el-tabs__content {
				height: calc(100vh - 420px);
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
		.btmBotton{
			height: 100px;
			width: 100%;
			margin-top: 20px;
			display: flex;
			align-items: center;
			box-shadow: 0 0 3px rgba(0,0,0,0.2);
			justify-content: center;
			.el-button{
				width: 150px;
			}
			.el-button--danger{
				background-color: #fff;
				color: #101010;
				border: 1px solid #F9612E;
				background-color:  #F9612E;
				color: #fff;
				box-shadow: 3px 3px 5px rgba(0,0,0,0.4);
			}
			.el-button--primary{
				background-color: #fff;
				color: #101010;
				border: 1px solid rgba(0,0,0,0.1);
				background-color:  rgba(0,0,0,0.1);
				box-shadow: 3px 3px 5px rgba(0,0,0,0.4);
			}
		}
		::v-deep .el-dialog {
			margin: 0 auto;
			margin-top: 18rem;
		}
	}
</style>
