import {createRouter, createWebHistory} from 'vue-router'
import dynamicRoutes from "@/router/dynamic";

const routes = [
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
    },
    {
        path: '/',
        name: 'Main',
        component: () => import('@/views/Main'),
        children: []
    },
    {
        path: '/:pathMatch(.*)',
        name: 'NotFound',
        meta: {
            title: '404'
        },
        component: () => import('@/views/NotFound')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: routes
})

router.beforeEach((to, from, next) => {
    next()
})

router.afterEach((to, from, failure) => {
    document.title = to.meta && to.meta.title ? to.meta.title : '管理系统'
})

export default router
