import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login')
    },
    {
        path: '/resetPassword',
        name: 'ResetPassword',
        component: () => import('@/views/ResetPassword')
    },
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home')
    },
    {
        path: '/:pathMatch(.*)',
        name: 'NotFound',
        component: () => import('@/views/NotFound')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
