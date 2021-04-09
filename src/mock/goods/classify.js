import $mock from '@/utils/mock'

// 分类树
$mock.get('/goods/classify/list', {
    list: [
        {
            value: 'zhinan',
            label: '指南',
            children: [
                {
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
                },
                {
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
        },
        {
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
                }]
            }]
        },
        {
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
        }
    ]
})