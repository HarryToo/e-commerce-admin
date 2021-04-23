import $http from '@/utils/http'

export default {
    // 订单统计图表数据
    getStatisticsChartData: (data) => $http.get('/order/statisticsChartData', data),
    // 订单比例图表数据
    getProportionChartData: (data) => $http.get('/order/ProportionChartData', data),
    // 代发下单订单
    dropShipping: {
        // 订单列表
        getList: (data) => $http.get('/order/dropShipping/list', data),
        // 取消订单
        cancelOrder: (data) => $http.post('/order/dropShipping/cancelOrder', data),
        // 删除订单
        deleteOrder: (data) => $http.del('/order/dropShipping/delete', data),
        // 修改收货信息
        editDeliveryInfo: (data) => $http.post('/order/dropShipping/editDeliveryInfo', data),
        // 发货
        deliverGoods: (data) => $http.post('/order/dropShipping/deliverGoods', data),
        // 批量发货
        batchDeliverGoods: (data) => $http.post('/order/dropShipping/batchDeliverGoods', data),
        // 订单详情
        getDetail: (data) => $http.get('/order/dropShipping/detail', data)
    },
    // 退货订单
    returned: {
        // 订单列表
        getList: (data) => $http.get('/order/returned/list', data),
        // 确认收货
        received: (data) => $http.post('/order/returned/received', data),
        // 确认退款
        refund: (data) => $http.post('/order/returned/refund', data),
        // 删除订单
        deleteOrder: (data) => $http.del('/order/returned/delete', data),
        // 订单详情
        getDetail: (data) => $http.get('/order/returned/detail', data),
        // 审核
        review: (data) => $http.post('/order/returned/review', data)
    },
    // 换货订单
    exchange: {
        // 订单列表
        getList: (data) => $http.get('/order/exchange/list', data),
        // 确认收货
        received: (data) => $http.post('/order/exchange/received', data),
        // 发货
        deliverGoods: (data) => $http.post('/order/exchange/deliverGoods', data),
        // 批量发货
        batchDeliverGoods: (data) => $http.post('/order/exchange/batchDeliverGoods', data),
        // 删除订单
        deleteOrder: (data) => $http.del('/order/exchange/delete', data),
        // 订单详情
        getDetail: (data) => $http.get('/order/exchange/detail', data),
        // 审核
        review: (data) => $http.post('/order/exchange/review', data)
    },
    // 订单设置
    setting: {
        // 常规设置
        getConfigs: (data) => $http.get('/order/configs', data),
        // 常规设置
        saveConfigs: (data) => $http.post('/order/configs', data)
    },
    // 退换货原因
    returnReason: {
        // 列表
        getList: (data) => $http.get('/order/reason/list', data),
        // 新增
        add: (data) => $http.post('/order/reason/add', data),
        // 编辑
        edit: (data) => $http.post('/order/reason/edit', data),
        // 启用
        enable: (data) => $http.post('/order/reason/enable', data),
        // 禁用
        disable: (data) => $http.post('/order/reason/disable', data),
        // 删除
        del: (data) => $http.del('/order/reason/del', data)
    }
}