const { PATHS, htmlPluginPages, webpackBase } = require("./webpack.base.js");
const { merge } = require("webpack-merge");

const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const webpack = require("webpack");

const prod = {
    mode: "production",

    output: {
        path: PATHS.dist,
        filename: `${PATHS.distJs}/[name].[contenthash].js`,
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
                test: /\.m?jsx?$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
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
                            {
                                loader: "postcss-loader",
                                options: {
                                    postcssOptions: {
                                        plugins: [
                                            require("autoprefixer"),
                                            require("mqpacker"),
                                            require("cssnano")({
                                                preset: [
                                                    require("cssnano-preset-default"),
                                                ],
                                            }),
                                        ],
                                    },
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
                            {
                                loader: "postcss-loader",
                                options: {
                                    postcssOptions: {
                                        plugins: [
                                            require("autoprefixer"),
                                            require("mqpacker"),
                                            require("cssnano")({
                                                preset: [
                                                    require("cssnano-preset-default"),
                                                ],
                                            }),
                                        ],
                                    },
                                },
                            },
                            "sass-loader",
                        ],
                    },
                ],
            },
        ],
    },

    optimization: {
        minimizer: [
            "...",
            new ImageMinimizerPlugin({
                minimizer: [
                    {
                        // `sharp` will handle all bitmap formats (JPG, PNG, GIF, ...)
                        implementation: ImageMinimizerPlugin.sharpMinify,
                        // exclude SVG if implementation support it. Not required for `sharp`.
                        // filter: (source, sourcePath) => !(/\.(svg)$/i.test(sourcePath)),
                        options: {
                            encodeOptions: {
                                // Your options for `sharp`
                                // https://sharp.pixelplumbing.com/api-output
                                jpeg: {
                                    // https://sharp.pixelplumbing.com/api-output#jpeg
                                    quality: 100,
                                },
                                webp: {
                                    // https://sharp.pixelplumbing.com/api-output#webp
                                    lossless: true,
                                },
                                avif: {
                                    // https://sharp.pixelplumbing.com/api-output#avif
                                    lossless: true,
                                },
                                // png by default sets the quality to 100%, which is same as lossless
                                // https://sharp.pixelplumbing.com/api-output#png
                                png: {},
                                // gif does not support lossless compression at all
                                // https://sharp.pixelplumbing.com/api-output#gif
                                gif: {},
                            },
                        },
                    },
                    {
                        // `svgo` will handle vector images (SVG)
                        implementation: ImageMinimizerPlugin.svgoMinify,
                        options: {
                            encodeOptions: {
                                // Pass over SVGs multiple times to ensure all optimizations are applied. False by default
                                multipass: true,
                                plugins: [
                                    // set of built-in plugins enabled by default
                                    // see: https://github.com/svg/svgo#default-preset
                                    "preset-default",
                                ],
                            },
                        },
                    },
                ],
            }),
        ],
    },

    plugins: [
        ...htmlPluginPages,
        new MiniCssExtractPlugin({
            filename: `${PATHS.distCss}/[name].[fullhash].css`,
        }),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
        }),
    ],
};

exports = module.exports = merge(webpackBase, prod);
