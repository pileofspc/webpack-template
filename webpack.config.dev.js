const base =  require('./webpack.config.base.js');
const {merge} = require('webpack-merge');

let dev = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        static: {
            directory: base.externals.paths.dist,
        },
        port: 3000,
        open: true,
        compress: true,
        hot: true,
        // historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.(sc|sa|c)ss$/i,
                use: [
                    require("mini-css-extract-plugin").loader,
                    'css-loader',
                    'sass-loader'
                ],
            },
        ]
    }
}

exports = module.exports = merge(base, dev);