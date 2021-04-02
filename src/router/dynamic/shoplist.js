	export default [
		{
	    path: 'goodlist',
	    redirect: to => {
	        return to.path + '/PersonalCollectionLibrary'
	    },
	    meta: {
	        title: '权限管理'
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
	    path: 'goodlist/PlatformGoodLibrary',
	    name: 'PlatformGoodLibrary',
	    meta: {
	        title: '平台采集库'
	    },
	    component: () => import('@/views/main/goodlist/platform-goodlibrary/PlatformGoodLibrary')
	},
	]