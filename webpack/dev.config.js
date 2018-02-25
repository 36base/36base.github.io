const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const proj_dir = path.resolve(__dirname, '..');

module.exports = {
    entry: {
        app: path.resolve(proj_dir, 'src/index.jsx')
    },

    resolve: {
        modules: [path.resolve(proj_dir, 'src'), 'node_modules'],
        extensions: ['.js', '.jsx']
    },

    devtool: 'inline-source-map',
    devServer: {
        contentBase: './',
        hot: true
    },

    output: {
        filename: 'js/bundle.js',
        path: path.resolve(proj_dir, 'assets'),
        publicPath: 'http://localhost:8080/assets/'
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: 'css-loader'
                }),
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        publicPath: '../',
                        name: "img/[hash].[ext]"
                    }
                }
            }
        ]
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('css/style.css')
    ]
};