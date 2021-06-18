'use strict';

const path = require('path');
const { merge } = require('webpack-merge');
const webpackConfig = require('./webpack.comm');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(webpackConfig, {
    mode: 'production',
    entry: {
        index: path.resolve(__dirname, '../src/index.js')
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'js/[name].js?v=[chunkhash:6]'
    },
    module: {
        rules: [
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new OptimizeCSSAssetsPlugin(),
    ]
})
