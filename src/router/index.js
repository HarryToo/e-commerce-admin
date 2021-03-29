import {createRouter, createWebHistory} from 'vue-router'
import store from '@/store'

const staticRoutes = [
    {
        path: '/',
        redirect: '/main/dataCenter'
    },
    {
        path: '/main',
        name: 'Main',
        meta: {
            title: '主界面'
        },
        component: () => import('@/views/Main')
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '云界跨境电商 - 管理系统'
        },
        component: () => import('@/views/Login')
    },
    {
        path: '/resetPassword',
        name: 'ResetPassword',
        meta: {
            title: '修改密码'
        },
        component: () => import('@/views/ResetPassword')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: staticRoutes
})

router.beforeEach((to, from, next) => {
    if (sessionStorage.getItem('token')) {
        if (to.path === '/login') {
            next('/')
        } else {
            if (!store.getters['permission/permissionRoutes'].length) {
                // 加载动态路由
                store.dispatch('permission/loadPermissionTree').then(() => {
                    store.getters['permission/permissionRoutes'].forEach((route) => {
                        router.addRoute('Main', route)
                    })
                    router.addRoute({
                        path: '/:pathMatch(.*)',
                        name: 'NotFound',
                        meta: {
                            title: '404'
                        },
                        component: () => import('@/views/NotFound')
                    })
                    next({...to, replace: true})
                })
            } else {
                next()
            }
        }
    } else {
        if (to.path === '/login') {
            next()
        } else {
            next('/login')
        }
    }
})

router.afterEach((to, from, failure) => {
    document.title = to.meta && to.meta.title ? to.meta.title : '管理系统'
})

export default router
