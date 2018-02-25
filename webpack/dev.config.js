const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const projDir = path.resolve(__dirname, '..');

module.exports = {
  entry: {
    app: path.resolve(projDir, 'src/index.jsx'),
  },

  resolve: {
    modules: [path.resolve(projDir, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx'],
  },

  devtool: 'inline-source-map',
  devServer: {
    contentBase: './',
    hot: true,
  },

  output: {
    filename: 'js/bundle.js',
    path: path.resolve(projDir, 'assets'),
    publicPath: 'http://localhost:8080/assets'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
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
    ],
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('css/style.css')
  ],
};
