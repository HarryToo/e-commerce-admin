<template>
	<!-- {{editData}} -->
	<div class="editshop" :ID='AliveData'>
		<slot name='basicSlot'></slot>
		<div class="editshopTitle">编辑商品</div>
		<div class="editshopBox">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="基本信息">
					<baisc 
					:gc_name_val='editData?editData.gc_name_val:""'
					:brand_name='editData?editData.brand_name:""'
					:goods_name='editData?editData.goods_name:""'
					:goods_describe='editData?editData.goods_describe:""'
					@ModBsc = 'modifyEdit'
					></baisc>
					<!-- <slot name='basicSlot'></slot> -->
				</el-tab-pane>
				<el-tab-pane label="SKU属性">
					<sku :baisc='GoodList'></sku>
				</el-tab-pane>
				<el-tab-pane label="库存价格">
					<price 
					:goods_sku_image='editData?editData.goods_sku_image:""'
					:goods_image='editData?editData.goods_image:""'
					@Modprice = 'modifyEdit'
					></price>
				</el-tab-pane>
				<el-tab-pane label="商品主图">
					<ShopImg 
					
					></ShopImg>	
				</el-tab-pane>
				<el-tab-pane label="物流信息">
					<logistics 
					:parcel_weight='editData?editData.parcel_weight:""'
					:parcel_length='editData?editData.parcel_length:""'
					:parcel_width='editData?editData.parcel_width:""'
					:parcel_high='editData?editData.parcel_high:""'
					:is_postage='editData?editData.is_postage:""'
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
		<!-- 预览图片 -->
		<el-image-viewer v-if="shopImg.showViewer" :on-close="()=>{shopImg.showViewer=false}" :url-list="shopImg.srcList" />
					<!-- 批量设置库存 -->
					<el-dialog title="批量设置库存：" v-model="price.StockDialog.state" >
						<div class="DiaLog">
							<el-radio v-model="price.StockDialog.radio" label="1">
								<div>库存统一设置为</div><el-input v-model="price.StockDialog.input1" :disabled="price.StockDialog.radio != 1" placeholder="请输入内容"></el-input>
							</el-radio>
							<el-radio v-model="price.StockDialog.radio" label="2">
								<div>原库存基础上增加</div><el-input v-model="price.StockDialog.input2" :disabled="price.StockDialog.radio != 2" placeholder="请输入内容"></el-input>
							</el-radio>
							<el-radio v-model="price.StockDialog.radio" label="3">
								<div>原库存基础上减少</div><el-input v-model="price.StockDialog.input3" :disabled="price.StockDialog.radio != 3" placeholder="请输入内容"></el-input>
							</el-radio>
						</div>
						<template #footer>
							<span class="dialog-footer">
								<el-button type="primary" @click="modfiyAllStock">确 定</el-button>
							</span>
						</template>
					</el-dialog>
					<!-- 批量设置销售价 -->
					<el-dialog title="批量设置销售价：" v-model="price.PriceDialog.state">
						<div class="DiaLog">
							<el-radio v-model="price.PriceDialog.radioTp" label="1">
								<div>同步来源价</div>
							</el-radio>
							<el-radio v-model="price.PriceDialog.radioTp" label="2">
								<div>设置统一价</div><el-input v-model="price.PriceDialog.inputPrice" :disabled="price.PriceDialog.radioTp != 2" placeholder="请输入价格"></el-input>
							</el-radio>
							<el-radio v-model="price.PriceDialog.radioTp" label="3">
								<div>使用公式</div>
								<div class="PriceDialogCopt">
									<div>
										来源价* 
										<el-input size="mini" v-model="price.PriceDialog.formula.percent" :disabled="price.PriceDialog.radioTp != 3"></el-input>%+
										<el-input size="mini" v-model="price.PriceDialog.formula.add" :disabled="price.PriceDialog.radioTp != 3"></el-input> - 
										<el-input size="mini" v-model="price.PriceDialog.formula.subtract" :disabled="price.PriceDialog.radioTp != 3">></el-input>
									</div>
									<div style="display: flex; align-items: center; margin-top: 1rem;">
										<div>价格取整&nbsp;&nbsp;&nbsp;</div>
										<el-radio v-model="price.PriceDialog.rounding" label="1" :disabled="price.PriceDialog.radioTp != 3">四舍五入</el-radio>
										<el-radio v-model="price.PriceDialog.rounding" label="2" :disabled="price.PriceDialog.radioTp != 3">向上取整</el-radio>
										<el-radio v-model="price.PriceDialog.rounding" label="3" :disabled="price.PriceDialog.radioTp != 3">向下取整</el-radio>
									</div>
									<div style="display: flex; align-items: center;margin-top: 1rem;">
										<div>保留小数&nbsp;&nbsp;&nbsp;</div>
										<el-radio v-model="price.PriceDialog.retain" label="1" :disabled="price.PriceDialog.radioTp != 3">保留1位小数</el-radio>
										<el-radio v-model="price.PriceDialog.retain" label="2" :disabled="price.PriceDialog.radioTp != 3">保留2位小数</el-radio>
									</div>
								</div>
							</el-radio>
						</div>
						<template #footer>
							<span class="dialog-footer">
								<el-button type="primary" @click="PriceChange">确 定</el-button>
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
	import {mapState,mapMutations,mapGetters} from 'vuex';
	import $api from "@/api"
	import baisc from "@/components/goods/edit/baisc.vue"
	import sku from "@/components/goods/edit/sku.vue"
	import ShopImg from "@/components/goods/edit/img.vue"
	import price from "@/components/goods/edit/price.vue"
	import logistics from "@/components/goods/edit/logistics.vue"
	export default defineComponent({
		props:{
			GoodList:Object,
			LiveId:Number,
			},
		name: "UserList",
		components: {	
			draggable,
			baisc,
			sku,
			ShopImg,
			price,
			logistics,
		},

		data() {
			return {
				editData:'',
				editSourseData:'',
				// getData:[],
				bsc: {
					shopSelcet:'',
					gc_name:'',
					brand_name:'',
					goods_name:'',
					goods_describe:'',
					goods_sku_image:[],
				},
				sku: {
					SkuType:'',
					dialogAddAttr: false,
					AddAttrIpt: '',
					liveSku: '',
					list: [
						{
							name: 'sku_1',
							data: [{
									id: '1',
									text: '黑色-高配七重减震-变频节能-汽车电池约350公里',
								}, {
									id: '2',
									text: '黑色-高配七重减震-变频节能-汽车电池约350公里',
								}, {
									id: '3',
									text: '黑色-高配七重减震-变频节能-汽车电池约350公里',
								}, {
									id: '4',
									text: '黑色-高配七重减震-变频节能-汽车电池约350公里',
								}, {
									id: '5',
									text: '黑色-高配七重减震-变频节能-汽车电池约350公里',
								}

							],
						},
						{
							name: 'sku_2',
							data: [{
									id: '1',
									text: '黑色-高配七重减震-变频节能-汽车电池约350公里',
								}, {
									id: '2',
									text: '黑色-高配七重减震-变频节能-汽车电池约350公里',
								}, {
									id: '3',
									text: '黑色-高配七重减震-变频节能-汽车电池约350公里',
								}, {
									id: '4',
									text: '黑色-高配七重减震-变频节能-汽车电池约350公里',
								}, {
									id: '5',
									text: '黑色-高配七重减震-变频节能-汽车电池约350公里',
								}

							],
						},
					
					],
				
				},
				
				price: {
					StockDialog:{
						radio:'1',
						state:false,
						input1:'',
						input2:'',
						input3:'',
					},
					PriceDialog:{
						state:false,
						radioTp:'',
						inputPrice:'',
						formula:{
							percent:'0',
							add:'0',
							subtract:'0',
						},
						rounding:'1',
						retain:'1',
					},
					checkAll:false,
					tableData:[
						{
							name:'黑色-高配七重减震-变频节能_约350公里',
							skuNumber:'',
							SourPirce:'1111.00',
							SalePirce:'1688.00',
							stock:0,
							IsUse:false,
						},{
							name:'黑色-高配七重减震-变频节能_约350公里',
							skuNumber:'',
							SourPirce:'1111.00',
							SalePirce:'1688.00',
							stock:0,
							IsUse:false,
						},{
							name:'黑色-高配七重减震-变频节能_约350公里',
							skuNumber:'',
							SourPirce:'5555.00',
							SalePirce:'1688.00',
							stock:0,
							IsUse:false,
						},{
							name:'黑色-高配七重减震-变频节能_约350公里',
							skuNumber:'',
							SourPirce:'5555.00',
							SalePirce:'1688.00',
							stock:0,
							IsUse:false,
						},{
							name:'黑色-高配七重减震-变频节能_约350公里',
							skuNumber:'',
							SourPirce:'1599.00',
							SalePirce:'1688.00',
							stock:0,
							IsUse:false,
						},{
							name:'黑色-高配七重减震-变频节能_约350公里',
							skuNumber:'',
							SourPirce:'1599.00',
							SalePirce:'1688.00',
							stock:0,
							IsUse:false,
						}
					],
				},
				
				shopImg: {
					checkAll: false,
					addImg: '',
					changeIdx:'',
					showViewer: false,
					srcList: [],
					ValData: [{
						img: 'http://dummyimage.com/150x150/F9612E',
						IsCheck: false,
					}, {
						img: 'http://dummyimage.com/150x150/F9612E',
						IsCheck: false,
					}, {
						img: 'http://dummyimage.com/150x150/F9612E',
						IsCheck: false,
					}, {
						img: 'http://dummyimage.com/150x150/F9612E',
						IsCheck: false,
					}, {
						img: 'http://dummyimage.com/150x150/F9612E',
						IsCheck: false,
					}, {
						img: 'http://dummyimage.com/150x150/F9612E',
						IsCheck: false,
					}, {
						img: 'http://dummyimage.com/150x150/F9612E',
						IsCheck: false,
					}, {
						img: 'http://dummyimage.com/150x150/F9612E',
						IsCheck: false,
					}, {
						img: 'http://dummyimage.com/150x150/F9612E',
						IsCheck: false,
					}, ],
				},
				
				logistics: {
					IsFreeShipping: '1',
					weight: 100.12,
					long: 200,
					width: 180,
					height: 160,
				},
				
				activeName: '0',
				SourceLink: 'https://element-plus.org/#/zh-CN/component/input',
			};
		},
		mounted() {
			// this.getData()
			this.PersonEditClassData()
		},
		methods: {
			handleClick(e){
				console.log(e)
			},
			ModSourcelink(e){
				this.editData.source_id_url  = e
			},
			modifyEdit(value){
				this.editData[value.val] = value.e
			},
			PersonEditClassData() {
				var _this = this
				$api.goodsApi.classify.getList().then((data) => {
					_this.bsc.shopSelcet = data.list
				})
			},
			getData(){
				var _this = this
				$api.goodsApi.personLibrary.getgoodDetailData({
					id: _this.editId,
				}).then((data) => {
					_this.editSourseData = data.list;
					_this.bsc.gc_name = data.list.gc_name
					console.log(data.list)
					_this.bsc.brand_name = data.list.brand_name
					_this.bsc.goods_name = data.list.goods_name
					_this.bsc.goods_describe = data.list.goods_describe
					_this.bsc.goods_sku_image = data.list.goods_sku_image
					
					_this.sku.SkuType = data.list.type_id
					_this.sku.list = data.list.spec
					
				})	
			},
			// SKU
			TypeChange(e) {
				this.SkuType = e
			},						
			delAttr(idxA, idxB) {
				console.log(idxA, idxB)
				this.sku.list[idxA].data.splice(idxB, 1)
			},
			addAttr() {
				if (!this.sku.AddAttrIpt) {
					this.$message({
						message: '请输入内容',
						type: 'warning'
					});
					return;
				}
				this.sku.dialogAddAttr = false;
				this.sku.list[this.sku.liveSku].data.push({
					id: 'test_1',
					text: this.sku.AddAttrIpt
				})
				this.sku.AddAttrIpt = '';
			},
			addSku() {
			
				this.sku.list.push({
					name: '',
					data: []
				})
				console.log(this.sku.list)
				this.$message({
					message: '添加成功',
					type: 'success'
				});
			},
			log(evt) {
				console.log(this.sku.colors)
				window.console.log(evt.moved.element);
			},
			//库存价格
			PriceCheckAll(val){
				console.log(this.sku)
					if (val) {
						for (var i = 0; i < this.price.tableData.length; i++) {
							this.price.tableData[i].IsUse = true
						}
					
					} else {
						for (var i = 0; i < this.price.tableData.length; i++) {
							this.price.tableData[i].IsUse = false
						}
					}
			},
			modfiyAllStock(){
				var _this = this
				this.price.tableData.forEach(function(item,dex){
					if(item.IsUse){
						if(_this.price.StockDialog.radio == 1){
							if(!_this.price.StockDialog.input1){return;}
							item.stock = Number(_this.price.StockDialog.input1)
						}else if(_this.price.StockDialog.radio == 2){
							if(!_this.price.StockDialog.input2){return;}
							item.stock = Number(_this.price.StockDialog.input2) + Number(item.stock)
						}else if(_this.price.StockDialog.radio == 3){
							if(!_this.price.StockDialog.input3){return;}
							item.stock = Number(item.stock) -Number( _this.price.StockDialog.input3)
			
							if(Number(item.stock)<0){
								item.stock = 0
							}
						}
					}
				})
				this.price.StockDialog.state = false
			},
			PriceChange(){
				var _this = this
				this.price.tableData.forEach(function(item,dex){
					if(item.IsUse){
						if(_this.price.PriceDialog.radioTp == '1'){//同源
							item.SalePirce = item.SourPirce
						}else if(_this.price.PriceDialog.radioTp == '2'){//直接设置
							item.SalePirce = _this.price.PriceDialog.inputPrice
						}else if(_this.price.PriceDialog.radioTp == '3'){//公式
							var Cprice = Number(item.SourPirce)*Number(_this.price.PriceDialog.formula.percent)/100 + Number(_this.price.PriceDialog.formula.add) - Number(_this.price.PriceDialog.formula.subtract);
							if(_this.price.PriceDialog.retain == '1'){//保留1位小时
								if(_this.price.PriceDialog.rounding == '1'){//四舍五入
									item.SalePirce = Cprice.toFixed(1)
								}else if(_this.price.PriceDialog.rounding == '2'){//向上取整
									item.SalePirce = Math.ceil(Cprice*10)/10
								}else if(_this.price.PriceDialog.rounding == '3'){//向下取整
									console.log(Math.floor(Cprice*10))
									item.SalePirce = Math.floor(Cprice*10)/10
								}
							}else if(_this.price.PriceDialog.retain == '2'){//保留2位小时
									if(_this.price.PriceDialog.rounding == '1'){//四舍五入
										item.SalePirce = Cprice.toFixed(2)
									}else if(_this.price.PriceDialog.rounding == '2'){//向上取整
										 item.SalePirce = Math.ceil(Cprice*100)/100
									}else if(_this.price.PriceDialog.rounding == '3'){//向下取整
										item.SalePirce = Math.floor(Cprice*100)/100
									}
							}
						}
					}
				})
				this.price.PriceDialog.state = false
			},
			//商品主图
			delAllImage() {
				var that = this
				for (var i = that.shopImg.ValData.length; i > 0; i--) {
					console.log(that.shopImg.ValData[i - 1].img)
					if (that.shopImg.ValData[i - 1].IsCheck == true) {
						that.shopImg.ValData.splice(i - 1, 1)
						that.shopImg.srcList.splice(i - 1, 1)
					}
				}
			},
			delImg(index) {
				console.log(index)
				this.shopImg.ValData.splice(index, 1)
			},
			showfileinput() {
				this.$refs.image.click();
			},
			addfile(e) {
				var that = this
				console.log(e)
				const file = e.target.files[0];
				
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
					that.shopImg.addImg = data.target.result; // 图片赋值
					console.log(that.addImg)
					that.shopImg.ValData.push({
						img: 'http://dummyimage.com/150x150/F9612E',
						IsCheck: false
					})
				};
			
				reader.readAsDataURL(file);
				e.target.value = ""; // ！！！重要 input上传图片，可以连续上传同一张图片
			},
			showChangeinput(index){
				this.shopImg.changeIdx = index
				this.$refs.changeimage.click();
			},
			ChangeFile(e){
				var that = this
				console.log(e)
				const file = e.target.files[0];
				
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
					that.shopImg.addImg = data.target.result; // 图片赋值
					that.shopImg.ValData[that.shopImg.changeIdx].img = 'http://dummyimage.com/150x150/213123'
				};
				
				reader.readAsDataURL(file);
				e.target.value = ""; // ！！！重要 input上传图片，可以连续上传同一张图片
			},
			ToCheckAll(val) {
				if (val) {
					for (var i = 0; i < this.shopImg.ValData.length; i++) {
						this.shopImg.ValData[i].IsCheck = true
						this.shopImg.srcList.push(this.shopImg.ValData[i].img)
					}
			
				} else {
					for (var i = 0; i < this.shopImg.ValData.length; i++) {
						this.shopImg.ValData[i].IsCheck = false
						this.shopImg.srcList = []
					}
				}
			},
			changeCheckState(val, idx) {
				this.shopImg.ValData[idx].IsCheck = val ? true : false;
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
	.DiaLog{
		label{
			margin-top: 1rem;
			width: 100%;
			display: flex;
			align-items: flex-start;
			line-height: 40px;
			.el-radio__input{
				line-height: 40px;
			}
			.el-radio__label{
				width: 100%;
				display: flex;
				align-items: flex-start;
				line-height: 40px;
				div:nth-child(1){
					width: 150px;
				}
			}
		}
		.PriceDialogCopt{
			label{
				margin-top: 0;
			}
		}
	}
</style>
