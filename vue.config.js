const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    configureWebpack: {
        externals: isProd ? {
            echarts: 'echarts',
            moment: 'moment',
            xlsx: 'XLSX'
        } : {}
    }
}