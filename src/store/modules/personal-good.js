import $api from "@/api"

export default {
	state: {
		good_numeber:'',
		good_name:'',
		good_stand:{
				id: 123123,
				goods_name: "占位名", //商品名称
				gc_name: ["zhinan","daohang","dingbudaohang"],  //分类名称
				source_name: 1,   //来源平台名称
				source_name_url: "https://www.baidu.com", //平台链接
				source_id: 1000000123123,  //来源id
				source_id_url: "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=", //来源id链接
				type_id: 1,  //商品类型  1=单SKU商品  2=多SKU商品 
				spec:[
					{
						name: 'sku_1',
						data: [{
								id: '1',
								text: '黑色',
							}, {
								id: '2',
								text: '白色',
							}, {
								id: '3',
								text: '绿色',
							}, {
								id: '4',
								text: '红色',
							}, {
								id: '5',
								text: '蓝色',
							}
					
						],
					},
										
				],
				brand_name: "这是商品名称",  //品牌名称
				
				goods_image: ['@image("500x150", "#F9612E")'],  //商品图片
				goods_sku_image: ['@image("500x150", "#F9612E")'],  //sku图片
				goods_describe: "商品描述",  //文字描述
				goods_describe_image: ['@image("500x150", "#F9612E")'],  //图片描述
				is_postage: '@integer(1, 2)', //是否包邮 1-是 2-否
				parcel_weight: '@float(10, 100, 2, 2)',  //包裹重量
				parcel_length: '@float(10, 100, 2, 2)',   //包裹长度
				parcel_width: '@float(10, 100, 2, 2)',  //包裹宽度
				parcel_high: '@float(10, 100, 2, 2)',   //包裹高度
				goods_specification: [  //规格数组
							{
								specification_id: 1,  //规格id
								goods_id: 88,  //商品id
								specification_name: "@cword(8,20)",   //规格名称
								sku_num: '@integer(10000,99999)',  //sku编号
								source_price: '@float(1500, 2000, 2, 2)',  //来源价
								market_price: '@float(2000, 3000, 2, 2)', //销售价
								inventory: '@integer(0,999)',  //库存
								is_using: '@integer(1,2)'  //是否启用  1-是 2-否
							},
							{
								specification_id: 1,  //规格id
								goods_id: 88,  //商品id
								specification_name: "@cword(8,20)",   //规格名称
								sku_num: '@integer(10000,99999)',  //sku编号
								source_price: '@float(1500, 2000, 2, 2)',  //来源价
								market_price: '@float(2000, 3000, 2, 2)', //销售价
								inventory: '@integer(0,999)',  //库存
								is_using: '@integer(1,2)'  //是否启用  1-是 2-否
							}
						]
		
		},
		dataList:[],
	},
	
	mutations: {

		modVal(state,val){
		  state.good_numeber = val
		},
		
		ChangeLv1(state,[name,val]){		
			// state.dataList.filter(x => x.id == 1)[0][name] = val
			state[name] = val
			// console.log(state.dataList.filter(x => x.id == state.good_numeber)[0])
		},
		
		
		setData(state,[data,dataId]){			
			if(state.dataList.filter(x => x.id == dataId).length<=0){
				state.dataList.push(data)
			}else{
				console.log('return!!!')
				return;
			}	
			console.log(state.dataList)		
		}
	},
	actions: {
		increment (context,Id) {
			return new Promise((res) =>{
				$api.goodsApi.personLibrary.getgoodDetailData({
					id: Id,
				}).then((data) => {
					var  backData = data.list
					context.commit('setData',[backData,Id])
					res(backData)
				})	
			})
		}
	},
	getters: {		
		  getValModel: (state) => {
			var data = state.dataList.filter(x => x.id == state.good_numeber)[0]
			if(data){
				return data
			}else{
				return state.good_stand
			}
			
		  },
	},
}
