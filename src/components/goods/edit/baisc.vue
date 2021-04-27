<template>
	<div class="BasicIf" :id='gc_nameComputed'>
		<div class='BasicIf-r0'>基本信息</div>
		<div class="BasicIf-row centerF">
			<div class="BasicIf-ls centerF">
				<div class="BasicIf-lstitle" style="line-height: 40px;"><span>*</span>商品分类：</div>
				<div class="BasicIf-lscontent">
					<div style="line-height: 40px; min-width: 250px;">选择发布到货源平台的商品分类</div>
					<el-cascader v-model="bsc.gc_name"  :options="shopSelcet" @change="modeVal('gc_name_val',$event)">
					</el-cascader>
				</div>
			</div>
			<div class="BasicIf-ls">
				<div class="BasicIf-lstitle"><span>*</span>商品品牌：</div>
				<div class="BasicIf-lscontent BasicIf-brand">
					<el-input v-model='bsc.brand_name' :value='brand_name' placeholder="请输入内容" @input="modeVal('brand_name',$event)"></el-input>
				</div>
			</div>
		</div>
		<div class="BasicIf-ls">
			<div class="BasicIf-lstitle">
				<span>*</span>商品标题：
			</div>
			<div class="BasicIf-lscontent">
				<el-input  v-model='bsc.goods_name' :value='goods_name' placeholder="请输入内容" maxlength="60" show-word-limit @input="modeVal('goods_name',$event)">
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
					v-model='bsc.goods_describe' :value='goods_describe' @input="modeVal('goods_describe',$event)">
				</el-input>
			</div>
		</div>
		<div class="BasicIf-ls centerF">
			<div class="BasicIf-lstitle">
				<span>*</span>图片描述：
			</div>
			<div class="BasicIf-lscontent">
				<div style="line-height: 40px;">铺货到拼多多平台时，填充以下内容到产品详情描述部分</div>
				<div v-for="(val,idx) in goods_describe_image" class="Basic_Img">
					<img :src="val" alt="" :idx='idx' @click='$refs.imgchange.click();clickImgIdx = idx'>
					<input class="el-upload__input" type="file" name="file" @change="ChangeFile"
						ref="imgchange" accept="">
				</div>
				<div class='Basic_ImgAdd' @click='$refs.image.click();'>添加+</div>
				<input class="el-upload__input" type="file" name="file" @change="addfile" ref="image" accept="">
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
		  gc_name_val:{
			 type:[Array,Object], 
			 default() {
			   return []
			 }
		  },
		  brand_name:[String,Array],
		  goods_name:[String,Array],
		  goods_describe:[String,Array],
		  goods_describe_image:[String,Array],
	  },
	  data(){
		  return{
			bsc:{
				clickImgIdx:'',
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
		  	$api.goodsApi.personLibrary.getListData().then((data) => {
		  		that.shopSelcet = data.options
		  	})
		  },
		  modeVal(val,e){
				this.$emit('ModBsc',{val,e})
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
					const arr =  'http://dummyimage.com/500x150/F9612E'
						
						that.goods_describe_image.push(arr)
				};
			
				reader.readAsDataURL(file);
				e.target.value = ""; // ！！！重要 input上传图片，可以连续上传同一张图片
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
					const arr =  'http://dummyimage.com/500x150/123123'
					that.goods_describe_image[that.clickImgIdx] = arr
				};
							
				reader.readAsDataURL(file);
				e.target.value = ""; // ！！！重要 input上传图片，可以连续上传同一张图片
			},  
	  },
	  computed:{
			gc_nameComputed(){
				this.bsc.gc_name = []
				if(this.gc_name_val[0]){
						for(var i = 0;i<this.gc_name_val.length;i++){
							this.bsc.gc_name.push(this.gc_name_val[i])
						}
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
	.Basic_Img{
		width: 100%;
		
		text-align: center;
		img{
			width: 100%;
		}
	}
	.Basic_ImgAdd{
		border: 1px dashed #F9612E;
		margin-top: 1rem;
		height: 5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2.8rem;
		font-weight: 300;
		border-radius: 5px;
		cursor: pointer;
		
	}
</style>
