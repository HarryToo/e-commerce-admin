<template>
		<div class="logistics" :Id='getGood'>
			<div class='logistics-r0'>物流信息</div>
			<div class='logistics-r1'>
				<div class="logistics-r1-w0"><span>*</span>是否包邮</div>
				<div class="logistics-r1-w1">
					<el-radio v-model="logistics.IsFreeShipping" label="1" @change="modeVal('is_postage',$event)">包邮</el-radio>
					<el-radio v-model="logistics.IsFreeShipping" label="2" @change="modeVal('is_postage',$event)">不包邮</el-radio>
				</div>
			</div>
			<div class='logistics-r2'>
				<div class="logistics-r2-w0"><span>*</span>包裹重量</div>
				<div class="logistics-r2-w1">
					<el-input v-model="logistics.weight" placeholder="请输入重量" suffix-icon="el-icon-date" @input="modeVal('parcel_weight',$event)">
					</el-input>
				</div>
			</div>
			<div class='logistics-r3'>
				<div class="logistics-r3-w0"><span>*</span>包裹尺寸</div>
				<div class="logistics-r3-w1">
					<el-input v-model="logistics.long" placeholder="长" suffix-icon="el-icon-date" @input="modeVal('parcel_length',$event)">
					</el-input>
					<el-input v-model="logistics.width" placeholder="宽" suffix-icon="el-icon-date" @input="modeVal('parcel_width',$event)">
					</el-input>
					<el-input v-model="logistics.height" placeholder="高" suffix-icon="el-icon-date" @input="modeVal('parcel_high',$event)">
					</el-input>
		
				</div>
			</div>
		</div>
							
</template>

<script>
	import {defineComponent, ref, toRefs, watch} from 'vue' 
	export default defineComponent({
	  name: "logistics",
	  props: [
		  'parcel_weight',
		  'parcel_length',
		  'parcel_width',
		  'parcel_high',
		  'is_postage',
	  ],
	  data(){
		  return{
			  logistics: {
			  	IsFreeShipping: '1',
			  	weight: 100.12,
			  	long: 200,
			  	width: 180,
			  	height: 160,
			  },
			  
		  }
	  },
	  mounted(){

	  },
	  methods:{
	      modeVal(val,e){
				this.$emit('ModLogistics',{val,e})
		  },
	  },
	  computed:{
	  		  getGood(){
	  			  if(this.gc_name_val != ''){
	  				  this.logistics.IsFreeShipping = this.is_postage+''

	  				  this.logistics.weight = this.parcel_weight
	  				  this.logistics.long = this.parcel_length
	  				  this.logistics.width = this.parcel_width
					  this.logistics.height = this.parcel_high
	  			  }
	  		  },
	  },
	 })
</script>


<style scoped lang="scss">
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

							::v-deep .el-icon-date:before {
								content: 'KG' !important;
							}
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

							::v-deep .el-icon-date:before {
								content: 'CM' !important;
							}
						}
					}
				}
			}

</style>
