import $http from '@/utils/http'
import TableOptionsHeader from '@/components/common/TableOptionsHeader'

export default {
    install: (app, options) => {
        // 按钮级鉴权指令
        app.directive('permission', {
            mounted(el, binding) {
                const param = binding.value
                if (param && Array.isArray(param) && typeof param[1] === 'string') {
                    const permission = param[0].meta && param[0].meta.permission
                    const funName = param[1]
                    if (!permission || !permission.includes(funName)) {
                        el.parentNode.removeChild(el)
                    }
                } else if (process.env.NODE_ENV === 'development') {
                    console.error(`按钮级鉴权指令v-permission参数错误，参考[$route, '功能名']`);
                }
            }
        })

        // 全局注册组件
        app.component('table-options-header', TableOptionsHeader)

        // 文件上传地址(action)
        app.config.globalProperties.$uploadAction = $http.baseURL + '/fileUpload'
        // 全局获取表格内容滚动区域高度
        app.config.globalProperties.$getTableHeight = (haveOptionsHeader = true) => {
            let height = window.innerHeight - 270
            if (haveOptionsHeader) height -= 80
            return height
        }
    }
}