<template>
	<div class="ScreenCondition">
		<div class="Title">来源平台</div>
		<div>
			<el-select v-model="platformSourceSelectVal" placeholder="全部">
				<el-option v-for="item in platformSourceSelect" :key="item.value" :label="item.label"
					:value="item.value" :disabled="item.disabled">
				</el-option>
			</el-select>
		</div>
		<div class="Title">采集状态</div>
		<div>
			<el-select v-model="platformCollectionStatuSelectVal" placeholder="请选择">
				<el-option v-for="item in platformCollectionStatuSelect" :key="item.value" :label="item.label"
					:value="item.value" :disabled="item.disabled">
				</el-option>
			</el-select>
		</div>
		<div class="Title">商品标题</div>
		<div>
			<el-input v-model="platformShopNameScreen" placeholder="请输入商品标题"></el-input>
		</div>
		<div class="Title">
			来源ID
		</div>
		<div>
			<el-input v-model="platformShopIdScreen" placeholder="请输入商品标题"></el-input>
		</div>
		<div>
			<el-button type="danger" @click='SelectData()'>查询</el-button>
		</div>
		<div>
			<el-button type='primary'>清空选项</el-button>
		</div>
	
	</div>
	
</template>

<script>
	import {defineComponent,ref} from 'vue'
	import $api from "@/api"

	export default defineComponent({
		name: "Personalselection",
		data(){
			return {
				platformShopNameScreen: '', //商品标题筛选
				platformShopIdScreen: '', //id筛选
				platformSourceSelect:'', //来源平台
				platformSourceSelectVal: '', //来源平台选中值
				platformCollectionStatuSelectVal: '',
				platformCollectionStatuSelect: [{
					value: '全部',
					label: '全部'
				}, {
					value: '采集成功',
					label: '采集成功',
					// disabled: true
				}, {
					value: '采集失败',
					label: '采集失败'
				}, {
					value: '正在采集',
					label: '正在采集'
				}, ],
			}
		},
		mounted(){
			this.getPersonLbSourcePlatformData()
		},
		methods: {
			getPersonLbSourcePlatformData(){
				var that = this
				 $api.shopListApi.getPersonLbSourcePlatformData().then((data) => {that.platformSourceSelect = data})
			},
			SelectData() {
				console.log("商品来源"+this.platformSourceSelectVal)
				console.log("商品状态"+this.platformCollectionStatuSelectVal)
				console.log("商品标题"+this.platformShopNameScreen)
				console.log("来源id"+this.platformShopIdScreen)
			},

		},
		// setup() {
		// 	const platformSourceSelect = ref({})
		// 	const getPersonLbSourcePlatformData = async () => {
		// 		platformSourceSelect.value = await $api.shoplistApi.getPersonLbSourcePlatformData()

		// 	}
		// 	getPersonLbSourcePlatformData()

		// }
	})
</script>

<style scoped lang="scss">
	.ScreenCondition {
		padding: 30px 0;
		border-bottom: 1px solid #eeeeee;
		display: flex;
		align-items: center;
		font-size: 12px;
		color: #101010;
	}

	.ScreenCondition .el-button {
		width: 80px !important;
		padding: 0;
		margin-left: 10px;
	}

	.ScreenCondition .el-button--danger {
		background-color: #F9612E;
		border-color: #F9612E;
	}

	.ScreenCondition .el-button--primary {
		background-color: #fff;
		border-color: #bbbbbb;
		color: #666666;
	}

	.el-input {
		width: 202px;
		margin-left: 10px;
	}

	.Title {
		margin-left: 20px;
	}

	.el-select {
		margin-left: 10px;
	}
	.personallistBox{
		padding-top: 30px;
	}
</style>
