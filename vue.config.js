const dayjs = require('dayjs');
const webpack = require('webpack');
const PACKAGE = require('./package.json');

module.exports = {
    configureWebpack: {
        devServer: {
            overlay: {
                warnings: true,
                errors: true,
            },
            proxy: {
                '/api': {
                    target: 'http://127.0.0.1:5005',
                    secure: false,
                    logLevel: 'debug',
                },
            },
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'BUILD_DATE': JSON.stringify(dayjs()),
                    'CLIENT_VERSION': JSON.stringify(PACKAGE.version),
                },
            }),
        ],
    },
    pluginOptions: {
        webpackBundleAnalyzer: {
            openAnalyzer: false,
        },
    },
    chainWebpack: config => {
        // 移除 prefetch 插件
        config.plugins.delete('prefetch');
    },
};
