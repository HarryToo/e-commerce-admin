<template>
	<div class="editshop">
		<div class="editshopTitle">编辑商品</div>
		<div class="editshopBox">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="基本信息" name="1">
					<div class="BasicIf">
						<div class='BasicIfTitle'>基本信息</div>
						<div class="BasicIf-row centerF">
							<div class="BasicIf-ls centerF">
								<div class="BasicIf-lstitle" style="line-height: 40px;"><span>*</span>商品分类：</div>
								<div class="BasicIf-lscontent">
									<div style="line-height: 40px;">选择发布到货源平台的商品分类</div>
									<el-button type="danger" @click='shopSelcetShow = true'>选择分类</el-button>
								</div>
							</div>
							<div class="BasicIf-ls">
								<div class="BasicIf-lstitle"><span>*</span>商品品牌：</div>
								<div class="BasicIf-lscontent BasicIf-brand">
									<el-input v-model="shopbrand" placeholder="请输入内容"></el-input>
								</div>
							</div>
						</div>

						<div class="BasicIf-ls">
							<div class="BasicIf-lstitle">
								<span>*</span>商品标题：
							</div>
							<div class="BasicIf-lscontent">
								<el-input v-model="shopname" placeholder="请输入内容" maxlength="10" show-word-limit>
								</el-input>
							</div>
						</div>
						<div class="BasicIf-ls centerF">
							<div class="BasicIf-lstitle">
								<span>*</span>文案描述：
							</div>
							<div class="BasicIf-lscontent">
								<div style="line-height: 40px;">铺货到Shopee平台时，填充以下内容到产品详情描述部分，不支持编辑图片、字体样式等</div>
								<el-input type="textarea" :autosize="{ minRows: 5, maxRows: 25}" placeholder="请输入商品参数"
									v-model="shoParameter">
								</el-input>
							</div>
						</div>
						<div class="BasicIf-ls centerF">
							<div class="BasicIf-lstitle">
								<span>*</span>图片描述：
							</div>
							<div class="BasicIf-lscontent">
								<div style="line-height: 40px;">铺货到拼多多平台时，填充以下内容到产品详情描述部分</div>
								<textarea name="" id="" cols="30" rows="10"></textarea>
							</div>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="SKU属性" name="2">
					<div class="sku">
						<div>SKU属性</div>
						<div></div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="库存价格" name="3">
					<div class="stockPrice">
						<div class="stPrice-top">
							<div class="stPrice-toptitle">库存价格</div>
							<div class="stPrice-topbtn">
								<el-button type="danger">批量设置销售价</el-button>
								<el-button type="danger">批量设置库存</el-button>
							</div>
						</div>
						<div class="stPriceBox">
							<div class="stPriceBoxTitle">库存价格</div>
							<div class="stPriceBoxls">
								 <el-table
								      :data="tableData"
								      style="width: 100%">
								      <el-table-column
								        prop="date"
								        label="日期"
								        width="180">
								      </el-table-column>
								      <el-table-column
								        prop="name"
								        label="姓名"
								        width="180">
								      </el-table-column>
								      <el-table-column
								        prop="address"
								        label="地址">
								      </el-table-column>
								    </el-table>
							</div>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="商品主图" name="4">定时任务补偿</el-tab-pane>
				<el-tab-pane label="物流信息" name="5">定时任务补偿</el-tab-pane>
				<el-tab-pane label="来源链接" name="6">定时任务补偿</el-tab-pane>
			</el-tabs>
		</div>
		<el-dialog v-model="shopSelcetShow" >
			<el-select v-model="ClassValue[0]" filterable placeholder="请选择">
				<el-option v-for="val in shopSelcet.first" :key="val.value" :label="val.label" :value="val.value">
					
				</el-option>
			</el-select>
			<el-select v-model="ClassValue[1]" filterable placeholder="请选择">
				<el-option v-for="val in shopSelcet.second" :key="val.value" :label="val.label" :value="val.value">
				</el-option>
			</el-select>
			<el-select v-model="ClassValue[2]" filterable placeholder="请选择">
				<el-option v-for="val in shopSelcet.third" :key="val.value" :label="val.label" :value="val.value">
				</el-option>
			</el-select>
			  <template #footer>
			    <span class="dialog-footer">
			      <el-button @click="shopSelcetShow = false">取 消</el-button>
			      <el-button type="primary" @click="shopSelcetShow = false">确 定</el-button>
			    </span>
			  </template>
		</el-dialog>
	</div>
</template>

<script>
	import {
		defineComponent
	} from 'vue'
	import $api from "@/api"

	export default defineComponent({
		name: "UserList",
		data() {
			return {
				
				activeName: '1',
				shopbrand: '',
				shopname: '',
				shoParameter: '',
				shopSelcetShow:false,
				shopSelcet: '',
				ClassValue:[],
			};
		},
		mounted() {
			this.PersonEditClassData()
		},
		methods: {
			PersonEditClassData() {
				var that = this
				$api.shoplistApi.getPersonEditClassData().then((data) => {
					that.shopSelcet = data
				})
			},
			handleClick(tab, event) {
				console.log(tab, event);
			}
		}
	})
</script>

<style scoped lang="scss">
	.editshop {
		.editshopTitle {
			color: #101010;
			font-size: 16px;
			font-weight: 600;
			padding-bottom: 10px;
		}

		.editshopBox {

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

			.BasicIf {
				padding-left: 20px;

				padding-right: 56px;
				
				.BasicIfTitle {
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
					.BasicIf-brand{
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

					.el-input {
						width: 80%;
					}

					.el-button {
						background-color: #fff;
						color: #F9612E;
						border-color: #F9612E;
						width: 120px;
					}
				}
			}
			.stockPrice{
				padding-left: 20px;
				padding-right: 56px;
				.stPrice-top{
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					.stPrice-toptitle{
						font-size: 18px;
						color: #101010;
						font-weight: 600;
					}
					.stPrice-topbtn{
						.el-button{
							height: 30px;
							line-height: 30px;
							min-height: 30px;
							color: #F9612E;
							background-color: #fff;
							border-color: #F9612E;
							padding:0 12px
						}
					}
				}
				.stPriceBox{
					margin-top: 13px;
					display: flex;
					align-items: flex-start;
				}
			}
		}
		::v-deep .el-dialog{
			margin: 0 auto;
			margin-top: 18rem;
		}
	}
</style>
