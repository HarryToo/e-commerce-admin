	export default [
		{
	    path: 'goodlist',
	    redirect: to => {
	        return to.path + '/PersonalCollectionLibrary'
	    },
	    meta: {
	        title: '商品列表'
	    }
	},
    {
        path: 'goodlist/PersonalCollectionLibrary',
        name: 'PersonalCollectionLibrary',
        meta: {
            title: '个人采集库'
        },
        component: () => import('@/views/main/goodlist/personal-collectionlibrary/PersonalCollectionLibrary')
    },
	{
	    path: 'goodlist/PersonalCollectionLibrary/edit',
	    name: 'edit',
	    meta: {
	        title: '编辑'
	    },
	    component: () => import('@/views/main/goodlist/personal-collectionlibrary/edit/index')
	},
	{
	    path: 'goodlist/PlatformGoodLibrary',
	    name: 'PlatformGoodLibrary',
	    meta: {
	        title: '平台采集库'
	    },
	    component: () => import('@/views/main/goodlist/platform-goodlibrary/PlatformGoodLibrary')
	},
	]