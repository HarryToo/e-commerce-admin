export default {
    install: (app, options) => {
        // 按钮级鉴权指令
        app.directive('permission', {
            mounted(el, binding) {
                const param = binding.value
                if (param && Array.isArray(param) && typeof param[1] === 'string') {
                    const permission = param[0].meta && param[0].meta.permission
                    const funName = param[1]
                    if (!permission.includes(funName)) {
                        el.parentNode.removeChild(el)
                    }
                } else if (process.env.NODE_ENV === 'development') {
                    console.error(`按钮级鉴权指令v-permission参数错误，参考[$route, '功能名']`);
                }
            }
        })
    }
}