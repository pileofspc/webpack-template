const { PATHS, htmlPluginPages, webpackBase } = require("./webpack.base.js");
const { merge } = require("webpack-merge");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const webpack = require("webpack");

const dev = {
    mode: "development",
    devtool: "source-map",
    devServer: {
        static: {
            // from
            directory: PATHS.resources,
            // to
            publicPath: "/resources",
        },
        port: 3000,
        hot: true,
        compress: true,
        watchFiles: ["src/**/*.html"],
        historyApiFallback: true,
    },

    output: {
        path: PATHS.dist,
        filename: `${PATHS.distJs}/[name].js`,
        publicPath: "/",
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true,
                },
            },
            {
                test: /\.(woff(2)?|ttf|eot)$/i,
                type: "asset/resource",
                generator: {
                    filename: `${PATHS.distAssets}/fonts/[name][ext]`,
                },
            },
            {
                oneOf: [
                    {
                        test: /\.svg$/i,
                        resourceQuery: /sprite/,
                        use: [
                            {
                                loader: "svg-sprite-loader",
                            },
                        ],
                    },
                    {
                        test: /\.svg$/i,
                        resourceQuery: /inline/,
                        use: [
                            {
                                loader: "svg-inline-loader",
                            },
                        ],
                    },
                    {
                        test: /\.(png|jpg|jpeg|gif|svg)$/i,
                        type: "asset/resource",
                        generator: {
                            filename: `${PATHS.distImg}/[name][ext]`,
                        },
                    },
                ],
            },
            {
                test: /\.html$/i,
                use: {
                    loader: "html-loader",
                    options: {
                        sources: {
                            list: [
                                "...",
                                {
                                    tag: "svg",
                                    attribute: "data-src",
                                    type: "src",
                                },
                            ],
                            // Это нужно для того, чтобы приложение не падало, когда не находит нужную картинку
                            // urlFilter(attribute, value, resourcePath) {
                            //     const resolved = helpers.resolveAliases(value, exports.resolve.alias);
                            //     let found = fs.existsSync(resolved);
                            //     if (!found) {
                            //         // Тут хотел сделать предупреждение, но оно работает только в Node, а вебпак
                            //         // не отображает это как предупреждение в конце сборки
                            //         console.log('\x1b[33m');
                            //         console.error('--------------------------------------------------------------\n' +
                            //             'ВНИМАНИЕ! Ссылка на незахешированный файл попала в сборку!\n' +
                            //             '\tссылка: ' + value + '\n' +
                            //             '\tсо страницы: ' + resourcePath + '\n' +
                            //             '--------------------------------------------------------------'
                            //         );
                            //         console.log('\x1b[0m')
                            //     }
                            //     return found
                            // }
                        },
                    },
                },
            },
            {
                oneOf: [
                    {
                        test: /\.(sc|sa|c)ss$/i,
                        resourceQuery: /module/,
                        use: [
                            require("mini-css-extract-plugin").loader,
                            {
                                loader: "css-loader",
                                options: {
                                    modules: true,
                                    url: true,
                                },
                            },
                            "sass-loader",
                        ],
                    },
                    {
                        test: /\.(sc|sa|c)ss$/i,
                        use: [
                            require("mini-css-extract-plugin").loader,
                            {
                                loader: "css-loader",
                                options: {
                                    url: true,
                                },
                            },
                            "sass-loader",
                        ],
                    },
                ],
            },
        ],
    },

    plugins: [
        ...htmlPluginPages,
        new MiniCssExtractPlugin({
            filename: `${PATHS.distCss}/[name].css`,
        }),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
        }),
    ],
};

exports = module.exports = merge(webpackBase, dev);
