import dynamicRoutes from "@/router/dynamic"
import $api from "@/api"

/**
 * 权限动态路由生成
 * @param dynamicRoutes 预置的全部动态路由
 * @param permissionTree 树形的权限数据
 */
function permissionRoutesGenerator(dynamicRoutes, permissionTree) {
    let tiledPermission = [], permissionRoutes = []
    // 平铺权限树
    permissionTree.forEach((item) => {
        if (Array.isArray(item.children) && item.children.length) {
            const parent = Object.assign({}, item);
            delete parent.children
            tiledPermission.push(parent)
            tiledPermission = tiledPermission.concat(item.children)
        } else {
            tiledPermission.push(item)
        }
    })
    dynamicRoutes.forEach((route) => {
        tiledPermission.forEach((item) => {
            let absPath
            if (route.path.includes('/:')) {
                // 带参数的动态路由匹配
                absPath = route.path.substr(0, route.path.indexOf('/:'))
            }
            if (route.path === item.path || absPath === item.path) {
                if (item.permission) {
                    route.meta.permission = item.permission
                }
                permissionRoutes.push(route)
            }
        })
    })
    return permissionRoutes
}

/**
 * 左侧菜单树生成
 * @param mainPath 相对路径前缀
 * @param permissionTree 树形的权限数据
 */
function sideMenusGenerator(mainPath, permissionTree) {
    return permissionTree.map((item) => {
        const menu = {
            title: item.name,
            href: mainPath + item.path
        };
        if (Array.isArray(item.children) && item.children.length) {
            menu.children = []
            item.children.forEach((subItem) => {
                if (subItem.path.match(/\//g).length === 1) {
                    // 只保留第二级子路由
                    menu.children.push({
                        title: subItem.name,
                        href: mainPath + subItem.path
                    })
                }
            })
        }
        return menu
    })
}

export default {
    namespaced: true,
    state: {
        permissionTree: []
    },
    getters: {
        // 填充权限的动态路由
        permissionRoutes(state) {
            return permissionRoutesGenerator(dynamicRoutes, state.permissionTree)
        },
        // 左侧菜单树
        sideMenus(state) {
            return sideMenusGenerator('/main/', state.permissionTree)
        }
    },
    mutations: {
        setPermissionTree(state, data) {
            state.permissionTree = data
        }
    },
    actions: {
        // 获取权限数据
        async loadPermissionTree({commit}) {
            commit('setPermissionTree', await $api.permissionApi.getAccountPermission())
        }
    },
    modules: {}
}