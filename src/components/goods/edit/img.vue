<template>
	<div class="shopImg" :ID='getGood'>
		<div class="shopImg-r0">商品主图</div>
		<div class="shopImg-r1">
			<div class="shopImg-r1-w0">商品图片</div>
			<div class="shopImg-r1-w1">
				<div class="shopImg-r1-w1-r0">
					<el-button type="danger" @click='delAllImage' size="small">批量删除</el-button>
					<el-button type="danger" @click='shopImg.showViewer = true' size="small">预览</el-button>
					<el-checkbox v-model="shopImg.checkAll" @change="ToCheckAll">全选</el-checkbox>
				</div>
				<div class="shopImg-r1-w1-r1">图片格式：JPG, JPEG, PNG; 单张图片大小不能超过1M；图片建议尺寸：800x800；可拖拽移动图片；
				</div>
				<div class="shopImg-r1-w1-r2">
					<draggable  class='dragBox'
						:options="{group:'people',animation:150,ghostClass:'sortable-ghost',chosenClass:'chosenClass',scroll:true,scrollSensitivity:200}"
						v-model="shopImg.ValData" @change="change">
						<template #item="{ element, index }">
							<div class="ShopListImg">
								<el-checkbox v-model="element.IsCheck" label=" "
									@change="changeCheckState(element.IsCheck,index)"></el-checkbox>
								<img :src="element.img" alt="">
								<div class="ShopListFt">
									<div @click='showChangeinput(index)'>替换</div>
									<div @click='delImg(index)'>删除</div>
									<input class="el-upload__input" type="file" name="file" @change="ChangeFile" ref="changeimage" accept="">
								</div>
							</div>
						</template>
					</draggable>
				<div class="ShopListImg" slot="footer" @click='showfileinput'>
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
					<el-button type="danger" @click='delAllImage'>批量删除</el-button>
					<el-button type="danger" @click='shopImg.showViewer = true'>预览</el-button>
					<el-checkbox v-model="shopImg.checkAll" @change="ToCheckAll">全选</el-checkbox>
				</div>
				<div class="shopImg-r1-w1-r1">图片格式：JPG, JPEG, PNG; 单张图片大小不能超过1M；图片建议尺寸：800x800；可拖拽移动图片；
				</div>
				<div class="shopImg-r1-w1-r2">
					<draggable  class='dragBox'
						:options="{group:'people',animation:150,ghostClass:'sortable-ghost',chosenClass:'chosenClass',scroll:true,scrollSensitivity:200}"
						v-model="shopImg.ValData" @change="change">
						<template #item="{ element, index }">
							<div class="ShopListImg">
								<el-checkbox v-model="element.IsCheck" label=" "
									@change="changeCheckState(element.IsCheck,index)"></el-checkbox>
								<img :src="element.img" alt="">
								<div class="ShopListFt">
									<div @click='showChangeinput(index)'>替换</div>
									<div @click='delImg(index)'>删除</div>
									<input class="el-upload__input" type="file" name="file" @change="ChangeFile" ref="changeimage" accept="">
								</div>
							</div>
						</template>
					</draggable>
				<div class="ShopListImg" slot="footer" @click='showfileinput'>
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
	  props: [
		  'goods_sku_image',
		  'goods_image'],
	  components: {
	  	draggable,
	  },
	  data(){
		  return{
			  shopImg: {
				  goods_image:[],
				  goods_sku_image:[],
			  	checkAll: false,
			  	addImg: '',
			  	changeIdx:'',
			  	showViewer: false,
			  	srcList: [],
			  	ValData: [
						{
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
						}, 
				
				],
			  },
			  
		  }
	  },
	  mounted(){

	  },
	  methods:{
		  closeViewer(){
			  this.shopImg.showViewer = false
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
		  getGood(){
		  	if(this.goods_image != ''){
				
		  		this.shopImg.goods_image = this.goods_image
		  		this.shopImg.goods_sku_image = this.goods_sku_image
		  	}
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
