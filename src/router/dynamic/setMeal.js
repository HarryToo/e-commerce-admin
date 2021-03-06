export default [
    {
        path: 'setMeal',
        redirect: to => {
            return to.path + '/person'
        },
        meta: {
            title: '套餐管理'
        }
    },
    {
        path: 'setMeal/person',
        name: 'PersonSetMeal',
        meta: {
            title: '个人套餐'
        },
        component: () => import('@/views/main/set-meal/person')
    },
    {
        path: 'setMeal/organization',
        name: 'OrganizationSetMeal',
        meta: {
            title: '机构套餐'
        },
        component: () => import('@/views/main/set-meal/organization')
    }
]