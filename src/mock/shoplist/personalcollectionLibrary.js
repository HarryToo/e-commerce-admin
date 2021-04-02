import $mock from '@/utils/mock'
//个人采集库

//搜索条件 来源平台
$mock.get('/order/PersonLbSourcePlatformData',  [
		{
		  value: '0',
		  label: '全部'
		},
		{
          value: '1',
          label: '京东'
        }, {
          value: '2',
          label: '天猫',
          // disabled: true
        }, {
          value: '3',
          label: '1688'
        },
])
/* 
说明
 收藏状态
 
 0 采集成功
 1 正在采集
 2 采集失败
 */
// 商品信息
$mock.get('/order/PersonLbShopListData',  [
		{
			id:'1',
			name:"【闪电发货】美国G-force C14代驾电动车便携折叠电动自行车外卖成人代步小型迷你锂电池电瓶车...",
			type:'电动车/配件/交通工具>电动车整车>电动自行车',
			img:'/favicon.ico',
			Source:'京东',
			SorceId:'62411562579',
			SorceLink:'https://www.jd.com/',
			ShopSorceLink:'https://item.jd.com/100018517286.html',
			PriceMin:"1599.00",
			PriceMax:'3999.00',
			TotalStock:'865',
			collectionState:'0',
			failReason:'',
			failTIME:'2020.12.28  10:51:18',
			collectionPeoPle:'张安',
		},
		{
			id:'2',
			name:"【闪电发货】美国G-force C14代驾电动车便携折叠电动自行车外卖成人代步小型迷你锂电池电瓶车...",
			type:'电动车/配件/交通工具>电动车整车>电动自行车',
			img:'/favicon.ico',
			Source:'京东',
			SorceId:'62411562579',
			SorceLink:'https://www.jd.com/',
			ShopSorceLink:'https://item.jd.com/100018517286.html',
			PriceMin:"1599.00",
			PriceMax:'3999.00',
			TotalStock:'865',
			collectionState:'1',
			failReason:'',
			failTIME:'2020.12.28  10:51:18',
			collectionPeoPle:'张安',
		},
		{
			id:'3',
			name:"【闪电发货】美国G-force C14代驾电动车便携折叠电动自行车外卖成人代步小型迷你锂电池电瓶车...",
			type:'电动车/配件/交通工具>电动车整车>电动自行车',
			img:'/favicon.ico',
			Source:'京东',
			SorceId:'62411562579',
			SorceLink:'https://www.jd.com/',
			ShopSorceLink:'https://item.jd.com/100018517286.html',
			PriceMin:"1599.00",
			PriceMax:'3999.00',
			TotalStock:'865',
			collectionState:'2',
			failReason:'商品重复采集',
			failTIME:'2020.12.28  10:51:18',
			collectionPeoPle:'张安',
		},
])
