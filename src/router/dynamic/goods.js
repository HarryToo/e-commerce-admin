import PersonalCollectionLibraryEdit from '@/views/main/goods/personal-library/edit'

export default [
    {
        path: 'goods',
        redirect: to => {
            return to.path + '/PersonalCollectionLibrary'
        },
        meta: {
            title: '商品列表'
        }
    },
    {
        path: 'goods/PersonalCollectionLibrary',
        name: 'PersonalCollectionLibrary',
        meta: {
            title: '个人采集库'
        },
        component: () => import('@/views/main/goods/personal-library/PersonalCollectionLibrary')
    },
    {
        path: 'goods/PersonalCollectionLibrary/edit',
        name: 'edit',
        meta: {
            title: '编辑'
        },
        component: PersonalCollectionLibraryEdit
    },
    {
        path: 'goods/PlatformGoodLibrary',
        name: 'PlatformGoodLibrary',
        meta: {
            title: '平台采集库'
        },
        component: () => import('@/views/main/goods/platform-library/PlatformGoodLibrary')
    },
]