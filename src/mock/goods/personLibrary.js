import $mock from '@/utils/mock'

//搜索条件 来源平台
$mock.get('/goods/PersonLbSourcePlatformData', { 	
	    'list|6': [
	        {
	            'id|+1': [1, 2, 3, 4, 5, 6],
				'value|+1':[1, 2, 3, 4, 5, 6],
	            label: '@cword(2,5)平台',
	        }
	    ]

})
/*
说明
 收藏状态

 0 采集成功
 1 正在采集
 2 采集失败
 */
// 商品信息
$mock.get('/goods/PersonLbShopListData',({url}) =>{
	const {pageSize} = $mock.parseQuery(url)
	const data = {
	    total: 30
	}
	data[`list|${pageSize}`] = [
	    {
	        'id|+1': 10000,
	        'number|+1': 10000000000,
	        info: {
	            cover: '@image("150x150", "#F9612E")',
	            name: '@cword(30, 50)',
	            classify: '@cword(15, 30)',
	            origin: {
	                platform: {
	                    name: '@cword(2, 4)',
	                    href: 'https://www.baidu.com'
	                },
	                id: {
	                    'name|+1': 100000,
	                    href: 'https://www.baidu.com'
	                }
	            }
	        },
	        minPrice: '@float(1000, 1500, 2, 2)',
	        maxPrice: '@float(2000, 3000, 2, 2)',
			PeoPle: '@cword(2,3)',
	        stockNum: '@integer(500, 1000)',
	        shopNum: '@integer(500, 1000)',
	        purchaseNum: '@integer(100, 500)',
	        status: '@integer(0, 2)',
			stateReason:'@cword(2,5)',
	    }
	]
	return $mock.mock(data)
})

// 商品详情
$mock.get('/goods/goodDetailData',({url}) =>{
	const {id} = $mock.parseQuery(url)
	const data = {
	    total: 1
	}
	data[`list|${1}`] = [
	    {	    
		id: id,
		goods_name: "@cword(8, 20)", //商品名称
		gc_name_val: ["zhinan","daohang","dingbudaohang"],  //分类val
		gc_name: ["@cword(2,4)","@cword(2,4)","@cword(2,4)"],  //分类名称
		source_name: '@cword(2,4)平台',   //来源平台名称
		source_name_url: "https://www.baidu.com", //平台链接
		source_id: 10000000000+id,  //来源id
		source_id_url: "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=", //来源id链接
		type_id: 1,  //商品类型  1=单SKU商品  2=多SKU商品 
		spec:[
			{
				name: '@cword(2)SKUname',
				data: [{
						id: '1',
						text: '@cword(2)',
					}, {
						id: '2',
						text: '@cword(2)',
					}, {
						id: '3',
						text: '@cword(2)',
					}, {
						id: '4',
						text: '@cword(2)',
					}, {
						id: '5',
						text: '@cword(2)',
					}
			
				],
			},
			{
				name: '@cword(2)SKUname',
				data: [{
						id: '1',
						text: '@cword(2)',
					}, {
						id: '2',
						text: '@cword(2)',
					}, {
						id: '3',
						text: '@cword(2)',
					}, {
						id: '4',
						text: '@cword(2)',
					}, {
						id: '5',
						text: '@cword(2)',
					}
			
				],
			},					
		],
		
		brand_name: "@cword(20,30)",  //品牌名称
		
		goods_image: [
			{id:1,
			img:'@image("150x150", "#F9612E")'},
			{id:2,
			img:'@image("150x150", "#F9612E")'},
		],  //商品图片
		goods_sku_image: [
			{id:1,
			img:'@image("150x150", "#F9612E")'},
			{id:2,
			img:'@image("150x150", "#F9612E")'},
		],  //sku图片
		goods_describe: "@cword(50,200)",  //文字描述
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
		
		}
	]
return $mock.mock(data)
})
