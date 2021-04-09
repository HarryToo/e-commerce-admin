import $mock from '@/utils/mock'


// 分类树
$mock.get('/goods/classify/list',  {
    first:[
        {
            value: '0',
            label: '这里是一级分类名称'
        },
        {
            value: '1',
            label: '这里是一级分类名称'
        }, {
            value: '2',
            label: '这里是一级分类名称',
            // disabled: true
        }, {
            value: '3',
            label: '这里是一级分类名称'
        },
    ],
    second:[
        {
            value: '0',
            label: '这里是二级分类名称'
        },
        {
            value: '1',
            label: '这里是二级分类名称'
        }, {
            value: '2',
            label: '这里是二级分类名称',
            // disabled: true
        }, {
            value: '3',
            label: '这里是二级分类名称'
        },
    ],
    third:[
        {
            value: '0',
            label: '这里是三级分类名称'
        },
        {
            value: '1',
            label: '这里是三级分类名称'
        }, {
            value: '2',
            label: '这里是三级分类名称',
            // disabled: true
        }, {
            value: '3',
            label: '这里是三级分类名称'
        },
    ]
})