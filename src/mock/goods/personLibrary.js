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

//搜索条件 来源平台
$mock.get('/goods/ListData', { 	
	     options: [{
	              value: 'zhinan',
	              label: '指南',
	              children: [{
	                value: 'shejiyuanze',
	                label: '设计原则',
	                children: [{
	                  value: 'yizhi',
	                  label: '一致',
	                }, {
	                  value: 'fankui',
	                  label: '反馈'
	                }, {
	                  value: 'xiaolv',
	                  label: '效率'
	                }, {
	                  value: 'kekong',
	                  label: '可控'
	                }]
	              }, {
	                value: 'daohang',
	                label: '导航',
	                children: [{
	                  value: 'cexiangdaohang',
	                  label: '侧向导航'
	                }, {
	                  value: 'dingbudaohang',
	                  label: '顶部导航'
	                }]
	              }]
	            }, {
	              value: 'zujian',
	              label: '组件',
	              children: [{
	                value: 'basic',
	                label: 'Basic',
	                children: [{
	                  value: 'layout',
	                  label: 'Layout 布局'
	                }, {
	                  value: 'color',
	                  label: 'Color 色彩'
	                }, {
	                  value: 'typography',
	                  label: 'Typography 字体'
	                }, {
	                  value: 'icon',
	                  label: 'Icon 图标'
	                }, {
	                  value: 'button',
	                  label: 'Button 按钮'
	                }]
	              }, {
	                value: 'form',
	                label: 'Form',
	                children: [{
	                  value: 'radio',
	                  label: 'Radio 单选框'
	                }, {
	                  value: 'checkbox',
	                  label: 'Checkbox 多选框'
	                }, {
	                  value: 'input',
	                  label: 'Input 输入框'
	                }, {
	                  value: 'input-number',
	                  label: 'InputNumber 计数器'
	                }, {
	                  value: 'select',
	                  label: 'Select 选择器'
	                }, {
	                  value: 'cascader',
					  label: 'Cascader 级联选择器'
					              }, {
					                value: 'switch',
					                label: 'Switch 开关'
					              }, {
					                value: 'slider',
					                label: 'Slider 滑块'
					              }, {
					                value: 'time-picker',
					                label: 'TimePicker 时间选择器'
					              }, {
					                value: 'date-picker',
					                label: 'DatePicker 日期选择器'
					              }, {
					                value: 'datetime-picker',
					                label: 'DateTimePicker 日期时间选择器'
					              }, {
					                value: 'upload',
					                label: 'Upload 上传'
					              }, {
					                value: 'rate',
					                label: 'Rate 评分'
					              }, {
					                value: 'form',
					                label: 'Form 表单'
					              }]
					            }, {
					              value: 'data',
					              label: 'Data',
					              children: [{
					                value: 'table',
					                label: 'Table 表格'
					              }, {
					                value: 'tag',
					                label: 'Tag 标签'
					              }, {
					                value: 'progress',
					                label: 'Progress 进度条'
					              }, {
					                value: 'tree',
					                label: 'Tree 树形控件'
					              }, {
					                value: 'pagination',
					                label: 'Pagination 分页'
					              }, {
					                value: 'badge',
					                label: 'Badge 标记'
					              }]
					            }, {
					              value: 'notice',
					              label: 'Notice',
					              children: [{
					                value: 'alert',
					                label: 'Alert 警告'
					              }, {
					                value: 'loading',
					                label: 'Loading 加载'
					              }, {
					                value: 'message',
					                label: 'Message 消息提示'
					              }, {
					                value: 'message-box',
					                label: 'MessageBox 弹框'
					              }, {
					                value: 'notification',
					                label: 'Notification 通知'
					              }]
					            }, {
					              value: 'navigation',
					              label: 'Navigation',
					              children: [{
					                value: 'menu',
					                label: 'NavMenu 导航菜单'
					              }, {
					                value: 'tabs',
					                label: 'Tabs 标签页'
					              }, {
					                value: 'breadcrumb',
					                label: 'Breadcrumb 面包屑'
					              }, {
					                value: 'dropdown',
					                label: 'Dropdown 下拉菜单'
					              }, {
					                value: 'steps',
					                label: 'Steps 步骤条'
					              }]
					            }, {
					              value: 'others',
					              label: 'Others',
					              children: [{
					                value: 'dialog',
					                label: 'Dialog 对话框'
					              }, {
					                value: 'tooltip',
					                label: 'Tooltip 文字提示'
					              }, {
					                value: 'popover',
					                label: 'Popover 弹出框'
					              }, {
					                value: 'card',
					                label: 'Card 卡片'
					              }, {
					                value: 'carousel',
					                label: 'Carousel 走马灯'
					              }, {
					                value: 'collapse',
					                label: 'Collapse 折叠面板'
					              }]
					            }]
					          }, {
					            value: 'ziyuan',
					            label: '资源',
					            children: [{
					              value: 'axure',
					              label: 'Axure Components'
					            }, {
					              value: 'sketch',
					              label: 'Sketch Templates'
					            }, {
					              value: 'jiaohu',
					              label: '组件交互文档'
					            }]
					          }]
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
			Ptime:'2021.@integer(1, 12).@integer(1, 30) @integer(0, 23):@integer(0, 60):@integer(0, 60)',
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
		type_id: '1',  //商品类型  1=单SKU商品  2=多SKU商品 
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
		goods_describe_image: ['@image("500x150", "#F9612E")','@image("500x150", "#F9612E")','@image("500x150", "#F9612E")'],  //图片描述
		is_postage: '@integer(1, 2)'+'', //是否包邮 1-是 2-否
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


//平台商品库
//商品列表
$mock.get('/goods/platformShopListData',({url}) =>{
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
			Ptime:'2021.@integer(1, 12).@integer(1, 30) @integer(0, 23):@integer(0, 60):@integer(0, 60)',
	        status: '@integer(0	, 1)',
			stateReason:'@cword(2,5)',
			Distribution:'@integer(500,1000)',
			purchase:'@integer(500,1000)',
	    }
	]
	return $mock.mock(data)
})







