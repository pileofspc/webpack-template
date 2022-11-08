const base =  require('./webpack.config.base.js');
const {merge} = require('webpack-merge');

let prod = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                  }
                }
            },
            {
                test: /\.(sc|sa|c)ss$/i,
                use: [
                    require("mini-css-extract-plugin").loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],
            },
        ]
    }
}

exports = module.exports = merge(base, prod);