import PersonalCollectionLibraryEdit from '@/views/main/goods/personal-library/edit'
import PlatformCollectionLibraryEdit from '@/views/main/goods/platform-library/edit'
export default [
    {
        path: 'goodsList',
        redirect: to => {
            return to.path + '/PersonalCollectionLibrary'
        },
        meta: {
            title: '商品列表'
        }
    },
    {
        path: 'goodsList/PersonalCollectionLibrary',
        name: 'PersonalCollectionLibrary',
        meta: {
            title: '个人采集库'
        },
        component: () => import('@/views/main/goods/personal-library/PersonalCollectionLibrary')
    },	
    {
        path: 'goodsList/PersonalCollectionLibrary/edit',
        name: 'edit',
        meta: {
            title: '编辑'
        },
        component: PersonalCollectionLibraryEdit
    },
    {
        path: 'goodsList/PlatformGoodLibrary',
        name: 'PlatformGoodLibrary',
        meta: {
            title: '平台采集库'
        },
        component: () => import('@/views/main/goods/platform-library/PlatformGoodLibrary')
    },
	{
	    path: 'goodsList/PlatformGoodLibrary/edit',
	    name: 'edit',
	    meta: {
	        title: '编辑'
	    },
	    component: PlatformCollectionLibraryEdit
	},
]