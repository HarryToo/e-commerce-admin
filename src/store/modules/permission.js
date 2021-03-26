import dynamicRoutes from "@/router/dynamic"
import permissionMockData from "@/mock/permission"

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
    dynamicRoutes.forEach((route, index) => {
        tiledPermission.forEach((item, index) => {
            if (route.path === item.path) {
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
 * @param pathPrefix 相对路径前缀
 * @param permissionTree 树形的权限数据
 */
function sideMenusGenerator(pathPrefix, permissionTree) {
    return permissionTree.map((item) => {
        const menu = {
            title: item.name,
            href: pathPrefix + item.path
        };
        if (Array.isArray(item.children) && item.children.length) {
            menu.children = item.children.map((subItem) => {
                return {
                    title: subItem.name,
                    href: pathPrefix + subItem.path
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
        // 获取权限数据并保存sessionStorage
        loadPermissionTree({commit}) {
            commit('setPermissionTree', permissionMockData)
        }
    },
    modules: {}
}