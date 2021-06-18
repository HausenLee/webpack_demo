'use strict';

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    resolve: {
        alias: {
            '@': path.join(__dirname, '../src')
        },
        extensions: [
            '.js'
        ]
    },
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 4096,
                        esModule: false,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'img/[name].[hash:6].[ext]'
                            }
                        }
                    }
                }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 4096,
                        esModule: false,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'media/[name].[hash:6].[ext]'
                            }
                        }
                    }
                }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 4096,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'fonts/[name].[ext]'
                            }
                        }
                    }
                }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },

                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('dart-sass')
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            favicon: path.join(__dirname, '../public/favicon.ico'),
            filename: path.join(__dirname, '../dist/index.html'),
            template: path.join(__dirname, '../src/index.html'),
            minify: {
                removeAttributeQuotes: false, //是否删除属性的双引号
                collapseWhitespace: false, //是否折叠空白
            },
        }),
        new webpack.NamedModulesPlugin(),
        new MiniCssExtractPlugin({
            filename: `css/[name].css?v=[contenthash]`,
        }),
        // 定义全局变量
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
    ]
};