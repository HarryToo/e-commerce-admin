<template>
	<div class="sku" :id='showTp' v-if='spec'>
		<div class="sku-r0">SKU属性</div>
		<div class="sku-r1">
			<div class="sku-r1-w1">
				<div class="sku-r1-w0"><span>*</span>商品类型：</div>

				<el-radio-group v-model="sku.SkuType"  @change="modeVal('type_id',$event)">
					<el-radio :label="Number(1)" >单SKU商品</el-radio>
					<el-radio :label="Number(2)">多SKU商品</el-radio>
				</el-radio-group>
			</div>
			<el-button v-show='sku.SkuType == 2' type="danger" @click='addSku()'>添加SKU</el-button>
		</div>
		<div class="sku-r2" v-for="(val,idx) in spec" v-show='sku.SkuType == 2'>
			<div class="sku-r2-w0"><span>*</span>SKU属性：</div>
			<div class="sku-r2-w1">
				<div class="sku-r2-w1-box">
					<el-input v-model="val.name" placeholder="请输入内容" class="sku-r2-w1-r1"></el-input>
					<div class="sku-r2-w1-r2">
						<span>属性值</span><span>单属性最多50个属性值，多属性最多20个属性值，每个属性不超过20个字符，可拖动排序</span>
					</div>
					<div class="sku-r2-w1-list">
						<draggable class="list-group skuM" group="groupOne" :list="val.data" @change="log" itemKey="groupOne"
						 animation="300" dragClass="dragClass"  ghostClass="ghostClass" chosenClass="chosenClass"
						>
							<template #item="{ element, itemkey }">
								<div class="list-group-item" :itemKey='itemkey'>
									<div>{{ element.text }} {{element.id}} {{itemkey}}</div>
									<div @click='delAttr(idx,itemkey)'><i class="el-icon-delete"></i>
									</div>
								</div>
							</template>
						</draggable>
						<el-button class="sku-r2-w1-add" @click='sku.liveSku = idx;sku.dialogAddAttr = true'>+添加属性值
						</el-button>
					</div>			
				</div>
			</div>
		</div>
		
		<div class="sku-r2" v-show='sku.SkuType == 1'>
			<div class="sku-r2-w0"><span>*</span>SKU属性：</div>
			<div class="sku-r2-w1">
				<div class="sku-r2-w1-box">
					<el-input v-model="spec[0].name" placeholder="请输入内容" class="sku-r2-w1-r1"></el-input>
					<div class="sku-r2-w1-r2">
						<span>属性值</span><span>单属性最多50个属性值，多属性最多20个属性值，每个属性不超过20个字符，可拖动排序</span>
					</div>
					<div class="sku-r2-w1-list">
						<draggable class="list-group skuL" :list="spec[0].data" group="moveTwo" @change="log" itemKey="moveTwo"
						animation="300" dragClass="dragClass"  ghostClass="ghostClass" chosenClass="chosenClass">
							<template #item="{ element, index }">
								<div class="list-group-item">
									<div>{{ element.text }} {{element.id}}</div>
									<div @click='delAttr(0,index)'><i class="el-icon-delete"></i>
									</div>
								</div>
							</template>
						</draggable>
						<el-button class="sku-r2-w1-add" @click='sku.liveSku = 0;sku.dialogAddAttr = true'>+添加属性值
						</el-button>
					</div>
				</div>
			</div>
		</div>
			
		<el-dialog title="添加属性" v-model="sku.dialogAddAttr">
			<el-input v-model="sku.AddAttrIpt" placeholder="请输入内容"></el-input>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="sku.dialogAddAttr = false">取 消</el-button>
					<el-button type="primary" @click="addAttr">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>

</template>

<script>
	import {
		defineComponent,
		ref,
		toRefs,
		watch
	} from 'vue'
	import draggable from "vuedraggable";
	export default defineComponent({
		name: "sku",
		props: {
			type_id:[Number,String],
			spec:[String,Array],
		},
		components: {
			draggable,
		},
		data() {
			return {
				drag:false,
				sku: {
					SkuType: 0,
					dialogAddAttr: false,
					AddAttrIpt: '',
					liveSku: '',
					spec:"",
				}
			}
		},
		mounted() {
		},
		methods: {
			modeVal(val,e){
				this.$emit('ModSKU',{val,e})
			},
			TypeChange(e) {
				console.log(e)
				// this.$emit('skuTypeChange', e)
			},
			//sku

			delAttr(idxA, idxB) {
				console.log(idxA, idxB)
				this.spec[idxA].data.splice(idxB, 1)
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
				this.spec[this.sku.liveSku].data.push({
					id: 'test_1',
					text: this.sku.AddAttrIpt
				})
				this.sku.AddAttrIpt = '';
			},
			addSku() {

				this.spec.push({
					name: '',
					data: []
				})
				console.log(this.spec)
				this.$message({
					message: '添加成功',
					type: 'success'
				});
			},
			log(evt) {
				console.log(this.sku.colors)
				window.console.log(evt.moved.element);
			},

		},
		computed:{

		},
		computed:{
			showTp(){
				console.log(this.type_id)
				console.log(typeof(this.type_id))
				this.sku.SkuType = Number(this.type_id)
			},
		},
	})
</script>


<style scoped lang="scss">
	
	.ghostClass{
	  background-color:  #f9612e !important;
	  color: #fff!important;
	}
	.chosenClass{
	  background-color: #f9612e !important;
	  color: #fff!important;
	  opacity: 1!important;
	}
	.dragClass{
	  background-color: #f9612e !important;
	   color: #fff!important;
	  opacity: 1 !important;
	  box-shadow:none !important;
	  outline:none !important;
	  background-image:none !important;
	}
	.itxst{
	  margin: 10px;
	  
	}
	.title{
	  padding: 6px 12px;
	}
	.col{
	  width: 40%;
	  flex: 1;
	  padding: 10px;
	  border: solid 1px #eee;
	  border-radius:5px ;
	  float: left;
	}
	.col+.col{
	 margin-left: 10px;
	}
	
	.item{
	  padding: 6px 12px;
	  margin: 0px 10px 0px 10px;
	  border:  solid 1px #eee;
	   background-color: #f1f1f1;
	}
	.item:hover{
	  background-color: #fdfdfd;
	  cursor: move;
	}
	.item+.item{
	  border-top:none ;
	  margin-top: 6px;
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
						padding-top: 10px;
						border-radius: 0 0 4px 4px;
						flex-wrap: wrap;
						border: 1px solid #eeeeee;

						.list-group {
							display: flex;
							align-items: center;
							flex-wrap: wrap;

							.dragging {
								transform: scale(1.1);
							}

							.list-group-item {
								margin-left: 10px;
								height: 30px;
								display: flex;
								align-items: center;
								border: 1px solid #dfdfdf;
								margin-bottom: 10px;
								border-radius: 5px;

								div:nth-child(1) {
									padding: 0 10px;
									font-size: 12px;
									color: #888888;
								}

								div:nth-child(2) {
									padding: 0 10px;
									font-size: 12px;
									background-color: #dfdfdf;
									border-radius: 0 5px 5px 0;
									color: #888888;
									height: 30px;
									line-height: 30px;
								}
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

	.DiaLog {
		label {
			margin-top: 1rem;
			width: 100%;
			display: flex;
			align-items: flex-start;
			line-height: 40px;

			.el-radio__input {
				line-height: 40px;
			}

			.el-radio__label {
				width: 100%;
				display: flex;
				align-items: flex-start;
				line-height: 40px;

				div:nth-child(1) {
					width: 150px;
				}
			}
		}

		.PriceDialogCopt {
			label {
				margin-top: 0;
			}
		}
	}
</style>
