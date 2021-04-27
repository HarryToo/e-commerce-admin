<template>
	<div class="shopImg" :id='getGood'>
		<div class="shopImg-r0">商品主图</div>
		<div class="shopImg-r1">
			<div class="shopImg-r1-w0">商品图片</div>
			<div class="shopImg-r1-w1">
				<div class="shopImg-r1-w1-r0">
					<el-button type="danger" @click="delAllImage('goods_image')" size="small">批量删除</el-button>
					<el-button type="danger" @click="ShowPreview('goods_image')" size="small">预览</el-button>
					<el-checkbox v-model="shopImg.goodImgCheckAll" @change="ToCheckAll('goods_image')">全选</el-checkbox>
				</div>
				<div class="shopImg-r1-w1-r1">图片格式：JPG, JPEG, PNG; 单张图片大小不能超过1M；图片建议尺寸：800x800；可拖拽移动图片；
				</div>
				<div class="shopImg-r1-w1-r2">
					<draggable  class='dragBox'
						:options="{group:'people',animation:150,ghostClass:'sortable-ghost',chosenClass:'chosenClass',scroll:true,scrollSensitivity:200}"
						v-model="shopImg.goods_image" @change="GoodImgChange">
						<template #item="{ element, index }" :itemKey="element.id">
							<div class="ShopListImg">
								<el-checkbox v-model="element.IsCheck" label=" "
									@change="changeCheckState('goods_image',element.IsCheck,index)"></el-checkbox>
								<img :src="element.img" alt="">
								<div class="ShopListFt">
									<div @click="showChangeinput('goods_image',index)">替换</div>
									<div @click="delImg('goods_image',index)">删除</div>
									<input class="el-upload__input" type="file" name="file" @change="ChangeFile" ref="imgchange" accept="">
								</div>
							</div>
						</template>
					</draggable>
				<div class="ShopListImg" slot="footer" @click="showfileinput('goods_image')">
									<img src="http://dummyimage.com/150x150/F9612E" alt="" class="Add-ShopListImg">
									<div class="ShopListFt">添加新图片</div>
							</div>
					<input class="el-upload__input" type="file" name="file" @change="addfile" ref="image" accept="">
				</div>
			</div>
		</div>
		
		<div class="shopImg-r1">
			<div class="shopImg-r1-w0">商品图片</div>
			<div class="shopImg-r1-w1">
				<div class="shopImg-r1-w1-r0">
					<el-button type="danger" size="small" @click="delAllImage('goods_sku_image')">批量删除</el-button>
					<el-button type="danger" size="small" @click="ShowPreview('goods_sku_image')">预览</el-button>
					<el-checkbox v-model="shopImg.skuImgCheckAll" @change="ToCheckAll('goods_sku_image')">全选</el-checkbox>
				</div>
				<div class="shopImg-r1-w1-r1">图片格式：JPG, JPEG, PNG; 单张图片大小不能超过1M；图片建议尺寸：800x800；可拖拽移动图片；
				</div>
				<div class="shopImg-r1-w1-r2">
					<draggable  class='dragBox'
						:options="{group:'people',animation:150,ghostClass:'sortable-ghost',chosenClass:'chosenClass',scroll:true,scrollSensitivity:200}"
						v-model="shopImg.goods_sku_image" @change="GoodSkuImgChange">
						<template #item="{ element, index }">
							<div class="ShopListImg">
								<el-checkbox v-model="element.IsCheck" label=" "
									@change="changeCheckState('goods_sku_image',element.IsCheck,index)"></el-checkbox>
								<img :src="element.img" alt="">
								<div class="ShopListFt">
									<div @click="showChangeinput('goods_sku_image',index)">替换</div>
									<div @click="delImg('goods_sku_image',index)">删除</div>
									<input class="el-upload__input" type="file" name="file" @change="ChangeFile" ref="imgchange" accept="">
								</div>
							</div>
						</template>
					</draggable>
				<div class="ShopListImg" slot="footer" @click="showfileinput('goods_sku_image')">
									<img src="http://dummyimage.com/150x150/F9612E" alt="" class="Add-ShopListImg">
									<div class="ShopListFt">添加新图片</div>
							</div>
					<input class="el-upload__input" type="file" name="file" @change="addfile" ref="image" accept="">
				</div>
			</div>
		</div>
		
		<!-- 预览图片 -->
		<el-image-viewer v-if="shopImg.showViewer"  @close="closeViewer"
			:url-list="shopImg.srcList" />
	</div>
							
</template>

<script>
	import {defineComponent, ref, toRefs, watch} from 'vue' 
	import draggable from "vuedraggable";
	export default defineComponent({
	  name: "img",    
	  props: {
		  goods_sku_image:[Object,Array,String],
		  goods_image:[Object,String],
		  },
	  components: {
	  	draggable,
	  },
	  data(){
		  return{
			  shopImg: {
				  goods_image:[],
				  goods_sku_image:[],
			  	goodImgCheckAll: false,
				skuImgCheckAll:false,
			  	addImg: '',
			  	GoodChangeIdx:'',
				SkuChangeIdx:'',
				FileIput:'',
			  	showViewer: false,
			  	srcList: [],
			  },
			  
		  }
	  },
	  mounted(){

	  },
	  methods:{
		  ShowPreview(name){
			  if(name == 'goods_image'){
				  this.srcList = [];
				  for(var i=0;i<this.shopImg.goods_image.length;i++){
					  if(this.shopImg.goods_image[i].IsCheck){
						  this.srcList.push(this.shopImg.goods_image[i].img)
					  }
				  }
				  this.shopImg.showViewer = true
			  }else if(name == 'goods_sku_image'){
				  this.srcList = [];
				  for(var i=0;i<this.shopImg.goods_sku_image.length;i++){
				  					  if(this.shopImg.goods_sku_image[i].IsCheck){
				  						  this.srcList.push(this.shopImg.goods_sku_image[i].img)
				  					  }
				  }
				  this.shopImg.showViewer = true
			  }
		  },
		  GoodSkuImgChange(){
			  const obj = {
			  		val:'goods_sku_image',
			  		e:this.shopImg.goods_sku_image
			  }
			  this.$emit('ModShopImg',obj)
		  },
		  GoodImgChange(){
			  const obj = {
				  val:'goods_image',
				  e:this.shopImg.goods_image
			  }
			  this.$emit('ModShopImg',obj)
		  },
		  closeViewer(){
			  this.shopImg.showViewer = false
		  },
			//商品主图
			delAllImage(val) {
				var that = this
				if(val =='goods_image' ){
					for (var i = that.shopImg.goods_image.length; i > 0; i--) {
						console.log(that.shopImg.goods_image[i - 1].img)
						if (that.shopImg.goods_image[i - 1].IsCheck == true) {
							that.shopImg.goods_image.splice(i - 1, 1)
							that.shopImg.srcList.splice(i - 1, 1)
						}
					}
					this.GoodImgChange()
				}else if(val =='goods_sku_image'){
					for (var i = that.shopImg.goods_sku_image.length; i > 0; i--) {
						console.log(that.shopImg.goods_sku_image[i - 1].img)
						if (that.shopImg.goods_sku_image[i - 1].IsCheck == true) {
							that.shopImg.goods_sku_image.splice(i - 1, 1)
							that.shopImg.srcList.splice(i - 1, 1)
						}
					}
					this.GoodSkuImgChange()
				}
			},
			delImg(val,index) {				
				if(val == 'goods_image'){
					this.shopImg.goods_image.splice(index, 1)
					// this.GoodImgChange()
				}else if(val == 'goods_sku_image'){
					this.shopImg.goods_sku_image.splice(index, 1)
					this.GoodImgChange()
				}
			},
			showfileinput(name) {
				if(name == 'goods_image'){
					this.shopImg.FileIput = 'goods_image'
				}else if(name == 'goods_sku_image'){
					this.shopImg.FileIput = 'goods_sku_image'
				}				
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
					// console.log(that.shopImg.addImg)
					const obj = {
						img: 'http://dummyimage.com/150x150/F9612E',
						IsCheck: false
					}
					if(that.shopImg.FileIput == 'goods_image'){
						that.shopImg.goods_image.push(obj)
						that.GoodImgChange()
					}else if(that.shopImg.FileIput == 'goods_sku_image'){
						that.shopImg.goods_sku_image.push(obj)
						that.GoodSkuImgChange()
					}
				};

				reader.readAsDataURL(file);
				e.target.value = ""; // ！！！重要 input上传图片，可以连续上传同一张图片
			},
			showChangeinput(name,index){
				
				
				if(name == 'goods_image'){
					this.shopImg.GoodChangeIdx = index
					this.shopImg.FileIput = 'goods_image'
				}else if(name == 'goods_sku_image'){
					this.shopImg.SkuChangeIdx = index
					this.shopImg.FileIput = 'goods_sku_image'
				}
				this.$refs.imgchange.click();
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
					
					if(that.shopImg.FileIput == 'goods_image' ){
						that.shopImg.goods_image[that.shopImg.GoodChangeIdx].img = 'http://dummyimage.com/150x150/213123'
						that.shopImg.GoodChangeIdx = ''
						that.GoodImgChange()
					}else if(that.shopImg.FileIput == 'goods_sku_image'){
						that.shopImg.goods_sku_image[that.shopImg.SkuChangeIdx].img = 'http://dummyimage.com/150x150/213123'
						that.shopImg.SkuChangeIdx = ''
						that.GoodSkuImgChange()
					}
					
				};
				
				reader.readAsDataURL(file);
				e.target.value = ""; // ！！！重要 input上传图片，可以连续上传同一张图片
			},
			ToCheckAll(val) {
				if(val == 'goods_image'){
					if (this.shopImg.goodImgCheckAll) {
						for (var i = 0; i < this.shopImg.goods_image.length; i++) {
							this.shopImg.goods_image[i].IsCheck = true
							this.shopImg.srcList.push(this.shopImg.goods_image[i].img)
						}
					
					} else {
						for (var i = 0; i < this.shopImg.goods_image.length; i++) {
							this.shopImg.goods_image[i].IsCheck = false
							this.shopImg.srcList = []
						}
					}
				}else if(val == 'goods_sku_image'){
					if (this.shopImg.skuImgCheckAll) {
						for (var i = 0; i < this.shopImg.goods_sku_image.length; i++) {
							this.shopImg.goods_sku_image[i].IsCheck = true
							this.shopImg.srcList.push(this.shopImg.goods_sku_image[i].img)
						}
					
					} else {
						for (var i = 0; i < this.shopImg.goods_sku_image.length; i++) {
							this.shopImg.goods_sku_image[i].IsCheck = false
							this.shopImg.srcList = []
						}
					}
				}
			},
			changeCheckState(name,val,idx) {
				if(name == 'goods_image'){
					this.shopImg.goods_image[idx].IsCheck = val ? true : false;
				}else if(name == 'goods_sku_image'){
					this.shopImg.goods_sku_image[idx].IsCheck = val ? true : false;
				}
				
			},
	  },
	  computed:{
		  getGood(){
		  		this.shopImg.goods_image = this.goods_image
		  		this.shopImg.goods_sku_image = this.goods_sku_image
		  },
	  },
	 })
</script>


<style scoped lang="scss">
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
							.dragBox{
								// display: flex;
								// flex-wrap: wrap;
							}
							.ShopListImg {
								float:left;
								margin-top: 11px;
								position: relative;
								margin-right: 11px;
								border-radius: 5px;
								border: 1px solid #F9612E;
								.sortable-ghost{
									transform: scale(1.2);
								}
								.chosenClass{
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

</style>
