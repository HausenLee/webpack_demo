'use strict';

const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const webpackConfig = require('./webpack.comm');

module.exports = merge(webpackConfig, {
    mode: "development",
    entry: {
        index: path.resolve(__dirname, '../src/index.js'),
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].js',
    },
    module: {
    },
    devtool: 'source-map', //开发环境下使用
    devServer: {
        port: '3000',
        quiet: false,
        inline: true,
        stats: "errors-only", //终端仅打印 error
        overlay: false, //默认不启用
        clientLogLevel: "silent", //日志等级
        compress: true, //是否启用 gzip 压缩
        hot: true,
        contentBase: '../dist',
        openPage: 'index.html',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
})
