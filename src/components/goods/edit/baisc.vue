<template>
	<div class="BasicIf" :id='getGood'>
		<div class='BasicIf-r0'>基本信息</div>
		<div class="BasicIf-row centerF">
			<div class="BasicIf-ls centerF">
				<div class="BasicIf-lstitle" style="line-height: 40px;"><span>*</span>商品分类：</div>
				<div class="BasicIf-lscontent">
					<div style="line-height: 40px; min-width: 250px;">选择发布到货源平台的商品分类</div>
					<el-cascader v-model='bsc.gc_name' :options="shopSelcet" @change="modeVal('gc_name_val',$event)">
					</el-cascader>
				</div>
			</div>
			<div class="BasicIf-ls">
				<div class="BasicIf-lstitle"><span>*</span>商品品牌：</div>
				<div class="BasicIf-lscontent BasicIf-brand">
					<el-input v-model='bsc.brand_name' placeholder="请输入内容" @input="modeVal('brand_name',$event)"></el-input>
				</div>
			</div>
		</div>
		<div class="BasicIf-ls">
			<div class="BasicIf-lstitle">
				<span>*</span>商品标题：
			</div>
			<div class="BasicIf-lscontent">
				<el-input  v-model='bsc.goods_name' placeholder="请输入内容" maxlength="60" show-word-limit @input="modeVal('goods_name',$event)">
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
					v-model='bsc.goods_describe' @input="modeVal('goods_describe',$event)">
				</el-input>
			</div>
		</div>
		<div class="BasicIf-ls centerF">
			<div class="BasicIf-lstitle">
				<span>*</span>图片描述：
			</div>
			<div class="BasicIf-lscontent">
				<div style="line-height: 40px;">铺货到拼多多平台时，填充以下内容到产品详情描述部分</div>
			<!-- 	<div v-for="(val,idx) in getValModel">
					<img :src="val" alt="" :idx='idx'>
				</div> -->
			</div>
		</div>
	
	</div>	
</template>

<script>
	import {defineComponent, ref, toRefs, watch} from 'vue' 
	import {mapState,mapMutations,mapGetters} from 'vuex';
	import $api from "@/api"
	export default defineComponent({
	  name: "data_id",
	  props:{
		  gc_name_val:Array,
		  brand_name:Array,
		  goods_name:Array,
		  goods_describe:Array,
	  },
	  data(){
		  return{
			bsc:{
				gc_name:[],
				brand_name:'',
				goods_name:'',
				goods_describe:'',
				getValModel:[],
			},		
			shopSelcet:[],
		  }
	  },
	  mounted(){
		  this.PersonEditClassData()
	  },
	  methods:{
		  PersonEditClassData() {
		  	var that = this
		  	$api.goodsApi.classify.getList().then((data) => {
		  		that.shopSelcet = data.list
		  	})
		  },
		  modeVal(val,e){
				this.$emit('ModBsc',{val,e})
		  },
	  },
	  computed:{
		  getGood(){
			  if(this.gc_name_val != ''){
				  this.bsc.gc_name = this.gc_name_val
				  this.bsc.brand_name = this.brand_name
				  this.bsc.goods_name = this.goods_name
				  this.bsc.goods_describe = this.goods_describe
			  }
		  },
	  },
	})
</script>

<style  scoped lang="scss">
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
	
</style>
