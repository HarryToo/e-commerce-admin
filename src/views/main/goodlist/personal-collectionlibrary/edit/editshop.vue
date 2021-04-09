<template>
	<div class="editshop">
		<div class="editshopTitle">编辑商品</div>
		<div class="editshopBox">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="基本信息" name="1">
					<div class="BasicIf">
						<div class='BasicIf-r0'>基本信息</div>
						<div class="BasicIf-row centerF">
							<div class="BasicIf-ls centerF">
								<div class="BasicIf-lstitle" style="line-height: 40px;"><span>*</span>商品分类：</div>
								<div class="BasicIf-lscontent">
									<div style="line-height: 40px; min-width: 250px;">选择发布到货源平台的商品分类</div>
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
						<div class="sku-r0">SKU属性</div>
						<div class="sku-r1">
							<div class="sku-r1-w0"><span>*</span>商品类型：</div>
							<div class="sku-r1-w1">
								<el-radio v-model="SkuType" label="1">单SKU商品</el-radio>
								<el-radio v-model="SkuType" label="2">多SKU商品</el-radio>
							</div>
						</div>
						<div class="sku-r2">
							<div class="sku-r2-w0"><span>*</span>SKU属性：</div>
							<div class="sku-r2-w1">
								<div class="sku-r2-w1-box">
									<div class="sku-r2-w1-r1">颜色</div>
									<div class="sku-r2-w1-r2">
										<span>属性值</span><span>单属性最多50个属性值，多属性最多20个属性值，每个属性不超过20个字符，可拖动排序</span>
									</div>
									<!-- <div class="sku-r2-w1-list"> -->
									<!-- 	<div class="sku-r2-w1-label"><span>黑色-高配七重减震-变频节能-汽车电池约350公里</span><span><img
													src="../../../../../assets/logo.png" alt=""></span></div>
										<div class="sku-r2-w1-label"><span>黑色-高配七重减震-变频节能-汽车电池约350公里</span><span><img
													src="../../../../../assets/logo.png" alt=""></span></div>
										<div class="sku-r2-w1-label"></div> -->
										
			<!-- 							<ul class="sku-r2-w1-list">
											<li class="sku-r2-w1-label"
												v-for="color in sku.colors"
												v-dragging="{ item: color, list: sku.colors, group: 'color' }"
												>
												
												<span>黑色-高配七重减震-变频节能-汽车电池约350公里</span><span><img
															src="../../../../../assets/logo.png" alt=""></span>
											</li>
											<li class="sku-r2-w1-add">+添加属性值</li>
										</ul> -->
										
									<!-- </div> -->
		
									      <draggable
									        class="list-group"
									        :list="sku.colors"
									        group="moveOne"
									        @change="log"
									        itemKey="name"
									      >
									        <template #item="{ element, index }">
									          <div class="list-group-item">{{ element.text }} {{ index }}</div>
									        </template>
									      </draggable>
	
								</div>
							</div>
						</div>
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
							<div class="stPriceBoxTitle"><span>*</span>库存价格:</div>
							<div class="stPriceBoxls">
								<!-- 	<el-table :data="tableData" style="width: 100%">
									<el-table-column prop="date" label="日期" width="180">
									</el-table-column>
									<el-table-column prop="name" label="姓名" width="180">
									</el-table-column>
									<el-table-column prop="address" label="地址">
									</el-table-column>
								</el-table> -->
							</div>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="商品主图" name="4">
					<div class="shopImg">
						<div class="shopImg-r0">商品主图</div>
						<div class="shopImg-r1">
							<div class="shopImg-r1-w0">商品图片</div>
							<div class="shopImg-r1-w1">
								<div class="shopImg-r1-w1-r0">
									<el-button type="danger">批量删除</el-button>
									<el-button type="danger">预览</el-button>
									<el-checkbox v-model="shopImg.checkAll" @change="ToCheckAll">全选</el-checkbox>
								</div>
								<div class="shopImg-r1-w1-r1">图片格式：JPG, JPEG, PNG; 单张图片大小不能超过1M；图片建议尺寸：800x800；可拖拽移动图片；
								</div>
								<div class="shopImg-r1-w1-r2">
									<div v-for='(val,idx) in shopImg.ValData' class="ShopListImg">
										<el-checkbox v-model="val.IsCheck" label=" "
											@change="changeCheckState(val.IsCheck,idx)"></el-checkbox>
										<img :src="val.img" alt="">
										<div class="ShopListFt">
											<div>替换</div>
											<div>删除</div>
										</div>
									</div>
									<div class="ShopListImg" @click='showfileinput'>
										<img src="../../../../../assets/logo.png" alt="" class="Add-ShopListImg">
										<div class="ShopListFt">添加新图片</div>
									</div>
									<input class="el-upload__input" type="file" name="file" @change="addfile"
										ref="image" accept="">
									<img :src="shopImg.addImg" alt="">
								</div>
							</div>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="物流信息" name="5">
					<div class="logistics">
						<div class='logistics-r0'>物流信息</div>
						<div class='logistics-r1'>
							<div class="logistics-r1-w0"><span>*</span>是否包邮</div>
							<div class="logistics-r1-w1">
								<el-radio v-model="logistics.IsFreeShipping" label="1">包邮</el-radio>
								<el-radio v-model="logistics.IsFreeShipping" label="2">不包邮</el-radio>
							</div>
						</div>
						<div class='logistics-r2'>
							<div class="logistics-r2-w0"><span>*</span>包裹重量</div>
							<div class="logistics-r2-w1">
								<el-input v-model="logistics.weight" placeholder="请输入重量"></el-input>
							</div>
						</div>
						<div class='logistics-r3'>
							<div class="logistics-r3-w0"><span>*</span>包裹尺寸</div>
							<div class="logistics-r3-w1">
								<el-input v-model="logistics.long" placeholder="长"></el-input>
								<el-input v-model="logistics.width" placeholder="宽"></el-input>
								<el-input v-model="logistics.height" placeholder="高"></el-input>

							</div>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="来源链接" name="6">
					<div class="Source">
						<div class="Source-r0">来源链接</div>
						<div class="Source-r1">
							<div class="Source-r1-c0"><span>*</span>来源URL：</div>
							<div class="Source-r1-c1">
								<el-input v-model="SourceLink" placeholder="请输入内容"></el-input>
							</div>
							<div class="Source-r1-c2">
								<el-button type="danger">复制</el-button>
							</div>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
		
		
		<el-dialog v-model="shopSelcetShow">
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
	import {defineComponent,ref} from 'vue'
	// import {VueDND} from 'awe-dnd'
	import draggable from "vuedraggable";
	// import draggable from 'vuedraggable'
	import $api from "@/api"

	export default defineComponent({
		name: "UserList",
        components: {
            draggable,
        },

		data() {
			return {

				sku:{
					ars:'',
					colors: [{
					          text: "Aquamarine"
					        }, {
					          text: "Hotpink"
					        }, {
					          text: "Gold"
					        }, {
					          text: "Crimson"
					        }, {
					          text: "Blueviolet"
					        }, {
					          text: "Lightblue"
					        }, {
					          text: "Cornflowerblue"
					        }, {
					          text: "Skyblue"
					        }, {
					          text: "Burlywood"
					        }],
					otherData:'1',
				},
				shopImg: {
					checkAll: false,
					addImg: '',
					checkedVal: [1, 2, 3],
					ValData: [{
						img: require('../../../../../assets/logo.png'),
						id: 1,
						IsCheck: false,
					}, {
						img: require('../../../../../assets/logo.png'),
						id: 2,
						IsCheck: false,
					}, {
						img: require('../../../../../assets/logo.png'),
						id: 3,
						IsCheck: false,
					}, {
						img: require('../../../../../assets/logo.png'),
						id: 4,
						IsCheck: false,
					}, {
						img: require('../../../../../assets/logo.png'),
						id: 1,
						IsCheck: false,
					}, {
						img: require('../../../../../assets/logo.png'),
						id: 2,
						IsCheck: false,
					}, {
						img: require('../../../../../assets/logo.png'),
						id: 3,
						IsCheck: false,
					}, {
						img: require('../../../../../assets/logo.png'),
						id: 4,
						IsCheck: false,
					}],
				},
				logistics: {
					IsFreeShipping: '1',
					weight: 100.12,
					long: 200,
					width: 180,
					height: 160,
				},
				SkuType: "1",
				SourceLink: 'https://element-plus.org/#/zh-CN/component/input',
				activeName: '1',
				shopbrand: '',
				shopname: '',
				shoParameter: '',
				shopSelcetShow: false,
				shopSelcet: '',
				ClassValue: [],
			};
		},
		mounted() {

			
			this.PersonEditClassData()
		},
		methods: {
		
			    log: function(evt) {
					console.log(this.sku.colors)
			      window.console.log(evt.moved.element);
			    },
			//商品主图
			showfileinput() {
				this.$refs.image.click();
			},
			addfile(e) {
				var that = this
				const file = e.target.files[0];
				console.log(file)
				// 限制上传图片类型
				if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)) {
					this.$message({
						message: "图片类型要求：jpeg、jpg、png",
						type: "error",
					});
					return false;
				}
				// 图片大小不超过1M
				if (file.size / (1024 * 1024) > 1) {
					this.$message({
						message: "图片大小不超过1M",
						type: "error",
					});
					return false;
				}
				// 文件转化base64格式，用于页面预览（或调用接口上传图片，获取图片地址，再赋值
				var reader = new FileReader();

				reader.onload = (data) => {
					that.addImg = data.target.result; // 图片赋值
				};
				reader.readAsDataURL(file);
				e.target.value = ""; // ！！！重要 input上传图片，可以连续上传同一张图片
			},
			ToCheckAll(val) {
				if (val) {
					for (var i = 0; i < this.shopImg.ValData.length; i++) {
						this.shopImg.ValData[i].IsCheck = true
					}

				} else {
					for (var i = 0; i < this.shopImg.ValData.length; i++) {
						this.shopImg.ValData[i].IsCheck = false
					}
				}
			},
			changeCheckState(val, idx) {
				this.shopImg.ValData[idx].IsCheck = val ? true : false;
			},
			PersonEditClassData() {
				var that = this
				$api.shopListApi.getPersonEditClassData().then((data) => {
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
			::v-deep .el-tabs__content {
				height: 585px;
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

			.BasicIf {
				padding-left: 20px;

				padding-right: 56px;

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
					display: flex;
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

						span {
							color: #f9612e;
						}
					}

					.sku-r2-w1 {
						width: calc(100% - 115px);

						.sku-r2-w1-box {
							margin-bottom: 20px;

							.sku-r2-w1-r1 {
								border: 1px solid #DCE0E7;
								border-radius: 4px;
								color: #888888;
								height: 40px;
								line-height: 40px;
								padding-left: 10px;
								font-size: 14px;
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
								padding-top: 10px;
								border-radius: 0 0 4px 4px;
								display: flex;
								align-items: center;
								flex-wrap: wrap;
								border: 1px solid #eeeeee;

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

								.sku-r2-w1-label {
									border: 1px solid #DCE0E7;
									margin-bottom: 10px;
									display: flex;
									align-items: center;
									color: #888888;
									height: 30px;
									border-radius: 4px;
									line-height: 28px;
									margin-left: 10px;

									span:nth-child(1) {
										padding: 0 5px;
									}

									span:nth-child(2) {
										line-height: 28px;
										height: 28px;
										padding: 0 6px;
										background-color: #DCE0E7;
										display: flex;
										align-items: center;
										border-radius: 0 4px 4px 0;
									}

									img {
										width: 18px;
										height: 18px;
									}
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
							display: flex;
							flex-wrap: wrap;

							.ShopListImg {
								margin-top: 11px;
								position: relative;
								margin-right: 11px;
								border-radius: 5px;
								border: 1px solid #F9612E;

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

						.el-input {
							margin-right: 20px;
							width: 300px;
						}
					}
				}
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
