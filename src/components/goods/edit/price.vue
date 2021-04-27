<template>
		<div class="stockPrice" v-if="goods_specification !=[]">
			<div class="stPrice-top">
				<div class="stPrice-toptitle">库存价格</div>
				<div class="stPrice-topbtn">
					<el-button type="danger" @click='price.PriceDialog.state = true'>批量设置销售价</el-button>
					<el-button type="danger" @click='price.StockDialog.state = true'>批量设置库存</el-button>
				</div>
			</div>
			<div class="stPriceBox">
				<div class="stPriceBoxTitle"><span>*</span>库存价格:</div>
				<div class="stPriceBoxls">
					<el-table :data="goods_specification" style="width: 100%">
					  <el-table-column prop="specification_name" label="规格" width="250" align="center">
					  </el-table-column>
					  <el-table-column prop="sku_num" label="SKU编号" width="250"  align="center">
						  <template #default="scope">
						  	<el-input v-model="scope.row.sku_num" placeholder="请输入内容" size="mini"></el-input>
						  </template>
					  </el-table-column>
					  <el-table-column prop="source_price" label="来源价" align="center">
					  </el-table-column>
					  <el-table-column prop="market_price" label="销售价" align="center">
						  <template #default="scope">
						  	<el-input v-model="scope.row.market_price" placeholder="请输入内容" size="mini"></el-input>
						  </template>
					  </el-table-column>
					  <el-table-column prop="inventory" label="库存" align="center">
						  <template #default="scope">
						  	<el-input v-model="scope.row.inventory" placeholder="请输入内容" size="mini"></el-input>
						  </template>
					  </el-table-column>
					<el-table-column align="right">
						  <template #header>
							<el-checkbox v-model="price.checkAll" @change="PriceCheckAll">全选</el-checkbox>
						  </template>
						  <template #default="scope">
							<el-checkbox v-model='scope.row.IsUse' label="启用" ></el-checkbox>
						  </template>
						</el-table-column>
					</el-table>
				</div>
			</div>
		</div>

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
								
</template>

<script>
	import {defineComponent, ref, toRefs, watch} from 'vue' 
	import draggable from "vuedraggable";
	export default defineComponent({
	  name: "price",
	  props: {
		  goods_specification:{
			  type:[Array,Object],
			  default:[],
		  }
	  },
	  components: {
	  	draggable,
	  },
	  data(){
		  return{
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
			  
		  }
	  },
	  mounted(){

	  },
	  methods:{
			//库存价格
			PriceCheckAll(val){
					if (val) {
						for (var i = 0; i < this.goods_specification.length; i++) {
							this.goods_specification[i].IsUse = true
						}
					
					} else {
						for (var i = 0; i < this.goods_specification.length; i++) {
							this.goods_specification[i].IsUse = false
						}
					}
			},
			modfiyAllStock(){
				var _this = this
				this.goods_specification.forEach(function(item,dex){
					if(item.IsUse){
						if(_this.price.StockDialog.radio == 1){
							if(!_this.price.StockDialog.input1){return;}
							item.inventory = Number(_this.price.StockDialog.input1)
						}else if(_this.price.StockDialog.radio == 2){
							if(!_this.price.StockDialog.input2){return;}
							item.inventory = Number(_this.price.StockDialog.input2) + Number(item.inventory)
						}else if(_this.price.StockDialog.radio == 3){
							if(!_this.price.StockDialog.input3){return;}
							item.inventory = Number(item.inventory) -Number( _this.price.StockDialog.input3)

							if(Number(item.inventory)<0){
								item.inventory = 0
							}
						}
					}
				})
				this.price.StockDialog.state = false
			},
			PriceChange(){
				var _this = this
				this.goods_specification.forEach(function(item,dex){
					if(item.IsUse){
						if(_this.price.PriceDialog.radioTp == '1'){//同源
							item.market_price = item.source_price
						}else if(_this.price.PriceDialog.radioTp == '2'){//直接设置
							item.market_price = _this.price.PriceDialog.inputPrice
						}else if(_this.price.PriceDialog.radioTp == '3'){//公式
							var Cprice = Number(item.source_price)*Number(_this.price.PriceDialog.formula.percent)/100 + Number(_this.price.PriceDialog.formula.add) - Number(_this.price.PriceDialog.formula.subtract);
							if(_this.price.PriceDialog.retain == '1'){//保留1位小时
								if(_this.price.PriceDialog.rounding == '1'){//四舍五入
									item.market_price = Cprice.toFixed(1)
								}else if(_this.price.PriceDialog.rounding == '2'){//向上取整
									item.market_price = Math.ceil(Cprice*10)/10
								}else if(_this.price.PriceDialog.rounding == '3'){//向下取整
									console.log(Math.floor(Cprice*10))
									item.market_price = Math.floor(Cprice*10)/10
								}
							}else if(_this.price.PriceDialog.retain == '2'){//保留2位小时
									if(_this.price.PriceDialog.rounding == '1'){//四舍五入
										item.market_price = Cprice.toFixed(2)
									}else if(_this.price.PriceDialog.rounding == '2'){//向上取整
										 item.market_price = Math.ceil(Cprice*100)/100
									}else if(_this.price.PriceDialog.rounding == '3'){//向下取整
										item.market_price = Math.floor(Cprice*100)/100
									}
							}
						}
					}
				})
				this.price.PriceDialog.state = false
			},
			
	  },
	 })
</script>


<style scoped lang="scss">
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
