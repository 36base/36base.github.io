const path = require('path');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
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

    output: {
        path: path.resolve(proj_dir, 'assets'),
        filename: 'js/bundle.js',
        publicPath: proj_dir
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
        new UglifyPlugin(),
        new ExtractTextPlugin('css/style.css')
    ]
};