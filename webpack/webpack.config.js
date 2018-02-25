const path = require('path');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
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

  output: {
    path: projDir,
    filename: 'bundle.js',
    publicPath: proj_dir
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
        })
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
    new UglifyPlugin(),
    new ExtractTextPlugin('css/style.css')
  ],
};
